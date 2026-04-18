/**
 * MenuCard — signature component for the Cooking page.
 *
 * One big recipe-card-styled block per set menu (A / B / C). Stacked
 * vertically on the 420px mobile column — intentionally NOT tabs, because
 * three short stacked cards scroll better on a phone than a tab stack
 * where the user has to tap and re-scroll to compare options (the editorial
 * handoff used `RecipeTabs`; we're picking cute/cozy-first here).
 *
 * Visual:
 *   - Paper-deep (`--color-paper-deep`) background with a 1px dashed cocoa
 *     border — reads as a recipe card torn out of a cookbook.
 *   - Top: slightly tilted Polaroid of the finished dish, WashiTape strip
 *     (caller-picked color) across the top-left, a "menu A / B / C" Patrick
 *     Hand stamp top-left, and — on the Eunjung's-pick menu (`letter === "A"`)
 *     — a small StickerBadge floating over the upper-right corner.
 *   - Caveat menu name, slightly tilted.
 *   - "what you'll cook" Patrick Hand kicker followed by the dish list. Each
 *     dish gets a small DoodleStar bullet. Dish objects may carry an
 *     optional `ko` transliteration — when present we render it inline next
 *     to the English name in a small italic Caveat swatch.
 *   - Nunito description paragraph.
 *   - A short plain ScribbleDivider to close the card.
 *
 * Accepts dishes as either plain strings (what `content/cooking.json`
 * currently ships) OR `{ name; ko? }` objects, so we can add Korean
 * transliterations later without a schema migration.
 */

import { DoodleStar } from "@/components/decoration/DoodleStar";
import { Polaroid } from "@/components/decoration/Polaroid";
import { ScribbleDivider } from "@/components/decoration/ScribbleDivider";
import { StickerBadge } from "@/components/decoration/StickerBadge";
import { WashiTape } from "@/components/decoration/WashiTape";
import { imageUrl } from "@/lib/images";

type WashiColor = "peach" | "pink" | "sage" | "sky" | "butter";

export type MenuDish = string | { name: string; ko?: string };

export type MenuCardProps = {
  /** Human-readable menu name, e.g. "Menu A — Kimbap & Bulgogi". */
  name: string;
  /** A / B / C — used for the stamp in the top-left corner. */
  letter: "A" | "B" | "C";
  /** Dish list. Accepts strings or `{ name, ko }` objects. */
  dishes: readonly MenuDish[];
  /** Short prose paragraph explaining the menu. */
  description: string;
  /** Resolves via `imageUrl()` — the finished-dish hero. */
  imageId: string;
  /** Washi tape color. Tune per card for variety. Default peach. */
  accentColor?: WashiColor;
  /** Extra classes for the outer card. */
  className?: string;
};

function normalizeDish(d: MenuDish): { name: string; ko?: string } {
  return typeof d === "string" ? { name: d } : d;
}

export function MenuCard({
  name,
  letter,
  dishes,
  description,
  imageId,
  accentColor = "peach",
  className = "",
}: MenuCardProps) {
  const isFeatured = letter === "A";

  return (
    <article
      className={`relative mx-[22px] my-[26px] px-[18px] pt-[18px] pb-[14px] shadow-warm-soft ${className}`}
      style={{
        background: "var(--color-paper-deep)",
        border: "1px dashed var(--color-cocoa, #5C4033)",
        borderRadius: "4px",
        transform: "rotate(-0.4deg)",
      }}
    >
      {/* Top stamp — "menu A" / "menu B" / "menu C" */}
      <span
        aria-hidden="true"
        className="font-stamp text-ink-soft absolute top-[10px] left-[14px] inline-block -rotate-3 text-[12px] tracking-[0.08em] uppercase"
      >
        menu {letter.toLowerCase()}
      </span>

      {/* Eunjung's pick — only for menu A */}
      {isFeatured && (
        <span
          aria-hidden="true"
          className="absolute -top-[14px] right-[10px] inline-block rotate-[8deg]"
        >
          <StickerBadge
            text="★ Eunjung's pick ★ Eunjung's pick ★"
            size={64}
          />
        </span>
      )}

      {/* Polaroid */}
      <div className="relative mx-auto mt-[18px] w-[220px] -rotate-[1.4deg]">
        <WashiTape
          color={accentColor}
          tilt={-10}
          width={78}
          height={20}
          className="-top-[12px] left-[18px]"
        />
        <Polaroid
          src={imageUrl(imageId)}
          alt={name}
          width={196}
          height={160}
          className="w-full"
        />
      </div>

      {/* Menu name — slight tilt for the handwritten feel. */}
      <h3 className="font-display text-cocoa relative mt-[14px] mb-[10px] inline-block -rotate-[0.6deg] text-[28px] leading-[1.08]">
        {name}
      </h3>

      {/* "what you'll cook" kicker */}
      <div className="mt-[4px] mb-[6px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[11px] tracking-[0.1em] uppercase">
          what you&rsquo;ll cook
        </span>
      </div>

      {/* Dishes list */}
      <ul className="m-0 mb-[12px] list-none p-0">
        {dishes.map((d, i) => {
          const dish = normalizeDish(d);
          return (
            <li
              key={`${dish.name}-${i}`}
              className="font-body text-cocoa mb-[4px] flex items-center gap-[8px] text-[15px] leading-[1.45]"
            >
              <DoodleStar size={14} fill="#FFE8A3" className="shrink-0" />
              <span>{dish.name}</span>
              {dish.ko ? (
                <span className="font-display text-ink-soft text-[15px] italic">
                  · {dish.ko}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      {/* Description */}
      <p className="font-body text-ink-soft m-0 text-[14.5px] leading-[1.65]">
        {description}
      </p>

      <ScribbleDivider variant="plain" className="my-[14px]" />
    </article>
  );
}
