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

// Create a professional profile
export const create = mutation({
  args: {
    company: v.string(),
    jobTitle: v.string(),
    bio: v.optional(v.string()),
    yearsExperience: v.optional(v.number()),
    careerIds: v.array(v.string()),
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
      careerIds: args.careerIds,
      availability: [], // Will be set later
      calendlyUrl: args.calendlyUrl,
      ratePerChat: args.ratePerChat || 0,
      totalEarnings: 0,
      earningsThisMonth: 0,
      earningsLastMonth: 0,
    });

    return professionalId;
  },
});
