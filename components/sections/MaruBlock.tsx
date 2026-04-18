/**
 * MaruBlock — "oh — and meet Maru" block.
 *
 * Ports the prototype `.maru` section (`design-prototypes/cute-cozy/index.html`
 * CSS L508–L576 + markup L899–L927):
 *   - Torn-paper top edge.
 *   - 150px polaroid (-4°) with a pink washi tape top-center + "Maru (the boss)" caption.
 *   - Text column: Caveat name, Patrick Hand meta line, Nunito body,
 *     Patrick Hand tomato allergy-note.
 *   - Bouncing DoodleHeart in the top-right corner.
 *
 * The heart uses a CSS `animate-[bounce]` — Tailwind's default `animate-bounce`
 * isn't quite right (too slow, too tall), so we ship a scoped inline keyframe
 * via a `style` block in the MaruBlock itself to match the prototype feel.
 */

import { DoodleHeart } from "@/components/decoration/DoodleHeart";
import { Polaroid } from "@/components/decoration/Polaroid";
import { TornPaperTop } from "@/components/decoration/TornPaperTop";
import { WashiTape } from "@/components/decoration/WashiTape";
import { imageUrl } from "@/lib/images";
import type { Home } from "@/lib/content";

export type MaruBlockProps = Home["maru"];

export function MaruBlock({ kicker, name, caption, allergyNote, imageId }: MaruBlockProps) {
  return (
    <section>
      {/* Section head — pink kicker chip for this block. */}
      <div className="relative px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-pink font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          {kicker}
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[36px] leading-[1.05] font-bold">
          oh &mdash; and meet <em className="text-tomato not-italic">{name}</em>
        </h2>
      </div>

      <div
        className="relative mx-[22px] my-[20px] rounded-[14px] px-[18px] pt-[26px] pb-[22px] shadow-warm-soft"
        style={{ background: "#fffdf3", transform: "rotate(0.6deg)" }}
      >
        {/* Torn paper edge — absolutely pinned above the card. */}
        <TornPaperTop color="#fffdf3" className="absolute -top-[8px] left-0 right-0" />

        {/* Bouncing heart, top-right. */}
        <span
          aria-hidden="true"
          className="maru-heart absolute top-[8px] right-[10px]"
          style={{ width: 34, height: 34 }}
        >
          <DoodleHeart size={34} color="#5C4033" fill="#E94B3C" />
        </span>

        <div className="flex items-start gap-[14px]">
          <div className="shrink-0 basis-[150px] -rotate-[4deg]">
            <Polaroid
              src={imageUrl(imageId)}
              alt="Maru, a schnauzer"
              width={126}
              height={126}
              caption="Maru (the boss)"
              className="w-full"
            >
              <WashiTape
                color="pink"
                tilt={-6}
                className="-top-[10px] left-1/2 -translate-x-1/2"
              />
            </Polaroid>
          </div>

          <div className="flex-1 pt-[6px]">
            <h3 className="font-display text-cocoa m-0 inline-block -rotate-[1deg] text-[30px] leading-none">
              {name}.
            </h3>
            <div className="font-stamp text-ink-soft mt-[4px] mb-[6px] text-[13px]">
              14 · Schnauzer · good boy
            </div>
            <p className="font-body text-ink-soft mt-[6px] mb-0 text-[13.5px] leading-[1.55]">
              {caption}
            </p>
            <p className="font-stamp text-tomato mt-[10px] text-[13px]">{allergyNote}</p>
          </div>
        </div>
      </div>

      {/* Bounce keyframe — kept local to avoid polluting globals.css with a
          component-specific animation. Scoped by the `.maru-heart` class. */}
      <style>{`
        @keyframes maruHeartBounce {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-6px) rotate(6deg); }
        }
        .maru-heart { animation: maruHeartBounce 1.6s ease-in-out infinite; display: inline-block; }
        @media (prefers-reduced-motion: reduce) {
          .maru-heart { animation: none; }
        }
      `}</style>
    </section>
  );
}
