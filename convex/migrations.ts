import { mutation } from "./_generated/server";

/**
 * One-time migration to recalculate all mentor stats
 * Run this via Convex dashboard or CLI to update all existing mentors
 */
export const recalculateAllMentorStats = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all professionals
    const professionals = await ctx.db.query("professionals").collect();

    let updated = 0;

    for (const professional of professionals) {
      // Get all completed chats for this mentor
      const completedChats = await ctx.db
        .query("careerChats")
        .withIndex("by_professional_and_status", (q) =>
          q.eq("professionalId", professional._id).eq("status", "completed")
        )
        .collect();

      const chatsCompleted = completedChats.length;

      // Calculate average rating from chats that have ratings
      const ratedChats = completedChats.filter((chat) => chat.rating !== undefined);
      const averageRating =
        ratedChats.length > 0
          ? ratedChats.reduce((sum, chat) => sum + (chat.rating || 0), 0) / ratedChats.length
          : 5.0; // Default to 5.0 if no ratings yet

      // Update professional stats
      await ctx.db.patch(professional._id, {
        chatsCompleted,
        rating: averageRating,
      });

      updated++;
    }

    return {
      success: true,
      message: `Recalculated stats for ${updated} mentors`,
      updated,
    };
  },
});

/**
 * Reset all mentor stats to default values
 * Useful for testing or if you want to start fresh
 */
export const resetAllMentorStats = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all professionals
    const professionals = await ctx.db.query("professionals").collect();

    let reset = 0;

    for (const professional of professionals) {
      await ctx.db.patch(professional._id, {
        chatsCompleted: 0,
        rating: 5.0,
      });
      reset++;
    }

    return {
      success: true,
      message: `Reset stats for ${reset} mentors to defaults`,
      reset,
    };
  },
});
