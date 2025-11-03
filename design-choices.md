Refer to GUIDE.md 


we are pivoting from the current idea we had into a new idea that is somehow similar to what we were building and transforming the existing codebase that new idea. Understand the existing structure of the current codebase by reading README.md and then help Build the complete UI/UX for **OpportunityMap** - a career discovery platform for Rwandan high school students. We're starting with frontend only. Backend integration with Convex comes later after UI is fully functional and tested.

for what we are building, refer to GUIDE.md, read that document, it's comphrensive and contains an  understanding of all the features and how to go about doing this. 


---

## Design Philosophy: Neobrutalism

Create a **neobrutalist interface** that feels bold, memorable, and authentic. Think raw honesty meets playful confidence.

### Core Principles

**Visual Language:**
- **Thick black borders** (2-4px) on all cards, buttons, inputs, images
- **Bold, solid shadows** (not soft/blurred) - use offset shadows like `box-shadow: 4px 4px 0px #000`
- **High contrast colors** - vibrant primaries against white/cream backgrounds
- **Asymmetrical layouts** - break the grid intentionally, overlap elements
- **Oversized typography** - make headers LARGE (48-72px+)
- **Raw, unpolished feel** - embrace imperfection, avoid rounded corners (use 0-4px max)

**Color Palette:**
```
Primary: #FF6B35 (bold orange)
Secondary: #004E89 (deep blue)  
Accent: #F7FD04 (bright yellow)
Background: #FFFEF2 (warm white)
Text: #1A1A1A (near black)
Borders: #000000 (pure black)
```

**Typography:**
- Headers: **Inter Black** or **Space Grotesk Bold** (large, loud, commanding)
- Body: **Inter Medium** (clean, readable)
- Buttons: **Inter Bold** (uppercase, confident)
- Use generous whitespace despite bold elements

**Components Style:**
- Buttons: thick borders, solid shadows, no gradients
- Cards: sharp borders, offset shadows, flat colors
- Inputs: thick borders, no inner shadows, obvious focus states
- Navigation: bold, geometric, asymmetric placement
- Images: thick borders, no filters, raw presentation

---

## What You're Building

### 1. Landing Page (Public)
**Purpose:** Convert students and schools to sign up

**Sections:**
- Hero: Large headline "Find Your Future Career in Rwanda" + bold CTA button with shadow
- How It Works: 3 asymmetric cards showing Explore → Assess → Connect
- Featured Careers: Grid of 6 career cards with thick borders and images
- Stats: Large numbers in oversized type (100+ Careers, 50+ Mentors, etc.)
- CTA: Bold signup section with contrasting background

**Key Elements:**
- Oversized hero text (72px+)
- Asymmetric career card layout (not perfect grid)
- Thick black borders on all interactive elements
- Solid shadow effects throughout
- High contrast CTA buttons

### 2. Authentication Pages
**Purpose:** Simple, fast signup/login

**Pages:**
- Login: Center card with thick border, username/password, bold button
- Signup: Role selection (Student/Mentor/Company), basic form, instant access
- Forgot Password: Minimal, functional

**Design:**
- Forms with thick input borders (2px black)
- No rounded corners on inputs
- Bold, uppercase button labels
- Solid shadow on submit buttons
- Error states: red thick border, no fancy animations

### 3. Student Dashboard
**Purpose:** Career discovery hub

**Components:**
- **Navigation:** Bold sidebar or top bar, geometric shapes, thick separators
- **Welcome Card:** Asymmetric placement, user name in large type, progress indicator
- **Saved Careers:** Grid of career cards (thick borders, shadows)
- **Recommended:** Based on interests (hardcoded for now)
- **Quick Actions:** Bold buttons for "Take Assessment" and "Browse Careers"

**Layout:**
- Asymmetric grid (not perfect columns)
- Overlap welcome card slightly over main content
- Thick borders separating sections
- Bold section headers (32-48px)

### 4. Career Browse Page
**Purpose:** Explore 100+ career profiles

**Features:**
- **Filters:** Industry, Education Level, Salary Range (chunky checkboxes, thick borders)
- **Search:** Large search bar with thick border, bold placeholder
- **Career Grid:** Asymmetric card layout, varied sizes
- **Career Cards:** Photo, title, salary, 3 key facts, "Learn More" button

**Design:**
- Filter sidebar with geometric shapes
- Career cards with offset shadows
- Bold category tags (pills with borders)
- Hover states: shadow moves, border thickens

### 5. Career Detail Page
**Purpose:** Deep dive into single career

**Sections:**
- **Hero:** Career title (large), salary range, photo (thick border)
- **Video:** Embedded player with thick border, day-in-life video
- **Overview:** What you do, skills needed, education path
- **Pathway:** Visual roadmap (High School → University → Entry → Senior)
- **Meet Mentors:** Grid of available mentors
- **Similar Careers:** Horizontal scroll

**Design:**
- Oversized career title (56px+)
- Video player: thick border, solid controls
- Pathway: geometric shapes connected with thick lines
- Mentor cards: asymmetric layout, thick borders
- Bold CTA: "Book a Career Chat"

### 6. Assessment Flow
**Purpose:** Match students to careers

**Pages:**
- Intro: Explanation, big "Start Assessment" button
- Questions: 15-20 multiple choice, one per screen, bold options
- Results: Top 5 career matches with scores, visual bars

**Design:**
- Full-screen question cards (thick borders)
- Large, obvious answer buttons (shadows on hover)
- Progress bar: thick line, contrasting color
- Results: oversized career cards, bold scores

### 7. Mentor Booking Page
**Purpose:** Schedule 15-min career chats

**Features:**
- Mentor profile: photo, bio, availability
- Calendar: Week view, available slots (thick borders)
- Booking form: Student info, questions
- Confirmation: Success state, join call button

**Design:**
- Calendar: geometric grid, thick cell borders
- Available slots: bold green background
- Booked slots: gray with thick border
- Booking button: large, shadow, high contrast

### 8. Mentor Dashboard
**Purpose:** Manage profile and bookings

**Sections:**
- Profile editor: Bio, career, availability
- Upcoming chats: List view, student names, times
- Past chats: Archive with student feedback
- Earnings: Bold numbers, simple breakdown

**Design:**
- Profile card: asymmetric, thick border
- Chat list: chunky row items with shadows
- Bold earnings display (large type)

### 9. Company Dashboard  
**Purpose:** Sponsor careers, track engagement

**Sections:**
- Sponsored careers: Which careers you're paying for
- Analytics: Views, bookings, student interest (bold charts)
- Team: Add/remove team members

**Design:**
- Analytics: bold bar/line charts (no fancy libraries, simple geometric shapes)
- Career sponsorship cards: thick borders, clear status
- Large metric numbers (oversized type)

---

## Technical Requirements

### Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (customize for neobrutalism)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

### File Structure
```
/app
  /(auth)
    /login
    /signup
  /(public)
    /page.tsx (landing)
    /careers
      /page.tsx (browse)
      /[id]/page.tsx (detail)
  /(dashboard)
    /student
    /mentor  
    /company
  /assessment
    /page.tsx (intro)
    /questions/page.tsx
    /results/page.tsx
/components
  /ui (shadcn components)
  /careers (CareerCard, CareerGrid, etc.)
  /shared (Nav, Footer, etc.)
/lib
  /types.ts (all TypeScript types)
  /data.ts (mock data for now)
```

### TypeScript Types (Mock for now)
```typescript
type User = {
  id: string
  name: string
  email: string
  role: 'student' | 'mentor' | 'company'
  avatar?: string
}

type Career = {
  id: string
  title: string
  description: string
  industry: string
  education: string
  salaryMin: number
  salaryMax: number
  imageUrl: string
  videoUrl?: string
  skills: string[]
  pathway: PathwayStep[]
}

type PathwayStep = {
  stage: string
  duration: string
  description: string
}

type Mentor = {
  id: string
  name: string
  career: string
  bio: string
  imageUrl: string
  availability: string[]
}

type Booking = {
  id: string
  studentId: string
  mentorId: string
  careerId: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed'
}
```

### Mock Data
Create realistic mock data:
- 20+ career profiles (Software Dev, Doctor, Teacher, Farmer, etc.)
- 10+ mentors across different careers
- Sample assessment questions (15-20)
- Booking slots for next 2 weeks

---

## Tailwind Configuration

Add to `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F7FD04',
        background: '#FFFEF2',
      },
      boxShadow: {
        'brutal': '4px 4px 0px #000',
        'brutal-lg': '8px 8px 0px #000',
      },
      borderWidth: {
        '3': '3px',
      }
    }
  }
}
```

### Component Examples

**Button:**
```tsx
<button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
  Get Started
</button>
```

**Card:**
```tsx
<div className="p-6 bg-white border-3 border-black shadow-brutal">
  <h3 className="text-3xl font-black mb-2">Software Developer</h3>
  <p className="text-lg">Build apps that change lives</p>
</div>
```

**Input:**
```tsx
<input 
  className="w-full px-4 py-3 text-lg border-3 border-black focus:outline-none focus:border-primary"
  placeholder="Your email"
/>
```

---

## Implementation Rules

### DO:
✅ Use thick borders (2-4px) everywhere  
✅ Apply solid shadows with offset  
✅ Make typography bold and oversized for headers  
✅ Embrace asymmetry in layouts  
✅ Use high contrast colors  
✅ Keep corners sharp (0-4px border radius max)  
✅ Add generous whitespace  
✅ Make interactive states obvious (shadow, border changes)  

### DON'T:
❌ Use gradients  
❌ Add blur or soft shadows  
❌ Make rounded corners (except minimal 2-4px)  
❌ Use pastel or muted colors  
❌ Create symmetric, perfect grids  
❌ Add complex animations  
❌ Use tiny typography  
❌ Hide borders or shadows  

---

## Responsive Design

### Mobile (< 768px):
- Stack asymmetric layouts vertically
- Maintain thick borders and shadows
- Reduce font sizes but keep them bold
- Full-width buttons
- Simplified navigation (hamburger menu)

### Tablet (768px - 1024px):
- 2-column grids for careers
- Side-by-side layouts for some sections
- Larger touch targets

### Desktop (> 1024px):
- Full asymmetric layouts
- Overlap elements
- Max width containers (1280px)
- Larger typography

---

## Testing Checklist

### Visual:
- [ ] All borders are visible (3px black)
- [ ] Shadows are solid offsets (no blur)
- [ ] Typography is bold and large
- [ ] Colors are high contrast
- [ ] Layout is intentionally asymmetric
- [ ] No gradients or soft effects

### Functional:
- [ ] All pages load without errors
- [ ] Navigation works between pages
- [ ] Forms validate inputs
- [ ] Buttons have hover states
- [ ] Mobile responsive
- [ ] Mock data displays correctly

### Accessibility:
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] Form labels present

---

## Deliverables

1. **All 9 page types** fully designed and functional
2. **Responsive** on mobile, tablet, desktop
3. **Mock data** for all features
4. **Component library** of reusable UI elements
5. **Clean code** with TypeScript types
6. **README** with setup instructions

---

## Next Steps (After UI Complete)

Once frontend is done and tested:
1. Review with stakeholders
2. Gather feedback
3. Make iterations
4. **THEN** integrate Convex backend
5. Replace mock data with real database queries

---

## Questions answered

- Video hosting solution? - YouTube embed
- Image assets source? - nUnsplash and some Client photos?)
- Font licensing? - Google Fonts is fine

---

## Inspiration References

**Neobrutalism Examples:**
- gumroad.com (bold cards, thick borders)
- linear.app (sharp, geometric)
- resend.com (high contrast, clean)

**Career Platforms (for features):**
- pathful.com
- scoir.com
- 80000hours.org

---

**Remember:** Start simple. Build ugly but functional. Then make it beautiful with neobrutalism. Focus on **working UI first**, polish second. No database or backend until this is done.

Let's build something students will actually remember and use!