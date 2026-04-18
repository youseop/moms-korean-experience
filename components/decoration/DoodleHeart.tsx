/**
 * DoodleHeart — a small hand-drawn heart SVG.
 *
 * Ports the prototype cordate heart path
 * (`design-prototypes/cute-cozy/index.html` L688–L691, L733–L735, L906–L909).
 * The same path is reused for the hero floater, the CTA-pill icon, and
 * the bouncing Maru heart — this component centralizes it.
 *
 * Pass `filled` to tune the fill vs. outline look. Default is filled tomato
 * with a darker outline, matching the Maru heart.
 */

export type DoodleHeartProps = {
  /** Stroke color. Default tomato. */
  color?: string;
  /** Fill color. Default same as stroke (solid heart). */
  fill?: string;
  /** Square size in px. Default 20. */
  size?: number;
  /** Extra classes. */
  className?: string;
};

export function DoodleHeart({
  color = "#E94B3C",
  fill,
  size = 20,
  className = "",
}: DoodleHeartProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 36"
      width={size}
      height={Math.round(size * (36 / 40))}
      fill="none"
      className={className}
    >
      <path
        d="M20 32 C 6 22, 2 14, 8 8 C 13 3, 18 6, 20 10 C 22 6, 27 3, 32 8 C 38 14, 34 22, 20 32 Z"
        stroke={color}
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill={fill ?? color}
      />
    </svg>
  );
}
