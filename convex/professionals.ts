import { query } from "./_generated/server";
import { v } from "convex/values";

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
