# 🚀 Quick Start Guide

Get Spark Learning Platform running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

This will install:
- Next.js 14.1.0
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Hook Form + Zod
- Lucide React icons

### 2. Run Development Server
```bash
npm run dev
```

Server will start at: **http://localhost:3000**

## 🎯 What's Available

### Pages You Can Visit

1. **Homepage** - `/`
   - Landing page with features
   - Call-to-action buttons

2. **Login** - `/login`
   - Email/phone authentication
   - Password show/hide toggle
   - "Remember me" option
   - Google sign-in (UI only)
   - Guest access link

3. **Signup** - `/signup`
   - Step 1: Role selection (Student/Educator/Mentor)
   - Step 2: Role-specific information form
     - Student: Grade level, district, language
     - Educator: Qualification, subject, experience, institution
     - Mentor: Expertise, availability, background, motivation
   - Step 3: Terms and preferences
   - Success screen with role-based redirect

4. **Student Dashboard** - `/dashboard/student`
   - Profile overview with avatar
   - 4 stat cards (streak, downloads, questions, practice)
   - Recent activity timeline
   - Downloaded content with progress bars
   - Learning goals tracker
   - Achievement badges (locked/unlocked)
   - Quick action buttons (Browse Content, Ask Question, Start Practice)

5. **Educator Dashboard** - `/dashboard/educator`
   - Profile with subject expertise and rating
   - 4 stat cards (uploaded, verified, students reached, avg rating)
   - Pending verification queue with urgency levels
   - Recent uploads with download stats
   - Student engagement by subject
   - Quick actions (Upload Content, Verify Submissions, Analytics)

6. **Mentor Dashboard** - `/dashboard/mentor`
   - Profile with expertise and helpful rating
   - 4 stat cards (questions answered, students helped, response time, helpful %)
   - Question queue with urgency indicators
   - Recent answers with helpful votes
   - Subject breakdown chart
   - Achievement badges
   - Quick actions (Browse Questions, View Students, Set Availability)

### UI Components Available

Located in `components/ui/`:
- `Button` - Multiple variants (default, outline, ghost, link)
- `Input` - With icon support and error messages
- `Card` - Content containers with header/footer
- `Badge` - Status indicators (success, warning, offline, online)
- `Checkbox` - Form checkboxes
- `Label` - Form labels

### Special Components

- `ConnectionStatus` - Shows online/offline/syncing states
  - Auto-detects network status
  - Shows banner at top of screen
  - Different colors for each state

## 📱 Testing Responsive Design

### Using Browser DevTools

1. Open Chrome/Edge DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test these views:
   - **Mobile**: iPhone SE (375px)
   - **Tablet**: iPad (768px)
   - **Desktop**: 1920px

### Recommended Test Devices

- Mobile: 375px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

## 🎨 Design Tokens

### Using Custom Colors

```tsx
// Tailwind classes
<div className="bg-spark-blue text-white">
<div className="text-spark-green">
<Badge variant="offline" />
```

### Using Icons

```tsx
import { BookOpen, Download, Mail } from "lucide-react";

<BookOpen className="h-5 w-5" />
```

## 🔧 Common Tasks

### Add a New Page

1. Create file in `app/` directory:
```bash
app/new-page/page.tsx
```

2. Use this template:
```tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1>New Page</h1>
    </div>
  );
}
```

### Create a Form with Validation

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Too short"),
});

type FormData = z.infer<typeof schema>;

export default function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} error={errors.email?.message} />
      <Input type="password" {...register("password")} error={errors.password?.message} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Add Mock Data

```tsx
// At the top of your component
const mockData = {
  users: [
    { id: 1, name: "Jane Doe", email: "jane@example.com" },
    { id: 2, name: "John Smith", email: "john@example.com" },
  ],
};

// Use in JSX
{mockData.users.map(user => (
  <div key={user.id}>{user.name}</div>
))}
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check for errors
npm run typecheck

# Some errors might auto-fix on save
```

### Styling Not Applying

1. Check Tailwind class names are correct
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Clear browser cache

## 📊 Performance Tips

### For Development

- Hot reload is automatic
- Changes appear instantly
- No need to refresh browser

### For Production

```bash
# Build optimized version
npm run build

# Test production build
npm run start
```

## 🎯 Next Steps

### Enhance Existing Dashboards
- Add real-time data updates
- Create detailed views for content, questions, and analytics
- Add filtering and search functionality
- Implement sorting and pagination

### Build Admin Dashboard
- Copy educator/mentor dashboard structure
- Add user management features
- Platform-wide analytics
- Content moderation tools

### Add Backend Integration
- Create API routes in `app/api/`
- Connect to database (PostgreSQL/MongoDB)
- Implement authentication with JWT/sessions
- Use React Query for data fetching
- Handle loading and error states

### Implement Profile Settings
- `/dashboard/{role}/profile` - Edit profile page
- `/dashboard/{role}/settings` - User preferences
- Account security settings
- Notification preferences

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)

## ❓ Need Help?

1. Check the main README.md
2. Look at existing component examples
3. Search Next.js documentation
4. Ask in project discussions

---

Happy coding! 🎉
