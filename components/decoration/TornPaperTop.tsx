/**
 * TornPaperTop — a torn-edge SVG sitting at the top of a section.
 *
 * Ports the prototype `.maru::before` background-image
 * (`design-prototypes/cute-cozy/index.html` CSS L517–L525). Suggests the
 * section is a separate sheet of paper glued on top, with a handmade
 * ragged top edge.
 *
 * Pass `color` to match the parent's background so the torn edge reads
 * like the paper of the section below, not a floating shape.
 *
 * Render the component with absolute positioning just above a rounded
 * cream card (see `MaruBlock.tsx`): it's 100% wide and ~10px tall.
 */

export type TornPaperTopProps = {
  /** Paper color (should match the section bg). Default cream. */
  color?: string;
  /** Extra classes — usually absolute positioning. */
  className?: string;
};

export function TornPaperTop({ color = "#fffdf3", className = "" }: TornPaperTopProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 10"
      preserveAspectRatio="none"
      className={className}
      style={{ display: "block", width: "100%", height: "10px" }}
    >
      <path
        d="M0 10 L 0 4 Q 10 1 20 5 T 40 4 T 60 5 T 80 3 T 100 5 T 120 4 T 140 6 T 160 3 T 180 5 T 200 4 T 220 6 T 240 3 T 260 5 T 280 4 T 300 6 T 320 3 T 340 5 T 360 4 T 380 6 T 400 4 L 400 10 Z"
        fill={color}
      />
    </svg>
  );
}
