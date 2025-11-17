# 🛡️ Admin System & Mentor Approval - Implementation Plan

**Date:** 2025-11-17
**Status:** Ready to Implement
**Admin Email:** ctonny111@gmail.com

---

## 🎯 **Objectives**

1. **Build Admin Dashboard** - Centralized control panel for platform management
2. **Mentor Application System** - Replace open signup with vetted approval process
3. **Basic Analytics** - Track key platform metrics
4. **Role-Based Access** - Secure admin-only features

---

## 📋 **Current State vs Target State**

### **Current State:**
- ❌ Anyone can become a mentor (no vetting)
- ❌ All mentors show publicly immediately
- ❌ No admin interface
- ❌ No way to manage users/content
- ❌ No platform metrics visibility

### **Target State:**
- ✅ Mentors must apply and get approved
- ✅ Only approved mentors show publicly
- ✅ Admin can review applications
- ✅ Admin dashboard with platform overview
- ✅ Basic analytics and metrics
- ✅ User management interface

---

## 🏗️ **Architecture Changes**

### **1. Database Schema Updates**

#### **Add Admin Role:**
```typescript
// convex/schema.ts - Update users table role
role: v.union(
  v.literal("student"),
  v.literal("mentor"),
  v.literal("educator"),
  v.literal("company"),
  v.literal("partner"),
  v.literal("admin") // ← NEW
)
```

#### **Update Professional Profiles:**
```typescript
// Add approval status to professionals table
professionals: defineTable({
  // ... existing fields

  // NEW FIELDS:
  isApproved: v.boolean(),           // Admin approval status
  approvedAt: v.optional(v.number()), // When approved
  approvedBy: v.optional(v.id("users")), // Which admin approved

  // Link to application
  applicationId: v.optional(v.id("mentorApplications")),
})
```

#### **Mentor Applications Already Exists:**
```typescript
// convex/schema.ts (already defined)
mentorApplications: defineTable({
  fullName: v.string(),
  email: v.string(),
  phone: v.string(),
  linkedin: v.optional(v.string()),
  currentRole: v.string(),
  company: v.string(),
  yearsExperience: v.string(),
  industry: v.string(),
  careerField: v.string(),
  availability: v.string(),
  motivation: v.string(),
  sessionsPerMonth: v.string(),
  focusAreas: v.array(v.string()),
  status: v.union(
    v.literal("pending"),
    v.literal("approved"),
    v.literal("rejected")
  ),
  submittedAt: v.number(),
  reviewedAt: v.optional(v.number()),
  reviewNotes: v.optional(v.string()),
})
```

---

## 🔧 **Implementation Plan**

### **Phase 1: Admin Role & Access** (30 min)

**Files to Create/Update:**
1. `convex/schema.ts` - Add admin role
2. `convex/users.ts` - Add function to make user admin
3. `convex/admin.ts` - NEW - Admin-only queries/mutations
4. `lib/hooks/useAdminGuard.ts` - NEW - Admin access guard hook

**Tasks:**
- [ ] Update schema with admin role
- [ ] Create function to assign admin role to ctonny111@gmail.com
- [ ] Create admin guard hook (redirect if not admin)
- [ ] Deploy schema changes

---

### **Phase 2: Public Mentor Application Form** (45 min)

**Files to Create:**
1. `app/apply-as-mentor/page.tsx` - Public application form
2. `convex/mentorApplications.ts` - NEW - Application mutations

**Form Fields:**
- Personal Info: Name, Email, Phone, LinkedIn
- Professional Info: Current Role, Company, Years Experience
- Platform Info: Industry, Career Field, Availability
- Motivation: Why join as mentor?
- Expected Sessions: How many per month?
- Focus Areas: Multi-select checkboxes

**Flow:**
```
User visits /apply-as-mentor
  → Fills out application form
  → Submits (creates mentorApplications record)
  → Redirects to confirmation page
  → Admin gets notified (appears in admin dashboard)
```

---

### **Phase 3: Admin Dashboard** (1.5 hours)

#### **3A. Main Dashboard** (`/admin/dashboard`)

**Layout:**
```
┌─────────────────────────────────────────┐
│ ADMIN DASHBOARD                         │
├─────────────────────────────────────────┤
│ [Pending Applications: 5]               │
│ [Total Users] [Active Mentors] [Bookings]│
├─────────────────────────────────────────┤
│ Recent Activity Feed                    │
│ Quick Actions                           │
└─────────────────────────────────────────┘
```

**Stats Cards:**
- Total Users (by role)
- Pending Applications (count)
- Total Bookings (this month)
- Total Revenue
- Published Articles
- Active Sessions

**Quick Actions:**
- Review Applications
- Manage Users
- View Bookings
- View Articles

**Recent Activity:**
- Last 10 signups
- Last 10 bookings
- Last 10 applications

---

#### **3B. Mentor Applications Page** (`/admin/mentor-applications`)

**UI:**
```
┌─────────────────────────────────────────┐
│ MENTOR APPLICATIONS                     │
├─────────────────────────────────────────┤
│ [Pending: 5] [Approved: 12] [Rejected: 3]│
├─────────────────────────────────────────┤
│ Application Card:                       │
│  - Name, Email, Current Role           │
│  - Company, Experience                 │
│  - Industry, Career Field              │
│  - [View Details] [Approve] [Reject]   │
└─────────────────────────────────────────┘
```

**Features:**
- Tab navigation: Pending | Approved | Rejected
- Expandable cards showing full application details
- Approve button → Creates user + professional profile
- Reject button → Updates status + optional note
- Search/filter applications

**Approval Process:**
```typescript
// When admin clicks "Approve":
1. Check if user exists (by email)
2. If not, create user account with role="mentor"
3. Create professional profile (isApproved=true)
4. Link application to professional
5. Update application status to "approved"
6. Send approval email (future)
7. Mentor can now login and appear publicly
```

---

#### **3C. User Management** (`/admin/users`)

**Features:**
- List all users (paginated)
- Filter by role
- Search by name/email
- View user details
- Suspend/Activate accounts
- Change roles (careful!)
- View user activity

**Table Columns:**
- Name
- Email
- Role
- Status (Active/Suspended)
- Joined Date
- Actions (View, Edit, Suspend)

---

#### **3D. Bookings Overview** (`/admin/bookings`)

**Features:**
- View all bookings
- Filter by status (pending, confirmed, completed)
- Search by student/mentor name
- Export to CSV
- View booking details

---

#### **3E. Articles Moderation** (`/admin/articles`)

**Features:**
- List all articles (published + drafts)
- Filter by category
- Search by title/author
- View article
- Unpublish article (if inappropriate)
- Delete article

---

#### **3F. Platform Analytics** (`/admin/analytics`)

**Basic Metrics:**

**User Metrics:**
- Total users (line chart over time)
- Users by role (pie chart)
- Active users (last 7/30 days)
- New signups this week/month

**Engagement Metrics:**
- Total bookings
- Bookings by status
- Average bookings per mentor
- Booking completion rate

**Content Metrics:**
- Total articles published
- Articles by category
- Top articles (by views)
- Articles published this month

**Revenue Metrics:**
- Total platform earnings
- Earnings by mentor
- Average session price
- Revenue growth chart

**Career Metrics:**
- Most viewed careers
- Most bookmarked careers
- Popular categories
- Assessment completions

---

### **Phase 4: Update Public Pages** (30 min)

**Files to Update:**
1. `app/mentors/page.tsx` - Only show approved mentors
2. `convex/professionals.ts` - Add approval filter to queries

**Changes:**
```typescript
// OLD: Show all mentors
export const getAllProfessionals = query(async (ctx) => {
  return await ctx.db.query("professionals").collect();
});

// NEW: Show only approved mentors
export const getAllProfessionals = query(async (ctx) => {
  return await ctx.db
    .query("professionals")
    .filter((q) => q.eq(q.field("isApproved"), true))
    .collect();
});
```

---

### **Phase 5: Navigation & Access Control** (20 min)

**Updates:**
1. Add "Apply as Mentor" link in public navigation
2. Add "Admin" link for admin users only
3. Create role guards for all admin pages

**Navigation Changes:**

**For Non-Logged-In Users:**
```
Home | Careers | Resources | Mentors | [Apply as Mentor] | Sign In
```

**For Students:**
```
(No change - existing nav)
```

**For Mentors (Unapproved):**
```
Dashboard (shows "Pending Approval" message)
```

**For Mentors (Approved):**
```
Dashboard | Bookings | Articles | Availability | Earnings
```

**For Admins:**
```
[Admin Dashboard] + all student features
```

---

## 📊 **Analytics Implementation**

### **Queries to Create:**

```typescript
// convex/analytics.ts

// User metrics
export const getUserStats = query(async (ctx) => {
  const users = await ctx.db.query("users").collect();
  return {
    total: users.length,
    students: users.filter(u => u.role === "student").length,
    mentors: users.filter(u => u.role === "mentor").length,
    // ... by role
  };
});

// Booking metrics
export const getBookingStats = query(async (ctx) => {
  const bookings = await ctx.db.query("careerChats").collect();
  return {
    total: bookings.length,
    completed: bookings.filter(b => b.status === "completed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    // ... by status
  };
});

// Revenue metrics
export const getRevenueStats = query(async (ctx) => {
  const professionals = await ctx.db.query("professionals").collect();
  const totalEarnings = professionals.reduce((sum, p) => sum + p.totalEarnings, 0);
  return {
    total: totalEarnings,
    thisMonth: /* calculate */,
    // ...
  };
});

// Article metrics
export const getArticleStats = query(async (ctx) => {
  const articles = await ctx.db.query("articles").collect();
  return {
    total: articles.filter(a => a.status === "published").length,
    drafts: articles.filter(a => a.status === "draft").length,
    totalViews: articles.reduce((sum, a) => sum + a.viewCount, 0),
  };
});

// Recent activity
export const getRecentActivity = query(async (ctx) => {
  // Last 10 users
  // Last 10 bookings
  // Last 10 applications
  // Return combined activity feed
});
```

---

## 🔐 **Security Considerations**

### **Role Checks:**
```typescript
// All admin mutations must check:
const user = await getCurrentUser(ctx);
if (user.role !== "admin") {
  throw new Error("Unauthorized: Admin access required");
}
```

### **Admin Guard Hook:**
```typescript
// lib/hooks/useAdminGuard.ts
export function useAdminGuard() {
  const user = useConvexUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);
}
```

---

## 📁 **File Structure**

```
/app
  /admin
    /layout.tsx                 # Admin layout with sidebar
    /page.tsx                   # Main dashboard
    /mentor-applications
      /page.tsx                 # Application review
    /users
      /page.tsx                 # User management
    /bookings
      /page.tsx                 # Bookings overview
    /articles
      /page.tsx                 # Article moderation
    /analytics
      /page.tsx                 # Platform metrics
  /apply-as-mentor
    /page.tsx                   # Public application form
    /confirmation
      /page.tsx                 # "Thank you" page

/convex
  admin.ts                      # Admin-only queries/mutations
  mentorApplications.ts         # Application CRUD
  analytics.ts                  # Analytics queries

/lib/hooks
  useAdminGuard.ts              # Admin access guard

/components
  AdminSidebar.tsx              # Admin nav sidebar
  StatCard.tsx                  # Reusable stat card
  ApplicationCard.tsx           # Mentor application card
```

---

## ⏱️ **Time Estimates**

| Phase | Task | Time |
|-------|------|------|
| 1 | Admin Role & Access | 30 min |
| 2 | Mentor Application Form | 45 min |
| 3A | Admin Dashboard Overview | 30 min |
| 3B | Mentor Applications Page | 45 min |
| 3C | User Management | 30 min |
| 3D | Bookings Overview | 20 min |
| 3E | Articles Moderation | 20 min |
| 3F | Platform Analytics | 30 min |
| 4 | Update Public Pages | 30 min |
| 5 | Navigation & Guards | 20 min |
| **TOTAL** | | **~5 hours** |

---

## 🧪 **Testing Checklist**

After implementation:

**Admin Access:**
- [ ] ctonny111@gmail.com has admin role
- [ ] Admin can access /admin routes
- [ ] Non-admins redirected from /admin routes

**Mentor Application:**
- [ ] Public can submit application
- [ ] Application appears in admin dashboard
- [ ] Admin can approve application
- [ ] Approved mentor can login
- [ ] Approved mentor appears on /mentors page
- [ ] Unapproved mentor does NOT appear on /mentors

**User Management:**
- [ ] Admin can view all users
- [ ] Admin can search/filter users
- [ ] Admin can suspend accounts

**Analytics:**
- [ ] Stats display correctly
- [ ] Charts render properly
- [ ] Export functions work

---

## 🚀 **Deployment Steps**

1. **Schema Changes:**
   ```bash
   # Deploy schema updates
   npx convex deploy
   ```

2. **Make Admin:**
   ```bash
   # Run mutation to make ctonny111@gmail.com admin
   npx convex run admin:makeUserAdmin --email "ctonny111@gmail.com"
   ```

3. **Test Locally:**
   - Test all admin features
   - Test mentor application flow
   - Test public mentor filtering

4. **Deploy to Production:**
   ```bash
   npm run build
   vercel --prod
   ```

---

## 📝 **Future Enhancements**

**Phase 2 (Later):**
- Email notifications on application approval/rejection
- Bulk actions (approve multiple applications)
- Advanced analytics dashboard
- User activity logs
- Mentor performance reports
- Automated fraud detection
- Integration with PostHog for deeper insights

---

## ✅ **Success Criteria**

- [x] Plan documented
- [ ] Admin role implemented
- [ ] Mentor application form live
- [ ] Admin dashboard functional
- [ ] Only approved mentors visible publicly
- [ ] Basic analytics working
- [ ] ctonny111@gmail.com has admin access
- [ ] All features tested end-to-end

---

**Next Step:** Start implementation Phase 1 🚀
