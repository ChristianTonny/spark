import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Get all professionals (only approved for public viewing)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();

    // Filter to only approved professionals (isApproved must be explicitly true)
    const approvedProfessionals = professionals.filter((p) => p.isApproved === true);

    // Enrich with user data
    const enriched = await Promise.all(
      approvedProfessionals.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return { ...prof, ...user };
      })
    );

    return enriched;
  },
});

// Search professionals (only approved for public viewing)
export const search = query({
  args: {
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let professionals = await ctx.db.query("professionals").collect();

    // Filter to only approved professionals
    professionals = professionals.filter((p) => p.isApproved === true);

    // Filter by search query
    if (args.searchQuery && args.searchQuery !== '') {
      const query = args.searchQuery.toLowerCase();
      professionals = professionals.filter(
        (p) =>
          p.company.toLowerCase().includes(query) ||
          p.jobTitle.toLowerCase().includes(query)
      );
    }

    // Enrich with user data
    const enriched = await Promise.all(
      professionals.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return { ...prof, ...user };
      })
    );

    return enriched;
  },
});

// Get professionals by career IDs (only approved for public viewing)
export const getByCareerIds = query({
  args: { careerIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const professionals = await ctx.db.query("professionals").collect();

    // Filter professionals who can discuss these careers AND are approved
    const filtered = professionals.filter((p) =>
      p.isApproved === true && p.careerIds.some((id) => args.careerIds.includes(id))
    );

    // Enrich with user data
    const enriched = await Promise.all(
      filtered.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return { ...prof, ...user };
      })
    );

    return enriched;
  },
});

// Get current user's professional profile
export const getCurrentProfessional = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    // Get user from users table
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return null;
    }

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      return null;
    }

    // Return combined data
    return { ...professional, ...user };
  },
});

// Create a professional profile
export const create = mutation({
  args: {
    company: v.string(),
    jobTitle: v.string(),
    bio: v.string(), // Make required to match form
    yearsExperience: v.number(), // Make required to match form
    calendlyUrl: v.optional(v.string()),
    ratePerChat: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Check if professional profile already exists
    const existing = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (existing) {
      throw new Error("Professional profile already exists");
    }

    // Create professional profile (not approved by default)
    const professionalId = await ctx.db.insert("professionals", {
      userId: user._id,
      company: args.company,
      jobTitle: args.jobTitle,
      bio: args.bio,
      yearsExperience: args.yearsExperience,
      rating: 5.0, // Default rating
      chatsCompleted: 0,
      careerIds: [], // Will be set later in profile settings
      availability: [], // Will be set later in availability settings
      calendlyUrl: args.calendlyUrl,
      ratePerChat: args.ratePerChat || 0,
      totalEarnings: 0,
      earningsThisMonth: 0,
      earningsLastMonth: 0,
      isApproved: false, // Requires admin approval
    });

    return professionalId;
  },
});

// Update professional profile
export const updateProfile = mutation({
  args: {
    company: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    bio: v.optional(v.string()),
    yearsExperience: v.optional(v.number()),
    ratePerChat: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Get existing professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Update only provided fields
    const updates: any = {};
    if (args.company !== undefined) updates.company = args.company;
    if (args.jobTitle !== undefined) updates.jobTitle = args.jobTitle;
    if (args.bio !== undefined) updates.bio = args.bio;
    if (args.yearsExperience !== undefined) updates.yearsExperience = args.yearsExperience;
    if (args.ratePerChat !== undefined) updates.ratePerChat = args.ratePerChat;

    await ctx.db.patch(professional._id, updates);

    return professional._id;
  },
});

/**
 * Recalculate mentor stats based on actual completed bookings
 * Called after session completion or rating
 */
export const recalculateMentorStats = mutation({
  args: {
    professionalId: v.id("professionals"),
  },
  handler: async (ctx, args) => {
    // Get all completed chats for this mentor
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", args.professionalId).eq("status", "completed")
      )
      .collect();

    const chatsCompleted = completedChats.length;

    // Calculate average rating from chats that have ratings
    const ratedChats = completedChats.filter((chat) => chat.rating !== undefined);
    const averageRating =
      ratedChats.length > 0
        ? ratedChats.reduce((sum, chat) => sum + (chat.rating || 0), 0) / ratedChats.length
        : 5.0; // Default to 5.0 if no ratings yet

    // Update professional stats
    await ctx.db.patch(args.professionalId, {
      chatsCompleted,
      rating: averageRating,
    });

    return { chatsCompleted, rating: averageRating };
  },
});

/**
 * Get detailed mentor profile by user ID
 * Used for individual mentor profile pages (only approved mentors)
 */
export const getMentorProfile = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!professional) {
      return null;
    }

    // Only return approved mentor profiles for public viewing
    if (!professional.isApproved) {
      return null;
    }

    // Get user details
    const user = await ctx.db.get(args.userId);
    if (!user) {
      return null;
    }

    // Get completed chats with ratings for reviews
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professional._id).eq("status", "completed")
      )
      .order("desc")
      .take(10); // Last 10 reviews

    // Enrich reviews with student info
    const reviews = await Promise.all(
      completedChats
        .filter((chat) => chat.rating !== undefined && chat.feedback)
        .map(async (chat) => {
          const student = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), chat.studentId))
            .first();

          return {
            rating: chat.rating!,
            feedback: chat.feedback,
            studentName: student ? `${student.firstName} ${student.lastName}` : "Anonymous",
            completedAt: chat.completedAt || chat.requestedAt,
          };
        })
    );

    // Get rating distribution
    const ratingDistribution = {
      5: completedChats.filter((c) => c.rating === 5).length,
      4: completedChats.filter((c) => c.rating === 4).length,
      3: completedChats.filter((c) => c.rating === 3).length,
      2: completedChats.filter((c) => c.rating === 2).length,
      1: completedChats.filter((c) => c.rating === 1).length,
    };

    return {
      ...professional,
      ...user,
      reviews,
      ratingDistribution,
      totalReviews: reviews.length,
    };
  },
});
