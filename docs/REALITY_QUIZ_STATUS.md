# Reality Quiz Feature Status

## How It Works

### User Flow
1. User visits career profile page (e.g., `/careers/[id]`)
2. Quiz appears at top of page after key info cards
3. User clicks "Start Quiz"
4. Answers 5-7 scenario-based questions one at a time
5. Each answer shows insight about their choice
6. Final screen shows:
   - Readiness percentage (0-100%)
   - Result tier (Strong Fit / Potential Fit / Consider Alternatives)
   - Breakdown across 6 dimensions
7. Results saved to database for logged-in users

### Scoring System
Each answer scores across 6 dimensions:
- **Technical** - Domain-specific competency
- **Pressure** - Handling stress and deadlines
- **Collaboration** - Working with others
- **Creativity** - Problem-solving and innovation
- **Independence** - Self-direction
- **Work-Life Balance** - Boundary management

Weighted scores are normalized to produce final readiness percentage.

### Technical Implementation
- **Schema**: `realityQuiz` field on careers table, `quizResults` table for saved results
- **API**: `convex/quizResults.ts` - save, get, delete results
- **Component**: `components/RealityQuiz.tsx`
- **Quiz Data**: `convex/seedQuizzes.ts` (all 10 quizzes embedded)

---

## Career Quiz Status

### Quizzes Complete (10/10)

| Career | Database Match | Quiz Questions |
|--------|---------------|----------------|
| Software Developer | Software Developer | 5 scenarios |
| Teacher | Secondary School Teacher | 5 scenarios |
| Nurse | Registered Nurse | 5 scenarios |
| Business Analyst | Business Analyst | 5 scenarios |
| Marketing Manager | Marketing Manager | 5 scenarios |
| Data Scientist | Data Scientist | 5 scenarios |
| Graphic Designer | Graphic Designer | 5 scenarios |
| Civil Engineer | Civil Engineer | 5 scenarios |
| Accountant | Accountant | 5 scenarios |
| Lawyer | Lawyer | 5 scenarios |

### Careers Without Quizzes

These careers exist in your database but don't have Reality Quizzes yet. You can create quizzes for them following the same pattern:

**To find careers without quizzes:**
```bash
npx convex run careers:list
```

Then filter for those without `realityQuiz` field.

**Priority careers to add quizzes for:**
- Financial Analyst
- Project Manager
- UX Designer
- Product Manager
- Human Resources Manager
- Pharmacist
- Architect
- Journalist
- Chef
- Entrepreneur

---

## Adding New Quizzes

### Option 1: Add to seedQuizzes.ts
1. Create quiz object following existing pattern in `convex/seedQuizzes.ts`
2. Add to `quizMappings` array
3. Run: `npx convex run seedQuizzes:seedAllQuizzes`

### Option 2: Direct Database Update
Use Convex Dashboard to add `realityQuiz` field directly to a career.

### Quiz Structure
```typescript
{
  title: "A Day as a [Career]",
  description: "Brief description",
  duration: 5-7, // number of questions
  questions: [
    {
      id: "q1",
      scenario: "Realistic work situation...",
      options: [
        {
          text: "Response option",
          insight: "What this choice reveals",
          scores: { technical: 0, pressure: 0, collaboration: 0, creativity: 0, independence: 0, workLifeBalance: 0 }
        }
        // 4 options per question
      ],
      explanation: "Why this matters",
      realityNote: "Industry statistic or fact"
    }
  ],
  scoringGuide: {
    // min, max, weight for each dimension
  },
  results: {
    high: { min: 70, title: "...", message: "..." },
    medium: { min: 50, title: "...", message: "..." },
    low: { min: 0, title: "...", message: "..." }
  }
}
```

---

## Quick Commands

```bash
# Seed all quizzes to database
npx convex run seedQuizzes:seedAllQuizzes

# List all career titles
npx convex run seedQuizzes:listCareerTitles

# Create missing careers (Business Analyst, Accountant, Lawyer)
npx convex run seedQuizzes:createMissingCareers

# Check which careers have quizzes
npx convex run careers:getWithQuizzes
```

---

## Files Reference

- `convex/seedQuizzes.ts` - All quiz data and seeding functions
- `convex/quizResults.ts` - Quiz results API
- `components/RealityQuiz.tsx` - Quiz UI component
- `app/careers/[id]/page.tsx` - Career page with quiz integration
- `lib/sample-quizzes/` - Original quiz files (for reference)
