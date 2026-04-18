/**
 * Central image-size tokens.
 *
 * We render on a mobile-only 420px column (`.page` max-width, see
 * `app/globals.css`). Every photo ships with explicit `width`/`height` — no
 * `fill` mode — so consumers don't have to reason about sized parents.
 *
 * The `IMG` object gives canonical SOURCE-SIDE dimensions per archetype.
 * `next/image` will ask the optimizer for device-appropriate variants from
 * these, so pick source sizes large enough to look crisp at 2x DPR on the
 * 420px column.
 *
 * The `SIZES` object gives pre-baked responsive `sizes` strings for the most
 * common layouts. Passing one of these avoids the "image may be stretched"
 * warning from `next/image` and lets the optimizer pick the smallest variant
 * that still renders sharp.
 *
 * When real photography lands, only the `imageUrl()` mapping in `lib/images.ts`
 * changes — these tokens stay stable.
 */

export const IMG = {
  /** 4:5 portrait hero — the main polaroid on each page. */
  heroPortrait: { width: 800, height: 1000 },
  /** 16:9 wide hero, if we ever ship one. */
  heroWide: { width: 1200, height: 675 },
  /** 4:5 polaroid in ExperienceCard list. */
  card: { width: 800, height: 1000 },
  /** 1:1 square — used for the home gallery grid. */
  galleryThumb: { width: 800, height: 800 },
  /** 3:2 editorial — places, meal spreads. */
  editorial: { width: 1200, height: 800 },
  /** 4:5 small polaroid — CrossSell / PlaceCard tiles. */
  thumb: { width: 400, height: 500 },
  /** 1:1 avatar (ReviewCard). Pravatar serves 240/480; 200 plenty for 36px. */
  avatar: { width: 200, height: 200 },
  /** 3:2 narrow place tile. */
  placeCard: { width: 800, height: 533 },
  /** 4:5 dish polaroid. */
  menuDish: { width: 800, height: 1000 },
} as const;

/**
 * Pre-baked `sizes` strings for common layouts on the 420px column. The media
 * queries gently hedge against wider viewports (design-preview tools,
 * desktop sanity-checks) but the mobile fallback is the production path.
 */
export const SIZES = {
  /** Full-column photo (hero polaroid, experience card). ~388px interior of .page. */
  hero: "(min-width: 600px) 380px, 100vw",
  /** Same as hero — semantic alias for card usage. */
  card: "(min-width: 600px) 380px, 100vw",
  /** 2-column gallery grid inside .page — half-column. */
  galleryHalf: "(min-width: 600px) 190px, 50vw",
  /** Tiny avatar next to a review (~36px rendered). */
  avatar: "48px",
  /** Small PlaceCard / CrossSell polaroid (~100–140px rendered). */
  thumb: "(min-width: 600px) 140px, 35vw",
  /** Fills the viewport — used for the lightbox full-screen view. */
  full: "100vw",
} as const;

export type ImgPreset = keyof typeof IMG;
export type SizesPreset = keyof typeof SIZES;
