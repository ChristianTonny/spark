# SPARK - Project Context

**Last Updated:** January 16, 2025
**Status:** Core features complete, optimization phase
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Convex, Clerk Auth

---

## 🎯 PROJECT OVERVIEW

**Mission:** Career discovery platform for Rwandan high school students

**Problem Solved:**
- 75%+ rural students lack career guidance
- Limited access to professional mentors
- No structured career exploration tools

**Solution:**
- Comprehensive career library with 100+ careers
- Real-time mentor booking and chat system
- Career assessment tools
- Professional mentor network

---

## 🏗️ ARCHITECTURE

### Tech Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS with "Brutal" design system
- Client-side rendering with real-time updates

**Backend:**
- Convex (serverless database + real-time queries)
- Clerk for authentication
- Real-time subscriptions
- File-based routing

**Key Design Decisions:**
- **Convex over REST API:** Real-time subscriptions, TypeScript end-to-end
- **Clerk over custom auth:** Pre-built UI, JWT integration
- **Client-side rendering:** Simpler data fetching, real-time updates
- **Brutal design system:** Thick borders, high contrast, memorable UX

---

## ✅ COMPLETED FEATURES

### 1. Authentication System ✅
**Status:** Fully implemented

- Clerk handles signup/login UI and JWT tokens
- Role-based access control (student, mentor, company, partner)
- User sync between Clerk and Convex
- Protected routes via middleware
- `useConvexAuth` hook for auth state

**Files:**
- `middleware.ts` - Route protection
- `convex/auth.config.js` - JWT validation
- `app/ConvexClientProvider.tsx` - Clerk + Convex integration
- `lib/hooks/useConvexAuth.ts` - Auth state hook

---

### 2. Booking System ✅
**Status:** Fully functional

**Features:**
- Student requests booking → Mentor approves/declines
- Time slot selection and availability management
- Session statuses: pending → confirmed/scheduled → completed
- Mentor bookings page with tabs (Pending/Confirmed/Past)
- Session completion tracking

**Files:**
- `convex/careerChats.ts` - Booking logic and mutations
- `convex/availabilitySlots.ts` - Mentor availability
- `components/BookingModal.tsx` - Booking UI
- `app/dashboard/mentor/bookings/page.tsx` - Mentor bookings

---

### 3. Chat/Messaging System ✅
**Status:** Fully functional

**Features:**
- Real-time messaging between students and mentors
- ChatDrawer component for inline messaging
- Message history persistence
- Integration with booking system
- Unread message indicators

**Files:**
- `convex/messages.ts` - Message queries and mutations
- `components/ChatDrawer.tsx` - Chat UI component
- Message display on mentor and student pages

---

### 4. Notifications System ✅
**Status:** Fully functional

**Features:**
- Real-time notification creation
- Database persistence (not localStorage)
- Unread count badge in navigation
- Mark as read functionality
- Mark all as read
- Notification types: booking, message, system

**Files:**
- `convex/notifications.ts` - Notification logic
- `convex/schema.ts` - Notifications table
- `components/navigation.tsx` - Unread badge
- `app/dashboard/mentor/notifications/page.tsx` - Notifications page

---

### 5. Settings Persistence ✅
**Status:** Fully functional

**Features:**
- User settings saved to database (not localStorage)
- Default settings auto-created for new users
- Notification preferences
- Privacy settings
- Real-time sync

**Files:**
- `convex/userSettings.ts` - Settings queries and mutations
- `convex/schema.ts` - UserSettings table
- `app/dashboard/mentor/settings/page.tsx` - Settings UI

---

### 6. Rating System ✅
**Status:** Fully functional with CRUD

**Features:**
- Students can rate mentors after completed sessions
- Full CRUD operations (Create, Read, Update, Delete)
- 5-star rating with optional feedback
- RatingModal component for rating UI
- PendingRatings component shows unrated sessions
- Automatic mentor rating calculations
- Rating distribution display on profiles

**Files:**
- `convex/careerChats.ts` - Rating mutations (rateMentor, updateRating, deleteRating)
- `components/RatingModal.tsx` - Rating UI
- `components/PendingRatings.tsx` - Unrated sessions widget
- `app/mentors/[mentorId]/page.tsx` - Rating display and management

**Rating Flow:**
1. Session completed
2. Student rates mentor (1-5 stars + feedback)
3. Rating saved to careerChats table
4. Mentor's average rating auto-recalculated
5. Student can edit or delete rating anytime

---

### 7. Career Discovery ✅
**Status:** Fully functional

**Features:**
- Browse 100+ careers with search and filters
- Career detail pages with full information
- Bookmark/save careers
- Related careers recommendations
- Video content integration
- Salary information and education requirements

**Files:**
- `app/careers/page.tsx` - Career browsing
- `app/careers/[careerId]/page.tsx` - Career details
- `convex/careers.ts` - Career queries
- `convex/savedCareers.ts` - Bookmark operations

---

### 8. Assessment System ⚠️
**Status:** UI complete, matching logic is placeholder

**Features:**
- Assessment intro page
- 5-question flow with progress bar
- Results page with top career matches
- Assessment history storage

**Issue:** Matching algorithm returns hardcoded scores (needs improvement)

**Files:**
- `app/assessments/page.tsx` - Assessment intro
- `app/assessment/questions/page.tsx` - Question flow
- `app/assessment/results/page.tsx` - Results display
- `convex/assessments.ts` - Assessment CRUD

---

### 9. Mentor Discovery ✅
**Status:** Fully functional

**Features:**
- Browse mentors with search and filters
- Mentor profiles with bio, expertise, rating
- Book sessions with mentors
- View mentor availability
- Message mentors directly

**Files:**
- `app/mentors/page.tsx` - Mentor browsing
- `app/mentors/[mentorId]/page.tsx` - Mentor profile
- `convex/professionals.ts` - Mentor queries

---

## 📊 DATA MODEL

### Key Tables (Convex Schema)

**users** - User accounts
- _id, email, firstName, lastName
- role (student | mentor | company | partner)
- avatar, tokenIdentifier (Clerk)

**professionals** - Mentor profiles
- userId, company, jobTitle, bio
- rating (average), chatsCompleted
- yearsExperience, calendlyUrl

**careerChats** - Booking sessions
- studentId, professionalId
- status (pending | confirmed | scheduled | completed)
- scheduledAt, completedAt, duration
- rating, feedback (after completion)
- meetingUrl

**messages** - Chat messages
- chatId, senderId, content
- timestamp, read status

**notifications** - User notifications
- userId, type, title, message
- read status, timestamp

**userSettings** - User preferences
- userId, notification preferences
- privacy settings

**careers** - Career information
- title, description, category
- salary, education, skills
- relatedCareerIds

**savedCareers** - Bookmarks
- userId, careerId, savedAt

**assessmentResults** - Assessment history
- userId, answers, topMatches
- completedAt

---

## 🔄 DATA FLOW

### Booking Flow
```
1. Student browses mentors → clicks "Book Session"
2. BookingModal opens → selects time slot
3. createCareerChat mutation → status: "pending"
4. Mentor receives notification
5. Mentor approves → updateChat mutation → status: "confirmed"
6. Session date passes → Student marks complete
7. completeSession mutation → status: "completed"
8. Student rates mentor → rateMentor mutation
```

### Chat Flow
```
1. Student clicks "Message Mentor"
2. ChatDrawer opens with existing chat or creates new
3. sendMessage mutation → stores in messages table
4. Real-time update via Convex subscription
5. Recipient sees unread indicator
6. markAsRead mutation when opened
```

### Notification Flow
```
1. Event occurs (booking, message, etc.)
2. Manual creation via createNotification mutation
3. Real-time update in navigation badge
4. User clicks notification icon
5. markNotificationsAsRead mutation
6. Badge count updates
```

---

## 🚧 KNOWN ISSUES

### 1. Notification Automation Missing
**Issue:** Notifications must be manually created
**Impact:** Students/mentors don't auto-receive booking/message notifications
**Solution:** Build `convex/notificationTriggers.ts` with auto-creation logic

### 2. Assessment Matching is Placeholder
**Issue:** Returns hardcoded scores, not based on actual answers
**Impact:** Career recommendations not personalized
**Solution:** Implement real matching algorithm

### 3. Earnings System Missing
**Issue:** Mentors can't track earnings from completed sessions
**Impact:** No financial transparency for mentors
**Solution:** Build earnings dashboard and calculations

### 4. Student Dashboard Shows Mock Data
**Issue:** Dashboard doesn't show real booking/session data
**Impact:** Students can't see their actual activity
**Solution:** Update dashboard queries to use real data

---

## 📁 FILE STRUCTURE

### Frontend Pages (`/app`)
```
app/
├── page.tsx - Landing page
├── careers/
│   ├── page.tsx - Career browsing
│   ├── [careerId]/page.tsx - Career details
│   └── compare/page.tsx - Career comparison
├── assessments/page.tsx - Assessment intro
├── assessment/
│   ├── questions/page.tsx - Assessment flow
│   └── results/page.tsx - Results display
├── mentors/
│   ├── page.tsx - Mentor browsing
│   └── [mentorId]/page.tsx - Mentor profile
├── dashboard/
│   ├── student/page.tsx - Student dashboard
│   └── mentor/
│       ├── page.tsx - Mentor dashboard
│       ├── bookings/page.tsx - Booking management
│       ├── notifications/page.tsx - Notifications
│       └── settings/page.tsx - Settings
├── sign-in/ - Clerk auth pages
└── sign-up/
```

### Backend Functions (`/convex`)
```
convex/
├── schema.ts - Database schema
├── users.ts - User management
├── professionals.ts - Mentor queries
├── careers.ts - Career queries
├── careerChats.ts - Booking and rating logic
├── messages.ts - Chat functionality
├── notifications.ts - Notification system
├── userSettings.ts - Settings persistence
├── availabilitySlots.ts - Mentor availability
├── savedCareers.ts - Bookmark operations
├── assessments.ts - Assessment CRUD
└── seed.ts - Initial data seeding
```

### Components (`/components`)
```
components/
├── navigation.tsx - Header with auth
├── BookingModal.tsx - Session booking UI
├── ChatDrawer.tsx - Messaging interface
├── RatingModal.tsx - Rating UI
├── PendingRatings.tsx - Unrated sessions
├── BookingRequestCard.tsx - Booking request UI
├── loading-skeleton.tsx - Loading states
├── error-state.tsx - Error handling
└── ui/ - shadcn components
```

---

## 🎨 DESIGN SYSTEM

**"Brutal" Design Language:**
- Thick borders (3px black)
- Solid shadows (4-8px offset)
- High contrast colors
- Sharp corners (no border-radius)
- Bold typography (font-black, uppercase)

**Color Palette:**
- `brutal-blue` - Primary actions
- `brutal-green` - Success states
- `brutal-yellow` - Highlights
- `brutal-orange` - Warnings
- `brutal-pink` - Accents
- `brutal-purple` - Special

**Common Patterns:**
```tsx
// Card
<div className="border-3 border-black shadow-brutal-lg p-6 bg-white">

// Button
<button className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">

// Badge
<span className="px-3 py-1 bg-brutal-yellow text-black text-xs font-black border-2 border-black">
```

---

## 🔑 KEY PATTERNS

### Query Pattern
```tsx
const data = useQuery(api.module.functionName, args);
// Returns undefined while loading
// Returns null if not found
// Returns data when successful
```

### Mutation Pattern
```tsx
const mutate = useMutation(api.module.functionName);
await mutate(args);
// Use in async functions or event handlers
```

### Auth Pattern
```tsx
const { user, isLoading } = useConvexAuth();
if (isLoading) return <Loading />;
if (!user) return <SignIn />;
```

### Real-time Update Pattern
```tsx
// Queries automatically re-run when data changes
// No manual refetching needed
const bookings = useQuery(api.careerChats.getBookings);
// Component re-renders when bookings update
```

---

## 🚀 DEPLOYMENT

**Platform:** Vercel
**Database:** Convex Cloud
**Auth:** Clerk
**Status:** Production-ready

**Environment Variables:**
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret (server-side)

---

## 📈 METRICS

**Code Stats:**
- ~15,000 lines of TypeScript/TSX
- ~30 pages/routes
- ~25 Convex functions
- ~15 reusable components

**Feature Completeness:**
- Backend Integration: ✅ 100%
- Booking System: ✅ 100%
- Chat/Messaging: ✅ 100%
- Notifications: ✅ 100%
- Rating System: ✅ 100%
- Settings: ✅ 100%
- Career Discovery: ✅ 100%
- Mentor Discovery: ✅ 100%
- Assessment: ⚠️ 60% (UI done, logic placeholder)
- Automation: ❌ 0%
- Earnings: ❌ 0%

---

## 🎯 NEXT PRIORITIES

1. **Notification Automation** - Auto-create for booking/message events
2. **Earnings System** - Track mentor earnings from sessions
3. **Enhanced Dashboards** - Real data instead of mock
4. **Assessment Improvement** - Real matching algorithm
5. **Mobile Optimization** - Test and fix on mobile devices

---

## 💡 LESSONS LEARNED

### What Worked Well
- **Convex real-time:** Instant updates without polling
- **Brutal design:** Memorable, distinctive UX
- **Type safety:** Caught errors before production
- **UI-first approach:** Faster iteration, better UX

### What Could Be Better
- **Assessment logic:** Should have built real algorithm earlier
- **Notification automation:** Manual creation is error-prone
- **Documentation:** Needed updates as features evolved

### Technical Debt
- Some TypeScript errors in legacy code
- Mock data in assessment matching
- Missing loading states in some pages
- Mobile responsiveness needs audit

---

**Last Updated:** January 16, 2025
**Maintained By:** Christian Tonny
**Repository:** github.com/ChristianTonny/spark
