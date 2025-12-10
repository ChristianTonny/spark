# Codebase Issues Report - OpportunityMap (Spark)

**Generated:** December 10, 2025  
**Reporter:** New Developer Onboarding Review  
**Repository:** ChristianTonny/spark  

---

## Executive Summary

This report documents critical, major, and minor issues found in the OpportunityMap codebase. The platform is functional but has several **blocking issues for new developers** and **production deployment concerns** that need immediate attention.

**Current Status:** ⚠️ **Build succeeds with errors, development requires manual setup**

---

## 🚨 CRITICAL ISSUES (Blockers for New Developers)

### 1. Missing Environment Configuration - CONFIRMED ✓

**Issue:** No `.env.local` file exists, causing the Convex error you experienced.

**Error Message:**
```
Error: No address provided to ConvexReactClient.
If trying to deploy to production, make sure to follow all the instructions found at https://docs.convex.dev/production/hosting/
If running locally, make sure to run `convex dev` and ensure the .env.local file is populated.
```

**Impact:** 
- **BLOCKS** all new developers from running the project
- Build fails during production build (prerendering pages)
- Application crashes at runtime without proper error recovery

**Files Affected:**
- `app/ConvexClientProvider.tsx` (line 8) - expects `process.env.NEXT_PUBLIC_CONVEX_URL`
- Multiple admin pages fail during static generation

**Root Cause:**
```typescript
// app/ConvexClientProvider.tsx line 8
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
// The ! operator assumes the variable exists, but it doesn't for new devs
```

**Required Action:**
1. Copy `.env.local.example` to `.env.local`
2. Run `npx convex dev` to generate Convex URL
3. Add Clerk keys from dashboard.clerk.com
4. Add Resend API key from resend.com

**Recommendation:**
- Add startup script that checks for `.env.local` and provides helpful error message
- Update README with clearer "Quick Start" section
- Consider adding `.env.local` validation script

---

### 2. Outdated Next.js Version - CONFIRMED ✓

**Issue:** Next.js 14.1.0 is significantly outdated (Latest: 16.0.8)

**Current:** `14.1.0` (Released January 2024)  
**Latest:** `16.0.8` (December 2025)  
**Gap:** ~23 months behind

**Impact:**
- Missing security patches from 19+ months of updates
- Missing performance improvements
- Missing new features (Server Actions improvements, Turbopack, etc.)
- Potential compatibility issues with newer dependencies
- Deprecated metadata API usage (see warnings below)

**Evidence from Build Output:**
```
⚠ Unsupported metadata themeColor is configured in metadata export
⚠ Unsupported metadata viewport is configured in metadata export
Please move it to viewport export instead.
```

**Breaking Changes Risk:** Medium-High (Major version jump from 14 → 15 → 16)

**Recommendation:**
- Upgrade to Next.js 15.x first (more stable than 16.x cutting edge)
- Test thoroughly after upgrade
- Update deprecated metadata exports to viewport exports
- Consider creating a migration branch

**Migration Steps:**
```bash
# Step 1: Upgrade to Next.js 15 LTS
npm install next@15 react@19 react-dom@19

# Step 2: Fix deprecated patterns
# - Move themeColor to viewport export
# - Move viewport config to separate export
# - Update any App Router patterns

# Step 3: Test
npm run build
npm run dev
```

---

### 3. Production Build Fails Without Environment Variables

**Issue:** `npm run build` fails when attempting to pre-render admin pages

**Error:** Same Convex error during static generation of:
- `/admin/fix-user-role`
- `/admin/schools`
- `/admin/users`
- `/apply-as-mentor/confirmation`

**Why This Matters:**
- Vercel deployments will fail without proper env vars configured
- Static pages cannot be generated at build time
- SEO and performance suffer (SSR instead of SSG)

**Files Affected:**
- `app/admin/*/page.tsx` - Multiple admin pages
- Any page using Convex hooks at the top level

**Root Cause:**
ConvexReactClient is initialized at module level (runs during build), but env vars aren't available during static generation.

**Recommendation:**
- Add dynamic rendering for admin pages: `export const dynamic = 'force-dynamic'`
- Or implement proper fallback/loading states
- Or lazy-load ConvexProvider only on client side

---

## ⚠️ MAJOR ISSUES (Should Fix Soon)

### 4. 26+ Severely Outdated Dependencies

**Security & Compatibility Risk:** High

**Major Version Behind:**
| Package | Current | Latest | Gap |
|---------|---------|--------|-----|
| `@clerk/nextjs` | 5.7.5 | 6.36.1 | Major version behind |
| `eslint` | 8.57.1 | 9.39.1 | Major version behind |
| `eslint-config-next` | 14.1.0 | 16.0.8 | Tied to Next.js version |
| `@types/react` | 18.3.26 | 19.2.7 | React 19 types available |
| `react` | 18.3.1 | 19.2.1 | Major version behind |
| `react-dom` | 18.3.1 | 19.2.1 | Major version behind |
| `tailwindcss` | 3.4.18 | 4.1.17 | Major version behind (v4 is out!) |
| `zod` | 3.25.76 | 4.1.13 | Major version behind |

**Minor Updates Needed (15+ packages):**
- `convex`: 1.28.2 → 1.30.0
- `lucide-react`: 0.307.0 → 0.556.0
- `@tiptap/*`: 3.10.7 → 3.13.0 (5 packages)
- And more...

**Impact:**
- Known security vulnerabilities may exist
- Missing bug fixes
- Incompatibility with newer packages
- Difficult to get community support for old versions

**Recommendation:**
```bash
# Check for vulnerabilities
npm audit

# Safe minor updates first
npm update

# Then tackle major versions one by one
npm install @clerk/nextjs@latest
npm install tailwindcss@4
npm install zod@4
# etc.
```

---

### 5. No Test Coverage

**Issue:** Zero test files found in the entire codebase

**Evidence:**
```bash
# Found files: 0 .test.ts, 0 .spec.ts, 0 test directories
```

**Impact:**
- No way to verify functionality after changes
- High risk of regressions during upgrades
- No confidence in refactoring
- Difficult to onboard new developers (tests serve as documentation)

**Areas That Need Tests:**
- Assessment algorithm (RIASEC scoring)
- Quiz scoring logic
- Booking workflow
- Payment calculations (if implemented)
- Authentication flows
- Admin user management

**Recommendation:**
- Add Jest or Vitest configuration
- Start with critical business logic tests (assessment scoring)
- Add E2E tests for key user flows (Playwright/Cypress)
- Aim for 60%+ coverage before major refactoring

---

### 6. Inconsistent Error Handling

**Issue:** Console.error used throughout but no centralized error logging

**Evidence:**
- 30+ instances of `console.error()` scattered across files
- No error tracking service integration (Sentry, LogRocket, etc.)
- Errors in production will be invisible

**Files with Poor Error Handling:**
```typescript
// convex/emails.ts line 36
console.error("Failed to send email:", error);
// This error is swallowed - admin never knows emails failed

// components/BookingListItem.tsx line 83
console.error("Failed to complete session:", error);
// User sees no feedback that booking completion failed

// lib/emails/resend.ts line 119
console.error('Error sending booking confirmation:', error);
// Critical email failures go unnoticed
```

**Impact:**
- Production bugs go unnoticed
- No metrics on failure rates
- Poor user experience (silent failures)
- Difficult to debug production issues

**Recommendation:**
- Integrate error tracking (Sentry free tier)
- Create error boundary components
- Add user-facing error messages
- Log errors to backend for analysis

---

### 7. Backup/Obsolete Files in Version Control

**Issue:** `convex/seed.ts.backup` should not be committed

**Evidence:**
```
convex/seed.ts.backup
```

**Impact:**
- Cluttered codebase
- Confusion about which file is authoritative
- Potential to use wrong file
- Code smell indicating lack of version control discipline

**Other Suspects:**
- Multiple seed files (seed.ts, seedNewQuizzes.ts, seedRemainingQuizzes.ts, seedFinalQuizzes.ts)
- Unclear which should be used and when
- No clear data migration strategy

**Recommendation:**
- Remove `.backup` file immediately
- Add `*.backup` to `.gitignore`
- Consolidate seed scripts or document their purposes
- Create a proper seeding guide in docs

---

### 8. Metadata API Deprecation Warnings

**Issue:** 20+ deprecation warnings during build

**Evidence from build output:**
```
⚠ Unsupported metadata themeColor is configured in metadata export
⚠ Unsupported metadata viewport is configured in metadata export
Please move it to viewport export instead.
```

**Affected Pages:**
- `/admin/users`
- `/admin/fix-user-role`
- `/admin/schools`
- `/apply-as-mentor/confirmation`
- Root layout

**Current (Deprecated) Pattern:**
```typescript
// app/layout.tsx - DEPRECATED
export const metadata: Metadata = {
  viewport: { width: "device-width", initialScale: 1 },
  themeColor: "#FF6B35",
};
```

**Required Pattern:**
```typescript
// app/layout.tsx - CORRECT
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6B35",
};
```

**Recommendation:**
- Fix all instances before upgrading Next.js
- Will become breaking errors in Next.js 16+

---

## 📋 MINOR ISSUES (Clean Up When Possible)

### 9. Image Optimization Warnings

**Issue:** 27 instances of `<img>` tags instead of Next.js `<Image>`

**Impact:**
- Slower page loads (no automatic optimization)
- Higher bandwidth costs
- Poor Lighthouse scores
- Worse user experience on slow connections

**Evidence:**
```
./app/assessment/results/page.tsx:369
./app/blog/[slug]/page.tsx:153, 192, 231
./app/careers/[id]/page.tsx:197, 820
./components/SchoolCard.tsx:109, 146
... 19 more instances
```

**Why It Matters:**
- Images are often the largest asset on a page
- Next.js Image component provides:
  - Automatic WebP/AVIF conversion
  - Lazy loading
  - Responsive sizes
  - Blur placeholder

**Recommendation:**
```typescript
// Before
<img src="/career-icon.png" alt="Career" />

// After
import Image from 'next/image'
<Image src="/career-icon.png" alt="Career" width={100} height={100} />
```

**Priority:** Medium (affects performance but not functionality)

---

### 10. TypeScript `any` Type Usage

**Issue:** 5 instances of `any` type defeating TypeScript's purpose

**Evidence:**
```typescript
// app/setup-admin/page.tsx line 13
const [result, setResult] = useState<any>(null);

// app/admin/schools/page.tsx line 24
const [selectedSchool, setSelectedSchool] = useState<any>(null);

// app/admin/fix-user-role/page.tsx lines 10-11
const [checkResult, setCheckResult] = useState<any>(null);
const [fixResult, setFixResult] = useState<any>(null);

// app/dashboard/admin/page.tsx line 13
const [selectedApplication, setSelectedApplication] = useState<any>(null);
```

**Impact:**
- Loss of type safety
- Hidden bugs at runtime
- Poor IDE autocomplete
- Defeats purpose of TypeScript

**Recommendation:**
```typescript
// Before
const [result, setResult] = useState<any>(null);

// After - Define proper type
type SetupResult = {
  success: boolean;
  adminEmail: string;
  userId: string;
};
const [result, setResult] = useState<SetupResult | null>(null);
```

---

### 11. TODOs in Production Code

**Issue:** 2 unimplemented features marked with TODO

**Evidence:**
```typescript
// convex/admin.ts line 313
// TODO: Send approval email to applicant

// convex/admin.ts line 342  
// TODO: Send rejection email to applicant

// app/contact/page.tsx line 19
// TODO: Implement actual form submission
```

**Impact:**
- Incomplete features in production
- Users expect email notifications that never arrive
- Contact form doesn't actually work

**Recommendation:**
- Implement mentor application emails (high priority)
- Implement contact form submission
- Or remove features until ready
- Create GitHub issues for tracking

---

### 12. Excessive Console Logging

**Issue:** 30+ console.log statements left in production code

**Evidence:**
```typescript
// convex/seedSchools.ts line 16
console.log("Schools already seeded");

// convex/migrations/fixRelatedCareerIds.ts
console.log("Starting relatedCareerIds migration...");
console.log(`Found ${careers.length} careers to update`);
// ... 10+ more logs
```

**Impact:**
- Cluttered browser console in production
- Potential information leakage
- Poor professionalism
- Makes actual errors harder to find

**Recommendation:**
- Remove debug logs from production code
- Use proper logging library (winston, pino)
- Only log errors and important events
- Use environment-based logging levels

---

### 13. PowerShell Script in Node Project

**Issue:** Seed script assumes Windows (PowerShell)

**Evidence:**
```json
// package.json
"seed": "powershell -ExecutionPolicy Bypass -File ./scripts/seed-all.ps1"
```

**Impact:**
- Won't work on Linux/Mac (your current issue!)
- Team collaboration issues
- CI/CD pipeline issues

**Alternatives:**
- Bash script exists: `scripts/seed-all.sh`
- But not configured in package.json

**Recommendation:**
```json
// package.json - Cross-platform solution
"seed": "node scripts/seed-all.js",
"seed:schools": "npx convex run seedSchools:seedSchools",
"seed:costs": "npx convex run seedCostAnalysis:addCostAnalysisToCareers"
```

---

### 14. No CI/CD Pipeline

**Issue:** No GitHub Actions, no automated testing, no deployment checks

**Evidence:**
- No `.github/workflows/` directory
- No pre-commit hooks
- No automated linting
- No automated build verification

**Impact:**
- Bugs can reach production
- Breaking changes aren't caught
- No code quality gates
- Manual deployment process

**Recommendation:**
Create `.github/workflows/ci.yml`:
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
```

---

### 15. No Docker Configuration

**Issue:** No containerization for consistent development environments

**Evidence:**
- No `Dockerfile`
- No `docker-compose.yml`
- Each developer has different Node versions, dependencies, etc.

**Impact:**
- "Works on my machine" problems
- Difficult onboarding
- Environment-specific bugs

**Recommendation:**
Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 📊 CODEBASE STATISTICS

**Total TypeScript Files:** 5,656  
**No Test Files:** 0  
**Test Coverage:** 0%  

**Dependencies Status:**
- Total Dependencies: 28
- Outdated: 26 (93%)
- Major Updates Available: 8
- Security Vulnerabilities: Unknown (run `npm audit`)

**Code Quality Indicators:**
- ESLint Errors: 0 ✓
- TypeScript Errors: 0 ✓
- Build Warnings: 27 (metadata + images)
- Console Statements: 30+
- TODO Comments: 3
- Any Types: 5

---

## 🎯 PRIORITY ACTION ITEMS

### Immediate (This Week)

1. **Create `.env.local` file** - BLOCKS new developers
2. **Document environment setup** - Update README
3. **Remove seed.ts.backup** - Clean up VCS
4. **Fix PowerShell script issue** - Works on Linux/Mac

### Short Term (This Month)

5. **Upgrade Next.js to 15.x** - Security + features
6. **Fix metadata deprecation warnings** - Required for Next 16
7. **Update major dependencies** - Security patches
8. **Implement TODO features** - Email notifications
9. **Add error tracking** - Sentry integration

### Medium Term (This Quarter)

10. **Add test coverage** - Start with critical paths
11. **Implement CI/CD pipeline** - Automate quality checks
12. **Replace <img> with <Image>** - Performance
13. **Remove any types** - Type safety
14. **Add Docker configuration** - Consistent environments

---

## 🔍 VERIFICATION STEPS FOR NEW DEVELOPERS

To verify the issues reported:

```bash
# 1. Clone and check for env file
ls -la .env.local
# Expected: File not found ✓ CONFIRMED

# 2. Check Next.js version
npm list next
# Expected: 14.1.0 ✓ CONFIRMED

# 3. Check outdated packages
npm outdated
# Expected: 26 packages outdated ✓ CONFIRMED

# 4. Try to build without env
npm run build
# Expected: ConvexReactClient error ✓ CONFIRMED

# 5. Check for tests
find . -name "*.test.*" -o -name "*.spec.*"
# Expected: 0 files ✓ CONFIRMED

# 6. Check for backup files
find . -name "*.backup"
# Expected: convex/seed.ts.backup ✓ CONFIRMED
```

---

## 📚 REFERENCE DOCUMENTATION

**Related Documents in `docs/`:**
- `REMAINING_TASKS.md` - Known incomplete features
- `HONEST_EVALUATION.md` - Critical product/business analysis
- `CODING_GUIDELINES.md` - Team standards
- `EMAIL_SETUP.md` - Email integration guide

**External Resources:**
- [Next.js 15 Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [Convex Production Hosting](https://docs.convex.dev/production/hosting/)
- [Clerk Setup Guide](https://clerk.com/docs/quickstarts/nextjs)

---

## 🤝 RECOMMENDATIONS FOR PROJECT LEAD

### Technical Debt Priority

**Must Fix Before New Features:**
1. Environment setup automation
2. Next.js upgrade
3. Dependency updates
4. Basic test coverage

**Can Defer:**
- Image optimization (performance nice-to-have)
- Console.log cleanup (cosmetic)
- Docker setup (nice-to-have)

### Developer Experience

**Onboarding Pain Points:**
- No `.env.local` = Immediate blocker
- No clear setup guide = Wasted hours
- PowerShell only = Mac/Linux users blocked

**Quick Wins:**
- Add `.env.local.example` instructions to README
- Create setup validation script
- Document "First Day" workflow

### Code Quality Baseline

Before accepting PRs, require:
- ✓ `npm run typecheck` passes
- ✓ `npm run lint` passes  
- ✓ `npm run build` succeeds
- ✓ No new `any` types
- ✓ No new `console.log` in features

---

## ✅ CONCLUSION

The OpportunityMap codebase is **functional but needs maintenance**. The core issues are:

1. **Environment setup is broken for new developers** (Critical)
2. **Dependencies are significantly outdated** (Security risk)
3. **No automated testing or CI/CD** (Quality risk)
4. **Some incomplete features in production** (UX issue)

**Good News:**
- TypeScript compilation works ✓
- No ESLint errors ✓  
- Core architecture is sound ✓
- Well-structured codebase ✓

**Estimated Effort to Resolve Critical Issues:** 2-3 days

**Estimated Effort for Full Technical Debt:** 2-3 weeks

---

**Report Compiled By:** Automated Code Analysis + Manual Review  
**Next Steps:** Prioritize critical issues, create GitHub issues, assign to team members
