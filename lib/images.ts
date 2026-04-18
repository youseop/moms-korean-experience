/**
 * Image resolution helper.
 *
 * Real photography for Eunjung's Table isn't shot yet (tracked in
 * `docs/02-asset-inventory.md`). This module maps the content JSON's
 * `imageId` strings to Unsplash placeholder URLs that match the editorial
 * prototype's stock photography as closely as possible, so the layout
 * can be designed against real (if not final) imagery.
 *
 * Source of the mapping: `design-handoff/project/content.jsx` `IMAGES`
 * object. When real photos arrive, swap the values here (or change the
 * function to resolve local `public/images/*.webp` paths) and nothing
 * downstream has to change.
 */

const UNSPLASH: Record<string, string> = {
  // Hero / Eunjung portraits
  "mom-portrait-01":
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
  "mom-candid-01":
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80",
  "mom-kitchen-01":
    "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=1200&q=80",

  // Three experiences
  "tours-hero-01":
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&q=80",
  "cooking-hero-01":
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80",
  "stay-hero-01":
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",

  // Gallery
  "gallery-01":
    "https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=800&q=80",
  "gallery-02":
    "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=800&q=80",
  "gallery-03":
    "https://images.unsplash.com/photo-1517030330234-94c4fb948ebc?w=800&q=80",
  "gallery-04":
    "https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800&q=80",
  "gallery-05":
    "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=800&q=80",
  "gallery-06":
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",

  // Maru
  "maru-01":
    "https://images.unsplash.com/photo-1558531304-a4773b7e3a9c?w=800&q=80",

  // Tours — mom's favorite places (Seoul + outskirts + Jeongja).
  // Unsplash placeholders picked to roughly match each spot's vibe.
  "tours-seoul-alley-01":
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
  "tours-seoul-bukchon-01":
    "https://images.unsplash.com/photo-1538485399081-7c8970c46d4e?w=800&q=80",
  "tours-seoul-bookshop-01":
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
  "tours-seoul-market-01":
    "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=800&q=80",
  "tours-seoul-temple-01":
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
  "tours-outskirts-pottery-01":
    "https://images.unsplash.com/photo-1565193298357-c5b46b0ff68b?w=800&q=80",
  "tours-outskirts-gapyeong-01":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "tours-jeongja-tancheon-01":
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",

  // Tours — sample itinerary cards.
  "tours-itinerary-seoul-01":
    "https://images.unsplash.com/photo-1538669715315-155098f0fb1d?w=800&q=80",
  "tours-itinerary-outskirts-01":
    "https://images.unsplash.com/photo-1519114916041-6e7c93a0cc17?w=800&q=80",

  // Cooking — finished-dish polaroids for each of the three set menus.
  // Placeholders; swap for real plating photos when the shoot happens.
  "cooking-food-kimbap-01":
    "https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=800&q=80",
  "cooking-food-japchae-01":
    "https://images.unsplash.com/photo-1583032015879-e5022cb87c53?w=800&q=80",
  "cooking-food-chicken-01":
    "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=800&q=80",
};

/**
 * Resolve an imageId (as stored in `content/*.json`) to a URL usable by
 * `<Image>` / `<img>`. Falls back to an empty string for unknown ids —
 * callers should assume the id is correct; missing ids are content bugs,
 * not runtime errors.
 */
export function imageUrl(id: string): string {
  return UNSPLASH[id] ?? "";
}
