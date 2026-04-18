/**
 * MeetEunjung — "a little bit about me" block with two overlapping polaroids.
 *
 * Ports the prototype `.meet` section (`design-prototypes/cute-cozy/index.html`
 * CSS L325–L407 + markup L755–L795):
 *   - Caveat section title, kicker chip, intro paragraphs.
 *   - Two overlapping polaroids (candid + kitchen), -4° / +3° tilts, with
 *     washi tape strips at the top.
 *   - Closes with an EunjungQuote pinned-note pull-quote.
 */

import { EunjungQuote } from "@/components/sections/EunjungQuote";
import { Polaroid } from "@/components/decoration/Polaroid";
import { WashiTape } from "@/components/decoration/WashiTape";
import { SIZES } from "@/lib/image-sizes";
import { imageUrl } from "@/lib/images";

export type MeetEunjungProps = {
  kicker: string;
  title: string;
  paragraphs: string[];
  pullQuote: string;
  pullQuoteSignoff: string;
  imageIds: string[];
};

export function MeetEunjung({
  kicker,
  title,
  paragraphs,
  pullQuote,
  pullQuoteSignoff,
  imageIds,
}: MeetEunjungProps) {
  const [idA, idB] = imageIds;

  return (
    <section>
      {/* Section head — butter kicker chip + Caveat H2. */}
      <div className="relative px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-butter font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          {kicker}
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[36px] leading-[1.05] font-bold">
          {title}
        </h2>
      </div>

      <div className="reveal px-[22px] pt-[4px] pb-[20px]">
        {paragraphs[0] && (
          <p className="font-body text-ink-soft my-[14px] text-[15px] leading-[1.65]">
            {paragraphs[0]}
          </p>
        )}

        {/* Two overlapping polaroids. */}
        <div className="relative my-[20px] flex justify-center gap-[8px]">
          {idA && (
            <div className="mt-[12px] -rotate-[4deg]">
              <Polaroid
                src={imageUrl(idA)}
                alt="Eunjung, candid"
                width={138}
                height={138}
                caption="mom & her kitchen"
                sizes={SIZES.thumb}
              >
                <WashiTape
                  color="sky"
                  tilt={-4}
                  className="-top-[10px] left-1/2 -translate-x-1/2"
                />
              </Polaroid>
            </div>
          )}
          {idB && (
            <div className="relative z-[3] -mt-[4px] rotate-[3deg]">
              <Polaroid
                src={imageUrl(idB)}
                alt="Cooking hands"
                width={138}
                height={138}
                caption="doenjang day"
                sizes={SIZES.thumb}
              >
                <WashiTape
                  color="pink"
                  tilt={8}
                  className="-top-[10px] left-1/2 -translate-x-1/2"
                />
              </Polaroid>
            </div>
          )}
        </div>

        {paragraphs.slice(1).map((p, i) => (
          <p key={i} className="font-body text-ink-soft my-[14px] text-[15px] leading-[1.65]">
            {p}
          </p>
        ))}

        <EunjungQuote quote={pullQuote} signoff={pullQuoteSignoff} />
      </div>
    </section>
  );
}
