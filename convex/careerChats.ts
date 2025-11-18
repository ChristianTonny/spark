import { mutation, query, QueryCtx, MutationCtx, internalMutation, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { validateString, validateRating, validateUrl } from "./utils/sanitize";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

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

    // Batch queries to avoid N+1 problem
    // 1. Fetch all careers once
    const allCareers = await ctx.db.query("careers").collect();

    // 2. Batch fetch all professionals
    const professionalIds = [...new Set(chats.map(c => c.professionalId))];
    const professionals = await Promise.all(
      professionalIds.map(id => ctx.db.get(id))
    );
    const professionalMap = new Map(
      professionals.filter(p => p !== null).map(p => [p!._id, p!])
    );

    // 3. Batch fetch all professional users
    const userIds = professionals
      .filter(p => p !== null)
      .map(p => p!.userId);
    const users = await Promise.all(
      userIds.map(id => ctx.db.get(id))
    );
    const userMap = new Map(
      users.filter(u => u !== null).map(u => [u!._id, u!])
    );

    // 4. Map without additional queries
    const enrichedChats = chats.map((chat) => {
      const professional = professionalMap.get(chat.professionalId);
      const professionalUser = professional ? userMap.get(professional.userId) : null;
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
    });

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
    const upcomingSessions = chats.filter(chat => chat.scheduledAt && chat.scheduledAt > now);

    // Batch queries to avoid N+1 problem
    const allCareers = await ctx.db.query("careers").collect();

    const professionalIds = [...new Set(upcomingSessions.map(c => c.professionalId))];
    const professionals = await Promise.all(
      professionalIds.map(id => ctx.db.get(id))
    );
    const professionalMap = new Map(
      professionals.filter(p => p !== null).map(p => [p!._id, p!])
    );

    const userIds = professionals
      .filter(p => p !== null)
      .map(p => p!.userId);
    const users = await Promise.all(
      userIds.map(id => ctx.db.get(id))
    );
    const userMap = new Map(
      users.filter(u => u !== null).map(u => [u!._id, u!])
    );

    const enrichedSessions = upcomingSessions.map((chat) => {
      const professional = professionalMap.get(chat.professionalId);
      const professionalUser = professional ? userMap.get(professional.userId) : null;
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
    });

    return enrichedSessions.sort((a, b) => (a.scheduledAt || 0) - (b.scheduledAt || 0));
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

    // Validate and sanitize inputs
    const sanitizedMessage = validateString(args.studentMessage, 500, "Message");

    // Validate scheduled time is in the future
    if (args.scheduledAt < Date.now()) {
      throw new Error("Cannot book a session in the past");
    }

    // Validate duration
    if (args.duration < 15 || args.duration > 240) {
      throw new Error("Duration must be between 15 and 240 minutes");
    }

    const userDoc = await ctx.db.get(userId);
    if (!userDoc) {
      throw new Error("User not found");
    }

    // Verify user is a student
    if (userDoc.role !== "student") {
      throw new Error("Only students can create booking requests");
    }

    // Get the professional record (careerChats uses professional ID, not user ID)
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", args.professionalId))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Check if slot is still available
    const existingBooking = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professional._id).eq("status", "confirmed")
      )
      .filter((q) => q.eq(q.field("scheduledAt"), args.scheduledAt))
      .first();

    if (existingBooking) {
      throw new Error("This time slot is no longer available");
    }

    // Create booking request
    const chatId = await ctx.db.insert("careerChats", {
      studentId: userId,
      professionalId: professional._id,
      careerId: args.careerId,
      scheduledAt: args.scheduledAt,
      duration: args.duration,
      status: "pending",
      requestedAt: Date.now(),
      studentMessage: sanitizedMessage,
    });

    // Create notification for mentor about new booking request
    const mentorUserId = professional.userId;
    const studentUser = await ctx.db.get(userId);
    const studentName = studentUser ? `${studentUser.firstName} ${studentUser.lastName}` : "A student";
    const studentImage = studentUser?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${studentName}`;

    await ctx.db.insert("notifications", {
      userId: mentorUserId,
      type: "booking",
      title: "New Booking Request",
      message: `${studentName} has requested a session with you on ${new Date(args.scheduledAt).toLocaleDateString()}`,
      read: false,
      createdAt: Date.now(),
      relatedChatId: chatId,
      relatedUserId: userId,
      metadata: {
        bookingId: chatId,
        studentId: userId,
        senderName: studentName,
        senderImage: studentImage,
        senderRole: 'student',
      },
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

    // Validate meeting URL if provided
    const validatedMeetingUrl = args.meetingUrl ? validateUrl(args.meetingUrl) : undefined;

    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Booking not found");
    }

    // Get the professional record for this user
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Verify this is the mentor for this booking
    if (chat.professionalId !== professional._id) {
      throw new Error("Not authorized");
    }

    if (chat.status !== "pending") {
      throw new Error("Booking is not in pending status");
    }

    // Update booking to confirmed
    await ctx.db.patch(args.chatId, {
      status: "confirmed",
      confirmedAt: Date.now(),
      meetingUrl: validatedMeetingUrl,
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

    // Create notification for student about booking confirmation
    const studentUserId = chat.studentId as Id<"users">;
    const mentorUser = await ctx.db.get(userId);
    const mentorName = mentorUser ? `${mentorUser.firstName} ${mentorUser.lastName}` : "Your mentor";
    const mentorImage = mentorUser?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${mentorName}`;

    await ctx.db.insert("notifications", {
      userId: studentUserId,
      type: "booking",
      title: "Booking Confirmed!",
      message: `${mentorName} has confirmed your session for ${new Date(chat.scheduledAt!).toLocaleDateString()}`,
      read: false,
      createdAt: Date.now(),
      relatedChatId: args.chatId,
      relatedUserId: userId,
      metadata: {
        bookingId: args.chatId,
        mentorId: professional._id,
        senderName: mentorName,
        senderImage: mentorImage,
        senderRole: 'mentor',
      },
    });

    // Send confirmation email to student
    const studentUser = await ctx.db.get(studentUserId);
    const career = chat.careerId ? await ctx.db.get(chat.careerId as Id<"careers">) : null;
    
    if (studentUser?.email) {
      await ctx.scheduler.runAfter(0, internal.emails.sendEmail, {
        type: "booking_confirmation",
        data: {
          to: studentUser.email,
          studentName: `${studentUser.firstName} ${studentUser.lastName}`,
          mentorName,
          careerTitle: career?.title,
          scheduledAt: chat.scheduledAt!,
          duration: chat.duration || 60,
          meetingLink: validatedMeetingUrl,
        },
      });
    }

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

    // Sanitize reason
    const sanitizedReason = validateString(args.reason, 500, "Rejection reason");

    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Booking not found");
    }

    // Get the professional record for this user
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Verify this is the mentor for this booking
    if (chat.professionalId !== professional._id) {
      throw new Error("Not authorized");
    }

    if (chat.status !== "pending") {
      throw new Error("Booking is not in pending status");
    }

    // Update booking to rejected
    await ctx.db.patch(args.chatId, {
      status: "rejected",
      cancellationReason: sanitizedReason,
    });

    // Create notification for student about booking rejection
    const studentUserId = chat.studentId as Id<"users">;
    const mentorUser = await ctx.db.get(userId);
    const mentorName = mentorUser ? `${mentorUser.firstName} ${mentorUser.lastName}` : "Your mentor";
    const mentorImage = mentorUser?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${mentorName}`;

    await ctx.db.insert("notifications", {
      userId: studentUserId,
      type: "booking",
      title: "Booking Request Declined",
      message: `${mentorName} has declined your booking request${sanitizedReason ? `: ${sanitizedReason}` : ""}`,
      read: false,
      createdAt: Date.now(),
      relatedChatId: args.chatId,
      relatedUserId: userId,
      metadata: {
        bookingId: args.chatId,
        mentorId: professional._id,
        senderName: mentorName,
        senderImage: mentorImage,
        senderRole: 'mentor',
      },
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

    // Sanitize cancellation reason
    const sanitizedReason = validateString(args.reason, 500, "Cancellation reason");

    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Booking not found");
    }

    // Get the professional record for this user (if they're a mentor)
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    // Verify user is part of this booking (student ID is string, professional ID is from professionals table)
    if (chat.studentId !== userId && (!professional || chat.professionalId !== professional._id)) {
      throw new Error("Not authorized");
    }

    if (chat.status !== "confirmed" && chat.status !== "pending") {
      throw new Error("Booking cannot be cancelled");
    }

    // Update booking to cancelled
    await ctx.db.patch(args.chatId, {
      status: "cancelled",
      cancellationReason: sanitizedReason,
    });

    // Create system message in chat if chat exists
    if (chat.status === "confirmed") {
      await ctx.db.insert("messages", {
        chatId: args.chatId,
        senderId: userId,
        content: `Booking cancelled. ${sanitizedReason || ""}`,
        type: "system",
        readBy: [],
        sentAt: Date.now(),
      });
    }

    // Notify the other party about cancellation
    const currentUser = await ctx.db.get(userId);
    const currentUserName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "User";

    // Determine who to notify
    let recipientUserId: Id<"users">;
    if (chat.studentId === userId) {
      // Student cancelled, notify mentor
      recipientUserId = professional!.userId;
    } else {
      // Mentor cancelled, notify student
      recipientUserId = chat.studentId as Id<"users">;
    }

    await ctx.db.insert("notifications", {
      userId: recipientUserId,
      type: "booking",
      title: "Booking Cancelled",
      message: `${currentUserName} has cancelled the booking${sanitizedReason ? `: ${sanitizedReason}` : ""}`,
      read: false,
      createdAt: Date.now(),
      relatedChatId: args.chatId,
      relatedUserId: userId,
    });

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
          q.eq("studentId", userId).eq("status", args.status!)
        );
    }

    const bookings = await bookingsQuery.order("desc").collect();

    // Batch queries to avoid N+1 problem
    const allCareers = await ctx.db.query("careers").collect();

    const professionalIds = [...new Set(bookings.map(b => b.professionalId))];
    const professionals = await Promise.all(
      professionalIds.map(id => ctx.db.get(id))
    );
    const professionalMap = new Map(
      professionals.filter(p => p !== null).map(p => [p!._id, p!])
    );

    const userIds = professionals
      .filter(p => p !== null)
      .map(p => p!.userId);
    const users = await Promise.all(
      userIds.map(id => ctx.db.get(id))
    );
    const userMap = new Map(
      users.filter(u => u !== null).map(u => [u!._id, u!])
    );

    // Batch fetch messages for unread count
    const allMessages = await Promise.all(
      bookings.map(booking =>
        ctx.db
          .query("messages")
          .withIndex("by_chat", (q) => q.eq("chatId", booking._id))
          .collect()
      )
    );
    const messagesMap = new Map(
      bookings.map((booking, idx) => [booking._id, allMessages[idx]])
    );

    const enrichedBookings = bookings.map((booking) => {
      const professional = professionalMap.get(booking.professionalId);
      const professionalUser = professional ? userMap.get(professional.userId) : null;
      const career = booking.careerId
        ? allCareers.find((c) => c._id === booking.careerId)
        : null;

      const messages = messagesMap.get(booking._id) || [];
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
    });

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

    // Get the professional record for this user
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      return [];
    }

    let bookingsQuery = ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", professional._id));

    if (args.status) {
      bookingsQuery = ctx.db
        .query("careerChats")
        .withIndex("by_professional_and_status", (q) =>
          q.eq("professionalId", professional._id).eq("status", args.status!)
        );
    }

    const bookings = await bookingsQuery.order("desc").collect();

    // Batch queries to avoid N+1 problem
    const allCareers = await ctx.db.query("careers").collect();

    // Batch fetch students - studentId is stored as string (needs migration to Id<"users">)
    const studentIds = [...new Set(bookings.map(b => b.studentId))];
    const students = await Promise.all(
      studentIds.map(id => ctx.db.get(id as Id<"users">))
    );
    // Map by string for compatibility with current schema
    const studentMap = new Map(
      students.filter(s => s !== null).map(s => [s!._id.toString(), s!])
    );

    // Batch fetch student profiles
    const studentProfiles = await Promise.all(
      students
        .filter(s => s !== null)
        .map(s =>
          ctx.db
            .query("studentProfiles")
            .withIndex("by_user", (q) => q.eq("userId", s!._id))
            .first()
        )
    );
    // Map by string for compatibility with current schema
    const profileMap = new Map(
      students
        .filter(s => s !== null)
        .map((s, idx) => [s!._id.toString(), studentProfiles[idx]])
    );

    // Batch fetch messages for unread count
    const allMessages = await Promise.all(
      bookings.map(booking =>
        ctx.db
          .query("messages")
          .withIndex("by_chat", (q) => q.eq("chatId", booking._id))
          .collect()
      )
    );
    const messagesMap = new Map(
      bookings.map((booking, idx) => [booking._id, allMessages[idx]])
    );

    const enrichedBookings = bookings.map((booking) => {
      const student = studentMap.get(booking.studentId);
      const studentProfile = student ? profileMap.get(student._id.toString()) : null;
      const career = booking.careerId
        ? allCareers.find((c) => c._id === booking.careerId)
        : null;

      const messages = messagesMap.get(booking._id) || [];
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
    });

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

    // Get the professional record for this user
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      return 0;
    }

    const pendingBookings = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professional._id).eq("status", "pending")
      )
      .collect();

    return pendingBookings.length;
  },
});

/**
 * Get student's interaction summary with mentors
 * Returns which mentors the student has contacted, has active bookings with, or chat history
 */
export const getStudentMentorInteractions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return {
        contactedMentorIds: [],
        activeBookingMentorIds: [],
        chatHistoryMentorIds: [],
      };
    }

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return {
        contactedMentorIds: [],
        activeBookingMentorIds: [],
        chatHistoryMentorIds: [],
      };
    }

    // Fetch all career chats for this student
    const allChats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .collect();

    // Categorize mentors by interaction type
    const contactedMentorIds = new Set<string>();
    const activeBookingMentorIds = new Set<string>();
    const chatHistoryMentorIds = new Set<string>();

    for (const chat of allChats) {
      const professional = await ctx.db.get(chat.professionalId);
      if (!professional) continue;

      const mentorUserId = professional.userId;

      // All chats = contacted
      contactedMentorIds.add(mentorUserId);

      // Active bookings = pending or confirmed
      if (chat.status === "pending" || chat.status === "confirmed") {
        activeBookingMentorIds.add(mentorUserId);
      }

      // Has chat history = confirmed or completed (can message)
      if (chat.status === "confirmed" || chat.status === "completed") {
        chatHistoryMentorIds.add(mentorUserId);
      }
    }

    return {
      contactedMentorIds: Array.from(contactedMentorIds),
      activeBookingMentorIds: Array.from(activeBookingMentorIds),
      chatHistoryMentorIds: Array.from(chatHistoryMentorIds),
    };
  },
});

/**
 * Get active/confirmed chat between student and a specific mentor
 * Used to open chat when clicking "Message Mentor"
 */
export const getChatWithMentor = query({
  args: {
    mentorUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    // Get current user (student)
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return null;
    }

    // Get the professional profile for the mentor
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", args.mentorUserId))
      .first();

    if (!professional) {
      return null;
    }

    // Find most recent confirmed or completed chat with this mentor
    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .order("desc")
      .collect();

    // Find chat with this specific mentor that's confirmed or completed
    const chat = chats.find(
      (c) =>
        c.professionalId === professional._id &&
        (c.status === "confirmed" || c.status === "completed")
    );

    if (!chat) {
      return null;
    }

    // Get mentor user details
    const mentorUser = await ctx.db.get(args.mentorUserId);

    return {
      chatId: chat._id,
      mentorName: mentorUser ? `${mentorUser.firstName} ${mentorUser.lastName}` : "Mentor",
      scheduledAt: chat.scheduledAt,
      status: chat.status,
    };
  },
});

/**
 * Rate a mentor after session completion
 * Automatically recalculates mentor's average rating
 */
export const rateMentor = mutation({
  args: {
    chatId: v.id("careerChats"),
    rating: v.number(), // 1-5
    feedback: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Validate and sanitize inputs
    const validatedRating = validateRating(args.rating);
    const sanitizedFeedback = validateString(args.feedback, 1000, "Feedback");

    // Get the chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Verify user is the student in this chat
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user || chat.studentId !== user._id.toString()) {
      throw new Error("Not authorized to rate this session");
    }

    // Ensure session can be rated (confirmed, scheduled, or completed)
    const allowableStatuses: string[] = ["completed", "confirmed", "scheduled"];
    if (!allowableStatuses.includes(chat.status)) {
      throw new Error("Can only rate confirmed or completed sessions");
    }

    const now = Date.now();

    // Update chat with rating, feedback, and auto-complete if needed
    const chatUpdate: Record<string, any> = {
      rating: validatedRating,
      feedback: sanitizedFeedback,
    };

    if (chat.status !== "completed") {
      chatUpdate.status = "completed";
      chatUpdate.completedAt = chat.completedAt || chat.scheduledAt || now;
    }

    await ctx.db.patch(args.chatId, chatUpdate);

    // Recalculate mentor stats
    // Get all completed chats for this mentor
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", chat.professionalId).eq("status", "completed")
      )
      .collect();

    const chatsCompleted = completedChats.length;

    // Calculate average rating from chats that have ratings
    const ratedChats = completedChats.filter((c) => c.rating !== undefined);
    const averageRating =
      ratedChats.length > 0
        ? ratedChats.reduce((sum, c) => sum + (c.rating || 0), 0) / ratedChats.length
        : 5.0; // Default to 5.0 if no ratings yet

    // Update professional stats
    await ctx.db.patch(chat.professionalId, {
      chatsCompleted,
      rating: averageRating,
    });

    return { success: true };
  },
});

/**
 * Get unrated completed sessions for the current student
 * Used to prompt students to rate their completed sessions
 */
export const getUnratedSessions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    // Get current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return [];
    }

    // Get all completed chats for this student that haven't been rated
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_student_and_status", (q) =>
        q.eq("studentId", user._id).eq("status", "completed")
      )
      .collect();

    // Filter out already rated sessions
    const unratedChats = completedChats.filter((chat) => chat.rating === undefined);

    // Enrich with mentor information
    const enrichedChats = await Promise.all(
      unratedChats.map(async (chat) => {
        const professional = await ctx.db.get(chat.professionalId);
        if (!professional) return null;

        const mentorUser = await ctx.db.get(professional.userId);
        if (!mentorUser) return null;

        return {
          chatId: chat._id,
          mentorName: `${mentorUser.firstName} ${mentorUser.lastName}`,
          mentorCompany: professional.company,
          mentorRole: professional.jobTitle,
          mentorAvatar: mentorUser.avatar,
          scheduledAt: chat.scheduledAt,
          completedAt: chat.completedAt,
        };
      })
    );

    // Filter out null values and sort by completion date (most recent first)
    return enrichedChats
      .filter((chat) => chat !== null)
      .sort((a, b) => (b!.completedAt || 0) - (a!.completedAt || 0));
  },
});

/**
 * Get unrated completed sessions with a specific mentor
 * Used on mentor profile page to allow rating from there
 */
export const getUnratedSessionsWithMentor = query({
  args: {
    mentorUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    // Get current user (student)
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return [];
    }

    // Get the professional profile for the mentor
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", args.mentorUserId))
      .first();

    if (!professional) {
      return [];
    }

    // Get all completed chats between this student and this mentor
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_student_and_status", (q) =>
        q.eq("studentId", user._id).eq("status", "completed")
      )
      .collect();

    // Filter for chats with this specific mentor that haven't been rated
    const unratedChats = completedChats.filter(
      (chat) => chat.professionalId === professional._id && chat.rating === undefined
    );

    // Get mentor user details
    const mentorUser = await ctx.db.get(args.mentorUserId);
    if (!mentorUser) {
      return [];
    }

    // Return enriched data
    return unratedChats.map((chat) => ({
      chatId: chat._id,
      mentorName: `${mentorUser.firstName} ${mentorUser.lastName}`,
      scheduledAt: chat.scheduledAt,
      completedAt: chat.completedAt,
    })).sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
  },
});

/**
 * Get all ratings the student has given to a specific mentor
 * Returns all completed sessions with this mentor and their ratings
 */
export const getStudentRatingsForMentor = query({
  args: {
    mentorUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    // Get current user (student)
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return [];
    }

    // Get the professional profile for the mentor
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", args.mentorUserId))
      .first();

    if (!professional) {
      return [];
    }

    // Get all completed chats between this student and this mentor
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_student_and_status", (q) =>
        q.eq("studentId", user._id).eq("status", "completed")
      )
      .collect();

    // Filter for chats with this specific mentor
    const mentorChats = completedChats.filter(
      (chat) => chat.professionalId === professional._id
    );

    // Get mentor user details
    const mentorUser = await ctx.db.get(args.mentorUserId);
    if (!mentorUser) {
      return [];
    }

    const mentorName = `${mentorUser.firstName} ${mentorUser.lastName}`;

    // Return all sessions with rating status
    return mentorChats.map((chat) => ({
      chatId: chat._id,
      mentorName,
      scheduledAt: chat.scheduledAt,
      completedAt: chat.completedAt,
      rating: chat.rating,
      feedback: chat.feedback,
      hasRating: chat.rating !== undefined,
    })).sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
  },
});

/**
 * Update an existing rating
 */
export const updateRating = mutation({
  args: {
    chatId: v.id("careerChats"),
    rating: v.number(), // 1-5
    feedback: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Validate and sanitize inputs
    const validatedRating = validateRating(args.rating);
    const sanitizedFeedback = validateString(args.feedback, 1000, "Feedback");

    // Get the chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Verify user is the student in this chat
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user || chat.studentId !== user._id.toString()) {
      throw new Error("Not authorized to update this rating");
    }

    // Ensure session can be rated
    const allowableStatuses: string[] = ["completed", "confirmed", "scheduled"];
    if (!allowableStatuses.includes(chat.status)) {
      throw new Error("Can only update ratings for confirmed or completed sessions");
    }

    const now = Date.now();

    // Update chat with new rating and feedback, auto-completing if needed
    const chatUpdate: Record<string, any> = {
      rating: validatedRating,
      feedback: sanitizedFeedback,
    };

    if (chat.status !== "completed") {
      chatUpdate.status = "completed";
      chatUpdate.completedAt = chat.completedAt || chat.scheduledAt || now;
    }

    await ctx.db.patch(args.chatId, chatUpdate);

    // Recalculate mentor stats
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", chat.professionalId).eq("status", "completed")
      )
      .collect();

    const chatsCompleted = completedChats.length;

    // Calculate average rating from chats that have ratings
    const ratedChats = completedChats.filter((c) => c.rating !== undefined);
    const averageRating =
      ratedChats.length > 0
        ? ratedChats.reduce((sum, c) => sum + (c.rating || 0), 0) / ratedChats.length
        : 5.0;

    // Update professional stats
    await ctx.db.patch(chat.professionalId, {
      chatsCompleted,
      rating: averageRating,
    });

    return { success: true };
  },
});

/**
 * Delete a rating (set it back to undefined)
 */
export const deleteRating = mutation({
  args: {
    chatId: v.id("careerChats"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get the chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Verify user is the student in this chat
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user || chat.studentId !== user._id.toString()) {
      throw new Error("Not authorized to delete this rating");
    }

    // Remove rating and feedback
    await ctx.db.patch(args.chatId, {
      rating: undefined,
      feedback: undefined,
    });

    // Recalculate mentor stats
    const completedChats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", chat.professionalId).eq("status", "completed")
      )
      .collect();

    const chatsCompleted = completedChats.length;

    // Calculate average rating from chats that have ratings (excluding the one we just deleted)
    const ratedChats = completedChats.filter((c) => c.rating !== undefined);
    const averageRating =
      ratedChats.length > 0
        ? ratedChats.reduce((sum, c) => sum + (c.rating || 0), 0) / ratedChats.length
        : 5.0;

    // Update professional stats
    await ctx.db.patch(chat.professionalId, {
      chatsCompleted,
      rating: averageRating,
    });

    return { success: true };
  },
});

/**
 * Mark a session as complete (student only)
 * Student can mark confirmed sessions as complete to unlock rating functionality
 */
export const completeSession = mutation({
  args: { chatId: v.id("careerChats") },
  handler: async (ctx, args) => {
    // Get user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Get chat
    const chat = await ctx.db.get(args.chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    // Verify student owns this chat
    if (chat.studentId !== user._id.toString()) {
      throw new Error("Not authorized");
    }

    // Verify chat is confirmed
    if (chat.status !== "confirmed" && chat.status !== "scheduled") {
      throw new Error("Can only complete confirmed or scheduled sessions");
    }

    // Update to completed
    await ctx.db.patch(args.chatId, {
      status: "completed",
      completedAt: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Get student's mentors (all mentors the student has booked)
 * Returns mentors with latest booking status
 */
export const getStudentMentors = query({
  args: {},
  handler: async (ctx) => {
    // Get current user
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

    // Get all non-cancelled bookings
    const bookings = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "pending"),
          q.eq(q.field("status"), "confirmed"),
          q.eq(q.field("status"), "completed")
        )
      )
      .collect();

    // Get unique mentors and enrich with data
    const mentorIds = [...new Set(bookings.map(b => b.professionalId))];

    const mentors = await Promise.all(
      mentorIds.map(async (profId) => {
        const professional = await ctx.db.get(profId);
        if (!professional) return null;

        const mentorUser = await ctx.db.get(professional.userId);
        if (!mentorUser) return null;

        // Get latest booking with this mentor
        const latestBooking = bookings
          .filter(b => b.professionalId === profId)
          .sort((a, b) => (b.scheduledAt || 0) - (a.scheduledAt || 0))[0];

        return {
          userId: professional.userId,
          name: `${mentorUser.firstName} ${mentorUser.lastName}`,
          avatar: mentorUser.avatar,
          company: professional.company,
          jobTitle: professional.jobTitle,
          rating: professional.rating,
          status: latestBooking.status,
          scheduledAt: latestBooking.scheduledAt,
        };
      })
    );

    return mentors.filter(m => m !== null);
  }
});

/**
 * Get all sessions (pending, confirmed, and completed) between student and mentor
 * Used on mentor profile page to show complete session history with different actions per status
 */
export const getStudentSessionsWithMentor = query({
  args: {
    mentorUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    // Get current user (student)
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return [];
    }

    // Get the professional profile for the mentor
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", args.mentorUserId))
      .first();

    if (!professional) {
      return [];
    }

    // Get ALL chats between this student and this mentor (not just completed)
    const allChats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
      .collect();

    // Filter for chats with this specific mentor
    const mentorChats = allChats.filter(
      (chat) => chat.professionalId === professional._id
    );

    // Get mentor user details
    const mentorUser = await ctx.db.get(args.mentorUserId);
    if (!mentorUser) {
      return [];
    }

    const mentorName = `${mentorUser.firstName} ${mentorUser.lastName}`;
    const now = Date.now();

    // Return all sessions with status-aware metadata
    return mentorChats.map((chat) => ({
      chatId: chat._id,
      mentorName,
      scheduledAt: chat.scheduledAt,
      completedAt: chat.completedAt,
      status: chat.status,
      rating: chat.rating,
      feedback: chat.feedback,
      hasRating: chat.rating !== undefined,
      // Can mark as complete if confirmed and past scheduled time
      canComplete:
        (chat.status === "confirmed" || chat.status === "scheduled") &&
        chat.scheduledAt &&
        chat.scheduledAt < now,
    })).sort((a, b) => (b.scheduledAt || 0) - (a.scheduledAt || 0));
  },
});

/**
 * Get all career chats (admin only)
 * Used for admin dashboard
 */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const chats = await ctx.db
      .query("careerChats")
      .order("desc")
      .collect();

    return chats;
  },
});
