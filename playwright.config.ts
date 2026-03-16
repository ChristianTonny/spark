import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E configuration.
 *
 * Run: npx playwright test
 * Requires: npm run dev running on localhost:3000
 *
 * CI: set BASE_URL env var to override the default.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Do NOT start a webServer here — tests rely on a separately running dev server
});
