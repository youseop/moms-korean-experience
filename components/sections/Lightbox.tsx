"use client";

/**
 * Lightbox — minimal full-screen image viewer.
 *
 * Uses the native HTML `<dialog>` element in modal mode so we get:
 *   - focus trap + Escape-to-close for free,
 *   - a proper backdrop (`::backdrop`) without stacking-context tricks,
 *   - accessibility (it's a real modal dialog to screen readers).
 *
 * The parent drives open-state via the `src` prop: any non-null value
 * opens the dialog; `null` closes it. The consumer handles its own
 * "which image is open" state — this component is dumb.
 *
 * Not in the prototype — generated per spec (Task 5 §B.6).
 */

import Image from "next/image";
import { useEffect, useRef } from "react";

import { IMG, SIZES } from "@/lib/image-sizes";

export type LightboxProps = {
  src: string | null;
  alt?: string;
  onClose: () => void;
};

export function Lightbox({ src, alt = "", onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (src && !el.open) el.showModal();
    if (!src && el.open) el.close();
  }, [src]);

  // Lock body scroll while the lightbox is open. Native `<dialog>` traps
  // focus and listens for Escape for us, but doesn't prevent the page
  // behind the backdrop from scrolling on iOS Safari. Toggle `overflow`
  // on the body so the page underneath stays put.
  useEffect(() => {
    if (!src) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [src]);

  return (
    <dialog
      ref={ref}
      className="bg-transparent p-0 backdrop:bg-[rgba(20,12,8,0.85)]"
      onClose={onClose}
      onClick={(e) => {
        // Click outside the image (on the backdrop) closes.
        if (e.target === ref.current) onClose();
      }}
    >
      {src && (
        <div className="polaroid max-h-[90vh] max-w-[90vw] -rotate-2">
          <div className="max-h-[calc(90vh-60px)] max-w-[calc(90vw-24px)] overflow-hidden">
            <Image
              src={src}
              alt={alt}
              // Gallery sources are square (IMG.galleryThumb 800x800); the
              // intrinsic ratio is only used for layout prediction — the
              // CSS max-w/max-h + object-contain handle any real aspect.
              width={IMG.galleryThumb.width}
              height={IMG.galleryThumb.height}
              sizes={SIZES.full}
              className="block h-auto max-h-[calc(90vh-60px)] w-auto max-w-[calc(90vw-24px)] object-contain"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="font-stamp text-cocoa absolute right-[12px] bottom-[12px] text-[14px] underline decoration-tomato/70"
          >
            close
          </button>
        </div>
      )}
    </dialog>
  );
}
