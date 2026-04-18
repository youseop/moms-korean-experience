import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the Eunjung's Table baseline smoke suite.
 *
 * - `testDir` points at this same `tests/` directory so the two spec files
 *   (`smoke.spec.ts`, `inquiry-form.spec.ts`) are picked up automatically.
 * - We run both a `mobile` (iPhone 14) and a `desktop` (Desktop Chrome)
 *   project. The app itself is a mobile-only 420px column, but exercising
 *   desktop ensures the column layout holds up in a wider viewport too.
 * - `webServer` auto-starts a production `next start` on port 3001 so the
 *   suite can run without a manual `pnpm dev`. Port 3001 avoids colliding
 *   with any existing `pnpm dev` on 3000. A fresh `next build` is run via
 *   the `pretest:e2e` npm script before this config's webServer boots.
 * - `reuseExistingServer: !process.env.CI` lets local reruns pick up an
 *   already-warm server rather than rebooting the prod build every time.
 */
export default defineConfig({
  testDir: "./",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "html",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [
    // Mobile runs on chromium (not webkit) so the suite has a single
    // browser install. The iPhone 14 viewport + touch + isMobile flags
    // are what matter here — the exact engine is not.
    {
      name: "mobile",
      use: { ...devices["iPhone 14"], defaultBrowserType: "chromium" },
    },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "pnpm next start --port 3001",
    // Explicit cwd — testDir is `./tests`, but the Next.js build output
    // lives in the repo root's `.next/`. Without this, `next start` boots
    // in the `tests/` folder and can't find the production build.
    cwd: "..",
    url: "http://localhost:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // `INQUIRY_DRY_RUN=1` tells `lib/email.ts` to skip the real Resend
    // network call — the Server Action still runs + validates, it just
    // console.logs instead of sending. The stub `RESEND_API_KEY` is just
    // so the dev-mode guard in `lib/email.ts` is happy if anything else
    // in the action path ever reads it directly.
    env: {
      ...process.env,
      INQUIRY_DRY_RUN: "1",
      RESEND_API_KEY: process.env.RESEND_API_KEY ?? "re_test_dryrun",
    },
  },
});
