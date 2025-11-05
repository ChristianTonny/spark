import { query } from "./_generated/server";

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
