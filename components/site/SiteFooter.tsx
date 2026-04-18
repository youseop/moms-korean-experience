/**
 * SiteFooter — small scrapbook footer at the bottom of every page.
 *
 * Kept simple for Task 3: brand wordmark, one warm one-liner, and a meta row
 * with copyright + credit. A single washi-tape flourish adds personality
 * without competing with the bigger FooterCta section that Task 6+ will bring
 * to the Home page.
 *
 * Server component (no "use client") — nothing interactive here.
 */
export function SiteFooter() {
  return (
    <footer className="relative px-[22px] pt-[28px] pb-[24px] text-center">
      {/* Washi-tape flourish — pink, top, slight rotation. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[6px] left-1/2 h-[18px] w-[74px] -translate-x-1/2 -rotate-[6deg] opacity-[0.88] shadow-[0_1px_2px_rgba(58,40,32,0.15)]"
        style={{ background: "var(--color-tape-pink)" }}
      />

      <div className="font-display text-cocoa mt-[22px] inline-block -rotate-2 text-[32px] leading-none">
        Eunjung&rsquo;s <span className="text-tomato">Table</span>
      </div>

      <p className="font-body text-ink-soft mx-auto mt-[14px] max-w-[280px] text-[14px] leading-[1.55]">
        A home in Jeongja-dong, Seongnam. Tours, cooking, and a quiet room with Eunjung.
      </p>

      <div
        className="font-stamp text-ink-soft mt-[22px] flex items-center justify-between text-[13px] tracking-[0.02em]"
        style={{
          /* Dotted cocoa seam along the top — matches the header's scrapbook stitch. */
          backgroundImage:
            "radial-gradient(rgba(92, 64, 51, 0.35) 1px, transparent 1px)",
          backgroundSize: "6px 2px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top",
          paddingTop: "14px",
        }}
      >
        <span>&copy; 2026 Eunjung&rsquo;s Table</span>
        <span>
          Made with{" "}
          <span aria-hidden="true" className="text-tomato">
            &hearts;
          </span>{" "}
          by Youseop
        </span>
      </div>
    </footer>
  );
}
