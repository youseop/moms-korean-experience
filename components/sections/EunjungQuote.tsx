/**
 * EunjungQuote — a pinned pull-quote note, rendered as if Eunjung pinned
 * something she said up on the page.
 *
 * Ports the prototype `.pullquote` element
 * (`design-prototypes/cute-cozy/index.html` CSS L367–L407 + markup L786–L794):
 * dashed-cocoa border on cream paper, pink washi tape top-left, tomato
 * push-pin top-center, Caveat quote (26px), Indie Flower "— Eunjung" sig
 * bottom-right, slight -1.2° tilt.
 */

import { PushPin } from "@/components/decoration/PushPin";
import { WashiTape } from "@/components/decoration/WashiTape";

export type EunjungQuoteProps = {
  quote: string;
  /** Signoff text. Default "— Eunjung". */
  signoff?: string;
  className?: string;
};

export function EunjungQuote({ quote, signoff = "— Eunjung", className = "" }: EunjungQuoteProps) {
  return (
    <figure
      className={`relative mx-[18px] my-[30px] border border-dashed border-cocoa/30 px-[20px] pt-[22px] pb-[18px] shadow-warm-soft ${className}`}
      style={{
        background: "#fffdf3",
        transform: "rotate(-1.2deg)",
      }}
    >
      {/* pink washi strip at top-left, angled. */}
      <WashiTape
        color="pink"
        tilt={-8}
        width={60}
        height={18}
        className="absolute -top-[14px] left-[14px]"
      />
      {/* tomato push-pin top-center. */}
      <PushPin size={20} className="absolute -top-[10px] left-1/2 -translate-x-1/2" />

      <blockquote className="font-display text-cocoa m-0 block text-[26px] leading-[1.15]">
        {quote}
      </blockquote>

      <figcaption className="font-script text-tomato mt-[10px] block text-right text-[17px]">
        {signoff}
      </figcaption>
    </figure>
  );
}
