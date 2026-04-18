/**
 * PlaceCard — one "mom's favorite place" card.
 *
 * Stackable — designed so 6–8 of these can flow vertically in the 420px
 * page without feeling heavy. Each card has:
 *   - Small tilted Polaroid (~180px wide) on the left.
 *   - WashiTape strip corner — color rotates through per index when the
 *     parent (`PlacesGrid`) passes a `tapeColor` prop.
 *   - Patrick Hand pin-number badge in the top-left (corresponds to
 *     HandDrawnMap pin numbers).
 *   - Caveat name + italic neighborhood + Nunito blurb on the right.
 */

import { Polaroid } from "@/components/decoration/Polaroid";
import { WashiTape } from "@/components/decoration/WashiTape";
import { SIZES } from "@/lib/image-sizes";
import { imageUrl } from "@/lib/images";

type WashiColor = "peach" | "pink" | "sage" | "sky" | "butter";

export type PlaceCardProps = {
  name: string;
  neighborhood: string;
  blurb: string;
  imageId: string;
  /** 1-based pin number displayed as a badge on the polaroid. */
  pinNumber?: number;
  /** Washi tape color. Default "peach". */
  tapeColor?: WashiColor;
  /** Tilt direction — pass index from parent for alternation. */
  index?: number;
};

export function PlaceCard({
  name,
  neighborhood,
  blurb,
  imageId,
  pinNumber,
  tapeColor = "peach",
  index = 0,
}: PlaceCardProps) {
  const tilt = index % 2 === 0 ? -2 : 1.6;

  return (
    <article
      className="reveal relative my-[16px] flex items-start gap-[12px] px-[2px]"
    >
      {/* Polaroid with pin number badge. */}
      <div
        className="relative shrink-0"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <WashiTape
          color={tapeColor}
          tilt={-10}
          width={48}
          height={14}
          className="-top-[8px] left-[10px]"
        />
        <Polaroid
          src={imageUrl(imageId)}
          alt={name}
          width={124}
          height={124}
          sizes={SIZES.thumb}
        />
        {pinNumber !== undefined && (
          <span
            className="font-stamp absolute -top-[6px] -left-[6px] z-[3] inline-flex h-[24px] w-[24px] items-center justify-center rounded-full text-[12px] font-bold text-white shadow-warm-soft"
            style={{
              background: "var(--color-tomato)",
              transform: "rotate(-8deg)",
            }}
            aria-hidden="true"
          >
            {pinNumber}
          </span>
        )}
      </div>

      {/* Text block. */}
      <div className="flex-1 pt-[4px]">
        <h3 className="font-display text-cocoa m-0 inline-block -rotate-[0.8deg] text-[22px] leading-[1.15]">
          {name}
        </h3>
        <div className="font-display text-ink-soft mt-[2px] text-[16px] leading-[1.1] italic">
          {neighborhood}
        </div>
        <p className="font-body text-ink-soft mt-[6px] mb-0 text-[13.5px] leading-[1.55]">
          {blurb}
        </p>
      </div>
    </article>
  );
}
