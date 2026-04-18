/**
 * WashiTape — a short decorative tape strip with a faint inner stripe texture.
 *
 * Ports the prototype `.washi` element (`design-prototypes/cute-cozy/index.html`
 * CSS L207–L230). The inner `::before` stripe pattern is attached via the
 * `.washi` utility in `app/globals.css` — passing `className="washi"` here
 * gets that treatment for free.
 *
 * Positioning is the caller's job: pass absolute utilities + offsets in
 * `className`. Tilt and color are handled via props. The tape is semi-
 * transparent (opacity ~0.88) to feel like actual paper tape layered on the
 * page.
 */

type WashiColor = "peach" | "pink" | "sage" | "sky" | "butter";

const TAPE_COLORS: Record<WashiColor, string> = {
  peach: "var(--color-tape-peach)",
  pink: "var(--color-tape-pink)",
  sage: "var(--color-tape-sage)",
  sky: "var(--color-tape-sky)",
  butter: "var(--color-tape-butter)",
};

export type WashiTapeProps = {
  color?: WashiColor;
  /** Tilt in degrees. Default 0. */
  tilt?: number;
  /** Width in px. Default 74 (matches prototype). */
  width?: number;
  /** Height in px. Default 22. */
  height?: number;
  /**
   * Extra classes — primarily for absolute positioning
   * (e.g. `absolute -top-3 left-4`).
   */
  className?: string;
};

export function WashiTape({
  color = "peach",
  tilt = 0,
  width = 74,
  height = 22,
  className = "",
}: WashiTapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`washi ${className}`}
      style={{
        background: TAPE_COLORS[color],
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${tilt}deg)`,
      }}
    />
  );
}
