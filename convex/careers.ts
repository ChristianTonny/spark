import { query } from "./_generated/server";

// Test query - fetch all careers
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
