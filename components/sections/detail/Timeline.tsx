/**
 * Timeline — numbered steps for "how it works" / "what to expect".
 *
 * Each item: optional Patrick Hand `time` eyebrow, big Caveat "01"-style
 * numeral in tomato, Caveat title, Nunito body. Items are separated by a
 * dotted cocoa rule that reads as a handmade stitch.
 *
 * Ports the editorial `Timeline` structure from
 * `design-handoff/project/detail-components.jsx` L31–L55, but rendered
 * in cute/cozy type + color.
 */

export type TimelineItem = {
  title: string;
  body: string;
  /** Optional small Patrick Hand eyebrow above the title (e.g. "morning"). */
  time?: string;
};

export type TimelineProps = {
  items: readonly TimelineItem[];
  className?: string;
};

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <ol className={`mx-[22px] my-[6px] list-none p-0 ${className}`}>
      {items.map((item, i) => {
        const n = String(i + 1).padStart(2, "0");
        return (
          <li
            key={`${item.title}-${i}`}
            className="relative py-[20px]"
            style={{
              // Dotted cocoa separator between steps.
              backgroundImage:
                i === 0
                  ? "none"
                  : "radial-gradient(rgba(92, 64, 51, 0.42) 1px, transparent 1px)",
              backgroundSize: "6px 2px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "top",
            }}
          >
            <div className="flex items-start gap-[14px]">
              <span
                aria-hidden="true"
                className="font-display text-tomato shrink-0 text-[44px] leading-[0.9] -rotate-[6deg]"
              >
                {n}
              </span>
              <div className="flex-1 pt-[4px]">
                {item.time && (
                  <div className="font-stamp text-ink-soft mb-[2px] text-[11px] tracking-[0.1em] uppercase">
                    {item.time}
                  </div>
                )}
                <h3 className="font-display text-cocoa m-0 text-[24px] leading-[1.1]">
                  {item.title}
                </h3>
                <p className="font-body text-ink-soft mt-[6px] mb-0 text-[14.5px] leading-[1.6]">
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
