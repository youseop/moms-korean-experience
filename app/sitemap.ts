import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url";

/**
 * Static sitemap for the 4 shipping routes. `/design-preview` is intentionally
 * omitted — it's an internal showcase (and already declared `robots: noindex`).
 *
 * Priorities follow the Home → Tours → Cooking → Stay product priority order
 * from the site plan. Since content is mostly evergreen (hand-written copy,
 * not a blog), `changeFrequency: "monthly"` is the realistic expectation.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tours`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cooking`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/stay`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
