# Reality Quiz Testing Guide

## Overview
Reality Quizzes are interactive career exploration tools that help students understand what a career is really like through scenario-based questions.

## How to Test Reality Quizzes

### 1. Check which careers have quizzes

Run this in Convex dashboard:
```
npx convex run findMissingQuizzes:findMissingQuizzes
```

This will show:
- Total careers in database
- How many have quizzes
- Which careers need quizzes

### 2. Seed additional quizzes

Multiple seed files exist for adding quizzes to careers:

```bash
# Seed new careers and quizzes
npx convex run seedNewQuizzes:seedNewCareersAndQuizzes

# Seed remaining quizzes (batch operations)
npx convex run seedRemainingQuizzes:addQuizzesBatch1
npx convex run seedRemainingQuizzes:addQuizzesBatch2
npx convex run seedRemainingQuizzes:addQuizzesBatch3

# Seed final quizzes
npx convex run seedFinalQuizzes:seedRemainingQuizzes
```

### 3. Test in the UI

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Navigate to a career with a quiz:**
   - Go to `/careers`
   - Click on a career (e.g., "Software Developer")
   - Scroll to the "Reality Check Quiz" section

3. **Take the quiz:**
   - Click "Start Quiz"
   - Answer each scenario question
   - Review the explanation after each answer
   - Complete all questions to see your readiness score

4. **Check quiz results are saved:**
   - Go to your Student Dashboard (`/dashboard/student`)
   - Check "My Quiz Results" section
   - Verify your completed quiz appears with score and date

### 4. Test Reality Quiz Component

The Reality Quiz component is located at `components/RealityQuiz.tsx` and handles:

- Question navigation
- Answer selection
- Score calculation across 6 dimensions:
  - Technical aptitude
  - Pressure handling
  - Collaboration
  - Creativity
  - Independence
  - Work-life balance expectations

- Result tiers: High (80-100%), Medium (50-79%), Low (0-49%)

### 5. Verify Quiz Data Structure

Each quiz should have:

```typescript
{
  title: string,
  description: string,
  duration: number, // minutes
  questions: [
    {
      id: string,
      scenario: string,
      options: [
        {
          text: string,
          insight: string,
          scores: {
            technical?: number,
            pressure?: number,
            collaboration?: number,
            creativity?: number,
            independence?: number,
            workLifeBalance?: number
          }
        }
      ],
      explanation: string,
      realityNote: string
    }
  ],
  scoringGuide: { ... },
  results: {
    high: { min: 80, title: string, message: string },
    medium: { min: 50, title: string, message: string },
    low: { min: 0, title: string, message: string }
  }
}
```

### 6. Production Testing Checklist

- [ ] All quizzes load without errors
- [ ] Questions display properly on mobile and desktop
- [ ] Answer selection works smoothly
- [ ] Explanations show after selecting an answer
- [ ] Score calculation is accurate
- [ ] Results persist to database (check Convex dashboard)
- [ ] Students can retake quizzes
- [ ] Quiz results show in student dashboard
- [ ] Loading states display correctly
- [ ] Error handling works for failed saves

## Current Quiz Status

### Careers with Complete Quizzes:
1. Software Developer ✅
2. Data Scientist ✅
3. Graphic Designer ✅
4. Financial Analyst ✅
5. Project Manager ✅
6. UX Designer ✅
7. Product Manager ✅
8. HR Manager ✅
9. Pharmacist ✅
10. Architect ✅
11. Journalist ✅
12. Medical Doctor ✅
13. Nurse ✅
14. Business Analyst ✅

### To Add Quizzes:
- Check `convex/findMissingQuizzes.ts` for current status
- Create quiz using template from existing quizzes
- Add to appropriate seed file
- Run seed mutation from Convex dashboard

## Common Issues

### Issue: Quiz doesn't save results
**Solution:** Check that user is authenticated and has a student profile

### Issue: Score calculation seems wrong
**Solution:** Verify scoring guide min/max values match the score ranges in questions

### Issue: Quiz not showing on career page
**Solution:** Ensure the career has `realityQuiz` field populated in database

### Issue: TypeScript errors in seed files
**Solution:** Run `npx tsc --noEmit` to check for type errors before seeding

## Next Steps for Production

1. Test all quizzes end-to-end with real student accounts
2. Gather feedback on quiz difficulty and relevance
3. Add more quizzes for high-demand careers
4. Implement quiz analytics (completion rate, average scores)
5. A/B test different question formats
6. Add quiz badges/achievements for completing multiple quizzes

