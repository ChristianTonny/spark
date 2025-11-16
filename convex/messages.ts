import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to get current user ID
async function getCurrentUserId(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  return user?._id;
}

/**
 * Send a message in a chat
 */
export const send = mutation({
  args: {
    chatId: v.id("careerChats"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify user is part of this chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    if (chat.studentId !== userId && chat.professionalId !== userId) {
      throw new Error("Not authorized to send messages in this chat");
    }

    // Only allow messages in confirmed or completed chats
    if (chat.status !== "confirmed" && chat.status !== "completed") {
      throw new Error("Chat is not active");
    }

    // Create message
    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      senderId: userId,
      content: args.content,
      type: "text",
      readBy: [userId], // Sender has automatically read their own message
      sentAt: Date.now(),
    });

    return { messageId };
  },
});

/**
 * Get all messages for a chat
 */
export const list = query({
  args: {
    chatId: v.id("careerChats"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return [];
    }

    // Verify user is part of this chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      return [];
    }

    if (chat.studentId !== userId && chat.professionalId !== userId) {
      return [];
    }

    // Get all messages for this chat
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat_and_time", (q) => q.eq("chatId", args.chatId))
      .collect();

    // Enrich messages with sender info
    const enrichedMessages = await Promise.all(
      messages.map(async (message) => {
        const sender = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), message.senderId))
          .first();

        return {
          ...message,
          sender: sender
            ? {
                id: sender._id,
                name: `${sender.firstName} ${sender.lastName}`,
                avatar: sender.avatar,
              }
            : null,
          isOwn: message.senderId === userId,
        };
      })
    );

    return enrichedMessages;
  },
});

/**
 * Mark messages as read
 */
export const markAsRead = mutation({
  args: {
    chatId: v.id("careerChats"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify user is part of this chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    if (chat.studentId !== userId && chat.professionalId !== userId) {
      throw new Error("Not authorized");
    }

    // Get all unread messages in this chat
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .collect();

    const unreadMessages = messages.filter((msg) => !msg.readBy.includes(userId));

    // Mark each unread message as read
    for (const message of unreadMessages) {
      await ctx.db.patch(message._id, {
        readBy: [...message.readBy, userId],
      });
    }

    return { markedCount: unreadMessages.length };
  },
});

/**
 * Get unread message count for a specific chat
 */
export const getUnreadCount = query({
  args: {
    chatId: v.id("careerChats"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return 0;
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .collect();

    const unreadCount = messages.filter((msg) => !msg.readBy.includes(userId)).length;

    return unreadCount;
  },
});

/**
 * Get total unread message count for current user (across all chats)
 */
export const getTotalUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return 0;
    }

    // Get all chats where user is involved
    const studentChats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", userId))
      .filter((q) =>
        q.or(q.eq(q.field("status"), "confirmed"), q.eq(q.field("status"), "completed"))
      )
      .collect();

    const mentorChats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", userId))
      .filter((q) =>
        q.or(q.eq(q.field("status"), "confirmed"), q.eq(q.field("status"), "completed"))
      )
      .collect();

    const allChats = [...studentChats, ...mentorChats];

    // Count unread messages across all chats
    let totalUnread = 0;
    for (const chat of allChats) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_chat", (q) => q.eq("chatId", chat._id))
        .collect();

      const unreadInChat = messages.filter((msg) => !msg.readBy.includes(userId)).length;
      totalUnread += unreadInChat;
    }

    return totalUnread;
  },
});

/**
 * Create a system message (used internally by other mutations)
 */
export const createSystemMessage = mutation({
  args: {
    chatId: v.id("careerChats"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      senderId: userId,
      content: args.content,
      type: "system",
      readBy: [],
      sentAt: Date.now(),
    });

    return { messageId };
  },
});
