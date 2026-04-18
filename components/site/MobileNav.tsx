"use client";

/**
 * MobileNav — right-slide drawer triggered by SiteHeader's "menu" button.
 *
 * Cute/cozy language: large Caveat handwritten links, dotted cocoa separators,
 * one rotated washi-tape strip for personality, a Patrick Hand footer line.
 *
 * Mechanics (mirrored from `design-handoff/project/components.jsx` Drawer):
 *   - right-slide panel (translate-x)
 *   - scrim overlay that closes on click
 *   - Escape key closes
 *   - clicking any nav link closes
 *   - focus moves to close-button on open
 *   - body scroll locked while open
 */
import Link from "next/link";
import { type RefObject, useEffect, useRef } from "react";

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  /** Ref to the trigger button in SiteHeader, so focus can return on close. */
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/cooking", label: "Cooking" },
  { href: "/stay", label: "Stay" },
  { href: "/#inquire", label: "Inquire" },
] as const;

export function MobileNav({ open, onClose, returnFocusRef }: MobileNavProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Escape to close + body scroll lock + focus management.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button on open.
    closeBtnRef.current?.focus();

    // Capture the trigger element at effect time so cleanup doesn't rely on
    // a possibly-stale ref.current.
    const triggerEl = returnFocusRef?.current ?? null;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // Return focus to the trigger.
      triggerEl?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#5C4033]/35 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Right-slide panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`bg-paper-cream absolute top-0 right-0 flex h-full w-[88%] max-w-[380px] flex-col shadow-[0_0_40px_rgba(58,40,32,0.25)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end px-[22px] pt-[18px] pb-[6px]">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="font-stamp text-cocoa inline-flex items-center gap-[6px] rounded-full border-2 border-dashed border-[#5C4033]/30 px-[14px] py-[6px] text-[14px] tracking-[0.02em] transition-colors hover:border-[#5C4033]/60"
            aria-label="Close menu"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="size-[14px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M4 4 L 16 16 M 16 4 L 4 16" />
            </svg>
            close
          </button>
        </div>

        {/* Nav links — large Caveat handwritten list with dotted cocoa separators. */}
        <nav className="flex flex-1 flex-col px-[28px] pt-[14px]">
          {NAV_LINKS.map((link, i) => (
            <div key={link.href} className="relative">
              {/* Washi-tape flourish on the second link for personality. */}
              {i === 1 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-[6px] left-[58px] h-[16px] w-[52px] -rotate-[14deg] opacity-[0.88] shadow-[0_1px_2px_rgba(58,40,32,0.15)]"
                  style={{ background: "var(--color-tape-peach)" }}
                />
              ) : null}
              <Link
                href={link.href}
                onClick={onClose}
                className="font-display text-cocoa hover:text-tomato relative block py-[10px] text-[34px] leading-[1] -tracking-[0.01em] transition-colors"
              >
                {link.label}
              </Link>
              {/* Dotted cocoa separator */}
              <div
                aria-hidden="true"
                className="h-[2px] w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(92, 64, 51, 0.35) 1px, transparent 1px)",
                  backgroundSize: "6px 2px",
                  backgroundRepeat: "repeat-x",
                }}
              />
            </div>
          ))}
        </nav>

        {/* Drawer footer — brand + place/year in muted Patrick Hand. */}
        <div className="px-[28px] pt-[18px] pb-[28px]">
          <div className="font-display text-cocoa text-[26px] leading-none -rotate-2">
            Eunjung&rsquo;s <span className="text-tomato">Table</span>
          </div>
          <div className="font-stamp text-ink-soft mt-[6px] text-[13px] tracking-[0.02em]">
            Jeongja-dong, Seongnam &middot; Est. 2026
          </div>
        </div>
      </aside>
    </div>
  );
}
