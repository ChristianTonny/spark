import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Get upcoming sessions for a mentor
export const getMentorUpcoming = query({
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

    // Get scheduled sessions
    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", professional._id))
      .collect();

    // Filter upcoming sessions
    const now = Date.now();
    const upcoming = chats.filter(
      (chat) => chat.status === "scheduled" && chat.scheduledAt > now
    );

    // Enrich with student and career data
    const enriched = await Promise.all(
      upcoming.map(async (chat) => {
        const student = await ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("_id"), chat.studentId))
          .first();

        const career = await ctx.db.get(chat.careerId as any);

        return {
          ...chat,
          studentName: student ? `${student.firstName} ${student.lastName}` : "Unknown",
          studentAvatar: student?.avatar,
          careerTitle: career?.title || "General Career Advice",
        };
      })
    );

    // Sort by scheduled time
    return enriched.sort((a, b) => a.scheduledAt - b.scheduledAt);
  },
});

// Get mentor stats
export const getMentorStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return null;

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) return null;

    // Get all sessions
    const allChats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", professional._id))
      .collect();

    // Calculate stats
    const now = Date.now();
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

    const sessionsThisMonth = allChats.filter(
      (chat) => chat.completedAt && chat.completedAt > oneMonthAgo
    ).length;

    const completedSessions = allChats.filter(
      (chat) => chat.status === "completed"
    ).length;

    const totalSessions = allChats.length;
    const completionRate = totalSessions > 0
      ? Math.round((completedSessions / totalSessions) * 100)
      : 100;

    // Calculate average rating
    const ratedSessions = allChats.filter((chat) => chat.rating);
    const avgRating = ratedSessions.length > 0
      ? ratedSessions.reduce((sum, chat) => sum + (chat.rating || 0), 0) / ratedSessions.length
      : professional.rating;

    return {
      sessionsThisMonth,
      totalEarnings: professional.totalEarnings,
      avgRating: Math.round(avgRating * 10) / 10,
      completionRate,
      totalSessions: completedSessions,
    };
  },
});

// Get student bookings
export const getStudentBookings = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) return [];

    // Get all bookings for this student
    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
      .collect();

    // Enrich with mentor and career data
    const enriched = await Promise.all(
      chats.map(async (chat) => {
        const professional = await ctx.db.get(chat.professionalId);
        const mentor = professional
          ? await ctx.db.get(professional.userId)
          : null;

        const career = await ctx.db.get(chat.careerId as any);

        return {
          ...chat,
          mentorName: mentor ? `${mentor.firstName} ${mentor.lastName}` : "Unknown",
          mentorAvatar: mentor?.avatar,
          mentorCompany: professional?.company,
          careerTitle: career?.title || "General Career Advice",
        };
      })
    );

    // Sort by scheduled time (most recent first)
    return enriched.sort((a, b) => b.scheduledAt - a.scheduledAt);
  },
});

// Book a session (create a career chat)
export const bookSession = mutation({
  args: {
    professionalId: v.id("professionals"),
    careerId: v.optional(v.string()),
    scheduledAt: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Create the booking
    const chatId = await ctx.db.insert("careerChats", {
      studentId: user._id,
      professionalId: args.professionalId,
      careerId: args.careerId || "",
      scheduledAt: args.scheduledAt,
      duration: 15, // 15 minutes default
      status: "scheduled",
    });

    return chatId;
  },
});

// Cancel a session
export const cancelSession = mutation({
  args: {
    chatId: v.id("careerChats"),
  },
  handler: async (ctx, args) => {
    await getCurrentUserOrThrow(ctx);

    await ctx.db.patch(args.chatId, {
      status: "cancelled",
    });

    return args.chatId;
  },
});

// Complete a session and add rating
export const completeSession = mutation({
  args: {
    chatId: v.id("careerChats"),
    rating: v.optional(v.number()),
    feedback: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await getCurrentUserOrThrow(ctx);

    await ctx.db.patch(args.chatId, {
      status: "completed",
      completedAt: Date.now(),
      rating: args.rating,
      feedback: args.feedback,
    });

    // Update professional's rating and chat count
    const chat = await ctx.db.get(args.chatId);
    if (chat) {
      const professional = await ctx.db.get(chat.professionalId);
      if (professional) {
        await ctx.db.patch(chat.professionalId, {
          chatsCompleted: professional.chatsCompleted + 1,
        });

        // Update earnings if there's a rate
        if (professional.ratePerChat) {
          await ctx.db.patch(chat.professionalId, {
            totalEarnings: professional.totalEarnings + professional.ratePerChat,
            earningsThisMonth: professional.earningsThisMonth + professional.ratePerChat,
          });
        }
      }
    }

    return args.chatId;
  },
});
