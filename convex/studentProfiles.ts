import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

/**
 * Get the current user's student profile
 */
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return null;
    }

    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    return profile;
  },
});

/**
 * Get a student profile by user ID
 */
export const getByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

/**
 * Update the current user's student profile
 */
export const update = mutation({
  args: {
    gradeLevel: v.optional(v.string()),
    school: v.optional(v.string()),
    district: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Get existing profile
    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!profile) {
      // Create profile if it doesn't exist
      return await ctx.db.insert("studentProfiles", {
        userId: user._id,
        gradeLevel: args.gradeLevel || "Not specified",
        school: args.school,
        district: args.district,
        interests: args.interests,
        careersExplored: 0,
        chatsCompleted: 0,
        chatsUpcoming: 0,
        assessmentsTaken: 0,
      });
    } else {
      // Update existing profile - only update fields that are provided
      const updates: any = {};
      if (args.gradeLevel !== undefined) updates.gradeLevel = args.gradeLevel;
      if (args.school !== undefined) updates.school = args.school;
      if (args.district !== undefined) updates.district = args.district;
      if (args.interests !== undefined) updates.interests = args.interests;

      await ctx.db.patch(profile._id, updates);
      return profile._id;
    }
  },
});

/**
 * Increment careers explored count
 */
export const incrementCareersExplored = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (profile) {
      await ctx.db.patch(profile._id, {
        careersExplored: profile.careersExplored + 1,
      });
    }
  },
});

/**
 * Increment assessments taken count
 */
export const incrementAssessmentsTaken = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (profile) {
      await ctx.db.patch(profile._id, {
        assessmentsTaken: profile.assessmentsTaken + 1,
      });
    }
  },
});
