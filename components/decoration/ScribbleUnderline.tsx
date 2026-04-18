/**
 * ScribbleUnderline — wraps inline text with a hand-drawn wavy underline.
 *
 * Ports the prototype `.hero h1 .underline::after` pattern
 * (`design-prototypes/cute-cozy/index.html` L149–L161). The underline itself
 * is an inline SVG rendered beneath the text via absolute positioning — no
 * pseudo-element, so the component can be reused anywhere and styled per-
 * instance.
 *
 * Default stroke color is `--color-tomato`; override via `color` for
 * accent underlines in other hues.
 */

import type { ReactNode } from "react";

export type ScribbleUnderlineProps = {
  children: ReactNode;
  /** Stroke color (CSS color string). Default tomato red. */
  color?: string;
  /** Stroke thickness. Default 2.4. */
  strokeWidth?: number;
  /** Extra classes for the outer wrapper. */
  className?: string;
};

export function ScribbleUnderline({
  children,
  color = "#E94B3C",
  strokeWidth = 2.4,
  className = "",
}: ScribbleUnderlineProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-[1]">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        className="absolute -right-[4px] -bottom-[6px] -left-[4px] block h-[10px] w-[calc(100%+8px)]"
        fill="none"
      >
        <path
          d="M2 6 Q 20 1 40 5 T 80 5 T 120 5 T 160 5 T 198 5"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
