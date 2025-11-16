import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a test completed session for rating
 * Use this in Convex dashboard to quickly create test data
 */
export const createTestCompletedSession = mutation({
  args: {
    studentUserId: v.id("users"),
    mentorUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get the mentor's professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", args.mentorUserId))
      .first();

    if (!professional) {
      throw new Error("Mentor professional profile not found");
    }

    // Get student to verify they exist
    const student = await ctx.db.get(args.studentUserId);
    if (!student) {
      throw new Error("Student not found");
    }

    // Create a completed session
    const chatId = await ctx.db.insert("careerChats", {
      studentId: args.studentUserId,
      professionalId: professional._id,
      status: "completed",
      completedAt: Date.now(),
      requestedAt: Date.now() - 86400000, // 1 day ago
      duration: 15,
    });

    return {
      success: true,
      chatId,
      message: `Created completed session for ${student.firstName} ${student.lastName} with mentor`,
    };
  },
});

/**
 * Create multiple test completed sessions
 * Useful for testing the pending ratings widget with multiple sessions
 */
export const createMultipleTestSessions = mutation({
  args: {
    studentUserId: v.id("users"),
    count: v.number(),
  },
  handler: async (ctx, args) => {
    // Get all mentors
    const professionals = await ctx.db.query("professionals").take(args.count);

    const createdSessions = [];

    for (const professional of professionals) {
      const chatId = await ctx.db.insert("careerChats", {
        studentId: args.studentUserId,
        professionalId: professional._id,
        status: "completed",
        completedAt: Date.now() - Math.random() * 86400000 * 7, // Random time in last week
        requestedAt: Date.now() - 86400000 * 8,
        duration: 15,
      });

      createdSessions.push(chatId);
    }

    return {
      success: true,
      count: createdSessions.length,
      chatIds: createdSessions,
      message: `Created ${createdSessions.length} test completed sessions`,
    };
  },
});

/**
 * Get current logged in user info
 * Helpful for getting user IDs for testing
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return null;
    }

    return {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  },
});

/**
 * Get all mentors with their user IDs
 * Helpful for finding mentor IDs to create test sessions
 */
export const getAllMentorIds = query({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();

    const mentors = await Promise.all(
      professionals.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return {
          userId: prof.userId,
          name: user ? `${user.firstName} ${user.lastName}` : "Unknown",
          company: prof.company,
          jobTitle: prof.jobTitle,
        };
      })
    );

    return mentors;
  },
});

/**
 * Move a session's scheduled time to the past (for testing Mark Complete)
 * This helps test the "Mark Complete" functionality
 */
export const moveSessionToPast = mutation({
  args: {
    chatId: v.id("careerChats"),
  },
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Move scheduled time to 1 hour ago
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    
    await ctx.db.patch(args.chatId, {
      scheduledAt: oneHourAgo,
    });

    return {
      success: true,
      message: "Session moved to 1 hour ago. You can now test the Mark Complete button!",
      scheduledAt: oneHourAgo,
    };
  },
});

/**
 * Get all your sessions (for finding session IDs to test with)
 */
export const getMySessionIds = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return [];
    }

    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .collect();

    return chats.map((chat) => ({
      chatId: chat._id,
      status: chat.status,
      scheduledAt: chat.scheduledAt,
      scheduledDate: chat.scheduledAt ? new Date(chat.scheduledAt).toLocaleString() : "Not scheduled",
    }));
  },
});
