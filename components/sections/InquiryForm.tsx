"use client";

/**
 * InquiryForm — the "ask Eunjung anything" form section.
 *
 * Rendered at `id="inquire"` on every page so `InquiryCTA` can scroll to
 * it. Client Component because it drives UI state (chip toggles, channel
 * radio, pending/success frame) off React 19's `useActionState` hook.
 *
 * Task 14 wiring: the `<form>`'s `action` is the `submitInquiry` Server
 * Action. That action validates with zod, sends the email via Resend
 * (`lib/email.ts`), and returns `InquiryFormState`. When `INQUIRY_DRY_RUN`
 * is set (Playwright / local dev without a Resend key) the send is
 * short-circuited to a console log — the UI doesn't know the difference.
 *
 * Visual language per `docs/08-design-cute-cozy.md §4`:
 *   - Butter kicker chip + Caveat H2 + "— Eunjung" replies note
 *   - Experience chips as Patrick Hand pill toggles
 *   - Inputs on dashed-border cream paper
 *   - Submit as the tomato pill (`cta-pill`)
 *   - Success state renders as a StickyNote
 */

import { useActionState, useId, useState } from "react";

import { DoodleHeart } from "@/components/decoration/DoodleHeart";
import { HandArrow } from "@/components/decoration/HandArrow";
import { StickyNote } from "@/components/decoration/StickyNote";

import {
  submitInquiry,
  type InquiryFormState,
} from "@/app/actions/submit-inquiry";

const EXPERIENCES = [
  { value: "tours", label: "Tours" },
  { value: "cooking", label: "Cooking" },
  { value: "stay", label: "Stay" },
  { value: "chat", label: "Just curious" },
] as const;

type ExperienceValue = (typeof EXPERIENCES)[number]["value"];

// Channel values match the server schema (lowercase slug, not display label).
const CHANNELS = [
  { value: "email", label: "Email" },
  { value: "kakao", label: "KakaoTalk" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

type ChannelValue = (typeof CHANNELS)[number]["value"];

export type InquiryFormProps = {
  /**
   * Pre-checked experiences — chips render in the "active" state on mount.
   * Detail pages (Tours / Cooking / Stay) pass the relevant value(s) so the
   * form arrives ready-to-send. Default is `[]` — no chips selected, which
   * is a valid submission ("just curious").
   */
  prefilledExperiences?: ReadonlyArray<ExperienceValue>;
};

const INITIAL_STATE: InquiryFormState = { ok: false };

export function InquiryForm({ prefilledExperiences }: InquiryFormProps) {
  // Labels need stable ids for a11y; `useId` gives us one per instance.
  const idBase = useId().replace(/:/g, "");

  // `useActionState` gives us the reducer-style (state, formAction, pending)
  // triple. The initial `ok: false` is the "not yet submitted" sentinel —
  // we guard the success UI on `hasSubmitted` so the form isn't swapped
  // out on first mount.
  const [state, formAction, isPending] = useActionState<
    InquiryFormState,
    FormData
  >(submitInquiry, INITIAL_STATE);

  // Multi-select: chips toggle in/out of the array. Empty array is a valid
  // submission — interpreted as "just curious" by the server, no chip
  // required. Local state drives the active styling; each checkbox is a
  // real input with `name="experiences"` so it lands in FormData.
  const [experiences, setExperiences] = useState<ExperienceValue[]>(() =>
    prefilledExperiences ? [...prefilledExperiences] : [],
  );
  const [channel, setChannel] = useState<ChannelValue>("email");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function toggleExperience(value: ExperienceValue) {
    setExperiences((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  const fieldErrors = state.fieldErrors ?? {};
  const showSuccess = hasSubmitted && state.ok && !isPending;

  if (showSuccess) {
    return (
      <section id="inquire" className="reveal scroll-mt-24 px-[22px] py-[36px]">
        <StickyNote tilt={-2} className="text-center">
          <p className="font-display text-cocoa m-0 text-[22px] leading-[1.2]">
            Thanks! Eunjung will get back to you within a day or two.
          </p>
          <p className="font-script text-tomato mt-[10px] text-[17px]">
            — Eunjung &hearts;
          </p>
        </StickyNote>
      </section>
    );
  }

  return (
    <section id="inquire" className="reveal scroll-mt-24 px-[22px] py-[36px]">
      {/* Heading block */}
      <span className="bg-tape-butter font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
        Ask Eunjung anything
      </span>
      <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[36px] leading-[1.05] font-bold">
        Curious? Send her a note.
      </h2>
      <p className="font-body text-ink-soft mt-[8px] max-w-[290px] text-[14px] leading-[1.55]">
        She usually replies within a day or two.
      </p>

      <form
        action={formAction}
        onSubmit={() => setHasSubmitted(true)}
        className="mt-[22px] flex flex-col gap-[18px]"
        noValidate
      >
        {/* Experience chips — multi-select toggles. Tap to add/remove. */}
        <fieldset className="m-0 border-0 p-0">
          <legend className="font-display text-cocoa mb-[8px] inline-block -rotate-[1deg] text-[20px] leading-none">
            Which ones interest you?
          </legend>
          <div className="flex flex-wrap gap-[8px]">
            {EXPERIENCES.map((e) => {
              const active = experiences.includes(e.value);
              return (
                <label
                  key={e.value}
                  className={`font-stamp inline-flex cursor-pointer items-center gap-[6px] rounded-full border border-dashed px-[12px] py-[6px] text-[13px] transition-colors ${
                    active
                      ? "bg-tomato border-tomato text-white shadow-warm-soft"
                      : "bg-[#fffdf7] border-cocoa/30 text-cocoa"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="experiences"
                    value={e.value}
                    checked={active}
                    onChange={() => toggleExperience(e.value)}
                    className="sr-only"
                  />
                  {active && (
                    <svg
                      aria-hidden="true"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 6.5 L5 9.5 L10 3" />
                    </svg>
                  )}
                  {e.label}
                </label>
              );
            })}
          </div>
          {fieldErrors.experiences && (
            <p
              className="font-body text-tomato mt-[6px] text-[13px]"
              role="alert"
              aria-live="polite"
            >
              {fieldErrors.experiences}
            </p>
          )}
        </fieldset>

        {/* Your name */}
        <Field
          id={`${idBase}-name`}
          label="Your name"
          required
          error={fieldErrors.name}
        >
          <input
            id={`${idBase}-name`}
            name="name"
            type="text"
            required
            aria-invalid={fieldErrors.name ? true : undefined}
            placeholder="First name is fine"
            className="font-body text-cocoa focus:border-tomato mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none"
          />
        </Field>

        {/* Email */}
        <Field
          id={`${idBase}-email`}
          label="Email"
          required
          error={fieldErrors.email}
        >
          <input
            id={`${idBase}-email`}
            name="email"
            type="email"
            required
            aria-invalid={fieldErrors.email ? true : undefined}
            placeholder="so she can reply"
            className="font-body text-cocoa focus:border-tomato mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none"
          />
        </Field>

        {/* Country / city */}
        <Field
          id={`${idBase}-country`}
          label="Country / city (optional)"
          error={fieldErrors.country}
        >
          <input
            id={`${idBase}-country`}
            name="country"
            type="text"
            placeholder="Berlin, Toronto, Melbourne…"
            className="font-body text-cocoa focus:border-tomato mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none"
          />
        </Field>

        {/* Preferred contact channel */}
        <fieldset className="m-0 border-0 p-0">
          <legend className="font-stamp text-cocoa mb-[8px] text-[13px]">
            Preferred contact channel
          </legend>
          <div className="flex flex-wrap gap-[14px]">
            {CHANNELS.map((c) => (
              <label
                key={c.value}
                className="font-body text-cocoa inline-flex cursor-pointer items-center gap-[6px] text-[14px]"
              >
                <input
                  type="radio"
                  name="contactChannel"
                  value={c.value}
                  checked={channel === c.value}
                  onChange={() => setChannel(c.value)}
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Contact handle (KakaoTalk id, WhatsApp number, etc.) */}
        <Field
          id={`${idBase}-handle`}
          label="Contact handle (optional)"
          error={fieldErrors.contactHandle}
        >
          <input
            id={`${idBase}-handle`}
            name="contactHandle"
            type="text"
            placeholder="KakaoTalk id / WhatsApp number"
            className="font-body text-cocoa focus:border-tomato mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none"
          />
        </Field>

        {/* Approximate dates */}
        <Field
          id={`${idBase}-dates`}
          label="Approximate dates (optional)"
          error={fieldErrors.dates}
        >
          <input
            id={`${idBase}-dates`}
            name="dates"
            type="text"
            placeholder="e.g. anytime in May 2026"
            className="font-body text-cocoa focus:border-tomato mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none"
          />
        </Field>

        {/* Group size — free text, not a number input, so "2 adults + 1 kid"
            still works. Server caps length at 40 chars. */}
        <Field
          id={`${idBase}-group`}
          label="Group size (optional)"
          error={fieldErrors.groupSize}
        >
          <input
            id={`${idBase}-group`}
            name="groupSize"
            type="text"
            placeholder="1"
            className="font-body text-cocoa focus:border-tomato mt-[6px] block w-[180px] border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none"
          />
        </Field>

        {/* Message */}
        <Field
          id={`${idBase}-message`}
          label="Anything Eunjung should know?"
          error={fieldErrors.message}
        >
          <textarea
            id={`${idBase}-message`}
            name="message"
            rows={5}
            placeholder="Dates, allergies, what you're hoping for — or just say hi."
            className="font-body text-cocoa focus:border-tomato mt-[6px] block w-full resize-y border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none"
          />
        </Field>

        {/* Honeypot — hidden visually but accessible to bots that scrape. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            If you can see this, please leave it empty.
            <input
              type="text"
              name="hp_field"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {state.error && (
          <p
            className="font-body text-tomato text-[14px]"
            role="alert"
            aria-live="polite"
          >
            {state.error}
          </p>
        )}

        <div className="mt-[6px] flex items-center gap-[10px]">
          <button type="submit" className="cta-pill" disabled={isPending}>
            <DoodleHeart size={16} color="#fff" fill="#fff" />
            {isPending ? "Sending…" : "Send to Eunjung"}
          </button>
          <HandArrow direction="right" length={48} className="rotate-[6deg]" />
        </div>
      </form>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="font-stamp text-cocoa block text-[13px]">
        {label}
        {required && (
          <span aria-hidden="true" className="text-tomato">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          className="font-body text-tomato mt-[6px] text-[13px]"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
