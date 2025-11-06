import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Get all professionals
export const list = query({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();

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

// Search professionals
export const search = query({
  args: {
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let professionals = await ctx.db.query("professionals").collect();

    // Filter by search query - need to enrich first to search by name
    let enriched = await Promise.all(
      professionals.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return { ...prof, ...user };
      })
    );

    // Filter by search query
    if (args.searchQuery && args.searchQuery !== '') {
      const query = args.searchQuery.toLowerCase();
      enriched = enriched.filter(
        (p) =>
          p.company.toLowerCase().includes(query) ||
          p.jobTitle.toLowerCase().includes(query) ||
          (p.firstName && p.firstName.toLowerCase().includes(query)) ||
          (p.lastName && p.lastName.toLowerCase().includes(query))
      );
    }

    return enriched;
  },
});

// Get professionals by career IDs
export const getByCareerIds = query({
  args: { careerIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const professionals = await ctx.db.query("professionals").collect();

    // Filter professionals who can discuss these careers
    const filtered = professionals.filter((p) =>
      p.careerIds.some((id) => args.careerIds.includes(id))
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

// Create professional profile
export const create = mutation({
  args: {
    jobTitle: v.string(),
    company: v.string(),
    bio: v.string(),
    whyIMentor: v.string(),
    yearsExperience: v.number(),
    location: v.string(),
    languages: v.array(v.string()),
    careerCategories: v.array(v.string()),
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

    // Get career IDs for the selected categories
    const careers = await ctx.db.query("careers").collect();
    const careerIds = careers
      .filter((c) => args.careerCategories.includes(c.category))
      .map((c) => c._id);

    // Create professional profile
    const professionalId = await ctx.db.insert("professionals", {
      userId: user._id,
      jobTitle: args.jobTitle,
      company: args.company,
      bio: args.bio,
      whyIMentor: args.whyIMentor,
      yearsExperience: args.yearsExperience,
      location: args.location,
      languages: args.languages,
      availabilityStatus: "active", // Default to active
      avgResponseTimeHours: 24, // Default 24 hours
      careerIds: careerIds,
      rating: 5.0, // Default rating
      chatsCompleted: 0,
      availability: [], // Will be set later
      totalEarnings: 0,
      earningsThisMonth: 0,
      earningsLastMonth: 0,
    });

    return professionalId;
  },
});

// Get current user's professional profile
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return null;

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    return professional;
  },
});
