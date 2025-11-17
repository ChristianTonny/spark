import { v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";
import { validateString } from "./utils/sanitize";
import { Id } from "./_generated/dataModel";

// Helper to get current user ID
async function getCurrentUserId(ctx: QueryCtx | MutationCtx): Promise<Id<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  return user?._id ?? null;
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

    // Validate and sanitize message content
    const sanitizedContent = validateString(args.content, 2000, "Message");
    if (!sanitizedContent || sanitizedContent.trim().length === 0) {
      throw new Error("Message cannot be empty");
    }

    // Verify user is part of this chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    const professional =
      chat.professionalId !== undefined
        ? await ctx.db.get(chat.professionalId)
        : null;

    const isStudent = chat.studentId === userId;
    const isMentor =
      professional !== null ? professional.userId === userId : false;

    if (!isStudent && !isMentor) {
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
      content: sanitizedContent,
      type: "text",
      readBy: [userId], // Sender has automatically read their own message
      sentAt: Date.now(),
    });

    // Determine recipient and create notification
    const sender = await ctx.db.get(userId);
    const senderName = sender ? `${sender.firstName} ${sender.lastName}` : "Someone";
    const senderImage = sender?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${senderName}`;

    let recipientUserId: Id<"users">;
    let senderRole: 'student' | 'mentor';
    
    if (isStudent) {
      // Student sent message, notify mentor
      recipientUserId = professional!.userId;
      senderRole = 'student';
    } else {
      // Mentor sent message, notify student
      recipientUserId = chat.studentId as Id<"users">;
      senderRole = 'mentor';
    }

    // Check if recipient's notification preferences allow message notifications
    const recipientSettings = await ctx.db
      .query("userSettings")
      .withIndex("by_user", (q) => q.eq("userId", recipientUserId))
      .first();

    // Only create notification if user has message notifications enabled (default: true)
    if (!recipientSettings || recipientSettings.messageNotifications) {
      // Truncate message for notification preview
      const messagePreview = sanitizedContent.length > 50
        ? `${sanitizedContent.substring(0, 50)}...`
        : sanitizedContent;

      await ctx.db.insert("notifications", {
        userId: recipientUserId,
        type: "message",
        title: `New message from ${senderName}`,
        message: messagePreview,
        read: false,
        createdAt: Date.now(),
        relatedChatId: args.chatId,
        relatedUserId: userId,
        metadata: {
          chatId: args.chatId,
          messageId: messageId,
          mentorId: senderRole === 'mentor' ? professional!._id : undefined,
          studentId: senderRole === 'student' ? userId : undefined,
          senderName: senderName,
          senderImage: senderImage,
          senderRole: senderRole,
        },
      });
    }

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

    const professional =
      chat.professionalId !== undefined
        ? await ctx.db.get(chat.professionalId)
        : null;

    const isStudent = chat.studentId === userId;
    const isMentor =
      professional !== null ? professional.userId === userId : false;

    if (!isStudent && !isMentor) {
      return [];
    }

    // Get all messages for this chat
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat_and_time", (q) => q.eq("chatId", args.chatId))
      .collect();

    // Batch fetch senders to avoid N+1 problem - senderId is stored as string (needs migration)
    const senderIds = [...new Set(messages.map(m => m.senderId))];
    const senders = await Promise.all(
      senderIds.map(id => ctx.db.get(id as Id<"users">))
    );
    // Map by string for compatibility with current schema
    const senderMap = new Map(
      senders.filter(s => s !== null).map(s => [s!._id.toString(), s!])
    );

    // Enrich messages with sender info (no async needed now)
    const enrichedMessages = messages.map((message) => {
      const sender = senderMap.get(message.senderId);

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
    });

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

    const professional =
      chat.professionalId !== undefined
        ? await ctx.db.get(chat.professionalId)
        : null;

    const isStudent = chat.studentId === userId;
    const isMentor =
      professional !== null ? professional.userId === userId : false;

    if (!isStudent && !isMentor) {
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

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const mentorChats = professional
      ? await ctx.db
          .query("careerChats")
          .withIndex("by_professional", (q) =>
            q.eq("professionalId", professional._id)
          )
          .filter((q) =>
            q.or(
              q.eq(q.field("status"), "confirmed"),
              q.eq(q.field("status"), "completed")
            )
          )
          .collect()
      : [];

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
