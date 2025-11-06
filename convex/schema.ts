import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User accounts (synced from Clerk)
  users: defineTable({
    // Clerk authentication fields (optional for demo/seed users)
    tokenIdentifier: v.optional(v.string()), // Unique identifier from Clerk JWT
    clerkId: v.optional(v.string()), // Clerk user ID

    // User profile fields
    email: v.string(),
    phone: v.optional(v.string()),
    firstName: v.string(),
    lastName: v.string(),
    avatar: v.optional(v.string()),

    // Role for access control
    role: v.union(
      v.literal("student"),
      v.literal("mentor"),
      v.literal("company"),
      v.literal("partner")
    ),

    createdAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // Student profiles
  studentProfiles: defineTable({
    userId: v.id("users"),
    gradeLevel: v.string(),
    school: v.optional(v.string()),
    district: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
    careersExplored: v.number(),
    chatsCompleted: v.number(),
    chatsUpcoming: v.number(),
    assessmentsTaken: v.number(),
  }).index("by_user", ["userId"]),

  // Career profiles
  careers: defineTable({
    title: v.string(),
    category: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    videoUrl: v.string(),
    videoThumbnail: v.string(),
    salaryMin: v.number(),
    salaryMax: v.number(),
    currency: v.string(),
    requiredEducation: v.string(),
    requiredSkills: v.array(v.string()),
    careerPath: v.array(
      v.object({
        stage: v.string(),
        duration: v.string(),
        description: v.string(),
        requirements: v.optional(v.array(v.string())),
        estimatedCost: v.optional(v.number()),
      })
    ),
    relatedCareerIds: v.array(v.string()),
    sponsoredByCompanyId: v.optional(v.string()),
    views: v.number(),
    saves: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_title", ["title"]),

  // Professional mentors
  professionals: defineTable({
    userId: v.id("users"),
    company: v.string(),
    jobTitle: v.string(),
    rating: v.number(),
    chatsCompleted: v.number(),
    careerIds: v.array(v.string()),
    availability: v.array(
      v.object({
        dayOfWeek: v.number(),
        startTime: v.string(),
        endTime: v.string(),
      })
    ),
    bio: v.optional(v.string()),
    yearsExperience: v.optional(v.number()),
    calendlyUrl: v.optional(v.string()),
    ratePerChat: v.optional(v.number()),
    totalEarnings: v.number(),
    earningsThisMonth: v.number(),
    earningsLastMonth: v.number(),
    // New fields for simplified mentor system
    whyIMentor: v.optional(v.string()),
    availabilityStatus: v.optional(v.union(
      v.literal("active"),
      v.literal("limited"),
      v.literal("not_accepting")
    )),
    languages: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
    avgResponseTimeHours: v.optional(v.number()),
  }).index("by_user", ["userId"]),

  // Assessment definitions
  assessments: defineTable({
    type: v.union(
      v.literal("interests"),
      v.literal("skills"),
      v.literal("values"),
      v.literal("personality")
    ),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    duration: v.number(),
    questionCount: v.number(),
    questions: v.array(
      v.object({
        id: v.string(),
        text: v.string(),
        type: v.union(
          v.literal("multiple_choice"),
          v.literal("scale"),
          v.literal("ranking")
        ),
        options: v.optional(v.array(v.string())),
        scaleMin: v.optional(v.number()),
        scaleMax: v.optional(v.number()),
        scaleLabels: v.optional(
          v.object({
            min: v.string(),
            max: v.string(),
          })
        ),
      })
    ),
  }),

  // Assessment results
  assessmentResults: defineTable({
    assessmentId: v.id("assessments"),
    studentId: v.string(),
    answers: v.any(),
    careerMatches: v.array(
      v.object({
        careerId: v.string(),
        matchPercentage: v.number(),
        matchReasons: v.array(v.string()),
      })
    ),
    completedAt: v.number(),
    scores: v.optional(v.any()),
  })
    .index("by_student", ["studentId"])
    .index("by_assessment", ["assessmentId"])
    .index("by_completion", ["completedAt"]),

  // Saved careers (bookmarks)
  savedCareers: defineTable({
    studentId: v.string(),
    careerId: v.string(),
    savedAt: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_student", ["studentId"])
    .index("by_career", ["careerId"]),

  // Career chat sessions
  careerChats: defineTable({
    studentId: v.string(),
    professionalId: v.id("professionals"),
    careerId: v.string(),
    scheduledAt: v.number(),
    duration: v.number(),
    status: v.union(
      v.literal("scheduled"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("no_show")
    ),
    meetingUrl: v.optional(v.string()),
    rating: v.optional(v.number()),
    feedback: v.optional(v.string()),
    completedAt: v.optional(v.number()),
  })
    .index("by_student", ["studentId"])
    .index("by_professional", ["professionalId"])
    .index("by_status", ["status"]),

  // Company profiles
  companies: defineTable({
    userId: v.id("users"),
    companyName: v.string(),
    companyLogo: v.string(),
    industry: v.string(),
    website: v.optional(v.string()),
    subscriptionTier: v.union(
      v.literal("basic"),
      v.literal("premium"),
      v.literal("enterprise")
    ),
    totalViews: v.number(),
    totalBookings: v.number(),
    studentsReached: v.number(),
  }).index("by_user", ["userId"]),

  // Connection Requests (Simplified mentor connection system)
  connectionRequests: defineTable({
    studentId: v.string(),
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
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("declined")
    ),
    mentorResponse: v.optional(v.string()),
    createdAt: v.number(),
    respondedAt: v.optional(v.number()),
  })
    .index("by_student", ["studentId"])
    .index("by_mentor", ["mentorId"])
    .index("by_status", ["status"]),

  // Conversations (for in-app messaging)
  conversations: defineTable({
    studentId: v.string(),
    mentorId: v.id("professionals"),
    status: v.union(v.literal("active"), v.literal("archived")),
    lastMessageAt: v.number(),
    studentUnreadCount: v.number(),
    mentorUnreadCount: v.number(),
    createdAt: v.number(),
  })
    .index("by_student", ["studentId"])
    .index("by_mentor", ["mentorId"]),

  // Messages (in-app chat)
  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.string(),
    senderRole: v.union(v.literal("student"), v.literal("mentor")),
    messageType: v.union(
      v.literal("text"),
      v.literal("file"),
      v.literal("meeting_proposal")
    ),
    content: v.string(),
    fileUrl: v.optional(v.string()),
    meetingDetails: v.optional(
      v.object({
        time: v.string(),
        platform: v.string(),
        link: v.optional(v.string()),
      })
    ),
    readAt: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_conversation", ["conversationId"]),
});
