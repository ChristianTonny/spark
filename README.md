# OpportunityMap

Career discovery platform for Rwandan students. Explore careers, take assessments, try interactive quizzes, and connect with mentors.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Convex (real-time database)
- **Auth:** Clerk
- **Deployment:** Vercel

## Features

### For Students
- Career library (100+ careers with videos, salaries, requirements)
- Career assessments (RIASEC-based matching)
- Reality Quizzes - try careers before committing
- Mentor booking and chat
- Career comparison tool
- Salary calculator

### For Mentors
- Profile management
- Availability scheduling
- Booking management
- Earnings tracking
- Real-time chat

### Core Systems
- Real-time notifications
- Multi-role dashboards (student, mentor, educator, admin)
- Mobile-responsive design

## Quick Start

```bash
# Install
npm install

# Run dev server
npm run dev

# Build
npm run build

# Deploy Convex
npx convex deploy
```

## Project Structure

```
app/                    # Next.js pages
components/             # React components
convex/                 # Backend functions & schema
lib/                    # Utilities, types, quiz data
docs/                   # Documentation
```

## Documentation

All docs are in `/docs`:
- `REMAINING_TASKS.md` - What's left to do
- `REALITY_QUIZ_STATUS.md` - Quiz feature status
- `CODING_GUIDELINES.md` - Code standards
- `BUILD_STATUS.md` - Project status

## Key Commands

```bash
npm run dev              # Dev server
npm run build            # Production build
npx tsc --noEmit         # Check TypeScript
npx eslint . --fix       # Fix linting
npx convex deploy        # Deploy backend
npx convex run seedQuizzes:seedAllQuizzes  # Seed quizzes
```

## Design System

Neobrutalist style:
- Thick black borders (2-4px)
- Bold shadows (4-8px solid)
- High contrast colors
- Sharp corners

Colors: `brutal-yellow`, `brutal-blue`, `brutal-green`, `brutal-orange`, `brutal-pink`

## Status

**Launch Readiness: 85%**

Core features complete. Remaining work is content and polish. See `docs/REMAINING_TASKS.md`.

---

Built for Rwanda's students
