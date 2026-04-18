import { test, expect } from "@playwright/test";

/**
 * Baseline smoke tests — every public page renders, has a visible brand
 * wordmark + footer, and produces no console errors during the initial
 * render. Also locks in the Hero "Ask Eunjung" secondary CTA behavior and
 * the mobile drawer open/close flow.
 *
 * Intentionally minimal. Visual regression, axe, and deep interaction
 * tests are explicitly out of scope for v1.
 */

const PAGES = [
  { path: "/", titleRe: /Eunjung/i },
  { path: "/tours", titleRe: /Tours/i },
  { path: "/cooking", titleRe: /Cooking/i },
  { path: "/stay", titleRe: /Stay/i },
];

for (const { path, titleRe } of PAGES) {
  test(`${path} — renders, has chrome, no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(path);
    await expect(page).toHaveTitle(titleRe);

    // Header brand wordmark — matches straight or curly apostrophe.
    await expect(
      page.getByRole("link", { name: /Eunjung['\u2019]s Table/i }).first(),
    ).toBeVisible();
    // Footer element (role=contentinfo).
    await expect(page.getByRole("contentinfo")).toBeVisible();

    // Filter expected next-image / resource-load warnings so the suite
    // stays stable against network flakiness. Keep everything else strict.
    const fatal = errors.filter((e) => !/^Failed to load resource/.test(e));
    expect(fatal, `Console errors on ${path}:\n${fatal.join("\n")}`).toHaveLength(0);
  });
}

test("home — Hero secondary CTA links to #inquire", async ({ page }) => {
  await page.goto("/");
  // Hero secondary CTA — "Ask Eunjung" with href="#inquire".
  const askCta = page.getByRole("link", { name: /Ask Eunjung/i }).first();
  await expect(askCta).toBeVisible();
  await expect(askCta).toHaveAttribute("href", /#inquire/);
});

test("mobile drawer opens, lists experience routes, and closes on Escape", async ({
  page,
}) => {
  await page.goto("/");

  // Header menu trigger (Open menu aria-label).
  const trigger = page.getByRole("button", { name: /open menu/i });
  await trigger.click();

  // Drawer is now open — nav links inside the dialog should be visible.
  const dialog = page.getByRole("dialog", { name: /site navigation/i });
  await expect(dialog.getByRole("link", { name: /^Tours$/i })).toBeVisible();
  await expect(dialog.getByRole("link", { name: /^Cooking$/i })).toBeVisible();
  await expect(dialog.getByRole("link", { name: /^Stay$/i })).toBeVisible();

  // Close via Escape.
  await page.keyboard.press("Escape");
  // The drawer panel translates off-screen on close — its nav links must
  // no longer be visible to the user.
  await expect(dialog.getByRole("link", { name: /^Tours$/i })).toBeHidden();
});
