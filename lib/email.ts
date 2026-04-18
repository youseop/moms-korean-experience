/**
 * lib/email.ts — thin wrapper around the Resend SDK for the inquiry form.
 *
 * All outbound transactional email for v1 flows through `sendInquiryEmail`.
 * The function is intentionally small: it renders a minimal HTML body,
 * sets a `replyTo` of the submitter's email (so Eunjung can reply straight
 * from her inbox), and delegates the actual network call to Resend.
 *
 * Behaviors worth remembering:
 * - `INQUIRY_DRY_RUN=1` short-circuits to a console.log and resolves OK.
 *   This is what the Playwright suite uses — no real email leaves CI.
 * - Missing `RESEND_API_KEY` in a non-dry-run environment throws loudly
 *   so misconfiguration fails fast (rather than silently dropping mail).
 * - Errors from Resend are surfaced as thrown Errors; the Server Action
 *   catches them and returns a friendly "try again" message.
 */

import { Resend } from "resend";

export type InquiryPayload = {
  name: string;
  email: string;
  experiences: string[]; // ["tours", "cooking", "stay", "chat"] subset
  country?: string;
  contactChannel?: "email" | "kakao" | "whatsapp";
  contactHandle?: string;
  dates?: string;
  groupSize?: string;
  message?: string;
};

const TO = process.env.INQUIRY_TO_EMAIL ?? "youseop@speakbridges.com";
const FROM =
  process.env.INQUIRY_FROM_EMAIL ??
  "Eunjung's Table <onboarding@resend.dev>";
const DRY_RUN = process.env.INQUIRY_DRY_RUN === "1";

export async function sendInquiryEmail(payload: InquiryPayload): Promise<void> {
  if (DRY_RUN) {
    // Dry-run signal for CI + local dev — don't silence it.
    console.log("[INQUIRY_DRY_RUN] Would send:", JSON.stringify(payload));
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Set it in .env.local or your Vercel project settings.",
    );
  }

  const resend = new Resend(apiKey);
  const subject = inquirySubject(payload);
  const html = inquiryHtml(payload);

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: payload.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(
      `Resend send failed: ${error.name ?? "unknown"} — ${error.message ?? String(error)}`,
    );
  }
}

function inquirySubject(p: InquiryPayload): string {
  const tag = p.experiences.length
    ? p.experiences.map(humanize).join(" + ")
    : "general";
  return `New inquiry from ${p.name} — ${tag}`;
}

function humanize(slug: string): string {
  switch (slug) {
    case "tours":
      return "Tours";
    case "cooking":
      return "Cooking";
    case "stay":
      return "Stay";
    case "chat":
      return "Just curious";
    default:
      return slug;
  }
}

function inquiryHtml(p: InquiryPayload): string {
  // Minimal styled HTML — readable in Gmail/iMessage previews. Inline styles
  // only (no <style> block) because most inbox clients strip <head>.
  const row = (k: string, v: string | undefined) =>
    v
      ? `<tr><td style="padding:6px 12px 6px 0;color:#5C4033;font-family:system-ui,sans-serif;font-size:13px;letter-spacing:.04em;text-transform:uppercase;">${escape(k)}</td><td style="padding:6px 0;color:#241710;font-family:system-ui,sans-serif;font-size:15px;">${escape(v)}</td></tr>`
      : "";

  return `<!doctype html>
<html><body style="margin:0;background:#FDF5E6;padding:24px;color:#241710;font-family:system-ui,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#FBF6E9;border:1px solid #EBDFC2;border-radius:6px;padding:24px;">
    <h1 style="font-family:Georgia,serif;font-style:italic;font-size:24px;margin:0 0 4px;">New note for Eunjung</h1>
    <p style="margin:0 0 18px;color:#7A604A;font-size:14px;">From the Eunjung's Table inquiry form.</p>
    <table style="border-collapse:collapse;width:100%;">
      ${row("Name", p.name)}
      ${row("Email", p.email)}
      ${row("Looking at", p.experiences.map(humanize).join(", "))}
      ${row("Country", p.country)}
      ${row("Reach via", p.contactChannel)}
      ${row("Handle", p.contactHandle)}
      ${row("Dates", p.dates)}
      ${row("Group size", p.groupSize)}
    </table>
    ${
      p.message
        ? `<div style="margin-top:18px;padding-top:18px;border-top:1px dotted #C2A98E;"><div style="font-size:13px;color:#5C4033;letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px;">Note</div><div style="white-space:pre-wrap;font-size:15px;line-height:1.55;">${escape(p.message)}</div></div>`
        : ""
    }
    <p style="margin-top:24px;font-size:12px;color:#7A604A;">Reply directly to this email — it goes back to ${escape(p.email)}.</p>
  </div>
</body></html>`;
}

function escape(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}
