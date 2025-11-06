import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

// Get all assessments (public)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("assessments").collect();
  },
});

// Get assessment by ID (public)
export const getById = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get current user's assessment results
// Returns empty array if not authenticated (public pages)
export const getResults = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    // Return empty array if not authenticated
    if (!user) {
      return [];
    }

    const results = await ctx.db
      .query("assessmentResults")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .order("desc")
      .collect();

    // Enrich with career details for top matches
    const enriched = await Promise.all(
      results.map(async (result) => {
        const topMatches = await Promise.all(
          result.careerMatches.map(async (match) => {
            const career = await ctx.db.get(match.careerId as any);
            return {
              ...match,
              career: career && 'title' in career && 'category' in career
                ? {
                    _id: career._id,
                    title: career.title,
                    category: career.category,
                    shortDescription: career.shortDescription,
                    salaryMin: career.salaryMin,
                    salaryMax: career.salaryMax
                  }
                : null,
            };
          })
        );
        return { ...result, careerMatches: topMatches };
      })
    );

    return enriched;
  },
});

// Save assessment result for current authenticated user
export const saveResult = mutation({
  args: {
    assessmentId: v.id("assessments"),
    answers: v.any(),
    careerMatches: v.array(
      v.object({
        careerId: v.string(),
        matchPercentage: v.number(),
        matchReasons: v.array(v.string()),
        interestScore: v.optional(v.number()),
        valueScore: v.optional(v.number()),
        environmentScore: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const resultId = await ctx.db.insert("assessmentResults", {
      assessmentId: args.assessmentId,
      studentId: user._id.toString(),
      answers: args.answers,
      careerMatches: args.careerMatches,
      completedAt: Date.now(),
    });

    return { resultId };
  },
});

// Delete assessment result (must belong to current user)
export const deleteResult = mutation({
  args: { resultId: v.id("assessmentResults") },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Verify the result belongs to the current user
    const result = await ctx.db.get(args.resultId);
    if (!result) {
      throw new Error("Result not found");
    }
    if (result.studentId !== user._id) {
      throw new Error("Unauthorized: You can only delete your own results");
    }

    await ctx.db.delete(args.resultId);
    return { success: true };
  },
});
