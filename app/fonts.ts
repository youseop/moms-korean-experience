/**
 * Google Fonts for the cute/cozy scrapbook design system.
 *
 * Four typefaces — each with a narrow job per `docs/08-design-cute-cozy.md §2.2`:
 *   - Caveat         (display, handwritten — dominant voice)
 *   - Nunito         (body)
 *   - Patrick Hand   (stamp / print labels)
 *   - Indie Flower   (signature accent only)
 *
 * Each loader exposes a `--font-*` CSS variable that `app/globals.css` consumes
 * inside the Tailwind v4 `@theme` block, translating into `font-display`,
 * `font-body`, `font-stamp`, `font-script` utility classes.
 */
import { Caveat, Indie_Flower, Nunito, Patrick_Hand } from "next/font/google";

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-patrick-hand",
  weight: ["400"],
  display: "swap",
});

export const indieFlower = Indie_Flower({
  subsets: ["latin"],
  variable: "--font-indie-flower",
  weight: ["400"],
  display: "swap",
});

/** Space-joined list of the four font `.variable` classes for `<html>`. */
export const fontVariables = [
  caveat.variable,
  nunito.variable,
  patrickHand.variable,
  indieFlower.variable,
].join(" ");
