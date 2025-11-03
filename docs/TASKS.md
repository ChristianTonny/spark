# OpportunityMap - Task Tracker

**Last Updated:** November 3, 2025  
**Current Phase:** UI Development - Adding Interactivity  
**Next Milestone:** Complete interactive UI with mock data

---

## 🎯 Current Sprint: Making UI Interactive

**Goal:** Transform static UI into functional interfaces with user interactions (no backend yet)

### Priority Legend
- 🔴 **Critical** - Blocking progress, do first
- 🟡 **High** - Core functionality, do soon
- 🟢 **Medium** - Important but not urgent
- 🔵 **Low** - Nice to have, do later

---

## 📋 Active Tasks

### 🔴 Critical (Do First)

#### Career Detail Pages
- [ ] **Create `/app/careers/[id]/page.tsx`**
  - Status: Not started
  - Priority: Critical
  - Description: Individual career page with full details
  - Requirements:
    - Hero section with career title, category badge, short description
    - Video player (embedded YouTube/Vimeo or placeholder)
    - Key info grid: Salary, Education, Location, Experience
    - "Day in the Life" section
    - Required skills list
    - Career path timeline (visual progression)
    - Available mentors section (cards with "Book Chat" button)
    - Related careers carousel
    - "Save Career" and "Book Chat" CTA buttons
  - Design: Follow neobrutalist style from GUIDE.md
  - Reference: See GUIDE.md Section 4.2 - Feature 1

#### Career Bookmarking
- [ ] **Add bookmark functionality to career cards**
  - Status: Not started
  - Priority: Critical
  - Description: Users can save/unsave careers
  - Requirements:
    - Bookmark icon on career cards (heart or bookmark icon)
    - Toggle saved state on click (visual feedback)
    - Store saved careers in localStorage (for now)
    - Show visual feedback (animation, color change)
    - Update count in real-time
  - Files to edit:
    - `app/careers/page.tsx` - Add bookmark button to cards
    - Create `lib/bookmarks.ts` - Helper functions for localStorage

#### Career Filters & Search
- [ ] **Make search and filters functional**
  - Status: Not started
  - Priority: Critical
  - Description: Search and filter careers by multiple criteria
  - Requirements:
    - Search by keyword (name, description)
    - Filter by category (dropdown)
    - Filter by salary range (slider or select)
    - Filter by education level (checkboxes)
    - Clear filters button
    - Show result count
    - Handle empty states
  - Files to edit:
    - `app/careers/page.tsx` - Add filter logic
    - `lib/data.ts` - Ensure career data has all filterable fields

---

### 🟡 High Priority (Do Soon)

#### Mentor Booking Integration
- [ ] **Integrate Calendly for mentor booking**
  - Status: Not started
  - Priority: High
  - Description: Allow students to book 15-min sessions with mentors
  - Requirements:
    - Add Calendly link to each mentor in `lib/data.ts`
    - "Book Session" button opens Calendly modal or new tab
    - Show availability status (available/busy)
    - Add success message after booking
    - Handle edge cases (no availability, etc.)
  - Implementation:
    - Use Calendly embed or direct link
    - Add `calendlyUrl` field to mentor data
    - Create booking modal component
  - Files to edit:
    - `app/mentors/page.tsx` - Add booking button
    - `lib/data.ts` - Add Calendly URLs to mentors
    - Create `components/calendly-modal.tsx`

#### Mentor Search & Filters
- [ ] **Make mentor search and filters functional**
  - Status: Not started
  - Priority: High
  - Description: Search and filter mentors by expertise
  - Requirements:
    - Search by name or expertise
    - Filter by career field
    - Filter by availability
    - Show result count
    - Handle empty states
  - Files to edit:
    - `app/mentors/page.tsx` - Add filter logic

#### Assessment History
- [ ] **Show previous assessment results**
  - Status: Not started
  - Priority: High
  - Description: Users can view past assessments and retake them
  - Requirements:
    - Store completed assessments in localStorage
    - Display list of past assessments on `/assessments` page
    - Show completion date and top career match
    - "View Results" button to see full results
    - "Retake Assessment" button to start over
    - Handle empty state (no assessments taken)
  - Files to edit:
    - `app/assessments/page.tsx` - Add history section
    - `app/assessment/results/page.tsx` - Save results to localStorage
    - Create `lib/assessment-storage.ts` - Helper functions

---

### 🟢 Medium Priority (Important)

#### Assessment Navigation
- [ ] **Add proper navigation between questions**
  - Status: Not started
  - Priority: Medium
  - Description: Users can go back/forward through questions
  - Requirements:
    - "Previous" button (disabled on first question)
    - "Next" button (enabled after answering)
    - "Finish" button on last question
    - Progress bar updates correctly
    - Answers are preserved when navigating
    - Store progress in sessionStorage
  - Files to edit:
    - `app/assessment/questions/page.tsx` - Add navigation logic

#### Career Recommendations
- [ ] **Add "Related Careers" section**
  - Status: Not started
  - Priority: Medium
  - Description: Suggest similar careers on detail page
  - Requirements:
    - Show 3-4 related careers at bottom of detail page
    - Match by category or required skills
    - Same card design as career library
    - Click to navigate to that career
  - Files to edit:
    - `app/careers/[id]/page.tsx` - Add recommendations section
    - Create recommendation algorithm in `lib/recommendations.ts`

#### Loading States
- [ ] **Add loading states to all interactions**
  - Status: Not started
  - Priority: Medium
  - Description: Show feedback during async operations
  - Requirements:
    - Skeleton loaders for cards
    - Spinner on buttons during actions
    - Progress bars for multi-step flows
    - Smooth transitions
  - Files to edit:
    - All pages with user interactions
    - Create `components/loading-skeleton.tsx`

#### Error Handling
- [ ] **Add error states and messages**
  - Status: Not started
  - Priority: Medium
  - Description: Handle edge cases gracefully
  - Requirements:
    - Empty states (no results, no saved items)
    - Error messages (network issues, invalid input)
    - 404 pages for invalid routes
    - Retry buttons where applicable
  - Files to edit:
    - All pages
    - Create `components/empty-state.tsx`
    - Create `components/error-message.tsx`

---

### 🔵 Low Priority (Nice to Have)

#### Animations & Transitions
- [ ] **Add micro-interactions and animations**
  - Status: Not started
  - Priority: Low
  - Description: Polish UI with smooth animations
  - Requirements:
    - Hover effects on cards and buttons
    - Page transition animations
    - Bookmark animation (heart fills up)
    - Filter slide-in/out
    - Toast notifications
  - Files to edit:
    - All pages
    - Update `globals.css` with animation utilities

#### Mobile Optimization
- [ ] **Test and optimize for mobile devices**
  - Status: Not started
  - Priority: Low
  - Description: Ensure everything works on small screens
  - Requirements:
    - Test on 375px width
    - Fix any layout issues
    - Optimize touch targets (44x44px)
    - Test gesture interactions
    - Optimize performance
  - Testing:
    - Use Chrome DevTools mobile emulator
    - Test on real devices if possible

#### Keyboard Navigation
- [ ] **Add keyboard shortcuts and accessibility**
  - Status: Not started
  - Priority: Low
  - Description: Make site fully keyboard accessible
  - Requirements:
    - Tab through all interactive elements
    - Enter to activate buttons
    - Escape to close modals
    - Arrow keys for navigation
    - Focus indicators visible
  - Files to edit:
    - All interactive components

---

## ✅ Completed Tasks

### Week 1 (Completed)
- ✅ **Landing Page** - Hero, features, testimonials (Nov 1)
- ✅ **Career Library Grid** - Card layout with visual filters (Nov 1)
- ✅ **Assessment Intro** - Overview page with CTA (Nov 2)
- ✅ **Assessment Flow** - 15 questions with progress bar (Nov 2)
- ✅ **Assessment Results** - Top 5 career matches (Nov 2)
- ✅ **Mentors Page** - Grid of mentor cards (Nov 2)
- ✅ **Navigation** - Responsive header with mobile menu (Nov 1)
- ✅ **Authentication Pages** - Login, signup, password reset (Nov 3)
- ✅ **Design System** - Neobrutalist theme with Tailwind (Nov 1)

### Bug Fixes
- ✅ **Fixed ESLint errors** - Unescaped apostrophes/quotes in JSX (Nov 3)
- ✅ **Fixed career indices** - Assessment results crash (Nov 2)
- ✅ **Fixed 404 errors** - Created /assessments and /mentors pages (Nov 2)
- ✅ **Fixed alignment issues** - Career page layout (Nov 2)

### Deployment
- ✅ **Deployed to Vercel** - Production build successful (Nov 3)

---

## 🗓️ Sprint Planning

### Sprint 1: Core Interactions (Nov 4-8)
**Goal:** Make careers, assessments, and mentors fully interactive

**Must Complete:**
1. Career detail pages
2. Career bookmarking
3. Career search/filters
4. Mentor booking (Calendly)
5. Assessment history

**Nice to Have:**
- Assessment navigation
- Loading states
- Error handling

### Sprint 2: Polish & Edge Cases (Nov 11-15)
**Goal:** Handle edge cases and polish UI

**Must Complete:**
1. All error states
2. All empty states
3. All loading states
4. Mobile optimization
5. Career recommendations

**Nice to Have:**
- Animations
- Keyboard navigation
- Performance optimization

### Sprint 3: Dashboard & Profile (Nov 18-22)
**Goal:** Build student dashboard and profile pages

**Must Complete:**
1. Student dashboard redesign (OpportunityMap style)
2. Saved careers page
3. Profile page
4. Settings page
5. Assessment history page

---

## 📊 Progress Metrics

### Overall Progress: ~35%

**UI Design:** 70% complete
- ✅ Landing page
- ✅ Career library (visual)
- ✅ Assessments (visual)
- ✅ Mentors (visual)
- ⏳ Career detail pages (0%)
- ⏳ Student dashboard (needs redesign)

**Interactivity:** 10% complete
- ❌ Bookmarking (0%)
- ❌ Search/filters (0%)
- ❌ Calendly integration (0%)
- ❌ Assessment history (0%)
- ❌ Navigation improvements (0%)

**Backend:** 0% complete
- Not started (planned for later)

---

## 🐛 Known Issues

### High Priority
1. **Career indices out of bounds** - ✅ FIXED (Nov 2)
2. **404 on /assessments and /mentors** - ✅ FIXED (Nov 2)
3. **ESLint errors blocking deployment** - ✅ FIXED (Nov 3)

### Medium Priority
- None currently

### Low Priority
- Old Spark features (content, practice, questions) need removal or redesign

---

## 📝 Notes & Decisions

### Technical Decisions
- **No backend yet:** Using localStorage and mock data for all state
- **UI-first approach:** Perfect interfaces before adding database
- **Calendly for booking:** External service, no custom calendar needed
- **Assessment storage:** localStorage until backend is ready
- **Neobrutalist design:** Thick borders, solid shadows, high contrast

### Design Decisions
- **Mobile-first:** Design for 375px, scale up
- **Touch-optimized:** 44x44px minimum touch targets
- **High contrast:** Accessible in bright sunlight
- **Bold typography:** Clear hierarchy, large readable text
- **Minimal animations:** Fast, snappy, not distracting

### Future Considerations
- Backend will use Convex (planned)
- Real-time features for notifications
- Video hosting for career videos
- Analytics for tracking user engagement
- Admin dashboard for content management

---

## 🔗 Quick Links

- **Main Guide:** `docs/GUIDE.md` - Complete development specifications
- **README:** `README.md` - Project overview and setup
- **Design System:** `app/globals.css` - Neobrutalist theme
- **Mock Data:** `lib/data.ts` - All careers, mentors, questions
- **Repository:** github.com/ChristianTonny/spark
- **Deployment:** https://spark-learning-ptj3vzlsi-irachrist1s-projects.vercel.app

---

## 📞 Questions or Blockers?

**Stuck on a task?** Check:
1. GUIDE.md Section 4.2 for feature specifications
2. GUIDE.md Section 7 for UI component specs
3. Existing code patterns in similar pages
4. shadcn/ui docs for component usage

**Need clarification?** Ask:
- What's the ONE thing this feature helps users do?
- Can I simplify this further?
- Does this match the neobrutalist design?
- Would Steve Jobs approve? 😄

---

**Remember:** We're building the UI first. Focus on making it beautiful and functional with mock data. Backend comes later!
