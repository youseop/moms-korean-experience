/**
 * ScribbleDivider — a hand-drawn squiggly line used between sections.
 *
 * Ports the prototype `svg.divider` variants
 * (`design-prototypes/cute-cozy/index.html` L748–L752 plain, L797–L801 x,
 * L894–L897 short). Default is the plain wavy line; `variant="dot"`
 * adds a tomato center dot; `variant="x"` adds an X through the middle
 * like a handwritten cross-out.
 */

export type ScribbleDividerProps = {
  variant?: "plain" | "dot" | "x";
  /** Width as a CSS length. Default '80%'. */
  width?: string;
  /** Stroke color. Default cocoa. */
  color?: string;
  className?: string;
};

export function ScribbleDivider({
  variant = "plain",
  width = "80%",
  color = "#5C4033",
  className = "",
}: ScribbleDividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 22"
      fill="none"
      className={`mx-auto my-[28px] h-[22px] opacity-70 ${className}`}
      style={{ width }}
    >
      <path
        d="M4 12 Q 20 2 40 12 T 80 12 T 120 12 T 160 12 T 200 12 T 240 12 T 296 12"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {variant === "dot" && <circle cx="150" cy="12" r="3" fill="#E94B3C" />}
      {variant === "x" && (
        <path
          d="M146 6 L 154 18 M 154 6 L 146 18"
          stroke="#E94B3C"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
