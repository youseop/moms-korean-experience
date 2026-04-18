/**
 * DoodleStar — 5-point hand-drawn star SVG.
 *
 * Ports the prototype hero star-floaters
 * (`design-prototypes/cute-cozy/index.html` SVG L692–L699). Same rough path,
 * handled as one component with variable fill/stroke.
 */

export type DoodleStarProps = {
  /** Stroke color. Default cocoa. */
  color?: string;
  /** Fill color. Default butter yellow (matches prototype star-1). */
  fill?: string;
  /** Size in px. Default 22. */
  size?: number;
  className?: string;
};

export function DoodleStar({
  color = "#5C4033",
  fill = "#FFE8A3",
  size = 22,
  className = "",
}: DoodleStarProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 30 30"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <path
        d="M15 3 L17 12 L26 13 L19 19 L21 28 L15 23 L9 28 L11 19 L4 13 L13 12 Z"
        stroke={color}
        strokeWidth="1.8"
        fill={fill}
        strokeLinejoin="round"
      />
    </svg>
  );
}
