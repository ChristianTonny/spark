# Implemented Progress (for handoff)

This document summarizes what has been implemented on the current working branch compared to `main`, and how to verify it quickly.

## 1) Next.js + dependency upgrade (stability + security)

- **Upgraded**: Next.js to `16.0.8`, React to `19.x`, ESLint to `9.x` (flat config).
- **Adjusted**: Next.js breaking changes (metadata viewport export, dynamic route params, removed deprecated config).
- **Verified**: `npm run typecheck` and `npm run build` pass on the branch.

## 2) Auth redirect + returnTo safety (no lost query strings, no open redirects)

- **Fix**: `returnTo` is now URI-encoded where needed so nested query strings are preserved.
- **Safety**: `returnTo` is only honored when it is an internal path (starts with `/` and not `//`).
- **Fix**: `SignInPage` now wraps `useSearchParams()` in `Suspense` to avoid Next.js hydration issues.

### Quick verify
- Visit `/sign-in?returnTo=/assessment/questions?resume=1` → sign in → you should end up on `/assessment/questions?resume=1`.
- Visit `/sign-in?returnTo=https://example.com` → sign in → should **not** redirect externally.

## 3) Assessment reliability + “resume after sign-in”

- **Fix**: Assessment completion no longer fails for logged-out users.
- **Behavior**:
  - If logged out at submit time, we store a pending result in `localStorage`, redirect to sign-in, then resume saving after sign-in.
  - Fixed a React hooks crash by ensuring hooks are called before any conditional returns.
- **UI**: assessment intro page simplified (Steve-Jobs-style: minimal text + single CTA).

### Quick verify
- Start `/assessment/questions` while logged out → finish → you should be redirected to sign in.
- After sign-in → auto-resume save → redirect to `/assessment/results?id=...`.

## 4) Mentor booking reliability + approval gating

- **Backend**: booking and availability now require `professional.isApproved === true`.
- **Frontend**: booking modal and mentor profile show clear “pending approval” messaging; booking is disabled.

### Quick verify
- For an **approved** mentor, booking should work end-to-end.
- For an **unapproved** mentor, booking should be blocked with a clear message (no “developer error”).

## 5) Role guardrails (stop self-selecting privileged roles)

- **Guardrails added** in `convex/users.updateRole`:
  - Only admins can assign `educator/company/partner/admin`.
  - `mentor` role can only be set after a professional profile exists (mentor onboarding creates it).
- **Flow changes**:
  - `/onboarding/auto-role?role=mentor` no longer assigns mentor role directly; it routes to mentor onboarding.
  - Mentor onboarding now assigns mentor role only after creating the professional profile.
  - `/onboarding/auto-role?role=educator` shows an error message (educator is invitation/admin-only).

### Quick verify
- Sign up as mentor → you should be sent to mentor onboarding, not instantly granted educator/mentor privileges.
- Attempt educator signup flow → you should not get educator dashboard access without admin assignment.

## Notes for the next dev

- The assessment question *text* is seeded via Convex internal mutations (see `convex/fixAssessment.ts` and `convex/updateAssessment.ts`).
- If you need to refresh the assessment in a dev database, run the Convex mutation documented in those files (do **not** change IDs/options ordering unless you also update `lib/assessment-algorithm.ts`).


