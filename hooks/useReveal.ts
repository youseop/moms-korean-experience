"use client";

import { useEffect } from "react";

/**
 * Adds `is-visible` to all `.reveal` elements as they enter the viewport.
 *
 * Ported from the editorial design-handoff pattern
 * (`design-handoff/project/components.jsx` `useRevealObserver`).
 *
 * Reveal system contract:
 *   - `.reveal` elements are visible by default (via CSS).
 *   - `is-visible` is added ONE TIME when the element scrolls into view,
 *     triggering a decorative rise animation.
 *   - If JS fails or the observer never fires, the content still displays —
 *     the animation is pure polish on top.
 *   - Respects `prefers-reduced-motion` via the CSS rule in `app/globals.css`
 *     (the observer still runs, but the animation is suppressed).
 */
export function useReveal(deps: React.DependencyList = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px 10% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
