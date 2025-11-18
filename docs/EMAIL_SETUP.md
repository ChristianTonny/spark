# Email Notification System

## Overview

Spark uses **Resend** for transactional email notifications. The system is integrated with Convex and sends emails for:

- ✅ Booking confirmations (when mentor approves)
- ⏰ Booking reminders (24 hours before session)
- 📝 Mentor application notifications (to admin)

---

## Setup Instructions

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up (free tier includes 3,000 emails/month)
3. Verify your email address

### 2. Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Copy the key (starts with `re_`)
4. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_key_here
   ```

### 3. Configure Sender Email

**Option A: Use Resend's Test Domain (Development)**
```bash
RESEND_FROM_EMAIL=Spark <onboarding@resend.dev>
```

**Option B: Use Your Own Domain (Production)**
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `spark.rw`)
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually 5-10 minutes)
6. Update `.env.local`:
   ```bash
   RESEND_FROM_EMAIL=Spark <notifications@spark.rw>
   ```

### 4. Set Admin Email

```bash
ADMIN_EMAIL=admin@yourdomain.com
```

### 5. Set Webhook Secret

Generate a random string for security:
```bash
CONVEX_WEBHOOK_SECRET=$(openssl rand -base64 32)
```

Or use an online generator: https://generate-secret.now.sh/32

### 6. Set Application URL

**Development:**
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Production:**
```bash
NEXT_PUBLIC_APP_URL=https://spark.rw
```

---

## Email Types

### 1. Booking Confirmation

**Trigger:** When mentor approves a booking request

**Sent to:** Student's email

**Contains:**
- Mentor name
- Session date/time
- Career topic
- Duration
- Meeting link (if provided)

**Code:** `convex/careerChats.ts` → `approveBooking` mutation

### 2. Booking Reminder

**Trigger:** 24 hours before scheduled session

**Sent to:** Both student and mentor

**Contains:**
- Session details
- Participant name
- Meeting link

**Implementation:** Set up Convex scheduled action:
```typescript
// In convex/crons.ts (to be created)
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.hourly(
  "send-booking-reminders",
  { hourUTC: 10 }, // 10 AM UTC = 12 PM Kigali time
  internal.careerChats.sendBookingReminders
);

export default crons;
```

### 3. Mentor Application Notification

**Trigger:** When someone submits a mentor application

**Sent to:** Admin email (from `ADMIN_EMAIL` env var)

**Contains:**
- Applicant name
- Application ID
- Link to review application

**Code:** `convex/mentorApplications.ts` → `submit` mutation

---

## Testing Emails

### Test in Development

1. Use Resend's test domain:
   ```bash
   RESEND_FROM_EMAIL=Spark <onboarding@resend.dev>
   ```

2. Send a test email:
   ```bash
   curl -X POST http://localhost:3000/api/emails/send \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_WEBHOOK_SECRET" \
     -d '{
       "type": "booking_confirmation",
       "data": {
         "to": "your-email@example.com",
         "studentName": "John Doe",
         "mentorName": "Jane Smith",
         "careerTitle": "Software Developer",
         "scheduledAt": "'$(date -u +%s)000'",
         "duration": 60,
         "meetingLink": "https://meet.google.com/abc-defg-hij"
       }
     }'
   ```

3. Check your email inbox (might go to spam first time)

### Monitor Emails in Resend

1. Go to [resend.com/emails](https://resend.com/emails)
2. View all sent emails
3. Check delivery status
4. View email content

---

## Email Templates

Templates use inline HTML/CSS with neobrutalist design matching Spark's branding:

- **Colors:** 
  - Yellow: `#FFB627`
  - Blue: `#4ECDC4`
  - Pink: `#FF6B9D`
  - Green: `#95E1D3`
- **Borders:** 3px solid black
- **Fonts:** Arial, sans-serif

Templates are in: `lib/emails/resend.ts`

---

## Troubleshooting

### Emails not sending

1. **Check API key:**
   ```bash
   echo $RESEND_API_KEY
   ```
   Should start with `re_`

2. **Check Convex logs:**
   ```bash
   npx convex logs
   ```
   Look for "Failed to send email" errors

3. **Check Next.js API logs:**
   In your terminal running `npm run dev`

4. **Verify domain (production):**
   Go to Resend dashboard → Domains → Check status

### Emails going to spam

1. **Add SPF record** (in DNS):
   ```
   v=spf1 include:_spf.resend.com ~all
   ```

2. **Add DKIM records** (provided by Resend)

3. **Warm up your domain:**
   - Start with small volumes
   - Gradually increase over 2-3 weeks
   - Monitor bounce rates

### Rate Limits

**Free Tier:**
- 100 emails/day
- 3,000 emails/month

**If exceeded:**
- Upgrade to paid plan ($20/month for 50,000 emails)
- Or implement email queue with retry logic

---

## Future Enhancements

- [ ] Add email preferences in user settings
- [ ] Implement email templates with React Email
- [ ] Add unsubscribe links
- [ ] Track email open rates
- [ ] Add SMS notifications via Twilio
- [ ] Schedule batch emails for newsletters

---

## Cost Estimates

### Resend Pricing

| Plan | Emails/Month | Price |
|------|--------------|-------|
| Free | 3,000 | $0 |
| Pro | 50,000 | $20 |
| Business | 100,000 | $80 |

### Expected Usage (100 active users)

- Booking confirmations: ~50/month
- Booking reminders: ~100/month (2 per booking)
- Mentor applications: ~10/month
- **Total: ~160/month** ✅ Well within free tier

---

## Security

✅ **Webhook Secret:** Prevents unauthorized email sending
✅ **Email Validation:** All email addresses validated before sending
✅ **Rate Limiting:** Resend provides built-in protection
✅ **No User Data in URLs:** No sensitive info in email links
✅ **HTTPS Only:** All API calls use secure connections
