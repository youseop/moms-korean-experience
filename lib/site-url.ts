/**
 * Canonical site URL used for absolute URLs in metadata, sitemap, and robots.
 *
 * Read from `NEXT_PUBLIC_SITE_URL` (set this in Vercel for production/preview)
 * with a sensible fallback for local development. Any trailing slash is
 * stripped so callers can safely do `${SITE_URL}/path`.
 *
 * Usage:
 *   - Local dev: leave unset, defaults to http://localhost:3000
 *   - Vercel: set to the deployed URL (e.g. https://eunjungs-table.vercel.app)
 *     or, once attached, the custom domain.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

/**
 * Default OG image descriptor — points at the `/og-default` route handler
 * (see `app/og-default/route.tsx`). Spread into per-page `openGraph` blocks
 * because Next.js **shallow-replaces** `openGraph` when a child segment
 * defines its own — nested fields like `images` don't merge from parent.
 *
 * Example:
 *   openGraph: { ...defaultOpenGraphImages, title: "Tours", type: "article" }
 */
export const defaultOpenGraphImages = {
  images: [
    {
      url: "/og-default",
      width: 1200,
      height: 630,
      alt: "Eunjung's Table",
    },
  ],
};
