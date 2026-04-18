/**
 * FAQ — accordion with cute/cozy treatment.
 *
 * Uses native `<details>` + `<summary>` so keyboard, screen-reader, and
 * no-JS users all get progressive expansion behavior for free. Each item:
 *   - Caveat italic question (22px).
 *   - Patrick Hand "+" / "×" toggle that flips on open.
 *   - Nunito body answer when open.
 * Dotted cocoa borders separate items.
 *
 * Ports the editorial `FAQ` structure from
 * `design-handoff/project/detail-components.jsx` L159–L175, restyled for
 * the scrapbook language.
 */

export type FAQItem = { q: string; a: string };

export type FAQProps = {
  items: readonly FAQItem[];
  className?: string;
};

export function FAQ({ items, className = "" }: FAQProps) {
  return (
    <div
      className={`mx-[22px] my-[14px] ${className}`}
      style={{
        // Dotted cocoa top + bottom frame.
        backgroundImage:
          "radial-gradient(rgba(92, 64, 51, 0.42) 1px, transparent 1px), radial-gradient(rgba(92, 64, 51, 0.42) 1px, transparent 1px)",
        backgroundSize: "6px 2px, 6px 2px",
        backgroundRepeat: "repeat-x, repeat-x",
        backgroundPosition: "top, bottom",
      }}
    >
      {items.map((item, i) => (
        <details
          key={`${item.q}-${i}`}
          className="faq-item group py-[14px]"
          style={{
            // Dotted cocoa rule between items (not above the first).
            backgroundImage:
              i === 0
                ? "none"
                : "radial-gradient(rgba(92, 64, 51, 0.32) 1px, transparent 1px)",
            backgroundSize: "6px 2px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "top",
          }}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-[14px]">
            <span className="font-display text-cocoa text-[22px] leading-[1.2] italic">
              {item.q}
            </span>
            <span
              aria-hidden="true"
              className="faq-toggle font-stamp text-tomato shrink-0 text-[24px] leading-none"
            >
              +
            </span>
          </summary>
          <p className="font-body text-ink-soft mt-[8px] mb-0 text-[14.5px] leading-[1.65]">
            {item.a}
          </p>
        </details>
      ))}
      {/* Flip the "+" to "×" when a <details> is open. Scoped to this block. */}
      <style>{`
        .faq-item[open] .faq-toggle::before { content: "\\00D7"; }
        .faq-item[open] .faq-toggle { visibility: hidden; position: relative; }
        .faq-item[open] .faq-toggle::before {
          visibility: visible; position: absolute; right: 0; top: 0;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
      `}</style>
    </div>
  );
}
