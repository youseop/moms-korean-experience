/**
 * PushPin — a small red SVG pin used to "pin" pull-quotes to the page.
 *
 * Ports the prototype `.pullquote .pin` SVG
 * (`design-prototypes/cute-cozy/index.html` L788–L791) verbatim: a tomato
 * disc with a cocoa outline and a white highlight dot for the plastic-
 * pin-head look.
 */

export type PushPinProps = {
  /** Pin body color. Default tomato. */
  color?: string;
  /** Outline color. Default cocoa. */
  outline?: string;
  /** Size in px. Default 20. */
  size?: number;
  className?: string;
};

export function PushPin({
  color = "#E94B3C",
  outline = "#5C4033",
  size = 20,
  className = "",
}: PushPinProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className={className}
    >
      <circle cx="10" cy="10" r="6" fill={color} stroke={outline} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="1.6" fill="#fff" />
    </svg>
  );
}
