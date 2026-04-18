/**
 * PullRibbon — a wide, full-bleed pull quote that reads as torn paper tape
 * across the page.
 *
 * Related to `EunjungQuote` but stretched edge-to-edge and with a slight
 * tilt — you use PullRibbon to break up long prose on a detail page,
 * whereas `EunjungQuote` is the pinned pull-note on Home.
 *
 * Rendering: tomato-tinted paper band with dashed-cocoa inner border,
 * Caveat 28px quote, Indie Flower signoff. Tilts -1.4° and nudges the
 * edges outside the page column to get the torn-ribbon look without
 * knowing the page width.
 */

export type PullRibbonProps = {
  quote: string;
  /** Optional signoff. Default "— Eunjung". */
  signoff?: string;
  /** Extra classes for the outer wrapper. */
  className?: string;
};

export function PullRibbon({
  quote,
  signoff = "— Eunjung",
  className = "",
}: PullRibbonProps) {
  return (
    <figure
      className={`relative -mx-[4px] my-[26px] px-[22px] py-[22px] shadow-warm-soft ${className}`}
      style={{
        background: "var(--color-tape-peach)",
        // Torn edges top and bottom so it reads as paper tape.
        clipPath:
          "polygon(0% 6%, 4% 2%, 10% 5%, 18% 1%, 28% 4%, 38% 0%, 48% 3%, 58% 1%, 68% 4%, 78% 0%, 88% 3%, 96% 1%, 100% 5%, 100% 95%, 96% 98%, 88% 96%, 78% 99%, 68% 95%, 58% 98%, 48% 96%, 38% 99%, 28% 95%, 18% 98%, 10% 96%, 4% 99%, 0% 94%)",
        transform: "rotate(-1.4deg)",
      }}
    >
      <blockquote className="font-display text-cocoa m-0 text-[28px] leading-[1.15]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {signoff && (
        <figcaption className="font-script text-tomato mt-[8px] block text-right text-[18px]">
          {signoff}
        </figcaption>
      )}
    </figure>
  );
}
