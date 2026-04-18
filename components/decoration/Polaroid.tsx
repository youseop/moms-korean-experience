/**
 * Polaroid — photo frame decoration.
 *
 * Ports the prototype `.polaroid` element (`design-prototypes/cute-cozy/index.html`
 * CSS L174–L204 + markup L719–L728). White paper frame, warm shadow, handwritten
 * Caveat caption below the image. Optional tilt.
 *
 * Photography: the prototype uses Unsplash placeholders; so do we for now
 * (see `lib/images.ts`). We render with a raw `<img>` so the remote
 * placeholders don't require Next.js image-loader config for every new id
 * while photography is still being shot — when real `public/images/*.webp`
 * files land, swap this to `next/image` in one place.
 */

import type { ReactNode } from "react";

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
}: PolaroidProps) {
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="h-full w-full object-cover" />
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
