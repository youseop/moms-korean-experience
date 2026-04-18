/**
 * /og-default — dynamic Open Graph image (1200×630 PNG).
 *
 * Referenced by `app/layout.tsx`'s `openGraph.images` so every page shares
 * this default social preview until we have real per-page portraits.
 *
 * Uses `next/og`'s `ImageResponse` which runs Satori under the hood — only
 * flexbox + a subset of CSS is supported (no grid, no `gap` shorthand
 * misuse, no system font fallbacks via `font-family` alone for non-Latin
 * scripts). For v1 we render in serif/sans defaults; once Caveat TTF is
 * bundled in `public/fonts/`, we can `readFile` it and pass as `fonts`.
 *
 * Styling mirrors the cute/cozy palette:
 *   - cream background (#FDF5E6)
 *   - tomato accent (#E94B3C)
 *   - cocoa ink (#5C4033)
 *
 * Runtime: edge for fast cold starts on Vercel (Satori is Wasm-backed and
 * happy on the edge runtime).
 */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";

export const size = {
  width: 1200,
  height: 630,
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FDF5E6",
          fontFamily: "serif",
          color: "#5C4033",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 4,
            color: "#E94B3C",
            marginBottom: 24,
            display: "flex",
          }}
        >
          ★ EUNJUNG&rsquo;S TABLE ★
        </div>
        <div
          style={{
            fontSize: 96,
            fontStyle: "italic",
            lineHeight: 1,
            textAlign: "center",
            display: "flex",
          }}
        >
          Your Korean mom in Seoul.
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 36,
            color: "#6B4E3D",
            textAlign: "center",
            maxWidth: 800,
            display: "flex",
          }}
        >
          A home in Jeongja-dong · tours, cooking, and a quiet room with
          Eunjung.
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
