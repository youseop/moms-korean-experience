"use client";

/**
 * InquiryForm — the "ask Eunjung anything" form section.
 *
 * Rendered at `id="inquire"` on every page so `InquiryCTA` can scroll to
 * it. Client Component because it manages local state for field values,
 * validation errors, and the success/pending UI.
 *
 * Task 5 scope: render + client-side validate + fake-success state.
 * TODO(Task 14): wire to Server Action `app/actions/submit-inquiry.ts`
 * with `useActionState`, proper server-side validation with zod, and a
 * Resend email to youseop@speakbridges.com. The submitted payload shape
 * uses `experiences: string[]` (multi-select), not a single `experience`
 * string — the chips are toggle checkboxes, not radios.
 *
 * Visual language per `docs/08-design-cute-cozy.md §4`:
 *   - Butter kicker chip + Caveat H2 + "— Eunjung" replies note
 *   - Experience chips as Patrick Hand pill toggles
 *   - Inputs on dashed-border cream paper
 *   - Submit as the tomato pill (`cta-pill`)
 *   - Success state renders as a StickyNote
 */

import { useId, useState, type FormEvent } from "react";

import { DoodleHeart } from "@/components/decoration/DoodleHeart";
import { HandArrow } from "@/components/decoration/HandArrow";
import { StickyNote } from "@/components/decoration/StickyNote";

const EXPERIENCES = [
  { value: "tours", label: "Tours" },
  { value: "cooking", label: "Cooking" },
  { value: "stay", label: "Stay" },
  { value: "chat", label: "Just curious" },
] as const;

type ExperienceValue = (typeof EXPERIENCES)[number]["value"];

const CHANNELS = ["Email", "KakaoTalk", "WhatsApp"] as const;
type Channel = (typeof CHANNELS)[number];

export type InquiryFormProps = {
  /**
   * Pre-checked experiences — chips render in the "active" state on mount.
   * Detail pages (Tours / Cooking / Stay) pass the relevant value(s) so the
   * form arrives ready-to-send. Default is `[]` — no chips selected, which
   * is a valid submission ("just curious").
   */
  prefilledExperiences?: ReadonlyArray<ExperienceValue>;
};

type Errors = Partial<{
  name: string;
  email: string;
  form: string;
}>;

// Simple email shape check — real validation happens server-side in Task 14.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InquiryForm({ prefilledExperiences }: InquiryFormProps) {
  // Labels need stable ids for a11y; `useId` gives us one per instance.
  const idBase = useId().replace(/:/g, "");

  // Multi-select: chips toggle in/out of the array. Empty array is a valid
  // submission — interpreted as "I'm just exploring" by the future Server
  // Action, no chip required.
  const [experiences, setExperiences] = useState<ExperienceValue[]>(() =>
    prefilledExperiences ? [...prefilledExperiences] : [],
  );
  const [channel, setChannel] = useState<Channel>("Email");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function toggleExperience(value: ExperienceValue) {
    setExperiences((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  // TODO(Task 14): wire to Server Action app/actions/submit-inquiry.ts
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — real bots fill this; real humans can't see it.
    if ((data.get("hp_field") as string)?.trim()) {
      // Silently succeed so the bot doesn't learn anything.
      setSent(true);
      return;
    }

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();

    const next: Errors = {};
    if (!name) next.name = "Please share your name.";
    if (!email) next.email = "We need an email to reply.";
    else if (!EMAIL_RE.test(email)) next.email = "That email doesn't look right.";

    if (next.name || next.email) {
      setErrors(next);
      return;
    }

    setErrors({});
    setSent(true);
  }

  if (sent) {
    return (
      <section id="inquire" className="scroll-mt-24 px-[22px] py-[36px]">
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
    <section id="inquire" className="scroll-mt-24 px-[22px] py-[36px]">
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

      <form onSubmit={handleSubmit} className="mt-[22px] flex flex-col gap-[18px]" noValidate>
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
        </fieldset>

        {/* Your name */}
        <Field
          id={`${idBase}-name`}
          label="Your name"
          required
          error={errors.name}
        >
          <input
            id={`${idBase}-name`}
            name="name"
            type="text"
            required
            aria-invalid={errors.name ? true : undefined}
            placeholder="First name is fine"
            className="font-body text-cocoa mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none focus:border-tomato"
          />
        </Field>

        {/* Email */}
        <Field
          id={`${idBase}-email`}
          label="Email"
          required
          error={errors.email}
        >
          <input
            id={`${idBase}-email`}
            name="email"
            type="email"
            required
            aria-invalid={errors.email ? true : undefined}
            placeholder="so she can reply"
            className="font-body text-cocoa mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none focus:border-tomato"
          />
        </Field>

        {/* Country / city */}
        <Field id={`${idBase}-location`} label="Country / city (optional)">
          <input
            id={`${idBase}-location`}
            name="location"
            type="text"
            placeholder="Berlin, Toronto, Melbourne…"
            className="font-body text-cocoa mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none focus:border-tomato"
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
                key={c}
                className="font-body text-cocoa inline-flex cursor-pointer items-center gap-[6px] text-[14px]"
              >
                <input
                  type="radio"
                  name="contactChannel"
                  value={c}
                  checked={channel === c}
                  onChange={() => setChannel(c)}
                />
                {c}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Approximate dates */}
        <Field id={`${idBase}-dates`} label="Approximate dates (optional)">
          <input
            id={`${idBase}-dates`}
            name="dates"
            type="text"
            placeholder="e.g. anytime in May 2026"
            className="font-body text-cocoa mt-[6px] block w-full border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none focus:border-tomato"
          />
        </Field>

        {/* Group size */}
        <Field id={`${idBase}-group`} label="Group size (optional)">
          <input
            id={`${idBase}-group`}
            name="groupSize"
            type="number"
            min={1}
            max={20}
            placeholder="1"
            className="font-body text-cocoa mt-[6px] block w-[140px] border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none focus:border-tomato"
          />
        </Field>

        {/* Message */}
        <Field id={`${idBase}-message`} label="Anything Eunjung should know?">
          <textarea
            id={`${idBase}-message`}
            name="message"
            rows={5}
            placeholder="Dates, allergies, what you're hoping for — or just say hi."
            className="font-body text-cocoa mt-[6px] block w-full resize-y border border-dashed border-cocoa/30 bg-[#fffdf7] px-[12px] py-[10px] text-[15px] outline-none focus:border-tomato"
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

        {errors.form && (
          <p className="font-body text-tomato text-[14px]" role="alert" aria-live="polite">
            {errors.form}
          </p>
        )}

        <div className="mt-[6px] flex items-center gap-[10px]">
          <button type="submit" className="cta-pill">
            <DoodleHeart size={16} color="#fff" fill="#fff" />
            Send to Eunjung
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
