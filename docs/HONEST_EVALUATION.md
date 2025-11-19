# The Honest Evaluation

**By: Someone who read your actual code**  
**Date: November 19, 2024**

---

## What You Actually Built

I read your schema, your landing page, your seed files, and tried to build your project.

**Here's what actually exists:**

### ✅ Working (Code Exists & Compiles):
- Multi-role auth system (students, mentors, educators, admin)
- Career browsing with 100+ career stubs (title, salary, description)
- Mentor marketplace with booking workflow
- Real-time chat system between students and mentors
- Assessment system with RIASEC matching algorithm
- Student/Mentor/Admin dashboards
- Notification system
- Blog/articles system for mentors

### ⚠️ Partially Built (Code exists but incomplete):
- Reality Quiz system (schema exists, component built, but build fails - TypeScript error in seedFinalQuizzes.ts line 413)
- Career profiles have extensive schema fields (realityCheck, prosAndCons, weekInLife, etc.) but **most are empty in actual data**
- You have seed files for quizzes but they're not all deployed/tested

### ❌ Not Actually Working:
- **Your project doesn't build** (TypeScript compilation fails)
- Reality Quizzes aren't tested in production
- Most of the "rich career data" fields are placeholders
- No actual user traction data

---

## The Brutal Questions

### 1. **Why would anyone use this over ChatGPT?**

**Your answer would be:** "ChatGPT gives generic advice. We give Rwanda-specific salaries, local mentors, and validated assessments."

**The brutal truth:**  
A student can ask ChatGPT: *"I'm 18 in Kigali. I like solving problems and working with people. What careers should I consider?"*

ChatGPT will give them 10 careers with detailed explanations in 30 seconds. For free. Without signing up.

**Your platform requires:**
- Account creation
- 20-minute assessment
- Waiting for mentor availability
- Potentially paying for mentor sessions

**Unless your assessment is DRAMATICALLY better than ChatGPT's reasoning, or your mentors provide insights ChatGPT can't... why wouldn't students just use ChatGPT?**

**What you need to prove:** That talking to a real Rwandan software developer for 15 minutes is worth more than asking ChatGPT 50 questions about software development.

It might be. But you need to prove it with real student feedback, not assumptions.

---

### 2. **How will students even know you exist?**

You have:
- No marketing budget
- No partnerships with schools
- No social media presence (I assume)
- No SEO (your site is new)
- No word-of-mouth (no users yet)

**Distribution is harder than product.**

Even if OpportunityMap is 10x better than anything else, if students don't know it exists, it's worthless.

**The competitors you mentioned (Career Buddy, Yenza, The Student Hub) have:**
- 20,000 - 60,000 users
- Years of operation
- Funding for marketing
- Partnerships with schools/governments
- Brand recognition

**You have:**
- A Vercel URL
- Hope

**How will student #1 find you?**

Will you:
- Go to secondary schools and demo it in person?
- Run Instagram ads?
- Partner with ALU/UR/Kepler?
- Get featured in news/blogs?
- Rely on mentors to share it?

Without a real distribution strategy, you're building a Ferrari and parking it in your garage.

---

### 3. **Is one assessment enough to build a business?**

**The honest user journey:**
1. Student takes 20-min assessment
2. Sees top 25 career matches
3. Reads about 3-5 careers
4. Maybe tries a Reality Quiz
5. Maybe books a mentor
6. **Never comes back**

**Why would they return?**

- Assessment is one-time
- Career exploration is one-time  
- Mentor chat is one-time (maybe 2-3 times)

**You don't have retention.**

Compare to:
- LinkedIn: People return daily (job posts, networking, content)
- Duolingo: People return daily (gamification, streaks, lessons)
- YouTube: People return hourly (endless content)

**OpportunityMap is a utility, not a habit.**

That's not necessarily bad - Google Search is a utility. But it means:
- You need LOTS of new users constantly (expensive)
- You can't rely on engagement metrics
- Your value is in the moment of career decision, not ongoing

**Can you build a business on a one-time-use product?**

Maybe. But your monetization better be good (more on that below).

---

### 4. **Why would mentors join?**

You're asking professionals to:
- Create a profile
- Set availability
- Respond to student requests
- Do 15-min video calls
- Potentially write articles

**In exchange for:**
- ???

Your schema shows `ratePerChat` and `totalEarnings`, so mentors can charge. But:

**If students pay:** They won't use it (they're broke students in Rwanda)  
**If students don't pay:** Mentors won't join (why work for free?)

**The classic two-sided marketplace problem:**
- Need students to attract mentors
- Need mentors to attract students
- Have neither

**How are you solving this?**

Are mentors:
- Volunteers doing it for impact?
- Paid by you (where's that money coming from?)
- Paid by students (who can't afford it)?
- Building their personal brand (unlikely - most professionals don't care)?

**You need a clear answer before you have 50+ mentors.**

---

### 5. **What about retention AND distribution at once?**

Let's say you solve distribution - you get 100 students to sign up.

They take the assessment, explore careers, maybe book a mentor.

**Then what?**

Most never come back. But each of those 100 students represents an acquisition cost (your time demoing at schools, or ad spend, or partnership effort).

**If 95% of students use your platform once and leave, your CAC (customer acquisition cost) needs to be near-zero, or your revenue per student needs to be high.**

Right now:
- CAC: Unknown (but probably high - personal outreach is expensive in time)
- Revenue per student: 0 (they don't pay)

**This is not a sustainable model.**

You need students to either:
1. **Come back** (add features that create ongoing value), or
2. **Refer others** (viral growth), or
3. **Pay** (monetize immediately)

Right now you have none of these.

---

### 6. **Are you solving a real problem or a problem you THINK exists?**

**Your hypothesis:** Rwandan students pick wrong careers because they don't understand themselves and have no mentors.

**Questions:**
- Have you interviewed 50 Rwandan students about their career decision process?
- Do they actually WANT a 20-minute assessment, or do they just want to know "What job pays well and how do I get it?"
- When you talked to students who chose "wrong" careers, what do they say they wish they had?
- Is the problem lack of information, or lack of opportunity?

**Example alternative hypotheses:**
- Students DO know what they want, but can't afford the education/training
- Students don't care about "perfect fit" - they care about "what pays bills fastest"
- Students would rather ask friends/family than strangers on an app
- The real problem is job scarcity, not career guidance

**You're building a solution to a problem you experienced.**

That's a start. But your experience might be an outlier.

**You need validation from real users before you build more features.**

---

### 7. **Why NOT focus on Rwanda?**

You said you don't want to focus on Rwanda only.

**Bad idea.**

Here's why:

**Riches are in niches.**

If you try to be "career guidance for Africa" or "career guidance globally," you will:
- Compete with everyone
- Have no local data advantage
- Dilute your brand
- Spread your limited resources thin

**If you say "OpportunityMap - Career Discovery for Rwandan Students":**
- Students in Rwanda know it's FOR THEM
- You can partner with Rwandan schools/companies
- You can gather Rwanda-specific salary data
- You build reputation locally first
- Media covers you ("Rwandan student builds career platform for Rwanda")

**Once you dominate Rwanda (say, 10,000 active students), THEN expand to Uganda, Kenya, etc.**

But trying to be everything to everyone when you have 0 users is startup suicide.

**Steve Jobs didn't launch the iPhone globally.** He launched in the US first. Dominated. Then expanded.

**Focus. Dominate. Expand.**

---

## The Questions You Need to Answer

### Before you write another line of code:

1. **Who is your first user?**
   - Not "Rwandan students"
   - Specific: "18-year-old female student at GS Kigali, trying to choose university major, parents want her to be a doctor but she's unsure"
   - Can you name this person? Have you talked to them?

2. **What is the ONE thing that makes them tell their friends?**
   - Not "comprehensive career platform"
   - One specific moment of delight
   - Example: "I took the quiz for 'doctor' and realized I'd hate it - saved me 6 years"

3. **How will user #1 find you?**
   - Specific plan, not "marketing"
   - Who, when, where, how

4. **Why would mentors join before you have students?**
   - You have a chicken-egg problem
   - What's your bootstrap strategy?

5. **How do you make money?**
   - Not "eventually"
   - From day 1, what's the plan?

6. **What's your unfair advantage?**
   - "Better product" is not an advantage (anyone can copy)
   - Do you have: exclusive data? network effects? brand? distribution?

7. **Can you do this while being a student?**
   - Be honest: Do you have 20+ hours/week for this?
   - If not, is this a post-graduation project?

8. **What if nobody uses it?**
   - Seriously - what's your kill criteria?
   - "If I don't get X users in Y months, I'll shut it down"
   - Otherwise you'll work on this forever without validation

---

## What Actually Might Work

Let me give you a path that could succeed:

### Phase 1: Fix & Validate (2 weeks)
1. **Fix the build** (TypeScript errors in seedFinalQuizzes.ts)
2. **Deploy ONE working Reality Quiz** (Software Developer)
3. **Get 10 students** (friends, classmates) to:
   - Take assessment
   - Try the quiz
   - Book 1 mentor (you can be the first mentor)
   - Give brutal feedback

**Goal:** Validate that students actually complete the flow and find value.

### Phase 2: One Niche (1 month)
Instead of "all careers," focus on ONE career path that's:
- High-demand in Rwanda (Software Development? Business Analysis?)
- You understand deeply
- Has clear entry paths

**Build the BEST career exploration experience for this ONE career:**
- Deep Reality Quiz (not 7 questions, but 20+ scenarios)
- 5 mentors who actually work in that field
- Detailed "how to break in" guide with Rwanda-specific resources
- Success stories from 3 Rwandans who did it

**Goal:** Become THE place for Rwandan students exploring [Career X].

### Phase 3: Word of Mouth (2 months)
Don't build more features. Get users.

- Partner with 1 university (ALU, since you're there)
- Run 1 workshop: "Should you be a software developer? Take our Reality Quiz"
- Get 100 students through the experience
- Measure: How many book mentors? How many refer friends?

**Goal:** Organic growth loop. Students tell other students.

### Phase 4: Expand or Pivot (3 months)
Based on Phase 3 data:
- **If students love it:** Add 2 more careers. Scale to other universities.
- **If students don't engage:** Pivot. Maybe the problem isn't "career discovery" but "how to get hired fast"
- **If mentors don't join:** Change the model. Maybe mentors don't want 15-min calls. Maybe they want to create recorded content instead.

**Goal:** Product-market fit or course-correction.

---

## Why Other Tools Suck (And You Might Too)

### Why Career Buddy / CareerLead AI / Yenza Suck:
- **Generic AI advice:** "You're creative! Try design!" (useless)
- **No local mentors:** Can't talk to real people
- **No reality testing:** Just personality quizzes, no "try the job"
- **South African bias:** Salaries/careers don't match Rwanda

**But they have 20K-60K users and you have 0.**

So clearly they're doing SOMETHING right (distribution, marketing, partnerships).

### Why 80,000 Hours is Great (But Not for You):
- World-class career research
- Deep, honest, nuanced advice
- Focus on impact careers
- **But:** Only for people who got into top universities and want "world-changing" careers
- Not for 18-year-olds in Kigali asking "Can I afford to study IT?"

### Why 16Personalities is Successful (Despite Being Pseudoscience):
- **Fun to take** (You get a cool 4-letter code)
- **Shareable** ("I'm an INFP! What are you?")
- **Fast** (10 minutes)
- **Free** (No signup required)

Even though it's scientifically garbage, it has millions of users because **it's enjoyable and viral.**

**Your assessment is more valid (RIASEC + Big Five) but is it MORE FUN?**

Probably not. It's 20 minutes of serious questions. That's a hard sell to teenagers.

### Why ChatGPT is Your Biggest Threat:
- **Always available** (no waiting for mentors)
- **Infinite patience** (answers 1,000 questions)
- **Personalized** (adapts to your situation)
- **Free** (no account needed)
- **Smart** (GPT-4 gives genuinely good career advice now)

**The only things you have that ChatGPT doesn't:**
1. Local salary data (marginal value - ChatGPT can estimate)
2. Real human mentors (high value if you can prove it)
3. Reality Quizzes (good, but need to be exceptional)

**If your platform feels like "worse ChatGPT with extra steps," students won't use it.**

### Why YOU Might Suck:
- **No users yet:** All of this is theoretical
- **No distribution:** Students don't know you exist
- **No monetization:** Unclear how you sustain this
- **No validation:** Haven't proven students actually want this
- **Build doesn't work:** TypeScript errors mean you're not production-ready
- **Too broad:** Trying to do everything instead of one thing exceptionally

**But you could NOT suck if:**
- You focus (one niche career path)
- You validate (get real users, fast)
- You iterate (based on feedback, not assumptions)
- You distribute (relentless outreach to students)
- You monetize (figure out the business model early)

---

## The Steve Jobs Version

If Steve Jobs were building this, here's what he'd do:

### 1. **One Thing, Insanely Great**
Not "100+ careers." ONE career. Software Developer.

Build the most comprehensive, honest, interactive experience for someone exploring software development:
- 30-minute Reality Experience (not quiz - actual coding challenges, debugging scenarios, team conflict simulations)
- Video interviews with 5 Rwandan devs at different stages
- Exact roadmap: "Month 1: Learn X. Month 3: Build Y. Month 6: Apply to Z"
- Direct intros to 3 companies hiring junior devs in Kigali

**Make it so good that 90% of students who use it say "Holy shit, this is incredible."**

### 2. **Delight, Not Features**
No dashboards. No admin panels. No settings pages.

Student experience:
1. Land on page: Big question: "Should you be a software developer?"
2. Click button: "Find out in 30 minutes"
3. Interactive experience (code challenges, real scenarios, videos)
4. End result: Clear answer + next steps + option to talk to a dev
5. **One-click share:** "I just discovered I'd be a great developer! Try it: [link]"

**That's it. Nothing else.**

### 3. **Make It Spread**
After the experience, show:
- "You're in the top 15% for software development aptitude"
- "Your friend Sarah took this yesterday. She's a 92% match. You're 78%."
- "Challenge your friends: Can they beat your score?"

**Built-in social comparison = viral growth.**

### 4. **Monetize Immediately**
After student completes experience and wants to talk to a dev:
- "Book 30-min call with a Rwandan developer: 5,000 RWF"
- Or: "Unlock the full 6-month roadmap: 10,000 RWF"
- Or: "Join the developer community (20 students + 3 mentors): 15,000 RWF/month"

**Students who are serious will pay.** Those who aren't won't.

Filter for serious students early.

### 5. **Partnerships, Not Features**
Spend 50% of time building, 50% talking to:
- Universities (offer free workshops)
- Bootcamps (they want qualified students - you prequalify them)
- Tech companies (they want local talent - you find it)
- EdTech donors (they fund programs that work)

**Distribution > Product** (after you have one great experience).

---

## Final Verdict: Should You Keep Building This?

**Maybe.**

Here's the test:

**In the next 30 days, can you:**
1. Get 50 students to use your platform (full assessment + quiz + reading a career profile)
2. Get 10 of them to book a mentor session
3. Get 5 of them to tell you "This helped me make a decision I wouldn't have made otherwise"

**If yes:** You have product-market fit. Scale it.

**If no:** Either:
- Your distribution sucks (fix: spend more time on outreach, less on coding)
- Your product sucks (fix: simplify to one core experience)
- The problem isn't real (fix: pivot to a different problem)

---

**Don't build more features until you validate with real users.**

Right now you have:
- A sophisticated platform
- Multiple user roles
- Complex assessment algorithms
- Schema for extensive career data
- Reality Quiz system
- Mentor marketplace

**But 0 active users (presumably).**

More features won't fix that.

**Get 10 students using it this week. Then we'll talk about what to build next.**

---

## The Uncomfortable Truth About "Opportunity"

Your platform is called OpportunityMap.

But the harsh reality is: **For most students in Rwanda, the problem isn't finding opportunities. It's affording them.**

A student can know with 100% certainty that they'd be an amazing software developer.

But if they can't afford:
- A laptop (200,000-500,000 RWF)
- Internet (20,000 RWF/month)
- Bootcamp (500,000-2,000,000 RWF)
- 6-12 months without income while learning

...then your assessment is useless.

**Career guidance only matters if students have:**
1. **Access** to education/training
2. **Time** to invest in learning
3. **Financial runway** to delay income

If they don't have these, they need **jobs now**, not **career guidance**.

**Are you solving the right problem?**

Or should OpportunityMap be:
- "Fast paths to income in Rwanda" (3-month training → job)
- "How to afford career transitions" (scholarships, loans, part-time options)
- "Careers you can start with zero money" (freelancing, trades, etc.)

**Think about it.**

---

## What I'd Do If I Were You

**Week 1:**
- Fix the TypeScript build error
- Deploy to production
- Test the full student journey myself (create fake student account, take assessment, book fake mentor session)

**Week 2:**
- Get 10 real ALU students to use it
- Sit with them while they do it (in person or video call)
- Take notes: Where do they get confused? Bored? Excited?

**Week 3:**
- Interview those 10 students
- Ask: "Would you recommend this to a friend? Why or why not?"
- If 7+ say yes: Scale. If <7 say yes: Fix what's broken.

**Week 4:**
- Based on feedback, make ONE major change
- Get 20 more students
- Repeat

**Don't write another doc. Don't add features. Don't polish the design.**

**Get users. Get feedback. Iterate.**

---

**That's the honest eval. What do you think?**

