# OPPORTUNITYMAP - COMPLETE DEVELOPMENT GUIDE

## READ THIS FIRST

### Your Mission
Transform the existing Spark Learning Platform into OpportunityMap - a career discovery platform. We're taking a **UI-first approach**. Build beautiful, functional interfaces before touching the database.

### Design Philosophy: Apple Minimalism
Think **Steve Jobs**. Every pixel matters. Remove anything that doesn't serve a clear purpose.

**Core principles:**
- **Simple** - One primary action per screen
- **Clear** - Obvious what to do next
- **Beautiful** - Clean, spacious, high contrast
- **Fast** - No loading spinners if avoidable
- **Intuitive** - My grandmother should understand it

**Visual style:**
- Generous white space
- Large, clear typography (16px minimum)
- High contrast (#000000 on #FFFFFF is your friend)
- Subtle shadows (not dramatic)
- Rounded corners (8px standard)
- Minimal color palette (2-3 colors max per screen)
- Touch-friendly (44x44px minimum)

### What You're Building

**OpportunityMap** helps students discover careers through:
1. **Career Library** - Browse 100+ careers with videos, salaries, requirements
2. **Career Chats** - Book 15-min video calls with professionals
3. **Assessments** - Discover careers matching your interests/skills
4. **Pathways** - See exact steps from high school to dream career

### Development Approach

**Phase 1: UI Only (Weeks 1-4)**
- Build all interfaces with mock data
- Make everything pixel-perfect
- Test on mobile devices
- No database, no API calls
- Hard-code realistic data in components

**Phase 2: Backend with Convex (Weeks 5-6)**
- Once UI is perfect, add Convex
- Connect components to real data
- Implement authentication
- Deploy to production

### Starting Point

You have an existing Next.js 14 codebase (Spark) that you'll transform:
- **Keep:** Authentication UI, component library, design system, layout structure
- **Transform:** Content → Careers, Q&A → Chats, Tests → Assessments
- **Add:** Company dashboard, booking system, pathway viewer

### Your First Week

**Day 1-2: Career Library**
- Create `/app/careers/page.tsx` - grid of career cards
- Create `/app/careers/[id]/page.tsx` - career detail with video
- Use mock data (10 careers)
- Make it gorgeous

**Day 3-4: Career Detail**
- Add salary, education, skills display
- Add "Save Career" button (visual only)
- Add professional cards (people you can chat with)
- Add "Book Chat" button

**Day 5: Polish**
- Test on mobile
- Fix spacing, typography
- Add hover states, transitions
- Get it production-ready looking

### Code Quality Standards

**Component structure:**
```typescript
// ✅ GOOD - Simple, focused, typed
interface CareerCardProps {
  career: {
    id: string;
    title: string;
    salary: string;
    category: string;
  };
}

export function CareerCard({ career }: CareerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{career.title}</h3>
      <p className="text-gray-600">{career.salary}</p>
    </Card>
  );
}

// ❌ BAD - Too complex, unclear
export function Card(props: any) {
  return <div className="card-wrapper-container-component">...</div>
}
```

**File organization:**
```
app/careers/
  page.tsx              # Main browse page
  [id]/page.tsx         # Detail page
  components/
    career-card.tsx     # Reusable card
    career-filters.tsx  # Filter controls
```

**Styling:**
- Use Tailwind utility classes
- No custom CSS unless absolutely necessary
- Consistent spacing (4, 8, 16, 24, 32px)
- Mobile-first responsive

### Questions to Ask Yourself

Before writing any component:
1. What's the ONE thing this screen helps user do?
2. Can I remove ANYTHING and still accomplish that?
3. Would Steve Jobs approve?
4. Does it work on a 375px screen?
5. Can my mom use it without instructions?

### When You're Stuck

1. Look at the existing Spark code for patterns
2. Check the design system in `app/globals.css`
3. Browse shadcn/ui docs for components
4. Think: "What would Apple do?"
5. Ask: "Is this the simplest version?"

### Success Looks Like

After Week 1, I should be able to:
- Browse beautiful career cards
- Click into detailed career view
- See salary, education, requirements clearly
- Watch a (mock) video
- See professionals I could chat with
- Everything looks production-ready

After Week 4 (all UI complete):
- Every screen is pixel-perfect
- All interactions work smoothly
- Looks better than Khan Academy
- Works flawlessly on mobile
- Ready to show investors

### Remember

- **UI first, backend later**
- **Quality over speed**
- **Simple over clever**
- **User over developer**
- **Mobile is primary**

Now read the rest of this document for complete specifications. Start with Section 3 (UI/UX Design) and Section 4 (System Features).

Go build something beautiful! 🚀

---

# TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Software Development Model](#2-software-development-model)
3. [UI/UX Design Philosophy](#3-uiux-design-philosophy)
4. [System Features & Requirements](#4-system-features--requirements)
5. [Software Requirements Specification](#5-software-requirements-specification)
6. [UML Diagrams](#6-uml-diagrams)
7. [UI Component Specifications](#7-ui-component-specifications)
8. [Implementation Roadmap](#8-implementation-roadmap)
9. [Appendices](#9-appendices)

---

# 1. PROJECT OVERVIEW

## 1.1 Executive Summary

**OpportunityMap** is a career discovery platform designed to solve a critical problem in Rwanda's education system: students don't fail because they lack access to learning content—they fail because they don't know what careers exist or why education matters.

While multiple platforms (Andela, Umurava, kLab, FabLab) focus on training, **zero platforms** address career awareness. OpportunityMap fills this gap by connecting high school students with career information, professional mentors, and clear educational pathways.

## 1.2 Problem Statement

In Rwanda, high school students face a motivation crisis:
- **75%+ rural students fail** national exams not due to lack of ability, but lack of direction
- Students study subjects without understanding career applications
- **Zero visibility** into what careers exist beyond doctor, teacher, engineer
- No way to connect with professionals to learn about career realities
- Parents and teachers lack resources to provide career guidance

**Root cause:** Information gap, not skill gap.

## 1.3 Solution Overview

OpportunityMap provides four core services:

1. **Career Library** (100+ careers)
   - Day-in-the-life videos
   - Salary ranges in RWF
   - Education requirements
   - Skills needed
   - Career progression paths

2. **Career Assessments**
   - Interest-based matching
   - Skills identification
   - Values alignment
   - Personality fit

3. **Professional Chats**
   - 15-minute video calls
   - Book with working professionals
   - Ask real questions
   - Get career insights

4. **Educational Pathways**
   - Step-by-step from O-Level to career
   - Schools offering programs
   - Cost estimates
   - Admission requirements

## 1.4 Target Users

### Primary Users
- **Students** (Ages 12-25, O-Level & A-Level)
  - Exploring career options
  - Taking assessments
  - Booking career chats
  - Planning education paths

### Supporting Users
- **Industry Partners** (Professionals sharing career insights)
- **Career Mentors** (Conducting paid 15-min chats)
- **Companies** (Sponsoring careers, building talent pipeline)
- **Schools** (Subscribing for student access)

## 1.5 Business Model

### Revenue Streams (B2B Focus)

**Company Sponsorships:** $2,000/year
- Sponsor career profiles
- Featured search placement
- Student engagement analytics
- Talent pipeline access

**School Subscriptions:** $5-10/student/year
- Basic: Career library access
- Premium: + Assessments + Career chats

**Professional Credits:** $10-20/chat
- Mentors earn for 15-min chats
- Paid by platform or companies

**Year 1 Target:** $126,000+ ARR

## 1.6 Competitive Advantage

| Competitors | Limitation | OpportunityMap |
|-------------|-----------|----------------|
| Andela | Training focus | Career discovery focus |
| Umurava | Job placement | Career exploration |
| kLab/FabLab | Technical training | All career types |
| Career counselors | Expensive, limited | Scalable, affordable |
| LinkedIn | Not for students | Built for students |

**Key differentiator:** Only platform solving career awareness in Rwanda.

---

# 2. SOFTWARE DEVELOPMENT MODEL

## 2.1 Selected Model: UI-First Agile

### Rationale

Traditional development builds database-first. We're inverting this:
1. **Build beautiful UI with mock data** (Weeks 1-4)
2. **Add backend when UI is perfect** (Weeks 5-6)

**Why:**
- UI defines user experience
- Backend serves UI, not vice versa
- Faster feedback loops
- Better investor demos
- Easier to pivot if needed

### Development Phases

```
┌─────────────────────────────────────────────┐
│ PHASE 1: UI ONLY (Weeks 1-4)               │
├─────────────────────────────────────────────┤
│ Week 1: Career Library                      │
│ Week 2: Assessments                         │
│ Week 3: Chat Booking                        │
│ Week 4: Dashboards & Polish                 │
│                                             │
│ Deliverable: Pixel-perfect, fully          │
│ navigable interface with mock data          │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ PHASE 2: BACKEND (Weeks 5-6)               │
├─────────────────────────────────────────────┤
│ Week 5: Convex Setup & Data Models         │
│ Week 6: Connect UI to Real Data            │
│                                             │
│ Deliverable: Fully functional platform     │
│ with authentication & real data            │
└─────────────────────────────────────────────┘
```

## 2.2 Sprint Structure

### Two-Week Sprints

**Sprint 1 (Weeks 1-2): Discovery Features**
- Career library browse
- Career detail pages
- Assessment list
- Assessment taking flow

**Sprint 2 (Weeks 3-4): Connection Features**
- Chat booking interface
- Schedule management
- All four dashboards
- Final UI polish

**Sprint 3 (Weeks 5-6): Backend Integration**
- Convex setup
- Authentication
- Data persistence
- Deployment

### Daily Workflow

**Morning (9am-12pm):** Build new features
**Afternoon (2pm-5pm):** Polish, test, review
**Evening:** Push code, update tracker

## 2.3 Quality Standards

### Definition of Done (UI Phase)

For any feature to be "done":
- [ ] Works on mobile (375px width)
- [ ] Works on tablet (768px width)
- [ ] Works on desktop (1440px width)
- [ ] All interactions have hover/active states
- [ ] Loading states designed (even if not functional)
- [ ] Error states designed
- [ ] Empty states designed
- [ ] Typography is consistent
- [ ] Spacing is consistent (4px grid)
- [ ] Colors match design system
- [ ] Touch targets are 44x44px minimum
- [ ] Passes manual accessibility check

### Code Review Checklist

- [ ] Component has single responsibility
- [ ] Props are typed with TypeScript
- [ ] No magic numbers (use constants)
- [ ] Tailwind classes, not custom CSS
- [ ] Reuses existing components where possible
- [ ] File is <200 lines of code
- [ ] Function names are self-documenting

---

# 3. UI/UX DESIGN PHILOSOPHY

## 3.1 Core Principles

### Simplicity
"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." - Antoine de Saint-Exupéry

**In practice:**
- One primary action per screen
- Remove decorative elements
- Use white space generously
- Hide complexity behind progressive disclosure

### Clarity
Users should never wonder what to do next.

**In practice:**
- Large, clear headings
- Obvious buttons
- Visible CTAs
- Descriptive labels
- No jargon

### Hierarchy
Guide the eye through visual weight.

**In practice:**
- Largest text = most important
- Bold = emphasis
- Color = primary actions
- Gray = secondary info

### Consistency
Same patterns everywhere.

**In practice:**
- Buttons look the same everywhere
- Card styles are reused
- Spacing follows 4px grid
- Colors come from design system

## 3.2 Design System

### Colors

```css
/* Primary - Actions & Links */
--opportunity-blue: #2563EB;
--opportunity-blue-dark: #1E40AF;
--opportunity-blue-light: #DBEAFE;

/* Success - Confirmations */
--opportunity-green: #10B981;
--opportunity-green-light: #D1FAE5;

/* Warning - Important Info */
--opportunity-orange: #F59E0B;
--opportunity-orange-light: #FEF3C7;

/* Accent - Highlights */
--opportunity-purple: #8B5CF6;
--opportunity-purple-light: #EDE9FE;

/* Neutrals */
--gray-50: #F9FAFB;    /* Backgrounds */
--gray-100: #F3F4F6;   /* Subtle backgrounds */
--gray-200: #E5E7EB;   /* Borders */
--gray-400: #9CA3AF;   /* Disabled text */
--gray-600: #4B5563;   /* Secondary text */
--gray-900: #111827;   /* Primary text */

/* Semantic */
--text-primary: var(--gray-900);
--text-secondary: var(--gray-600);
--text-disabled: var(--gray-400);
--bg-primary: #FFFFFF;
--bg-secondary: var(--gray-50);
--border: var(--gray-200);
```

### Typography

```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

/* Font Sizes */
--text-xs: 12px;    /* Captions */
--text-sm: 14px;    /* Secondary text */
--text-base: 16px;  /* Body text */
--text-lg: 18px;    /* Emphasized text */
--text-xl: 20px;    /* Subheadings */
--text-2xl: 24px;   /* Card headings */
--text-3xl: 30px;   /* Page headings */
--text-4xl: 36px;   /* Hero headings */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body */
--leading-relaxed: 1.75; /* Large text */
```

### Spacing

All spacing follows 4px base unit:

```
4px   = gap-1    (tight spacing)
8px   = gap-2    (compact spacing)
12px  = gap-3    (default spacing)
16px  = gap-4    (comfortable spacing)
24px  = gap-6    (section spacing)
32px  = gap-8    (large spacing)
48px  = gap-12   (extra large spacing)
64px  = gap-16   (massive spacing)
```

### Shadows

```css
/* Subtle elevation */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Card elevation */
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Hover elevation */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* Modal/dropdown elevation */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

### Border Radius

```css
--radius-sm: 4px;   /* Tight corners */
--radius: 8px;      /* Standard (use everywhere)*/
--radius-lg: 12px;  /* Emphasized cards */
--radius-full: 9999px; /* Pills, avatars */
```

## 3.3 Mobile-First Approach

### Design for 375px First

**Why:** Majority of Rwandan users access via mobile.

**Breakpoints:**
```
Mobile:  375px - 639px  (design for this)
Tablet:  640px - 1023px (adapt from mobile)
Desktop: 1024px+        (enhance from tablet)
```

### Touch Targets

All interactive elements: **44x44px minimum**

```tsx
// ✅ GOOD
<button className="h-11 px-6">Book Chat</button>

// ❌ BAD
<button className="h-8 px-3">Book Chat</button>
```

### Mobile Patterns

**Navigation:**
- Bottom tab bar (not top)
- Large, thumb-friendly targets
- No hover states (use active)

**Forms:**
- One column always
- Large input fields
- Labels above inputs
- Clear keyboard types

**Cards:**
- Full width on mobile
- 2 columns on tablet
- 3 columns on desktop

## 3.4 Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Keyboard Navigation:**
- Tab through all interactive elements
- Visible focus indicators
- Skip links for main content

**Screen Readers:**
- Semantic HTML (h1, nav, main, etc.)
- Alt text for images
- ARIA labels where needed

### Testing Checklist

- [ ] Can navigate with keyboard only
- [ ] Focus indicators are visible
- [ ] Images have alt text
- [ ] Buttons have descriptive labels
- [ ] Form inputs have labels
- [ ] Color isn't the only indicator

---

# 4. SYSTEM FEATURES & REQUIREMENTS

## 4.1 Feature Overview

### Feature Priority Matrix

```
┌─────────────────────────────────────────────┐
│ HIGH PRIORITY (MVP)                         │
├─────────────────────────────────────────────┤
│ • Career Library (browse & detail)          │
│ • Career Chat Booking                       │
│ • Student Dashboard                         │
│ • Authentication (login/signup)             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ MEDIUM PRIORITY (Launch)                    │
├─────────────────────────────────────────────┤
│ • Career Assessments                        │
│ • Industry Partner Dashboard                │
│ • Career Mentor Dashboard                   │
│ • Save Careers                              │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ LOW PRIORITY (Post-Launch)                  │
├─────────────────────────────────────────────┤
│ • Company Dashboard                         │
│ • Educational Pathways                      │
│ • Advanced Analytics                        │
│ • SMS Notifications                         │
└─────────────────────────────────────────────┘
```

## 4.2 Feature Specifications

### Feature 1: Career Library

**Purpose:** Help students explore careers they never knew existed

**User Story:**
> "As a student, I want to browse different careers so I can discover options beyond doctor and teacher."

**Screens:**

1. **Career Browse** (`/app/careers/page.tsx`)
   - Grid of career cards (3 cols desktop, 2 tablet, 1 mobile)
   - Filter by category (Tech, Healthcare, Business, etc.)
   - Filter by salary range
   - Filter by education level
   - Search by keyword
   - Each card shows: title, category, salary range, thumbnail

2. **Career Detail** (`/app/careers/[id]/page.tsx`)
   - Hero section: title, short description, category badge
   - Video player: day-in-the-life (2-3 min)
   - Key info grid: salary, education, location, experience
   - Full description section
   - Skills required (badges)
   - Career path timeline (entry → senior → lead)
   - Professionals available (cards with "Book Chat" button)
   - Related careers (3-4 cards)
   - Sponsored by (company logo if applicable)
   - Action buttons: Save Career, Book Chat, View Pathway

**Mock Data Structure:**
```typescript
interface Career {
  id: string;
  title: string; // "Software Developer"
  category: string; // "Technology"
  shortDescription: string; // "Build applications..."
  fullDescription: string;
  videoUrl: string; // YouTube embed
  videoThumbnail: string;
  salaryMin: number; // 5000000
  salaryMax: number; // 10000000
  currency: string; // "RWF"
  requiredEducation: string; // "Bachelor's Degree"
  requiredSkills: string[]; // ["JavaScript", "Problem Solving"]
  careerPath: Array<{
    stage: string; // "Junior Developer"
    yearsExperience: string; // "0-2 years"
    salary: string; // "5-7M RWF"
  }>;
  professionalsAvailable: Array<{
    id: string;
    name: string;
    company: string;
    avatar: string;
    rating: number;
    chatsCompleted: number;
  }>;
  relatedCareers: string[]; // Career IDs
  sponsoredBy?: {
    companyName: string;
    companyLogo: string;
  };
}
```

**UI Components:**
- `CareerCard` - Preview card with hover effect
- `CareerFilters` - Dropdown filters and search
- `CareerVideoPlayer` - Embedded video with controls
- `CareerKeyInfo` - 4-grid showing salary, edu, location, experience
- `CareerPathTimeline` - Visual progression
- `ProfessionalCard` - Mini profile card
- `RelatedCareersGrid` - 3-4 career cards

---

### Feature 2: Career Chat Booking

**Purpose:** Connect students with working professionals for 15-min career conversations

**User Story:**
> "As a student interested in nursing, I want to talk to a real nurse so I can understand what the job is really like."

**Screens:**

1. **Booking Flow** (`/app/chats/book/[careerId]/page.tsx`)
   
   **Step 1: Choose Professional**
   - Display 3-6 professionals available for this career
   - Each card shows: photo, name, company, job title, rating, chats completed
   - Click to select (highlight selected card)
   
   **Step 2: Select Date & Time**
   - Calendar showing available dates
   - Time slots for selected date
   - Duration: 15 minutes (fixed)
   - Timezone: Kigali (fixed)
   
   **Step 3: Confirm**
   - Review: professional, date, time, career
   - Confirm button
   - Success: "Chat booked! Check your email."

2. **My Schedule** (`/app/chats/schedule/page.tsx`)
   - **Upcoming:** List of scheduled chats with countdown
   - **Past:** List of completed chats with rating option
   - Each item shows: date, time, professional, career, "Join" button (if within 5 min of start)

3. **Chat Room** (`/app/chats/[chatId]/page.tsx`)
   - Video interface (Jitsi embed)
   - Chat info: professional name, career, time remaining
   - End chat button
   - Redirect to feedback after 15 minutes

4. **Feedback** (`/app/chats/[chatId]/feedback/page.tsx`)
   - Rate experience (1-5 stars)
   - Comment (optional)
   - Submit button
   - Thank you message

**Mock Data Structure:**
```typescript
interface CareerChat {
  id: string;
  studentId: string;
  professionalId: string;
  careerId: string;
  scheduledAt: Date; // ISO string
  duration: number; // 15
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingUrl?: string; // Jitsi URL
  rating?: number; // 1-5
  feedback?: string;
}

interface Professional {
  id: string;
  name: string;
  avatar: string;
  company: string;
  jobTitle: string;
  careerIds: string[]; // Careers they can discuss
  rating: number; // Average
  chatsCompleted: number;
  availability: Array<{
    dayOfWeek: number; // 0-6
    startTime: string; // "09:00"
    endTime: string; // "17:00"
  }>;
}
```

**UI Components:**
- `ProfessionalCard` - Selectable card with selection state
- `BookingCalendar` - Calendar with available dates highlighted
- `TimeSlotPicker` - Grid of available time slots
- `BookingSummary` - Review before confirming
- `ChatScheduleItem` - Upcoming/past chat item
- `VideoInterface` - Jitsi embed wrapper
- `RatingStars` - Interactive star rating

---

### Feature 3: Career Assessments

**Purpose:** Help students discover careers matching their interests, skills, and values

**User Story:**
> "As a student who doesn't know what career to pursue, I want to take a quiz so I can discover careers that match my personality."

**Screens:**

1. **Assessment List** (`/app/assessments/page.tsx`)
   - 4 assessment cards:
     - Interest Assessment (❤️)
     - Skills Assessment (💪)
     - Values Assessment (⭐)
     - Personality Assessment (🎭)
   - Each shows: title, description, duration, question count
   - "Take Assessment" button

2. **Take Assessment** (`/app/assessments/[id]/page.tsx`)
   - Progress bar (Question X of Y)
   - Question card (large, centered)
   - Answer options (buttons or scale)
   - Previous / Next navigation
   - Can't proceed without answering
   - "Finish" on last question

3. **Results** (`/app/assessments/results/[id]/page.tsx`)
   - Top 5 career matches with % match
   - Score breakdown (chart)
   - "Explore Top Match" button
   - "Retake Assessment" button
   - "Download Results" button

**Mock Data Structure:**
```typescript
interface Assessment {
  id: string;
  type: 'interests' | 'skills' | 'values' | 'personality';
  title: string;
  description: string;
  duration: number; // minutes
  questions: Array<{
    id: string;
    text: string;
    type: 'multiple_choice' | 'scale' | 'ranking';
    options?: string[]; // For multiple choice
    scaleMin?: number; // For scale (1)
    scaleMax?: number; // For scale (5)
  }>;
}

interface AssessmentResult {
  id: string;
  assessmentId: string;
  studentId: string;
  careerMatches: Array<{
    careerId: string;
    careerTitle: string;
    matchPercentage: number; // 85
    matchReasons: string[]; // ["Strong tech interest", ...]
  }>;
  completedAt: Date;
}
```

**UI Components:**
- `AssessmentCard` - List item with icon and info
- `QuestionCard` - Large card with question and options
- `ProgressBar` - Visual progress indicator
- `AnswerButton` - Large, clear answer option
- `ScaleInput` - 1-5 rating scale
- `CareerMatchCard` - Result card with % match
- `ResultsChart` - Simple bar chart

---

### Feature 4: Student Dashboard

**Purpose:** Central hub showing exploration progress and next actions

**User Story:**
> "As a returning student, I want to see my progress so I know what to do next."

**Screens:**

1. **Dashboard** (`/app/dashboard/student/page.tsx`)
   
   **Stats Grid** (4 items)
   - Careers Explored: 12
   - Career Chats: 3 completed, 1 upcoming
   - Assessments: 2 taken
   - Saved Careers: 5
   
   **Recommended for You** (3 career cards)
   - Based on assessments
   - "Explore More" button
   
   **Upcoming Career Chats** (list)
   - Next chat details
   - Countdown timer
   - "Join" button if starting soon
   
   **Saved Careers** (quick access)
   - 3 most recent
   - "View All" link
   
   **Quick Actions** (4 buttons)
   - Browse Careers
   - Take Assessment
   - Book a Chat
   - View Profile

**Mock Data Structure:**
```typescript
interface StudentProfile {
  userId: string;
  gradeLevel: string; // "S4"
  school?: string;
  district?: string;
  stats: {
    careersExplored: number;
    chatsCompleted: number;
    chatsUpcoming: number;
    assessmentsTaken: number;
    savedCareers: number;
  };
  savedCareerIds: string[];
  assessmentResultIds: string[];
}
```

**UI Components:**
- `StatCard` - Number with label and trend
- `RecommendedCareers` - Horizontal scrollable cards
- `UpcomingChatPreview` - Next chat with countdown
- `QuickActionButton` - Large icon button
- `SavedCareersList` - Compact list view

---

## 4.3 Non-Functional Requirements

### Performance

| Metric | Target | Critical |
|--------|--------|----------|
| Initial page load | <2s on 3G | <5s |
| Time to interactive | <3s on 3G | <7s |
| Career video start | <3s buffer | <10s |
| Search results | <500ms | <2s |
| Navigation | <100ms | <500ms |

### Usability

| Metric | Target |
|--------|--------|
| First-time user completes browse | 95% |
| First-time user books chat | 60% |
| Users complete assessment | 70% |
| Mobile task completion rate | 90% |
| User satisfaction (1-5) | 4.5+ |

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- Touch target minimum 44x44px
- Color contrast 4.5:1 minimum

### Security

- HTTPS only
- Input sanitization
- XSS prevention
- CSRF protection
- Secure authentication (Phase 2)

### Scalability

- Support 10,000 concurrent users
- 100+ careers without performance degradation
- 1,000+ students per school
- Response time <500ms under load

---

# 5. SOFTWARE REQUIREMENTS SPECIFICATION

## 5.1 Functional Requirements

### FR-1: Career Library

| ID | Requirement | Priority | UI Phase |
|----|-------------|----------|----------|
| FR-1.1 | Display grid of career cards | High | Week 1 |
| FR-1.2 | Filter by category (dropdown) | High | Week 1 |
| FR-1.3 | Filter by salary range (slider) | Medium | Week 1 |
| FR-1.4 | Filter by education level | Medium | Week 1 |
| FR-1.5 | Search by keyword | High | Week 1 |
| FR-1.6 | Show career detail page | High | Week 1 |
| FR-1.7 | Play career video | High | Week 1 |
| FR-1.8 | Display salary, education, skills | High | Week 1 |
| FR-1.9 | Show career path progression | Medium | Week 1 |
| FR-1.10 | List available professionals | High | Week 1 |
| FR-1.11 | Show related careers | Medium | Week 1 |
| FR-1.12 | Display company sponsor | Low | Week 1 |

### FR-2: Career Chat Booking

| ID | Requirement | Priority | UI Phase |
|----|-------------|----------|----------|
| FR-2.1 | Display available professionals | High | Week 3 |
| FR-2.2 | Select professional (highlight) | High | Week 3 |
| FR-2.3 | Show calendar with available dates | High | Week 3 |
| FR-2.4 | Display time slots for selected date | High | Week 3 |
| FR-2.5 | Select time slot | High | Week 3 |
| FR-2.6 | Show booking summary | High | Week 3 |
| FR-2.7 | Confirm booking (visual feedback) | High | Week 3 |
| FR-2.8 | Display scheduled chats | High | Week 3 |
| FR-2.9 | Show countdown to next chat | Medium | Week 3 |
| FR-2.10 | Enable join chat (button) | High | Week 3 |
| FR-2.11 | Display chat room interface | High | Week 3 |
| FR-2.12 | Collect rating and feedback | High | Week 3 |

### FR-3: Career Assessments

| ID | Requirement | Priority | UI Phase |
|----|-------------|----------|----------|
| FR-3.1 | Display 4 assessment types | Medium | Week 2 |
| FR-3.2 | Show question with progress | Medium | Week 2 |
| FR-3.3 | Render multiple choice questions | Medium | Week 2 |
| FR-3.4 | Render scale questions (1-5) | Medium | Week 2 |
| FR-3.5 | Navigate previous/next | Medium | Week 2 |
| FR-3.6 | Require answer before proceeding | Medium | Week 2 |
| FR-3.7 | Show results with career matches | Medium | Week 2 |
| FR-3.8 | Display match percentage | Medium | Week 2 |
| FR-3.9 | Show match reasons | Medium | Week 2 |
| FR-3.10 | Link to career from results | Medium | Week 2 |

### FR-4: Student Dashboard

| ID | Requirement | Priority | UI Phase |
|----|-------------|----------|----------|
| FR-4.1 | Display stats grid (4 metrics) | High | Week 4 |
| FR-4.2 | Show recommended careers | High | Week 4 |
| FR-4.3 | Display upcoming chat preview | High | Week 4 |
| FR-4.4 | Show saved careers list | Medium | Week 4 |
| FR-4.5 | Provide quick action buttons | High | Week 4 |
| FR-4.6 | Show recent activity | Low | Week 4 |

### FR-5: Authentication

| ID | Requirement | Priority | UI Phase |
|----|-------------|----------|----------|
| FR-5.1 | Login form (email + password) | High | Week 4 |
| FR-5.2 | Signup form (multi-step) | High | Week 4 |
| FR-5.3 | Password reset flow | Medium | Week 4 |
| FR-5.4 | Remember me checkbox | Low | Week 4 |
| FR-5.5 | Show validation errors | High | Week 4 |

### FR-6: Save Careers

| ID | Requirement | Priority | UI Phase |
|----|-------------|----------|----------|
| FR-6.1 | Save button on career card | Medium | Week 2 |
| FR-6.2 | Save button on career detail | Medium | Week 2 |
| FR-6.3 | Toggle saved state | Medium | Week 2 |
| FR-6.4 | Display saved careers page | Medium | Week 4 |
| FR-6.5 | Remove from saved | Medium | Week 4 |

## 5.2 User Interface Requirements

### UIR-1: Layout Requirements

| ID | Requirement |
|----|-------------|
| UIR-1.1 | Responsive design (375px - 1440px+) |
| UIR-1.2 | Mobile-first approach |
| UIR-1.3 | Fixed navigation bar (top on desktop, bottom on mobile) |
| UIR-1.4 | Consistent header across all pages |
| UIR-1.5 | Breadcrumb navigation on detail pages |
| UIR-1.6 | Footer with links and info |

### UIR-2: Component Requirements

| ID | Requirement |
|----|-------------|
| UIR-2.1 | All buttons minimum 44x44px touch target |
| UIR-2.2 | Cards use consistent shadow and border radius (8px) |
| UIR-2.3 | Forms have clear labels above inputs |
| UIR-2.4 | Error messages appear below form fields |
| UIR-2.5 | Loading states show skeleton screens |
| UIR-2.6 | Empty states have illustration and CTA |
| UIR-2.7 | Success messages use green color |
| UIR-2.8 | Hover states on all interactive elements |

### UIR-3: Typography Requirements

| ID | Requirement |
|----|-------------|
| UIR-3.1 | Body text minimum 16px |
| UIR-3.2 | H1 headings 30px (mobile) to 36px (desktop) |
| UIR-3.3 | H2 headings 24px |
| UIR-3.4 | H3 headings 20px |
| UIR-3.5 | Line height 1.5 for body text |
| UIR-3.6 | Line height 1.25 for headings |
| UIR-3.7 | Max line width 65 characters for readability |

### UIR-4: Color Requirements

| ID | Requirement |
|----|-------------|
| UIR-4.1 | Primary actions use blue (#2563EB) |
| UIR-4.2 | Success states use green (#10B981) |
| UIR-4.3 | Warning states use orange (#F59E0B) |
| UIR-4.4 | Text contrast minimum 4.5:1 |
| UIR-4.5 | Link color distinct from body text |
| UIR-4.6 | Visited links have different shade |

### UIR-5: Interaction Requirements

| ID | Requirement |
|----|-------------|
| UIR-5.1 | Buttons show active state on press |
| UIR-5.2 | Links show hover state (underline or color change) |
| UIR-5.3 | Form inputs show focus state (blue border) |
| UIR-5.4 | Transitions use 150-300ms duration |
| UIR-5.5 | Animations use ease-out easing |
| UIR-5.6 | Disabled states are visually distinct (gray) |

---

# 6. UML DIAGRAMS

## 6.1 Use Case Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    OpportunityMap System                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌───────┐                                                │
│   │Student│                                                │
│   └───┬───┘                                                │
│       │                                                     │
│       ├──► (Browse Careers)                                │
│       │         │                                           │
│       │         └──► (View Career Detail)                  │
│       │                    │                                │
│       │                    └──► (Watch Career Video)       │
│       │                                                     │
│       ├──► (Take Assessment)                               │
│       │         │                                           │
│       │         └──► (View Results)                        │
│       │                    │                                │
│       │                    └──► (Explore Matched Career)   │
│       │                                                     │
│       ├──► (Book Career Chat)                              │
│       │         │                                           │
│       │         ├──► (Select Professional)                 │
│       │         │                                           │
│       │         ├──► (Choose Date/Time)                    │
│       │         │                                           │
│       │         └──► (Confirm Booking)                     │
│       │                                                     │
│       ├──► (Join Career Chat) ◄──────┐                    │
│       │                               │                     │
│       ├──► (Rate Chat)                │                     │
│       │                               │                     │
│       ├──► (Save Career)              │                     │
│       │                               │                     │
│       └──► (View Dashboard)           │                     │
│                                       │                     │
│                                       │                     │
│   ┌──────────────┐                   │                     │
│   │Career Mentor │                   │                     │
│   └──────┬───────┘                   │                     │
│          │                           │                     │
│          ├──► (Set Availability)     │                     │
│          │                           │                     │
│          ├──► (View Schedule) ───────┘                     │
│          │                                                 │
│          ├──► (Receive Booking)                            │
│          │                                                 │
│          └──► (View Dashboard)                             │
│                                                             │
│                                                             │
│   ┌────────────────┐                                       │
│   │Industry Partner│                                       │
│   └────────┬───────┘                                       │
│            │                                                │
│            ├──► (Add Career Info)                          │
│            │                                                │
│            ├──► (View Profile)                             │
│            │                                                │
│            └──► (View Dashboard)                           │
│                                                             │
│                                                             │
│   ┌───────┐                                                │
│   │Company│                                                │
│   └───┬───┘                                                │
│       │                                                     │
│       ├──► (Sponsor Career)                                │
│       │                                                     │
│       ├──► (View Analytics)                                │
│       │                                                     │
│       └──► (Manage Careers)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Relationships:
─────► Primary flow
◄────► Bidirectional
<<include>> Mandatory sub-use case
<<extend>> Optional extension
```

**Key Actors:**
1. **Student** - Primary user exploring careers
2. **Career Mentor** - Professional conducting 15-min chats
3. **Industry Partner** - Professional sharing career insights
4. **Company** - Organization sponsoring careers

## 6.2 Class Diagram

```
┌──────────────────────────┐
│        User              │
├──────────────────────────┤
│ - id: string             │
│ - email: string          │
│ - phone?: string         │
│ - firstName: string      │
│ - lastName: string       │
│ - avatar?: string        │
│ - role: UserRole         │
│ - createdAt: Date        │
├──────────────────────────┤
│ + login()                │
│ + logout()               │
│ + updateProfile()        │
└──────┬───────────────────┘
       │
       │ <<inherits>>
       ├─────────────────────────────────────┐
       │                                     │
       │                                     │
┌──────▼──────────────┐          ┌──────────▼─────────────┐
│  StudentProfile     │          │  PartnerProfile        │
├─────────────────────┤          ├────────────────────────┤
│ - userId: string    │          │ - userId: string       │
│ - gradeLevel: string│          │ - company: string      │
│ - school?: string   │          │ - jobTitle: string     │
│ - district?: string │          │ - yearsExp: number     │
├─────────────────────┤          │ - careerIds: string[]  │
│ + saveCareer()      │          ├────────────────────────┤
│ + bookChat()        │          │ + updateInfo()         │
│ + takeAssessment()  │          │ + viewStats()          │
└─────────────────────┘          └────────────────────────┘
       │                                     │
       │                                     │
       │ has many                   <<extends>>
       │                                     │
       ▼                          ┌──────────▼─────────────┐
┌────────────────────┐            │  MentorProfile         │
│  SavedCareer       │            ├────────────────────────┤
├────────────────────┤            │ - userId: string       │
│ - studentId: string│            │ - availability: JSON   │
│ - careerId: string │            │ - ratePerChat?: number │
│ - savedAt: Date    │            │ - chatsCompleted: int  │
└────────────────────┘            │ - avgRating: number    │
                                  ├────────────────────────┤
                                  │ + setAvailability()    │
                                  │ + acceptChat()         │
                                  └────────────────────────┘


┌──────────────────────────┐
│        Career            │
├──────────────────────────┤
│ - id: string             │
│ - title: string          │
│ - category: string       │
│ - shortDesc: string      │
│ - fullDesc: string       │
│ - videoUrl: string       │
│ - salaryMin: number      │
│ - salaryMax: number      │
│ - reqEducation: string   │
│ - reqSkills: string[]    │
│ - careerPath: JSON       │
│ - sponsoredBy?: string   │
├──────────────────────────┤
│ + getDetails()           │
│ + incrementViews()       │
│ + getRelated()           │
└──────┬───────────────────┘
       │
       │ has many
       │
       ▼
┌────────────────────────┐
│  CareerProfessional    │
├────────────────────────┤
│ - careerId: string     │
│ - professionalId: str  │
└────────────────────────┘
       │
       │ references
       │
       ▼
┌────────────────────────┐
│  Professional          │  (Partner or Mentor)
└────────────────────────┘


┌──────────────────────────┐
│      Assessment          │
├──────────────────────────┤
│ - id: string             │
│ - type: AssessmentType   │
│ - title: string          │
│ - description: string    │
│ - duration: number       │
│ - questions: JSON        │
├──────────────────────────┤
│ + getQuestions()         │
│ + calculateResults()     │
└──────┬───────────────────┘
       │
       │ produces
       │
       ▼
┌──────────────────────────┐
│   AssessmentResult       │
├──────────────────────────┤
│ - id: string             │
│ - assessmentId: string   │
│ - studentId: string      │
│ - answers: JSON          │
│ - careerMatches: JSON    │
│ - completedAt: Date      │
├──────────────────────────┤
│ + getMatches()           │
│ + getScores()            │
└──────────────────────────┘


┌──────────────────────────┐
│      CareerChat          │
├──────────────────────────┤
│ - id: string             │
│ - studentId: string      │
│ - professionalId: string │
│ - careerId: string       │
│ - scheduledAt: Date      │
│ - duration: number       │
│ - status: ChatStatus     │
│ - meetingUrl?: string    │
│ - rating?: number        │
│ - feedback?: string      │
├──────────────────────────┤
│ + schedule()             │
│ + complete()             │
│ + rate()                 │
└──────────────────────────┘


Relationships:
──────► One-to-many
◄─────► Many-to-many
- - - ► Dependency
══════► Inheritance
```

## 6.3 Sequence Diagram: Book Career Chat

```
Student    UI           Professional    Calendar    ChatBooking    Notification
  │         │                │             │             │              │
  │  Click  │                │             │             │              │
  │"Book"   │                │             │             │              │
  ├────────►│                │             │             │              │
  │         │                │             │             │              │
  │         │ Get professionals           │             │              │
  │         │  for career                 │             │              │
  │         ├───────────────►│             │             │              │
  │         │                │             │             │              │
  │         │◄───────────────┤             │             │              │
  │         │  List of pros  │             │             │              │
  │         │                │             │             │              │
  │ Display │                │             │             │              │
  │  pros   │                │             │             │              │
  │◄────────┤                │             │             │              │
  │         │                │             │             │              │
  │ Select  │                │             │             │              │
  │   pro   │                │             │             │              │
  ├────────►│                │             │             │              │
  │         │                │             │             │              │
  │         │  Get availability            │             │              │
  │         ├────────────────┼────────────►│             │              │
  │         │                │             │             │              │
  │         │◄───────────────┼─────────────┤             │              │
  │         │     Available slots          │             │              │
  │         │                │             │             │              │
  │ Display │                │             │             │              │
  │calendar │                │             │             │              │
  │◄────────┤                │             │             │              │
  │         │                │             │             │              │
  │ Select  │                │             │             │              │
  │date/time│                │             │             │              │
  ├────────►│                │             │             │              │
  │         │                │             │             │              │
  │         │  Create booking              │             │              │
  │         ├────────────────┼─────────────┼────────────►│              │
  │         │                │             │             │              │
  │         │                │             │             │  Generate    │
  │         │                │             │             │ meeting URL  │
  │         │                │             │             ├─────────────┐│
  │         │                │             │             │             ││
  │         │                │             │             │◄────────────┘│
  │         │                │             │             │              │
  │         │◄───────────────┼─────────────┼─────────────┤              │
  │         │      Booking confirmed + URL │             │              │
  │         │                │             │             │              │
  │         │                │             │             │  Send email  │
  │         │                │             │             │  to student  │
  │         │                │             │             ├─────────────►│
  │         │                │             │             │              │
  │         │                │             │             │  Send email  │
  │         │                │             │             │  to mentor   │
  │         │                │             │             ├─────────────►│
  │         │                │             │             │              │
  │ Success │                │             │             │              │
  │ message │                │             │             │              │
  │◄────────┤                │             │             │              │
  │         │                │             │             │              │

Alt: Slot Already Booked
  │         │◄───────────────┼─────────────┼─────────────┤              │
  │         │      Error: Slot taken       │             │              │
  │         │                │             │             │              │
  │  Error  │                │             │             │              │
  │ message │                │             │             │              │
  │◄────────┤                │             │             │              │
```

## 6.4 Activity Diagram: Student Journey

```
┌─────────────────────────────────────────────────────────────┐
│                   Student Career Exploration                │
└─────────────────────────────────────────────────────────────┘

    (Start)
      │
      ▼
┌─────────────┐
│ Open App    │
└──────┬──────┘
       │
       ▼
   ◇ Logged in?
   /          \
 No            Yes
 /              \
▼                ▼
┌──────────┐    │
│ Sign Up  │    │
└────┬─────┘    │
     │          │
     └──────────┘
         │
         ▼
┌────────────────┐
│ View Dashboard │
└────────┬───────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌──────────────────┐
│ Browse Careers  │  │ Take Assessment  │
└────────┬────────┘  └────────┬─────────┘
         │                    │
         ▼                    ▼
   ◇ Interesting?      ┌───────────────┐
   /          \        │ View Results  │
 No            Yes     └───────┬───────┘
 /              \              │
▼                ▼             ▼
│          ┌──────────────┐   │
│          │ Save Career  │   │
│          └──────┬───────┘   │
│                 │           │
│                 └───────────┘
│                       │
└───────────────────────┘
              │
              ▼
      ◇ Learn more?
      /          \
    No            Yes
    /              \
   ▼                ▼
   │         ┌─────────────────┐
   │         │ View Career     │
   │         │ Detail Page     │
   │         └────────┬────────┘
   │                  │
   │                  ▼
   │          ◇ Talk to pro?
   │          /          \
   │        No            Yes
   │        /              \
   │       ▼                ▼
   │       │         ┌─────────────────┐
   │       │         │ Book Career     │
   │       │         │ Chat            │
   │       │         └────────┬────────┘
   │       │                  │
   │       │                  ▼
   │       │         ┌─────────────────┐
   │       │         │ Select          │
   │       │         │ Professional    │
   │       │         └────────┬────────┘
   │       │                  │
   │       │                  ▼
   │       │         ┌─────────────────┐
   │       │         │ Choose Date     │
   │       │         │ & Time          │
   │       │         └────────┬────────┘
   │       │                  │
   │       │                  ▼
   │       │         ┌─────────────────┐
   │       │         │ Confirm         │
   │       │         │ Booking         │
   │       │         └────────┬────────┘
   │       │                  │
   │       │                  ▼
   │       │         ┌─────────────────┐
   │       │         │ Wait for Chat   │
   │       │         │ (get reminder)  │
   │       │         └────────┬────────┘
   │       │                  │
   │       │                  ▼
   │       │         ┌─────────────────┐
   │       │         │ Join Video Chat │
   │       │         └────────┬────────┘
   │       │                  │
   │       │                  ▼
   │       │         ┌─────────────────┐
   │       │         │ 15-min          │
   │       │         │ Conversation    │
   │       │         └────────┬────────┘
   │       │                  │
   │       │                  ▼
   │       │         ┌─────────────────┐
   │       │         │ Rate & Provide  │
   │       │         │ Feedback        │
   │       │         └────────┬────────┘
   │       │                  │
   │       └──────────────────┘
   │                 │
   └─────────────────┘
            │
            ▼
      ◇ Continue?
      /          \
    Yes           No
    /              \
   ▼                ▼
   │            (End)
   └────────────────


Parallel Activities:
═══════════════════
│
├──► Receive SMS reminders
│
├──► Get email notifications
│
└──► Track progress on dashboard
```

## 6.5 State Diagram: Career Chat Status

```
┌─────────────────────────────────────────────────────────────┐
│              Career Chat Lifecycle                          │
└─────────────────────────────────────────────────────────────┘


    [Initial]
        │
        │ Student books chat
        ▼
  ┌──────────┐
  │ PENDING  │  ←────┐
  └────┬─────┘       │
       │             │ Mentor updates
       │             │ availability
       │             │
       │ Mentor      │
       │ confirms    │
       ▼             │
  ┌──────────┐      │
  │CONFIRMED │      │
  └────┬─────┘      │
       │            │
       │ Chat time  │
       │ arrives    │
       ▼            │
  ┌──────────┐     │
  │ ACTIVE   │     │
  └────┬─────┘     │
       │           │
       │ 15 mins   │
       │ elapsed   │
       ▼           │
  ┌──────────┐    │
  │COMPLETED │    │
  └────┬─────┘    │
       │          │
       │ Student  │
       │ rates    │
       ▼          │
  ┌──────────┐   │
  │  RATED   │   │
  └──────────┘   │
                 │
                 │
  Can transition │
  to CANCELLED   │
  from PENDING   │
  or CONFIRMED   │
       │         │
       ▼         │
  ┌──────────┐  │
  │CANCELLED │  │
  └──────────┘  │
       │        │
       └────────┘


State Descriptions:
═══════════════════
PENDING     - Chat booked, awaiting mentor confirmation
CONFIRMED   - Mentor accepted, both parties notified
ACTIVE      - Chat in progress (video call active)
COMPLETED   - Chat finished, awaiting rating
RATED       - Student provided feedback
CANCELLED   - Chat cancelled by student or mentor
NO_SHOW     - Scheduled time passed, no one joined
```

---

# 7. UI COMPONENT SPECIFICATIONS

## 7.1 Career Card Component

**File:** `/components/careers/career-card.tsx`

**Purpose:** Display career preview in grid/list view

**Appearance:**
```
┌────────────────────────────────────┐
│  [Thumbnail Image - 16:9 ratio]   │
│                                    │
│  [Category Badge]      💰 Salary   │
├────────────────────────────────────┤
│  Software Developer                │
│                                    │
│  Build applications and solve      │
│  problems with code...             │
│                                    │
│  🎓 Bachelor's Degree              │
│                                    │
│  [Learn More →]                    │
└────────────────────────────────────┘
```

**Props:**
```typescript
interface CareerCardProps {
  career: {
    id: string;
    title: string;
    category: string;
    shortDescription: string;
    videoThumbnail: string;
    salaryMin: number;
    salaryMax: number;
    requiredEducation: string;
  };
  onClick?: () => void;
}
```

**Design Specs:**
- Card width: 100% on mobile, 50% on tablet, 33% on desktop
- Thumbnail: 16:9 aspect ratio, cover fit
- Padding: 16px
- Border radius: 8px
- Shadow: subtle on default, lifted on hover
- Category badge: top-right absolute position
- Transition: all 200ms ease

**States:**
- Default: shadow-sm
- Hover: shadow-md, translate-y(-2px)
- Active: shadow-sm, scale(0.98)

**Code Example:**
```tsx
export function CareerCard({ career, onClick }: CareerCardProps) {
  const salaryRange = `${career.salaryMin.toLocaleString()} - ${career.salaryMax.toLocaleString()} RWF`;
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <Image
          src={career.videoThumbnail}
          alt={career.title}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2">
          {career.category}
        </Badge>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{career.title}</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {career.shortDescription}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-semibold text-blue-600">
              💰 {salaryRange}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            🎓 {career.requiredEducation}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-4"
        >
          Learn More →
        </Button>
      </div>
    </Card>
  );
}
```

---

## 7.2 Professional Card Component

**File:** `/components/chats/professional-card.tsx`

**Purpose:** Display professional available for chat

**Appearance:**
```
┌────────────────────────────────────┐
│                                    │
│  [Avatar]   Jean Claude            │
│            Software Engineer       │
│            @ Zipline               │
│                                    │
│  ⭐ 4.9  (23 chats)                │
│                                    │
│  [Select Professional]             │
│                                    │
└────────────────────────────────────┘
```

**Props:**
```typescript
interface ProfessionalCardProps {
  professional: {
    id: string;
    name: string;
    avatar: string;
    company: string;
    jobTitle: string;
    rating: number;
    chatsCompleted: number;
  };
  selected?: boolean;
  onSelect: (id: string) => void;
}
```

**Design Specs:**
- Card width: 100% on mobile, 33% on tablet/desktop
- Avatar: 64x64px circle
- Padding: 20px
- Border: 2px solid gray-200 (default), blue-500 (selected)
- Border radius: 8px
- Background: white (default), blue-50 (selected)

**States:**
- Default: border-gray-200, bg-white
- Selected: border-blue-500, bg-blue-50
- Hover: border-gray-300

**Code Example:**
```tsx
export function ProfessionalCard({ 
  professional, 
  selected,
  onSelect 
}: ProfessionalCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all",
        selected 
          ? "border-2 border-blue-500 bg-blue-50" 
          : "border-2 border-gray-200 hover:border-gray-300"
      )}
      onClick={() => onSelect(professional.id)}
    >
      <div className="p-5 text-center">
        <Avatar className="w-16 h-16 mx-auto mb-3">
          <AvatarImage src={professional.avatar} />
          <AvatarFallback>
            {professional.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <h3 className="font-semibold text-lg mb-1">
          {professional.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-1">
          {professional.jobTitle}
        </p>
        
        <p className="text-sm text-gray-500 mb-3">
          @ {professional.company}
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-yellow-500">⭐</span>
          <span className="font-semibold">{professional.rating}</span>
          <span className="text-gray-500">
            ({professional.chatsCompleted} chats)
          </span>
        </div>
        
        {selected && (
          <Badge className="mt-3 bg-blue-600">
            ✓ Selected
          </Badge>
        )}
      </div>
    </Card>
  );
}
```

---

## 7.3 Assessment Question Card

**File:** `/components/assessments/question-card.tsx`

**Purpose:** Display assessment question with answer options

**Appearance (Multiple Choice):**
```
┌────────────────────────────────────┐
│  Question 5 of 25                  │
│                                    │
│  Which activities do you enjoy     │
│  most in your free time?           │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  ⚪ Writing code or solving   │ │
│  │     puzzles                   │ │
│  └──────────────────────────────┘ │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  ⚪ Helping others or         │ │
│  │     teaching                  │ │
│  └──────────────────────────────┘ │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  ⚪ Creating art or design    │ │
│  └──────────────────────────────┘ │
│                                    │
│  ┌──────────────────────────────┐ │
│  │  ⚪ Organizing events          │ │
│  └──────────────────────────────┘ │
│                                    │
└────────────────────────────────────┘
```

**Appearance (Scale):**
```
┌────────────────────────────────────┐
│  Question 12 of 25                 │
│                                    │
│  I enjoy working with numbers      │
│  and data                          │
│                                    │
│  Strongly Disagree    Strongly    │
│                       Agree        │
│  ─────────────────────────────     │
│  ⚪  ⚪  ⚪  ⚪  ⚪                   │
│  1   2   3   4   5                 │
│                                    │
└────────────────────────────────────┘
```

**Props:**
```typescript
interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    type: 'multiple_choice' | 'scale';
    options?: string[];
    scaleMin?: number;
    scaleMax?: number;
  };
  currentIndex: number;
  totalQuestions: number;
  answer?: any;
  onAnswer: (questionId: string, answer: any) => void;
}
```

**Design Specs:**
- Card max-width: 600px
- Padding: 32px
- Question text: 20px, font-semibold
- Options: 16px, padding 16px
- Radio buttons: 24x24px
- Scale: 40x40px clickable areas
- Spacing between options: 12px

**Code Example:**
```tsx
export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  answer,
  onAnswer
}: QuestionCardProps) {
  return (
    <Card className="max-w-2xl mx-auto p-8">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-4">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
        
        <h2 className="text-xl font-semibold">
          {question.text}
        </h2>
      </div>
      
      {question.type === 'multiple_choice' && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              className={cn(
                "w-full p-4 text-left rounded-lg border-2 transition-all",
                answer === option
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => onAnswer(question.id, option)}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  answer === option
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                )}>
                  {answer === option && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {question.type === 'scale' && (
        <div className="mt-6">
          <div className="flex justify-between mb-2 text-sm text-gray-600">
            <span>Strongly Disagree</span>
            <span>Strongly Agree</span>
          </div>
          
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                className={cn(
                  "w-12 h-12 rounded-full border-2 transition-all",
                  answer === value
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 hover:border-gray-400"
                )}
                onClick={() => onAnswer(question.id, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
```

---

## 7.4 Booking Calendar Component

**File:** `/components/chats/booking-calendar.tsx`

**Purpose:** Display calendar with available dates

**Appearance:**
```
┌────────────────────────────────────┐
│     November 2025           ◀ ▶    │
├────────────────────────────────────┤
│  Sun Mon Tue Wed Thu Fri Sat       │
│                    1   2   3       │
│   4   5   6   7   8   9  10        │
│  11  12  13  14  15  16  17        │
│  18  19  20  21  22  23  24        │
│  25  26  27  28  29  30            │
│                                    │
│  Selected: November 15, 2025       │
│                                    │
│  Available Times:                  │
│  ┌────┐ ┌────┐ ┌────┐             │
│  │9AM │ │2PM │ │4PM │             │
│  └────┘ └────┘ └────┘             │
│                                    │
└────────────────────────────────────┘
```

**Props:**
```typescript
interface BookingCalendarProps {
  professionalId: string;
  availability: Array<{
    date: string; // ISO date
    slots: string[]; // ["09:00", "14:00", "16:00"]
  }>;
  selectedDate?: string;
  selectedTime?: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}
```

**Design Specs:**
- Calendar width: 100% up to 400px
- Date cells: 40x40px minimum (touch target)
- Available dates: blue border
- Selected date: blue background
- Disabled dates: gray, not clickable
- Time slots: 80px wide, 44px tall

**States:**
- Date available: border-blue-300, cursor-pointer
- Date selected: bg-blue-500, text-white
- Date past: text-gray-300, not-allowed
- Time selected: bg-blue-500, text-white

**Code Example:**
```tsx
export function BookingCalendar({
  availability,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const availableDates = availability.map(a => a.date);
  const selectedSlots = availability.find(
    a => a.date === selectedDate
  )?.slots || [];
  
  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            ◀
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            ▶
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {/* Date cells would go here */}
        {/* Implementation details omitted for brevity */}
      </div>
      
      {/* Selected Date Display */}
      {selectedDate && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-3">
            Selected: {format(new Date(selectedDate), 'MMMM d, yyyy')}
          </p>
          
          <p className="text-sm font-medium mb-2">Available Times:</p>
          
          <div className="flex flex-wrap gap-2">
            {selectedSlots.map(slot => (
              <Button
                key={slot}
                variant={selectedTime === slot ? "default" : "outline"}
                onClick={() => onSelectTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 7.5 Stat Card Component

**File:** `/components/dashboard/stat-card.tsx`

**Purpose:** Display metric on dashboard

**Appearance:**
```
┌────────────────────────────────────┐
│  🎯                                │
│                                    │
│  12                                │
│  Careers Explored                  │
│                                    │
│  +3 this week                      │
└────────────────────────────────────┘
```

**Props:**
```typescript
interface StatCardProps {
  icon: string;
  label: string;
  value: number | string;
  trend?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple';
}
```

**Design Specs:**
- Card width: 100% on mobile, 50% tablet, 25% desktop
- Padding: 20px
- Icon: 32px font size
- Value: 36px, font-bold
- Label: 14px, text-gray-600
- Trend: 12px, color based on direction

**Code Example:**
```tsx
export function StatCard({ 
  icon, 
  label, 
  value, 
  trend,
  color = 'blue' 
}: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="text-3xl mb-3">{icon}</div>
      
      <div className="text-3xl font-bold mb-1">
        {value}
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        {label}
      </div>
      
      {trend && (
        <div className="text-xs text-green-600">
          {trend}
        </div>
      )}
    </Card>
  );
}
```

---

# 8. IMPLEMENTATION ROADMAP

## 8.1 Week-by-Week Plan

### Week 1: Career Library
**Goal:** Beautiful, browsable career catalog

**Day 1-2: Browse Page**
- [ ] Create `/app/careers/page.tsx`
- [ ] Create `CareerCard` component
- [ ] Create `CareerFilters` component
- [ ] Add 10 mock careers
- [ ] Test responsive layout

**Day 3-4: Detail Page**
- [ ] Create `/app/careers/[id]/page.tsx`
- [ ] Add video player (YouTube embed)
- [ ] Create key info grid
- [ ] Add skills badges
- [ ] Add career path timeline

**Day 5: Polish**
- [ ] Add loading states
- [ ] Add empty states
- [ ] Test on mobile device
- [ ] Fix spacing issues
- [ ] Add hover effects

**Deliverable:** Working career library with 10 careers

---

### Week 2: Assessments
**Goal:** Functional assessment flow

**Day 6-7: Assessment List & Flow**
- [ ] Create `/app/assessments/page.tsx`
- [ ] Create `AssessmentCard` component
- [ ] Create `/app/assessments/[id]/page.tsx`
- [ ] Create `QuestionCard` component
- [ ] Add progress bar

**Day 8-9: Results & Matching**
- [ ] Create results page
- [ ] Create `CareerMatchCard` component
- [ ] Mock matching algorithm
- [ ] Link to matched careers

**Day 10: Polish**
- [ ] Add question transitions
- [ ] Improve answer selections
- [ ] Test complete flow
- [ ] Mobile optimization

**Deliverable:** Working assessment with results

---

### Week 3: Chat Booking
**Goal:** Complete booking interface

**Day 11-12: Booking Flow Part 1**
- [ ] Create `/app/chats/book/[careerId]/page.tsx`
- [ ] Create `ProfessionalCard` component
- [ ] Add professional selection
- [ ] Create `BookingCalendar` component

**Day 13-14: Booking Flow Part 2**
- [ ] Add time slot selection
- [ ] Create booking confirmation
- [ ] Create `/app/chats/schedule/page.tsx`
- [ ] Add scheduled chats list

**Day 15: Chat Interface**
- [ ] Create `/app/chats/[chatId]/page.tsx`
- [ ] Mock video interface
- [ ] Create feedback form
- [ ] Test complete flow

**Deliverable:** Complete booking to feedback flow

---

### Week 4: Dashboards & Polish
**Goal:** All dashboards complete, everything polished

**Day 16-17: Student Dashboard**
- [ ] Update `/app/dashboard/student/page.tsx`
- [ ] Create `StatCard` component
- [ ] Add recommended careers section
- [ ] Add upcoming chats preview
- [ ] Add saved careers section

**Day 18: Other Dashboards**
- [ ] Update partner dashboard
- [ ] Update mentor dashboard
- [ ] Ensure consistency

**Day 19-20: Final Polish**
- [ ] Review all pages
- [ ] Fix consistency issues
- [ ] Test all flows end-to-end
- [ ] Mobile testing
- [ ] Accessibility check
- [ ] Performance optimization

**Deliverable:** Production-ready UI

---

### Week 5-6: Backend (Convex)
**Goal:** Add real data and functionality

**Week 5: Convex Setup**
- [ ] Install Convex
- [ ] Define schemas
- [ ] Create mutations
- [ ] Create queries
- [ ] Test data operations

**Week 6: Connect UI**
- [ ] Replace mock data
- [ ] Add authentication
- [ ] Connect all components
- [ ] Add error handling
- [ ] Deploy to production

**Deliverable:** Fully functional platform

---

## 8.2 Mock Data Structure

### Sample Career Data

```typescript
const mockCareers = [
  {
    id: "software-dev",
    title: "Software Developer",
    category: "Technology",
    shortDescription: "Build applications and solve problems with code",
    fullDescription: "Software developers create applications...",
    videoUrl: "https://www.youtube.com/embed/...",
    videoThumbnail: "/images/careers/software-dev.jpg",
    salaryMin: 5000000,
    salaryMax: 10000000,
    currency: "RWF",
    requiredEducation: "Bachelor's Degree",
    requiredSkills: [
      "JavaScript",
      "Problem Solving",
      "Teamwork",
      "Git"
    ],
    careerPath: [
      {
        stage: "Junior Developer",
        yearsExperience: "0-2 years",
        salary: "5-7M RWF"
      },
      {
        stage: "Mid-Level Developer",
        yearsExperience: "3-5 years",
        salary: "7-12M RWF"
      },
      {
        stage: "Senior Developer",
        yearsExperience: "5+ years",
        salary: "12-20M RWF"
      }
    ],
    professionalsAvailable: [
      {
        id: "prof-1",
        name: "Jean Claude",
        company: "Zipline",
        jobTitle: "Software Engineer",
        avatar: "/images/avatars/jean.jpg",
        rating: 4.9,
        chatsCompleted: 23
      }
    ],
    relatedCareers: ["data-analyst", "product-manager"],
    sponsoredBy: {
      companyName: "Zipline",
      companyLogo: "/images/companies/zipline.png"
    }
  },
  // Add 9 more careers...
];
```

### Sample Assessment Data

```typescript
const mockAssessments = [
  {
    id: "interests",
    type: "interests",
    title: "Discover What You Love",
    description: "Find careers that match your interests",
    duration: 15,
    questions: [
      {
        id: "q1",
        text: "Which activities do you enjoy most?",
        type: "multiple_choice",
        options: [
          "Writing code or solving puzzles",
          "Helping others or teaching",
          "Creating art or design",
          "Organizing events"
        ]
      },
      // Add 24 more questions...
    ]
  }
];
```

### Sample Professional Data

```typescript
const mockProfessionals = [
  {
    id: "prof-1",
    name: "Jean Claude",
    avatar: "/images/avatars/jean.jpg",
    company: "Zipline",
    jobTitle: "Software Engineer",
    careerIds: ["software-dev", "data-analyst"],
    rating: 4.9,
    chatsCompleted: 23,
    availability: [
      {
        dayOfWeek: 1, // Monday
        startTime: "09:00",
        endTime: "17:00"
      }
    ]
  }
];
```

---

## 8.3 Testing Checklist

### Functional Testing

**Career Library**
- [ ] Can browse careers
- [ ] Filters work correctly
- [ ] Search returns results
- [ ] Detail page loads
- [ ] Video plays
- [ ] All links work

**Assessments**
- [ ] Can start assessment
- [ ] Questions advance
- [ ] Can't skip without answering
- [ ] Results display correctly
- [ ] Can navigate to careers

**Chat Booking**
- [ ] Can select professional
- [ ] Calendar shows dates
- [ ] Can select time
- [ ] Confirmation works
- [ ] Schedule displays bookings

**Dashboards**
- [ ] Stats display correctly
- [ ] All sections load
- [ ] Links work
- [ ] Mobile layout works

### Visual Testing

- [ ] All pages responsive (375px, 768px, 1440px)
- [ ] Typography consistent
- [ ] Colors match design system
- [ ] Spacing follows 4px grid
- [ ] Hover states work
- [ ] Active states work
- [ ] Loading states designed
- [ ] Empty states designed
- [ ] Error states designed

### Accessibility Testing

- [ ] Can tab through all elements
- [ ] Focus indicators visible
- [ ] All images have alt text
- [ ] Buttons have labels
- [ ] Color contrast passes
- [ ] Forms have labels
- [ ] Headings in order

---

# 9. APPENDICES

## 9.1 Glossary

**Assessment** - Quiz helping students discover career matches
**Career Chat** - 15-minute video call with professional
**Career Path** - Progression from entry to senior level
**Industry Partner** - Professional sharing career insights
**Career Mentor** - Professional conducting paid chats
**Micro-credential** - Verified skill or competency
**Pathway** - Educational steps from high school to career
**Sponsor** - Company paying to feature careers

## 9.2 References

1. Kim, J., & Wargo, E. (2025). Empowering educational leaders for AI integration in rural STEM education. *Frontiers in Education*, 10.

2. López Costa, M. (2025). Artificial Intelligence and Data Literacy in Rural Schools' Teaching Practices. *Education Sciences*, 15(3), 352.

3. UNESCO. (2023). *Global Education Monitoring Report: Technology in Education*.

4. Apple Human Interface Guidelines. (2024). *Design Principles*.

5. Nielsen Norman Group. (2024). *Mobile Usability*.

## 9.3 Design Inspiration

**Reference Sites:**
- Apple.com - Product pages
- Stripe.com - Clean, minimal design
- Linear.app - Beautiful interface
- Notion.so - Excellent UX
- Headspace.com - Calm, focused

**Key Takeaways:**
- Generous white space
- Large, clear typography
- Subtle shadows and borders
- Obvious CTAs
- Minimal color palette

## 9.4 Tools & Resources

**Development:**
- Next.js 14 Documentation
- Tailwind CSS Documentation
- shadcn/ui Components
- React Hook Form
- Zod Validation

**Design:**
- Figma (for mockups)
- Excalidraw (for diagrams)
- Unsplash (for images)
- YouTube (for videos)

**Testing:**
- Chrome DevTools (responsive)
- Lighthouse (performance)
- WAVE (accessibility)

---

## 📄 DOCUMENT END

**Version:** 1.0  
**Date:** November 3, 2025  
**Author:** Iradukunda Christian Tonny Gentil  
**Project:** OpportunityMap  

**Next Steps:**
1. Read AI Developer Prompt (top of document)
2. Review UI/UX Design Philosophy (Section 3)
3. Study Component Specifications (Section 7)
4. Begin Week 1 implementation

**Good luck building OpportunityMap! 🚀🇷🇼**