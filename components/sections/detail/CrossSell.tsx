/**
 * CrossSell — "while you're here..." bottom-of-page links.
 *
 * At the bottom of a detail page (before the inquiry section), shows the
 * OTHER two services as small cards linking to their detail pages. Reads
 * from `home.experiences` in `lib/content.ts` so there's one source of
 * truth for experience metadata.
 *
 * Each card: smaller polaroid (~120px) + Caveat title + Nunito blurb +
 * tomato arrow link.
 */

import { HandArrow } from "@/components/decoration/HandArrow";
import { Polaroid } from "@/components/decoration/Polaroid";
import { WashiTape } from "@/components/decoration/WashiTape";
import { home } from "@/lib/content";
import { SIZES } from "@/lib/image-sizes";
import { imageUrl } from "@/lib/images";

type WashiColor = "peach" | "pink" | "sage" | "sky" | "butter";
const TAPE_CYCLE: readonly WashiColor[] = ["sky", "butter", "peach"];

export type CrossSellProps = {
  /** Which service to exclude from the list (the current page). */
  excludeId: "tours" | "cooking" | "stay";
  className?: string;
};

export function CrossSell({ excludeId, className = "" }: CrossSellProps) {
  const others = home.experiences.filter((e) => e.id !== excludeId);

  return (
    <section
      className={`px-[22px] pt-[14px] pb-[20px] ${className}`}
      aria-label="Other experiences"
    >
      <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
        while you&rsquo;re here…
      </span>
      <h2 className="font-display text-cocoa mt-[4px] mb-[10px] text-[28px] leading-[1.05]">
        two other ways to hang out.
      </h2>

      <div>
        {others.map((o, i) => (
          <a
            key={o.id}
            href={o.href}
            className="relative my-[14px] flex items-start gap-[12px] no-underline"
          >
            <div
              className="relative shrink-0"
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 1.5}deg)` }}
            >
              <WashiTape
                color={TAPE_CYCLE[i % TAPE_CYCLE.length]}
                tilt={-10}
                width={40}
                height={12}
                className="-top-[6px] left-[8px]"
              />
              <Polaroid
                src={imageUrl(o.imageId)}
                alt={o.imageCaption}
                width={100}
                height={100}
                sizes={SIZES.thumb}
              />
            </div>

            <div className="flex-1 pt-[6px]">
              <h3 className="font-display text-cocoa m-0 text-[22px] leading-[1.1]">
                {o.title}
              </h3>
              <p className="font-body text-ink-soft mt-[4px] mb-0 text-[13px] leading-[1.5]">
                {o.blurb}
              </p>
              <span className="font-stamp text-tomato mt-[8px] inline-flex items-center gap-[6px] text-[13px]">
                {o.ctaLabel}
                <HandArrow direction="right" length={30} className="h-[14px]" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
