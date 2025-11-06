# OpportunityMap: Comprehensive Improvement Plan
## Steve Jobs-Level Product Strategy

**Date:** November 6, 2025
**Mission:** Transform OpportunityMap from a beautiful UI demo into an insanely great product that actually changes lives for Rwandan students.

---

## THE BRUTAL TRUTH

**What We Have:** A beautiful interface with broken core functionality
**What We Need:** A product that works perfectly for its core promise
**The Gap:** Critical systems are incomplete, fake, or disconnected

**Steve Jobs Quote to Remember:**
> "You've got to start with the customer experience and work back toward the technology – not the other way around."

Right now, we built beautiful technology but the student experience is broken.

---

## PART 1: CRITICAL FIXES (Week 1-4)
### These block production. Nothing else matters until these work.

### 1. REBUILD THE ASSESSMENT SYSTEM 🎯
**Current State:** Completely fake. Returns hardcoded scores regardless of answers.
**Impact:** Students get zero value from the platform's core feature.
**Jobs Would Say:** "This is embarrassing. We're lying to students about their future."

**Required Changes:**

#### 1.1 Research-Backed Assessment Design
- **Study proven methodologies:**
  - 80,000 Hours career framework
  - Holland Code (RIASEC) model
  - CliftonStrengths approach
  - O*NET Interest Profiler

- **Design 20-30 thoughtful questions across 4 dimensions:**
  1. **Interests** (10 questions) - What activities energize you?
  2. **Skills** (5 questions) - What are you naturally good at?
  3. **Values** (5 questions) - What matters most in your career?
  4. **Work Environment** (5-10 questions) - Where do you thrive?

- **Question quality standards:**
  - Specific, not generic ("Do you enjoy analyzing data patterns?" vs "Do you like thinking?")
  - Observable behaviors, not aspirations
  - Forced choices when possible
  - Validated against career outcomes

#### 1.2 Real Matching Algorithm
```typescript
// New file: /lib/assessment-algorithm.ts

export interface AssessmentProfile {
  interests: {
    investigative: number;  // 0-100 scale
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
    realistic: number;
  };
  skills: {
    analytical: number;
    creative: number;
    interpersonal: number;
    technical: number;
    leadership: number;
  };
  values: {
    impact: number;
    autonomy: number;
    stability: number;
    variety: number;
    income: number;
  };
  environment: {
    teamSize: 'solo' | 'small' | 'large';
    pace: 'relaxed' | 'moderate' | 'intense';
    structure: 'flexible' | 'balanced' | 'structured';
  };
}

export function calculateCareerMatch(
  studentProfile: AssessmentProfile,
  career: Career
): MatchResult {
  // 1. Score interest alignment (40% weight)
  const interestScore = cosineSimilarity(
    studentProfile.interests,
    career.interestProfile
  );

  // 2. Score skill match (30% weight)
  const skillScore = calculateSkillOverlap(
    studentProfile.skills,
    career.requiredSkills
  );

  // 3. Score value alignment (20% weight)
  const valueScore = dotProduct(
    studentProfile.values,
    career.valueProfile
  );

  // 4. Score environment fit (10% weight)
  const environmentScore = matchEnvironment(
    studentProfile.environment,
    career.workEnvironment
  );

  // Weighted average
  const totalScore =
    (interestScore * 0.4) +
    (skillScore * 0.3) +
    (valueScore * 0.2) +
    (environmentScore * 0.1);

  return {
    careerId: career._id,
    matchPercentage: Math.round(totalScore),
    matchReasons: generateMatchReasons(
      studentProfile,
      career,
      interestScore,
      skillScore,
      valueScore
    ),
    confidenceLevel: calculateConfidence(studentProfile),
  };
}
```

#### 1.3 Career Profiles Need Metadata
**Add to careers schema:**
```typescript
// convex/schema.ts
careers: defineTable({
  // ... existing fields ...

  // NEW: Assessment matching metadata
  interestProfile: v.object({
    investigative: v.number(),
    artistic: v.number(),
    social: v.number(),
    enterprising: v.number(),
    conventional: v.number(),
    realistic: v.number(),
  }),

  skillRequirements: v.object({
    analytical: v.number(),
    creative: v.number(),
    interpersonal: v.number(),
    technical: v.number(),
    leadership: v.number(),
  }),

  valueProfile: v.object({
    impact: v.number(),
    autonomy: v.number(),
    stability: v.number(),
    variety: v.number(),
    income: v.number(),
  }),

  workEnvironment: v.object({
    teamSize: v.string(),
    pace: v.string(),
    structure: v.string(),
  }),
}),
```

**Effort:** 2-3 weeks (research 1 week, implementation 1-2 weeks)

---

### 2. COMPLETE MENTOR SYSTEM 🎓
**Current State:** Mock data, no signup, no dashboard integration, no earnings tracking.
**Impact:** Mentors can't use the platform. Students can't book real sessions.
**Jobs Would Say:** "We built a theater set. Where's the actual product?"

**Required Changes:**

#### 2.1 Mentor Onboarding Flow
**New pages needed:**
- `/signup/mentor` - Mentor-specific signup with:
  - Company/organization
  - Job title
  - Years of experience
  - Career categories they can advise on
  - Bio (250 chars)
  - Calendly URL
  - Rate per session (optional for monetization)

#### 2.2 Mentor Profile Management
**New page:** `/dashboard/mentor/profile/edit`
- Edit bio, availability, rate
- Upload professional photo
- Link Calendly account
- Set career categories
- Toggle "accepting bookings"

#### 2.3 Real Mentor Dashboard
**Fix:** `/dashboard/mentor/page.tsx` (currently 100% mock data)

**Replace mock data with real queries:**
```typescript
// Query real upcoming sessions
const upcomingSessions = useQuery(api.careerChats.getUpcoming, {
  professionalId: user?._id
});

// Query completed sessions
const completedSessions = useQuery(api.careerChats.getCompleted, {
  professionalId: user?._id
});

// Query earnings
const earnings = useQuery(api.professionals.getEarnings, {
  userId: user?._id
});

// Query student questions/feedback
const recentFeedback = useQuery(api.careerChats.getRecentFeedback, {
  professionalId: user?._id
});
```

**Dashboard should show:**
- Next 5 upcoming sessions (time, student name, topic)
- Session stats (total completed, avg rating, response time)
- Earnings (this month, all time, available for withdrawal)
- Recent student feedback
- Quick actions (update availability, view profile, earnings history)

#### 2.4 Calendly → Convex Webhook Integration
**Critical missing piece:** Bookings happen in Calendly but don't sync to database.

**Implementation:**
1. **Create Convex HTTP action:**
```typescript
// convex/http.ts
import { httpAction } from "./_generated/server";

export const calendlyWebhook = httpAction(async (ctx, request) => {
  const payload = await request.json();

  if (payload.event === "invitee.created") {
    // New booking created
    const { event, invitee } = payload;

    await ctx.runMutation(api.careerChats.createSession, {
      studentEmail: invitee.email,
      professionalCalendlyUrl: event.location,
      scheduledAt: event.start_time,
      duration: 15,
      meetingUrl: event.join_url,
    });
  }

  if (payload.event === "invitee.canceled") {
    // Booking canceled
    await ctx.runMutation(api.careerChats.cancelSession, {
      calendlyEventId: payload.event.uri,
    });
  }

  return new Response("OK", { status: 200 });
});
```

2. **Configure Calendly webhook:**
   - Go to Calendly → Integrations → Webhooks
   - Add URL: `https://your-app.convex.cloud/calendlyWebhook`
   - Subscribe to: `invitee.created`, `invitee.canceled`

3. **Create careerChats mutations:**
```typescript
// convex/careerChats.ts
export const createSession = mutation({
  args: {
    studentEmail: v.string(),
    professionalCalendlyUrl: v.string(),
    scheduledAt: v.string(),
    duration: v.number(),
    meetingUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Find student by email
    const student = await ctx.db
      .query("users")
      .withIndex("by_email", q => q.eq("email", args.studentEmail))
      .unique();

    // Find professional by Calendly URL
    const professional = await ctx.db
      .query("professionals")
      .filter(q => q.eq(q.field("calendlyUrl"), args.professionalCalendlyUrl))
      .unique();

    if (!student || !professional) {
      throw new Error("Student or professional not found");
    }

    // Create session record
    const sessionId = await ctx.db.insert("careerChats", {
      studentId: student._id,
      professionalId: professional._id,
      scheduledAt: new Date(args.scheduledAt).getTime(),
      duration: args.duration,
      status: "scheduled",
      meetingUrl: args.meetingUrl,
    });

    // Update professional stats
    await ctx.db.patch(professional._id, {
      chatsUpcoming: (professional.chatsUpcoming || 0) + 1,
    });

    return sessionId;
  },
});
```

#### 2.5 Post-Session Feedback System
**New feature:** After a session ends, prompt student for feedback.

**Implementation:**
- Cron job checks for sessions where `scheduledAt + duration < now` and `status === "scheduled"`
- Update status to "awaiting_feedback"
- Send email/notification to student with feedback link
- Student submits rating (1-5 stars) + optional text feedback
- Update mentor's rating (rolling average)
- Update status to "completed"

**Effort:** 3-4 weeks

---

### 3. FIX STUDENT DATA & PROFILES 📊
**Current State:** Dashboard shows hardcoded "Lycée de Kigali" and "Senior 5" for all students.
**Impact:** Students don't see their own data. Can't personalize experience.
**Jobs Would Say:** "Every student is not the same. Why are we treating them that way?"

**Required Changes:**

#### 3.1 Query Real Student Data
**Fix:** `/app/dashboard/student/page.tsx`

Replace hardcoded data:
```typescript
// BEFORE (lines 29-32)
const studentData = {
  gradeLevel: "Senior 5",
  school: "Lycée de Kigali",
};

// AFTER
const studentProfile = useQuery(
  api.studentProfiles.getByUserId,
  user ? { userId: user._id } : "skip"
);

const studentData = {
  gradeLevel: studentProfile?.gradeLevel || "Not set",
  school: studentProfile?.school || "Not set",
  district: studentProfile?.district,
  interests: studentProfile?.interests || [],
};
```

#### 3.2 Create Student Profile Editor
**New page:** `/app/dashboard/student/profile/page.tsx`

**Form fields:**
- Full name (from Clerk, read-only)
- Email (from Clerk, read-only)
- Phone number (editable)
- School (dropdown of Rwandan schools)
- District (dropdown of 30 districts)
- Grade level (S1-S6 + post-secondary)
- Interests (multi-select: Science, Arts, Business, etc.)
- Career goals (optional text)
- Profile photo (upload to Clerk)

**Save to both:**
- Clerk user metadata (name, phone, avatar)
- Convex studentProfiles table (school, district, grade, interests)

#### 3.3 Real Statistics
**Fix dashboard stats to use actual data:**
```typescript
const stats = {
  savedCareers: bookmarkedCareers?.length || 0,  // ✅ Already working
  assessmentsTaken: assessmentResults?.length || 0,  // ✅ Already working

  // NEW: Calculate from assessment results
  topMatch: assessmentResults?.[0]?.careerMatches[0]?.matchPercentage || 0,

  // NEW: Query from studentProfile
  careersExplored: studentProfile?.careersExplored || 0,
  chatsCompleted: studentProfile?.chatsCompleted || 0,
  chatsUpcoming: studentProfile?.chatsUpcoming || 0,
};
```

**Update counters when actions happen:**
- Increment `careersExplored` when student views career detail
- Increment `chatsCompleted` when session ends
- Increment `chatsUpcoming` when booking confirmed

**Effort:** 1 week

---

### 4. DELETE LEGACY CODE 🗑️
**Current State:** 500+ lines of unused mock data, old Spark platform pages, duplicate auth routes.
**Impact:** Confuses developers, slows onboarding, adds complexity.
**Jobs Would Say:** "Simplify, simplify, simplify."

**Files to DELETE:**
```bash
# Old Spark Learning Platform (replaced by OpportunityMap)
/app/content/
/app/practice/
/app/questions/ask/

# Legacy auth routes (replaced by /sign-in and /sign-up)
/app/login/
/app/signup/

# Unused mock data
/lib/data.ts  (500+ lines of hardcoded careers, questions, etc.)

# Unused utilities
/lib/assessment-storage.ts  (localStorage helpers, replaced by Convex)
```

**Files to CLEAN:**
```typescript
// Remove unused imports across all files
// Remove commented-out code
// Remove console.log statements
// Remove unused TypeScript interfaces
```

**Consolidate auth:**
- Keep only `/sign-in` and `/sign-up` (Clerk managed)
- Delete `/login` and `/signup` pages
- Update all links to use new paths

**Effort:** 2 days

---

## PART 2: HIGH-PRIORITY UX IMPROVEMENTS (Week 5-8)
### These significantly improve user experience.

### 5. OPTIMIZE LANDING PAGE PERFORMANCE ⚡
**Current Issue:** Makes 3 sequential queries, shows loading spinner for 500ms.
**Impact:** Bad first impression, feels slow.

**Solution 1: Batch Queries**
```typescript
// NEW: convex/landing.ts
export const getLandingData = query({
  handler: async (ctx) => {
    const [featuredCareers, careerCount] = await Promise.all([
      ctx.db.query("careers").take(6),
      ctx.db.query("careers").count(),
    ]);

    return {
      featuredCareers,
      careerCount,
      // Pre-compute categories server-side
      categories: Array.from(
        new Set(
          await ctx.db
            .query("careers")
            .collect()
            .then(careers => careers.map(c => c.category))
        )
      ),
    };
  },
});
```

**Solution 2: Skeleton Loaders**
Replace full-page spinner with skeleton loaders for each section.

**Solution 3: Lazy Load Sections**
Load hero immediately, defer categories/testimonials.

**Effort:** 1 week

---

### 6. ADD CAREER COMPARISON TOOL 🆚
**Current Gap:** Students can't compare two careers side-by-side.
**User Story:** "I'm interested in Software Engineer vs Data Scientist. What's the difference?"

**Implementation:**
**New page:** `/careers/compare?ids=career1,career2`

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Software Engineer    vs    Data Scientist  │
├─────────────────────────────────────────────┤
│  Description         │  Description          │
│  [Engineer desc]     │  [Scientist desc]     │
├─────────────────────────────────────────────┤
│  Salary              │  Salary               │
│  500k-2M RWF        │  800k-3M RWF          │
├─────────────────────────────────────────────┤
│  Education           │  Education            │
│  Bachelor in CS      │  Bachelor in Math     │
├─────────────────────────────────────────────┤
│  Skills              │  Skills               │
│  - Programming       │  - Statistics         │
│  - Algorithms        │  - Machine Learning   │
├─────────────────────────────────────────────┤
│  Career Path         │  Career Path          │
│  [Pathway timeline]  │  [Pathway timeline]   │
└─────────────────────────────────────────────┘
```

**Add "Compare" button to career cards:**
- Click "Compare" → Career added to comparison list (max 2)
- Toast shows "Added to comparison (1/2)"
- When 2 selected, show "Compare Now" floating button
- Click → Redirect to `/careers/compare?ids=...`

**Effort:** 1 week

---

### 7. IMPLEMENT CHAT/MESSAGING SYSTEM 💬
**Current Gap:** Students book mentors but can't follow up after session.
**User Story:** "I had a great session with Jean. I want to ask a follow-up question."

**Implementation Options:**

**Option A: In-House (Preferred for AI integration later)**
- Build simple chat using Convex
- One-to-one conversations
- Real-time updates
- File/image sharing
- Notification system

**Schema:**
```typescript
conversations: defineTable({
  studentId: v.id("users"),
  professionalId: v.id("users"),
  lastMessageAt: v.number(),
  unreadCount: v.object({
    student: v.number(),
    professional: v.number(),
  }),
}).index("by_student", ["studentId"])
  .index("by_professional", ["professionalId"]),

messages: defineTable({
  conversationId: v.id("conversations"),
  senderId: v.id("users"),
  content: v.string(),
  sentAt: v.number(),
  readAt: v.optional(v.number()),
  type: v.union(v.literal("text"), v.literal("image"), v.literal("file")),
}).index("by_conversation", ["conversationId"]),
```

**UI:**
- `/dashboard/messages` - List of conversations
- `/dashboard/messages/[conversationId]` - Chat interface
- Real-time updates using Convex subscriptions
- Desktop notifications for new messages

**Option B: Third-Party (Faster but less control)**
- SendBird or Stream Chat
- Costs money
- Harder to integrate AI later

**Recommendation:** Option A (in-house)
**Effort:** 2-3 weeks

---

### 8. IMPROVE SEARCH & FILTERING 🔍
**Current Issues:**
- No pagination (loads all 100+ careers into memory)
- No fuzzy matching
- No filters for salary, education level, skills
- No sorting options

**Solution:**

#### 8.1 Server-Side Search
```typescript
// convex/careers.ts
export const advancedSearch = query({
  args: {
    query: v.optional(v.string()),
    categories: v.optional(v.array(v.string())),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    educationLevel: v.optional(v.string()),
    sortBy: v.optional(v.union(
      v.literal("relevance"),
      v.literal("salary"),
      v.literal("popularity")
    )),
    cursor: v.optional(v.string()),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("careers");

    // Filter by categories
    if (args.categories?.length) {
      query = query.filter(q =>
        q.or(
          ...args.categories!.map(cat =>
            q.eq(q.field("category"), cat)
          )
        )
      );
    }

    // Filter by salary range
    if (args.salaryMin || args.salaryMax) {
      query = query.filter(q =>
        q.and(
          args.salaryMin ? q.gte(q.field("salaryMax"), args.salaryMin) : true,
          args.salaryMax ? q.lte(q.field("salaryMin"), args.salaryMax) : true
        )
      );
    }

    // Pagination
    if (args.cursor) {
      query = query.paginate({ cursor: args.cursor, numItems: args.limit });
    } else {
      query = query.paginate({ numItems: args.limit });
    }

    const result = await query;

    // Full-text search on title/description (client-side for now)
    let careers = result.page;
    if (args.query) {
      const searchLower = args.query.toLowerCase();
      careers = careers.filter(c =>
        c.title.toLowerCase().includes(searchLower) ||
        c.shortDescription.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    if (args.sortBy === "salary") {
      careers.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (args.sortBy === "popularity") {
      careers.sort((a, b) => b.views - a.views);
    }

    return {
      careers,
      nextCursor: result.continueCursor,
      hasMore: result.isDone === false,
    };
  },
});
```

#### 8.2 Advanced Filters UI
**Add to careers page:**
```tsx
<div className="flex gap-4 flex-wrap">
  {/* Search */}
  <Input
    placeholder="Search careers..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  {/* Category Multi-Select */}
  <MultiSelect
    options={categories}
    value={selectedCategories}
    onChange={setSelectedCategories}
    placeholder="Categories"
  />

  {/* Salary Range */}
  <div>
    <label>Min Salary</label>
    <Input type="number" value={salaryMin} onChange={...} />
  </div>
  <div>
    <label>Max Salary</label>
    <Input type="number" value={salaryMax} onChange={...} />
  </div>

  {/* Education Level */}
  <Select value={educationLevel} onChange={setEducationLevel}>
    <option>Any</option>
    <option>High School</option>
    <option>Bachelor's</option>
    <option>Master's</option>
    <option>PhD</option>
  </Select>

  {/* Sort */}
  <Select value={sortBy} onChange={setSortBy}>
    <option value="relevance">Most Relevant</option>
    <option value="salary">Highest Salary</option>
    <option value="popularity">Most Popular</option>
  </Select>
</div>
```

#### 8.3 Infinite Scroll
```tsx
const { careers, hasMore, loadMore, isLoading } = useInfiniteQuery(
  api.careers.advancedSearch,
  {
    query: searchQuery,
    categories: selectedCategories,
    salaryMin,
    salaryMax,
    sortBy,
    limit: 20,
  }
);

// Intersection Observer for infinite scroll
const observerRef = useRef();
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore && !isLoading) {
      loadMore();
    }
  });
  if (observerRef.current) observer.observe(observerRef.current);
  return () => observer.disconnect();
}, [hasMore, isLoading]);
```

**Effort:** 1-2 weeks

---

## PART 3: MEDIUM-PRIORITY FEATURES (Week 9-12)
### These are important but not blockers.

### 9. ADD ADMIN DASHBOARD 👨‍💼
**Purpose:** Platform management, moderation, analytics.

**New role:** `admin` in user roles.

**Pages needed:**
- `/dashboard/admin` - Overview with key metrics
- `/dashboard/admin/careers` - Approve/edit/delete careers
- `/dashboard/admin/mentors` - Approve/suspend mentors
- `/dashboard/admin/users` - View/manage users
- `/dashboard/admin/sessions` - Monitor bookings
- `/dashboard/admin/analytics` - Usage stats, charts

**Key features:**
- Approve new mentor applications
- Flag inappropriate content
- View platform-wide analytics (signups, bookings, assessments taken)
- Export data (CSV reports)
- Send announcements/notifications

**Effort:** 2-3 weeks

---

### 10. IMPLEMENT PAYMENT SYSTEM 💰
**Current Gap:** Mentors have `ratePerChat` and `totalEarnings` but no payment flow.

**Decision needed:** How should payments work?

**Option A: Free Platform (Donation Model)**
- All sessions free for students
- Mentors volunteer time
- Platform funded by grants/donations
- Rwanda-friendly (removes financial barrier)

**Option B: Pay-Per-Session**
- Students pay per booking
- Use mobile money (MTN Mobile Money, Airtel Money)
- Integrate with Flutterwave or Paystack
- Mentors earn per session
- Platform takes small commission

**Option C: Subscription Model**
- Students pay monthly/yearly subscription
- Unlimited sessions
- More predictable revenue

**Recommendation:** Start with Option A (free), add Option C later for sustainability.

If implementing payments later:

**Integration: Flutterwave (Rwanda-friendly)**
```typescript
// convex/payments.ts
export const initiatePayment = mutation({
  args: {
    sessionId: v.id("careerChats"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    const student = await ctx.db.get(session.studentId);

    // Call Flutterwave API
    const payment = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: args.amount,
        currency: "RWF",
        customer: {
          email: student.email,
          name: `${student.firstName} ${student.lastName}`,
        },
        redirect_url: `${process.env.APP_URL}/dashboard/student?payment=success`,
        tx_ref: args.sessionId,
      }),
    });

    const data = await payment.json();
    return data.data.link;  // Payment URL
  },
});

export const verifyPayment = mutation({
  args: { sessionId: v.id("careerChats") },
  handler: async (ctx, args) => {
    // Verify payment with Flutterwave
    // Update session status to "paid"
    // Update mentor earnings
  },
});
```

**Effort (if implemented):** 2 weeks

---

### 11. IMPROVE ASSESSMENT RESULTS PAGE 📈
**Current:** Shows top 5 matches with percentages and generic reasons.

**Enhancements:**

#### 11.1 Career Profile Visualization
Show student's profile as a radar chart:
```
      Investigative
            /\
           /  \
    Artistic  Social
         \    /
          \  /
       Conventional
            |
        Realistic
```

#### 11.2 Match Explanation
For each recommended career, show:
- **Why it's a match:** Specific reasons based on answers
  - "You scored high on analytical thinking (Q3, Q7, Q12)"
  - "You prefer independent work, which aligns with this role"
  - "Your interest in problem-solving is core to this career"

- **Potential concerns:** Honest about mismatches
  - "This career requires frequent public speaking, which you rated low"
  - "The salary range may be lower than your expectations"

#### 11.3 Next Steps
For each career, provide actionable next steps:
- "Read 3 profiles of professionals in this field"
- "Watch career overview video"
- "Book a chat with a mentor"
- "Explore required education pathway"

#### 11.4 Comparison View
"Compare your top 3 matches" button.

**Effort:** 1 week

---

### 12. ADD MOBILE APP (PWA FIRST) 📱
**Current:** Web-only, but target audience is mobile-first (Rwanda has high mobile penetration).

**Phase 1: Progressive Web App (PWA)**
- Add service worker for offline support
- Add "Add to Home Screen" prompt
- Cache career library for offline browsing
- Improve mobile touch interactions
- Optimize for slow connections (3G)

**Phase 2: Native App (Future)**
- React Native app for iOS/Android
- Native notifications
- Offline-first architecture
- App store distribution

**Effort:** PWA = 1 week, Native = 6-8 weeks

---

## PART 4: POLISH & SCALE (Week 13-16)
### These make the product excellent.

### 13. INTERNATIONALIZATION (i18n) 🌍
**Target Languages:**
- English (current)
- Kinyarwanda (critical for rural students)
- French (secondary)

**Implementation:**
- Use `next-i18next` or `next-intl`
- Extract all UI strings into translation files
- Allow users to switch language in settings
- Translate career descriptions (big undertaking)

**Effort:** 3-4 weeks

---

### 14. ANALYTICS & INSIGHTS 📊
**Track user behavior to improve product:**
- Which careers are most viewed?
- Where do students drop off in assessments?
- How many students book mentors after viewing careers?
- What's the average time to first booking?

**Tools:**
- Posthog or Mixpanel for product analytics
- Convex analytics tables for custom metrics

**Key metrics to track:**
```typescript
events: defineTable({
  userId: v.id("users"),
  eventType: v.union(
    v.literal("career_viewed"),
    v.literal("assessment_started"),
    v.literal("assessment_completed"),
    v.literal("career_bookmarked"),
    v.literal("mentor_booking_initiated"),
    v.literal("mentor_booking_completed"),
    v.literal("chat_sent"),
  ),
  metadata: v.any(),
  timestamp: v.number(),
}).index("by_user", ["userId"])
  .index("by_event", ["eventType"]),
```

**Effort:** 1-2 weeks

---

### 15. PERFORMANCE OPTIMIZATIONS ⚡

#### 15.1 Fix N+1 Queries
**Current issue:** Dashboard fetches bookmarked careers one by one.

**Solution:** Batch fetch
```typescript
export const listWithCareers = query({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const bookmarks = await ctx.db
      .query("savedCareers")
      .withIndex("by_student", q => q.eq("studentId", user._id))
      .collect();

    // Batch fetch careers
    const careerIds = bookmarks.map(b => b.careerId);
    const careers = await Promise.all(
      careerIds.map(id => ctx.db.get(id))
    );

    return bookmarks.map((bookmark, i) => ({
      ...bookmark,
      career: careers[i],
    }));
  },
});
```

#### 15.2 Image Optimization
- Use Next.js `<Image>` component everywhere
- Lazy load images below the fold
- Use WebP format
- Add blur placeholders

#### 15.3 Code Splitting
- Dynamic imports for large components
- Split assessment questions into separate chunks
- Lazy load dashboard components

#### 15.4 Caching Strategy
- Cache categories query (changes rarely)
- Cache career list with short TTL
- Use Convex's automatic query caching

**Effort:** 1 week

---

### 16. ACCESSIBILITY (a11y) ♿
**Make the platform usable for students with disabilities:**
- Screen reader support
- Keyboard navigation
- ARIA labels on all interactive elements
- High contrast mode
- Font size controls
- Focus indicators

**Tests:**
- Run Lighthouse accessibility audit
- Test with screen readers (NVDA, JAWS)
- Keyboard-only navigation
- Color contrast checks

**Effort:** 1 week

---

## PART 5: BUSINESS MODEL & GROWTH
### How does this become sustainable?

### Revenue Streams (Future)
1. **School Subscriptions** - Schools pay for bulk student access
2. **Mentor Earnings Split** - Platform takes 10-20% commission on paid sessions
3. **Company Sponsorships** - Companies sponsor careers to recruit talent
4. **Premium Features** - Advanced assessments, career coaching, resume reviews
5. **Government Grants** - Rwanda education ministry funding
6. **International Aid** - USAID, World Bank, NGO partnerships

### Key Partnerships
- **Rwanda Education Board** - Official endorsement
- **Universities** - Pathway partnerships
- **Companies** - Mentor recruitment, career sponsorship
- **NGOs** - Funding, student outreach

### Growth Strategy
**Phase 1: Pilot (100 students)**
- Launch in 1-2 pilot schools
- Collect feedback, iterate quickly
- Validate assessment quality
- Build case studies

**Phase 2: City Launch (1,000 students)**
- Expand to all Kigali schools
- Recruit 20+ mentors
- Measure engagement, bookings
- Secure initial funding

**Phase 3: National Rollout (10,000+ students)**
- Partner with Rwanda Education Board
- Recruit mentors in all districts
- Translate to Kinyarwanda
- Mobile app launch

**Phase 4: Regional Expansion**
- Kenya, Uganda, Tanzania
- Same rural student problem
- Localize careers and pathways

---

## IMPLEMENTATION TIMELINE

### Sprint 1-2 (Week 1-2): Assessment Overhaul
- Research assessment methodologies
- Design 20-30 questions
- Implement real matching algorithm
- Add career metadata
- Test with 10 students

### Sprint 3-4 (Week 3-4): Mentor System Completion
- Mentor signup flow
- Profile management
- Real dashboard with Convex data
- Calendly webhook integration
- Post-session feedback

### Sprint 5 (Week 5): Data & Cleanup
- Fix student profile queries
- Build profile editor
- Delete legacy code
- Real statistics

### Sprint 6 (Week 6): Performance & UX
- Landing page optimization
- Skeleton loaders everywhere
- Fix N+1 queries
- Career comparison tool

### Sprint 7-8 (Week 7-8): Chat & Search
- In-house messaging system
- Advanced search with filters
- Pagination/infinite scroll
- Mobile optimizations

### Sprint 9-10 (Week 9-10): Admin & Analytics
- Admin dashboard
- User management
- Platform analytics
- Content moderation

### Sprint 11-12 (Week 11-12): Polish
- Assessment results improvements
- PWA implementation
- Accessibility audit
- Performance optimizations

### Sprint 13-16 (Week 13-16): Scale Prep
- i18n (Kinyarwanda)
- Payment system (if needed)
- Load testing
- Documentation for schools

---

## SUCCESS METRICS

### Product Metrics
- **Engagement:** 70%+ of students complete assessment
- **Activation:** 40%+ bookmark at least 1 career
- **Retention:** 50%+ return within 1 week
- **Conversion:** 20%+ book a mentor session

### Business Metrics
- **Student Satisfaction:** 4.5+ stars average
- **Mentor Satisfaction:** 4.5+ stars average
- **Session Completion Rate:** 85%+ show up
- **Assessment Accuracy:** 70%+ students report matches are accurate

### Impact Metrics
- **Career Clarity:** Students report 3x improvement in understanding career paths
- **Academic Performance:** Students using platform score 20% higher on national exams
- **Mentor Hours:** 1,000+ hours of professional mentoring provided
- **Lives Changed:** 10,000+ students make informed career decisions

---

## RISKS & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Students can't afford internet** | High | Offline PWA mode, school partnerships with WiFi |
| **Not enough mentors** | High | Incentivize with recognition, certificates, small payments |
| **Assessment inaccuracy** | Critical | Continuous validation, feedback loops, A/B testing |
| **Low engagement** | High | Gamification, school integration, peer sharing |
| **Mentor no-shows** | Medium | Confirmation reminders, mentor ratings, backup mentors |
| **Content moderation** | Medium | Automated flagging, admin review queue |
| **Competition emerges** | Medium | Move fast, build community, data advantage |

---

## CONCLUSION

**This is what we're building:**

A platform that doesn't just show careers, but **guides students through the most important decision of their lives** with:
1. **Real, validated assessments** that actually match students to careers
2. **Access to professionals** who provide real-world insights
3. **Complete information** on pathways from high school to career success
4. **Personalized guidance** at every step

**The current codebase has:**
- ✅ Beautiful, consistent design
- ✅ Solid technical architecture
- ✅ Working authentication
- ❌ Broken core features
- ❌ Incomplete integrations
- ❌ Mock data everywhere

**With 12-16 weeks of focused work, we can transform this into a product that:**
- Students trust for life-changing guidance
- Mentors love using to give back
- Schools recommend to all students
- Companies sponsor to find talent
- Rwanda celebrates as a national education innovation

**Steve Jobs would ask:** "Will this change lives?"

**The answer is YES** - if we fix what's broken, complete what's missing, and obsess over making every interaction perfect.

**Let's build something insanely great.**

---

**Next Steps:**
1. Review this plan
2. Prioritize which sections to tackle first
3. Start with Sprint 1: Assessment Overhaul
4. Ship, measure, iterate

**The clock is ticking. Rwanda's students are waiting.**
