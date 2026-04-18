/**
 * StickyNote — a yellow sticky-note container with a slight rotation.
 *
 * Ports the prototype `.note` element (`design-prototypes/cute-cozy/index.html`
 * CSS L579–L608 + markup L930–L933): butter background, -2° tilt, warm
 * shadow, Caveat body copy, sage washi tape top-center. Callers pass the
 * body copy as children and optionally a signoff span.
 *
 * Used for pull-quotes, asides, and form success states.
 */

import type { CSSProperties, ReactNode } from "react";

export type StickyNoteProps = {
  children: ReactNode;
  /** Tilt in degrees. Default -2 (matches prototype). */
  tilt?: number;
  /**
   * Whether to show the sage washi tape at the top-center.
   * Default true.
   */
  withTape?: boolean;
  /** Extra classes for the outer wrapper. */
  className?: string;
  style?: CSSProperties;
};

export function StickyNote({
  children,
  tilt = -2,
  withTape = true,
  className = "",
  style,
}: StickyNoteProps) {
  return (
    <div
      className={`relative shadow-warm font-display text-cocoa text-[24px] leading-[1.2] px-[18px] pt-[20px] pb-[22px] ${className}`}
      style={{
        background: "var(--color-tape-butter)",
        transform: `rotate(${tilt}deg)`,
        ...style,
      }}
    >
      {withTape && (
        <span
          aria-hidden="true"
          className="absolute -top-[12px] left-1/2 h-[22px] w-[80px] -translate-x-1/2 rotate-6 opacity-90 shadow-[0_1px_2px_rgba(58,40,32,0.15)]"
          style={{ background: "var(--color-tape-sage)" }}
        />
      )}
      {children}
    </div>
  );
}
