import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats when the browser accepts them — Next.js negotiates
    // via `Accept` header. AVIF first (smallest), WebP fallback, then the
    // original.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
    // Tighten variant generation for our mobile-only 420px column. We never
    // ship a viewport wider than ~1200px in production (design-preview tool
    // is the only desktop case), so skipping the 1920/2048/3840 variants
    // keeps the Vercel image optimizer cheaper.
    deviceSizes: [360, 414, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 320, 384],
  },
};

export default nextConfig;
