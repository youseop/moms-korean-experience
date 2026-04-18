"use client";

/**
 * RevealProvider — Client Component boundary for the reveal-on-scroll
 * observer. Wrap `children` in `app/layout.tsx` so every route gets the
 * `.reveal` → `.is-visible` transition automatically.
 *
 * Purely additive: elements without `.reveal` are untouched, and elements
 * with `.reveal` stay visible even if JS never runs (see `useReveal`).
 */

import { useReveal } from "@/hooks/useReveal";

export function RevealProvider({ children }: { children: React.ReactNode }) {
  useReveal();
  return <>{children}</>;
}
