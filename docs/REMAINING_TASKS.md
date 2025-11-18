# Remaining Tasks

**Last Updated:** 2025-11-18

---

## HIGH PRIORITY

### Quiz Results Persistence
- [ ] Verify quiz results save to Convex for logged-in users
- [ ] Add "My Quiz Results" section to student dashboard
- [ ] Show previous results when revisiting career page
- [ ] Allow viewing history of all quizzes taken

### TypeScript & Build
- [ ] Fix TypeScript errors (`npx tsc --noEmit`)
- [ ] Fix ESLint errors (`npx eslint . --fix`)
- [ ] Remove console.logs
- [ ] Test production build (`npm run build`)

### Mobile Testing
- [ ] Test all pages at 375px, 768px, 1024px
- [ ] Fix overflow/layout issues
- [ ] Test quiz component on mobile

---

## MEDIUM PRIORITY

### Content - More Quizzes
Add quizzes for these careers:
- Financial Analyst
- Project Manager
- UX Designer
- Product Manager
- HR Manager
- Pharmacist
- Architect
- Journalist

### Content - Career Data
Fill these fields for top 20 careers:
- realityCheck
- prosAndCons
- salaryProgression
- breakingIn
- weekInLife
- skillRoadmap
- successStories

### Performance
- [ ] Optimize images
- [ ] Add loading skeletons
- [ ] Run Lighthouse audit

---

## LOW PRIORITY

### Future Features
- Email/SMS notifications
- Payment integration
- Video calls
- AI recommendations

---

## Deployment

- [ ] Production Convex deployment
- [ ] Production Clerk config
- [ ] Environment variables
- [ ] Deploy to Vercel
- [ ] Test all flows

---

## Commands

```bash
npm run dev              # Dev server
npm run build            # Build
npx tsc --noEmit         # TypeScript
npx eslint . --fix       # Lint
npx convex deploy        # Deploy Convex
```
