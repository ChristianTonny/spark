import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Helper to get current user ID
async function getCurrentUserId(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  return user?._id;
}

// Helper to generate URL-friendly slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get all published resources (for students)
 * Supports filtering and sorting
 */
export const getPublishedResources = query({
  args: {
    type: v.optional(v.union(
      v.literal("article"),
      v.literal("video"),
      v.literal("opportunity"),
      v.literal("guide"),
      v.literal("all")
    )),
    category: v.optional(v.string()),
    tag: v.optional(v.string()),
    sortBy: v.optional(v.union(
      v.literal("recent"),
      v.literal("views"),
      v.literal("likes")
    )),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { type, category, tag, sortBy = "recent", limit = 50 } = args;

    // Get all published resources
    let resources = await ctx.db
      .query("mentorResources")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    // Filter by type
    if (type && type !== "all") {
      resources = resources.filter((r) => r.type === type);
    }

    // Filter by category
    if (category) {
      resources = resources.filter((r) => r.category === category);
    }

    // Filter by tag
    if (tag) {
      resources = resources.filter((r) => r.tags.includes(tag));
    }

    // Sort resources
    if (sortBy === "views") {
      resources.sort((a, b) => b.views - a.views);
    } else if (sortBy === "likes") {
      resources.sort((a, b) => b.likes - a.likes);
    } else {
      // Sort by most recent
      resources.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
    }

    // Limit results
    resources = resources.slice(0, limit);

    // Enrich with author information
    const enrichedResources = await Promise.all(
      resources.map(async (resource) => {
        const author = await ctx.db.get(resource.authorId);
        const professional = author
          ? await ctx.db
              .query("professionals")
              .withIndex("by_user", (q) => q.eq("userId", author._id))
              .first()
          : null;

        return {
          ...resource,
          author: author
            ? {
                id: author._id,
                name: `${author.firstName} ${author.lastName}`,
                avatar: author.avatar,
                title: professional?.jobTitle,
                company: professional?.company,
              }
            : null,
        };
      })
    );

    return enrichedResources;
  },
});

/**
 * Get a single resource by slug
 */
export const getResourceBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const resource = await ctx.db
      .query("mentorResources")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!resource || resource.status !== "published") {
      return null;
    }

    // Get author info
    const author = await ctx.db.get(resource.authorId);
    const professional = author
      ? await ctx.db
          .query("professionals")
          .withIndex("by_user", (q) => q.eq("userId", author._id))
          .first()
      : null;

    // Check if current user has liked/saved
    const userId = await getCurrentUserId(ctx);
    let hasLiked = false;
    let hasSaved = false;

    if (userId) {
      const engagement = await ctx.db
        .query("resourceEngagement")
        .withIndex("by_resource_and_user", (q) =>
          q.eq("resourceId", resource._id).eq("userId", userId)
        )
        .collect();

      hasLiked = engagement.some((e) => e.type === "like");
      hasSaved = engagement.some((e) => e.type === "save");
    }

    return {
      ...resource,
      author: author
        ? {
            id: author._id,
            name: `${author.firstName} ${author.lastName}`,
            avatar: author.avatar,
            title: professional?.jobTitle,
            company: professional?.company,
          }
        : null,
      hasLiked,
      hasSaved,
    };
  },
});

/**
 * Get mentor's own resources (all statuses)
 */
export const getMentorDashboardResources = query({
  args: {
    status: v.optional(v.union(
      v.literal("draft"),
      v.literal("published"),
      v.literal("archived"),
      v.literal("all")
    )),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return [];
    }

    // Verify user is a mentor
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "mentor") {
      return [];
    }

    let resources = await ctx.db
      .query("mentorResources")
      .withIndex("by_author", (q) => q.eq("authorId", userId))
      .collect();

    // Filter by status
    if (args.status && args.status !== "all") {
      resources = resources.filter((r) => r.status === args.status);
    }

    // Sort by most recent
    resources.sort((a, b) => b.createdAt - a.createdAt);

    return resources;
  },
});

/**
 * Get resource analytics
 */
export const getResourceAnalytics = query({
  args: {
    resourceId: v.id("mentorResources"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    // Verify user is the author
    if (resource.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    // Get engagement details
    const engagements = await ctx.db
      .query("resourceEngagement")
      .withIndex("by_resource", (q) => q.eq("resourceId", args.resourceId))
      .collect();

    const likes = engagements.filter((e) => e.type === "like");
    const saves = engagements.filter((e) => e.type === "save");

    // Calculate engagement rate
    const engagementRate =
      resource.views > 0
        ? ((likes.length + saves.length) / resource.views) * 100
        : 0;

    return {
      views: resource.views,
      likes: likes.length,
      saves: saves.length,
      engagementRate: engagementRate.toFixed(2),
      recentLikes: likes.slice(0, 10),
      recentSaves: saves.slice(0, 10),
    };
  },
});

/**
 * Get user's saved resources
 */
export const getSavedResources = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return [];
    }

    // Get all saves for this user
    const saves = await ctx.db
      .query("resourceEngagement")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("type"), "save"))
      .collect();

    // Get the resources
    const resources = await Promise.all(
      saves.map(async (save) => {
        const resource = await ctx.db.get(save.resourceId);
        if (!resource || resource.status !== "published") {
          return null;
        }

        // Get author info
        const author = await ctx.db.get(resource.authorId);
        const professional = author
          ? await ctx.db
              .query("professionals")
              .withIndex("by_user", (q) => q.eq("userId", author._id))
              .first()
          : null;

        return {
          ...resource,
          savedAt: save.createdAt,
          author: author
            ? {
                id: author._id,
                name: `${author.firstName} ${author.lastName}`,
                avatar: author.avatar,
                title: professional?.jobTitle,
                company: professional?.company,
              }
            : null,
        };
      })
    );

    return resources.filter((r) => r !== null);
  },
});

/**
 * Get trending resources (most viewed/liked in last 30 days)
 */
export const getTrendingResources = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { limit = 10 } = args;
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

    // Get recently published resources
    let resources = await ctx.db
      .query("mentorResources")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    // Filter to last 30 days
    resources = resources.filter(
      (r) => r.publishedAt && r.publishedAt >= thirtyDaysAgo
    );

    // Sort by engagement (views + likes * 2)
    resources.sort((a, b) => {
      const scoreA = a.views + a.likes * 2;
      const scoreB = b.views + b.likes * 2;
      return scoreB - scoreA;
    });

    // Limit results
    resources = resources.slice(0, limit);

    // Enrich with author info
    const enrichedResources = await Promise.all(
      resources.map(async (resource) => {
        const author = await ctx.db.get(resource.authorId);
        const professional = author
          ? await ctx.db
              .query("professionals")
              .withIndex("by_user", (q) => q.eq("userId", author._id))
              .first()
          : null;

        return {
          ...resource,
          author: author
            ? {
                id: author._id,
                name: `${author.firstName} ${author.lastName}`,
                avatar: author.avatar,
                title: professional?.jobTitle,
                company: professional?.company,
              }
            : null,
        };
      })
    );

    return enrichedResources;
  },
});

/**
 * Create a new resource
 */
export const createResource = mutation({
  args: {
    type: v.union(
      v.literal("article"),
      v.literal("video"),
      v.literal("opportunity"),
      v.literal("guide")
    ),
    title: v.string(),
    content: v.string(),
    excerpt: v.string(),
    coverImage: v.optional(v.string()),
    tags: v.array(v.string()),
    category: v.string(),
    status: v.optional(v.union(
      v.literal("draft"),
      v.literal("published")
    )),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify user is a mentor
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "mentor") {
      throw new Error("Only mentors can create resources");
    }

    // Generate slug
    const baseSlug = generateSlug(args.title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (true) {
      const existing = await ctx.db
        .query("mentorResources")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();

      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const now = Date.now();
    const status = args.status || "draft";

    const resourceId = await ctx.db.insert("mentorResources", {
      authorId: userId,
      type: args.type,
      title: args.title,
      slug,
      content: args.content,
      excerpt: args.excerpt,
      coverImage: args.coverImage,
      tags: args.tags,
      category: args.category,
      status,
      publishedAt: status === "published" ? now : undefined,
      views: 0,
      likes: 0,
      saves: 0,
      moderationStatus: "approved", // Auto-approve for MVP
      createdAt: now,
      updatedAt: now,
    });

    return resourceId;
  },
});

/**
 * Update a resource
 */
export const updateResource = mutation({
  args: {
    resourceId: v.id("mentorResources"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    type: v.optional(v.union(
      v.literal("article"),
      v.literal("video"),
      v.literal("opportunity"),
      v.literal("guide")
    )),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    // Verify user is the author
    if (resource.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.title) {
      updates.title = args.title;
      // Regenerate slug if title changed
      const baseSlug = generateSlug(args.title);
      let slug = baseSlug;
      let counter = 1;

      while (true) {
        const existing = await ctx.db
          .query("mentorResources")
          .withIndex("by_slug", (q) => q.eq("slug", slug))
          .first();

        if (!existing || existing._id === args.resourceId) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      updates.slug = slug;
    }

    if (args.content !== undefined) updates.content = args.content;
    if (args.excerpt !== undefined) updates.excerpt = args.excerpt;
    if (args.coverImage !== undefined) updates.coverImage = args.coverImage;
    if (args.tags !== undefined) updates.tags = args.tags;
    if (args.category !== undefined) updates.category = args.category;
    if (args.type !== undefined) updates.type = args.type;

    await ctx.db.patch(args.resourceId, updates);

    return { success: true };
  },
});

/**
 * Publish a resource
 */
export const publishResource = mutation({
  args: {
    resourceId: v.id("mentorResources"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    // Verify user is the author
    if (resource.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.resourceId, {
      status: "published",
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Unpublish a resource (back to draft)
 */
export const unpublishResource = mutation({
  args: {
    resourceId: v.id("mentorResources"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    // Verify user is the author
    if (resource.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.resourceId, {
      status: "draft",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Delete a resource (soft delete to archived)
 */
export const deleteResource = mutation({
  args: {
    resourceId: v.id("mentorResources"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    // Verify user is the author
    if (resource.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.resourceId, {
      status: "archived",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Toggle like on a resource
 */
export const toggleLike = mutation({
  args: {
    resourceId: v.id("mentorResources"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if already liked
    const existing = await ctx.db
      .query("resourceEngagement")
      .withIndex("by_resource_and_user", (q) =>
        q.eq("resourceId", args.resourceId).eq("userId", userId)
      )
      .filter((q) => q.eq(q.field("type"), "like"))
      .first();

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    if (existing) {
      // Unlike
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.resourceId, {
        likes: Math.max(0, resource.likes - 1),
      });
      return { liked: false };
    } else {
      // Like
      await ctx.db.insert("resourceEngagement", {
        resourceId: args.resourceId,
        userId,
        type: "like",
        createdAt: Date.now(),
      });
      await ctx.db.patch(args.resourceId, {
        likes: resource.likes + 1,
      });
      return { liked: true };
    }
  },
});

/**
 * Toggle save on a resource
 */
export const toggleSave = mutation({
  args: {
    resourceId: v.id("mentorResources"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if already saved
    const existing = await ctx.db
      .query("resourceEngagement")
      .withIndex("by_resource_and_user", (q) =>
        q.eq("resourceId", args.resourceId).eq("userId", userId)
      )
      .filter((q) => q.eq(q.field("type"), "save"))
      .first();

    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    if (existing) {
      // Unsave
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.resourceId, {
        saves: Math.max(0, resource.saves - 1),
      });
      return { saved: false };
    } else {
      // Save
      await ctx.db.insert("resourceEngagement", {
        resourceId: args.resourceId,
        userId,
        type: "save",
        createdAt: Date.now(),
      });
      await ctx.db.patch(args.resourceId, {
        saves: resource.saves + 1,
      });
      return { saved: true };
    }
  },
});

/**
 * Increment view count
 */
export const incrementViews = mutation({
  args: {
    resourceId: v.id("mentorResources"),
  },
  handler: async (ctx, args) => {
    const resource = await ctx.db.get(args.resourceId);
    if (!resource) {
      throw new Error("Resource not found");
    }

    await ctx.db.patch(args.resourceId, {
      views: resource.views + 1,
    });

    return { success: true };
  },
});
