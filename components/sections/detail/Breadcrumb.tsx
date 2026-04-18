/**
 * Breadcrumb — "← back home" link for detail-page tops.
 *
 * Small, tilted Patrick Hand caption with a hand-drawn SVG arrow pointing
 * left. Sits above the SubNav / DetailHero. Renders as a plain `<a>` so it
 * works as a server component on `/tours`, `/cooking`, `/stay`.
 *
 * Visual language per `docs/08-design-cute-cozy.md §4` — cute/cozy means the
 * affordance here is a hand-drawn mark, not a chevron rule.
 */

import Link from "next/link";

export type BreadcrumbProps = {
  /** Target URL. Default "/". */
  href?: string;
  /** Label text (appears after the arrow). Default "back home". */
  label?: string;
};

export function Breadcrumb({ href = "/", label = "back home" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="px-[22px] pt-[4px] pb-[2px]"
    >
      <Link
        href={href}
        className="font-stamp text-ink-soft inline-flex items-center gap-[6px] text-[12px] tracking-[0.06em] uppercase no-underline hover:text-cocoa"
      >
        {/* Hand-drawn leftward arrow. */}
        <svg
          aria-hidden="true"
          width="22"
          height="10"
          viewBox="0 0 22 10"
          fill="none"
          className="-rotate-[4deg]"
        >
          <path
            d="M20 5 Q 12 3, 4 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M7 2 L 3 5 L 7 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        {label}
      </Link>
    </nav>
  );
}
