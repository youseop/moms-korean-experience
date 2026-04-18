/**
 * PlacesGrid — 1-column stack of `PlaceCard`s.
 *
 * Above the grid: a small "Eunjung's favorite places" Caveat heading.
 * Each card gets a rotating washi tape color from the palette so the
 * stack feels hand-assembled rather than uniform.
 *
 * Consumer: `/tours` — but the primitive is reusable (e.g. for a future
 * "Eunjung's favorite cafés" section).
 */

import { PlaceCard } from "@/components/sections/detail/PlaceCard";

type WashiColor = "peach" | "pink" | "sage" | "sky" | "butter";

const TAPE_CYCLE: readonly WashiColor[] = [
  "peach",
  "sky",
  "sage",
  "butter",
  "pink",
];

export type Place = {
  id: string;
  name: string;
  neighborhood: string;
  blurb: string;
  imageId: string;
};

export type PlacesGridProps = {
  places: readonly Place[];
  /** Show a small Caveat heading above the grid. Default true. */
  showHeading?: boolean;
  /** Override the heading text. */
  heading?: string;
  /** Whether to number each card (corresponds to a HandDrawnMap). Default true. */
  numbered?: boolean;
};

export function PlacesGrid({
  places,
  showHeading = true,
  heading = "Eunjung's favorite places",
  numbered = true,
}: PlacesGridProps) {
  return (
    <div className="px-[22px] py-[6px]">
      {showHeading && (
        <h3 className="font-display text-cocoa mt-[4px] mb-[6px] inline-block -rotate-[1deg] text-[24px] leading-[1.1]">
          {heading}
        </h3>
      )}
      <div>
        {places.map((p, i) => (
          <PlaceCard
            key={p.id}
            name={p.name}
            neighborhood={p.neighborhood}
            blurb={p.blurb}
            imageId={p.imageId}
            pinNumber={numbered ? i + 1 : undefined}
            tapeColor={TAPE_CYCLE[i % TAPE_CYCLE.length]}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
