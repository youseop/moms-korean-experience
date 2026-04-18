"use client";

/**
 * SiteHeader — sticky topbar inside the .page column.
 *
 * Mirrors the prototype topbar (`design-prototypes/cute-cozy/index.html` L89–L116,
 * markup L679–L682): Caveat wordmark tilted -2deg with "Table" in tomato, and a
 * dashed-border Patrick Hand "menu" button. Adds sticky positioning, a cream
 * translucent backdrop, and a dotted-cocoa bottom border for a scrapbook seam.
 *
 * Owns the MobileNav open/close state so SiteFooter / layout don't have to.
 */
import { useRef, useState } from "react";
import Link from "next/link";

import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <header
        className="bg-paper-cream/85 sticky top-0 z-30 flex items-center justify-between px-[22px] pt-[18px] pb-[10px] backdrop-blur-[6px]"
        // Dotted cocoa seam along the bottom — scrapbook-y stitch rather than a hard rule.
        style={{
          backgroundImage:
            "radial-gradient(rgba(92, 64, 51, 0.35) 1px, transparent 1px)",
          backgroundSize: "6px 2px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
        }}
      >
        <Link
          href="/"
          className="font-display text-cocoa inline-block -rotate-2 text-[26px] leading-none no-underline"
        >
          Eunjung&rsquo;s <span className="text-tomato">Table</span>
        </Link>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          className="font-stamp text-ink-soft inline-flex items-center gap-[6px] rounded-full border-2 border-dashed border-[#6B4E3D]/70 px-[12px] py-[4px] text-[13px] tracking-[0.02em] rotate-6 transition-colors hover:text-cocoa hover:border-[#5C4033]"
        >
          menu
          <svg
            aria-hidden="true"
            viewBox="0 0 14 10"
            className="h-[10px] w-[14px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 5 Q 7 1 12 5" />
            <path d="M9 2 L 12 5 L 9 8" />
          </svg>
        </button>
      </header>

      <div id="site-mobile-nav">
        <MobileNav open={open} onClose={() => setOpen(false)} returnFocusRef={triggerRef} />
      </div>
    </>
  );
}
