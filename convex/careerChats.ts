import { query } from "./_generated/server";
import { v } from "convex/values";

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
        // Use indexed lookup instead of loading all careers (N+1 fix)
        const career = chat.careerId ? await ctx.db.get(chat.careerId as any) : null;

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
        
        // Use indexed lookup instead of loading all careers (N+1 fix)
        const career = chat.careerId ? await ctx.db.get(chat.careerId as any) : null;

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
