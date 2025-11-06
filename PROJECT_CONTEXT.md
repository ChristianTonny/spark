# OpportunityMap - Project Context

**Last Updated:** November 6, 2025
**Status:** Multi-user architecture complete, performance optimization phase
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Convex, Clerk Auth

---

## 1. Comprehensive Codebase Analysis

### Core Architecture

**Frontend Framework:** Next.js 14 with App Router
- **Routing:** File-based routing in `/app` directory
- **Rendering:** Client-side rendering ("use client" directives everywhere)
- **State Management:** Convex real-time queries via React hooks
- **Styling:** Tailwind CSS with "neobrutalism" design system (thick borders, solid shadows, high contrast)

**Backend:** Convex (serverless database + real-time queries)
- **Database:** Located in `/convex` directory
- **Schema:** Full relational schema with users, careers, assessments, bookmarks, etc.
- **Queries:** Server-side functions that auto-sync to frontend
- **Mutations:** Server-side write operations

**Authentication:** Clerk (third-party auth provider)
- **Integration:** ConvexProviderWithClerk wraps the app (`app/ConvexClientProvider.tsx`)
- **User Sync:** UserSyncProvider automatically syncs Clerk users to Convex on login (`app/UserSyncProvider.tsx`)
- **Auth Config:** `convex/auth.config.js` tells Convex to trust Clerk JWTs
- **Middleware:** `middleware.ts` protects dashboard routes, allows public access to careers/assessments/mentors

**Data Flow:**
1. User logs in via Clerk
2. UserSyncProvider calls `users.store` mutation to create/update user in Convex
3. Components use `useConvexAuth` hook to wait for user sync completion
4. Queries fetch data using authenticated user from context (`ctx.auth.getUserIdentity()`)
5. Real-time updates: Convex automatically re-runs queries when data changes

### File Structure

**Frontend Pages (`/app`):**
- `page.tsx` - Landing page (322 lines - PERFORMANCE CONCERN)
- `careers/page.tsx` - Career browsing with search/filters
- `careers/[id]/page.tsx` - Career detail page
- `assessments/page.tsx` - Assessment intro + history
- `assessment/questions/page.tsx` - Assessment flow
- `assessment/results/page.tsx` - Assessment results
- `mentors/page.tsx` - Mentor browsing
- `dashboard/student/page.tsx` - Student dashboard
- `dashboard/mentor/page.tsx` - Mentor dashboard (MOCK DATA ONLY)
- `sign-in/`, `sign-up/` - Clerk authentication pages

**Backend Functions (`/convex`):**
- `schema.ts` - Database schema (203 lines, well-structured)
- `users.ts` - User management, auth helpers
- `careers.ts` - Career queries (list, search, filter)
- `savedCareers.ts` - Bookmark functionality
- `assessments.ts` - Assessment queries and result storage
- `professionals.ts` - Mentor/professional queries
- `seed.ts` - Initial database seeding script
- `auth.config.js` - Clerk JWT configuration

**Shared Code (`/lib`):**
- `data.ts` - OLD MOCK DATA (no longer used but still present)
- `types.ts` - TypeScript interfaces
- `hooks/useConvexAuth.ts` - Custom hook for auth sync timing
- `assessment-storage.ts` - OLD localStorage helpers (replaced by Convex)
- `use-toast.ts` - Toast notification hook

**Components (`/components`):**
- `navigation.tsx` - Header with Clerk auth buttons
- `loading-skeleton.tsx` - Skeleton loaders
- `error-state.tsx` - Error handling components
- `toast-container.tsx` - Toast notifications
- `ui/*` - Shadcn UI components

### Issues & Code Smells

**1. Performance Bottlenecks:**
- **Landing page slow to load** - Makes 3 sequential Convex queries on mount (`getFeatured`, `getCategories`, `count`)
- **Dashboard N+1 query pattern** - Fetches bookmarks, then fetches career details for each bookmark individually
- **No query batching** - Multiple independent queries run sequentially instead of parallel
- **Categories query is inefficient** - Scans all careers to extract unique categories (should be pre-computed or cached)

**2. Legacy Code Present:**
- `/app/content/` - Old Spark Learning Platform page (unused)
- `/app/practice/` - Old Spark feature (unused)
- `/app/questions/` - Old Spark Q&A feature (unused)
- `/lib/data.ts` - 500+ lines of mock data no longer used
- `/lib/assessment-storage.ts` - localStorage helpers replaced by Convex

**3. Inconsistent Patterns:**
- Some pages use `useConvexAuth`, others don't (inconsistent auth checking)
- `/app/signup/page.tsx` is a redirect, `/app/sign-up/` is the real page (confusing)
- `/app/login/page.tsx` exists separately from `/sign-in/` (duplication)
- Assessment questions stored in Convex but accessed via hardcoded index `assessments[0]`

**4. Hardcoded Data:**
- Student dashboard shows "Senior 5" and "Lycée de Kigali" hardcoded (`dashboard/student/page.tsx:29-30`)
- Mentor dashboard uses completely mock data, not connected to Convex (`dashboard/mentor/page.tsx`)
- Assessment matching algorithm is fake - always returns first 5 careers with mock scores (`assessment/questions/page.tsx:83-91`)

**5. Missing Convex/Clerk in package.json:**
- `package.json` doesn't show Convex or Clerk dependencies (they may be installed but not listed, or this is outdated)

**6. Schema Issues:**
- `studentProfiles` table exists but is never queried by frontend
- `careerChats` table defined but no booking flow uses it (Calendly is used instead)
- `companies` table exists but no company dashboard built

**7. Auth Race Condition (FIXED):**
- Was: Queries ran before user synced to Convex, causing "User not authenticated" errors
- Fix: Created `useConvexAuth` hook that waits for both Clerk AND Convex sync
- Defensive: Made queries return empty arrays for unauthenticated users instead of throwing

### Performance Analysis

**Landing Page (app/page.tsx):**
- 322 lines, 16KB file
- Makes 3 Convex queries: `getFeatured` (gets 6 careers), `getCategories` (scans all careers), `count` (counts all careers)
- Categories query is O(n) and blocks render until complete
- No optimization: could pre-compute categories, batch queries, or lazy load sections

**Careers Search (careers.ts):**
- `search` query does client-side filtering (loads ALL careers then filters in memory)
- No pagination - returns entire filtered result set
- No indexes used for searching (full table scan)

**Dashboard Data Fetching:**
- Sequential pattern: Fetch bookmarks → fetch career details for each → render
- Could be optimized with a single denormalized query or server-side joins

**Assessment System:**
- Only 5 questions total (not 15 as docs claim)
- Questions are superficial: "What activities do you enjoy?" with 4 generic options
- No actual matching algorithm - hardcoded mock scores
- Results page works fine, just the matching logic is placeholder

---

## 2. What We've Built (Feature Inventory)

### Authentication System ✅ COMPLETE

**What it is:** Full multi-user authentication with role-based access control

**How it works:**
- Clerk handles signup/login UI and JWT tokens
- `middleware.ts` protects dashboard routes, allows public access to main pages
- `UserSyncProvider` (runs on app mount) calls `users.store` mutation to sync Clerk user to Convex
- `useConvexAuth` hook provides user state and loading state to components
- User roles: student, mentor, company, partner (stored in Convex `users.role` field)

**Why this approach:**
- Clerk provides pre-built UI (saves development time)
- Convex integration is official and well-documented
- JWT-based auth works seamlessly across serverless functions

**Current state:** Fully working. Race condition bugs fixed. Users properly isolated.

**Files:**
- `middleware.ts` - Route protection
- `convex/auth.config.js` - JWT validation config
- `app/ConvexClientProvider.tsx` - Clerk + Convex integration
- `app/UserSyncProvider.tsx` - Auto-sync users to database
- `lib/hooks/useConvexAuth.ts` - Auth state hook
- `convex/users.ts` - User CRUD operations

---

### Student Dashboard ✅ MOSTLY COMPLETE

**What it is:** Personalized dashboard showing saved careers, assessment results, progress stats

**How it works:**
- Queries `savedCareers.list` to get bookmarked careers with full details
- Queries `assessments.getResults` to get assessment history
- Displays stats: saved careers count, assessments taken, top match percentage
- Shows 3 most recent items in each category
- Links to settings and profile pages

**Why this approach:**
- Real-time updates via Convex (bookmarks appear instantly)
- Data is user-scoped (queries automatically filter by authenticated user)

**Current state:** Fully functional but has hardcoded user info

**Issues:**
- School and grade level are hardcoded strings, not from user profile
- No actual student profile editing capability yet
- Loading states work, but could be snappier

**Files:**
- `app/dashboard/student/page.tsx` (370 lines)
- `app/dashboard/student/settings/page.tsx` - Settings page (preferences stored in localStorage, not Convex)

---

### Career Discovery System ✅ COMPLETE

**What it is:** Browse, search, and filter 100+ careers with detailed information

**How it works:**
- `careers.search` query filters by keyword, category, and salary range
- Career detail pages show full description, video, salary, required education, career path timeline
- Bookmark functionality saves career IDs to `savedCareers` table
- Related careers shown based on `relatedCareerIds` field

**Why this approach:**
- Client-side filtering is simple and works well for small datasets
- Bookmarking via Convex provides real-time sync across devices
- Video thumbnails from Unsplash, video URLs placeholder (YouTube embeds)

**Current state:** Fully working with real data from Convex

**Performance concern:** Search loads all careers into memory then filters (inefficient at scale)

**Files:**
- `app/careers/page.tsx` - Grid view with filters (280 lines)
- `app/careers/[id]/page.tsx` - Detail view
- `convex/careers.ts` - Career queries
- `convex/savedCareers.ts` - Bookmark operations

---

### Assessment System ⚠️ PARTIALLY IMPLEMENTED

**What it is:** Career matching quiz that recommends careers based on answers

**How it works:**
- Frontend fetches assessment questions from `assessments.list` (takes first result)
- User answers 5 multiple-choice questions
- On completion, saves result to `assessmentResults` table
- Results page shows top 5 career matches with percentage scores and reasons

**Why this approach:**
- Questions stored in Convex for easy updating
- Results stored per-user for history tracking
- Flexible schema allows for different assessment types

**Current state:** UI complete, matching algorithm is fake

**Major issues:**
- Only 5 questions (superficial, not enough for accurate matching)
- Questions are generic: "What activities do you enjoy?" with basic options
- **Matching algorithm is placeholder** - returns first 5 careers with hardcoded scores (95%, 90%, 85%, 80%, 75%)
- No actual correlation between answers and career recommendations
- Assessment questions don't reference any career guidance methodology

**Files:**
- `app/assessments/page.tsx` - Assessment intro + history
- `app/assessment/questions/page.tsx` - Question flow (215 lines)
- `app/assessment/results/page.tsx` - Results display
- `convex/assessments.ts` - Assessment CRUD
- `convex/seed.ts:200-250` - Question definitions

**What needs to be built:**
- Research 80,000 Hours methodology for career guidance
- Redesign questions to be more effective (interests, skills, values, personality)
- Implement real matching algorithm that scores careers based on answers
- Increase question count for better accuracy

---

### Mentor/Professional System ⚠️ PARTIALLY IMPLEMENTED

**What it is:** Browse mentors and book 15-min video chats

**How it works:**
- Mentors stored in Convex `professionals` table
- Mentor cards show photo, name, job title, company, rating
- "Book Session" button opens Calendly (external scheduling service)
- Search and filter by career field

**Why this approach:**
- Calendly handles scheduling complexity (timezone, availability, reminders)
- Simple integration via URL links
- No need to build custom calendar system

**Current state:** Browsing works, booking redirects to Calendly

**Issues:**
- No way for mentors to sign up or manage their profile
- Mentor dashboard exists but uses 100% mock data
- No integration between Calendly bookings and Convex database
- No chat/messaging system between mentors and students
- `careerChats` table exists in schema but is unused

**Files:**
- `app/mentors/page.tsx` - Mentor browsing
- `app/dashboard/mentor/page.tsx` - Mentor dashboard (MOCK DATA)
- `convex/professionals.ts` - Mentor queries

**What needs to be built:**
- Mentor onboarding flow (signup with role selection)
- Mentor profile editing
- Connect Calendly bookings to `careerChats` table
- Real mentor dashboard showing actual bookings
- Chat/messaging system

---

### Booking System ❌ NOT IMPLEMENTED

**What it is:** Should track mentor-student sessions, status, and feedback

**Schema exists:** `careerChats` table has all necessary fields (scheduledAt, status, rating, feedback)

**Why not implemented:** Using Calendly instead, which doesn't integrate with our database

**Current state:** External Calendly links only, no tracking

**What needs to be built:**
- Webhook from Calendly to Convex to record bookings
- OR: Build custom booking system using `careerChats` table
- Session status tracking (scheduled, completed, cancelled)
- Rating and feedback collection after sessions

---

### Role-Based Dashboards ⚠️ INCOMPLETE

**Student dashboard:** ✅ Working (but hardcoded data)
**Mentor dashboard:** ⚠️ UI exists, no real data
**Company dashboard:** ❌ Not built
**Partner dashboard:** ❌ Not built

**Why multiple dashboards:** Schema supports 4 user roles, each needs different view

**Current state:** Only student dashboard functional

---

### Chat/Messaging System ❌ NOT IMPLEMENTED

**What it is:** Should allow students and mentors to message each other

**Current state:** Doesn't exist at all

**Consideration:** User wants this built in-house (not third-party like SendBird) to enable future AI mentor integration

---

## 3. Architectural Decisions & Lessons Learned

### Technology Choices

**Convex over traditional REST API:**
- Real-time subscriptions out of the box (queries auto-update)
- No need to manage database connections or ORMs
- TypeScript end-to-end with auto-generated types
- Serverless scaling included
- Trade-off: Vendor lock-in, less control over query optimization

**Clerk over custom auth:**
- Pre-built UI components (sign-up, sign-in, user profile)
- Social login providers ready to use
- JWT tokens work seamlessly with Convex
- Trade-off: Monthly cost per user, less customization

**Next.js App Router over Pages Router:**
- Newer paradigm with better streaming support
- File-based routing simpler than config
- Trade-off: Steeper learning curve, "use client" directive needed often

**Client-side rendering over SSR:**
- Simpler data fetching with Convex hooks
- Real-time updates more natural
- Trade-off: Slower initial page load, worse SEO, more client-side JavaScript

**Tailwind CSS over component libraries:**
- Full design control, no opinionated styles to override
- Utility-first approach faster for prototyping
- Trade-off: Verbose className attributes, requires design discipline

### Patterns That Worked Well

**useConvexAuth hook:**
- Solves race condition elegantly
- Reusable across all authenticated pages
- Provides consistent loading states

**Query skipping pattern:**
```typescript
const bookmarks = useQuery(api.savedCareers.list, user ? {} : "skip");
```
- Avoids errors when user not authenticated
- Clean conditional data fetching

**Defensive queries:**
- Queries return empty arrays instead of throwing errors
- Frontend doesn't crash if auth fails
- Better user experience

**Schema-first development:**
- Defined full schema before building features
- Reduced database migration headaches
- Clear data relationships from the start

### Approaches That Were Tried But Abandoned

**localStorage for user data:**
- Initially used for bookmarks and assessment results
- Abandoned because: no cross-device sync, no multi-user support, data loss on clear
- Replaced with Convex database

**Multiple auth providers:**
- Considered Convex Auth (built-in solution)
- Chose Clerk instead for better UX and pre-built components

**Server-side rendering:**
- Tried SSR for landing page
- Abandoned because Convex hooks require client-side rendering
- Kept client-side for consistency

### Technical Debt & Compromises

**Mock assessment matching:**
- Placeholder algorithm returns hardcoded scores
- Done for speed to get UI working
- Needs proper implementation before production

**Calendly instead of built-in booking:**
- Faster to launch with external tool
- Creates disconnect between UI and database
- Should eventually build custom system

**Client-side filtering:**
- Easy to implement, works fine for small data
- Won't scale to thousands of careers
- Should add server-side search indexes eventually

**Hardcoded user profiles:**
- Student dashboard shows fake school/grade
- Prioritized auth functionality over profile management
- Profile editing is next priority

**Legacy code not removed:**
- Old Spark pages still in codebase (/content, /practice, /questions)
- Kept for reference during migration
- Should be deleted before production

---

## 4. Known Issues & Open Questions

### Performance Concerns

1. **Landing page slow to load**
   - Makes 3 sequential Convex queries
   - Categories query scans all careers
   - No lazy loading or code splitting

2. **Dashboard data fetching inefficient**
   - N+1 query pattern for bookmarks
   - Loads full career objects when only need title/image

3. **No pagination anywhere**
   - Careers page loads all results
   - Assessment history loads all results
   - Will be problem at scale

4. **Categories query is O(n)**
   - Scans all careers every time
   - Should be cached or pre-computed

### Incomplete Features

1. **Mentor onboarding missing**
   - No way to sign up as mentor
   - Role selection doesn't exist in signup flow

2. **Profile management missing**
   - Can't edit name, school, grade, interests
   - Student profile page doesn't exist

3. **Mentor dashboard not functional**
   - All data is hardcoded mock
   - Doesn't connect to real bookings or chats

4. **Assessment matching is fake**
   - Returns arbitrary scores
   - No correlation between answers and careers

5. **No chat/messaging system**
   - Students and mentors can't communicate post-booking

6. **Booking system disconnected**
   - Calendly bookings not tracked in database
   - No session history or feedback collection

### Code That Needs Refactoring

1. **lib/data.ts** - 500+ lines of unused mock data (should delete)
2. **lib/assessment-storage.ts** - Unused localStorage helpers (should delete)
3. **Legacy pages** - /content, /practice, /questions (should delete)
4. **Duplicate routes** - /login vs /sign-in, /signup vs /sign-up (consolidate)

### Hardcoded Values That Need To Be Dynamic

1. **Student dashboard** - School and grade level (line 29-30 of dashboard/student/page.tsx)
2. **Assessment questions** - Only 5 questions, too simple
3. **Mentor dashboard** - All stats and sessions are fake data
4. **Assessment index** - Hardcoded to use first assessment `assessments[0]`

### Inconsistencies in the Codebase

1. **Auth checking** - Some pages use useConvexAuth, others don't
2. **Error handling** - Some pages have robust error states, others just show undefined
3. **Loading states** - Inconsistent implementation across pages
4. **Query patterns** - Mix of defensive and throwing patterns

### Open Questions

1. **How to integrate 80,000 Hours methodology?** - Need research on their assessment approach
2. **Should we build custom booking or keep Calendly?** - Trade-offs between control and development time
3. **How to handle mentor payments?** - Schema has earnings fields but no payment flow
4. **What's the company dashboard for?** - Schema exists but no clear product requirement
5. **Should we remove legacy Spark code now or later?** - Risk of breaking something vs cleaner codebase

---

## 5. Remaining Features (Roadmap)

### High Priority - Core Functionality

**1. Dynamic User Profiles**
- **Objective:** Allow users to edit their personal information instead of showing hardcoded data
- **Context:** Dashboard currently shows "Senior 5, Lycée de Kigali" for all students
- **What's needed:** Profile editing page, update schema to include school/grade fields, update dashboard to pull from database
- **Dependencies:** User authentication already working

**2. Role Selection During Signup**
- **Objective:** Let users choose student/mentor role when signing up
- **Context:** Currently all new users default to "student" role
- **What's needed:** Modify Clerk signup flow to ask for role, store role in Convex users table
- **Dependencies:** None (auth system ready)

**3. Functional Mentor Dashboard**
- **Objective:** Show real booking data instead of mock sessions
- **Context:** Mentor dashboard exists but displays 100% fake data
- **What's needed:** Connect to careerChats table, show real upcoming sessions, integrate with Calendly or build custom booking
- **Dependencies:** Booking system integration

**4. Better Assessment System**
- **Objective:** Replace superficial 5-question quiz with effective career guidance assessment
- **Context:** Current matching algorithm is placeholder, doesn't actually evaluate answers
- **What's needed:** Research 80,000 Hours methodology, design 20-30 thoughtful questions, implement scoring algorithm
- **Dependencies:** None (can be done independently)

**5. Landing Page Performance**
- **Objective:** Make homepage load faster, especially categories section
- **Context:** Makes 3 sequential queries, blocks render
- **What's needed:** Batch queries, lazy load sections, cache categories, optimize getFeatured
- **Dependencies:** None

### Medium Priority - Enhanced Features

**6. Simple Chat/Messaging**
- **Objective:** Allow students to ask follow-up questions to mentors after sessions
- **Context:** User wants this built in-house (not third-party) for future AI mentor integration
- **What's needed:** Create messages table in Convex, build basic chat UI, real-time message delivery
- **Dependencies:** Authentication, mentor-student relationship

**7. Mentor Profile Management**
- **Objective:** Let mentors edit their bio, expertise, availability, and profile photo
- **Context:** Mentors currently created via seed script only
- **What's needed:** Mentor profile edit page, update professionals table fields
- **Dependencies:** Role selection working

**8. Student Profile Page**
- **Objective:** Let students edit name, school, grade, interests, upload photo
- **Context:** Profile data partially exists in schema but no editing UI
- **What's needed:** Build profile edit page, update users and studentProfiles tables
- **Dependencies:** None

**9. Booking System Integration**
- **Objective:** Track when students book mentor sessions and store in database
- **Context:** Calendly bookings happen externally, not recorded in Convex
- **What's needed:** Calendly webhook → Convex function to create careerChats record, OR build custom booking UI
- **Dependencies:** Mentor dashboard needs this data

**10. Assessment Results Improvement**
- **Objective:** Make career match reasons more detailed and personalized
- **Context:** Currently shows generic reasons like "Based on your interests"
- **What's needed:** Algorithm that explains WHY each career matches based on specific answers
- **Dependencies:** Better assessment system (#4)

### Lower Priority - Nice to Have

**11. Dashboard Performance**
- **Objective:** Reduce half-second load time on dashboard
- **Context:** N+1 query pattern for fetching bookmark details
- **What's needed:** Single denormalized query or server-side join
- **Dependencies:** None

**12. Search Optimization**
- **Objective:** Make career search faster and more powerful
- **Context:** Currently loads all careers and filters client-side
- **What's needed:** Server-side search with indexes, fuzzy matching, pagination
- **Dependencies:** None

**13. Company Dashboard**
- **Objective:** Let companies see metrics on student engagement with their careers
- **Context:** Schema exists but no product spec
- **What's needed:** Define what companies need to see, build analytics queries, create dashboard
- **Dependencies:** Company role needs to exist

**14. Session Feedback**
- **Objective:** Collect ratings and reviews after mentor sessions
- **Context:** Schema has rating/feedback fields but no collection UI
- **What's needed:** Post-session survey, store in careerChats table
- **Dependencies:** Booking system working

**15. Code Cleanup**
- **Objective:** Remove legacy Spark code and unused files
- **Context:** /content, /practice, /questions pages still exist but unused
- **What's needed:** Delete legacy pages, remove lib/data.ts mock data, consolidate duplicate routes
- **Dependencies:** None (safe to do anytime)

---

## Summary

OpportunityMap is a career discovery platform for Rwandan high school students. The core architecture (Next.js + Convex + Clerk) is solid and working well. Multi-user authentication is complete and users are properly isolated. The student experience (browsing careers, taking assessments, bookmarking) is functional end-to-end.

The main gaps are: (1) mentor experience is UI-only with no real data, (2) assessment matching is placeholder logic, (3) no profile management for any user type, (4) performance could be better on landing page and dashboard.

The codebase is generally clean but has legacy Spark code that should be removed. Some patterns are inconsistent (auth checking, error handling) but nothing architectural. The biggest technical debt is the fake assessment algorithm - it looks like it works but doesn't actually match careers to answers.

Next logical steps: Make user profiles dynamic, build mentor onboarding flow, improve assessment questions/algorithm, optimize landing page performance. After that: build chat system, connect booking system, create mentor dashboard with real data.
