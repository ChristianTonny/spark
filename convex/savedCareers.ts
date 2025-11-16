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
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .collect();

    // Fetch full career details
    const careers = await Promise.all(
      bookmarks.map(async (b) => {
        const career = await ctx.db.get(b.careerId as any);
        // Check that it's a career document (has title and category)
        if (career && 'title' in career && 'category' in career) {
          return career;
        }
        return null;
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
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .collect();

    return bookmarks.map((b) => b.careerId);
  },
});

// Toggle bookmark (add or remove) for the current authenticated user
// Note: Convex mutations are transactional, preventing race conditions
export const toggle = mutation({
  args: {
    careerId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Verify career exists before bookmarking
    const career = await ctx.db.get(args.careerId as any);
    if (!career) {
      throw new Error("Career not found");
    }

    // Check if already bookmarked (more efficient - only query for this specific combo)
    const existing = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .filter((q) => q.eq(q.field("careerId"), args.careerId))
      .first();

    if (existing) {
      // Remove bookmark
      await ctx.db.delete(existing._id);

      // Decrement career saves count
      if ('saves' in career && typeof career.saves === 'number') {
        await ctx.db.patch(args.careerId as any, {
          saves: Math.max(0, career.saves - 1),
        });
      }

      return { action: "removed", careerId: args.careerId };
    } else {
      // Add bookmark
      const bookmarkId = await ctx.db.insert("savedCareers", {
        studentId: user._id.toString(),
        careerId: args.careerId,
        savedAt: Date.now(),
      });

      // Increment career saves count
      if ('saves' in career && typeof career.saves === 'number') {
        await ctx.db.patch(args.careerId as any, {
          saves: career.saves + 1,
        });
      }

      return { action: "added", careerId: args.careerId, bookmarkId };
    }
  },
});
