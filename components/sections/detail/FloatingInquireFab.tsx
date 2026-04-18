"use client";

/**
 * FloatingInquireFab — small floating "Ask Eunjung" pill at bottom-right.
 *
 * Appears after the visitor scrolls past the hero (~420px). Tap →
 * smooth-scroll to `#inquire`. Sits ABOVE the sticky SiteHeader (z-30) so
 * it's never covered, but BELOW the MobileNav drawer (z-50) so the drawer's
 * scrim properly covers the FAB while open.
 *
 * Client Component because it attaches a scroll listener. Respects the
 * `prefers-reduced-motion` media query via the global smooth-scroll rule
 * already in `app/globals.css`.
 */

import { useEffect, useState } from "react";

import { DoodleHeart } from "@/components/decoration/DoodleHeart";

// Below this scroll-Y, the FAB stays hidden.
const REVEAL_AT = 420;

export type FloatingInquireFabProps = {
  label?: string;
  /** Target anchor. Default "#inquire". */
  href?: string;
};

export function FloatingInquireFab({
  label = "Ask Eunjung",
  href = "#inquire",
}: FloatingInquireFabProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > REVEAL_AT);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      data-testid="floating-inquire-fab"
      aria-label={label}
      className={`fixed bottom-[18px] right-[18px] z-40 inline-flex items-center gap-[6px] rounded-full px-[14px] py-[9px] text-[15px] no-underline shadow-warm transition-all duration-200 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-[10px] pointer-events-none"
      }`}
      style={{
        background: "var(--color-tomato)",
        color: "#fff",
        fontFamily: "var(--font-display)",
        transform: visible ? "rotate(-2deg)" : "rotate(-2deg) translateY(10px)",
      }}
    >
      <span
        aria-hidden="true"
        className="floating-fab-heart inline-flex items-center justify-center"
      >
        <DoodleHeart size={14} color="#fff" fill="#fff" />
      </span>
      {label}
      {/* Gentle pulse on the heart. */}
      <style>{`
        @keyframes fabHeartPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.22); }
        }
        .floating-fab-heart { animation: fabHeartPulse 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .floating-fab-heart { animation: none; }
        }
      `}</style>
    </a>
  );
}
