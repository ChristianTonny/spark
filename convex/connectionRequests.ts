import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Create a connection request
export const create = mutation({
  args: {
    mentorId: v.id("professionals"),
    requestType: v.union(
      v.literal("career_advice"),
      v.literal("industry_insights"),
      v.literal("resume_review"),
      v.literal("general")
    ),
    message: v.string(),
    preferredContact: v.union(
      v.literal("in_app"),
      v.literal("email"),
      v.literal("phone"),
      v.literal("whatsapp")
    ),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Check if there's already a pending request
    const existingRequest = await ctx.db
      .query("connectionRequests")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
      .filter((q) =>
        q.and(
          q.eq(q.field("mentorId"), args.mentorId),
          q.eq(q.field("status"), "pending")
        )
      )
      .first();

    if (existingRequest) {
      throw new Error("You already have a pending request with this mentor");
    }

    const requestId = await ctx.db.insert("connectionRequests", {
      studentId: user._id,
      mentorId: args.mentorId,
      requestType: args.requestType,
      message: args.message,
      preferredContact: args.preferredContact,
      status: "pending",
      createdAt: Date.now(),
    });

    return requestId;
  },
});

// Get student's connection requests
export const getMyRequests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return [];

    const requests = await ctx.db
      .query("connectionRequests")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
      .collect();

    // Enrich with mentor data
    const enriched = await Promise.all(
      requests.map(async (request) => {
        const professional = await ctx.db.get(request.mentorId);
        const mentor = professional
          ? await ctx.db.get(professional.userId)
          : null;

        return {
          ...request,
          mentorName: mentor ? `${mentor.firstName} ${mentor.lastName}` : "Unknown",
          mentorAvatar: mentor?.avatar,
          mentorCompany: professional?.company,
          mentorJobTitle: professional?.jobTitle,
        };
      })
    );

    return enriched.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get mentor's incoming connection requests
export const getMentorRequests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return [];

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) return [];

    const requests = await ctx.db
      .query("connectionRequests")
      .withIndex("by_mentor", (q) => q.eq("mentorId", professional._id))
      .collect();

    // Enrich with student data
    const enriched = await Promise.all(
      requests.map(async (request) => {
        const student = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), request.studentId))
          .first();

        const studentProfile = student
          ? await ctx.db
              .query("studentProfiles")
              .withIndex("by_user", (q) => q.eq("userId", student._id))
              .first()
          : null;

        return {
          ...request,
          studentName: student ? `${student.firstName} ${student.lastName}` : "Unknown",
          studentAvatar: student?.avatar,
          studentGrade: studentProfile?.gradeLevel,
          studentSchool: studentProfile?.school,
        };
      })
    );

    return enriched.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Accept a connection request
export const accept = mutation({
  args: {
    requestId: v.id("connectionRequests"),
    response: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const request = await ctx.db.get(args.requestId);
    if (!request) {
      throw new Error("Request not found");
    }

    // Verify this user is the mentor
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional || request.mentorId !== professional._id) {
      throw new Error("Unauthorized");
    }

    // Update request
    await ctx.db.patch(args.requestId, {
      status: "accepted",
      mentorResponse: args.response,
      respondedAt: Date.now(),
    });

    // Create a conversation if preferred contact is in-app
    if (request.preferredContact === "in_app") {
      const conversationId = await ctx.db.insert("conversations", {
        studentId: request.studentId,
        mentorId: professional._id,
        status: "active",
        lastMessageAt: Date.now(),
        studentUnreadCount: 0,
        mentorUnreadCount: 0,
        createdAt: Date.now(),
      });

      // Send initial message if there's a response
      if (args.response) {
        await ctx.db.insert("messages", {
          conversationId,
          senderId: user._id,
          senderRole: "mentor",
          messageType: "text",
          content: args.response,
          createdAt: Date.now(),
        });

        // Increment student unread count
        await ctx.db.patch(conversationId, {
          studentUnreadCount: 1,
          lastMessageAt: Date.now(),
        });
      }
    }

    return args.requestId;
  },
});

// Decline a connection request
export const decline = mutation({
  args: {
    requestId: v.id("connectionRequests"),
    response: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const request = await ctx.db.get(args.requestId);
    if (!request) {
      throw new Error("Request not found");
    }

    // Verify this user is the mentor
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional || request.mentorId !== professional._id) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.requestId, {
      status: "declined",
      mentorResponse: args.response,
      respondedAt: Date.now(),
    });

    return args.requestId;
  },
});
