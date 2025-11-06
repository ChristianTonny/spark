import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Get all conversations for current user (student or mentor)
export const getMyConversations = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return [];

    let conversations: any[] = [];

    // Check if user is a student
    if (user.role === "student") {
      conversations = await ctx.db
        .query("conversations")
        .withIndex("by_student", (q) => q.eq("studentId", user._id))
        .collect();

      // Enrich with mentor data
      return await Promise.all(
        conversations.map(async (conv) => {
          const professional = await ctx.db.get(conv.mentorId);
          const mentor = professional
            ? await ctx.db.get(professional.userId)
            : null;

          // Get last message
          const lastMessage = await ctx.db
            .query("messages")
            .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
            .order("desc")
            .first();

          return {
            ...conv,
            otherPersonName: mentor ? `${mentor.firstName} ${mentor.lastName}` : "Unknown",
            otherPersonAvatar: mentor?.avatar,
            otherPersonTitle: professional?.jobTitle,
            lastMessage: lastMessage?.content,
            unreadCount: conv.studentUnreadCount,
          };
        })
      );
    }

    // Check if user is a mentor
    if (user.role === "mentor") {
      const professional = await ctx.db
        .query("professionals")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .first();

      if (!professional) return [];

      conversations = await ctx.db
        .query("conversations")
        .withIndex("by_mentor", (q) => q.eq("mentorId", professional._id))
        .collect();

      // Enrich with student data
      return await Promise.all(
        conversations.map(async (conv) => {
          const student = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), conv.studentId))
            .first();

          // Get last message
          const lastMessage = await ctx.db
            .query("messages")
            .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
            .order("desc")
            .first();

          return {
            ...conv,
            otherPersonName: student ? `${student.firstName} ${student.lastName}` : "Unknown",
            otherPersonAvatar: student?.avatar,
            lastMessage: lastMessage?.content,
            unreadCount: conv.mentorUnreadCount,
          };
        })
      );
    }

    return [];
  },
});

// Get messages for a conversation
export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return [];

    // Verify user has access to this conversation
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) return [];

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    const isStudent = conversation.studentId === user._id;
    const isMentor = professional && conversation.mentorId === professional._id;

    if (!isStudent && !isMentor) {
      throw new Error("Unauthorized");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .collect();

    // Enrich with sender data
    const enriched = await Promise.all(
      messages.map(async (msg) => {
        const sender = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), msg.senderId))
          .first();

        return {
          ...msg,
          senderName: sender ? `${sender.firstName} ${sender.lastName}` : "Unknown",
          senderAvatar: sender?.avatar,
          isMe: msg.senderId === user._id,
        };
      })
    );

    return enriched.sort((a, b) => a.createdAt - b.createdAt);
  },
});

// Send a message
export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
    messageType: v.optional(
      v.union(v.literal("text"), v.literal("file"), v.literal("meeting_proposal"))
    ),
    fileUrl: v.optional(v.string()),
    meetingDetails: v.optional(
      v.object({
        time: v.string(),
        platform: v.string(),
        link: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // Verify user has access
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    const isStudent = conversation.studentId === user._id;
    const isMentor = professional && conversation.mentorId === professional._id;

    if (!isStudent && !isMentor) {
      throw new Error("Unauthorized");
    }

    // Create message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      senderId: user._id,
      senderRole: isStudent ? "student" : "mentor",
      messageType: args.messageType || "text",
      content: args.content,
      fileUrl: args.fileUrl,
      meetingDetails: args.meetingDetails,
      createdAt: Date.now(),
    });

    // Update conversation
    await ctx.db.patch(args.conversationId, {
      lastMessageAt: Date.now(),
      ...(isStudent
        ? { mentorUnreadCount: conversation.mentorUnreadCount + 1 }
        : { studentUnreadCount: conversation.studentUnreadCount + 1 }),
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
    const user = await getCurrentUserOrThrow(ctx);

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    const isStudent = conversation.studentId === user._id;
    const isMentor = professional && conversation.mentorId === professional._id;

    if (!isStudent && !isMentor) {
      throw new Error("Unauthorized");
    }

    // Reset unread count for the appropriate user
    await ctx.db.patch(args.conversationId, {
      ...(isStudent
        ? { studentUnreadCount: 0 }
        : { mentorUnreadCount: 0 }),
    });

    // Mark messages as read
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .filter((q) => q.neq(q.field("senderId"), user._id))
      .filter((q) => q.eq(q.field("readAt"), undefined))
      .collect();

    await Promise.all(
      messages.map((msg) =>
        ctx.db.patch(msg._id, {
          readAt: Date.now(),
        })
      )
    );

    return args.conversationId;
  },
});

// Archive a conversation
export const archive = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    const isStudent = conversation.studentId === user._id;
    const isMentor = professional && conversation.mentorId === professional._id;

    if (!isStudent && !isMentor) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.conversationId, {
      status: "archived",
    });

    return args.conversationId;
  },
});
