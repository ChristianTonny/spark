import { v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";

// Helper to get user ID from context
async function getUserId(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  return user?._id || null;
}

/**
 * Save a reality quiz result
 */
export const saveResult = mutation({
  args: {
    careerId: v.id("careers"),
    answers: v.any(),
    scores: v.object({
      technical: v.number(),
      pressure: v.number(),
      collaboration: v.number(),
      creativity: v.number(),
      independence: v.number(),
      workLifeBalance: v.number(),
    }),
    readinessPercentage: v.number(),
    resultTier: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      throw new Error("Must be authenticated to save quiz results");
    }

    const resultId = await ctx.db.insert("quizResults", {
      userId,
      careerId: args.careerId,
      answers: args.answers,
      scores: args.scores,
      readinessPercentage: args.readinessPercentage,
      resultTier: args.resultTier,
      completedAt: Date.now(),
    });

    return { resultId };
  },
});

/**
 * Get user's quiz results for a specific career
 */
export const getResultForCareer = query({
  args: {
    careerId: v.id("careers"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return null;
    }

    // Get most recent result for this career
    const results = await ctx.db
      .query("quizResults")
      .withIndex("by_user_and_career", (q) =>
        q.eq("userId", userId).eq("careerId", args.careerId)
      )
      .order("desc")
      .take(1);

    return results[0] || null;
  },
});

/**
 * Get all quiz results for current user
 */
export const getUserResults = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      return [];
    }

    const results = await ctx.db
      .query("quizResults")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // Enrich with career data
    const enriched = await Promise.all(
      results.map(async (result) => {
        const career = await ctx.db.get(result.careerId);
        return {
          ...result,
          career: career ? {
            _id: career._id,
            title: career.title,
            category: career.category,
            videoThumbnail: career.videoThumbnail,
          } : null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Delete a quiz result
 */
export const deleteResult = mutation({
  args: {
    resultId: v.id("quizResults"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (!userId) {
      throw new Error("Must be authenticated");
    }

    const result = await ctx.db.get(args.resultId);

    if (!result) {
      throw new Error("Result not found");
    }

    if (result.userId !== userId) {
      throw new Error("Not authorized to delete this result");
    }

    await ctx.db.delete(args.resultId);
  },
});
