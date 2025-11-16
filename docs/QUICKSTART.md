# 🚀 SPARK - Quick Start Guide

Get the SPARK platform running locally in 5 minutes!

---

## Prerequisites

**Required:**
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn package manager
- Git

**Accounts Needed:**
- [Convex](https://convex.dev) - Backend database (free tier available)
- [Clerk](https://clerk.com) - Authentication (free tier available)

---

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/ChristianTonny/spark.git
cd spark
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- Next.js 14.1.0
- React 18
- TypeScript
- Tailwind CSS
- Convex
- Clerk
- shadcn/ui components

### 3. Set Up Environment Variables

Create `.env.local` file in project root:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**Get Convex URL:**
1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Create new project
3. Copy deployment URL

**Get Clerk Keys:**
1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create new application
3. Copy publishable key and secret key

### 4. Initialize Convex

```bash
npx convex dev
```

This will:
- Link to your Convex project
- Deploy database schema
- Set up real-time functions
- Run seed data (optional)

### 5. Start Development Server

**In a separate terminal:**
```bash
npm run dev
```

Server starts at: **http://localhost:3000**

---

## 🎯 What's Available

### Public Pages (No Login Required)

**1. Landing Page** - `/`
- Hero section with value proposition
- Feature showcase
- Call-to-action buttons

**2. Career Library** - `/careers`
- Browse 100+ career options
- Search and filter functionality
- Bookmark careers
- Click to view career details

**3. Career Details** - `/careers/[id]`
- Full career information
- Salary ranges, education requirements
- Skills needed
- Career path progression
- Related careers
- Book sessions with mentors

**4. Mentors** - `/mentors`
- Browse professional mentors
- Filter by expertise, rating
- View mentor profiles
- Book sessions

**5. Mentor Profile** - `/mentors/[id]`
- Mentor bio and expertise
- Rating and reviews
- Session booking
- Real-time chat
- View your sessions with this mentor
- Rate completed sessions (CRUD: Create, Edit, Delete ratings)

**6. Assessments** - `/assessments`
- Career guidance assessments
- View assessment history
- Retake assessments

**7. Assessment Flow** - `/assessment/questions`
- 5-question assessment
- Progress tracking
- Results with career matches

---

### Student Dashboard (Login Required)

**Dashboard** - `/dashboard/student`
- Overview of saved careers
- Upcoming sessions
- Assessment results
- Quick actions

---

### Mentor Dashboard (Login Required)

**Dashboard** - `/dashboard/mentor`
- Booking requests
- Confirmed sessions
- Completed sessions
- Quick stats

**Bookings** - `/dashboard/mentor/bookings`
- Pending requests (approve/decline)
- Confirmed sessions
- Past sessions with ratings
- Tabs for organization

**Notifications** - `/dashboard/mentor/notifications`
- Real-time notifications
- Mark as read
- Notification types: bookings, messages, system

**Settings** - `/dashboard/mentor/settings`
- Notification preferences
- Privacy settings
- Account management

**Profile** - `/dashboard/mentor/profile`
- Edit bio and expertise
- Manage availability
- Update profile photo

---

## 🧪 Testing the Platform

### Test as Student

**1. Sign Up:**
```
Go to http://localhost:3000/sign-up
→ Create account with email
→ Auto-assigned "student" role
```

**2. Explore Careers:**
```
/careers → Browse careers
→ Click career card → View details
→ Click bookmark icon → Save career
```

**3. Take Assessment:**
```
/assessments → Click "Start Assessment"
→ Answer 5 questions
→ View career recommendations
→ See results saved in history
```

**4. Book a Mentor:**
```
/mentors → Browse mentors
→ Click "Book Session" → Select time slot
→ Booking request sent (status: pending)
```

**5. View Your Bookings:**
```
/mentors/[mentorId] → See "Your Sessions" section
→ View pending/confirmed/completed sessions
→ After session completes → Rate mentor (5 stars + feedback)
→ Edit or delete your rating anytime
```

**6. Message a Mentor:**
```
/mentors/[mentorId] → Click "Message Mentor"
→ ChatDrawer opens
→ Send real-time messages
```

---

### Test as Mentor

**1. Switch Role:**
```
Use Convex dashboard to change user role to "mentor"
→ Or create new account and manually set role
```

**2. Manage Bookings:**
```
/dashboard/mentor/bookings → View requests
→ Click "Approve" or "Decline"
→ Session status updates in real-time
```

**3. View Notifications:**
```
/dashboard/mentor/notifications
→ See booking notifications
→ Mark as read
```

**4. Update Settings:**
```
/dashboard/mentor/settings
→ Toggle notification preferences
→ Saves to database automatically
```

**5. View Your Ratings:**
```
/mentors/[yourMentorId] → See your profile
→ View rating breakdown
→ Read student reviews
→ See average rating auto-calculated
```

---

## 🎨 Design System

**"Brutal" Design Language:**
- Thick black borders (3px)
- Bold shadows
- High contrast colors
- No rounded corners
- Uppercase headings

**Colors:**
```tsx
brutal-blue    // Primary actions
brutal-green   // Success states
brutal-yellow  // Highlights, CTAs
brutal-orange  // Warnings
brutal-pink    // Accents
brutal-purple  // Special elements
```

**Example Component:**
```tsx
<div className="border-3 border-black shadow-brutal-lg p-6 bg-white">
  <h2 className="text-2xl font-black uppercase mb-4">
    Session Booking
  </h2>
  <button className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
    Book Now
  </button>
</div>
```

---

## 🔧 Common Development Tasks

### Add Test Data

**Using Convex Dashboard:**
```bash
1. Go to dashboard.convex.dev
2. Select your project
3. Go to "Functions" tab
4. Run: seed.seedCareers()
5. Run: seed.seedProfessionals()
6. Run: seed.seedAssessments()
```

**Using Test Helpers:**
```bash
# Get current user ID
Query: testHelpers:getCurrentUser

# Create test completed session
Mutation: testHelpers:createTestCompletedSession
Args: {
  "studentUserId": "YOUR_ID",
  "mentorUserId": "MENTOR_ID"
}

# Create multiple test sessions
Mutation: testHelpers:createMultipleTestSessions
Args: {
  "studentUserId": "YOUR_ID",
  "count": 3
}
```

### View Database

```bash
# Open Convex dashboard
npx convex dashboard

# Or visit: https://dashboard.convex.dev
```

### Reset Database

```bash
# Clear all data and re-seed
npx convex run seed:clearAll
npx convex run seed:seedAll
```

### Check TypeScript Errors

```bash
npm run typecheck
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### Convex Not Connecting

```bash
# Restart Convex dev server
npx convex dev --once
npx convex dev
```

### Clerk Auth Not Working

**Check:**
1. Environment variables are set correctly
2. Clerk domain matches (localhost:3000)
3. API keys are from correct Clerk app

### Database Empty

```bash
# Run seed functions
npx convex run seed:seedCareers
npx convex run seed:seedProfessionals
```

### Can't See Ratings UI

**Requirements:**
- Must have a **completed** session with a mentor
- Session must be marked as complete
- Only then will "Rate Now" button appear

**To create test completed session:**
```bash
1. Go to Convex dashboard
2. Run: testHelpers:createTestCompletedSession
3. Pass your studentUserId and mentorUserId
4. Refresh mentor profile page
5. "Rate Now" button will appear
```

---

## 📚 Learn More

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [Convex Docs](https://docs.convex.dev)
- [Clerk Docs](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

**Project Docs:**
- [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) - Architecture overview
- [REMAINING_TASKS.md](./REMAINING_TASKS.md) - What's left to build
- [CHANGELOG.md](./CHANGELOG.md) - Recent updates

---

## 🎯 Next Steps

**After Setup:**
1. ✅ Explore the platform as a student
2. ✅ Test booking flow
3. ✅ Test rating system (create, edit, delete)
4. ✅ Test chat messaging
5. ✅ Check mentor dashboard

**To Contribute:**
1. Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
2. Check [REMAINING_TASKS.md](./REMAINING_TASKS.md)
3. Pick a task and start building!

---

**Happy coding! 🎉**

**Need help?** Check PROJECT_CONTEXT.md or ask in GitHub issues.
