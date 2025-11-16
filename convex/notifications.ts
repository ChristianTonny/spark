import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * Get all notifications for the current user
 * Returns notifications sorted by creation date (newest first)
 */
export const getNotifications = query({
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

    // Get all notifications for this user, sorted by creation date (newest first)
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_created", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return notifications;
  },
});

/**
 * Get count of unread notifications for the current user
 * Used for the notification badge in navigation
 */
export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return 0; // Return 0 for unauthenticated users instead of throwing
    }

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return 0;
    }

    // Count unread notifications
    const unreadNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) => q.eq("userId", user._id).eq("read", false))
      .collect();

    return unreadNotifications.length;
  },
});

/**
 * Mark a single notification as read
 */
export const markAsRead = mutation({
  args: {
    notificationId: v.id("notifications"),
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

    // Get the notification
    const notification = await ctx.db.get(args.notificationId);

    if (!notification) {
      throw new Error("Notification not found");
    }

    // Verify the notification belongs to the current user
    if (notification.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    // Mark as read
    await ctx.db.patch(args.notificationId, {
      read: true,
    });

    return { success: true };
  },
});

/**
 * Mark all notifications as read for the current user
 */
export const markAllAsRead = mutation({
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

    // Get all unread notifications for this user
    const unreadNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) => q.eq("userId", user._id).eq("read", false))
      .collect();

    // Mark each one as read
    await Promise.all(
      unreadNotifications.map((notification) =>
        ctx.db.patch(notification._id, { read: true })
      )
    );

    return { success: true, count: unreadNotifications.length };
  },
});

/**
 * Create a new notification
 * This is typically called by other mutations (e.g., when a booking is created)
 */
export const createNotification = mutation({
  args: {
    userId: v.id("users"),
    type: v.union(
      v.literal("booking"),
      v.literal("message"),
      v.literal("review"),
      v.literal("system")
    ),
    title: v.string(),
    message: v.string(),
    relatedChatId: v.optional(v.id("careerChats")),
    relatedUserId: v.optional(v.id("users")),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Create the notification
    const notificationId = await ctx.db.insert("notifications", {
      userId: args.userId,
      type: args.type,
      title: args.title,
      message: args.message,
      read: false,
      createdAt: Date.now(),
      relatedChatId: args.relatedChatId,
      relatedUserId: args.relatedUserId,
      metadata: args.metadata,
    });

    return notificationId;
  },
});

/**
 * Delete a notification
 */
export const deleteNotification = mutation({
  args: {
    notificationId: v.id("notifications"),
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

    // Get the notification
    const notification = await ctx.db.get(args.notificationId);

    if (!notification) {
      throw new Error("Notification not found");
    }

    // Verify the notification belongs to the current user
    if (notification.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    // Delete the notification
    await ctx.db.delete(args.notificationId);

    return { success: true };
  },
});

/**
 * Delete all read notifications for the current user
 */
export const deleteAllRead = mutation({
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

    // Get all read notifications for this user
    const readNotifications = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) => q.eq("userId", user._id).eq("read", true))
      .collect();

    // Delete each one
    await Promise.all(
      readNotifications.map((notification) => ctx.db.delete(notification._id))
    );

    return { success: true, count: readNotifications.length };
  },
});
