import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

// Get student profile for current authenticated user
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    if (!user || user.role !== "student") {
      return null;
    }

    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    return profile;
  },
});

// Get student profile by user ID (for admins or public views)
export const getByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    return profile;
  },
});

// Create or update student profile
export const upsert = mutation({
  args: {
    gradeLevel: v.string(),
    school: v.optional(v.string()),
    district: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    if (user.role !== "student") {
      throw new Error("Only students can have student profiles");
    }

    // Check if profile exists
    const existing = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (existing) {
      // Update existing profile
      await ctx.db.patch(existing._id, {
        gradeLevel: args.gradeLevel,
        school: args.school,
        district: args.district,
        interests: args.interests,
      });
      return { profileId: existing._id, created: false };
    } else {
      // Create new profile
      const profileId = await ctx.db.insert("studentProfiles", {
        userId: user._id,
        gradeLevel: args.gradeLevel,
        school: args.school,
        district: args.district,
        interests: args.interests,
        careersExplored: 0,
        chatsCompleted: 0,
        chatsUpcoming: 0,
        assessmentsTaken: 0,
      });
      return { profileId, created: true };
    }
  },
});

// Increment career explored count
export const incrementCareersExplored = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (profile) {
      await ctx.db.patch(profile._id, {
        careersExplored: profile.careersExplored + 1,
      });
    }
  },
});

// Increment assessments taken
export const incrementAssessmentsTaken = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (profile) {
      await ctx.db.patch(profile._id, {
        assessmentsTaken: profile.assessmentsTaken + 1,
      });
    }
  },
});
