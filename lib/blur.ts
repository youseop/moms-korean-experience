/**
 * Blur-placeholder helper.
 *
 * In the current mock phase every content photo is a remote Unsplash URL
 * (`lib/images.ts`). We don't have local files we can run through
 * `plaiceholder` + `sharp` yet, so we lean on Unsplash's image-processing
 * query params to produce a tiny, pre-blurred variant that we pass as
 * `blurDataURL` on `next/image`.
 *
 * When real photography ships (local `public/images/*.webp`), replace this
 * helper with a `plaiceholder`-based implementation that reads a
 * committed `content/blur-map.json` (see `docs/03-dev-plan.md` Task 10
 * original spec). The Polaroid / other consumers won't need to change —
 * they call `getBlurDataURL(src)` and get a data URL or equivalent back.
 *
 * TODO(real-images): swap to `plaiceholder` + `content/blur-map.json`.
 */

const UNSPLASH_HOST = "images.unsplash.com";

/**
 * 4x5 cream-paper SVG — used as the offline fallback when the source URL
 * isn't Unsplash and we don't have a real blur hash yet. Inline so it ships
 * as a tiny data URL without a network round-trip.
 */
const FALLBACK_SVG =
  "data:image/svg+xml;base64," +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="5" viewBox="0 0 4 5"><rect width="4" height="5" fill="#FDF5E6"/></svg>',
  ).toString("base64");

/**
 * Return a tiny blurred preview URL for `src`, suitable for passing to
 * `next/image`'s `blurDataURL` prop. For Unsplash URLs we rewrite the
 * query string to request a 20px-wide, heavily-blurred version. For
 * anything else we fall back to the cream-paper SVG.
 */
export function getBlurDataURL(src: string): string {
  if (!src) return FALLBACK_SVG;

  try {
    const url = new URL(src);
    if (url.hostname !== UNSPLASH_HOST) {
      return FALLBACK_SVG;
    }
    // Strip competing size/quality params and request a tiny blurred preview.
    url.searchParams.delete("w");
    url.searchParams.delete("q");
    url.searchParams.delete("h");
    url.searchParams.set("w", "20");
    url.searchParams.set("q", "10");
    url.searchParams.set("blur", "200");
    return url.toString();
  } catch {
    // Relative paths, data: URLs, or anything else URL can't parse.
    return FALLBACK_SVG;
  }
}
