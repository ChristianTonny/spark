import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
 * Get student's mentor session history
 * Returns last 5 career chat sessions with professional and career details
 */
export const getStudentSessions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      return [];
    }

    // Fetch career chats for this student
    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .order("desc")
      .take(5);

    // Enrich with professional and career details
    const enrichedChats = await Promise.all(
      chats.map(async (chat) => {
        const professional = await ctx.db.get(chat.professionalId);
        
        // Get professional's user details
        let professionalUser = null;
        if (professional) {
          professionalUser = await ctx.db.get(professional.userId);
        }
        
        // Note: careerId is stored as string, not ID reference
        // We'll need to find the career by matching
        const allCareers = await ctx.db.query("careers").collect();
        const career = allCareers.find(c => c._id === chat.careerId);

        return {
          _id: chat._id,
          scheduledAt: chat.scheduledAt,
          duration: chat.duration,
          status: chat.status,
          rating: chat.rating,
          feedback: chat.feedback,
          completedAt: chat.completedAt,
          professional: professional && professionalUser ? {
            name: `${professionalUser.firstName} ${professionalUser.lastName}`,
            title: professional.jobTitle,
            company: professional.company,
          } : null,
          career: career ? {
            _id: career._id,
            title: career.title,
            category: career.category,
          } : null,
        };
      })
    );

    return enrichedChats;
  },
});

/**
 * Get upcoming sessions for a student
 */
export const getUpcomingSessions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      return [];
    }

    const now = Date.now();
    
    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .filter((q) => q.eq(q.field("status"), "scheduled"))
      .collect();

    // Filter for future sessions
    const upcomingSessions = chats.filter(chat => chat.scheduledAt > now);

    // Enrich with details
    const enrichedSessions = await Promise.all(
      upcomingSessions.map(async (chat) => {
        const professional = await ctx.db.get(chat.professionalId);
        
        // Get professional's user details
        let professionalUser = null;
        if (professional) {
          professionalUser = await ctx.db.get(professional.userId);
        }
        
        const allCareers = await ctx.db.query("careers").collect();
        const career = allCareers.find(c => c._id === chat.careerId);

        return {
          _id: chat._id,
          scheduledAt: chat.scheduledAt,
          duration: chat.duration,
          meetingUrl: chat.meetingUrl,
          professional: professional && professionalUser ? {
            name: `${professionalUser.firstName} ${professionalUser.lastName}`,
            title: professional.jobTitle,
          } : null,
          career: career ? {
            title: career.title,
          } : null,
        };
      })
    );

    return enrichedSessions.sort((a, b) => a.scheduledAt - b.scheduledAt);
  },
});

/**
 * Create a new booking request (student initiates)
 */
export const createBookingRequest = mutation({
  args: {
    professionalId: v.id("users"),
    careerId: v.optional(v.string()),
    scheduledAt: v.number(),
    duration: v.number(),
    studentMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "student") {
      throw new Error("Only students can create booking requests");
    }

    // Check if slot is still available
    const existingBooking = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", args.professionalId).eq("status", "confirmed")
      )
      .filter((q) => q.eq(q.field("scheduledAt"), args.scheduledAt))
      .first();

    if (existingBooking) {
      throw new Error("This time slot is no longer available");
    }

    // Create booking request
    const chatId = await ctx.db.insert("careerChats", {
      studentId: userId,
      professionalId: args.professionalId,
      careerId: args.careerId,
      scheduledAt: args.scheduledAt,
      duration: args.duration,
      status: "pending",
      requestedAt: Date.now(),
      studentMessage: args.studentMessage,
    });

    return { chatId };
  },
});

/**
 * Approve a booking request (mentor approves)
 */
export const approveBooking = mutation({
  args: {
    chatId: v.id("careerChats"),
    meetingUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Booking not found");
    }

    // Verify this is the mentor for this booking
    if (chat.professionalId !== userId) {
      throw new Error("Not authorized");
    }

    if (chat.status !== "pending") {
      throw new Error("Booking is not in pending status");
    }

    // Update booking to confirmed
    await ctx.db.patch(args.chatId, {
      status: "confirmed",
      confirmedAt: Date.now(),
      meetingUrl: args.meetingUrl,
    });

    // Create system message in chat
    await ctx.db.insert("messages", {
      chatId: args.chatId,
      senderId: userId,
      content: `Booking confirmed! Your session is scheduled for ${new Date(
        chat.scheduledAt!
      ).toLocaleString("en-RW", {
        timeZone: "Africa/Kigali",
        dateStyle: "full",
        timeStyle: "short",
      })}`,
      type: "system",
      readBy: [],
      sentAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Reject a booking request (mentor declines)
 */
export const rejectBooking = mutation({
  args: {
    chatId: v.id("careerChats"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Booking not found");
    }

    // Verify this is the mentor for this booking
    if (chat.professionalId !== userId) {
      throw new Error("Not authorized");
    }

    if (chat.status !== "pending") {
      throw new Error("Booking is not in pending status");
    }

    // Update booking to rejected
    await ctx.db.patch(args.chatId, {
      status: "rejected",
      cancellationReason: args.reason,
    });

    return { success: true };
  },
});

/**
 * Cancel a booking (either party can cancel)
 */
export const cancelBooking = mutation({
  args: {
    chatId: v.id("careerChats"),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Booking not found");
    }

    // Verify user is part of this booking
    if (chat.studentId !== userId && chat.professionalId !== userId) {
      throw new Error("Not authorized");
    }

    if (chat.status !== "confirmed" && chat.status !== "pending") {
      throw new Error("Booking cannot be cancelled");
    }

    // Update booking to cancelled
    await ctx.db.patch(args.chatId, {
      status: "cancelled",
      cancellationReason: args.reason,
    });

    // Create system message in chat if chat exists
    if (chat.status === "confirmed") {
      await ctx.db.insert("messages", {
        chatId: args.chatId,
        senderId: userId,
        content: `Booking cancelled. ${args.reason || ""}`,
        type: "system",
        readBy: [],
        sentAt: Date.now(),
      });
    }

    return { success: true };
  },
});

/**
 * Get student's bookings filtered by status
 */
export const getStudentBookings = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("completed"),
        v.literal("cancelled"),
        v.literal("rejected")
      )
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return [];
    }

    let bookingsQuery = ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", userId));

    if (args.status) {
      bookingsQuery = ctx.db
        .query("careerChats")
        .withIndex("by_student_and_status", (q) =>
          q.eq("studentId", userId).eq("status", args.status)
        );
    }

    const bookings = await bookingsQuery.order("desc").collect();

    // Enrich with mentor details
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const professional = await ctx.db.get(booking.professionalId);
        let professionalUser = null;
        if (professional) {
          professionalUser = await ctx.db.get(professional.userId);
        }

        const allCareers = await ctx.db.query("careers").collect();
        const career = booking.careerId
          ? allCareers.find((c) => c._id === booking.careerId)
          : null;

        // Get unread message count
        const messages = await ctx.db
          .query("messages")
          .withIndex("by_chat", (q) => q.eq("chatId", booking._id))
          .collect();

        const unreadCount = messages.filter(
          (msg) => !msg.readBy.includes(userId)
        ).length;

        return {
          ...booking,
          mentor: professional && professionalUser
            ? {
                name: `${professionalUser.firstName} ${professionalUser.lastName}`,
                avatar: professionalUser.avatar,
                title: professional.jobTitle,
                company: professional.company,
              }
            : null,
          career: career
            ? {
                _id: career._id,
                title: career.title,
                category: career.category,
              }
            : null,
          unreadCount,
        };
      })
    );

    return enrichedBookings;
  },
});

/**
 * Get mentor's bookings filtered by status
 */
export const getMentorBookings = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("completed"),
        v.literal("cancelled"),
        v.literal("rejected")
      )
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return [];
    }

    let bookingsQuery = ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", userId));

    if (args.status) {
      bookingsQuery = ctx.db
        .query("careerChats")
        .withIndex("by_professional_and_status", (q) =>
          q.eq("professionalId", userId).eq("status", args.status)
        );
    }

    const bookings = await bookingsQuery.order("desc").collect();

    // Enrich with student details
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const student = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), booking.studentId))
          .first();

        const studentProfile = student
          ? await ctx.db
              .query("studentProfiles")
              .withIndex("by_user", (q) => q.eq("userId", student._id))
              .first()
          : null;

        const allCareers = await ctx.db.query("careers").collect();
        const career = booking.careerId
          ? allCareers.find((c) => c._id === booking.careerId)
          : null;

        // Get unread message count
        const messages = await ctx.db
          .query("messages")
          .withIndex("by_chat", (q) => q.eq("chatId", booking._id))
          .collect();

        const unreadCount = messages.filter(
          (msg) => !msg.readBy.includes(userId)
        ).length;

        return {
          ...booking,
          student: student
            ? {
                name: `${student.firstName} ${student.lastName}`,
                avatar: student.avatar,
                gradeLevel: studentProfile?.gradeLevel,
                school: studentProfile?.school,
              }
            : null,
          career: career
            ? {
                _id: career._id,
                title: career.title,
                category: career.category,
              }
            : null,
          unreadCount,
        };
      })
    );

    return enrichedBookings;
  },
});

/**
 * Get count of pending booking requests for mentor
 */
export const getPendingRequestsCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      return 0;
    }

    const pendingBookings = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", userId).eq("status", "pending")
      )
      .collect();

    return pendingBookings.length;
  },
});
