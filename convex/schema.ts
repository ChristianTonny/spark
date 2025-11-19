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
      v.literal("educator"),
      v.literal("company"),
      v.literal("partner"),
      v.literal("admin")
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
    careerReadinessScore: v.optional(v.number()),
    scoreHistory: v.optional(v.array(v.object({
      date: v.number(),
      score: v.number(),
      event: v.string(),
    }))),
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

    // Assessment matching metadata (RIASEC system) - Optional for backward compatibility
    interestProfile: v.optional(v.object({
      realistic: v.number(),      // 0-100 scale
      investigative: v.number(),  // 0-100 scale
      artistic: v.number(),       // 0-100 scale
      social: v.number(),         // 0-100 scale
      enterprising: v.number(),   // 0-100 scale
      conventional: v.number(),   // 0-100 scale
    })),

    valueProfile: v.optional(v.object({
      impact: v.number(),         // 0-100 scale
      income: v.number(),         // 0-100 scale
      autonomy: v.number(),       // 0-100 scale
      balance: v.number(),        // 0-100 scale
      growth: v.number(),         // 0-100 scale
      stability: v.number(),      // 0-100 scale
    })),

    // NEW: Big Five personality profile typical for this career
    personalityProfile: v.optional(v.object({
      openness: v.number(),         // 0-100 scale (typical level for successful professionals)
      conscientiousness: v.number(), // 0-100 scale
      extraversion: v.number(),      // 0-100 scale
    })),

    workEnvironment: v.optional(v.object({
      teamSize: v.string(),       // 'solo' | 'independent' | 'small' | 'large' | 'leader' | 'minimal'
      pace: v.string(),           // 'steady' | 'moderate' | 'intense' | 'flexible' | 'deadline-driven' | 'predictable'
      structure: v.optional(v.string()), // 'flexible' | 'balanced' | 'structured' (optional for backward compatibility)
    })),

    // Day in the Life - typical daily activities
    dayInLife: v.optional(v.array(v.object({
      time: v.string(),           // e.g., "9:00 AM" or "Morning"
      activity: v.string(),       // Description of what happens at this time
    }))),

    // NEW: Comprehensive career information
    realityCheck: v.optional(v.object({
      myths: v.array(v.string()),           // Common misconceptions
      realities: v.array(v.string()),       // What it's actually like
      surprises: v.array(v.string()),       // What surprised professionals
    })),

    weekInLife: v.optional(v.object({
      goodDay: v.array(v.object({ time: v.string(), activity: v.string() })),
      hardDay: v.array(v.object({ time: v.string(), activity: v.string() })),
    })),

    careerCapital: v.optional(v.object({
      transferableSkills: v.array(v.string()),
      specificSkills: v.array(v.string()),
      exitOpportunities: v.array(v.string()),
    })),

    breakingIn: v.optional(v.array(v.object({
      pathName: v.string(),
      percentage: v.number(),
      timeline: v.string(),
      cost: v.string(),
      steps: v.array(v.string()),
    }))),

    prosAndCons: v.optional(v.object({
      pros: v.array(v.string()),
      cons: v.array(v.string()),
      bestFor: v.array(v.string()),
      notFor: v.array(v.string()),
    })),

    salaryProgression: v.optional(v.array(v.object({
      level: v.string(),
      years: v.string(),
      range: v.string(),
    }))),

    skillRoadmap: v.optional(v.array(v.object({
      stage: v.string(),        // "Beginner", "Intermediate", "Advanced"
      duration: v.string(),
      skills: v.array(v.string()),
      projects: v.array(v.string()),
      resources: v.array(v.string()),
    }))),

    successStories: v.optional(v.array(v.object({
      name: v.string(),
      age: v.number(),
      previousRole: v.string(),
      switchTrigger: v.string(),
      timeline: v.string(),
      hardestPart: v.string(),
      biggestHelp: v.string(),
      currentSalary: v.string(),
      advice: v.string(),
    }))),

    warningFlags: v.optional(v.object({
      redFlags: v.array(v.string()),
      greenFlags: v.array(v.string()),
    })),

    resources: v.optional(v.array(v.object({
      name: v.string(),
      type: v.string(),          // "course", "book", "community", "tool"
      rating: v.number(),        // 1-3 stars
      description: v.string(),
      url: v.optional(v.string()),
    }))),

    remoteWork: v.optional(v.object({
      friendly: v.boolean(),
      percentage: v.number(),    // % of jobs that are remote
      notes: v.string(),
    })),

    growthPotential: v.optional(v.number()),  // 1-5 stars
    timeToEntry: v.optional(v.string()),      // "6-12 months", "2-3 years", etc.

    // Reality Quiz - Interactive career exploration
    realityQuiz: v.optional(v.object({
      title: v.string(),                      // e.g., "A Day as a Software Developer"
      description: v.string(),                // Brief intro to the quiz
      duration: v.number(),                   // Estimated minutes to complete
      questions: v.array(v.object({
        id: v.string(),                       // e.g., "q1"
        scenario: v.string(),                 // The situation/question
        options: v.array(v.object({
          text: v.string(),                   // Option text
          insight: v.string(),                // What this choice reveals
          scores: v.object({                  // How this affects readiness scoring
            technical: v.optional(v.number()),      // -10 to +10
            pressure: v.optional(v.number()),       // -10 to +10
            collaboration: v.optional(v.number()),  // -10 to +10
            creativity: v.optional(v.number()),     // -10 to +10
            independence: v.optional(v.number()),   // -10 to +10
            workLifeBalance: v.optional(v.number()),// -10 to +10
          }),
        })),
        correctAnswer: v.optional(v.number()), // Index of "best" answer (optional)
        explanation: v.string(),              // Context after answering
        realityNote: v.string(),             // "78% of developers face this monthly"
      })),
      scoringGuide: v.object({
        technical: v.object({ min: v.number(), max: v.number(), weight: v.number() }),
        pressure: v.object({ min: v.number(), max: v.number(), weight: v.number() }),
        collaboration: v.object({ min: v.number(), max: v.number(), weight: v.number() }),
        creativity: v.object({ min: v.number(), max: v.number(), weight: v.number() }),
        independence: v.object({ min: v.number(), max: v.number(), weight: v.number() }),
        workLifeBalance: v.object({ min: v.number(), max: v.number(), weight: v.number() }),
      }),
      results: v.object({
        high: v.object({ min: v.number(), title: v.string(), message: v.string() }),      // 80-100%
        medium: v.object({ min: v.number(), title: v.string(), message: v.string() }),    // 50-79%
        low: v.object({ min: v.number(), title: v.string(), message: v.string() }),       // 0-49%
      }),
    })),
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

    // Approval system
    isApproved: v.optional(v.boolean()),          // Admin approval status (default: false)
    approvedAt: v.optional(v.number()),           // When approved
    approvedBy: v.optional(v.id("users")),        // Which admin approved
    applicationId: v.optional(v.id("mentorApplications")), // Link to application
  })
    .index("by_user", ["userId"])
    .index("by_approved", ["isApproved"]),

  // Mentor applications (before they become professionals)
  mentorApplications: defineTable({
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    linkedin: v.optional(v.string()),
    currentRole: v.string(),
    company: v.string(),
    yearsExperience: v.string(),
    industry: v.string(),
    careerField: v.string(),
    availability: v.string(),
    motivation: v.string(),
    sessionsPerMonth: v.string(),
    focusAreas: v.array(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    submittedAt: v.number(),
    reviewedAt: v.optional(v.number()),
    reviewNotes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

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
        interestScore: v.optional(v.number()),
        valueScore: v.optional(v.number()),
        environmentScore: v.optional(v.number()),
        personalityScore: v.optional(v.number()), // NEW: Big Five personality fit
      })
    ),
    completedAt: v.number(),

    // RIASEC scores
    scores: v.optional(
      v.object({
        riasec: v.object({
          realistic: v.number(),
          investigative: v.number(),
          artistic: v.number(),
          social: v.number(),
          enterprising: v.number(),
          conventional: v.number(),
        }),
        values: v.object({
          impact: v.number(),
          income: v.number(),
          autonomy: v.number(),
          balance: v.number(),
          growth: v.number(),
          stability: v.number(),
        }),
        // NEW: Big Five personality traits (focus on top 3)
        bigFive: v.optional(v.object({
          openness: v.number(),         // 0-100 scale
          conscientiousness: v.number(), // 0-100 scale
          extraversion: v.number(),      // 0-100 scale
        })),
        // NEW: Work style preferences
        workStyle: v.optional(v.object({
          leadership: v.number(),      // 0-100 scale
          collaboration: v.number(),   // 0-100 scale
          independence: v.number(),    // 0-100 scale
        })),
        environment: v.object({
          teamSize: v.string(),
          pace: v.string(),
        }),
        topRIASEC: v.array(v.string()), // Top 3 RIASEC codes
      })
    ),
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

  // Career chat sessions (with booking workflow)
  careerChats: defineTable({
    studentId: v.string(),
    professionalId: v.id("professionals"),
    careerId: v.optional(v.string()), // Optional - can chat without specific career focus
    scheduledAt: v.optional(v.number()), // Optional until booking is confirmed
    duration: v.number(),
    status: v.union(
      v.literal("pending"),      // Student requested, waiting for mentor approval
      v.literal("confirmed"),    // Mentor approved
      v.literal("scheduled"),    // Time has been set (backward compatibility)
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("rejected"),     // Mentor declined
      v.literal("no_show")
    ),
    meetingUrl: v.optional(v.string()),
    rating: v.optional(v.number()),
    feedback: v.optional(v.string()),

    // Booking workflow fields
    requestedAt: v.number(),     // When student requested
    confirmedAt: v.optional(v.number()), // When mentor approved
    cancellationReason: v.optional(v.string()),
    studentMessage: v.optional(v.string()), // Optional message from student during booking

    completedAt: v.optional(v.number()),
  })
    .index("by_student", ["studentId"])
    .index("by_professional", ["professionalId"])
    .index("by_status", ["status"])
    .index("by_student_and_status", ["studentId", "status"])
    .index("by_professional_and_status", ["professionalId", "status"]),

  // Availability slots for mentors
  availabilitySlots: defineTable({
    professionalId: v.id("users"),

    // Slot details
    dayOfWeek: v.number(), // 0-6 (Sunday-Saturday)
    startTime: v.string(), // "09:00" format
    endTime: v.string(),   // "17:00" format

    // Capacity (how many students can book this slot)
    maxBookings: v.number(), // Default 1, can be increased for group sessions

    // Status
    isActive: v.boolean(), // Mentor can temporarily disable slots

    // Recurrence
    effectiveFrom: v.number(), // Unix timestamp
    effectiveUntil: v.optional(v.number()), // Optional end date
  })
    .index("by_professional", ["professionalId"])
    .index("by_professional_and_day", ["professionalId", "dayOfWeek"])
    .index("by_professional_and_active", ["professionalId", "isActive"]),

  // Chat messages for mentor-student conversations
  messages: defineTable({
    chatId: v.id("careerChats"), // Link to booking
    senderId: v.string(), // User ID of sender

    // Message content
    content: v.string(),
    type: v.union(
      v.literal("text"),
      v.literal("system") // System notifications like "Booking confirmed"
    ),

    // Read status
    readBy: v.array(v.string()), // Array of user IDs who read this message

    // Timestamps
    sentAt: v.number(),
  })
    .index("by_chat", ["chatId"])
    .index("by_chat_and_time", ["chatId", "sentAt"]),

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

  // Notifications
  notifications: defineTable({
    userId: v.id("users"), // Recipient of notification
    type: v.union(
      v.literal("booking"),
      v.literal("message"),
      v.literal("review"),
      v.literal("system"),
      v.literal("mentor_application")
    ),
    title: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),

    // Optional links to related entities
    relatedChatId: v.optional(v.id("careerChats")),
    relatedUserId: v.optional(v.id("users")), // e.g., who sent the message

    // Optional metadata for additional context
    metadata: v.optional(v.any()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_read", ["userId", "read"])
    .index("by_user_and_created", ["userId", "createdAt"]),

  // User Settings
  userSettings: defineTable({
    userId: v.id("users"),

    // Notification preferences
    emailNotifications: v.boolean(),
    pushNotifications: v.boolean(),
    marketingEmails: v.boolean(),
    bookingReminders: v.boolean(),
    messageNotifications: v.boolean(),

    // Privacy settings
    profileVisibility: v.union(
      v.literal("public"),
      v.literal("private")
    ),
    showOnlineStatus: v.boolean(),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // Articles/Blog posts by mentors
  articles: defineTable({
    // Author info
    authorId: v.id("users"), // Mentor who wrote it
    authorName: v.string(), // Cached for performance
    authorImage: v.optional(v.string()),
    authorTitle: v.optional(v.string()), // e.g., "Senior Software Engineer at Google"

    // Content
    title: v.string(),
    slug: v.string(), // URL-friendly version (auto-generated)
    coverImage: v.optional(v.string()), // Hero/thumbnail image
    excerpt: v.string(), // Short summary (150-200 chars)
    content: v.string(), // Full article content (rich text/HTML)

    // Organization
    category: v.string(), // "Career Advice", "Tech", "Interview Tips", etc.
    tags: v.array(v.string()), // ["resume", "interview", "internship"]

    // Publishing
    status: v.union(
      v.literal("draft"),
      v.literal("published")
    ),
    publishedAt: v.optional(v.number()), // When it went live

    // Engagement metrics
    viewCount: v.number(), // Page views
    readTime: v.number(), // Estimated read time in minutes

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_published_date", ["publishedAt"])
    .index("by_slug", ["slug"])
    .searchIndex("search_title", {
      searchField: "title",
    }),

  // Article bookmarks (students saving articles for later)
  articleBookmarks: defineTable({
    userId: v.id("users"),
    articleId: v.id("articles"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_article", ["articleId"])
    .index("by_user_and_article", ["userId", "articleId"]),

  // Reality Quiz Results - Student quiz attempts
  quizResults: defineTable({
    userId: v.id("users"),
    careerId: v.id("careers"),
    answers: v.any(),                       // { [questionId]: optionIndex }
    scores: v.object({                      // Calculated scores
      technical: v.number(),
      pressure: v.number(),
      collaboration: v.number(),
      creativity: v.number(),
      independence: v.number(),
      workLifeBalance: v.number(),
    }),
    readinessPercentage: v.number(),        // Overall 0-100 score
    resultTier: v.string(),                 // "high" | "medium" | "low"
    completedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_career", ["careerId"])
    .index("by_user_and_career", ["userId", "careerId"]),
});
