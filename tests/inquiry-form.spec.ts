import { test, expect } from "@playwright/test";

/**
 * InquiryForm tests.
 *
 * Task 5 scope: render + client-side validate + fake-success state. The
 * Server Action wiring (`INQUIRY_DRY_RUN=1` + Resend) lands in Task 14,
 * at which point these tests will validate the real submit path too. For
 * now the form's `handleSubmit` calls `e.preventDefault()` and flips a
 * local `sent` state — that's what these tests pin down.
 */

const FORM_PAGES = ["/", "/tours", "/cooking", "/stay"];

for (const path of FORM_PAGES) {
  test(`${path} — inquiry form is present`, async ({ page }) => {
    await page.goto(`${path}#inquire`);
    const form = page.locator("#inquire");
    await expect(form.getByLabel(/your name/i)).toBeVisible();
    // The text input uses <input type="email">. Use locator chain to
    // disambiguate from the "Email" preferred-contact-channel radio.
    await expect(form.locator('input[type="email"][name="email"]')).toBeVisible();
    await expect(form.getByLabel(/anything eunjung should know/i)).toBeVisible();
  });
}

test("form — empty submit keeps the form, does not show success state", async ({
  page,
}) => {
  await page.goto("/#inquire");
  const form = page.locator("#inquire");
  await form.getByRole("button", { name: /send to eunjung/i }).click();
  // The success message text must not appear when required fields are empty.
  await expect(page.getByText(/eunjung will get back to you/i)).toBeHidden();
  // Per-field errors should surface via the Field's aria-live region.
  await expect(page.getByText(/please share your name/i)).toBeVisible();
  await expect(page.getByText(/we need an email to reply/i)).toBeVisible();
});

test("form — happy-path submit swaps to the success state", async ({ page }) => {
  await page.goto("/#inquire");

  // Scope all interactions to the #inquire form section so we don't
  // accidentally pick up the nav / footer "Tours" link elsewhere on the
  // page.
  const form = page.locator("#inquire");

  await form.getByLabel(/your name/i).fill("Test Guest");
  await form.locator('input[type="email"][name="email"]').fill("test.guest@example.com");

  // Optional: pick the "Tours" experience chip. The underlying control
  // is a native checkbox with `sr-only` so it's not clickable directly
  // — click the wrapping <label> (which toggles it) via its fieldset.
  await form.locator('label:has(input[name="experiences"][value="tours"])').click();

  await form.getByRole("button", { name: /send to eunjung/i }).click();

  // Fake-success StickyNote lands.
  await expect(
    page.getByText(/eunjung will get back to you within a day or two/i),
  ).toBeVisible();
});
