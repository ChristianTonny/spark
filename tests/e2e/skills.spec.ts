/**
 * T5.1 — E2E tests for /skills route
 *
 * Covers:
 *   1. Anonymous flow — skill select → analyse → results shown without auth
 *   2. Assessment → CTA → /skills pre-filled with career param
 *   3. Comparison page renders (regression guard)
 *
 * Authenticated flow is not tested here because Clerk sign-in in E2E
 * requires either a test account or Clerk test mode tokens.
 * Those are tracked in a separate auth.spec.ts (future work).
 *
 * Requires: `npm run dev` running on localhost:3000
 */

import { test, expect } from '@playwright/test';

// ─── /skills — anonymous flow ─────────────────────────────────────────────────

test.describe('/skills — anonymous user', () => {
  test('page loads and shows skill selector', async ({ page }) => {
    await page.goto('/skills');
    await expect(page.getByRole('heading', { name: /job readiness/i })).toBeVisible();
    // Skill selector accordion should render
    await expect(page.getByText(/skills selected/i)).toBeVisible();
  });

  test('Analyse button is disabled with no skills selected', async ({ page }) => {
    await page.goto('/skills');
    const analyseBtn = page.getByRole('button', { name: /analyse my skills/i });
    await expect(analyseBtn).toBeDisabled();
  });

  test('selecting a skill enables the Analyse button', async ({ page }) => {
    await page.goto('/skills');

    // Expand the first category accordion
    const firstCategory = page.locator('button').filter({ hasText: /demand/i }).first();
    await firstCategory.click();

    // Click the first skill chip
    const firstSkill = page.locator('button').filter({ hasNotText: /demand|analyse|back/i }).first();
    await firstSkill.click();

    const analyseBtn = page.getByRole('button', { name: /analyse my skills/i });
    await expect(analyseBtn).toBeEnabled();
  });

  test('results panel renders after analysis (loading → results)', async ({ page }) => {
    // Allow up to 30s for AI/fallback to respond
    test.setTimeout(60_000);

    await page.goto('/skills');

    // Expand first category and pick a skill
    const firstCategory = page.locator('button').filter({ hasText: /demand/i }).first();
    await firstCategory.click();
    const firstSkill = page.locator('button').filter({ hasNotText: /demand|analyse|back/i }).first();
    await firstSkill.click();

    await page.getByRole('button', { name: /analyse my skills/i }).click();

    // Loading spinner should appear
    await expect(page.getByText(/analysing your skills/i)).toBeVisible();

    // Results should render (Job Matches tab)
    await expect(page.getByText(/job matches/i)).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText(/skill gaps/i)).toBeVisible();
  });

  test('anonymous user sees "Save your results" signup prompt in results', async ({ page }) => {
    test.setTimeout(60_000);

    await page.goto('/skills');
    const firstCategory = page.locator('button').filter({ hasText: /demand/i }).first();
    await firstCategory.click();
    const firstSkill = page.locator('button').filter({ hasNotText: /demand|analyse|back/i }).first();
    await firstSkill.click();
    await page.getByRole('button', { name: /analyse my skills/i }).click();

    await expect(page.getByText(/save your results/i)).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole('link', { name: /sign up free/i })).toBeVisible();
  });

  test('"Update my skills" resets back to select step', async ({ page }) => {
    test.setTimeout(60_000);

    await page.goto('/skills');
    const firstCategory = page.locator('button').filter({ hasText: /demand/i }).first();
    await firstCategory.click();
    const firstSkill = page.locator('button').filter({ hasNotText: /demand|analyse|back/i }).first();
    await firstSkill.click();
    await page.getByRole('button', { name: /analyse my skills/i }).click();

    await expect(page.getByText(/job matches/i)).toBeVisible({ timeout: 30_000 });

    await page.getByRole('button', { name: /update my skills/i }).click();
    // Should return to skill selector
    await expect(page.getByRole('button', { name: /analyse my skills/i })).toBeVisible();
  });
});

// ─── Assessment → CTA → /skills ───────────────────────────────────────────────

test.describe('assessment results → Check Job Readiness CTA', () => {
  test('/assessment/results page renders (loads without crash)', async ({ page }) => {
    await page.goto('/assessment/results');
    // Page loads — auth will redirect or show empty state, but should not crash
    const body = page.locator('body');
    await expect(body).toBeVisible();
    // Should not show a 500 error
    await expect(page.getByText(/application error|internal server error/i)).not.toBeVisible();
  });
});

// ─── /skills?career= — context param accepted ─────────────────────────────────

test.describe('/skills with career context param', () => {
  test('page loads with ?career= param without crashing', async ({ page }) => {
    await page.goto('/skills?career=test-career-id');
    await expect(page.getByRole('heading', { name: /job readiness/i })).toBeVisible();
  });
});

// ─── Comparison page regression ───────────────────────────────────────────────

test.describe('/careers/compare', () => {
  test('comparison page renders without crashing', async ({ page }) => {
    await page.goto('/careers/compare');
    const body = page.locator('body');
    await expect(body).toBeVisible();
    await expect(page.getByText(/application error|internal server error/i)).not.toBeVisible();
  });

  test('comparison page with ?ids= param loads without crashing', async ({ page }) => {
    await page.goto('/careers/compare?ids=fake-id-1,fake-id-2');
    const body = page.locator('body');
    await expect(body).toBeVisible();
    await expect(page.getByText(/application error|internal server error/i)).not.toBeVisible();
  });
});
