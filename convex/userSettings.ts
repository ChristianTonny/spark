import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Get user settings for the current user
 * Creates default settings if they don't exist
 */
export const getUserSettings = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Try to get existing settings
    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    // If settings exist, return them
    if (settings) {
      return settings;
    }

    // Otherwise, return default settings (not saved to DB - will be created on first save)
    return {
      _id: "" as any, // Placeholder ID
      _creationTime: Date.now(),
      userId: user._id,
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      bookingReminders: true,
      messageNotifications: true,
      profileVisibility: "public" as const,
      showOnlineStatus: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  },
});

/**
 * Update user settings
 */
export const updateSettings = mutation({
  args: {
    emailNotifications: v.optional(v.boolean()),
    pushNotifications: v.optional(v.boolean()),
    marketingEmails: v.optional(v.boolean()),
    bookingReminders: v.optional(v.boolean()),
    messageNotifications: v.optional(v.boolean()),
    profileVisibility: v.optional(v.union(v.literal("public"), v.literal("private"))),
    showOnlineStatus: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Get existing settings
    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!settings) {
      // Create new settings if they don't exist
      const newSettings = {
        userId: user._id,
        emailNotifications: args.emailNotifications ?? true,
        pushNotifications: args.pushNotifications ?? true,
        marketingEmails: args.marketingEmails ?? false,
        bookingReminders: args.bookingReminders ?? true,
        messageNotifications: args.messageNotifications ?? true,
        profileVisibility: args.profileVisibility ?? ("public" as const),
        showOnlineStatus: args.showOnlineStatus ?? true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await ctx.db.insert("userSettings", newSettings);
      return { success: true };
    }

    // Update existing settings
    const updateData: any = {
      updatedAt: Date.now(),
    };

    // Only include fields that were provided
    if (args.emailNotifications !== undefined) {
      updateData.emailNotifications = args.emailNotifications;
    }
    if (args.pushNotifications !== undefined) {
      updateData.pushNotifications = args.pushNotifications;
    }
    if (args.marketingEmails !== undefined) {
      updateData.marketingEmails = args.marketingEmails;
    }
    if (args.bookingReminders !== undefined) {
      updateData.bookingReminders = args.bookingReminders;
    }
    if (args.messageNotifications !== undefined) {
      updateData.messageNotifications = args.messageNotifications;
    }
    if (args.profileVisibility !== undefined) {
      updateData.profileVisibility = args.profileVisibility;
    }
    if (args.showOnlineStatus !== undefined) {
      updateData.showOnlineStatus = args.showOnlineStatus;
    }

    await ctx.db.patch(settings._id, updateData);

    return { success: true };
  },
});

/**
 * Reset settings to default
 */
export const resetToDefaults = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Get existing settings
    const settings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    const defaultSettings = {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      bookingReminders: true,
      messageNotifications: true,
      profileVisibility: "public" as const,
      showOnlineStatus: true,
      updatedAt: Date.now(),
    };

    if (!settings) {
      // Create new settings with defaults
      await ctx.db.insert("userSettings", {
        userId: user._id,
        ...defaultSettings,
        createdAt: Date.now(),
      });
    } else {
      // Update existing settings to defaults
      await ctx.db.patch(settings._id, defaultSettings);
    }

    return { success: true };
  },
});
