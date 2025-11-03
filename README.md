# OpportunityMap - Career Discovery Platform
alig
A career discovery platform for Rwandan high school students, helping them explore careers, connect with mentors, and discover their path. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🎯 Project Status: UI Development Phase (v0.5.0)

**Last Updated:** November 3, 2025 (Night)  
**Current Phase:** Dashboard Sprint - Student Dashboard Complete! ✅  
**Production Ready:** No (Mock data, no backend)  
**Next Milestone:** Mentor dashboard and profile pages

## 🚀 What is OpportunityMap?

**OpportunityMap** helps Rwandan high school students discover careers they never knew existed. We solve a critical problem: students don't fail because they lack learning content—they fail because they don't know what careers exist or why education matters.

### The Problem We're Solving
- 75%+ rural students fail national exams due to lack of direction, not ability
- Students study subjects without understanding career applications
- Zero visibility into careers beyond doctor, teacher, engineer
- No way to connect with professionals to learn about career realities
- Parents and teachers lack resources for career guidance

### Our Solution
1. **Career Library** - Explore 100+ careers with videos, salaries, requirements
2. **Career Assessments** - Discover careers matching interests and skills
3. **Professional Mentors** - Book 15-min video calls with working professionals
4. **Educational Pathways** - Step-by-step guides from high school to career

## 🎨 Development Approach

We're taking a **UI-first approach** inspired by Apple's design philosophy:
- Build beautiful, functional interfaces with mock data first
- Perfect every interaction and transition
- Test on real devices (mobile-first)
- Add backend integration only when UI is pixel-perfect

**Why UI-First?**
- Faster feedback and iteration
- Better user experience design
- Easier to demo to stakeholders
- Clearer requirements for backend

## 📊 Current Progress

### ✅ Completed (Fully Interactive!)
- **Landing Page** - Hero, features, testimonials, CTA sections
- **Career Library** - Grid with working search and filters
- **Career Detail Pages** - Full career information with video player
- **Career Bookmarking** - Save/unsave careers with localStorage
- **Assessments Intro** - Assessment overview with 15-question flow
- **Assessment Flow** - 15 questions with progress bar and results page
- **Assessment History** - View past results and retake assessments
- **Mentors Page** - Browse mentors with working search/filter
- **Mentor Booking** - Book sessions via Calendly integration
- **Authentication Pages** - Login, signup (3 roles), password reset
- **Navigation** - Responsive header with mobile menu
- **Design System** - Neobrutalist style (thick borders, solid shadows, high contrast)
- **Loading States** - Skeleton loaders on all pages ✨
- **Error Handling** - Comprehensive error & empty states ✨
- **Toast Notifications** - User feedback for all actions ✨
- **Student Dashboard** - Stats, saved careers, assessment results with dynamic data ✨ NEW
- **Settings Page** - Notifications and privacy preferences ✨ NEW

### 🔄 In Progress (High Priority)
- **Mentor Dashboard** - Professional mentor view with session management
- **Student Profile Page** - Edit personal information and preferences

### ⏳ Upcoming (Enhancement)
- **Navigation Improvements**
  - [ ] Previous/Next buttons in assessments
  - [ ] Breadcrumb navigation
  - [ ] Quick action shortcuts

- **Enhanced Features**
  - [ ] Career recommendations algorithm
  - [ ] Saved careers dedicated page
  - [ ] Assessment progress persistence
  - [ ] Share career functionality
  - [ ] Animations & Transitions - Smooth micro-interactions
  - [ ] Mobile Optimization - Enhanced touch interactions
  - [ ] Performance - Code splitting, lazy loading
  - [ ] Accessibility - Keyboard navigation, screen reader improvements

### 🚧 Future (Backend Phase)
- Database schema (Convex)
- Authentication & authorization
- Data persistence
- Real-time updates
- File uploads
- Analytics

## �️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Lucide React icons
- **Validation**: Zod + React Hook Form
- **Deployment**: Vercel
- **Future Backend**: Convex (planned)

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Tablets */
md: 768px   /* Small desktops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
```

Mobile-first approach: Design for 375px, then scale up.

## 📁 Project Structure

```
opportunitymap/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page ✅
│   ├── layout.tsx               # Root layout with navigation ✅
│   ├── globals.css              # Design system & Tailwind ✅
│   │
│   ├── login/                   
│   │   └── page.tsx             # Login page ✅
│   ├── signup/                  
│   │   └── page.tsx             # Multi-step signup (Student/Mentor/Company) ✅
│   ├── reset-password/          
│   │   └── page.tsx             # Password reset flow ✅
│   │
│   ├── careers/                 
│   │   ├── page.tsx             # Career library grid ✅ (needs interaction)
│   │   └── [id]/                
│   │       └── page.tsx         # Career detail page 🔄 (in progress)
│   │
│   ├── assessments/             
│   │   └── page.tsx             # Assessment intro ✅ (needs history)
│   ├── assessment/              
│   │   ├── page.tsx             # Assessment intro (duplicate) ✅
│   │   ├── questions/           
│   │   │   └── page.tsx         # 15-question flow ✅
│   │   └── results/             
│   │       └── page.tsx         # Career match results ✅
│   │
│   ├── mentors/                 
│   │   └── page.tsx             # Browse mentors ✅ (needs booking)
│   │
│   ├── dashboard/               
│   │   ├── student/             # Student dashboard (old) 🔄
│   │   ├── educator/            # Educator dashboard (old) 🔄
│   │   └── mentor/              # Mentor dashboard (old) 🔄
│   │
│   ├── content/                 # Old Spark feature 🔄
│   ├── practice/                # Old Spark feature 🔄
│   └── questions/ask/           # Old Spark feature 🔄
│
├── components/
│   ├── navigation.tsx           # Responsive header ✅
│   ├── connection-status.tsx    # Offline indicator (optional)
│   └── ui/                      # shadcn/ui components ✅
│       ├── button.tsx           
│       ├── input.tsx            
│       ├── card.tsx             
│       ├── badge.tsx            
│       ├── checkbox.tsx         
│       └── label.tsx            
│
├── lib/
│   ├── data.ts                  # Mock data (careers, mentors, questions) ✅
│   ├── types.ts                 # TypeScript interfaces ✅
│   └── utils.ts                 # Utility functions ✅
│
├── docs/
│   ├── GUIDE.md                 # Complete development guide ✅
│   ├── TASKS.md                 # Task tracking (this file) ✅
│   └── BACKEND_IMPLEMENTATION_PLAN.md  # Backend specs (old) 🔄
│
├── public/
│   └── manifest.json            # PWA manifest ✅
│
├── tailwind.config.ts           # Tailwind + neobrutalist theme ✅
├── tsconfig.json                # TypeScript config ✅
├── package.json                 # Dependencies ✅
├── next.config.js               # Next.js config ✅
└── README.md                    # This file ✅

Legend:
✅ Complete (visual)
🔄 Needs updates/interaction
❌ Not started
```

## 🎨 Design System - Neobrutalism

OpportunityMap uses a **neobrutalist design** inspired by modern web trends:

### Visual Style
- **Thick borders** (2-4px solid black borders)
- **Bold shadows** (4-8px solid color shadows, not gradients)
- **High contrast** (Black text on white, bright accent colors)
- **Sharp corners** (Minimal border radius, geometric shapes)
- **Flat colors** (No gradients, solid fills)

### Color Palette
```css
/* Primary */
--primary: #FF6B35          /* Bright orange - Primary actions */

/* Accents */
--brutal-yellow: #FFD23F    /* Highlights */
--brutal-blue: #0496FF      /* Info states */
--brutal-green: #06FFA5     /* Success states */
--brutal-pink: #FF006E      /* Warnings */

/* Neutrals */
--brutal-bg: #FFFFFF        /* Background */
--brutal-text: #000000      /* Text */
--brutal-border: #000000    /* Borders */
--brutal-gray: #E8E8E8      /* Secondary backgrounds */
```

### Typography
- **Font**: DM Sans, Inter, or system font stack
- **Weights**: Bold (700) for headings, Regular (400) for body
- **Sizes**: Large and readable (16px minimum)

### Components
All components follow the neobrutalist pattern:
- Thick black borders
- Solid color shadows
- Bold, clear typography
- High contrast
- Generous spacing

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
```

## 🔐 Authentication Flow

### Login
1. User enters email/phone and password
2. Form validation with Zod schema
3. Loading state with spinner
4. Success → Redirect to dashboard
5. Offline → Queue authentication for later

### Signup
1. **Step 1:** Choose role (Student/Educator/Mentor)
2. **Step 2:** Enter role-specific information
   - **Student:** Grade level, district, preferred language
   - **Educator:** Qualification, subject expertise, teaching experience, institution
   - **Mentor:** Expertise area, availability, background, motivation
3. **Step 3:** Accept terms and preferences
4. **Success:** Welcome screen with role-based dashboard redirect

## 🎯 Current Implementation Status

### ✅ Frontend Complete
- [x] **Authentication UI**
  - Login page with form validation (Zod)
  - Multi-step signup for 3 roles (Student/Educator/Mentor)
  - Password reset flow (4 steps: email → code → password → success)
  - Form validation with React Hook Form + Zod

- [x] **Dashboards (3 Role-Based)**
  - Student dashboard (stats, activity, goals, achievements)
  - Educator dashboard (verification queue, content management)
  - Mentor dashboard (question queue, answer tracking)
  - All with responsive layouts and color themes

- [x] **Core Features**
  - Content browsing with search/filters (subject, grade, type)
  - Question submission form with urgency levels
  - Practice tests with timer, progress tracking, results
  - Profile edit pages with form validation
  - Settings pages (notifications, data saver, language)

- [x] **Design System**
  - shadcn/ui component library
  - Tailwind CSS with custom design tokens
  - Mobile-first responsive design
  - Touch-optimized (44x44px targets)
  - High contrast for sunlight readability

### 🚧 Backend Required (Next Phase)
- [ ] Database schema and migrations
- [ ] Authentication & authorization (JWT/sessions)
- [ ] API routes for all CRUD operations
- [ ] File upload system
- [ ] Real-time features (questions, notifications)
- [ ] Offline-first PWA functionality
- [ ] Admin interface

### 📝 Backend Implementation Required
- [ ] **Database** (PostgreSQL recommended)
  - User authentication and profiles
  - Content storage and metadata
  - Questions and answers
  - Test results and analytics
  
- [ ] **API Development**
  - RESTful or GraphQL API
  - Authentication endpoints (JWT)
  - CRUD for all resources
  - File upload/download
  - Search and filtering
  
- [ ] **Real-time Features**
  - WebSocket for live notifications
  - Question answer updates
  - Sync status
  
- [ ] **Offline-First PWA**
  - Service worker implementation
  - IndexedDB for local storage
  - Background sync
  - Push notifications

See `docs/BACKEND_IMPLEMENTATION_PLAN.md` for detailed technical specifications.

## 🌍 Offline-First Strategy

### Data Storage
- **IndexedDB** - Large datasets and content
- **LocalStorage** - User preferences and auth tokens
- **Cache API** - Static assets and pages

### Sync Strategy
1. Queue actions when offline
2. Display optimistic UI updates
3. Sync automatically when online
4. Show sync status to user
5. Handle conflicts gracefully

## 🎨 Component Examples

### Button Usage
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg" loading={isLoading}>
  Sign In
</Button>
```

### Input with Icon
```tsx
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

<Input 
  icon={<Mail className="h-5 w-5" />}
  placeholder="Enter email"
  error={errors.email?.message}
/>
```

### Card Layout
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Profile Stats</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>
```

## � Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000

# 4. Build for production
npm run build

# 5. Deploy to Vercel
vercel --prod
```

## 📱 Testing Checklist

Before marking any feature as "complete":
- [ ] Works on mobile (375px width)
- [ ] Works on tablet (768px width)  
- [ ] Works on desktop (1440px+)
- [ ] All interactions have hover/active states
- [ ] Touch targets are 44x44px minimum
- [ ] Loading states are visible
- [ ] Error states are handled
- [ ] Empty states have clear messaging
- [ ] Typography is consistent
- [ ] Spacing follows 4px grid
- [ ] Colors match neobrutalist theme

## 🎯 Target Users

- **Students** - Ages 12-25, Rwandan high school students exploring careers
- **Mentors** - Working professionals offering career guidance
- **Companies** - Organizations sponsoring careers and building talent pipelines
- **Schools** - Institutions subscribing for student access

## 🌟 Key Differentiators

1. **Career Discovery Focus** - Only platform solving career awareness in Rwanda
2. **UI-First Development** - Beautiful, functional interfaces before backend
3. **Mobile-Optimized** - Designed for mobile-first users
4. **Neobrutalist Design** - Modern, bold, high-contrast aesthetic
5. **Direct Mentor Access** - 15-minute video calls with professionals
6. **Assessment-Driven** - Match students to careers based on interests

## 📚 Documentation

- **GUIDE.md** - Complete development guide with UI specs
- **TASKS.md** - Current task tracking and to-do list
- **README.md** - This file (project overview)

## 🤝 Contributing

We're currently in UI development phase. To contribute:

1. Read `docs/GUIDE.md` for design philosophy
2. Check `docs/TASKS.md` for current tasks
3. Follow neobrutalist design system
4. Write mobile-first, responsive code
5. Use TypeScript for type safety
6. Test on multiple screen sizes

## 📞 Contact

- **Repository**: github.com/ChristianTonny/spark
- **Developer**: Christian Tonny
- **Project**: OpportunityMap (formerly Spark Learning)

---

**Built for Rwanda's students** 🇷🇼 | **UI-First Approach** | **Deployed on Vercel**
