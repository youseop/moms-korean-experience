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
