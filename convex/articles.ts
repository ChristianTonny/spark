import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

// Helper function to calculate read time (words per minute)
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to generate excerpt from content
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, "");
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

// ============================================
// MUTATIONS (Create, Update, Delete)
// ============================================

// Create a new article
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    coverImage: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get user from database
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) throw new Error("User not found");
    if (user.role !== "mentor") throw new Error("Only mentors can create articles");

    // Get mentor profile for additional info
    const mentorProfile = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    const now = Date.now();
    const slug = generateSlug(args.title);
    const readTime = calculateReadTime(args.content);
    const excerpt = args.excerpt || generateExcerpt(args.content);

    const articleId = await ctx.db.insert("articles", {
      authorId: user._id,
      authorName: `${user.firstName} ${user.lastName}`,
      authorImage: user.avatar,
      authorTitle: mentorProfile ? `${mentorProfile.jobTitle} at ${mentorProfile.company}` : undefined,
      title: args.title,
      slug,
      coverImage: args.coverImage,
      excerpt,
      content: args.content,
      category: args.category,
      tags: args.tags,
      status: args.status,
      publishedAt: args.status === "published" ? now : undefined,
      viewCount: 0,
      readTime,
      createdAt: now,
      updatedAt: now,
    });

    return articleId;
  },
});

// Update an existing article
export const update = mutation({
  args: {
    articleId: v.id("articles"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    coverImage: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) throw new Error("User not found");

    // Get the article
    const article = await ctx.db.get(args.articleId);
    if (!article) throw new Error("Article not found");

    // Check ownership
    if (article.authorId !== user._id) {
      throw new Error("You can only edit your own articles");
    }

    const now = Date.now();
    const updates: any = {
      updatedAt: now,
    };

    // Update fields if provided
    if (args.title !== undefined) {
      updates.title = args.title;
      updates.slug = generateSlug(args.title);
    }
    if (args.content !== undefined) {
      updates.content = args.content;
      updates.readTime = calculateReadTime(args.content);
      // Auto-generate excerpt if not provided
      if (args.excerpt === undefined) {
        updates.excerpt = generateExcerpt(args.content);
      }
    }
    if (args.excerpt !== undefined) updates.excerpt = args.excerpt;
    if (args.category !== undefined) updates.category = args.category;
    if (args.tags !== undefined) updates.tags = args.tags;
    if (args.coverImage !== undefined) updates.coverImage = args.coverImage;

    // Handle status change
    if (args.status !== undefined) {
      updates.status = args.status;
      // Set publishedAt when publishing for the first time
      if (args.status === "published" && !article.publishedAt) {
        updates.publishedAt = now;
      }
    }

    await ctx.db.patch(args.articleId, updates);

    return args.articleId;
  },
});

// Delete an article
export const deleteArticle = mutation({
  args: {
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) throw new Error("User not found");

    const article = await ctx.db.get(args.articleId);
    if (!article) throw new Error("Article not found");

    // Check ownership
    if (article.authorId !== user._id) {
      throw new Error("You can only delete your own articles");
    }

    // Delete associated bookmarks
    const bookmarks = await ctx.db
      .query("articleBookmarks")
      .withIndex("by_article", (q) => q.eq("articleId", args.articleId))
      .collect();

    for (const bookmark of bookmarks) {
      await ctx.db.delete(bookmark._id);
    }

    // Delete the article
    await ctx.db.delete(args.articleId);

    return { success: true };
  },
});

// Increment view count
export const incrementViewCount = mutation({
  args: {
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.articleId);
    if (!article) throw new Error("Article not found");

    await ctx.db.patch(args.articleId, {
      viewCount: article.viewCount + 1,
    });

    return { success: true };
  },
});

// Bookmark/unbookmark an article
export const toggleBookmark = mutation({
  args: {
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) throw new Error("User not found");

    // Check if already bookmarked
    const existingBookmark = await ctx.db
      .query("articleBookmarks")
      .withIndex("by_user_and_article", (q) =>
        q.eq("userId", user._id).eq("articleId", args.articleId)
      )
      .first();

    if (existingBookmark) {
      // Remove bookmark
      await ctx.db.delete(existingBookmark._id);
      return { bookmarked: false };
    } else {
      // Add bookmark
      await ctx.db.insert("articleBookmarks", {
        userId: user._id,
        articleId: args.articleId,
        createdAt: Date.now(),
      });
      return { bookmarked: true };
    }
  },
});

// ============================================
// QUERIES (Read)
// ============================================

// Get all published articles (public)
export const getPublishedArticles = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let articlesQuery = ctx.db
      .query("articles")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc");

    let articles = await articlesQuery.collect();

    // Filter by category if provided
    if (args.category) {
      articles = articles.filter((a) => a.category === args.category);
    }

    // Sort by published date (most recent first)
    articles.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

    // Apply limit if provided
    if (args.limit) {
      articles = articles.slice(0, args.limit);
    }

    return articles;
  },
});

// Get article by slug (public)
export const getArticleBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const article = await ctx.db
      .query("articles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    return article;
  },
});

// Get articles by author (mentor's articles)
export const getArticlesByAuthor = query({
  args: {
    authorId: v.id("users"),
    includesDrafts: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let articles = await ctx.db
      .query("articles")
      .withIndex("by_author", (q) => q.eq("authorId", args.authorId))
      .collect();

    // Filter out drafts unless requested
    if (!args.includesDrafts) {
      articles = articles.filter((a) => a.status === "published");
    }

    // Sort by updated date (most recent first)
    articles.sort((a, b) => b.updatedAt - a.updatedAt);

    return articles;
  },
});

// Get current user's articles (for editor)
export const getMyArticles = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user || user.role !== "mentor") return [];

    const articles = await ctx.db
      .query("articles")
      .withIndex("by_author", (q) => q.eq("authorId", user._id))
      .collect();

    // Sort by updated date (most recent first)
    articles.sort((a, b) => b.updatedAt - a.updatedAt);

    return articles;
  },
});

// Get single article by ID
export const getArticleById = query({
  args: {
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.articleId);
    return article;
  },
});

// Check if user has bookmarked an article
export const isBookmarked = query({
  args: {
    articleId: v.id("articles"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return false;

    const bookmark = await ctx.db
      .query("articleBookmarks")
      .withIndex("by_user_and_article", (q) =>
        q.eq("userId", user._id).eq("articleId", args.articleId)
      )
      .first();

    return !!bookmark;
  },
});

// Get user's bookmarked articles
export const getMyBookmarkedArticles = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return [];

    const bookmarks = await ctx.db
      .query("articleBookmarks")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Get full article details
    const articles = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const article = await ctx.db.get(bookmark.articleId);
        return article;
      })
    );

    // Filter out null values and sort by bookmark date
    return articles.filter((a) => a !== null);
  },
});

// Get article categories (for filters)
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db
      .query("articles")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    // Get unique categories
    const categories = [...new Set(articles.map((a) => a.category))];
    return categories.sort();
  },
});
