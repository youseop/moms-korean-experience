/**
 * DetailHero — shared hero block for Tours / Cooking / Stay pages.
 *
 * Structure (top-to-bottom):
 *   1. Patrick Hand uppercase kicker (tilted).
 *   2. Caveat title with a small inline tomato accent on the first word
 *      plus a ScribbleUnderline on a hand-picked key phrase (last noun
 *      phrase of the title) — or the whole title if it's short.
 *   3. Nunito lead paragraph.
 *   4. Tilted Polaroid with a WashiTape strip (caller chooses color) and
 *      optional caption.
 *
 * Keeping this a Server Component — no interactivity. The WashiTape color
 * lets callers tune per-page voice (peach for Tours, sky for Cooking, sage
 * for Stay).
 */

import { Polaroid } from "@/components/decoration/Polaroid";
import { ScribbleUnderline } from "@/components/decoration/ScribbleUnderline";
import { WashiTape } from "@/components/decoration/WashiTape";
import { SIZES } from "@/lib/image-sizes";
import { imageUrl } from "@/lib/images";

type WashiColor = "peach" | "pink" | "sage" | "sky" | "butter";

export type DetailHeroProps = {
  kicker: string;
  title: string;
  lead: string;
  imageId: string;
  imageCaption?: string;
  /**
   * Washi tape color on the polaroid. Defaults to `peach`.
   * Tours: peach · Cooking: sky · Stay: sage.
   */
  washiColor?: WashiColor;
};

export function DetailHero({
  kicker,
  title,
  lead,
  imageId,
  imageCaption,
  washiColor = "peach",
}: DetailHeroProps) {
  return (
    <section className="relative px-[22px] pt-[6px] pb-[28px]">
      {/* Kicker */}
      <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[13px] tracking-[0.1em] uppercase">
        {kicker}
      </span>

      {/* Title — render with a tomato accent on the first word and a
          scribble underline under the last 1–2 words. Falls back to the
          raw title when the split can't produce a reasonable accent. */}
      <h1 className="font-display text-cocoa relative mt-[8px] mb-[14px] text-[42px] leading-[0.98] font-bold -tracking-[0.01em]">
        <HeroTitle text={title} />
      </h1>

      {/* Lead */}
      <p className="reveal font-body text-ink-soft mb-[22px] max-w-[340px] text-[15px] leading-[1.6]">
        {lead}
      </p>

      {/* Polaroid */}
      <div className="relative mx-auto w-[260px] -rotate-3">
        <WashiTape
          color={washiColor}
          tilt={-14}
          width={90}
          height={22}
          className="-top-[14px] left-1/2 -translate-x-1/2"
        />
        <Polaroid
          src={imageUrl(imageId)}
          alt={imageCaption ?? title}
          width={236}
          height={295}
          caption={imageCaption}
          className="w-full"
          priority
          sizes={SIZES.hero}
        />
      </div>
    </section>
  );
}

/**
 * Render the title with a tomato accent on the first word and a scribble
 * underline under the trailing noun phrase. Best-effort — works when the
 * title has at least two words.
 */
function HeroTitle({ text }: { text: string }) {
  // Drop a trailing period for a tidier split, remember to re-append.
  const trimmed = text.replace(/\.$/, "");
  const hadPeriod = text !== trimmed;
  const words = trimmed.split(" ");
  if (words.length < 3) {
    return <>{text}</>;
  }
  const first = words[0];
  const middle = words.slice(1, -2).join(" ");
  const tail = words.slice(-2).join(" ");
  return (
    <>
      <span className="text-tomato inline-block -rotate-[1.5deg]">{first}</span>{" "}
      {middle ? <span>{middle} </span> : null}
      <ScribbleUnderline>
        <span>{tail}</span>
      </ScribbleUnderline>
      {hadPeriod ? "." : ""}
    </>
  );
}
