"use client";

/**
 * GalleryGrid — 2-column grid of polaroids with per-item rotation.
 *
 * Not in the cute/cozy prototype directly — derived per Task 5 §B.5 and
 * `docs/08-design-cute-cozy.md §4`. Single-column-like feeling on 420px
 * with a 2-column CSS grid; each polaroid uses its own `rotate` value
 * from the JSON so the grid looks hand-laid.
 *
 * Tapping a polaroid opens the `Lightbox`. State lives here; the Lightbox
 * itself is dumb.
 */

import { useState } from "react";

import { Polaroid } from "@/components/decoration/Polaroid";
import { WashiTape } from "@/components/decoration/WashiTape";
import { Lightbox } from "@/components/sections/Lightbox";
import { imageUrl } from "@/lib/images";
import type { Home } from "@/lib/content";

export type GalleryGridProps = {
  kicker: string;
  title: string;
  caption: string;
  items: Home["gallery"]["items"];
};

const TAPES = ["peach", "sage", "sky", "pink", "butter"] as const;

export function GalleryGrid({ kicker, title, caption, items }: GalleryGridProps) {
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const [openAlt, setOpenAlt] = useState<string>("");

  return (
    <section>
      <div className="relative px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-pink font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          {kicker}
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[38px] leading-[1.05] font-bold">
          {title}
        </h2>
        <p className="font-body text-ink-soft mt-[8px] text-[14px] leading-[1.55]">{caption}</p>
      </div>

      <div className="grid grid-cols-2 gap-[14px] px-[22px] pt-[16px] pb-[10px]">
        {items.map((item, i) => {
          const src = imageUrl(item.imageId);
          return (
            <button
              key={item.imageId}
              type="button"
              onClick={() => {
                setOpenSrc(src);
                setOpenAlt(item.alt);
              }}
              className="block appearance-none border-0 bg-transparent p-0 text-left"
              aria-label={`Open photo: ${item.alt}`}
              style={{ transform: `rotate(${item.rotate}deg)` }}
            >
              <Polaroid src={src} alt={item.alt} width={150} height={150}>
                <WashiTape
                  color={TAPES[i % TAPES.length]}
                  tilt={i % 2 === 0 ? -6 : 8}
                  width={54}
                  height={16}
                  className="-top-[8px] left-1/2 -translate-x-1/2"
                />
              </Polaroid>
            </button>
          );
        })}
      </div>

      <Lightbox
        src={openSrc}
        alt={openAlt}
        onClose={() => {
          setOpenSrc(null);
          setOpenAlt("");
        }}
      />
    </section>
  );
}
