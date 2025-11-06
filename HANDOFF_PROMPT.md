# 🔄 OpportunityMap - Session Handoff Prompt

**Copy everything below this line to start a new chat session:**

---

# CONTINUATION: OpportunityMap Development - Week 3-4

You're continuing development on **OpportunityMap**, a career guidance platform for Rwandan students built with Next.js 14 + Convex. The foundation is ~40% complete with 20 careers, a working assessment system, and mentor application workflow.

## 🚨 CRITICAL: Fix These Bugs First

### Bug 1: Assessment Results "No results found"
- **Where:** Student dashboard (`/dashboard/student`) when clicking "View Assessment Results"
- **Problem:** Students who completed assessments see "No results found" error
- **Debug:** Check `convex/assessments.ts` `getResults()` query - likely studentId mismatch or query filter issue
- **Fix:** Verify assessment results are being saved correctly and query uses proper user ID

### Bug 2: White Text Invisible on Pages
- **Where:** 
  - Assessment intro page (`app/assessment/page.tsx`) - Clock icon and "10 Minutes" text
  - Other pages with white-on-light backgrounds
- **Problem:** Text and icons rendering white on light backgrounds
- **Fix:** Add explicit `text-gray-900` or `text-black` classes, remove any unintended `text-white`

### Bug 3: Bookmarks/Saved Careers Broken
- **Where:** Career cards, student dashboard saved careers section
- **Problem:** Bookmark buttons don't save careers, saved careers list empty
- **Fix:** 
  1. Repair `convex/savedCareers.ts` with proper save/unsave/list mutations
  2. Wire up bookmark buttons on career cards
  3. Display saved careers in student dashboard

## 📋 Then Build These Features (in order)

### 1. Educator Dashboard (`app/dashboard/educator/page.tsx`)
**Deleted due to file corruption - needs clean rebuild**
- Student table with search filter
- Assessment completion status badges
- Top career interests bar chart
- Stats cards: total students, completed assessments, completion rate
- Quick action buttons: Analytics, Bulk Upload, Export

**Query needs:** 
- `useQuery(api.users.list)` filtered by role="student"
- `useQuery(api.assessments.getResults)` for matching results

### 2. Student Detail Page (`app/dashboard/educator/students/[id]/page.tsx`)
- Individual student profile with name, email, grade
- Assessment results display with RIASEC scores
- Top career matches from assessment
- Saved careers list
- Mentor booking history
- Optional: Teacher notes section

### 3. Bulk CSV Student Upload
- Create `convex/bulkOperations.ts` with `importStudents(csvData)` mutation
- CSV format: firstName, lastName, email, gradeLevel, school
- Add file upload button to educator dashboard
- Parse CSV, create user + studentProfile records
- Return list of created students with credentials

### 4. Analytics Page (`app/dashboard/educator/analytics/page.tsx`)
- Most popular careers chart (bar chart)
- Assessment completion over time (line chart)
- Top 10 saved careers (horizontal bar)
- Stats: total assessments, average completion time, mentor bookings
- Export PDF button

### 5. Student Dashboard Enhancements
- Add "Recommended For You" section (careers 6-15 from assessment)
- Show mentor session history table
- Add career comparison feature (select 2-3 careers, side-by-side table)

### 6. Fix relatedCareerIds
- Career records use placeholder strings ("career-1", "career-2")
- Update to use actual database IDs after seeding
- Create utility function `updateRelatedCareerIds()` in seed.ts

## 🛠️ Technical Setup

**Stack:**
- Next.js 14.1.0 on `localhost:3001`
- Convex backend at `aromatic-sturgeon-922.convex.cloud`
- TypeScript strict mode
- Clerk auth with role-based access

**Design System:**
- Neobrutalism: Bold 3px black borders, dramatic shadows
- Touch targets: 44x44px minimum
- High contrast colors

**Database Tables:**
- users, studentProfiles, careers (20), professionals (4), mentorApplications
- assessments (1 clean 12-question), assessmentResults, savedCareers
- careerChats, companies

**Seed Commands:**
```powershell
npx convex run seed:clearCareers        # Delete all careers
npx convex run seed:refreshAssessments  # Clean assessments
npx convex run seed:seedAll             # Populate database
```

## ✅ What's Already Working

- ✅ 20 Rwanda-specific careers with full details
- ✅ 12-question RIASEC assessment with matching algorithm
- ✅ Mentor application form (`/mentors/apply`) → Convex backend
- ✅ Admin dashboard (`/dashboard/admin`) for reviewing applications
- ✅ Career library, detail pages, search
- ✅ Student registration and profiles

## 📍 File Locations

**Completed files (don't modify unless fixing bugs):**
- `convex/seed.ts` - 20 careers, cleanup functions
- `convex/mentorApplications.ts` - Full CRUD for applications
- `app/mentors/apply/page.tsx` - 3-step functional form
- `app/dashboard/admin/page.tsx` - Admin approval interface
- `convex/schema.ts` - All tables defined

**Files to fix:**
- `convex/savedCareers.ts` - Broken bookmark functionality
- `app/dashboard/student/page.tsx` - Assessment results error
- `app/assessment/page.tsx` - White text visibility

**Files to create:**
- `app/dashboard/educator/page.tsx` (deleted, needs rebuild)
- `app/dashboard/educator/students/[id]/page.tsx`
- `convex/bulkOperations.ts`
- `app/dashboard/educator/analytics/page.tsx`

## 🎯 Success Criteria

When you're done:
- [ ] All 3 bugs fixed and tested
- [ ] Educator dashboard functional with real student data
- [ ] Student detail page showing assessment results
- [ ] CSV bulk upload working
- [ ] Analytics page with charts
- [ ] Student dashboard enhanced
- [ ] No TypeScript errors
- [ ] All features tested on localhost:3001

**Estimated time:** 8-12 hours focused development

---

**Start here:** Fix the 3 critical bugs, then message me for review before building new features.

**Reference:** See `DEVELOPMENT_ROADMAP.md` for detailed task breakdown.
