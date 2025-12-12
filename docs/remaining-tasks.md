# Remaining Tasks (Sequential Execution)

This file tracks the remaining work we agreed to execute sequentially (one item at a time).  
Owner: Christian (G)

## Assigned to Christian (execute first)

### 1) Issue #13 — Enhance security for sign-ins and notifications via email (Open)
- **Link**: [Issue #13](https://github.com/ChristianTonny/spark/issues/13)
- **Goal**: harden auth + email notification workflows; remove obvious insecure defaults; ensure reliable delivery.
- **Plan**:
  - **Auth hardening**
    - Review Clerk sign-in configuration, session handling, and protected routes.
    - Verify any sensitive pages/actions require an authenticated user and correct role.
    - Add guardrails so users cannot self-select educator/mentor roles to reach those dashboards; enforce explicit approval.
  - **Email/webhook hardening**
    - Audit `/api/emails/send` request verification and environment configuration.
    - Ensure production refuses unsigned/unauthorized webhook calls (no “allow if missing secret” behavior).
  - **Delivery + observability**
    - Add consistent error handling + logs for email send failures.
    - Confirm Resend API key / domains / sender configuration is correct for production.
  - **Acceptance checks**
    - Manual: sign-in + sign-up + password reset flows.
    - Manual: trigger at least one email workflow end-to-end and verify delivery + error paths.

### 2) Issue #15 — Redesign assessment page with evidence-based, impactful research questions (Open)
- **Link**: [Issue #15](https://github.com/ChristianTonny/spark/issues/15)
- **Goal**: replace/upgrade question bank and UX so results are meaningful, actionable, and research-backed.
- **Plan**:
  - **Define the “question model”**
    - Identify current assessment schema + scoring logic (Convex + client pages).
    - Decide what outputs must be produced (career recommendations, categories, traits, etc.).
  - **Research-backed question bank**
    - Draft a reduced, high-signal set of questions and map each to measurable traits.
    - Document rationale/refs briefly (keep citations lightweight but real).
  - **UX improvements**
    - Ensure assessment requires login (or gracefully supports anonymous with clear save/submit rules).
    - Improve progress state + validation + error states.
  - **Acceptance checks**
    - Manual: anonymous user experience (must not fail silently).
    - Manual: logged-in completion + results page.
    - Regression: no runtime errors in `/assessment` and `/assessments`.

### 3) Issue #19 — Comprehensive review and end-to-end usability improvements for mentor profile (Open)
- **Link**: [Issue #19](https://github.com/ChristianTonny/spark/issues/19)
- **Goal**: remove friction + ensure mentor profile lifecycle is seamless and accessible.
- **Plan**:
  - **Lifecycle audit**
    - Mentor discovery → profile → booking → session completion → rating/message flows.
  - **Fix top friction points**
    - Resolve “developer error” in mentor booking confirmation (Convex mutation/query flow).
    - Improve user-facing messaging when mentor is not approved (toast + UI states).
  - **UI/UX tightening**
    - Reduce visual noise; ensure consistent spacing/alignment; improve mobile ergonomics.
  - **Acceptance checks**
    - Manual: booking flow works end-to-end for approved mentor.
    - Manual: not-approved mentor produces a clear, non-technical message.

## Not assigned to Christian (queue after the above)

### 4) Issue #18 — Integrate session booking with Google Calendar and email sync (Open, currently unassigned)
- **Link**: [Issue #18](https://github.com/ChristianTonny/spark/issues/18)
- **Notes**:
  - This is larger scope (OAuth, calendar invites, error handling, docs).
  - Recommend starting only after booking flow (Issue #19) is stable.

## Cleanup/Follow-ups from meeting notes (create issues or link to existing before implementation)

- **Database/content**:
  - Expand careers dataset with Rwanda context (tourism, culinary arts, TVET, schools, local employers).
  - Create a research-first tracking document (no-code phase) listing schools/jobs/careers.
- **UI/UX**:
  - Careers-first navigation (search-first) and reduce card size (target ~6 visible per view).
  - Reduce/remodel salary prominence and simplify career profile “overwhelming” sections.
- **Platform reliability**:
  - Fix assessment submission behavior for non-logged users (no “complete but fail on submit”).
  - Fix mentor booking confirmation errors and approval-gating UX messaging.

## Delivery Process (applies to each task/issue)

- Create a dedicated branch per issue: `issue-<number>-<short-name>`
- Submit PRs with:
  - Unit tests where applicable (or minimal regression coverage if the area isn’t testable yet)
  - Responsiveness check (mobile/tablet/desktop) + checklist note
  - Clear “how to verify” steps in PR description
- Merge dependency/security changes to `main` before starting major feature work.

## Milestone & Research Track (Jan 15 “north star”)

- **Jan 15 deliverable**: a functional OpportunityMap platform + Venture Labs application submission.
- **Research & validation (parallel track, time-boxed)**:
  - Competitor scan: LinkedIn/Glassdoor/job boards + local Rwanda context
  - Define target user segments (who exactly is the primary user in Rwanda?)
  - Validate unique value proposition (what is materially better than existing solutions?)
  - Draft a sustainable business model + monetization hypothesis
- **Product discipline**:
  - Build features you would personally use; define success metrics (SMART goals) per milestone.



