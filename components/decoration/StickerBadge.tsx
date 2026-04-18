/**
 * StickerBadge — a circular "sticker" with text on a curved path.
 *
 * Ports the prototype `.badge-fav` SVG
 * (`design-prototypes/cute-cozy/index.html` L841–L850): solid tomato disc
 * with a dashed white inner ring and label text laid along a circle via
 * `<textPath>`. Used on Experience cards ("★ mom's favorite ★") and
 * anywhere else a small stamp-style callout is wanted.
 *
 * Because `<textPath>` references a `<path id>`, each instance gets a
 * unique id via `useId` so multiple badges on the same page don't clash.
 */

import { useId } from "react";

export type StickerBadgeProps = {
  /** Text that wraps around the circle. Repeat it if you want full coverage. */
  text: string;
  /** Disc fill color. Default tomato. */
  color?: string;
  /** Outline + text ring color. Default cocoa. */
  outline?: string;
  /** Size in px. Default 82. */
  size?: number;
  className?: string;
};

export function StickerBadge({
  text,
  color = "#E94B3C",
  outline = "#5C4033",
  size = 82,
  className = "",
}: StickerBadgeProps) {
  const pathId = `sticker-path-${useId().replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <path id={pathId} d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
      </defs>
      <circle cx="50" cy="50" r="42" fill={color} stroke={outline} strokeWidth="2" />
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        strokeDasharray="3 3"
      />
      <text fontFamily="Patrick Hand, cursive" fontSize="11" fill="#fff" fontWeight="bold">
        <textPath href={`#${pathId}`} startOffset="5%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
