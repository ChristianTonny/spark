import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all careers
export const list = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    return careers;
  },
});

// Get career count
export const count = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    return careers.length;
  },
});

// Get featured careers (first 6)
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").take(6);
    return careers;
  },
});

// Get unique categories
export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    const careers = await ctx.db.query("careers").collect();
    const categories = [...new Set(careers.map(c => c.category))];
    return categories;
  },
});

// Get career by ID
export const getById = query({
  args: { id: v.id("careers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get multiple careers by IDs (for comparison tool)
export const getByIds = query({
  args: { ids: v.array(v.id("careers")) },
  handler: async (ctx, args) => {
    const careers = await Promise.all(
      args.ids.map(id => ctx.db.get(id))
    );
    // Filter out any null results
    return careers.filter(c => c !== null);
  },
});

// Search and filter careers
export const search = query({
  args: {
    searchQuery: v.optional(v.string()),
    category: v.optional(v.string()),
    salaryFilter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let careers = await ctx.db.query("careers").collect();

    // Filter by search query
    if (args.searchQuery && args.searchQuery !== '') {
      const query = args.searchQuery.toLowerCase();
      careers = careers.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.shortDescription.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (args.category && args.category !== 'All') {
      careers = careers.filter(c => c.category === args.category);
    }

    // Filter by salary range
    if (args.salaryFilter && args.salaryFilter !== 'all') {
      if (args.salaryFilter === 'low') {
        careers = careers.filter(c => c.salaryMax <= 5000000);
      } else if (args.salaryFilter === 'mid') {
        careers = careers.filter(c => c.salaryMin > 5000000 && c.salaryMax <= 10000000);
      } else if (args.salaryFilter === 'high') {
        careers = careers.filter(c => c.salaryMin > 10000000);
      }
    }

    return careers;
  },
});
