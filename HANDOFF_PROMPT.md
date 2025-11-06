# HANDOFF PROMPT FOR NEW CLAUDE AGENT

Copy everything below this line and paste it to a new Claude instance:

---

# MISSION: Implement OpportunityMap Improvements

You are taking over implementation of major improvements to **OpportunityMap**, a career discovery platform for Rwandan high school students in Rwanda.

## CRITICAL CONTEXT DOCUMENTS TO READ FIRST

1. **Read `/IMPROVEMENT_PLAN.md`** - This is the comprehensive 16-week improvement plan with full analysis
2. **Read `/README.md`** - Project overview
3. **Read `/docs/GUIDE.md`** - Development guide with technical details

## YOUR MISSION

Implement ALL improvements from IMPROVEMENT_PLAN.md **EXCEPT**:
- ❌ Skip: Payment integration (week 9-10)
- ❌ Skip: PWA implementation (week 11-12)
- ❌ Skip: ALL of weeks 13-16 (Internationalization, i18n, translation, scale prep)

## WHAT YOU MUST IMPLEMENT (Priority Order)

### 🔴 CRITICAL - DO FIRST (Weeks 1-4)

#### 1. ASSESSMENT SYSTEM OVERHAUL
**Problem:** Assessment is completely fake - returns hardcoded scores (95%, 90%, 85%...) regardless of student answers.
**Location:** `/app/assessment/questions/page.tsx` lines 83-91

**What to do:**
- Research-backed questions (20-30 questions) based on RIASEC/Holland Code
- Design questions across 4 dimensions: Interests, Skills, Values, Work Environment
- Build REAL matching algorithm with proper scoring (cosine similarity, weighted scoring)
- Add career metadata to schema: `interestProfile`, `skillRequirements`, `valueProfile`, `workEnvironment`
- Update `/convex/schema.ts` careers table
- Update `/convex/seed.ts` with metadata for all 100+ careers
- Create `/lib/assessment-algorithm.ts` with matching logic

#### 2. COMPLETE MENTOR SYSTEM
**Problem:** Mentor dashboard is 100% mock data. Mentors can't sign up. Calendly bookings don't sync to database.
**Location:** `/app/dashboard/mentor/page.tsx` - all hardcoded

**What to do:**
- Create `/app/signup/mentor/page.tsx` - mentor-specific signup
- Create `/app/dashboard/mentor/profile/page.tsx` - edit profile, bio, Calendly URL, rates
- Replace all mock data in mentor dashboard with real Convex queries
- Create `/convex/careerChats.ts` mutations: `createSession`, `cancelSession`, `getUpcoming`, `getCompleted`
- Implement Calendly webhook: `/convex/http.ts` with `calendlyWebhook` HTTP action
- Build post-session feedback: rating system, update mentor ratings

#### 3. FIX STUDENT DATA
**Problem:** Dashboard shows "Lycée de Kigali" and "Senior 5" for ALL students (hardcoded).
**Location:** `/app/dashboard/student/page.tsx` lines 29-32

**What to do:**
- Replace hardcoded data with `useQuery(api.studentProfiles.getByUserId)`
- Create `/app/dashboard/student/profile/page.tsx` - edit school, grade, district, interests
- Create `/convex/studentProfiles.ts` with `getByUserId`, `update` mutations
- Fix dashboard stats to calculate from real data (not hardcoded)

#### 4. DELETE LEGACY CODE
**Problem:** 500+ lines of unused code from old Spark Learning Platform

**What to delete:**
```
/app/content/          (old learning content - unused)
/app/practice/         (old practice tests - unused)
/app/questions/ask/    (old Q&A feature - unused)
/app/login/            (duplicate of /sign-in)
/app/signup/           (duplicate of /sign-up)
/lib/data.ts           (500+ lines of mock data - replaced by Convex)
/lib/assessment-storage.ts  (localStorage helpers - unused)
```

### 🟡 HIGH PRIORITY - DO NEXT (Weeks 5-8)

#### 5. OPTIMIZE LANDING PAGE
**Problem:** Makes 3 sequential queries, 500ms loading spinner
**What to do:**
- Create `/convex/landing.ts` with batched `getLandingData` query
- Add skeleton loaders instead of spinner
- Lazy load sections

#### 6. CAREER COMPARISON TOOL
**What to do:**
- Create `/app/careers/compare/page.tsx`
- Side-by-side comparison of 2 careers
- Add "Compare" button to career cards
- Show: salary, education, skills, pathway side-by-side

#### 7. CHAT/MESSAGING SYSTEM
**What to do:**
- Build in-house chat (NOT third-party like SendBird)
- Add `conversations` and `messages` tables to schema
- Create `/app/dashboard/messages/page.tsx` - conversation list
- Create `/app/dashboard/messages/[conversationId]/page.tsx` - chat interface
- Real-time updates using Convex subscriptions

#### 8. ADVANCED SEARCH
**What to do:**
- Create `/convex/careers.ts` `advancedSearch` query with pagination
- Add filters: categories (multi-select), salary range, education level, sort by
- Implement infinite scroll
- Server-side filtering

### 🟢 POLISH - DO LAST (Weeks 9-12)

#### 9. ADMIN DASHBOARD
**What to do:**
- Create `/app/dashboard/admin/page.tsx` - overview with metrics
- Create sub-pages: careers, mentors, users, sessions, analytics
- Add admin role to middleware protection
- View platform stats, approve mentors, moderate content

#### 10. IMPROVE ASSESSMENT RESULTS
**What to do:**
- Add visualizations (radar chart of student profile)
- Better match explanations (specific reasons from answers)
- "Why it matches" + "Potential concerns"
- Next steps for each career

#### 11. ANALYTICS TRACKING
**What to do:**
- Add `events` table to schema
- Track: career_viewed, assessment_started, assessment_completed, booking_initiated, etc.
- Create dashboard showing usage metrics

#### 12. FIX N+1 QUERIES
**What to do:**
- Fix `/convex/savedCareers.ts` - batch fetch careers instead of one-by-one
- Optimize dashboard queries

## TECHNICAL GUIDELINES

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Convex (backend + database)
- Clerk (auth)
- Tailwind CSS (neobrutalist design)
- shadcn/ui components

**Code Patterns to Follow:**
```typescript
// Queries
const data = useQuery(api.module.functionName, args);

// Mutations
const doSomething = useMutation(api.module.functionName);

// Auth
const { user, isLoading } = useConvexAuth();

// Skip queries when not authenticated
const data = useQuery(api.module.fn, user ? {} : "skip");
```

**Design System:**
- Neobrutalist: thick black borders (3-4px), solid shadows, high contrast
- Colors: #FF6B35 (orange), #004E89 (blue), #F7FD04 (yellow)
- Classes: `border-3 border-black shadow-brutal`

**Git Workflow:**
- Branch: `claude/app-improvement-review-011CUrtfvfy581mY8jLydA3v`
- Commit after each major feature
- Push regularly: `git push -u origin <branch>`
- Clear commit messages

## KEY FILES YOU'LL MODIFY

```
/convex/schema.ts           - Database tables
/convex/seed.ts             - Seed data (100+ careers, 50+ professionals)
/convex/careers.ts          - Career queries
/convex/assessments.ts      - Assessment logic
/convex/professionals.ts    - Mentor queries
/convex/studentProfiles.ts  - Student data (NEW - create this)
/convex/careerChats.ts      - Session tracking (expand this)
/convex/http.ts             - Webhooks (NEW - create this)

/lib/assessment-algorithm.ts  - NEW - matching algorithm

/app/assessment/questions/page.tsx       - Fix fake matching (line 83-91)
/app/dashboard/mentor/page.tsx           - Replace ALL mock data
/app/dashboard/student/page.tsx          - Fix hardcoded data (line 29-32)
/app/signup/mentor/page.tsx              - NEW - create mentor signup
/app/dashboard/mentor/profile/page.tsx   - NEW - mentor profile editor
/app/dashboard/student/profile/page.tsx  - NEW - student profile editor
/app/careers/compare/page.tsx            - NEW - comparison tool
/app/dashboard/messages/...              - NEW - chat system
/app/dashboard/admin/...                 - NEW - admin dashboard
```

## SUCCESS CRITERIA

When you're done, the app should:
✅ Have real career assessment with actual matching algorithm
✅ Allow mentors to sign up and manage profiles
✅ Sync Calendly bookings to database
✅ Show students their actual data (not hardcoded)
✅ Have zero legacy/unused code
✅ Perform well on landing page
✅ Include career comparison tool
✅ Have working chat/messaging system
✅ Have advanced search with filters
✅ Have admin dashboard
✅ Track analytics events
✅ Be production-ready

## HOW TO START

1. Read IMPROVEMENT_PLAN.md fully
2. Start with Assessment System (#1) - most critical
3. Work systematically through the list
4. Test each feature before moving on
5. Commit and push after each completion
6. Use the existing neobrutalist design patterns
7. Don't break existing working features

## ESTIMATED TIMELINE
- Critical (1-4): ~4 weeks
- High Priority (5-8): ~4 weeks
- Polish (9-12): ~3-4 weeks
- **Total: ~12 weeks of focused work**

Work systematically. This is a real product that will help thousands of Rwandan students make better career decisions. Make it insanely great.

When you're done with everything, commit all changes and provide a summary of what was accomplished.

---

**END OF HANDOFF PROMPT**
