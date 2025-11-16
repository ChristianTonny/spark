import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Get current user's settings
export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    // Return default settings if none exist
    if (!settings) {
      return {
        emailNotifications: true,
        pushNotifications: false,
        weeklyDigest: true,
        careerRecommendations: true,
        profilePublic: false,
        showEmail: false,
        showProgress: true,
      };
    }

    return settings;
  },
});

// Update user settings
export const update = mutation({
  args: {
    emailNotifications: v.optional(v.boolean()),
    pushNotifications: v.optional(v.boolean()),
    weeklyDigest: v.optional(v.boolean()),
    careerRecommendations: v.optional(v.boolean()),
    profilePublic: v.optional(v.boolean()),
    showEmail: v.optional(v.boolean()),
    showProgress: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Check if settings exist
    const existing = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    // Build update object with only provided fields
    const updates: any = {};
    if (args.emailNotifications !== undefined) updates.emailNotifications = args.emailNotifications;
    if (args.pushNotifications !== undefined) updates.pushNotifications = args.pushNotifications;
    if (args.weeklyDigest !== undefined) updates.weeklyDigest = args.weeklyDigest;
    if (args.careerRecommendations !== undefined) updates.careerRecommendations = args.careerRecommendations;
    if (args.profilePublic !== undefined) updates.profilePublic = args.profilePublic;
    if (args.showEmail !== undefined) updates.showEmail = args.showEmail;
    if (args.showProgress !== undefined) updates.showProgress = args.showProgress;

    if (existing) {
      // Update existing settings
      await ctx.db.patch(existing._id, updates);
      return { success: true, created: false };
    } else {
      // Create new settings with defaults for unprovided fields
      await ctx.db.insert("userSettings", {
        userId: user._id,
        emailNotifications: args.emailNotifications ?? true,
        pushNotifications: args.pushNotifications ?? false,
        weeklyDigest: args.weeklyDigest ?? true,
        careerRecommendations: args.careerRecommendations ?? true,
        profilePublic: args.profilePublic ?? false,
        showEmail: args.showEmail ?? false,
        showProgress: args.showProgress ?? true,
      });
      return { success: true, created: true };
    }
  },
});
