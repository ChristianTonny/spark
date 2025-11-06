# Mentor Discovery & Communication System - Simplified Plan

## Philosophy
**Don't build another scheduling tool**. People already have calendars. Instead, build a **repository of mentors** that students can discover and connect with easily.

## Core Features

### 1. Enhanced Mentor Discovery (Week 1)
**Goal**: Make it super easy to find the right mentor

**Features**:
- **Smart Search & Filters**
  - Search by industry, company, job title, skills
  - Filter by location (Rwanda-based, remote, diaspora)
  - Filter by availability status (active, limited, not accepting)
  - Filter by language (English, Kinyarwanda, French)

- **Mentor Profiles**
  - Professional background (current role, company, experience)
  - "Why I Mentor" story (personal motivation)
  - Areas of expertise (career paths they can advise on)
  - Success stories (anonymized student outcomes)
  - Availability badge: "Active" / "Limited" / "Not Accepting"
  - Response time: "Usually responds within 24hrs"

- **Discovery Features**
  - Featured mentors (rotating spotlight)
  - "Mentors in your field of interest" (based on assessments)
  - "Trending mentors" (most requested this month)
  - Student reviews & testimonials

### 2. Simple Connection Request System (Week 1-2)
**Goal**: Low-friction way to reach out to mentors

**How it works**:
1. Student clicks "Request to Connect" on mentor profile
2. Simple form:
   - Why do you want to connect? (dropdown: Career advice, Industry insights, Resume review, etc.)
   - Tell [Mentor Name] a bit about yourself and what you'd like to discuss (text area, 200 chars)
   - Preferred contact method: In-app chat / Email / Phone / WhatsApp
3. Request goes to mentor's inbox
4. Mentor can:
   - Accept (opens chat or shares contact)
   - Decline politely (with optional template message)
   - Request more info

### 3. In-App Messaging System (Week 2-3)
**Goal**: Simple, async communication without leaving the platform

**Features**:
- **Basic Chat**
  - Text messages only (keep it simple)
  - File attachments (resume, portfolio)
  - Read receipts
  - Message notifications (email + in-app)

- **Conversation Management**
  - Student view: List of active conversations with mentors
  - Mentor view: Inbox with connection requests + active chats
  - Archive conversations when done
  - Mark as "Needs Follow-up"

- **Templates & Quick Replies** (for mentors)
  - "Thanks for reaching out, I'd be happy to chat. When works for you?"
  - "Let me review your resume and get back to you"
  - Pre-written responses for common questions

### 4. Flexible Meeting Coordination (Week 3)
**Goal**: Let people use their preferred tools, just facilitate the coordination

**How it works**:
- NO calendar integration
- NO video rooms
- Instead, simple coordination:
  1. In the chat, mentor can send a "Schedule a Call" message
  2. Shows a simple UI:
     - "I'm available: [Time options mentor types in]"
     - "Let's meet via: [Zoom/Google Meet/Phone/WhatsApp] link: [mentor's link]"
  3. Student picks a time
  4. Both get confirmation message with:
     - Meeting time
     - Meeting link/details
     - Reminder notification (1 day before, 1 hour before)

**Alternative (even simpler)**:
- Mentor just shares their Calendly/Cal.com link in chat
- Student books directly
- Keep it simple!

### 5. Track Impact, Not Bookings (Week 4)
**Goal**: Show value of mentorship, not just metrics

**For Students**:
- Mentors you've connected with (with contact history)
- Conversations you've had
- Next steps / action items from conversations
- Progress tracker: "Update your mentor on your progress"

**For Mentors**:
- Students you've helped (anonymized stats)
- Total conversations
- "Impact score" based on student feedback
- Monthly summary: "You helped 12 students this month!"

**For Platform**:
- Success stories: "After talking to [Mentor], I got an internship at [Company]"
- Connection quality > connection quantity

## Database Schema (Simplified)

```typescript
// Connection Requests
connectionRequests: {
  id
  studentId
  mentorId
  requestType: "career_advice" | "industry_insights" | "resume_review" | "general"
  message (student's intro message)
  preferredContact: "in_app" | "email" | "phone" | "whatsapp"
  status: "pending" | "accepted" | "declined"
  createdAt
}

// Messages (in-app chat)
messages: {
  id
  conversationId
  senderId
  messageType: "text" | "file" | "meeting_proposal"
  content
  fileUrl (optional)
  meetingDetails (optional: { time, platform, link })
  readAt
  createdAt
}

// Conversations
conversations: {
  id
  studentId
  mentorId
  status: "active" | "archived"
  lastMessageAt
  unreadCount (for each party)
}

// Mentor Profiles (extend existing)
professionals: {
  ...existing fields
  + whyIMentor (string)
  + availabilityStatus: "active" | "limited" | "not_accepting"
  + avgResponseTime (calculated in hours)
  + languages: ["English", "Kinyarwanda", "French"]
  + studentsFeedback: [{rating, testimonial}]
}
```

## User Flows

### Student Flow:
1. Browse mentors → Filter by field of interest
2. Find interesting mentor → Read profile, reviews
3. Click "Request to Connect" → Fill simple form
4. Mentor accepts → Start chatting in-app
5. Coordinate meeting in chat → Use their Calendly/Meet link
6. Have conversation → Follow up in chat
7. Leave review for mentor

### Mentor Flow:
1. Get notification: "New connection request from [Student]"
2. Review student's message → Accept or decline
3. Chat with student → Share advice, resources
4. Share meeting link if needed → "Here's my Calendly link"
5. Have conversation
6. Follow up → Check student's progress
7. See impact dashboard → Feel good about helping!

## Why This Works Better

✅ **Simple**: No complex calendar sync, no video infrastructure
✅ **Flexible**: Let mentors use tools they already love
✅ **Focused**: Discovery + communication, not scheduling
✅ **Personal**: Direct connection, not transactional booking
✅ **Scalable**: Easy to add mentors, easy for students to find them
✅ **Low Maintenance**: Less moving parts = fewer bugs

## MVP Timeline (3 weeks)

**Week 1**: Enhanced mentor discovery + connection requests
**Week 2**: In-app messaging system
**Week 3**: Meeting coordination + impact tracking

## Next Steps

Would you like me to:
1. Start implementing the enhanced mentor discovery (profiles, search, filters)?
2. Build the connection request system?
3. Create the messaging infrastructure?

This approach focuses on what you said: creating a **repository of great mentors** that students can **browse and talk to**, without trying to be another scheduling product.
