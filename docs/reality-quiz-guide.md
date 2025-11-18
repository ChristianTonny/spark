# Reality Quiz Implementation Guide

## ✅ What's Built

The Reality Quiz system is now fully operational! Here's what's working:

1. **Database Schema** - `realityQuiz` field added to careers table
2. **Quiz Results Tracking** - `quizResults` table stores student attempts
3. **Interactive Component** - Full quiz UI with progress, explanations, and results
4. **Scoring Algorithm** - Multi-dimensional scoring with weighted readiness percentage
5. **Integration** - Quizzes appear on career detail pages

---

## 📝 How to Add a Quiz to a Career

### Option 1: Via Convex Dashboard (Easiest)

1. Go to your Convex dashboard: https://dashboard.convex.dev
2. Navigate to your project → Data → `careers` table
3. Find the career you want to add a quiz to
4. Click "Edit" and add the `realityQuiz` field
5. Copy the structure from `lib/sample-quizzes/software-developer-quiz.ts`
6. Paste and customize the content

### Option 2: Via Script (Recommended for Bulk)

Create a Convex mutation to update a career with a quiz:

```typescript
// convex/careers.ts
export const addRealityQuiz = mutation({
  args: {
    careerId: v.id("careers"),
    quiz: v.any(), // Use the quiz schema structure
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.careerId, {
      realityQuiz: args.quiz,
    });
  },
});
```

Then call it from your app or a script:

```typescript
import { softwareDeveloperQuiz } from '@/lib/sample-quizzes/software-developer-quiz';

await addRealityQuiz({
  careerId: "your-career-id",
  quiz: softwareDeveloperQuiz,
});
```

---

## 🎯 Quiz Structure Reference

Every quiz needs these fields:

```typescript
{
  title: string,                    // "A Day as a [Career Name]"
  description: string,              // Brief overview
  duration: number,                 // Estimated minutes
  questions: [
    {
      id: string,                   // "q1", "q2", etc.
      scenario: string,             // The situation
      options: [
        {
          text: string,             // Option text
          insight: string,          // What this reveals
          scores: {
            technical?: number,     // -10 to +10
            pressure?: number,
            collaboration?: number,
            creativity?: number,
            independence?: number,
            workLifeBalance?: number,
          },
        }
      ],
      correctAnswer?: number,       // Optional "best" answer index
      explanation: string,          // Context after answering
      realityNote: string,          // "X% of professionals face this..."
    }
  ],
  scoringGuide: {
    technical: { min: number, max: number, weight: number },
    pressure: { min: number, max: number, weight: number },
    collaboration: { min: number, max: number, weight: number },
    creativity: { min: number, max: number, weight: number },
    independence: { min: number, max: number, weight: number },
    workLifeBalance: { min: number, max: number, weight: number },
  },
  results: {
    high: { min: 70, title: string, message: string },
    medium: { min: 50, title: string, message: string },
    low: { min: 0, title: string, message: string },
  },
}
```

---

## 💡 Writing Great Quiz Questions

### Question Formula:
**Scenario** → **Options** → **Insight** → **Reality Note**

### Example from Software Developer Quiz:

**Scenario:**
> "It's 6 PM Friday. Your code broke production. 1,000 users affected. What do you do?"

**Options:**
1. Drop everything, fix it now (High pressure tolerance, low work-life balance)
2. Document, plan, fix Monday (Balanced approach)
3. Call senior dev for help (Collaborative)
4. Panic (Low pressure tolerance)

**Insight for Option 2:**
> "You balance urgency with sustainability - key for long-term success"

**Reality Note:**
> "78% of developers face production issues monthly. The best handle it systematically."

---

## 🎨 Quiz Writing Tips

### 1. **Scenario = Real Situation**
Use actual dilemmas professionals face, not hypotheticals

❌ "What motivates you?"
✅ "Your code broke production on Friday at 6 PM. What do you do?"

### 2. **All Options Are Valid**
No obvious "wrong" answers. All reveal something about fit.

### 3. **Insights Should Educate**
Tell students what their choice reveals about their work style

### 4. **Reality Notes Ground It**
Include stats or facts: "78% of professionals face this monthly"

### 5. **Cover Multiple Dimensions**

For each career, ask questions that test:
- **Technical aptitude** - Can they handle the skill requirements?
- **Pressure tolerance** - Do they thrive or crumble under stress?
- **Collaboration style** - Solo worker or team player?
- **Creativity** - Need structure or love experimentation?
- **Independence** - Self-directed or prefer guidance?
- **Work-life balance** - Willing to sacrifice or need boundaries?

### 6. **Scoring Ranges**

Set min/max based on how many questions ask about each dimension:

- 7 questions testing pressure → range might be -25 to +60
- 3 questions testing creativity → range might be -10 to +30

Adjust weights based on importance to the career:
- Software Developer: technical (0.20), pressure (0.20) are high
- Social Worker: collaboration (0.25), pressure (0.20) are high
- Artist: creativity (0.30), independence (0.25) are high

---

## 📊 Sample Careers to Build Next

### Priority Tier 1 (Most Popular):
1. ✅ **Software Developer** (Done!)
2. **Teacher/Educator**
3. **Nurse/Healthcare Worker**
4. **Business Analyst**
5. **Marketing Manager**

### Priority Tier 2:
6. **Data Scientist**
7. **Graphic Designer**
8. **Civil Engineer**
9. **Accountant**
10. **Lawyer**

### Quick Quiz Template (Copy This):

```typescript
export const [careerName]Quiz = {
  title: "A Day as a [Career Name]",
  description: "Experience real [career] scenarios. See if this career matches your style.",
  duration: 7,
  questions: [
    {
      id: "q1",
      scenario: "[Specific situation this career faces]",
      options: [
        {
          text: "[Option 1]",
          insight: "[What this reveals]",
          scores: {
            technical: 5,
            pressure: 8,
            // ... other scores
          },
        },
        // ... 3-4 options total
      ],
      explanation: "[Why this scenario matters]",
      realityNote: "[Stat or fact about this scenario]",
    },
    // ... 5-7 questions total
  ],
  scoringGuide: {
    technical: { min: -10, max: 50, weight: 0.15 },
    pressure: { min: -20, max: 60, weight: 0.20 },
    collaboration: { min: -10, max: 60, weight: 0.20 },
    creativity: { min: -5, max: 40, weight: 0.15 },
    independence: { min: -10, max: 50, weight: 0.15 },
    workLifeBalance: { min: -15, max: 45, weight: 0.15 },
  },
  results: {
    high: {
      min: 70,
      title: "Strong Fit",
      message: "[Encouraging message about alignment]",
    },
    medium: {
      min: 50,
      title: "Potential Fit",
      message: "[Balanced message with considerations]",
    },
    low: {
      min: 0,
      title: "Consider Alternatives",
      message: "[Honest message about misalignment]",
    },
  },
};
```

---

## 🚀 Next Steps

1. **Create 9 more quizzes** for top careers (see Priority Tier 1 above)
2. **Add quizzes to database** via Convex dashboard or script
3. **Test with real students** - Get feedback on insights and questions
4. **Iterate based on data** - Which quizzes get completed? Which don't?
5. **Add quiz results to student dashboard** - Show "Careers You've Tried"

---

## 📈 How It Shows Up

**On Career Detail Page:**
- Shows after "Available Mentors" section
- Big "Try This Career" button
- Only visible if career has `realityQuiz` field populated

**Student Experience:**
1. Click "Try This Career"
2. Answer 5-7 scenario questions
3. See insight after each answer
4. Get overall readiness score (0-100%)
5. Result saved to their profile
6. Can retake anytime

**Analytics to Track:**
- Quiz completion rate
- Average readiness scores per career
- Correlation between quiz scores and mentor bookings
- Which questions students struggle with most

---

## ✨ The Impact

This is your **differentiation**. No other career platform has this.

Students will:
- Share quiz results ("I'm only 42% ready to be a doctor!")
- Feel more confident in decisions (tried it virtually first)
- Avoid costly mistakes (discover mismatch before 4 years of study)
- Tell friends ("Take the lawyer quiz - it's brutal but real")

This is the "magic moment" that makes OpportunityMap memorable.

---

**Questions? Check the sample quiz at `lib/sample-quizzes/software-developer-quiz.ts`**
