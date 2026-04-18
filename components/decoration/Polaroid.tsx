/**
 * Polaroid — photo frame decoration.
 *
 * Ports the prototype `.polaroid` element (`design-prototypes/cute-cozy/index.html`
 * CSS L174–L204 + markup L719–L728). White paper frame, warm shadow, handwritten
 * Caveat caption below the image. Optional tilt.
 *
 * Photography is still mock Unsplash (`lib/images.ts`). We render with
 * `next/image` so responsive variants + AVIF/WebP negotiation happen
 * automatically; the `.polaroid img` CSS rule in `app/globals.css` already
 * selects the native `<img>` tag that `next/image` emits.
 *
 * The `placeholder="blur"` path only activates when the caller opts in
 * (`priority` or `withBlur`). See `lib/blur.ts` — Unsplash URLs get a real
 * tiny-blurred preview; other sources fall back to a cream-paper SVG.
 */

import NextImage from "next/image";
import type { ReactNode } from "react";

import { getBlurDataURL } from "@/lib/blur";

export type PolaroidProps = {
  src: string;
  alt: string;
  /** Image area width in px (the visible photo, not the frame). */
  width: number;
  /** Image area height in px. */
  height: number;
  /** Optional handwritten caption printed below the image. */
  caption?: string;
  /** Tilt in degrees. Default 0. */
  tilt?: number;
  /**
   * Children render inside the frame, absolutely-positioned relative to it —
   * use this slot for washi tapes, stickers, push pins.
   */
  children?: ReactNode;
  /** Extra classes for the outer (tilted) wrapper. */
  className?: string;
  /**
   * Responsive `sizes` attribute for `next/image`. Defaults to the full-column
   * case — most polaroids span the `.page` interior (~380px). Callers with
   * unusual layouts (gallery halves, small thumbs) should pass their own.
   */
  sizes?: string;
  /**
   * Set on the above-the-fold hero photo of each page so `next/image`
   * preloads it and skips lazy-loading. Default `false`.
   */
  priority?: boolean;
  /**
   * Render a blur placeholder while the photo loads. Auto-enabled when
   * `priority` is set; opt in manually for other hero-ish photos. Default
   * `false` keeps things simple for small thumbs where blur adds noise.
   */
  withBlur?: boolean;
};

export function Polaroid({
  src,
  alt,
  width,
  height,
  caption,
  tilt = 0,
  children,
  className = "",
  sizes = "(min-width: 600px) 380px, 100vw",
  priority = false,
  withBlur = false,
}: PolaroidProps) {
  const useBlur = withBlur || priority;
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <div className="polaroid" style={{ width: `${width + 24}px` }}>
        {/* Image well — caller-controlled aspect via width × height. */}
        <div
          className="relative overflow-hidden"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className="h-full w-full object-cover"
            {...(useBlur
              ? { placeholder: "blur" as const, blurDataURL: getBlurDataURL(src) }
              : {})}
          />
        </div>
        {caption ? (
          <div className="font-display text-cocoa absolute right-0 bottom-[10px] left-0 text-center text-[20px] leading-none">
            {caption}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
