# Spark Learning Platform

Offline-capable educational platform designed for rural students in Sub-Saharan Africa. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🎯 Project Status: Frontend Complete (v1.1.0)

**Last Updated:** January 29, 2024  
**Current Phase:** Frontend UI Complete | Backend Development Required  
**Production Ready:** No (UI-only, mock data)

## 🚀 Features

### Authentication & User Management
- ✅ **Login Page** - Email/phone authentication with offline support
- ✅ **Multi-Step Signup** - Role-based registration (Student, Educator, Mentor)
- ✅ **Password Reset** - Secure password recovery flow
- ✅ **Session Management** - Persistent authentication with "Remember Me"

### Student Dashboard
- ✅ **Profile Overview** - Avatar, grade level, and learning streak
- ✅ **Stats Tracking** - Study streak, downloads, questions, practice completion
- ✅ **Recent Activity** - Timeline of learning actions
- ✅ **Downloaded Content** - Offline materials with progress tracking
- ✅ **Learning Goals** - Personal goal setting with progress indicators
- ✅ **Achievements** - Gamified badges and rewards
- ✅ **Quick Actions** - Fast access to common tasks

### Educator Dashboard
- ✅ **Profile Overview** - Avatar, subject expertise, and content rating
- ✅ **Stats Tracking** - Content uploaded, verified, students reached, avg rating
- ✅ **Verification Queue** - Content submissions awaiting review with urgency levels
- ✅ **Recent Uploads** - Your content with download counts and ratings
- ✅ **Student Engagement** - Subject breakdown with growth metrics
- ✅ **Quick Actions** - Upload content, verify submissions, view analytics

### Mentor Dashboard
- ✅ **Profile Overview** - Avatar, expertise areas, and helpful rating
- ✅ **Stats Tracking** - Questions answered, students helped, response time, satisfaction
- ✅ **Question Queue** - Pending questions with urgency indicators (high/medium/low)
- ✅ **Recent Answers** - Questions you've helped with and helpful votes
- ✅ **Subject Breakdown** - Distribution of questions by subject
- ✅ **Achievements** - Gamified badges for mentor milestones
- ✅ **Quick Actions** - Browse questions, view students helped, set availability

### Offline-First Features
- ✅ **Connection Status** - Real-time online/offline indicator
- ✅ **Sync Notifications** - Visual feedback for data synchronization
- ✅ **Offline Mode** - Full functionality without internet
- ✅ **Data Saver** - Bandwidth optimization for limited connectivity

### Design System
- ✅ **Mobile-First** - Optimized for low-end devices
- ✅ **Accessible** - WCAG 2.1 AA compliant
- ✅ **Touch-Optimized** - 44x44px minimum touch targets
- ✅ **High Contrast** - Readable in bright sunlight
- ✅ **Responsive** - Seamless across all screen sizes

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "spark learning"
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
spark-learning/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Homepage
│   ├── login/                   # Login page ✅
│   ├── signup/                  # Multi-step signup (Student/Educator/Mentor) ✅
│   ├── reset-password/          # Password reset flow ✅
│   ├── content/                 # Content browsing with filters ✅
│   ├── questions/ask/           # Question submission form ✅
│   ├── practice/                # Practice tests with timer ✅
│   ├── dashboard/
│   │   ├── student/            # Student dashboard ✅
│   │   │   ├── profile/        # Profile edit page ✅
│   │   │   └── settings/       # Settings page ✅
│   │   ├── educator/           # Educator dashboard ✅
│   │   ├── mentor/             # Mentor dashboard ✅
│   │   └── admin/              # Admin dashboard (TBD)
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles and design tokens
├── components/
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx          # Button with loading states
│   │   ├── input.tsx           # Input with icon support
│   │   ├── card.tsx            # Card layouts
│   │   ├── badge.tsx           # Status badges
│   │   ├── checkbox.tsx        # Form checkboxes
│   │   └── label.tsx           # Form labels
│   └── connection-status.tsx   # Offline/online indicator (optional)
├── lib/
│   └── utils.ts                # Utility functions (cn helper)
├── docs/                        # Documentation
├── public/                      # Static assets
│   └── manifest.json           # PWA manifest
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Design System

### Colors
```css
--spark-blue: #2563EB        /* Primary actions */
--spark-blue-dark: #1E40AF   /* Hover states */
--spark-green: #10B981       /* Success, progress */
--spark-orange: #F59E0B      /* Warnings */
--spark-purple: #8B5CF6      /* Mentorship */
```

### Typography
- Font: System font stack (fast loading)
- Base size: 16px (mobile-optimized)
- Scale: 12px - 36px

### Spacing
- Base unit: 4px
- Touch targets: 44x44px minimum
- Generous whitespace for readability

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

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.sparklearning.com
```

### PWA Configuration
The app is configured for Progressive Web App functionality:
- Manifest file in `public/manifest.json`
- Service worker for offline caching
- Install prompts for mobile devices

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Write mobile-first, responsive code
4. Test on low-end devices
5. Ensure offline functionality
6. Maintain accessibility standards

## 📄 License

Copyright © 2024 Spark Learning Platform. All rights reserved.

## 📞 Support

- Documentation: [Link to docs]
- Issues: [GitHub Issues]
- Email: support@sparklearning.com

## 🎓 Target Users

- **Students** - Ages 12-25 in rural Sub-Saharan Africa
- **Educators** - Teachers uploading and verifying content
- **Mentors** - Volunteers helping with questions
- **Admins** - Platform managers and moderators

## 🌟 Key Differentiators

1. **Offline-First** - Works without internet
2. **Mobile-Optimized** - Fast on low-end devices
3. **Data-Efficient** - Minimal bandwidth usage
4. **Accessible** - High contrast, large touch targets
5. **Localized** - Multiple language support
6. **Community-Driven** - Educator and mentor involvement

---

Built with ❤️ for rural education in Sub-Saharan Africa
