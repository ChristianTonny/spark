# Spark — SkillSync Merge Task List

Single source of truth for all build tasks. Update status as work progresses.
Format: ID | Task | Size (S/M/L) | Status (todo/in-progress/done) | Owner

Last updated: 2026-03-16

---

## Phase 0 — Blockers (must complete before anything else)

| ID   | Task                                                                                                  | Size | Status | Owner       |
|------|-------------------------------------------------------------------------------------------------------|------|--------|-------------|
| T0.1 | Fix Turbopack workspace root: add `turbopack: { root: '.' }` to `next.config.js`                     | S    | done   | Claude Code |
| T0.2 | Fix types: replace hand-rolled `Career` interface in `lib/types.ts` with `Doc<"careers">` from Convex generated types; update all consumers (comparison page, assessment results, etc.) | S | done | Claude Code |
| T0.3 | Verify comparison page renders correctly after build fix (visual check + build passes)                | S    | done   | Claude Code |

---

## Phase 1 — Data Foundation

| ID   | Task                                                                                                  | Size | Status | Owner       |
|------|-------------------------------------------------------------------------------------------------------|------|--------|-------------|
| T1.1 | Add 6 new tables to `convex/schema.ts`: `jobListings`, `skillTaxonomy`, `learningResources`, `skillProfiles` (skill audit variant), `analyses`, `learningProgress` | M | todo | Claude Code |
| T1.2 | Create `convex/seedJobListings.ts`: port 30 Rwanda jobs from SkillSync `data/curated/jobs.rw.v1.json` into Spark's Convex seed format | M | todo | Claude Code |
| T1.3 | Create `convex/seedSkillTaxonomy.ts`: port 7 skill categories + demand/salary data; create `convex/seedLearningResources.ts` for 40+ resources | S | todo | Claude Code |
| T1.4 | Career profile migration: fill `interestProfile`, `valueProfile`, `personalityProfile`, `workEnvironment` fields on existing Spark career records using SkillSync's 29 profiles as source data | M | todo | Claude Code |
| T1.5 | Dependency swap: remove `@google/generative-ai` (not in Spark yet — verify absent); add `@anthropic-ai/sdk` to `package.json` | S | todo | Claude Code |

---

## Phase 2 — AI Engine

| ID   | Task                                                                                                  | Size | Status | Owner       |
|------|-------------------------------------------------------------------------------------------------------|------|--------|-------------|
| T2.1 | Create `convex/utils/sanitize.ts`: skill name sanitizer — strip newlines, limit 50 chars per skill, validate against taxonomy whitelist before prompt injection | S | todo | Claude Code |
| T2.2 | Port analysis algorithms to `convex/lib/skillAnalysis.ts`: `calculateJobMatchScore`, `rankSkillGaps`, `buildLearningPath`, `projectSalary`; add nil guards on all inputs; add ASCII diagram comment for the scoring pipeline | M | todo | Claude Code |
| T2.3 | Create `convex/skillAnalysis.ts`: Convex action `runSkillAnalysis` using `@anthropic-ai/sdk`, model `claude-haiku-4-5-20251001`, 15s timeout, Zod response validation, deterministic fallback on any failure | M | todo | Claude Code |
| T2.4 | Startup validation: if `ANTHROPIC_API_KEY` env var absent, log structured Convex error and route all calls to deterministic fallback — never a silent crash | S | todo | Claude Code |
| T2.5 | Port unit tests to `tests/unit/skillAnalysis.test.ts` (job matching, gap ranking, learning path logic) and `tests/unit/claudeParser.test.ts` (valid JSON, invalid JSON, Zod fail, timeout → fallback) | M | todo | Claude Code |

---

## Phase 3 — UI

| ID   | Task                                                                                                  | Size | Status | Owner       |
|------|-------------------------------------------------------------------------------------------------------|------|--------|-------------|
| T3.1 | Build `app/skills/page.tsx`: 3-step skill audit using `useReducer` (select → loading → results); anonymous users: `sessionStorage` + "Save results" signup prompt; authenticated: Convex mutation on submit | L | todo | Claude Code |
| T3.2 | Port `SkillSelector` to `components/SkillSelector.tsx` using Spark's brutal design system (border-3 border-black shadow-brutal); groups by taxonomy category; multi-select with experience level | M | todo | Claude Code |
| T3.3 | Port `JobMatches` to `components/JobMatches.tsx`: paginated list, filterable by industry/level/remote/salary, sortable by match %; `useMemo` for scores; salary in RWF | M | todo | Claude Code |
| T3.4 | Port `SkillGapPanel` + `LearningPath` to `components/SkillGapPanel.tsx`: top 5 gaps ranked by salary impact; 3-phase learning path (Foundation/Applied/Portfolio); progress tracking for authed users only; graceful skip for anonymous | M | todo | Claude Code |
| T3.5 | Add "Check Your Job Readiness →" CTA to `app/assessment/results/page.tsx`; link to `/skills` with `?career=[topCareerId]` context param | S | todo | Claude Code |
| T3.6 | `sessionStorage` resilience: detect unavailability on mount (try/catch), fall back to in-memory React state; no crash, no silent data loss | S | todo | Claude Code |

---

## Phase 4 — Mentor–Skill Connection

| ID   | Task                                                                                                  | Size | Status | Owner       |
|------|-------------------------------------------------------------------------------------------------------|------|--------|-------------|
| T4.1 | `SkillGapPanel`: surface 2–3 mentor cards whose `careerIds` overlap with user's target career from the analysis result; link to mentor profile | S | todo | Claude Code |
| T4.2 | Mentor browse `/mentors`: accept `?career=[careerId]&gap=[skillName]` query params to pre-filter mentor list; use these params when navigating from SkillGapPanel | S | todo | Claude Code |

---

## Phase 5 — Tests + Validation

| ID   | Task                                                                                                  | Size | Status | Owner       |
|------|-------------------------------------------------------------------------------------------------------|------|--------|-------------|
| T5.1 | Playwright E2E tests: (a) `/skills` anonymous flow — select skills → results appear, no Convex write; (b) `/skills` authenticated flow — results persisted; (c) assessment → CTA → /skills with career context; (d) `/careers/compare` renders table correctly | M | todo | Claude Code |
| T5.2 | Integration test: `ANTHROPIC_API_KEY` absent → `runSkillAnalysis` falls back to deterministic, no crash, source field = "fallback" | S | todo | Claude Code |
| T5.3 | Full build validation: `npm run build` passes with zero errors and zero TypeScript errors | S | todo | Claude Code |

---

## Summary

| Phase | Tasks | S | M | L | Status |
|-------|-------|---|---|---|--------|
| 0 — Blockers | 3 | 3 | 0 | 0 | todo |
| 1 — Data Foundation | 5 | 1 | 4 | 0 | todo |
| 2 — AI Engine | 5 | 2 | 3 | 0 | todo |
| 3 — UI | 6 | 2 | 3 | 1 | todo |
| 4 — Mentor–Skill | 2 | 2 | 0 | 0 | todo |
| 5 — Tests | 3 | 2 | 1 | 0 | todo |
| **Total** | **24** | **12** | **11** | **1** | |

---

## Critical Gaps (must be addressed before ship)

1. **T2.4** — `ANTHROPIC_API_KEY` absent → silent crash. Blocked by T1.5.
2. **T2.2** — `calculateJobMatchScore` with undefined `userSkills` → TypeError. Fixed by nil guard in T2.2.
3. **T3.6** — `sessionStorage` unavailable → state lost silently. Fixed by T3.6.

---

## NOT in scope (deferred)

| Item | Rationale |
|------|-----------|
| Live job feed from employer API | Requires company partnerships not yet in place |
| Verified skill micro-assessments | High value; needs design sprint first |
| Mobile app / USSD fallback | Phase 2; requires separate product work |
| Placement tracking / outcome data | Needs 6+ months of user data first |
| School curriculum gap dashboard | Requires school admin accounts + data agreements |
| AI analysis result caching (profile hash → 24h TTL) | Performance optimization; not blocking for MVP |
| Claude extended thinking mode | Haiku 4.5 supports it; overkill for skill gap analysis |
