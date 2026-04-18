/**
 * WhyJeongja — kicker + Caveat title + Nunito body + 4-item transit grid.
 *
 * Not directly in the prototype; designed per `docs/08-design-cute-cozy.md §4`.
 * Transit items render as tiny polaroid-style cards — white paper, warm
 * shadow, slight rotation.
 */

import type { Home } from "@/lib/content";

export type WhyJeongjaProps = Home["whyJeongja"];

export function WhyJeongja({ kicker, title, body, transit }: WhyJeongjaProps) {
  return (
    <section>
      <div className="relative px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-sky font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          {kicker}
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[36px] leading-[1.05] font-bold">
          {title}
        </h2>
      </div>

      <div className="px-[22px] pt-[6px] pb-[24px]">
        <p className="font-body text-ink-soft my-[14px] text-[15px] leading-[1.65]">{body}</p>

        <div className="mt-[18px] grid grid-cols-2 gap-[12px]">
          {transit.map((t, i) => (
            <div
              key={t.place}
              className="bg-[#fffdf7] border border-dashed border-cocoa/20 px-[10px] py-[12px] shadow-warm-soft text-center"
              style={{ transform: `rotate(${i % 2 === 0 ? -1.2 : 0.9}deg)` }}
            >
              <div className="font-stamp text-ink-soft text-[12px] tracking-[0.02em]">{t.place}</div>
              <div className="font-display text-cocoa mt-[2px] text-[22px] leading-[1]">
                {t.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
