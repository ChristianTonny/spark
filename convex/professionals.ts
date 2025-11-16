import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Get all professionals
export const list = query({
  args: {},
  handler: async (ctx) => {
    const professionals = await ctx.db.query("professionals").collect();

    // Enrich with user data
    const enriched = await Promise.all(
      professionals.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return { ...prof, ...user };
      })
    );

    return enriched;
  },
});

// Search professionals
export const search = query({
  args: {
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let professionals = await ctx.db.query("professionals").collect();

    // Filter by search query
    if (args.searchQuery && args.searchQuery !== '') {
      const query = args.searchQuery.toLowerCase();
      professionals = professionals.filter(
        (p) =>
          p.company.toLowerCase().includes(query) ||
          p.jobTitle.toLowerCase().includes(query)
      );
    }

    // Enrich with user data
    const enriched = await Promise.all(
      professionals.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return { ...prof, ...user };
      })
    );

    return enriched;
  },
});

// Get professionals by career IDs
export const getByCareerIds = query({
  args: { careerIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const professionals = await ctx.db.query("professionals").collect();

    // Filter professionals who can discuss these careers
    const filtered = professionals.filter((p) =>
      p.careerIds.some((id) => args.careerIds.includes(id))
    );

    // Enrich with user data
    const enriched = await Promise.all(
      filtered.map(async (prof) => {
        const user = await ctx.db.get(prof.userId);
        return { ...prof, ...user };
      })
    );

    return enriched;
  },
});

// Get current user's professional profile
export const getCurrentProfessional = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    // Get user from users table
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (!user) {
      return null;
    }

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      return null;
    }

    // Return combined data
    return { ...professional, ...user };
  },
});

// Create a professional profile
export const create = mutation({
  args: {
    company: v.string(),
    jobTitle: v.string(),
    bio: v.string(), // Make required to match form
    yearsExperience: v.number(), // Make required to match form
    calendlyUrl: v.optional(v.string()),
    ratePerChat: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Check if professional profile already exists
    const existing = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (existing) {
      throw new Error("Professional profile already exists");
    }

    // Create professional profile
    const professionalId = await ctx.db.insert("professionals", {
      userId: user._id,
      company: args.company,
      jobTitle: args.jobTitle,
      bio: args.bio,
      yearsExperience: args.yearsExperience,
      rating: 5.0, // Default rating
      chatsCompleted: 0,
      careerIds: [], // Will be set later in profile settings
      availability: [], // Will be set later in availability settings
      calendlyUrl: args.calendlyUrl,
      ratePerChat: args.ratePerChat || 0,
      totalEarnings: 0,
      earningsThisMonth: 0,
      earningsLastMonth: 0,
    });

    return professionalId;
  },
});

// Get all mentor sessions (for current mentor)
export const getMentorSessions = query({
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

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      return [];
    }

    // Fetch all career chats for this mentor
    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", professional._id))
      .order("desc")
      .collect();

    // Enrich with student and career details
    const enrichedChats = await Promise.all(
      chats.map(async (chat) => {
        // Get student user by ID string
        const allUsers = await ctx.db.query("users").collect();
        const studentUser = allUsers.find(u => u._id.toString() === chat.studentId);

        // Get student profile
        let studentProfile = null;
        if (studentUser) {
          studentProfile = await ctx.db
            .query("studentProfiles")
            .withIndex("by_user", (q) => q.eq("userId", studentUser._id))
            .first();
        }

        // Get career details (careerId is stored as string)
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
          meetingUrl: chat.meetingUrl,
          student: studentUser && studentProfile ? {
            _id: studentUser._id,
            name: `${studentUser.firstName} ${studentUser.lastName}`,
            email: studentUser.email,
            avatar: studentUser.avatar,
            gradeLevel: studentProfile.gradeLevel,
            school: studentProfile.school,
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

// Get upcoming mentor sessions
export const getMentorUpcomingSessions = query({
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

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      return [];
    }

    const now = Date.now();

    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", professional._id))
      .filter((q) => q.eq(q.field("status"), "scheduled"))
      .collect();

    // Filter for future sessions
    const upcomingSessions = chats.filter(chat => chat.scheduledAt > now);

    // Enrich with student and career details
    const enrichedSessions = await Promise.all(
      upcomingSessions.map(async (chat) => {
        const allUsers = await ctx.db.query("users").collect();
        const studentUser = allUsers.find(u => u._id.toString() === chat.studentId);

        let studentProfile = null;
        if (studentUser) {
          studentProfile = await ctx.db
            .query("studentProfiles")
            .withIndex("by_user", (q) => q.eq("userId", studentUser._id))
            .first();
        }

        const allCareers = await ctx.db.query("careers").collect();
        const career = allCareers.find(c => c._id === chat.careerId);

        return {
          _id: chat._id,
          scheduledAt: chat.scheduledAt,
          duration: chat.duration,
          meetingUrl: chat.meetingUrl,
          status: chat.status,
          student: studentUser && studentProfile ? {
            _id: studentUser._id,
            name: `${studentUser.firstName} ${studentUser.lastName}`,
            email: studentUser.email,
            avatar: studentUser.avatar,
            gradeLevel: studentProfile.gradeLevel,
            school: studentProfile.school,
          } : null,
          career: career ? {
            _id: career._id,
            title: career.title,
            category: career.category,
          } : null,
        };
      })
    );

    return enrichedSessions.sort((a, b) => a.scheduledAt - b.scheduledAt);
  },
});

// Get past mentor sessions
export const getMentorPastSessions = query({
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

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      return [];
    }

    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", professional._id))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "completed"),
          q.eq(q.field("status"), "cancelled"),
          q.eq(q.field("status"), "no_show")
        )
      )
      .order("desc")
      .collect();

    // Enrich with student and career details
    const enrichedSessions = await Promise.all(
      chats.map(async (chat) => {
        const allUsers = await ctx.db.query("users").collect();
        const studentUser = allUsers.find(u => u._id.toString() === chat.studentId);

        let studentProfile = null;
        if (studentUser) {
          studentProfile = await ctx.db
            .query("studentProfiles")
            .withIndex("by_user", (q) => q.eq("userId", studentUser._id))
            .first();
        }

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
          student: studentUser && studentProfile ? {
            _id: studentUser._id,
            name: `${studentUser.firstName} ${studentUser.lastName}`,
            email: studentUser.email,
            avatar: studentUser.avatar,
            gradeLevel: studentProfile.gradeLevel,
            school: studentProfile.school,
          } : null,
          career: career ? {
            _id: career._id,
            title: career.title,
            category: career.category,
          } : null,
        };
      })
    );

    return enrichedSessions;
  },
});

// Get next upcoming session
export const getNextMentorSession = query({
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

    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      return null;
    }

    const now = Date.now();

    const chats = await ctx.db
      .query("careerChats")
      .withIndex("by_professional", (q) => q.eq("professionalId", professional._id))
      .filter((q) => q.eq(q.field("status"), "scheduled"))
      .collect();

    // Filter for future sessions and get the earliest one
    const upcomingSessions = chats.filter(chat => chat.scheduledAt > now);

    if (upcomingSessions.length === 0) {
      return null;
    }

    // Sort and get the next one
    upcomingSessions.sort((a, b) => a.scheduledAt - b.scheduledAt);
    const nextSession = upcomingSessions[0];

    // Enrich with student and career details
    const allUsers = await ctx.db.query("users").collect();
    const studentUser = allUsers.find(u => u._id.toString() === nextSession.studentId);

    let studentProfile = null;
    if (studentUser) {
      studentProfile = await ctx.db
        .query("studentProfiles")
        .withIndex("by_user", (q) => q.eq("userId", studentUser._id))
        .first();
    }

    const allCareers = await ctx.db.query("careers").collect();
    const career = allCareers.find(c => c._id === nextSession.careerId);

    return {
      _id: nextSession._id,
      scheduledAt: nextSession.scheduledAt,
      duration: nextSession.duration,
      meetingUrl: nextSession.meetingUrl,
      status: nextSession.status,
      student: studentUser && studentProfile ? {
        _id: studentUser._id,
        name: `${studentUser.firstName} ${studentUser.lastName}`,
        email: studentUser.email,
        avatar: studentUser.avatar,
        gradeLevel: studentProfile.gradeLevel,
        school: studentProfile.school,
      } : null,
      career: career ? {
        _id: career._id,
        title: career.title,
        category: career.category,
      } : null,
    };
  },
});

// Update mentor availability
export const updateAvailability = mutation({
  args: {
    availability: v.array(
      v.object({
        dayOfWeek: v.number(), // 0-6 (Sunday-Saturday)
        startTime: v.string(), // "14:00"
        endTime: v.string(),   // "16:00"
      })
    ),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Get professional profile
    const professional = await ctx.db
      .query("professionals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();

    if (!professional) {
      throw new Error("Professional profile not found");
    }

    // Update availability
    await ctx.db.patch(professional._id, {
      availability: args.availability,
    });

    return professional._id;
  },
});
