/**
 * ExperienceCard — one of the three "what we can do together" cards.
 *
 * Ports the prototype `.card` element (`design-prototypes/cute-cozy/index.html`
 * CSS L414–L505 + markup L812–L891). A single card per component — the
 * parent `Experiences.tsx` handles the alternating left/right layout, the
 * per-card tilts, and washi-tape color rotation.
 *
 * Slots:
 *   - Tilted `<Polaroid>` inside a rotatable wrapper.
 *   - `<WashiTape>` strip at the top of the card.
 *   - A blobby-border-radius "service tag" positioned on the photo corner.
 *   - Optional `<StickerBadge>` (currently used only for Cooking's "mom's favorite").
 *   - Patrick Hand kicker, Caveat H3 title at slight tilt, Nunito blurb, tomato CTA link.
 */

import { HandArrow } from "@/components/decoration/HandArrow";
import { Polaroid } from "@/components/decoration/Polaroid";
import { StickerBadge } from "@/components/decoration/StickerBadge";
import { SIZES } from "@/lib/image-sizes";
import { imageUrl } from "@/lib/images";

type TagColor = "peach" | "sage" | "sky";
type TapeColor = "peach" | "pink" | "sage" | "sky" | "butter";

export type ExperienceCardProps = {
  kicker: string;
  title: string;
  blurb: string;
  ctaLabel: string;
  href: string;
  imageId: string;
  imageCaption: string;
  stickerBadge?: string | null;
  /**
   * Index from the parent list — drives alternating tilt (odd=-2.5°, even=+2°).
   */
  index?: number;
  /** Tag color. Default "peach". */
  tagColor?: TagColor;
  /** Top washi-tape color. Default "sky". */
  tapeColor?: TapeColor;
};

const TAG_BG: Record<TagColor, string> = {
  peach: "var(--color-tape-peach)",
  sage: "var(--color-tape-sage)",
  sky: "var(--color-tape-sky)",
};

export function ExperienceCard({
  kicker,
  title,
  blurb,
  ctaLabel,
  href,
  imageId,
  imageCaption,
  stickerBadge,
  index = 0,
  tagColor = "peach",
  tapeColor = "sky",
}: ExperienceCardProps) {
  const isEven = index % 2 === 1;
  // Rotation roster from the prototype: -2.5°, +2°, -1.5°.
  const tilt = [-2.5, 2, -1.5][index % 3] ?? -2;
  const headingTilt = [-1.5, 1.5, -1][index % 3] ?? -1;

  return (
    <article
      className={`relative mt-[40px] mb-[10px] pt-1 pb-[24px] ${isEven ? "text-right" : "text-left"}`}
    >
      {/* Card washi tape — top. Alternates left (odd) / right (even). */}
      <span
        aria-hidden="true"
        className={`absolute -top-[10px] h-[18px] w-[60px] opacity-[0.88] shadow-[0_1px_2px_rgba(58,40,32,0.15)] ${
          isEven ? "right-[10%] rotate-[14deg]" : "left-[10%] -rotate-[12deg]"
        }`}
        style={{ background: `var(--color-tape-${tapeColor})` }}
      />

      {/* Blobby service tag — pinned over the photo corner. */}
      <span
        className={`font-stamp text-cocoa shadow-warm-soft absolute top-[-14px] z-[4] px-[14px] py-[8px] text-[13px] ${
          isEven ? "left-[-6px] -rotate-[10deg]" : "right-[-6px] rotate-[8deg]"
        }`}
        style={{
          background: TAG_BG[tagColor],
          borderRadius: "40% 60% 45% 55% / 50% 45% 55% 50%",
        }}
      >
        {kicker}
      </span>

      {/* Polaroid wrapper — 74% width, alternating horizontal alignment. */}
      <div
        className={`relative m-0 w-[74%] ${isEven ? "ml-auto" : ""}`}
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {stickerBadge && (
          <StickerBadge
            text={`${stickerBadge} ${stickerBadge}`}
            size={72}
            className="absolute top-[-20px] right-[-8px] z-[5] rotate-[12deg] drop-shadow-[0_3px_4px_rgba(58,40,32,0.25)]"
          />
        )}
        <Polaroid
          src={imageUrl(imageId)}
          alt={imageCaption}
          width={Math.round(420 * 0.74 - 24)}
          height={Math.round((420 * 0.74 - 24) * (4 / 5))}
          caption={imageCaption}
          className="w-full"
          sizes={SIZES.card}
        />
      </div>

      <h3
        className="font-display text-cocoa my-[14px] mt-[14px] mb-[6px] inline-block text-[32px] leading-[0.95]"
        style={{ transform: `rotate(${headingTilt}deg)` }}
      >
        {title}
      </h3>

      <p className="font-body text-ink-soft my-[6px] mb-[12px] text-[14.5px] leading-[1.6]">
        {blurb}
      </p>

      <a
        href={href}
        className={`font-stamp text-tomato inline-flex items-center gap-[6px] text-[15px] no-underline ${
          isEven ? "flex-row-reverse" : ""
        }`}
      >
        {ctaLabel}
        <HandArrow direction="right" length={38} className="h-[16px]" />
      </a>
    </article>
  );
}

export type { TagColor, TapeColor };
