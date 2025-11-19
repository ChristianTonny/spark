# How to Apply the Updates

This guide explains how to run the career data updates and test the fixes.

## Step 1: Verify Build Works

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Expected: No errors (exit code 0)
```

✅ **If successful, continue to Step 2**

---

## Step 2: Update Career Video URLs

Run this from the Convex dashboard or terminal:

```bash
npx convex run updateCareerData:updateVideoUrls
```

This will:
- Replace placeholder video URLs with real "Day in the Life" career videos
- Update 18+ careers including Software Developer, Teacher, Medical Doctor, etc.
- Use actual YouTube career exploration content

**Expected Output:**
```json
{
  "message": "Video URLs updated",
  "summary": {
    "total": 18,
    "updated": 18,
    "notFound": 0
  }
}
```

---

## Step 3: Add Rich Career Data

### Option A: Add All at Once (Recommended)

```bash
npx convex run updateCareerData:updateAllCareerData
```

This runs all updates in sequence:
- Updates video URLs
- Adds rich data for Software Developer
- Adds rich data for Teacher

### Option B: Add Individually

```bash
# Software Developer rich data
npx convex run updateCareerData:addSoftwareDeveloperRichData

# Teacher rich data
npx convex run updateCareerData:addTeacherRichData
```

**Rich data includes:**
- Reality Check (myths vs realities)
- Week in Life (good day vs hard day)
- Career Capital (skills and exit opportunities)
- Pros & Cons (detailed honest assessment)
- Salary Progression (5 career levels)
- Breaking In paths (4 different entry routes)
- Skill Roadmap (beginner to advanced)
- Success Stories (real examples)
- Warning Flags (red flags vs green flags)
- Remote Work potential

---

## Step 4: Test Reality Quizzes

### A. Check Quiz Status

```bash
npx convex run findMissingQuizzes:findMissingQuizzes
```

**Expected Output:**
```json
{
  "total": 100+,
  "withQuizzes": 14+,
  "withoutQuizzes": 86+,
  "careersWithQuizzes": [
    { "id": "...", "title": "Software Developer" },
    { "id": "...", "title": "Data Scientist" },
    ...
  ]
}
```

### B. Seed Additional Quizzes (if needed)

```bash
# Seed new careers with quizzes
npx convex run seedNewQuizzes:seedNewCareersAndQuizzes

# Seed remaining quizzes in batches
npx convex run seedRemainingQuizzes:addQuizzesBatch1
npx convex run seedRemainingQuizzes:addQuizzesBatch2
npx convex run seedRemainingQuizzes:addQuizzesBatch3

# Seed final quizzes
npx convex run seedFinalQuizzes:seedRemainingQuizzes
```

### C. Test in the UI

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to a Career**
   - Go to http://localhost:3000/careers
   - Click on a career with a Reality Quiz (e.g., "Software Developer")

3. **Take the Quiz**
   - Scroll to "Reality Check Quiz" section
   - Click "Start Quiz"
   - Answer scenario questions
   - View explanations after each answer
   - Complete all questions to see your readiness score

4. **Verify Results are Saved**
   - Go to Student Dashboard (`/dashboard/student`)
   - Check "My Quiz Results" section
   - Verify your completed quiz appears with:
     - Career title
     - Readiness percentage
     - Date taken
     - Result tier (High/Medium/Low)

5. **Test on Mobile**
   - Open on mobile device or use DevTools responsive mode
   - Verify quiz is readable and interactive
   - Check touch targets are at least 48px

---

## Step 5: Verify Schema Changes

The schema now includes:

```typescript
studentProfiles: defineTable({
  // ... existing fields ...
  careerReadinessScore: v.optional(v.number()),
  scoreHistory: v.optional(v.array(v.object({
    date: v.number(),
    score: v.number(),
    event: v.string(),
  }))),
})
```

**To verify:**
1. Check Convex dashboard
2. Look at `studentProfiles` table
3. Verify documents can have `careerReadinessScore` and `scoreHistory` fields
4. No schema validation errors should appear

---

## Step 6: Check Updated Files

### Files Created:
- ✅ `convex/updateCareerData.ts` - Career data mutations
- ✅ `docs/REALITY_QUIZ_TESTING.md` - Testing guide
- ✅ `docs/FIXES_APPLIED.md` - Summary of fixes
- ✅ `docs/HOW_TO_APPLY_UPDATES.md` - This file

### Files Modified:
- ✅ `convex/schema.ts` - Added studentProfiles fields
- ✅ `convex/seedFinalQuizzes.ts` - Fixed TypeScript error
- ✅ `convex/seedNewQuizzes.ts` - Updated video URLs
- ✅ `convex/seedQuizzes.ts` - Updated video URLs
- ✅ `docs/HONEST_EVALUATION.md` - Marked issues as fixed

---

## Troubleshooting

### Issue: "Career not found" when updating data

**Solution:** The career might not exist in your database yet. Run:
```bash
npx convex run seed:seedAll
```

Then retry the update.

---

### Issue: Video URLs not updating

**Solution:** Check that career titles match exactly. Run:
```bash
npx convex run careers:list
```

Compare titles with those in `updateCareerData.ts`.

---

### Issue: Quiz results not saving

**Solution:** 
1. Ensure user is authenticated (logged in)
2. Check user has role "student"
3. Verify studentProfiles table has entry for user
4. Check browser console for errors

---

### Issue: TypeScript still shows errors

**Solution:**
1. Restart your IDE/editor
2. Run `npx tsc --noEmit` in terminal
3. Check no other files were modified
4. Clear TypeScript cache: `rm -rf node_modules/.cache`

---

## Production Deployment

### Before Deploying:

1. **Build Check**
   ```bash
   npm run build
   ```
   Expected: Build succeeds without errors

2. **Run All Tests** (if you have tests)
   ```bash
   npm test
   ```

3. **Verify Data Updates**
   - Check Convex dashboard in production
   - Ensure all mutations completed successfully
   - Verify career data looks correct

### Deploy:

```bash
# Deploy to Vercel (or your hosting provider)
npm run deploy

# Or if using Vercel CLI
vercel --prod
```

---

## Verification Checklist

Use this to confirm everything is working:

- [ ] TypeScript compilation succeeds (`npx tsc --noEmit`)
- [ ] Schema validation passes (no errors in Convex dashboard)
- [ ] Career video URLs updated (checked in database)
- [ ] Rich career data added (Software Developer & Teacher have complete data)
- [ ] Reality Quizzes load without errors
- [ ] Quiz results save to database
- [ ] Quiz results display in student dashboard
- [ ] All seed files run without errors
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in browser when testing

---

## Support

If you encounter issues:

1. Check `docs/REALITY_QUIZ_TESTING.md` for quiz-specific guidance
2. Check `docs/FIXES_APPLIED.md` for what was changed
3. Review error messages in:
   - Terminal output
   - Convex dashboard logs
   - Browser console (F12)

---

## Next Steps (Optional)

After applying these updates, consider:

1. **Add more rich career data**
   - Use Software Developer as template
   - Copy structure to other high-demand careers

2. **Create more Reality Quizzes**
   - Use existing quizzes as templates
   - Focus on careers students explore most

3. **Gather User Feedback**
   - Deploy to production
   - Have students test quizzes
   - Iterate based on feedback

4. **Track Analytics**
   - Quiz completion rates
   - Most popular careers
   - Average readiness scores

---

**Last Updated:** November 19, 2024

