import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to check if current user is admin
async function requireAdmin(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q: any) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  return user;
}

// ============================================
// ADMIN MANAGEMENT
// ============================================

// Make a user an admin (run once via CLI)
export const makeUserAdmin = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error(`User with email ${args.email} not found`);
    }

    await ctx.db.patch(user._id, {
      role: "admin",
    });

    return { success: true, userId: user._id, email: user.email };
  },
});

// Check for duplicate users by email (debug helper)
export const checkDuplicatesByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const allUsers = await ctx.db.query("users").collect();
    const usersWithEmail = allUsers.filter(u => u.email === args.email);
    return usersWithEmail;
  },
});

// Delete duplicate user (cleanup helper)
export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
    return { success: true, deletedUserId: args.userId };
  },
});

// Approve all existing mentors (one-time migration)
export const approveAllExistingMentors = mutation({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();

    let approved = 0;
    for (const prof of professionals) {
      if (!prof.isApproved) {
        await ctx.db.patch(prof._id, {
          isApproved: true,
          approvedAt: Date.now(),
        });
        approved++;
      }
    }

    return { success: true, approved, total: professionals.length };
  },
});

// Create application records for existing mentors (one-time migration)
export const createApplicationsForExistingMentors = mutation({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();
    let created = 0;

    for (const prof of professionals) {
      // Check if application already exists
      if (prof.applicationId) {
        continue; // Skip if already has an application
      }

      // Get user details
      const user = await ctx.db.get(prof.userId);
      if (!user) continue;

      // Check if application already exists by email
      const existingApp = await ctx.db
        .query("mentorApplications")
        .withIndex("by_email", (q) => q.eq("email", user.email))
        .first();

      if (existingApp) {
        // Link existing application to professional
        await ctx.db.patch(prof._id, {
          applicationId: existingApp._id,
        });
        continue;
      }

      // Create retroactive application record
      const applicationId = await ctx.db.insert("mentorApplications", {
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || "Not provided",
        linkedin: undefined,
        currentRole: prof.jobTitle,
        company: prof.company,
        yearsExperience: prof.yearsExperience?.toString() || "5+",
        industry: "Not specified",
        careerField: "Not specified",
        availability: "Flexible",
        motivation: "Existing mentor - created before application system",
        sessionsPerMonth: "3-5",
        focusAreas: ["Career Planning", "Industry Insights"],
        status: prof.isApproved ? "approved" : "pending",
        submittedAt: prof.approvedAt || Date.now(),
        reviewedAt: prof.isApproved ? prof.approvedAt : undefined,
        reviewNotes: prof.isApproved ? "Retroactively approved - existing mentor" : undefined,
      });

      // Link application to professional
      await ctx.db.patch(prof._id, {
        applicationId,
      });

      created++;
    }

    return { success: true, created, total: professionals.length };
  },
});

// Check if current user is admin
export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    return user?.role === "admin";
  },
});

// ============================================
// MENTOR APPLICATION MANAGEMENT
// ============================================

// Get all mentor applications
export const getAllApplications = query({
  args: {
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    let query = ctx.db.query("mentorApplications");

    let applications = await query.collect();

    // Filter by status if provided
    if (args.status) {
      applications = applications.filter((app) => app.status === args.status);
    }

    // Sort by submitted date (newest first)
    applications.sort((a, b) => b.submittedAt - a.submittedAt);

    return applications;
  },
});

// Get single application details
export const getApplication = query({
  args: {
    applicationId: v.id("mentorApplications"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const application = await ctx.db.get(args.applicationId);
    return application;
  },
});

// Approve mentor application
export const approveApplication = mutation({
  args: {
    applicationId: v.id("mentorApplications"),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);

    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found");

    if (application.status !== "pending") {
      throw new Error("Application already processed");
    }

    const now = Date.now();

    // Check if user already exists
    let user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", application.email))
      .first();

    // If user doesn't exist, create one
    if (!user) {
      const nameParts = application.fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const userId = await ctx.db.insert("users", {
        email: application.email,
        phone: application.phone,
        firstName,
        lastName,
        role: "mentor",
        createdAt: now,
      });

      user = await ctx.db.get(userId);
      if (!user) throw new Error("Failed to create user");
    } else if (user.role !== "mentor") {
      // Update existing user to mentor role
      await ctx.db.patch(user._id, { role: "mentor" });
    }

    // Check if professional profile already exists
    const existingProfessional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (existingProfessional) {
      // Update existing professional profile to approved
      await ctx.db.patch(existingProfessional._id, {
        isApproved: true,
        approvedAt: now,
        approvedBy: admin._id,
      });
    } else {
      // Create professional profile
      await ctx.db.insert("professionals", {
        userId: user._id,
        company: application.company,
        jobTitle: application.currentRole,
        rating: 0,
        chatsCompleted: 0,
        careerIds: [], // Admin can set this later or mentor can update
        availability: [],
        bio: application.motivation, // Use motivation as initial bio
        yearsExperience: parseInt(application.yearsExperience) || 0,
        totalEarnings: 0,
        earningsThisMonth: 0,
        earningsLastMonth: 0,
        isApproved: true,
        approvedAt: now,
        approvedBy: admin._id,
        applicationId: args.applicationId,
      });
    }

    // Notify the mentor about approval
    const mentorUser = await ctx.db.get(user._id);
    if (mentorUser) {
      await ctx.db.insert("notifications", {
        userId: user._id,
        type: "system",
        title: "Mentor Application Approved! 🎉",
        message: `Congratulations! Your application has been approved. You can now appear in the mentors directory and students can book sessions with you.`,
        read: false,
        createdAt: Date.now(),
        metadata: {
          applicationId: args.applicationId,
        },
      });
    }

    // Update application status
    await ctx.db.patch(args.applicationId, {
      status: "approved",
      reviewedAt: now,
      reviewNotes: args.notes,
    });

    // TODO: Send approval email to applicant

    return { success: true, userId: user._id };
  },
});

// Reject mentor application
export const rejectApplication = mutation({
  args: {
    applicationId: v.id("mentorApplications"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found");

    if (application.status !== "pending") {
      throw new Error("Application already processed");
    }

    // Update application status
    await ctx.db.patch(args.applicationId, {
      status: "rejected",
      reviewedAt: Date.now(),
      reviewNotes: args.notes,
    });

    // TODO: Send rejection email to applicant

    return { success: true };
  },
});

// ============================================
// PLATFORM STATISTICS
// ============================================

// Get dashboard statistics
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const users = await ctx.db.query("users").collect();
    const applications = await ctx.db.query("mentorApplications").collect();
    const bookings = await ctx.db.query("careerChats").collect();
    const articles = await ctx.db.query("articles").collect();
    const professionals = await ctx.db.query("professionals").collect();

    // User stats
    const totalUsers = users.length;
    const students = users.filter((u) => u.role === "student").length;
    const mentors = users.filter((u) => u.role === "mentor").length;
    const approvedMentors = professionals.filter((p) => p.isApproved).length;

    // Application stats
    const pendingApplications = applications.filter((a) => a.status === "pending").length;
    const approvedApplications = applications.filter((a) => a.status === "approved").length;
    const rejectedApplications = applications.filter((a) => a.status === "rejected").length;

    // Booking stats
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((b) => b.status === "pending").length;
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
    const completedBookings = bookings.filter((b) => b.status === "completed").length;

    // Revenue stats
    const totalEarnings = professionals.reduce((sum, p) => sum + p.totalEarnings, 0);
    const earningsThisMonth = professionals.reduce((sum, p) => sum + p.earningsThisMonth, 0);

    // Article stats
    const totalArticles = articles.filter((a) => a.status === "published").length;
    const draftArticles = articles.filter((a) => a.status === "draft").length;
    const totalArticleViews = articles.reduce((sum, a) => sum + a.viewCount, 0);

    return {
      users: {
        total: totalUsers,
        students,
        mentors,
        approvedMentors,
      },
      applications: {
        pending: pendingApplications,
        approved: approvedApplications,
        rejected: rejectedApplications,
        total: applications.length,
      },
      bookings: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
      },
      revenue: {
        total: totalEarnings,
        thisMonth: earningsThisMonth,
      },
      articles: {
        published: totalArticles,
        drafts: draftArticles,
        totalViews: totalArticleViews,
      },
    };
  },
});

// Get recent activity (for activity feed)
export const getRecentActivity = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const limit = args.limit || 10;

    // Get recent users
    const users = await ctx.db.query("users").order("desc").take(limit);

    // Get recent applications
    const applications = await ctx.db.query("mentorApplications").order("desc").take(limit);

    // Get recent bookings
    const bookings = await ctx.db.query("careerChats").order("desc").take(limit);

    // Combine and sort by date
    const activity = [
      ...users.map((u) => ({ type: "user_signup", data: u, timestamp: u.createdAt })),
      ...applications.map((a) => ({
        type: "mentor_application",
        data: a,
        timestamp: a.submittedAt,
      })),
      ...bookings.map((b) => ({ type: "booking", data: b, timestamp: b.requestedAt })),
    ];

    activity.sort((a, b) => b.timestamp - a.timestamp);

    return activity.slice(0, limit);
  },
});

// ============================================
// USER MANAGEMENT
// ============================================

// Get all users with pagination
export const getAllUsers = query({
  args: {
    role: v.optional(
      v.union(
        v.literal("student"),
        v.literal("mentor"),
        v.literal("educator"),
        v.literal("company"),
        v.literal("partner"),
        v.literal("admin")
      )
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    let users = await ctx.db.query("users").collect();

    // Filter by role if provided
    if (args.role) {
      users = users.filter((u) => u.role === args.role);
    }

    // Sort by created date (newest first)
    users.sort((a, b) => b.createdAt - a.createdAt);

    return users;
  },
});

// Get user details with related data
export const getUserDetails = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    // Get related data based on role
    let professional: any = null;
    let studentProfile: any = null;
    let bookings: any[] = [];

    if (user.role === "mentor") {
      professional = await ctx.db
        .query("professionals")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .first();

      // Get bookings as mentor
      bookings = await ctx.db
        .query("careerChats")
        .withIndex("by_professional", (q) => q.eq("professionalId", professional?._id!))
        .collect();
    } else if (user.role === "student") {
      studentProfile = await ctx.db
        .query("studentProfiles")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .first();

      // Get bookings as student
      bookings = await ctx.db
        .query("careerChats")
        .withIndex("by_student", (q) => q.eq("studentId", user._id))
        .collect();
    }

    return {
      user,
      professional,
      studentProfile,
      bookings,
    };
  },
});
