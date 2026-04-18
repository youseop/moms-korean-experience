/**
 * Hero — top-of-page hero block.
 *
 * Ports the prototype `.hero` section (`design-prototypes/cute-cozy/index.html`
 * CSS L118–L277 + markup L685–L745). Structure:
 *   1. Scattered floater doodles (heart, stars, squiggle) absolutely positioned.
 *   2. Caveat "hi hi!" greeter, tilted -3°.
 *   3. Caveat 64px headline with a tomato-red span on the brand-voice word
 *      ("Eunjung") and a ScribbleUnderline under a key phrase ("stay with me").
 *   4. Nunito lead paragraph.
 *   5. Polaroid photo (4/5 aspect), -3° wrapper tilt, two WashiTape strips
 *      (peach top-left, sage top-right).
 *   6. CTA pill + hand-drawn arrow + "tap this!" Caveat label tilted.
 *
 * Renders as a server component (no interactivity). Copy comes from
 * `content/home.json → hero` via the `home` export in `lib/content.ts`.
 */

import { DoodleHeart } from "@/components/decoration/DoodleHeart";
import { DoodleStar } from "@/components/decoration/DoodleStar";
import { HandArrow } from "@/components/decoration/HandArrow";
import { Polaroid } from "@/components/decoration/Polaroid";
import { ScribbleUnderline } from "@/components/decoration/ScribbleUnderline";
import { WashiTape } from "@/components/decoration/WashiTape";
import { SIZES } from "@/lib/image-sizes";
import { imageUrl } from "@/lib/images";

export type HeroProps = {
  tagline: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageId: string;
  imageCaption: string;
  /** Optional small greeter line above the headline. Default "hi hi! it's me ~". */
  greeter?: string;
};

export function Hero({
  tagline,
  lead,
  primaryCta,
  secondaryCta,
  imageId,
  imageCaption,
  greeter = "hi hi! it's me ~",
}: HeroProps) {
  return (
    <section className="relative px-[22px] pt-[10px] pb-[36px]">
      {/* Floating doodles — scattered, absolutely positioned. */}
      <DoodleHeart
        size={34}
        fill="#FFD4B5"
        className="pointer-events-none absolute top-[36px] right-[28px] rotate-[14deg]"
      />
      <DoodleStar
        size={26}
        fill="#FFE8A3"
        className="pointer-events-none absolute top-[86px] right-[12px] -rotate-[8deg]"
      />
      <DoodleStar
        size={22}
        fill="#B5D5B5"
        className="pointer-events-none absolute top-[140px] left-[18px] rotate-[18deg]"
      />

      {/* Greeter */}
      <span className="font-display text-ink-soft mt-[6px] -mb-[4px] ml-[4px] inline-block -rotate-3 text-[22px]">
        {greeter}
      </span>

      {/* Headline — single tagline from content, with "Eunjung" in tomato +
          "Seoul" scribble-underlined. We split the tagline around "Eunjung"
          and "Seoul" so content/home.json stays a plain string. */}
      <h1 className="font-display text-cocoa relative mt-[4px] mb-[14px] text-[54px] leading-[0.95] font-bold -tracking-[0.01em]">
        <HeadlineWithAccents text={tagline} />
      </h1>

      {/* Lead */}
      <p className="reveal font-body text-ink-soft mb-[24px] max-w-[290px] text-[15px] leading-[1.55]">
        {lead}
      </p>

      {/* Polaroid + washi tapes. */}
      <div className="relative mx-auto w-[260px] -rotate-3">
        <WashiTape
          color="peach"
          tilt={-18}
          className="-top-[14px] -left-[10px]"
        />
        <WashiTape
          color="sage"
          tilt={22}
          className="-top-[10px] -right-[14px]"
        />
        <Polaroid
          src={imageUrl(imageId)}
          alt={imageCaption}
          width={236}
          height={295}
          caption={imageCaption}
          className="w-full"
          priority
          sizes={SIZES.hero}
        />
      </div>

      {/* CTA pill + drawn arrow + "tap this!" */}
      <div className="relative mt-[26px] mb-[4px] flex items-center gap-[10px]">
        <a href={primaryCta.href} className="cta-pill">
          <DoodleHeart size={16} color="#fff" fill="#fff" />
          {primaryCta.label}
        </a>
        <HandArrow direction="right" length={72} className="rotate-[6deg]" />
        <span className="font-display text-tomato absolute top-[-22px] left-[60px] -rotate-6 text-[20px]">
          tap this!
        </span>
      </div>

      {secondaryCta && (
        <div className="mt-[18px]">
          <a
            href={secondaryCta.href}
            className="font-stamp text-cocoa text-[15px] underline decoration-dotted decoration-tomato/70 underline-offset-4"
          >
            {secondaryCta.label}
          </a>
        </div>
      )}
    </section>
  );
}

/**
 * Render the tagline with typographic accents:
 *   - Any occurrence of "Eunjung" gets colored tomato and rotated -1.5°.
 *   - Any occurrence of "Seoul" gets a ScribbleUnderline.
 * Falls back cleanly if neither word appears — the whole string renders
 * as-is.
 */
function HeadlineWithAccents({ text }: { text: string }) {
  // Split on the two target words while keeping them in the output.
  const parts = text.split(/(Eunjung|Seoul)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p === "Eunjung") {
          return (
            <span key={i} className="text-tomato inline-block -rotate-[1.5deg]">
              {p}
            </span>
          );
        }
        if (p === "Seoul") {
          return (
            <ScribbleUnderline key={i}>
              <span>{p}</span>
            </ScribbleUnderline>
          );
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}
