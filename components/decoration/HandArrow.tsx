/**
 * HandArrow — a hand-drawn curving arrow SVG.
 *
 * Ports the prototype hero arrow (`design-prototypes/cute-cozy/index.html`
 * SVG L738–L742) and the card cta-link mini arrow (L828–L831). Used to
 * point at CTAs with that "handwritten, look-here" energy.
 *
 * Four directions are supported by rotating the `right` SVG — the path
 * itself is always drawn pointing right. Default size matches the hero
 * arrow (72×48). Use `length` to size uniformly.
 */

export type HandArrowProps = {
  direction?: "right" | "down" | "left" | "up";
  /** Length in px. Width scales proportionally; aspect preserved at 3:2. */
  length?: number;
  /** Stroke color. Default tomato. */
  color?: string;
  /** Extra classes (primarily for absolute positioning). */
  className?: string;
};

const ROT: Record<NonNullable<HandArrowProps["direction"]>, number> = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
};

export function HandArrow({
  direction = "right",
  length = 72,
  color = "#E94B3C",
  className = "",
}: HandArrowProps) {
  const h = Math.round(length * (48 / 72));
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 48"
      width={length}
      height={h}
      fill="none"
      className={className}
      style={{ transform: `rotate(${ROT[direction]}deg)` }}
    >
      {/* Curve — ported verbatim from prototype hero `.arrow-to-cta`. */}
      <path
        d="M65 6 Q 45 0, 30 14 Q 18 25, 10 40"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead. */}
      <path
        d="M6 38 L 12 42 L 14 34"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
