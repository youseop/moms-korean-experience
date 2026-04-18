"use client";

/**
 * SubNav — sticky horizontal pill list at the top of detail pages.
 *
 * Sits under the SiteHeader and lets the reader jump between the page's
 * sections (e.g. concept · places · how it works · reviews · inquire).
 * Horizontally scrollable on mobile so 5+ pills don't get cramped in the
 * 420px column.
 *
 * Client Component because it uses `IntersectionObserver` to highlight
 * whichever section is currently on screen. On tap, it smooth-scrolls to
 * the matching anchor — the CSS `html { scroll-behavior: smooth }` from
 * `app/globals.css` carries this for free, we just offset the scroll so
 * the section title isn't hidden behind the sticky header + subnav.
 */

import { useEffect, useRef, useState } from "react";

export type SubNavItem = { id: string; label: string };

export type SubNavProps = {
  items: readonly SubNavItem[];
  /**
   * Approximate offset in px from the top of the viewport where the
   * section is considered "active". Accounts for the sticky SiteHeader
   * + this subnav itself. Default 140.
   */
  activeOffset?: number;
};

// Height of the sticky SiteHeader (approx) + the subnav's own height.
// Used to offset the scroll target so the section title is visible.
const SCROLL_OFFSET = 110;

export function SubNav({ items, activeOffset = 140 }: SubNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    // Pick the section whose top is just above `activeOffset`, preferring
    // the deepest such section (scroll-position-wise).
    function updateActive() {
      let best = items[0].id;
      let bestTop = -Infinity;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= activeOffset && top > bestTop) {
          best = id;
          bestTop = top;
        }
      }
      setActive(best);
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [items, activeOffset]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActive(id);
  }

  return (
    <nav
      ref={navRef}
      aria-label="On this page"
      className="bg-paper-cream/92 sticky top-[52px] z-20 -mx-[22px] overflow-x-auto px-[22px] py-[8px] backdrop-blur-[6px]"
      style={{
        // Dotted cocoa bottom seam — matches SiteHeader.
        backgroundImage:
          "radial-gradient(rgba(92, 64, 51, 0.3) 1px, transparent 1px)",
        backgroundSize: "6px 2px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "bottom",
      }}
    >
      <ul className="flex list-none items-center gap-[8px] m-0 p-0 whitespace-nowrap">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`font-stamp inline-block rounded-full border border-dashed px-[12px] py-[4px] text-[12px] tracking-[0.02em] no-underline transition-colors ${
                  isActive
                    ? "bg-tomato border-tomato text-white shadow-warm-soft"
                    : "border-cocoa/35 text-cocoa hover:border-cocoa"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
