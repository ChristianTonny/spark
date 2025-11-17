import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * Get helper function for current user
 */
async function getCurrentUserId(ctx: any): Promise<Id<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q: any) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  return user ? user._id : null;
}

/**
 * Get earnings summary for current mentor
 */
export const getEarningsSummary = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Get all completed sessions
    const completedSessions = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professional._id).eq("status", "completed")
      )
      .collect();

    const now = Date.now();
    const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;
    const twoMonthsAgo = now - 60 * 24 * 60 * 60 * 1000;

    // Calculate earnings
    const ratePerSession = professional.ratePerChat || 5000; // Default 5000 RWF if not set
    
    const totalEarnings = completedSessions.length * ratePerSession;
    
    const thisMonthSessions = completedSessions.filter(
      (s) => (s.completedAt || 0) >= oneMonthAgo
    );
    const thisMonthEarnings = thisMonthSessions.length * ratePerSession;
    
    const lastMonthSessions = completedSessions.filter(
      (s) => (s.completedAt || 0) >= twoMonthsAgo && (s.completedAt || 0) < oneMonthAgo
    );
    const lastMonthEarnings = lastMonthSessions.length * ratePerSession;

    // Calculate growth percentage
    const growthPercentage = lastMonthEarnings > 0
      ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100
      : 0;

    return {
      totalEarnings,
      thisMonthEarnings,
      lastMonthEarnings,
      growthPercentage,
      totalSessions: completedSessions.length,
      thisMonthSessions: thisMonthSessions.length,
      lastMonthSessions: lastMonthSessions.length,
      ratePerSession,
    };
  },
});

/**
 * Get detailed earnings breakdown by month
 */
export const getMonthlyBreakdown = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Get all completed sessions
    const completedSessions = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professional._id).eq("status", "completed")
      )
      .collect();

    const ratePerSession = professional.ratePerChat || 5000;

    // Group by month
    const monthlyData: Record<string, { earnings: number; sessions: number; month: string; year: number }> = {};
    
    completedSessions.forEach((session) => {
      if (!session.completedAt) return;
      
      const date = new Date(session.completedAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          earnings: 0,
          sessions: 0,
          month: date.toLocaleString('en-US', { month: 'long' }),
          year: date.getFullYear(),
        };
      }
      
      monthlyData[monthKey].earnings += ratePerSession;
      monthlyData[monthKey].sessions += 1;
    });

    // Convert to sorted array (most recent first)
    return Object.entries(monthlyData)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, data]) => ({ ...data, monthKey: key }));
  },
});

/**
 * Get recent completed sessions with earnings details
 */
export const getRecentSessions = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Get completed sessions
    const completedSessions = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professional._id).eq("status", "completed")
      )
      .order("desc")
      .take(args.limit || 20);

    const ratePerSession = professional.ratePerChat || 5000;

    // Enrich with student and career details
    const sessionsWithDetails = await Promise.all(
      completedSessions.map(async (session) => {
        const student = await ctx.db.get(session.studentId as Id<"users">);
        const career = session.careerId ? await ctx.db.get(session.careerId as Id<"careers">) : null;

        return {
          _id: session._id,
          studentName: student ? `${student.firstName} ${student.lastName}` : "Unknown",
          careerTitle: career?.title || "General Session",
          completedAt: session.completedAt,
          scheduledAt: session.scheduledAt,
          duration: session.duration,
          rating: session.rating,
          earnings: ratePerSession,
        };
      })
    );

    return sessionsWithDetails;
  },
});

/**
 * Export earnings data as CSV string
 * Returns CSV-formatted string that can be downloaded
 */
export const exportEarningsCSV = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Get all completed sessions
    const completedSessions = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professional._id).eq("status", "completed")
      )
      .order("desc")
      .collect();

    const ratePerSession = professional.ratePerChat || 5000;

    // Build CSV header
    let csv = "Date,Student,Career,Duration (min),Rating,Earnings (RWF)\n";

    // Add rows
    for (const session of completedSessions) {
      const student = await ctx.db.get(session.studentId as Id<"users">);
      const career = session.careerId ? await ctx.db.get(session.careerId as Id<"careers">) : null;
      
      const date = session.completedAt 
        ? new Date(session.completedAt).toLocaleDateString('en-RW')
        : "N/A";
      const studentName = student ? `${student.firstName} ${student.lastName}` : "Unknown";
      const careerTitle = career?.title || "General Session";
      const duration = session.duration || 15;
      const rating = session.rating || "Not rated";
      
      csv += `${date},"${studentName}","${careerTitle}",${duration},${rating},${ratePerSession}\n`;
    }

    return csv;
  },
});

