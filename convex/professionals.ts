import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

/**
 * Safely enrich professional data with public user fields only
 * Filters out sensitive data like earnings and auth tokens
 */
async function enrichProfessionalPublic(ctx: any, prof: any) {
  const user = await ctx.db.get(prof.userId);
  if (!user) return null;

  // Only return public fields - exclude sensitive earnings and auth data
  return {
    _id: prof._id,
    _creationTime: prof._creationTime,
    userId: prof.userId,
    company: prof.company,
    jobTitle: prof.jobTitle,
    bio: prof.bio,
    yearsExperience: prof.yearsExperience,
    rating: prof.rating,
    chatsCompleted: prof.chatsCompleted,
    careerIds: prof.careerIds,
    availability: prof.availability,
    calendlyUrl: prof.calendlyUrl,
    // Exclude: totalEarnings, earningsThisMonth, earningsLastMonth, ratePerChat
    // User fields (public only)
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    // Exclude: tokenIdentifier, clerkId, email, phone
  };
}

// Get all professionals (public data only)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();

    // Enrich with public user data only
    const enriched = await Promise.all(
      professionals.map((prof) => enrichProfessionalPublic(ctx, prof))
    );

    // Filter out any null results
    return enriched.filter((p) => p !== null);
  },
});

// Search professionals (public data only)
export const search = query({
  args: {
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let professionals = await ctx.db.query("professionals").collect();

    // Filter by search query
    if (args.searchQuery && args.searchQuery !== '') {
      const query = args.searchQuery.toLowerCase();
      professionals = professionals.filter(
        (p) =>
          p.company.toLowerCase().includes(query) ||
          p.jobTitle.toLowerCase().includes(query)
      );
    }

    // Enrich with public user data only
    const enriched = await Promise.all(
      professionals.map((prof) => enrichProfessionalPublic(ctx, prof))
    );

    // Filter out any null results
    return enriched.filter((p) => p !== null);
  },
});

// Get professionals by career IDs (public data only)
export const getByCareerIds = query({
  args: { careerIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const professionals = await ctx.db.query("professionals").collect();

    // Filter professionals who can discuss these careers
    const filtered = professionals.filter((p) =>
      p.careerIds.some((id) => args.careerIds.includes(id))
    );

    // Enrich with public user data only
    const enriched = await Promise.all(
      filtered.map((prof) => enrichProfessionalPublic(ctx, prof))
    );

    // Filter out any null results
    return enriched.filter((p) => p !== null);
  },
});

// Get current user's professional profile (includes private data for own profile)
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

    // Return combined data with ALL fields (user viewing their own profile)
    // Safe to include earnings and private data here
    return {
      ...professional,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      // Exclude sensitive auth fields
      // tokenIdentifier and clerkId not needed on frontend
    };
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

    // Create professional profile
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
    });

    return professionalId;
  },
});
