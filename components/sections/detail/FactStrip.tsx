/**
 * FactStrip — 2-column key-value facts for detail pages.
 *
 * Small band of "duration / group size / meeting point / bring" style
 * facts. Dotted cocoa borders top and bottom frame it as a page-width
 * strip. Each fact: tiny Patrick Hand uppercase key + Caveat italic value.
 *
 * Not in the cute/cozy prototype — designed per the detail-page workstream
 * in `docs/03-dev-plan.md`.
 */

export type Fact = { k: string; v: string };

export type FactStripProps = {
  facts: readonly Fact[];
  className?: string;
};

export function FactStrip({ facts, className = "" }: FactStripProps) {
  return (
    <dl
      className={`mx-[22px] my-[18px] grid grid-cols-2 gap-x-[16px] gap-y-[12px] py-[14px] ${className}`}
      style={{
        // Dotted cocoa rule top + bottom. The line is drawn via a
        // repeating-radial-gradient so it reads as handmade dots, not a
        // solid 1px border.
        backgroundImage:
          "radial-gradient(rgba(92, 64, 51, 0.42) 1px, transparent 1px), radial-gradient(rgba(92, 64, 51, 0.42) 1px, transparent 1px)",
        backgroundSize: "6px 2px, 6px 2px",
        backgroundRepeat: "repeat-x, repeat-x",
        backgroundPosition: "top, bottom",
      }}
    >
      {facts.map((f, i) => (
        <div key={`${f.k}-${i}`} className="flex flex-col">
          <dt className="font-stamp text-ink-soft text-[11px] tracking-[0.12em] uppercase">
            {f.k}
          </dt>
          <dd className="font-display text-cocoa mt-[2px] text-[22px] leading-[1.1] italic">
            {f.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
