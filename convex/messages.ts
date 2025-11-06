import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Get or create a conversation between two users
export const getOrCreateConversation = mutation({
  args: {
    otherUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Find existing conversation
    const conversations = await ctx.db.query("conversations").collect();
    const existing = conversations.find(conv =>
      conv.participantIds.includes(currentUser._id) &&
      conv.participantIds.includes(args.otherUserId) &&
      conv.participantIds.length === 2
    );

    if (existing) {
      return existing._id;
    }

    // Create new conversation
    const conversationId = await ctx.db.insert("conversations", {
      participantIds: [currentUser._id, args.otherUserId],
      lastMessageAt: Date.now(),
      createdAt: Date.now(),
    });

    return conversationId;
  },
});

// Get all conversations for current user
export const listConversations = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    const allConversations = await ctx.db.query("conversations").collect();
    const userConversations = allConversations.filter(conv =>
      conv.participantIds.includes(currentUser._id)
    );

    // Sort by last message time
    userConversations.sort((a, b) => b.lastMessageAt - a.lastMessageAt);

    // Enrich with other participant info
    const enriched = await Promise.all(
      userConversations.map(async (conv) => {
        const otherParticipantId = conv.participantIds.find(id => id !== currentUser._id);
        const otherUser = otherParticipantId ? await ctx.db.get(otherParticipantId) : null;

        // Count unread messages
        const messages = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
          .collect();

        const unreadCount = messages.filter(
          msg => msg.senderId !== currentUser._id && !msg.readBy.includes(currentUser._id)
        ).length;

        return {
          ...conv,
          otherUser: otherUser ? {
            _id: otherUser._id,
            firstName: otherUser.firstName,
            lastName: otherUser.lastName,
            avatar: otherUser.avatar,
            role: otherUser.role,
          } : null,
          unreadCount,
        };
      })
    );

    return enriched;
  },
});

// Get messages in a conversation
export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Verify user is participant
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participantIds.includes(currentUser._id)) {
      throw new Error("Not authorized to view this conversation");
    }

    // Get messages
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .collect();

    // Enrich with sender info
    const enriched = await Promise.all(
      messages.map(async (msg) => {
        const sender = await ctx.db.get(msg.senderId);
        return {
          ...msg,
          sender: sender ? {
            _id: sender._id,
            firstName: sender.firstName,
            lastName: sender.lastName,
            avatar: sender.avatar,
          } : null,
        };
      })
    );

    return enriched;
  },
});

// Send a message
export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Verify user is participant
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation || !conversation.participantIds.includes(currentUser._id)) {
      throw new Error("Not authorized to send messages in this conversation");
    }

    // Create message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      senderId: currentUser._id,
      text: args.text,
      createdAt: Date.now(),
      readBy: [currentUser._id], // Sender has "read" their own message
    });

    // Update conversation last message
    await ctx.db.patch(args.conversationId, {
      lastMessageAt: Date.now(),
      lastMessageText: args.text.length > 100 ? args.text.substring(0, 100) + '...' : args.text,
    });

    return messageId;
  },
});

// Mark messages as read
export const markAsRead = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Get unread messages in this conversation
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .collect();

    const unreadMessages = messages.filter(
      msg => msg.senderId !== currentUser._id && !msg.readBy.includes(currentUser._id)
    );

    // Mark each as read
    await Promise.all(
      unreadMessages.map(msg =>
        ctx.db.patch(msg._id, {
          readBy: [...msg.readBy, currentUser._id],
        })
      )
    );

    return { markedCount: unreadMessages.length };
  },
});
