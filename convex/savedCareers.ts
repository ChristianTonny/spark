import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get bookmarked careers for a student
export const list = query({
  args: { studentId: v.string() },
  handler: async (ctx, args) => {
    const bookmarks = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();

    // Fetch full career details
    const careers = await Promise.all(
      bookmarks.map(async (b) => {
        const career = await ctx.db.get(b.careerId as any);
        return career;
      })
    );

    return careers.filter((c) => c !== null);
  },
});

// Get bookmark IDs only (for checking if career is bookmarked)
export const getIds = query({
  args: { studentId: v.string() },
  handler: async (ctx, args) => {
    const bookmarks = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();

    return bookmarks.map((b) => b.careerId);
  },
});

// Toggle bookmark (add or remove)
export const toggle = mutation({
  args: {
    studentId: v.string(),
    careerId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if already bookmarked
    const bookmarks = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();

    const existing = bookmarks.find((b) => b.careerId === args.careerId);

    if (existing) {
      // Remove bookmark
      await ctx.db.delete(existing._id);

      // Decrement career saves count
      const career = await ctx.db.get(args.careerId as any);
      if (career && 'saves' in career) {
        await ctx.db.patch(args.careerId as any, {
          saves: Math.max(0, career.saves - 1),
        });
      }

      return { action: "removed" };
    } else {
      // Add bookmark
      await ctx.db.insert("savedCareers", {
        studentId: args.studentId,
        careerId: args.careerId,
        savedAt: Date.now(),
      });

      // Increment career saves count
      const career = await ctx.db.get(args.careerId as any);
      if (career && 'saves' in career) {
        await ctx.db.patch(args.careerId as any, {
          saves: career.saves + 1,
        });
      }

      return { action: "added" };
    }
  },
});
