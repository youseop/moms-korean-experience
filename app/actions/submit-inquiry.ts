"use server";

/**
 * submitInquiry — the single Server Action behind the `#inquire` form.
 *
 * Validates with zod, sends via `lib/email.ts`, and returns a
 * `InquiryFormState` the client drives its UI from via `useActionState`.
 *
 * Shape notes:
 * - `experiences` is a multi-select (`string[]`) — an empty array is a
 *   valid "just curious" submission.
 * - Optional text fields use `z.literal("")` in a union so the form's
 *   built-in empty-string values don't trip length validators.
 * - Error copy mirrors the strings the Playwright suite asserts on —
 *   "Please share your name." / "We need an email to reply." — don't
 *   change them without updating `tests/inquiry-form.spec.ts`.
 * - Honeypot: if the hidden `hp_field` is populated, we return `ok: true`
 *   without sending. Bots can't distinguish success from silence.
 */

import { z } from "zod";

import { sendInquiryEmail, type InquiryPayload } from "@/lib/email";

const ExperienceEnum = z.enum(["tours", "cooking", "stay", "chat"]);

const InquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please share your name.")
    .max(120, "That name is a bit long — keep it under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "We need an email to reply.")
    .email("That email doesn't look right."),
  experiences: z.array(ExperienceEnum).default([]),
  country: z.string().trim().max(120).optional().or(z.literal("")),
  contactChannel: z
    .enum(["email", "kakao", "whatsapp"])
    .optional()
    .or(z.literal("")),
  contactHandle: z.string().trim().max(120).optional().or(z.literal("")),
  dates: z.string().trim().max(200).optional().or(z.literal("")),
  groupSize: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  hp_field: z.string().max(0, "spam").optional().or(z.literal("")),
});

export type InquiryFormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  // Honeypot — if a bot filled the hidden field, short-circuit to a silent
  // "success" so we don't tell the bot which signal worked.
  const hp = String(formData.get("hp_field") ?? "");
  if (hp.length > 0) return { ok: true };

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    // `getAll` returns every entry named `experiences` — the chips render
    // as native checkboxes with a shared name, one per chip.
    experiences: formData.getAll("experiences"),
    country: formData.get("country") ?? "",
    contactChannel: formData.get("contactChannel") ?? "",
    contactHandle: formData.get("contactHandle") ?? "",
    dates: formData.get("dates") ?? "",
    groupSize: formData.get("groupSize") ?? "",
    message: formData.get("message") ?? "",
    hp_field: hp,
  };

  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "");
      if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  // Strip the honeypot before passing to the email sender.
  const { hp_field: _hp, ...payload } = parsed.data;
  void _hp;

  try {
    // `payload` has zod's stricter types (e.g. literal "" unions); the
    // email sender just wants plain `string | undefined`. An explicit
    // cast is clearer here than carrying zod types into `lib/email.ts`.
    await sendInquiryEmail(payload as unknown as InquiryPayload);
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    // Surface misconfig (missing key, Resend failure) to server logs.
    console.error("submitInquiry failed:", msg);
    return {
      ok: false,
      error: "Couldn't send right now. Please try again in a minute.",
    };
  }
}
