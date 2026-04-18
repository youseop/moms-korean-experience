/**
 * InquiryCTA — pill button that scrolls to the `#inquire` anchor on the page.
 *
 * Ports the prototype CTA pill pattern (`design-prototypes/cute-cozy/index.html`
 * L731–L744 hero + L952–L957 footer). It's an `<a>` not a `<button>` because
 * it's an in-page anchor — scroll behavior comes from the browser (smooth-
 * scroll is enabled via `html { scroll-behavior: smooth }` in globals or the
 * user's OS setting).
 *
 * Decorations: a HandArrow and a "tap this!" Caveat label. This keeps the
 * component lightweight — `InquiryForm.tsx` is the actual form target.
 */

import { DoodleHeart } from "@/components/decoration/DoodleHeart";
import { HandArrow } from "@/components/decoration/HandArrow";

export type InquiryCTAProps = {
  /** Button label. Default "Ask Eunjung". */
  label?: string;
  /** Scroll target. Default `#inquire`. */
  href?: string;
  /** Optional small Caveat note above the pill — e.g. "tap this!". */
  note?: string;
};

export function InquiryCTA({
  label = "Ask Eunjung",
  href = "#inquire",
  note = "tap this!",
}: InquiryCTAProps) {
  return (
    <div className="relative my-[20px] flex items-center gap-[10px] px-[22px]">
      <a href={href} className="cta-pill">
        <DoodleHeart size={16} color="#fff" fill="#fff" />
        {label}
      </a>
      <HandArrow direction="right" length={72} className="rotate-[6deg]" />
      {note && (
        <span className="font-display text-tomato absolute top-[-22px] left-[80px] -rotate-6 text-[20px]">
          {note}
        </span>
      )}
    </div>
  );
}
