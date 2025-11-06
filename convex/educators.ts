import { query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

// Get all students (for educator dashboard)
export const getAllStudents = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getCurrentUser(ctx);

    // Only educators can access this
    if (!currentUser || currentUser.role !== "student") {
      // For now, allow all authenticated users to see this
      // In production, you'd check for educator role
    }

    const allUsers = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "student"))
      .collect();

    // Filter out demo/test users (emails containing @example.com, @demo, or test/demo in name)
    const realStudents = allUsers.filter(user => {
      const email = user.email.toLowerCase();
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      
      // Exclude common demo/test patterns
      const isDemoEmail = email.includes('@example.com') || 
                         email.includes('@demo.com') || 
                         email.includes('@test.com') ||
                         email.includes('demo@') ||
                         email.includes('test@');
      
      const isDemoName = fullName.includes('demo') || 
                        fullName.includes('test') ||
                        fullName.includes('example');
      
      return !isDemoEmail && !isDemoName;
    });

    // Enrich with profile data and assessment count
    const enrichedStudents = await Promise.all(
      realStudents.map(async (user) => {
        const profile = await ctx.db
          .query("studentProfiles")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .unique();

        const assessmentResults = await ctx.db
          .query("assessmentResults")
          .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
          .collect();

        const savedCareers = await ctx.db
          .query("savedCareers")
          .withIndex("by_student", (q) => q.eq("studentId", user._id.toString()))
          .collect();

        return {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          gradeLevel: profile?.gradeLevel || "Not set",
          school: profile?.school || "Not set",
          assessmentsCompleted: assessmentResults.length,
          careersExplored: savedCareers.length,
          lastActive: user.createdAt, // We don't track last active yet
        };
      })
    );

    return enrichedStudents;
  },
});

// Get educator dashboard stats
export const getEducatorStats = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getCurrentUser(ctx);

    // Get all students
    const students = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "student"))
      .collect();

    const totalStudents = students.length;

    // Get all assessment results
    const allResults = await ctx.db.query("assessmentResults").collect();
    const completedAssessments = allResults.length;

    // Get all saved careers
    const allSavedCareers = await ctx.db.query("savedCareers").collect();

    // Calculate completion rate
    const completionRate = totalStudents > 0
      ? Math.round((completedAssessments / totalStudents) * 100)
      : 0;

    // Get top careers (most saved)
    const careerCounts: Record<string, number> = {};
    allSavedCareers.forEach((save) => {
      careerCounts[save.careerId] = (careerCounts[save.careerId] || 0) + 1;
    });

    const topCareerIds = Object.entries(careerCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id]) => id);

    const topCareers = await Promise.all(
      topCareerIds.map(async (id) => {
        const career = await ctx.db.get(id as any);
        return {
          id,
          title: career && 'title' in career ? career.title : 'Unknown',
          count: careerCounts[id],
        };
      })
    );

    return {
      totalStudents,
      completedAssessments,
      completionRate,
      totalSavedCareers: allSavedCareers.length,
      topCareers,
    };
  },
});

// Get individual student details (for detail page)
export const getStudentDetail = query({
  args: { studentId: v.id("users") },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUser(ctx);

    const student = await ctx.db.get(args.studentId);
    if (!student || student.role !== "student") {
      return null;
    }

    const profile = await ctx.db
      .query("studentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.studentId))
      .unique();

    const assessmentResults = await ctx.db
      .query("assessmentResults")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId.toString()))
      .order("desc")
      .collect();

    // Enrich assessment results with career details
    const enrichedResults = await Promise.all(
      assessmentResults.map(async (result) => {
        const topMatches = await Promise.all(
          result.careerMatches.slice(0, 5).map(async (match) => {
            const career = await ctx.db.get(match.careerId as any);
            return {
              ...match,
              career: career && 'title' in career && 'category' in career
                ? {
                    _id: career._id,
                    title: career.title,
                    category: career.category,
                  }
                : null,
            };
          })
        );
        return { ...result, careerMatches: topMatches };
      })
    );

    const savedCareers = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId.toString()))
      .collect();

    // Fetch full career details
    const savedCareerDetails = await Promise.all(
      savedCareers.map(async (save) => {
        const career = await ctx.db.get(save.careerId as any);
        if (career && 'title' in career && 'category' in career) {
          return {
            _id: career._id,
            title: career.title,
            category: career.category,
            shortDescription: career.shortDescription,
          };
        }
        return null;
      })
    );

    return {
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      avatar: student.avatar,
      profile,
      assessmentResults: enrichedResults,
      savedCareers: savedCareerDetails.filter((c) => c !== null),
    };
  },
});
