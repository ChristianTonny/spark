import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

// Get bookmarked careers for the current authenticated user
// Returns empty array if not authenticated (public pages)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    // Return empty array if not authenticated
    if (!user) {
      return [];
    }

    const bookmarks = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
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
// Returns empty array if not authenticated (public pages)
export const getIds = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    // Return empty array if not authenticated
    if (!user) {
      return [];
    }

    const bookmarks = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
      .collect();

    return bookmarks.map((b) => b.careerId);
  },
});

// Toggle bookmark (add or remove) for the current authenticated user
export const toggle = mutation({
  args: {
    careerId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Check if already bookmarked
    const bookmarks = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
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
        studentId: user._id,
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
