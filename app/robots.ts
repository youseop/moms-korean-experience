import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url";

/**
 * Robots policy — crawl everything except internal routes.
 *
 * - `/design-preview` is an internal component showcase, not a shipping page
 *   (and already sets `robots: noindex` in its own metadata — disallowing
 *   here is belt-and-suspenders so crawlers don't even fetch it).
 * - `/api/` is disallowed preemptively; we don't have API routes in v1, but
 *   if/when we add one we don't want it indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/design-preview", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
