import type { Metadata } from "next";

import { RevealProvider } from "@/components/site/RevealProvider";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { site } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * Root metadata — applied to every route unless a page overrides.
 *
 * - `metadataBase` lets relative URLs (like `/og-default`) resolve to absolute
 *   ones in OG/Twitter tags without us concatenating manually.
 * - `title.template` auto-formats per-page titles, e.g. a page that exports
 *   `title: "Tours"` renders as `<title>Tours — Eunjung's Table</title>`.
 * - OG/Twitter defaults point at the `/og-default` route handler (see
 *   `app/og-default/route.tsx`), which generates a 1200×630 PNG with the
 *   brand wordmark via `next/og`'s `ImageResponse`.
 * - `formatDetection.telephone: false` prevents iOS Safari from turning any
 *   phone-like number strings into tappable tel: links.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.brandName,
    template: `%s — ${site.brandName}`,
  },
  description: site.shortDescription,
  openGraph: {
    type: "website",
    siteName: site.brandName,
    locale: "en_US",
    images: [
      {
        url: "/og-default",
        width: 1200,
        height: 630,
        alt: site.brandName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">
        <div className="page flex min-h-[calc(100vh-28px-60px)] flex-col">
          <SiteHeader />
          <main className="flex-1">
            <RevealProvider>{children}</RevealProvider>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
