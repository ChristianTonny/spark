import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all assessments
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("assessments").collect();
  },
});

// Get assessment by ID
export const getById = query({
  args: { id: v.id("assessments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get student's assessment results
export const getResults = query({
  args: { studentId: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("assessmentResults")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
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
              career: career
                ? { _id: career._id, title: career.title, category: career.category }
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

// Save assessment result
export const saveResult = mutation({
  args: {
    assessmentId: v.id("assessments"),
    studentId: v.string(),
    answers: v.any(),
    careerMatches: v.array(
      v.object({
        careerId: v.string(),
        matchPercentage: v.number(),
        matchReasons: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const resultId = await ctx.db.insert("assessmentResults", {
      assessmentId: args.assessmentId,
      studentId: args.studentId,
      answers: args.answers,
      careerMatches: args.careerMatches,
      completedAt: Date.now(),
    });

    return { resultId };
  },
});

// Delete assessment result
export const deleteResult = mutation({
  args: { resultId: v.id("assessmentResults") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.resultId);
    return { success: true };
  },
});
