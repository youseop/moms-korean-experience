# Eunjung's Table — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a warm, design-forward, mobile-first marketing site for Eunjung's three services (Tours, Cooking Class, Stay) on Vercel with content easily editable by non-developers. The brand is **Eunjung's Table**; the marketing voice still leans on the universal "Mom" concept — Eunjung is who Mom is.

**Architecture:** Next.js 15 App Router static-leaning site with all content in JSON files under `/content/` and images under `/public/images/`. The only server-side piece is a **Next.js Server Action** that accepts the inquiry form submission and sends an email via **Resend**. No database, no API routes. Tailwind CSS with a custom warm-editorial design system that explicitly avoids generic AI-template aesthetics.

**Tech Stack:** Next.js 15 (App Router + Server Actions), React 19, TypeScript (strict), Tailwind CSS, pnpm, next/font (Caveat + Nunito + Patrick Hand + Indie Flower), `zod` (form + content validation), `resend` (transactional email), Playwright (smoke tests), Vercel.

---

## 1. Design System

This section mirrors the cute/cozy/scrapbook prototype at `design-prototypes/cute-cozy/index.html`. Source-of-truth values come from that file; this section is its TypeScript/Tailwind translation. When the two disagree, the HTML prototype wins — update this doc to match, not the other way around. Supporting synthesis + component inventory lives at `docs/08-design-cute-cozy.md`.

The editorial direction at `design-handoff/project/` (Fraunces + Hanok Morning + dark-brown surround) is historical reference only — see `docs/07-design-handoff.md` for that parallel design direction, which is **not** the chosen implementation source.

### 1.1 Color palette

Multi-pastel scrapbook palette with a tomato red pop. Hex values copied verbatim from the prototype `:root` block. Tomato is used **sparingly** — maximum one tomato-colored element per section (the hero CTA, the underline on an emphasized word, a signoff, a pin — not all of them at once).

| CSS var | Hex | Role | Tailwind token |
|---------|-----|------|----------------|
| `--paper` | `#FDF5E6` | Page background (inside 420px column) | `paper.DEFAULT` |
| `--paper-deep` | `#F7E9CE` | Slightly darker cream for seams | `paper.deep` |
| `--kraft` | `#D4B896` | Desktop outside background (replaces `#2a1f14`) | `kraft` |
| `--peach` | `#FFD4B5` | Washi / tag (Tours) | `peach` |
| `--pink` | `#F4B5BB` | Washi / wave underline / boss kicker | `pink` |
| `--sage` | `#B5D5B5` | Washi / tag (Cooking) / P.S. kicker | `sage` |
| `--sky` | `#C8E0EC` | Washi / tag (Stay) | `sky` |
| `--butter` | `#FFE8A3` | Sticky note / kicker chip / star fill | `butter` |
| `--tomato` | `#E94B3C` | **Pop accent — one element per section max.** | `tomato` |
| `--cocoa` | `#5C4033` | Body text | `cocoa` |
| `--ink` | `#3A2820` | Doodle ink (SVG strokes) | `ink.DEFAULT` |
| `--ink-soft` | `#6B4E3D` | Muted text / doodle ink variant | `ink.soft` |

Shadows (warm-brown-tinted rgba — neutral grays read muddy on cream):

| Var | Value | Tailwind |
|-----|-------|----------|
| `--shadow` | `0 6px 14px rgba(58, 40, 32, 0.18)` | `boxShadow.warm` |
| `--shadow-soft` | `0 3px 8px rgba(58, 40, 32, 0.12)` | `boxShadow.warmSoft` |

```ts
// tailwind.config.ts — colors
colors: {
  paper: { DEFAULT: "#FDF5E6", deep: "#F7E9CE" },
  kraft:  "#D4B896",
  peach:  "#FFD4B5",
  pink:   "#F4B5BB",
  sage:   "#B5D5B5",
  sky:    "#C8E0EC",
  butter: "#FFE8A3",
  tomato: "#E94B3C",
  cocoa:  "#5C4033",
  ink:    { DEFAULT: "#3A2820", soft: "#6B4E3D" },
},
boxShadow: {
  warm:     "0 6px 14px rgba(58,40,32,0.18)",
  warmSoft: "0 3px 8px rgba(58,40,32,0.12)",
},
```

`globals.css` also mirrors the raw `--paper / --kraft / --peach / --tomato / …` variables so decorative components that set colors via CSS vars (washi tape, tags) keep working without prop-drilling Tailwind tokens.

### 1.2 Typography

**Four** typefaces, each with a narrow job. All loaded via `next/font/google` with `display: 'swap'`. Caveat is the dominant display voice — this is a scrapbook, written by hand.

- **Caveat (hand — display).** The dominant display voice. H1 (64px, with a 54px fourth line), H2 (42px), card H3 (38px), Maru H3 (34px), pullquote body (26px), sticky-note body (24px), polaroid captions (18–22px), footer tagline (32px), hero "hello" (22px), arrow note (20px).
- **Nunito (body).** Rounder than DM Sans, cozier. Body copy 14.5–15px, `line-height: 1.55–1.65`. Footer sub 14px. Fine print 11px.
- **Patrick Hand (print / stamp).** Printed/stamped labels — topbar nav (14px), section kicker chips (13px), service tags (13px), meta lines (13px), CTA button text (18px), circular badge ("mom's favorite") text (11px), cta-link labels (15px).
- **Indie Flower (signature).** Signatures only — pullquote sig and sticky-note sig ("— Eunjung" / "— E.") in tomato, 16–17px. Never for UI chrome.

```ts
// app/fonts.ts
import { Caveat, Nunito, Patrick_Hand, Indie_Flower } from "next/font/google";

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-print",
  weight: ["400"],
  display: "swap",
});

export const indieFlower = Indie_Flower({
  subsets: ["latin"],
  variable: "--font-marker",
  weight: ["400"],
  display: "swap",
});
```

Tailwind config:

```ts
// tailwind.config.ts
fontFamily: {
  hand:   ["var(--font-hand)",   "Comic Sans MS", "cursive"], // Caveat
  body:   ["var(--font-body)",   "-apple-system", "system-ui", "sans-serif"], // Nunito
  print:  ["var(--font-print)",  "Caveat", "cursive"], // Patrick Hand
  marker: ["var(--font-marker)", "Caveat", "cursive"], // Indie Flower
},
fontSize: {
  // Caveat (hand) — display sizes
  "h-hero":      ["64px", { lineHeight: "0.92", letterSpacing: "-0.01em" }],
  "h-hero-sub":  ["54px", { lineHeight: "0.92", letterSpacing: "-0.01em" }],
  "h-section":   ["42px", { lineHeight: "1"    }],
  "h-card":      ["38px", { lineHeight: "0.95" }],
  "h-maru":      ["34px", { lineHeight: "1"    }],
  "hand-quote":  ["26px", { lineHeight: "1.15" }],
  "hand-note":   ["24px", { lineHeight: "1.2"  }],
  "hand-tagline":["32px", { lineHeight: "1.1"  }],
  "hand-caption":["22px", { lineHeight: "1"    }],
  "hand-hello":  ["22px", { lineHeight: "1"    }],

  // Nunito (body)
  "body-lg": ["15px",   { lineHeight: "1.65" }],
  "body":    ["14.5px", { lineHeight: "1.55" }],
  "body-sm": ["13.5px", { lineHeight: "1.55" }],
  "fine":    ["11px",   { lineHeight: "1.5"  }],

  // Patrick Hand (stamps)
  "stamp":   ["13px", { lineHeight: "1"    }],
  "stamp-lg":["18px", { lineHeight: "1"    }],

  // Indie Flower (signature)
  "sig":     ["17px", { lineHeight: "1"    }],
  "sig-sm":  ["16px", { lineHeight: "1"    }],
},
```

Utility classes in `globals.css` under `@layer components` — each mirrors a selector in the prototype:

```css
/* app/globals.css — @layer components */
.h-hero     { @apply font-hand text-h-hero text-cocoa font-bold; }
.h-section  { @apply font-hand text-h-section text-cocoa font-bold; }
.h-card     { @apply font-hand text-h-card text-cocoa; }
.text-sub   { @apply font-body text-body text-ink-soft; }
.text-lead  { @apply font-body text-body-lg text-ink-soft; }
.kicker     { @apply font-print text-stamp bg-butter text-cocoa px-3 py-[3px] rounded-full shadow-warmSoft inline-block -rotate-2; }
.stamp      { @apply font-print text-stamp text-cocoa; }
.signoff    { @apply font-marker text-sig text-tomato inline-block; }
.caption-hand { @apply font-hand text-hand-caption text-cocoa; }
```

### 1.3 Photo treatment — polaroid frame

Every `<img>` on the site is wrapped in a `.polaroid` — white paper, 12px side padding, 44px bottom (caption), soft warm shadow, a slight tilt applied to the wrapper.

```css
/* app/globals.css */
.polaroid {
  background: #fffdf7;
  padding: 12px 12px 44px;
  box-shadow: var(--shadow);    /* 0 6px 14px rgba(58,40,32,0.18) */
  display: inline-block;
  position: relative;
}
.polaroid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.05) contrast(0.98);  /* subtle warm grade */
}
.polaroid .caption {
  position: absolute;
  left: 0; right: 0; bottom: 8px;
  text-align: center;
  font-family: var(--font-hand);  /* Caveat */
  font-size: 22px;
  color: var(--cocoa);
  line-height: 1;
}

/* tilt wrapper */
.photo-tilt { transform: rotate(var(--tilt-angle, -3deg)); }
```

Per-image tilt: pass `style={{ "--tilt-angle": "-3deg" }}` on `.photo-tilt`. Safe range **±4°** — more reads accidental. Aspect ratios used in the prototype: hero `4/5`, meet `1/1`, experience cards `5/4`, Maru `1/1`.

The `<Polaroid>` React component takes `{ src, alt, caption, tilt?, aspect?, tapes?: Array<{color, position, rotation}>, sticker?: React.ReactNode }` so you can hang washi tape and stickers on it without touching markup at the call site.

### 1.4 Decorative primitives — `components/decoration/`

Every decorative SVG in the prototype is **inline** (no sprite sheet, no external assets). On port, each becomes a small React component under `components/decoration/` with `currentColor` / prop-driven fill so they're stylable. Stroke style is consistent across all doodles:

- Stroke width **1.8–2.4px**
- `stroke-linecap: round`, `stroke-linejoin: round`
- Stroke color: `var(--ink)` / `var(--ink-soft)` / `var(--tomato)` for accent marks

Components to port (source line ranges are in `docs/08-design-cute-cozy.md` §3):

| Component | Props | Notes |
|---|---|---|
| `<Polaroid>` | `src`, `alt`, `caption`, `tilt`, `aspect`, `tapes?`, `sticker?` | The photo primitive. Slots for washi + sticker children. |
| `<WashiTape>` | `color` (peach/pink/sage/sky/butter), `width`, `rotation`, `position` (absolute {top/left/right/bottom}) | 60–80×18–22px, 0.88 opacity, inner 4px stripe pattern via `::before`. |
| `<PushPin>` | `color?` (default tomato) | 20px circle, tomato fill, cocoa stroke, white highlight. |
| `<StickerBadge>` | `label`, `color?`, `rotation?` | 100px circle with textPath in Patrick Hand. Used for "mom's favorite". |
| `<HandArrow>` | `variant`: `"hero"` / `"footer"` / `"mini"`, `color?` | Quadratic curve + chevron head. Three pre-drawn variants match the prototype's hero, footer, and card-link arrows. |
| `<DoodleHeart>` | `fill`, `stroke?`, `size?`, `animate?: "bounce"` | 5-point cordate path. `animate` runs the `@keyframes bounce` loop. |
| `<DoodleStar>` | `fill`, `stroke?`, `size?`, `rotation?` | 5-point star. Prototype uses butter-filled and sage-filled variants. |
| `<ScribbleUnderline>` | `color?` (default tomato) | Wavy path drawn behind an inline span via `::after`. Variants: bouncy (hero/section) and wave (meet). |
| `<ScribbleDivider>` | `variant`: `"plain"` / `"dot"` / `"x"` | Horizontal wavy line with optional center dot or tomato X. |
| `<TornPaperTop>` | `fill` (matches parent bg) | Torn-edge SVG used on `.maru::before`. Port as an absolutely-positioned decorative `<svg>` above the card. |
| `<Squiggle>` | `size?`, `color?` | Small wavy floater used in the hero. |

A port rule of thumb: copy the exact `viewBox` / `d` / `stroke-width` from the prototype. Don't re-draw — the prototype's doodles look hand-made because of imperfect `Q` curves, and a "cleaned up" redraw will feel like clip art.

### 1.5 Mobile-only page wrapper

The unusual architectural move: **no responsive breakpoint layout.** The site is explicitly "a mobile site that desktop visitors view as a phone-sized column on warm kraft paper." A 420px `.page` container is centered on a **kraft `#D4B896` body background** (replaces the editorial direction's dark `#2a1f14`). Desktop visitors see the cream column floating on warm kraft paper.

```css
/* app/globals.css */
html, body {
  background: var(--kraft);  /* #D4B896 — kraft paper outside the column */
  background-image:
    radial-gradient(rgba(58,40,32,0.08) 1px, transparent 1px),
    radial-gradient(rgba(58,40,32,0.06) 1px, transparent 1px);
  background-size: 3px 3px, 7px 7px;
  background-position: 0 0, 1px 2px;
  font-family: var(--font-body);
  color: var(--cocoa);
  padding: 28px 0 60px;
}

.page {
  max-width: 420px;
  margin: 0 auto;
  background: var(--paper);  /* #FDF5E6 cream */
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(58,40,32,0.05);
  padding-bottom: 40px;
}

/* SVG turbulence noise over the cream page */
.page::before {
  content: "";
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.23  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  opacity: 0.07;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: multiply;
}

/* faint notebook lines */
.page::after {
  content: "";
  position: absolute; inset: 0;
  background-image: linear-gradient(to bottom, transparent 31px, rgba(180,140,110,0.08) 32px, transparent 33px);
  background-size: 100% 32px;
  pointer-events: none;
  z-index: 1;
}

.page > * { position: relative; z-index: 2; }
```

**Trade-off — intentional.** Desktop-optimized responsive layouts are conspicuously not the goal. We accept that desktop visitors see a narrow column because (a) the real audience browses from phones and Instagram DMs, (b) the narrow column + kraft surround reads as a deliberate scrapbook object, and (c) kraft paper outside makes the page feel like a journal on a desk rather than a phone on a mat. Do not add `md:` / `lg:` responsive columns. The only things that break the 420px column: drawer / lightbox portals (fixed to viewport), and decorative overlaps (tape / badges / doodles) that extend a few px past the column edge by design.

### 1.6 Reveal-on-scroll

Keep the editorial handoff's opt-in pattern — **elements are visible by default**; the `.is-visible` class only adds a decorative rise animation. If JS fails, IntersectionObserver is unsupported, or the user has `prefers-reduced-motion`, content still renders. Restyle the keyframes to a scrapbook-y slight rotate + translate (the editorial version was a plain translateY).

```css
/* app/globals.css */
.reveal { opacity: 1; transform: none; }

@keyframes revealTape {
  from { opacity: 0.01; transform: translateY(10px) rotate(var(--reveal-rot, -0.5deg)); }
  to   { opacity: 1;    transform: none; }
}
.reveal.is-visible { animation: revealTape 0.7s cubic-bezier(.2,.7,.2,1) both; }

@media (prefers-reduced-motion: reduce) {
  .reveal.is-visible { animation: none; }
}
```

Per-element rotation: pass `style={{ "--reveal-rot": "-0.8deg" }}` on the `.reveal` wrapper for a slightly varied reveal angle.

IntersectionObserver wired as a hook:

```ts
// hooks/useReveal.ts
"use client";
import { useEffect } from "react";

export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
```

### 1.7 Distinctiveness moves

These replace the editorial direction's five moves — they describe what the cute/cozy prototype actually ships.

1. **Polaroid + washi-tape framing on every photo.** Photos aren't tilted alone (the editorial move) — they sit inside a white polaroid frame with a handwritten caption, held down by one or two strips of colored washi tape. Multiple tape colors per page (peach / pink / sage / sky / butter) avoid the "same sticker over and over" feeling.
2. **Caveat handwritten as the dominant display voice.** Not just Eunjung's voice — Caveat sets the H1, every H2, every card H3, every pullquote, every polaroid caption, every hero greeter. The page feels written by hand from top to bottom. Patrick Hand handles stamped UI labels (nav, kickers, service tags, CTA button); Indie Flower is reserved for signatures only.
3. **Tomato red `#E94B3C` as a punctuation pop.** The only high-saturation color. Used for one element per section: the CTA pill, the scribble underline on an `<em>` word, a signoff, a pushpin, a bounce-animated heart on Maru — but never more than one per screen region. Everything else sits in the pastel + cream range so the tomato reads as intentional emphasis.
4. **Inline SVG hand-drawn doodles.** Every decorative element is a hand-drawn SVG baked into the component: push pins, cordate hearts, 5-point stars, scribble underlines, wavy dividers, quadratic-curve arrows, circular "mom's favorite" badges with textPath. These are the tell that separates the scrapbook from "pastel SaaS with rounded corners."
5. **Mobile-only narrow column on warm kraft.** `.page` is 420px max; `body` is `#D4B896` kraft with a faint dot-grid pattern. Desktop visitors see the cream column floating on kraft paper. Extreme commitment to mobile, framed as a scrapbook object on wide screens.

### 1.8 Reference: prototype source

- **Prototype:** `design-prototypes/cute-cozy/index.html` — single file, ~969 lines, HTML + CSS + inline SVG + no JS.
- **Synthesis + component inventory:** `docs/08-design-cute-cozy.md` — exhaustive line-range map from the prototype to the React components we'll port into `components/`, plus a list of sections still missing from the prototype (Gallery, Reviews, WhyJeongja, full Inquire form, detail pages).
- **Historical editorial handoff** (not the port source): `docs/07-design-handoff.md` + `design-handoff/project/`. Retained for comparison only.

---

## 2. File Structure

```
moms-korean-experience/
├── app/
│   ├── layout.tsx                    # Root layout: fonts, <body> paper-grain, SiteHeader, SiteFooter
│   ├── page.tsx                      # Home
│   ├── globals.css                   # Tailwind directives + base typography + paper-grain SVG
│   ├── fonts.ts                      # next/font definitions (Caveat, Nunito, Patrick Hand, Indie Flower)
│   ├── tours/page.tsx                # Tours page
│   ├── cooking/page.tsx              # Cooking Class page
│   ├── stay/page.tsx                 # Stay page
│   ├── design-preview/page.tsx       # Dev-only design system showcase (Task 2)
│   ├── not-found.tsx                 # 404 — "Eunjung can't find this page"
│   ├── sitemap.ts                    # Static sitemap
│   ├── robots.ts                     # Static robots.txt
│   ├── opengraph-image.tsx           # Default OG via @vercel/og (optional)
│   └── actions/
│       └── submit-inquiry.ts         # Server Action: zod-validate form, call sendInquiryEmail, return {ok|error}
│
├── components/
│   ├── ui/                           # Stateless primitives, design-system building blocks
│   │   ├── Button.tsx                # Pill CTA, terra/sage accent, handles external target
│   │   ├── FadeIn.tsx                # IntersectionObserver scroll reveal
│   │   ├── PhotoGrid.tsx             # Mobile-first grid + tap-to-zoom lightbox
│   │   ├── Lightbox.tsx              # Fullscreen image viewer, ESC + swipe
│   │   └── Pill.tsx                  # Small inline tag (e.g. "vegetarian-friendly")
│   ├── sections/                     # Page-composition blocks
│   │   ├── Hero.tsx                  # Tilted-photo asymmetric hero
│   │   ├── Section.tsx               # Section wrapper w/ vertical rhythm + container
│   │   ├── SectionLabel.tsx          # Small-caps label + oversized bg number
│   │   ├── ExperienceCard.tsx        # Home three-service cards
│   │   ├── ReviewCard.tsx            # Review block w/ quote, avatar, optional photo/video
│   │   ├── StepList.tsx              # Numbered steps (How It Works)
│   │   ├── MenuCard.tsx              # Cooking menu A/B/C
│   │   ├── IconList.tsx              # Getting Around stat rows
│   │   ├── MomQuote.tsx              # Caveat handwritten pull quote w/ "— Mom" byline
│   │   ├── InquiryCTA.tsx            # Anchor-link button that scrolls to the in-page InquiryForm (`#inquire`). Used in hero CTAs and mid-page calls-to-action where the full form would be too heavy inline.
│   │   └── InquiryForm.tsx           # The actual form: rendered as a section on every page at `#inquire`. Uses `useActionState` + the `submit-inquiry` Server Action. Accepts an optional `prefilledExperience` prop so service pages pre-check the right box.
│   └── site/                         # Chrome: header, footer, nav
│       ├── SiteHeader.tsx            # Logo + nav + mobile hamburger
│       ├── SiteFooter.tsx            # Contact, quick links, small credit
│       └── MobileNav.tsx             # Hamburger drawer
│
├── content/                          # All editable copy & review data (JSON)
│   ├── site.json                     # Brand name ("Eunjung's Table"), tagline, nav labels, footer
│   ├── home.json                     # Home page copy
│   ├── tours.json                    # Tours page copy, places, itineraries
│   ├── cooking.json                  # Cooking copy, menu A/B/C descriptions
│   ├── stay.json                     # Stay copy, room/home/meal/Maru blocks
│   └── reviews.json                  # Reviews for all three services (schema per 02-asset-inventory.md §3)
│
├── lib/
│   ├── content.ts                    # Typed JSON loaders (zod-validated)
│   ├── email.ts                      # Resend client init + sendInquiryEmail(payload) with HTML template
│   ├── image-sizes.ts                # Central dimensions object per 02-asset-inventory.md §4.3
│   ├── site-url.ts                   # Env-driven base URL (for metadata, sitemap)
│   └── cn.ts                         # clsx + tailwind-merge helper
│
├── public/
│   ├── images/
│   │   ├── mom/                      # Mom portraits
│   │   ├── tours/seoul/              # Hidden-gem Seoul spots
│   │   ├── tours/outskirts/          # Day-trip spots
│   │   ├── cooking/{kitchen,process,food}/
│   │   ├── stay/{room,bathroom,home,neighborhood,meals}/
│   │   ├── maru/                     # Maru photos
│   │   ├── gallery/                  # Mixed gallery
│   │   ├── og/                       # Social share previews
│   │   └── placeholders/             # Solid SVG fallbacks per aspect ratio
│   ├── reviews/{tours,cooking,stay}/guest-<slug>/ # avatar.jpg, photo-*.jpg, video.mp4
│   ├── videos/                       # General video assets (posters alongside)
│   ├── favicon.svg
│   ├── favicon.ico
│   └── apple-touch-icon.png
│
├── scripts/
│   └── gen-placeholders.ts           # Walk /public/images, generate blurDataURL map (plaiceholder)
│
├── tests/
│   ├── playwright.config.ts          # Mobile + desktop projects, webServer auto-start
│   ├── smoke.spec.ts                 # 4 pages render, nav works, console clean
│   └── inquiry-form.spec.ts          # InquiryForm present on each page; validation + happy-path submit (INQUIRY_DRY_RUN=1)
│
├── docs/
│   ├── 00-site-plan.md
│   ├── 01-spec-checklist.md
│   ├── 02-asset-inventory.md
│   ├── 03-dev-plan.md                # ← this document
│   ├── 04-brand-name-options.md
│   ├── 05-design-references.md       # Historical research (pre-handoff); superseded by 07
│   ├── 06-design-direction.md        # Historical direction (pre-handoff); superseded by 07
│   ├── 07-design-handoff.md          # Historical reference — editorial direction, NOT shipping (see banner in file)
│   └── 08-design-cute-cozy.md        # Canonical design reference — cute/cozy / scrapbook direction (chosen)
│
├── .env.example                      # NEXT_PUBLIC_SITE_URL + Resend keys (RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL)
├── .gitignore
├── .prettierrc
├── .eslintrc.json                    # extends next/core-web-vitals + prettier
├── next.config.ts                    # remotePatterns for unsplash, image formats
├── postcss.config.mjs
├── tailwind.config.ts                # design-system tokens
├── tsconfig.json                     # strict: true, paths alias "@/*"
├── package.json
├── pnpm-lock.yaml
├── vercel.json                       # optional cache headers
└── README.md
```

### Justification for major splits

- **`/components/ui/` vs `/components/sections/` vs `/components/site/`.** UI primitives (Button, FadeIn, lightbox) have no opinions about the product — they could ship on any site. Sections are blocks of product-specific composition (Hero, ExperienceCard, MomQuote). Site chrome (SiteHeader, SiteFooter) is the layout shell. Three-way split keeps imports honest: a section can import UI but not other sections; site chrome stays thin.
- **`/content/` as JSON.** No CMS, no MDX. Six files, one per page plus shared `site.json` + `reviews.json`. Mom can open any in Drive/Notion and hand edits to Youseop who commits.
- **`/lib/content.ts` as the single loader.** Runtime zod validation of JSON shape → compile-time errors if copy drifts. No raw JSON imports scattered across components.
- **`/lib/site-url.ts`.** Sitemap + metadata need an absolute URL. In dev this is `http://localhost:3000`; in Vercel previews it's `https://<project>-<hash>.vercel.app`; in prod it's the custom domain. One env var, one helper.
- **`/scripts/gen-placeholders.ts`.** Pre-build step that walks `/public/images`, runs plaiceholder, writes `content/blur-map.json` for `BlurImage` component's `blurDataURL` lookup. Separates build-time from runtime.
- **`/app/actions/submit-inquiry.ts` + `/lib/email.ts`.** The only server-side code in the repo. Keeping the Server Action thin (parse + delegate) and pushing the Resend SDK call into `lib/email.ts` makes it trivial to mock under `INQUIRY_DRY_RUN=1` for Playwright and to swap email providers later. The action returns a structured `{ ok: true } | { ok: false, fieldErrors, formError }` shape consumed by the client via `useActionState`.

---

## 3. Implementation Tasks

16 tasks. Each with: files, bite-sized steps with concrete code, verification command + expected output, commit step with exact commit message. Tasks run sequentially; 4 and 5 may be parallelized if using subagent-driven-development.

### Task 1 — Project bootstrap

**Goal:** Working Next.js 15 + TS strict + Tailwind + pnpm repo that runs locally and lints clean on an empty canvas.

**Files created:**
- `package.json`, `pnpm-lock.yaml`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts`, `postcss.config.mjs`
- `.eslintrc.json`, `.prettierrc`
- `.gitignore`
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `README.md`

**Steps:**

- [ ] Run `pnpm create next-app@latest moms-korean-experience --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*"` from the parent directory. Decline Turbopack if prompted (stability over speed for this project).
- [ ] Open `tsconfig.json` and confirm:
  ```json
  { "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true, "target": "ES2022" } }
  ```
- [ ] Install dev dependencies:
  ```bash
  pnpm add -D prettier prettier-plugin-tailwindcss eslint-config-prettier @types/node
  pnpm add clsx tailwind-merge
  pnpm add zod
  ```
- [ ] Create `.prettierrc`:
  ```json
  { "semi": true, "singleQuote": false, "printWidth": 100, "plugins": ["prettier-plugin-tailwindcss"] }
  ```
- [ ] Extend `.eslintrc.json`:
  ```json
  { "extends": ["next/core-web-vitals", "prettier"] }
  ```
- [ ] Replace `package.json` scripts block with:
  ```json
  {
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "typecheck": "tsc --noEmit",
      "format": "prettier --write .",
      "format:check": "prettier --check ."
    }
  }
  ```
- [ ] Overwrite `app/page.tsx` with a minimal placeholder:
  ```tsx
  export default function Home() {
    return <main className="p-8"><h1 className="text-2xl">Eunjung's Table — bootstrap</h1></main>;
  }
  ```
- [ ] Write a 20-line `README.md` covering: what this is, `pnpm dev`, `pnpm build`, `pnpm test`, where copy lives (`/content/`), where images live (`/public/images/`), deploy target (Vercel).
- [ ] Initial commit.

**Verify:**
```bash
pnpm install && pnpm typecheck && pnpm lint && pnpm build
pnpm dev # visit http://localhost:3000 → renders "bootstrap" h1, no console errors
```
Expected: typecheck clean, lint clean, build succeeds, `next dev` serves the page with zero console errors.

**Commit:**
```
chore: bootstrap Next.js 15 + TS strict + Tailwind + pnpm
```

---

### Task 2 — Design system (port from cute/cozy prototype)

**Goal:** Port the cute/cozy prototype design system at `design-prototypes/cute-cozy/index.html` to our Tailwind config + `globals.css`. This is translation work, not design work — every token, filter, keyframe, and inline SVG in that file should have a 1:1 equivalent in our codebase. `/design-preview` route showcases the ported system visually — critical for Checkpoint 1 sign-off.

**Source of truth:** `design-prototypes/cute-cozy/index.html`. When porting a value, open the `<style>` block side-by-side with the Tailwind config and copy hex / px / rotation values verbatim. Do not re-derive, do not "clean up" — the slight imperfections in doodle paths, the -3° tilts, and the 0.88 tape opacity are all load-bearing.

The editorial handoff CSS at `design-handoff/project/design-system.css` is **not** the port source — it's a historical reference for the rejected direction. Do not pull from it.

**Files created/modified:**
- `tailwind.config.ts` (cute/cozy token map per §1.1–§1.2)
- `app/globals.css` (Tailwind directives, `:root` CSS variables, kraft body + cream `.page` wrapper, paper grain `::before`, notebook lines `::after`, reveal keyframes, typography utility layer, polaroid + photo-tilt, washi tape base, button + kicker chip CSS — mirror the prototype's `<style>` block)
- `app/fonts.ts` (next/font — Caveat + Nunito + Patrick Hand + Indie Flower per §1.2)
- `app/layout.tsx` (attach font variables + wrap children in `.page`)
- `app/design-preview/page.tsx` (showcase route)
- `lib/cn.ts`
- `hooks/useReveal.ts` (IntersectionObserver hook per §1.6)

**Steps:**

- [ ] Fill `tailwind.config.ts` with the cute/cozy palette (`paper`, `kraft`, `peach`, `pink`, `sage`, `sky`, `butter`, `tomato`, `cocoa`, `ink`), `fontFamily` (hand / body / print / marker), `fontSize` (display `h-hero` etc. plus `body` / `stamp` / `sig`), and `boxShadow` (warm / warmSoft) per §1.1–§1.2. Content globs: `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`.
- [ ] Create `app/fonts.ts` per §1.2 (Caveat + Nunito + Patrick Hand + Indie Flower loaders). All four CSS variables set on `<html>`.
- [ ] Create `lib/cn.ts`:
  ```ts
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
  ```
- [ ] Replace `app/globals.css` — port the relevant chunks of the prototype's `<style>` block inside the Tailwind layers. The file should include:
  1. `@tailwind base; @tailwind components; @tailwind utilities;`
  2. `:root` CSS variables — copy every `--paper / --paper-deep / --kraft / --peach / --pink / --sage / --sky / --butter / --tomato / --cocoa / --ink / --ink-soft / --shadow / --shadow-soft / --font-hand / --font-print / --font-body / --font-marker` from the prototype verbatim. These feed washi tape, tags, and anything that sets color via CSS var.
  3. **Kraft body background** + dot-grid grain (two stacked radial-gradients at 3px and 7px grid) per §1.5.
  4. **420px cream `.page` column** + `.page::before` (SVG turbulence at 7% opacity, `mix-blend-mode: multiply`) + `.page::after` (32px notebook lines at 8% opacity) + `.page > * { position: relative; z-index: 2; }` per §1.5.
  5. Typography utility classes (`.h-hero`, `.h-section`, `.h-card`, `.text-sub`, `.text-lead`, `.kicker`, `.stamp`, `.signoff`, `.caption-hand`) under `@layer components` per §1.2.
  6. The **polaroid frame** + `.polaroid img` warm filter (`saturate(1.05) contrast(0.98)`) + `.polaroid .caption` Caveat 22px + `.photo-tilt` wrapper per §1.3.
  7. **Washi tape base class** (`.washi`) with 0.88 opacity, inner stripe `::before`, and modifier classes `.washi.peach / .pink / .sage / .sky / .butter` per the prototype L212–L227.
  8. **CTA pill** (`.btn`) — tomato bg, Patrick Hand label, 2-layer shadow stack `0 4px 0 #b03a2e, 0 8px 14px rgba(233,75,60,0.35)`, rotated `-1.5deg`, tomato heart SVG slot on the left, `:active` translateY(2px).
  9. **Section kicker chip** (`.kicker`) — Patrick Hand 13px on butter bg, 3×12px padding, rounded-full, -2deg rotation, warm-soft shadow. Modifier for alternate background (`.kicker--pink`, `.kicker--sage`) per prototype L901 (`#03 · the boss` uses pink) and L943 (`p.s.` uses sage).
  10. **Section H2 emphasis underline** — the `h2 em::after` scribble-underline data-URL SVG from prototype L308–L315, plus `.wave::after` variant from L341–L348.
  11. **Scribble divider** base (`.divider` 80% width, 22px height, 70% opacity) — the three divider variants in the prototype are the same CSS class with different inner SVG paths, so divider SVGs are inline in the component.
  12. `.reveal` default-visible state + `@keyframes revealTape` + `.reveal.is-visible` + `@media (prefers-reduced-motion: reduce)` guard per §1.6.
  13. Component CSS for the named sections: `.pullquote` (dashed border + pink tape + pushpin slot), `.note` (butter sticky note, -2deg, sage tape top), `.maru` (rounded card + torn-paper `::before`), `.card-tape`, `.tag` (peach/sage/sky blobby border-radius), `.badge-fav` (100×100 sticker absolute), `.heart-bounce` animation — each mirroring the prototype CSS verbatim. Fastest path: copy rule blocks into `globals.css`.
- [ ] Create `hooks/useReveal.ts` per §1.6.
- [ ] Update `app/layout.tsx` to attach font variables and wrap children in `.page`:
  ```tsx
  import { caveat, nunito, patrickHand, indieFlower } from "./fonts";
  // <html lang="en" className={`${caveat.variable} ${nunito.variable} ${patrickHand.variable} ${indieFlower.variable}`}>
  //   <body>
  //     <div className="page">{children}</div>
  //   </body>
  // </html>
  ```
- [ ] Build `app/design-preview/page.tsx`. It must **re-create the prototype's Hero + three experience cards using only the production Tailwind config + globals.css** — if the production design preview and the static prototype HTML put side-by-side are indistinguishable at 420px mobile, the port succeeded. Specifically show:
  1. Type scale: `h-hero` (64px Caveat), `h-section` (42px), `h-card` (38px), `text-sub` (15px Nunito), `stamp` (13px Patrick Hand), `signoff` "— Eunjung" (17px Indie Flower tomato).
  2. Color swatches: every palette token (paper, kraft, peach, pink, sage, sky, butter, tomato, cocoa, ink, ink-soft) labeled by hex + CSS-var name.
  3. The **Hero block** from the prototype: "hi hi!" greeter in Caveat, 64px Caveat H1 with `<Eunjung>` in tomato and "stay with me" scribble-underlined, Nunito sub, hero polaroid with two washi tapes (peach + sage), tomato pill CTA with a heart + drawn arrow + "tap this!" note.
  4. The **three experience cards** from the prototype: peach "Tours · half-day" tag, sage "Cooking · 3hr" tag with `<StickerBadge>` circular "mom's favorite", sky "Stay · per night" tag. Each card includes its washi tape strip, tilt, Caveat H3, Nunito body, Patrick Hand cta-link with mini chevron.
  5. Decoration inventory: one of each `<WashiTape>` color, `<DoodleHeart>` (bounce animated), `<DoodleStar>` (butter + sage), `<PushPin>`, `<HandArrow>` (hero / footer / mini), `<ScribbleDivider>` (plain / dot / x), `<TornPaperTop>`, `<StickerBadge>`.
  6. A `.reveal` strip at the bottom that animates in on scroll — verify the slight rotation keyframe looks scrapbook-y, not flat.

**Verify:**
```bash
pnpm dev
# open http://localhost:3000/design-preview on mobile viewport (Chrome devtools iPhone 14)
# then on desktop 1440px — should see the narrow cream column floating on warm kraft paper
# also open design-prototypes/cute-cozy/index.html directly and compare Hero + cards side-by-side
```
Expected: Caveat + Nunito + Patrick Hand + Indie Flower all load (FOUT fine); no layout shift; polaroid photos have the subtle warm filter; washi tape shows the inner stripe pattern; tomato CTA has the 2-layer shadow stack; on desktop the 420px cream column floats centered with kraft `#D4B896` visible on both sides. The production preview's Hero + card block should be visually indistinguishable from the prototype.

**Commit:**
```
feat(design): port cute/cozy prototype to Tailwind + globals, polaroid + washi + doodles, /design-preview
```

---

### Task 3 — Shared layout

**Goal:** Every page renders inside a consistent SiteHeader + SiteFooter shell. Mobile hamburger works. Nav links are keyboard accessible.

**Files created/modified:**
- `components/site/SiteHeader.tsx`
- `components/site/SiteFooter.tsx`
- `components/site/MobileNav.tsx`
- `app/layout.tsx` (compose header/main/footer)
- `content/site.json` (seed nav labels + brand)
- `lib/content.ts` (stub `getSite()` loader)

**Steps:**

- [ ] Seed `content/site.json`:
  ```json
  {
    "brandName": "Eunjung's Table",
    "tagline": "Korean home cooking, hidden corners, and a quiet room in Jeongja — at Eunjung's table.",
    "nav": [
      { "href": "/tours", "label": "Tours" },
      { "href": "/cooking", "label": "Cooking Class" },
      { "href": "/stay", "label": "Stay" }
    ],
    "contact": { "email": "youseop@speakbridges.com" },
    "footer": { "smallprint": "Made with love in Jeongja-dong." }
  }
  ```
  Note: `inquiryFormUrl` is gone — the form lives in-app and is wired through env vars + component props, not content.
- [ ] Stub `lib/content.ts` with zod-validated `getSite()`:
  ```ts
  import site from "@/content/site.json";
  import { z } from "zod";
  const SiteSchema = z.object({
    brandName: z.string(),
    tagline: z.string(),
    nav: z.array(z.object({ href: z.string(), label: z.string() })),
    contact: z.object({ email: z.string() }),
    footer: z.object({ smallprint: z.string() }),
  });
  export type Site = z.infer<typeof SiteSchema>;
  export function getSite(): Site { return SiteSchema.parse(site); }
  ```
- [ ] Build `SiteHeader`:
  - Sticky top, `bg-paper/85 backdrop-blur`, thin `border-b border-ink-soft/15`.
  - Left: brand wordmark in Caveat, 26px, rotated -2°, with the "Table" word in tomato; links to `/` (prototype topbar markup L679–L682).
  - Right (md+): horizontal nav, each link uses highlight-pen underline on hover.
  - Right (<md): hamburger button, 44x44 min touch target, opens `MobileNav`.
- [ ] Build `MobileNav`:
  - Full-viewport cream drawer, slides down. ESC + outside tap + nav click all close it.
  - Links rendered large (`text-display-md font-display`).
  - Close button top-right, 44x44.
  - Trap focus while open. Set `inert` on `main` underneath.
- [ ] Build `SiteFooter`:
  - Three columns md+, stacked <md: About line, Quick links (nav + About), Contact (email).
  - Smallprint row centered at bottom with © year auto-computed + "Made with love in Jeongja-dong."
- [ ] Compose in `app/layout.tsx`:
  ```tsx
  <body>
    <SiteHeader />
    <main id="main" className="min-h-[60vh]">{children}</main>
    <SiteFooter />
  </body>
  ```
- [ ] Add a skip-link `<a href="#main" className="sr-only focus:not-sr-only ...">Skip to content</a>` at the top of layout.

**Verify:**
```bash
pnpm dev
# Navigate / → /tours (404 for now, fine) → check header/footer render
# Chrome devtools iPhone 14 → open hamburger, close via X, ESC, outside tap, link tap
# Tab through header: skip-link appears, then brand, then each nav item; focus ring visible
```

**Commit:**
```
feat(layout): site header, footer, mobile nav drawer, skip-link
```

---

### Task 4 — Content layer

**Goal:** All six content JSON files exist, are zod-validated, and are loaded through typed helpers. Seed with complete mock copy so pages can be built without any `TODO` placeholders.

**Files created:**
- `content/home.json`
- `content/tours.json`
- `content/cooking.json`
- `content/stay.json`
- `content/reviews.json`
- `lib/content.ts` (full set of loaders: `getHome`, `getTours`, `getCooking`, `getStay`, `getReviews`, `getReviewsFor(service)`)

**Steps:**

- [ ] Define zod schemas in `lib/content.ts` for each page. Key shapes:
  - **Home:** `hero { headline, subhead, cta: { label, href } }`, `meetMom { paragraphs: string[], photo: string }`, `experiences: Array<{ slug, title, blurb, image, href }>`, `galleryIds: string[]`, `featuredReviewIds: string[]`, `finalCta { headline, subhead, ctaLabel, ctaHref }`.
  - **Tours:** `hero`, `concept { paragraphs }`, `places: Array<{ id, name, caption, image, region: "seoul" | "outskirts" }>`, `howItWorks: Array<{ step, title, body }>`, `itineraries: Array<{ title, body, image }>`, `inquiry { headline, ctaLabel, ctaHref }`.
  - **Cooking:** `hero`, `experience { paragraphs }`, `atmosphereImages: string[]`, `menus: Array<{ key: "A"|"B"|"C", title, dishes: string[], blurb, image }>`, `seasonalBlurb`, `customBlurb`, `dietaryBlurb`, `inquiry`.
  - **Stay:** `hero`, `roomHome { paragraphs, images }`, `dailyDinner { paragraphs, images }`, `whyJeongja { paragraphs, images }`, `gettingAround: Array<{ label, value, note }>`, `maru { paragraphs, images, allergyDisclosure }`, `inquiry`.
  - **Reviews:** array matching the shape in `02-asset-inventory.md` §3.1 plus a `service: "tours"|"cooking"|"stay"` field and `mock: boolean`.
- [ ] Seed `content/home.json` with real-sounding mock copy. Example:
  ```json
  {
    "hero": {
      "headline": "Your Korean mom in Seoul.",
      "subhead": "Local tours, home cooking, and a quiet room in Jeongja-dong — with Mom.",
      "cta": { "label": "Explore Tours", "href": "/tours" }
    },
    "meetMom": {
      "paragraphs": [
        "I've lived in Jeongja for almost twenty years. After my son moved abroad, I started hosting the guests he sent my way — and I realized how much I loved it.",
        "I'm not a tour guide. I'm someone who'll take you to the bakery my husband loves, cook you dinner at my table, and make sure you get home safe."
      ],
      "photo": "/images/mom/mom-portrait-03.jpg"
    },
    "experiences": [
      { "slug": "tours",   "title": "Tours",         "blurb": "Real local places, hand-picked by Mom.",                 "image": "/images/tours/seoul/tours-seoul-hero-01.jpg", "href": "/tours" },
      { "slug": "cooking", "title": "Cooking Class", "blurb": "Cook a full Korean meal in her kitchen.",                "image": "/images/cooking/food/cooking-food-hero-01.jpg", "href": "/cooking" },
      { "slug": "stay",    "title": "Stay",          "blurb": "A private room, home-cooked dinners, a real neighborhood.", "image": "/images/stay/room/stay-room-hero-01.jpg", "href": "/stay" }
    ],
    "galleryIds": ["gallery-01","gallery-02","gallery-03","gallery-04","gallery-05","gallery-06"],
    "featuredReviewIds": ["tours-anna-germany-2024", "tours-david-canada-2024", "cooking-maya-uk-mock"],
    "finalCta": {
      "headline": "Curious? Ask Mom anything.",
      "subhead": "She usually replies within a day.",
      "ctaLabel": "Send Mom a note",
      "ctaHref": "#inquire"
    }
  }
  ```
  Note: the `ctaHref` is now an in-page anchor to the `InquiryForm` section at the bottom of the page (id `inquire`). No external URL.
- [ ] Seed `content/tours.json`: 8 places (6 Seoul + 4 outskirts from asset inventory §2.2), 3-step HowItWorks, 2 sample itineraries per site plan §Tours.
- [ ] Seed `content/cooking.json`: 3 menus (A/B/C) matching asset inventory + dishes listed in site plan §Cooking, seasonal blurb, custom/dietary blurbs.
- [ ] Seed `content/stay.json`: room paragraphs, daily dinner blurb, Why Jeongja (Tancheon, parks, Youseop's 5-city perspective), Getting Around trio from site plan §Stay, Maru intro with allergy disclosure.
- [ ] Seed `content/reviews.json`: 2 real Tours reviews (placeholder quotes to swap in later), 3 Cooking mock reviews, 3 Stay mock reviews. Mark mocks with `"mock": true`.
- [ ] Add loader functions:
  ```ts
  export function getHome() { return HomeSchema.parse(homeJson); }
  export function getTours() { return ToursSchema.parse(toursJson); }
  // etc.
  export function getReviewsFor(service: "tours"|"cooking"|"stay") {
    return getReviews().filter(r => r.service === service);
  }
  export function getReviewsByIds(ids: string[]) {
    const all = getReviews();
    return ids.map(id => all.find(r => r.id === id)).filter(Boolean);
  }
  ```

**Verify:**
```bash
pnpm typecheck
node -e "require('./lib/content.ts')" # not needed — TS compile via next
pnpm dev
# Temporarily add `console.log(getHome())` to app/page.tsx, confirm no zod errors
```
Expected: zod parses every file; typecheck clean; page still renders.

**Commit:**
```
feat(content): seed site/home/tours/cooking/stay/reviews JSON + typed loaders
```

---

### Task 5 — Reusable components (port from cute/cozy prototype)

**Goal:** The library of section + UI primitives pages will assemble from. **Most components are ports of the HTML + CSS + inline SVG already written in `design-prototypes/cute-cozy/index.html`.** Port one-for-one — same markup, same classes (defined in `globals.css` per Task 2), same decorative SVGs, translated to TypeScript React + our content layer. Built in isolation and previewed at `/design-preview`. This is the gate for Checkpoint 1.

**Porting rule of thumb:** open the prototype HTML side-by-side with the new `.tsx`, keep class names identical to the prototype, copy inline SVG `<path d="...">` values verbatim (do not redraw), and pass content through `lib/content.ts`. If you find yourself renaming a class, redrawing a doodle path, or re-deriving a layout, stop — re-read the prototype and copy.

The editorial handoff JSX at `design-handoff/project/*.jsx` is **not** the port source anymore (historical reference, not the chosen direction). If a component only exists in the editorial handoff (Gallery, ReviewCard, the WhyJeongja block, the full Inquire form, detail-page components), treat it as **still needs cute/cozy design** per `docs/08-design-cute-cozy.md §4` and apply the cute/cozy language when building it.

**Files created (each with its cute/cozy prototype source range):**

| New file | Cute/cozy prototype source | Notes |
|----------|----------------------------|-------|
| `components/ui/Button.tsx` | CTA pill CSS L247–L263 + markup L731–L744 | Tomato pill, Patrick Hand label, 2-layer shadow, -1.5° rotation, `<heart>` SVG slot. |
| `components/ui/FadeIn.tsx` | §1.6 reveal pattern (ported in Task 2) | Wraps children with the `.reveal` class; stagger via `style={{ "--reveal-rot": ... }}`. |
| `components/ui/PhotoGrid.tsx` | Meet-Eunjung pair L767–L778 + placeholder gallery layout | Not in prototype for a full grid — see §4 of `08-design-cute-cozy.md`; interim: arrange 2-column overlapping polaroids with alternating tilt. |
| `components/ui/Lightbox.tsx` | NOT IN PROTOTYPE | Still needed; build thin overlay that opens a `<Polaroid>` full-screen, ESC / tap-outside / swipe-down dismisses. |
| `components/ui/Pill.tsx` | Service tag CSS L437–L453 + markup L814, L838, L873 | Blobby-border-radius tag in peach/sage/sky. Props: color, rotation. |
| `components/sections/Hero.tsx` | Hero CSS L118–L277 + markup L685–L745 | "hello" greeter + Caveat H1 with scribble-underlined emphasis + Nunito sub + polaroid with 2 washi tapes + CTA pill + drawn arrow + "tap this!" note + scattered floater doodles. |
| `components/sections/Section.tsx` | `.section-head` L280–L315 + markup L755–L758, L804–L807, L900–L903 | Kicker chip + two-line Caveat H2 with `<em>` scribble-underlined. Props: kickerNum, kickerLabel, headingLines, emphasis, kickerColor. |
| `components/sections/SectionLabel.tsx` | Extracted from `Section` | Just the butter-yellow kicker chip, usable standalone. |
| `components/sections/ExperienceCard.tsx` | `.card` CSS L414–L505 + markup L812–L891 | Alternating left/right text, tilted `<Polaroid>`, service tag, optional sticker, washi tape top, Caveat H3, Nunito body, Patrick Hand cta-link with mini chevron. |
| `components/sections/ReviewCard.tsx` | NOT IN PROTOTYPE — see `08-design-cute-cozy.md §4` | Needs cute/cozy design. Proposal: torn-edge note card (like Maru block) with tiny guest-avatar polaroid, Caveat quote, Indie Flower sig. |
| `components/sections/MaruBlock.tsx` | `.maru` CSS L508–L576 + markup L899–L927 | Rounded cream card with torn-paper top, 150px polaroid + pink tape, text column (Caveat H3, meta, body), bounce-animated heart. |
| `components/sections/EunjungQuote.tsx` (pinned note variant) | `.pullquote` CSS L367–L407 + markup L786–L794 | Dashed-border note, pink tape top-left, tomato `<PushPin>` top-center, Caveat quote (26px), Indie Flower "— Eunjung" sig. The "MomQuote" name is retired. |
| `components/sections/StickyNote.tsx` (butter sticky variant) | `.note` CSS L579–L608 + markup L930–L933 | Butter bg, -2° rotation, sage tape top, Caveat body (24px), Indie Flower sig in tomato. |
| `components/sections/StepList.tsx` | NOT IN PROTOTYPE | Needs cute/cozy design. Proposal: three cream cards, each with a big Caveat numeral, torn-paper top, Nunito body. |
| `components/sections/MenuCard.tsx` | NOT IN PROTOTYPE | Needs cute/cozy design. Proposal: square polaroid + menu-letter badge (circular, Patrick Hand "A"/"B"/"C" sticker), dish list as pastel `<Pill>`s. |
| `components/sections/IconList.tsx` | NOT IN PROTOTYPE | Needs cute/cozy design. Proposal: stamped-passport row — Patrick Hand label, Caveat value, Nunito note. |
| `components/sections/Signoff.tsx` | Reused across `.pullquote .sig` L392–L399 + `.note .sig` L601–L608 | Renders "— Eunjung" (or `— E.`) in Indie Flower tomato. Used as a child of `EunjungQuote` / `StickyNote` and at the end of `MeetEunjung`. |
| `components/sections/InquiryCTA.tsx` | CTA pill patterns L731–L744 (hero) + L952–L957 (footer) | Lightweight scroll-to-form block: Caveat tagline + Nunito sub + tomato pill Button scrolling to `#inquire`. |
| `components/sections/InquiryForm.tsx` | NOT IN PROTOTYPE — see `08-design-cute-cozy.md §4` | Needs cute/cozy design. Use `useActionState` per Task 14; visual language proposal: labels in Patrick Hand, inputs on dashed-border paper fields, submit as the tomato pill Button, success state as a butter sticky note. |
| `components/site/SiteHeader.tsx` (Task 3) | `.topbar` L89–L116 + markup L679–L682 | Brand wordmark in Caveat (26px) tilted -2°, `span` in tomato, "menu" button as dashed-border circle in Patrick Hand. |
| `components/site/MobileNav.tsx` (Task 3) | NOT IN PROTOTYPE | Needs cute/cozy design. Proposal: full-column cream drawer, large Caveat links, tomato underline on hover. |
| `components/site/SiteFooter.tsx` (Task 3) | `.foot` CSS L611–L666 + markup L935–L965 | Sage "p.s." kicker + Caveat tagline + Nunito sub + tomato CTA pill + hint line (Patrick Hand) + fine print (Nunito) + floater arrow doodle. |
| `hooks/useReveal.ts` (Task 2) | §1.6 reveal pattern | IntersectionObserver adds `.is-visible`. |
| `hooks/useScrolled.ts` | NOT IN PROTOTYPE | Simple scroll-boolean hook for future nav shadow on scroll. |
| `app/design-preview/page.tsx` | Extended to render every component with sample data | Plus the full Hero + 3-card re-creation from Task 2. |

**Decoration primitives — new folder `components/decoration/`** (port inline SVGs from the prototype — see §1.4 of this doc and §3.3 of `08-design-cute-cozy.md` for the full list):

| File | Prototype source | Role |
|------|------------------|------|
| `components/decoration/Polaroid.tsx` | CSS L174–L204 + structure L719–L728 | Photo frame w/ Caveat caption + slots for tape + sticker. |
| `components/decoration/WashiTape.tsx` | CSS L207–L230 | Color-modifier strip w/ inner stripes. |
| `components/decoration/HandArrow.tsx` | SVGs L738–L742, L828–L831, L937–L941 | Three variants (hero / mini / footer). |
| `components/decoration/DoodleHeart.tsx` | SVGs L688–L691, L733–L735, L906–L909 | Cordate heart, optional `animate="bounce"`. |
| `components/decoration/DoodleStar.tsx` | SVGs L692–L699 | 5-point star, butter/sage fill variants. |
| `components/decoration/PushPin.tsx` | SVG L788–L791 | 20px tomato pin w/ highlight. |
| `components/decoration/StickerBadge.tsx` | SVG L841–L850 | 100px circle w/ textPath label. |
| `components/decoration/TornPaperTop.tsx` | CSS+SVG L517–L525 | Torn edge at card top; `fill` prop matches parent bg. |
| `components/decoration/ScribbleDivider.tsx` | SVGs L748–L752, L797–L801, L894–L897 | Wavy horizontal divider, variants: plain / dot / x. |
| `components/decoration/ScribbleUnderline.tsx` | CSS L149–L161, L308–L315, L341–L348 | `::after` underline under an inline span; bouncy or wave variant. |
| `components/decoration/Squiggle.tsx` | SVG L700–L703 | Small decorative floater. |

Still-needed detail-page components (used by Task 7–9) — **all need cute/cozy design** per `08-design-cute-cozy.md §4`. These are not in the cute/cozy prototype and are tracked as a parallel design workstream, not a port:

- `DetailHero`, `FactStrip`, `Timeline`, `SubNav`, `FloatingCTA`, `FAQ`, `Process`, `HandDrawnMap`, `IngredientsGrid`, `RecipeTabs`, `FloorPlan`, `Nearby`, `HouseRooms`, `Walks`, `CrossSell`, `DetailClose`.

**Steps:**

- [ ] `Button` (the tomato pill, per prototype `.cta` L247–L263):
  ```tsx
  type Variant = "primary" | "ghost";
  export function Button({ href, external, variant = "primary", children, className, icon }: Props) {
    const Tag = href ? "a" : "button";
    return <Tag href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-[26px] py-[14px] font-print text-stamp-lg transition",
        "-rotate-[1.5deg] active:translate-y-[2px]",
        variant === "primary" && "bg-tomato text-white shadow-[0_4px_0_#b03a2e,0_8px_14px_rgba(233,75,60,0.35)] active:shadow-[0_2px_0_#b03a2e,0_4px_8px_rgba(233,75,60,0.3)]",
        variant === "ghost" && "text-cocoa underline-offset-4 hover:underline decoration-tomato",
        className,
      )}>
      {icon}
      {children}
    </Tag>;
  }
  ```
  The `icon` slot holds the `<DoodleHeart size={16} fill="#fff" />` for "come over for dinner" / "write to Eunjung" buttons. For hero CTAs, wrap the button and a `<HandArrow variant="hero" />` + an `arrow-note` Caveat span ("tap this!") in a `.cta-wrap` flex container.
- [ ] `FadeIn`: wraps children in a div, uses `IntersectionObserver` + CSS transitions. Respects `prefers-reduced-motion`. Unobserves after first reveal. Optional `delay` prop for stagger.
- [ ] `Section`: `<section className="py-[var(--section-y)] ...">`. Takes `label?`, `number?`, `id?`, `className?`. Renders `SectionLabel` inline if label provided. Exposes a `max-w-6xl mx-auto px-6` container inside.
- [ ] `SectionLabel` (butter-yellow kicker chip per prototype `.kicker` L284–L294):
  ```tsx
  export function SectionLabel({
    number,
    children,
    color = "butter",
  }: { number?: string; children: React.ReactNode; color?: "butter" | "pink" | "sage" }) {
    const bg = { butter: "bg-butter", pink: "bg-pink", sage: "bg-sage" }[color];
    return (
      <span className={cn(
        "inline-block font-print text-stamp text-cocoa px-3 py-[3px] rounded-full shadow-warmSoft -rotate-2",
        bg,
      )}>
        {number && <>#{number} · </>}
        {children}
      </span>
    );
  }
  ```
  The accompanying H2 is a two-line Caveat with an `<em>` scribble-underlined in tomato — handled inside the `Section` component (see below), not here.
- [ ] `Hero` (per prototype `.hero` L118–L277, markup L685–L745): accepts `greeter`, `headline` (array of 3–4 lines, with props for which word is in tomato + which is scribble-underlined), `subhead`, `ctaLabel`, `ctaHref`, `ctaArrowNote`, `image`, `imageCaption`. Layout is single-column (420px column only): Caveat hello greeter rotated -3° → Caveat 64px H1 with emphasis + underline → Nunito sub → centered `<Polaroid>` with two `<WashiTape>` strips (peach + sage, ±20° rotation) → `.cta-wrap` with tomato `<Button>` + `<HandArrow variant="hero" />` + Caveat arrow-note ("tap this!"). Scatter 3–4 `<DoodleHeart>` / `<DoodleStar>` / `<Squiggle>` floaters absolutely-positioned in the section.
- [ ] `ExperienceCard` (per prototype `.card` L414–L505): alternating text alignment (odd=left, even=right), `<Polaroid>` aspect 5/4 with tilt (-2.5° / +2° / -1.5°), `<WashiTape>` top at 10% left/right, `<Pill>` service tag (peach/sage/sky) absolutely positioned at tilted angle, Caveat H3 (38px) with matching tilt, Nunito body, Patrick Hand `cta-link` row with mini `<HandArrow variant="mini" />`. Card 2 ("cooking") also hangs a `<StickerBadge label="★ mom's favorite ★" />` off the polaroid.
- [ ] `ReviewCard` (not in cute/cozy prototype — needs design per `08-design-cute-cozy.md §4`): proposal — torn-edge note card (reuse `<TornPaperTop>` + card body styling from `MaruBlock`), small 60px guest-avatar `<Polaroid>` tilted ±4° with a washi strip, Caveat quote (22–24px) as the main content, Indie Flower "— Name, Country" sig bottom-right, optional square `<Polaroid>` underneath if the review has a photo, optional video pill ("▶ Watch (42s)") in Patrick Hand that opens the `Lightbox`. Mobile-first single column. Flag for design sign-off before coding — do not port the editorial version.
- [ ] `PhotoGrid`:
  - Props: `images: Array<{ src, alt, aspect }>` and `columns?: 2 | 3 | 4`.
  - Renders a CSS grid, mobile = 2 col, md = `columns`.
  - Tapping an image opens the `Lightbox`.
  - Uses `next/image` w/ `sizes="(min-width: 768px) 33vw, 50vw"`.
- [ ] `Lightbox`: portal-based fullscreen overlay. Dismisses on tap-outside, ESC, swipe down on mobile. Arrow keys navigate. Keeps focus trapped.
- [ ] `StepList` (not in cute/cozy prototype — needs design per `08-design-cute-cozy.md §4`): proposal — three stacked cream note cards, each with `<TornPaperTop>`, a big Caveat numeral (42px tomato), Caveat H4 step title, Nunito body. Stacked on mobile (420px column only — no md+ variant needed given the mobile-only width).
- [ ] `MenuCard` (not in cute/cozy prototype — needs design per `08-design-cute-cozy.md §4`): proposal — square `<Polaroid>` of the menu's hero dish, a `<StickerBadge>` with "A" / "B" / "C" in Patrick Hand affixed to the top-right corner, Caveat H3 menu title, dish list as pastel `<Pill>`s (peach/sage/sky rotation), 1-line Nunito blurb.
- [ ] `IconList` (not in cute/cozy prototype — needs design per `08-design-cute-cozy.md §4`): proposal — "stamped passport" row treatment. Each row: Patrick Hand label left, Caveat value (big, 32px) centered, Nunito note right. Divide rows with `<ScribbleDivider variant="plain" />`.
- [ ] `EunjungQuote` (pinned note — was `MomQuote`): Caveat 26px pullquote on cream paper with a pink washi tape strip top-left, a tomato push-pin top-center, dashed cocoa border, and an Indie Flower "— Eunjung" sig bottom-right. Mirrors prototype `.pullquote` CSS L367–L407 + markup L786–L794.
  ```tsx
  import { PushPin } from "@/components/decoration/PushPin";
  import { WashiTape } from "@/components/decoration/WashiTape";

  export function EunjungQuote({ children }: { children: React.ReactNode }) {
    return (
      <figure className="pullquote">
        <WashiTape color="pink" className="absolute -top-3 left-3.5 w-[60px] h-[18px] -rotate-[8deg]" />
        <PushPin className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-5 h-5" />
        <blockquote className="font-hand text-hand-quote leading-[1.15] text-cocoa block">
          {children}
        </blockquote>
        <span className="signoff text-right block mt-2">— Eunjung</span>
      </figure>
    );
  }
  ```
  `StickyNote` is the butter-background variant of the same idea (prototype `.note` L579–L608) — Caveat 24px on butter, sage tape top, Indie Flower sig. Used for shorter one-sentence asides.
- [ ] `InquiryCTA` (lightweight scroll-to-form block, per prototype `.foot` pattern L611–L666): cream paper-deep band, sage kicker "p.s.", Caveat tagline headline, Nunito sub, primary tomato `<Button>` that is an **in-page anchor** to `#inquire`. Smooth-scroll via `html { scroll-behavior: smooth }` + `scroll-margin-top` on the form section.
  ```tsx
  export function InquiryCTA({ kicker = "p.s.", headline, subhead, ctaLabel = "write to Eunjung" }: Props) {
    return (
      <section className="bg-paper-deep/60 py-12 px-[22px] text-center relative">
        <SectionLabel color="sage">{kicker}</SectionLabel>
        <div className="font-hand text-hand-tagline text-cocoa mt-3 leading-[1.1]">
          {headline}
        </div>
        {subhead && <p className="font-body text-body text-ink-soft max-w-[280px] mx-auto mt-4">{subhead}</p>}
        <Button href="#inquire" icon={<DoodleHeart size={16} fill="#fff" />} className="mt-5">
          {ctaLabel}
        </Button>
      </section>
    );
  }
  ```
- [ ] `InquiryForm` — the actual form section. Rendered at the bottom of every page with `id="inquire"` so `InquiryCTA` can scroll to it. Client component (`"use client"`) because it wires into `useActionState`. Accepts an optional `prefilledExperience?: "tours" | "cooking" | "stay" | "chat"` prop from service pages. Full sketch:
  ```tsx
  "use client";
  import { useActionState, useEffect, useRef } from "react";
  import { submitInquiry, type InquiryState } from "@/app/actions/submit-inquiry";

  const EXPERIENCES = [
    { value: "tours",    label: "Tours" },
    { value: "cooking",  label: "Cooking Class" },
    { value: "stay",     label: "Stay" },
    { value: "chat",     label: "Just curious, want to chat" },
  ] as const;

  const initialState: InquiryState = { ok: null, fieldErrors: {}, formError: null };

  export function InquiryForm({
    prefilledExperience,
  }: { prefilledExperience?: (typeof EXPERIENCES)[number]["value"] }) {
    const [state, formAction, pending] = useActionState(submitInquiry, initialState);
    const errorRef = useRef<HTMLParagraphElement>(null);

    // Move focus to the first error (a11y) on validation failure.
    useEffect(() => {
      if (state.ok === false && errorRef.current) errorRef.current.focus();
    }, [state]);

    if (state.ok === true) {
      // Success state — butter sticky note per cute/cozy language (see 08-design-cute-cozy.md §4)
      return (
        <section id="inquire" className="scroll-mt-24 px-[22px] py-12">
          <div className="bg-butter p-6 shadow-warm -rotate-2 text-center">
            <p className="font-hand text-hand-note text-cocoa">
              Thanks! Eunjung will get back to you within a day or two.
            </p>
            <p className="font-marker text-sig text-tomato mt-2">— 은정 ❤️</p>
          </div>
        </section>
      );
    }

    return (
      <section id="inquire" className="scroll-mt-24 px-[22px] py-12">
        <SectionLabel color="pink">write to me</SectionLabel>
        <h2 className="font-hand text-h-section text-cocoa mt-2">
          Send <em className="not-italic text-tomato">Eunjung</em> a note
        </h2>
        <p className="font-body text-body text-ink-soft mt-2">She'll reply within a day or two.</p>

        <form action={formAction} className="mt-6 space-y-5" noValidate>
          <fieldset>
            <legend className="font-print text-stamp text-cocoa">
              Which experience? <span aria-hidden>*</span>
            </legend>
            <div className="mt-2 grid gap-2">
              {EXPERIENCES.map((e) => (
                <label key={e.value} className="inline-flex items-center gap-2 font-body text-body text-cocoa">
                  <input
                    type="checkbox"
                    name="experiences"
                    value={e.value}
                    defaultChecked={prefilledExperience === e.value}
                  />
                  <span>{e.label}</span>
                </label>
              ))}
            </div>
            {state.fieldErrors?.experiences && (
              <p className="mt-1 font-body text-body-sm text-tomato">{state.fieldErrors.experiences}</p>
            )}
          </fieldset>

          <Field label="Your name" name="name" required error={state.fieldErrors?.name} />
          <Field label="Email"     name="email" type="email" required error={state.fieldErrors?.email} />
          <Field label="Country / city (optional)" name="location" error={state.fieldErrors?.location} />

          <fieldset>
            <legend className="font-print text-stamp text-cocoa">Preferred contact channel</legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {["Email", "KakaoTalk", "WhatsApp"].map((c) => (
                <label key={c} className="inline-flex items-center gap-2 font-body text-body text-cocoa">
                  <input type="radio" name="contactChannel" value={c} defaultChecked={c === "Email"} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
            <Field label="Kakao username / WhatsApp number (if applicable)" name="contactHandle" />
          </fieldset>

          <Field label="Approximate dates (optional)" name="dates" placeholder="e.g. anytime in May 2026" />
          <Field label="Group size (optional)" name="groupSize" type="number" min={1} max={20} />

          <label className="block">
            <span className="font-print text-stamp text-cocoa">Anything Eunjung should know?</span>
            <textarea name="message" rows={5}
              className="mt-1 w-full bg-paper border border-dashed border-cocoa/30 px-3 py-2 font-body text-body text-cocoa" />
          </label>

          {/* Honeypot — hidden, must stay empty */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Do not fill<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" /></label>
          </div>

          <p ref={errorRef} tabIndex={-1} aria-live="polite" className="font-body text-body-sm text-tomato">
            {state.formError ?? ""}
          </p>

          <Button type="submit" disabled={pending} icon={<DoodleHeart size={16} fill="#fff" />}>
            {pending ? "sending…" : "send inquiry"}
          </Button>
        </form>
      </section>
    );
  }

  function Field({ label, name, error, type = "text", required, ...rest }: FieldProps) {
    return (
      <label className="block">
        <span className="font-print text-stamp text-cocoa">
          {label}{required && <span aria-hidden> *</span>}
        </span>
        <input name={name} type={type} required={required} aria-invalid={!!error}
          className="mt-1 w-full bg-paper border border-dashed border-cocoa/30 px-3 py-2 font-body text-body text-cocoa"
          {...rest} />
        {error && <span className="mt-1 block font-body text-body-sm text-tomato">{error}</span>}
      </label>
    );
  }
  ```
  **Note:** the full visual treatment of the form is still pending design — see `08-design-cute-cozy.md §4`. The sketch above applies the cute/cozy language (kicker chip + Caveat H2 + Patrick Hand labels + dashed-border inputs + tomato pill submit + butter sticky-note success) but the final look may change after a dedicated design pass.
  Notes on the sketch:
  - **Every input has a visible `<label>`.** Required fields marked both visually (`*`) and via `required`.
  - **Errors use `aria-live="polite"`** and focus moves to the first error on validation failure.
  - **Honeypot** (`hp_field`) hidden off-screen (not `display: none` — screen readers should still see the label, the visual position keeps it out of sight for sighted users, `tabIndex={-1}` keeps keyboard users from landing in it). Server action rejects any submission where it's non-empty.
  - **`useActionState`** keeps the previous submission's state (field values re-populate via `defaultValue` from `state.values` if the action returns them — omitted from the sketch for brevity, add in implementation).
  - **Success state** fully replaces the form — no redirect, no separate page.
- [ ] `Pill`: small tag with a pastel background (peach/pink/sage/sky/butter via `color` prop), cocoa text, Patrick Hand 13px, blobby-border-radius mimicking the prototype's `.tag` L437–L453 (`border-radius: 40% 60% 45% 55% / 50% 45% 55% 50%`), soft shadow, per-instance rotation ±8°. Used for service tags ("Tours · half-day") and dish lists.
- [ ] Extend `app/design-preview/page.tsx` to render each component with sample data so the whole system is visible on one scroll.

**Verify:**
```bash
pnpm typecheck && pnpm lint
pnpm dev # visit /design-preview on mobile viewport
```
Expected: every component renders; lightbox opens/closes; FadeIn reveals smoothly; tilted hero photo reads as "printed photo"; handwritten Caveat quote is unmistakably Mom's voice. **GATE: Checkpoint 1 design review here. Do not proceed to Task 6 without sign-off from Youseop.**

**Commit:**
```
feat(components): reusable UI + section primitives, extend /design-preview
```

---

### Task 6 — Home page

**Goal:** `/` renders the full Home page per site plan §Home, using the components from Task 5 and copy from `content/home.json`.

**Files modified/created:**
- `app/page.tsx`
- `components/sections/GalleryPreview.tsx` (thin wrapper over `PhotoGrid` with the 6 home thumbs)

**Steps:**

- [ ] In `app/page.tsx`, pull data at top:
  ```tsx
  const site = getSite();
  const home = getHome();
  const featuredReviews = getReviewsByIds(home.featuredReviewIds);
  ```
- [ ] Compose:
  1. `<Hero headline={home.hero.headline} subhead={home.hero.subhead} ctaLabel={home.hero.cta.label} ctaHref={home.hero.cta.href} image="/images/mom/mom-portrait-01.jpg" />`
  2. `<Section number="01" label="Meet Mom">` — two-column md+ with `home.meetMom.photo` on left, paragraphs on right. `MomQuote` at the bottom with a short line ("Come as you are. I'll make us tea.").
  3. `<Section number="02" label="Three ways to spend time">` — intro line + 3 `ExperienceCard`s stacked mobile, side-by-side md+ (tours / cooking / stay priority order).
  4. `<Section number="03" label="A peek inside">` — `GalleryPreview` with 6 thumbs, "See more →" link (non-functional for now, just an anchor).
  5. `<Section number="04" label="What guests say">` — 3 `ReviewCard`s stacked.
  6. `<InquiryCTA headline={home.finalCta.headline} subhead={home.finalCta.subhead} ctaLabel={home.finalCta.ctaLabel} />` — this is a scroll-to-form button, not a link out.
  7. `<InquiryForm />` at the bottom (no `prefilledExperience` — Home is agnostic). This is the section with `id="inquire"` that the `InquiryCTA` button scrolls to.
- [ ] Wrap each section below the Hero in `<FadeIn>` with small staggered delays (0ms, 60ms, 120ms on child elements where it makes sense).
- [ ] `export const metadata: Metadata = { title: site.brandName, description: site.tagline, openGraph: { ... } };`

**Verify:**
```bash
pnpm dev # visit /
```
- Mobile viewport (iPhone 14): hero photo tilted, text readable, single-column flow, buttons ≥ 44px.
- Desktop: three Experience cards side-by-side, Meet Mom two-column, paper grain visible.
- Network tab: all images lazy-loaded except the hero (`priority`).

**Commit:**
```
feat(home): render Home page with Meet Mom, 3 experiences, gallery, reviews, final CTA
```

---

### Task 7 — Tours page (Priority 1)

**Goal:** `/tours` is the most polished page. Extra visual love per priority. Uses the full design system.

**Files modified/created:**
- `app/tours/page.tsx`
- `components/sections/PlacesGallery.tsx` (groups places by region with a sub-label)
- `components/sections/ItineraryCard.tsx` (photo + title + body)

**Steps:**

- [ ] Data:
  ```tsx
  const site = getSite();
  const tours = getTours();
  const reviews = getReviewsFor("tours");
  ```
- [ ] Compose:
  1. `<Hero headline={tours.hero.headline} subhead={tours.hero.subhead} ctaLabel="Ask Mom" ctaHref="#inquire" image="/images/tours/tours-hero-01.jpg" />` — the hero CTA is an in-page anchor to the form section.
  2. `<Section number="01" label="The concept">` — `tours.concept.paragraphs` rendered as `max-w-prose` body copy, followed by a `MomQuote` ("I'll take you where my family actually goes.").
  3. `<Section number="02" label="Mom's favorite places">` — `PlacesGallery` component:
     - Renders two sub-groups: "In Seoul" and "Outside Seoul".
     - Each sub-group uses `PhotoGrid` with 3:2 aspect images.
     - Caption under each photo (visible on md+, hidden-until-tap on mobile? Default: always visible small caption below photo).
  4. `<Section number="03" label="How it works">` — `StepList` with the 3 steps (Tell Mom your interests → She plans a day → Spend the day together).
  5. `<Section number="04" label="Sample days">` — 2 `ItineraryCard`s, photo + title + 60–100 word body. Stacked on mobile, side-by-side md+.
  6. A mid-page `<InquiryCTA headline="Tell Mom what you're curious about" subhead="She'll reply within a day." ctaLabel="Send an inquiry" />` — scroll-to-form button, sits between the sample days and reviews so curious readers can jump straight to contacting without reading the reviews first.
  7. `<Section number="05" label="What guests say">` — render all reviews for "tours". Two real ones get a small "Verified tour guest" pill (per `mock: false`).
  8. `<InquiryForm prefilledExperience="tours" />` — the full form at the bottom of the page, `id="inquire"`. The "Which experience?" multi-select arrives with "Tours" pre-checked.
- [ ] Metadata: `{ title: "Tours — " + site.brandName, description: tours.hero.subhead, openGraph: { images: ["/images/og/og-tours.jpg"] } }`.

**Verify:**
```bash
pnpm dev # visit /tours
```
- All photos lazy-load as you scroll.
- Lightbox works on every gallery image.
- Mobile: no horizontal scroll anywhere; sticky header doesn't overlap anchor scrolls.
- Desktop: sections breathe (≥ 8rem vertical between them).

**Commit:**
```
feat(tours): render Tours page — concept, places gallery, how it works, itineraries, reviews
```

---

### Task 8 — Cooking Class page (Priority 2)

**Goal:** `/cooking` renders per site plan §Cooking with three menu cards and dietary accommodations.

**Files modified/created:**
- `app/cooking/page.tsx`
- `components/sections/MenuGrid.tsx` (wraps three `MenuCard`s with responsive layout)

**Steps:**

- [ ] Data:
  ```tsx
  const site = getSite();
  const cooking = getCooking();
  const reviews = getReviewsFor("cooking");
  ```
- [ ] Compose:
  1. `<Hero>` — headline + subhead + CTA "Book a class" with `ctaHref="#inquire"`, image `/images/cooking/cooking-hero-01.jpg`.
  2. `<Section number="01" label="The experience">` — 2–3 paragraphs of `cooking.experience.paragraphs`, followed by a `MomQuote` ("Eating together is the best part.").
  3. `<Section number="02" label="The atmosphere">` — `PhotoGrid` of 6 atmosphere images (kitchen + process mix), `columns={3}` on md+.
  4. `<Section number="03" label="What you can cook">`:
     - Intro paragraph explaining the three-menu structure.
     - `MenuGrid` with three `MenuCard`s (A/B/C). Each card shows its representative hero image (kimbap for A, japchae for B, chicken for C) with the dish list as `Pill`s and a 1-line blurb.
     - Below the grid: a small `Pill`-wrapped note "Seasonal special changes weekly" with the `cooking.seasonalBlurb`.
     - Custom-request block: `paper-deep` band with the `cooking.customBlurb` ("Want to cook something else? Tell us.").
     - Dietary block: `paper-deep` band with the `cooking.dietaryBlurb` and explicit mention of vegetarian / vegan / allergy accommodations.
  5. Mid-page `<InquiryCTA headline="Want to cook with Eunjung?" ctaLabel="Send an inquiry" />` — scroll-to-form button.
  6. `<Section number="04" label="What guests say">` — render all cooking reviews (mocks included). Label each as "Early guest" or similar so mock vs real isn't misleading.
  7. `<InquiryForm prefilledExperience="cooking" />` at the bottom, `id="inquire"`, "Cooking Class" pre-checked.
- [ ] Metadata similar to Tours.

**Verify:**
```bash
pnpm dev # visit /cooking
```
- Menu cards: on mobile, stacked; on md+, 3 columns. Photos are square, not stretched.
- Dietary note clearly legible at mobile width (text not cramped against edges).
- No horizontal scroll.

**Commit:**
```
feat(cooking): render Cooking Class page — menus A/B/C, dietary, atmosphere gallery, reviews
```

---

### Task 9 — Stay page (Priority 3)

**Goal:** `/stay` renders per site plan §Stay. Most content-heavy page because it needs to sell a week-long commitment: room, home, dinner, Jeongja, commute, Maru, reviews.

**Files modified/created:**
- `app/stay/page.tsx`
- `components/sections/GettingAround.tsx` (thin wrapper for the IconList trio)
- `components/sections/MeetMaru.tsx` (Maru intro + 3 photos + allergy disclosure)

**Steps:**

- [ ] Data:
  ```tsx
  const site = getSite();
  const stay = getStay();
  const reviews = getReviewsFor("stay");
  ```
- [ ] Compose:
  1. `<Hero>` — headline + subhead + CTA "Check availability" with `ctaHref="#inquire"`, image `/images/stay/stay-hero-01.jpg`.
  2. `<Section number="01" label="The home & your room">`:
     - 1–2 paragraphs from `stay.roomHome.paragraphs`.
     - `PhotoGrid` of 5 images (3 room + 1 bathroom + 1 living area).
     - Small italic line calling out "Private bathroom, exclusively yours."
  3. `<Section number="02" label="Mom's home cooking, every day">`:
     - Paragraphs from `stay.dailyDinner.paragraphs`.
     - `PhotoGrid` of 4 meal photos, `columns={4}` on md+.
     - `MomQuote` ("Whatever I cook for my family that night — you eat that too.").
  4. `<Section number="03" label="Why Jeongja?">`:
     - `stay.whyJeongja.paragraphs` — covering Tancheon, parks, Youseop's 5-city perspective.
     - `PhotoGrid` of 3 neighborhood images (Tancheon + parks + Jeongja Station).
  5. `<Section number="04" label="Getting around">` — `GettingAround` rendering three `IconList` rows:
     - "Jeongja Station — 5 min — walking"
     - "Gangnam — 20 min — subway"
     - "Myeongdong — 40 min — bus"
     - Followed by a 1-line note: "Best for travelers staying a week or more."
  6. `<Section number="05" label="Meet Maru">` — `MeetMaru`:
     - 2–4 sentences + 3 photos.
     - Allergy disclosure block (butter sticky note with tomato outline, Patrick Hand label): "Maru, a 14-year-old Schnauzer, lives in the home. If you have dog allergies, this stay isn't for you — and that's okay. Let us know for tours and cooking instead."
  7. Mid-page `<InquiryCTA headline="Thinking about a week with Eunjung?" ctaLabel="Ask about availability" />` — scroll-to-form button placed after Maru so guests can jump to inquiry before scrolling through reviews.
  8. `<Section number="06" label="What guests say">` — all Stay reviews.
  9. `<InquiryForm prefilledExperience="stay" />` at the bottom, `id="inquire"`, "Stay" pre-checked.
- [ ] Metadata similar to Tours.

**Verify:**
```bash
pnpm dev # visit /stay
```
- Maru allergy disclosure is impossible to miss on mobile (full-bleed band, bold text).
- Getting Around trio reads cleanly on mobile (numbers big, labels small).
- Neighborhood photos don't feel stock — if they do, flag for Youseop to prioritize real asset capture.

**Commit:**
```
feat(stay): render Stay page — room/home, daily dinner, Jeongja, getting around, Maru
```

---

### Task 10 — Image optimization

**Goal:** Every `<img>` uses `next/image`. Blur placeholders render while images load. Remote patterns configured for Unsplash mock phase. Central image-size tokens consumed everywhere.

**Files created/modified:**
- `next.config.ts`
- `lib/image-sizes.ts`
- `scripts/gen-placeholders.ts`
- `content/blur-map.json` (generated output; committed)
- `components/ui/BlurImage.tsx` (thin wrapper over `next/image` that pulls blurDataURL from the map)
- Replace all `<img>` usages with `<BlurImage>` across components

**Steps:**

- [ ] `next.config.ts`:
  ```ts
  import type { NextConfig } from "next";
  const config: NextConfig = {
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        { protocol: "https", hostname: "images.unsplash.com" },
        { protocol: "https", hostname: "i.pravatar.cc" },
      ],
      deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920, 2400],
    },
    experimental: { optimizePackageImports: ["@/lib/content"] },
  };
  export default config;
  ```
- [ ] `lib/image-sizes.ts` — copy the `IMG` object from asset inventory §4.3 verbatim:
  ```ts
  export const IMG = {
    heroWide:  { width: 1920, height: 1080 },
    portrait:  { width: 1200, height: 1500 },
    editorial: { width: 1800, height: 1200 },
    square:    { width: 1200, height: 1200 },
    avatar:    { width: 400,  height: 400  },
    og:        { width: 1200, height: 630  },
  } as const;

  export const SIZES = {
    hero: "100vw",
    card: "(min-width: 768px) 33vw, 100vw",
    grid3: "(min-width: 768px) 33vw, 50vw",
    grid4: "(min-width: 768px) 25vw, 50vw",
    avatar: "48px",
  } as const;
  ```
- [ ] `scripts/gen-placeholders.ts`:
  ```ts
  import { getPlaiceholder } from "plaiceholder";
  import { readFile, writeFile } from "node:fs/promises";
  import { glob } from "glob";

  const files = await glob("public/images/**/*.{jpg,jpeg,png,webp}");
  const map: Record<string, string> = {};
  for (const f of files) {
    const buf = await readFile(f);
    const { base64 } = await getPlaiceholder(buf, { size: 10 });
    const key = "/" + f.replace(/^public\//, "");
    map[key] = base64;
  }
  await writeFile("content/blur-map.json", JSON.stringify(map, null, 2));
  console.log(`Generated ${Object.keys(map).length} blur placeholders.`);
  ```
  Install: `pnpm add -D plaiceholder sharp glob tsx`. Add script: `"placeholders": "tsx scripts/gen-placeholders.ts"`. Wire into `"prebuild": "pnpm placeholders"` so Vercel regenerates on deploy.
- [ ] `components/ui/BlurImage.tsx`:
  ```tsx
  import Image, { type ImageProps } from "next/image";
  import blurMap from "@/content/blur-map.json";
  export function BlurImage(props: ImageProps) {
    const blur = typeof props.src === "string" ? (blurMap as Record<string, string>)[props.src] : undefined;
    return <Image {...props} placeholder={blur ? "blur" : "empty"} blurDataURL={blur} />;
  }
  ```
- [ ] Sweep all component files, replace `<img>` and raw `<Image>` with `<BlurImage>` using the central `IMG` dimensions and `SIZES` strings. Add `priority` on Hero images only.
- [ ] Seed `/public/images/placeholders/` with 4 solid SVGs (`portrait-4x5.svg`, `landscape-16x9.svg`, `square-1x1.svg`, `editorial-3x2.svg`) — `paper` `#FDF5E6` bg, subtle paper-grain, `ink-soft` `#6B4E3D` Caveat label "placeholder 4:5" etc. These are the offline fallback per asset inventory §4.2.
- [ ] Populate `/public/images/` with Unsplash-sourced mock photos (downloaded, committed) matching every asset ID in the inventory tables. At minimum: hero for each of 4 pages, 3 experience cards, 6 gallery thumbs, 6 place photos, 3 food photos, 3 room photos, 3 Maru photos, 3 meal photos, 3 neighborhood photos. Document Unsplash sources in `content/mock-sources.md` for attribution cleanup later.

**Verify:**
```bash
pnpm placeholders && pnpm build
pnpm start
```
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95.
- Network tab: hero ships as AVIF/WebP; non-hero images lazy-loaded.
- Blur placeholder visible for ~100ms on slow 3G throttle.

**Commit:**
```
feat(images): next/image, plaiceholder blur placeholders, central size tokens, mock assets
```

---

### Task 11 — SEO, OG, sitemap, robots

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `lib/site-url.ts`
- Modify: `app/layout.tsx`, `app/page.tsx`, `app/tours/page.tsx`, `app/cooking/page.tsx`, `app/stay/page.tsx`
- Add: `public/og-default.jpg` (1200×630 mock — cream `#FDF5E6` background with a tomato washi-tape bar, brand name in Caveat)

**Steps:**

- [ ] `lib/site-url.ts`:
  ```ts
  // Default fallback is the Vercel-assigned URL used at launch.
  // Override with NEXT_PUBLIC_SITE_URL once a custom domain is attached.
  export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-project.vercel.app';
  ```
- [ ] `app/layout.tsx` — add root `metadata` export:
  ```ts
  import type { Metadata } from 'next';
  import { SITE_URL } from '@/lib/site-url';
  import site from '@/content/site.json';

  export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: site.brandName, template: `%s — ${site.brandName}` },
    description: site.tagline,
    openGraph: {
      type: 'website',
      siteName: site.brandName,
      images: ['/og-default.jpg'],
      locale: 'en_US',
    },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/favicon.svg', shortcut: '/favicon.ico', apple: '/apple-touch-icon.png' },
  };
  ```
- [ ] Per-page `metadata` exports — example for `app/tours/page.tsx`:
  ```ts
  export const metadata = {
    title: 'Local Tours',
    description: "See Korea through a local mom's eyes — hand-picked spots, no scripts.",
    openGraph: { images: ['/images/og/og-tours.jpg'] },
  };
  ```
  Repeat for `cooking` and `stay`. Home uses the root metadata.
- [ ] `app/sitemap.ts`:
  ```ts
  import type { MetadataRoute } from 'next';
  import { SITE_URL } from '@/lib/site-url';

  export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return [
      { url: SITE_URL,              lastModified, changeFrequency: 'monthly', priority: 1.0 },
      { url: `${SITE_URL}/tours`,   lastModified, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${SITE_URL}/cooking`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${SITE_URL}/stay`,    lastModified, changeFrequency: 'monthly', priority: 0.7 },
    ];
  }
  ```
- [ ] `app/robots.ts`:
  ```ts
  import type { MetadataRoute } from 'next';
  import { SITE_URL } from '@/lib/site-url';

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }
  ```
- [ ] OG image (mock phase): a 1200×630 JPEG at `public/og-default.jpg`. Cream `#FDF5E6` background with a tomato washi-tape strip across the top, brand name "Eunjung's Table" in Caveat (with "Table" in tomato), a tiny `<DoodleHeart>` doodle. Replace with composed photo+wordmark when real assets land. Per-page OG images (`/images/og/og-tours.jpg` etc.) can be the same default until Mom's portraits are ready.

**Verify:**
```bash
pnpm build
pnpm start
curl -s http://localhost:3000/sitemap.xml | head
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/ | grep -E 'og:image|og:title'
```
All four pages should show distinct `<title>` tags. Sitemap and robots both return 200 with valid content.

**Commit:**
```
feat(seo): metadata, OG tags, sitemap, robots, default OG image
```

---

### Task 12 — Motion & polish

**Files:**
- Modify: `app/globals.css`, every component using `<FadeIn>` (verify stagger), `components/ui/PhotoGrid.tsx` (verify mobile lightbox)

**Steps:**

- [ ] `app/globals.css` additions (inside `@layer base`):
  ```css
  @layer base {
    *:focus-visible {
      outline: 2px solid theme('colors.terra.500');
      outline-offset: 3px;
      border-radius: 4px;
    }
    [id] { scroll-margin-top: 80px; }
    ::selection {
      background-color: theme('colors.terra.400');
      color: theme('colors.cream.50');
    }
    html { scroll-behavior: smooth; }
  }
  ```
- [ ] In every card grid (`ExperienceCards`, `MenuCards`, `ReviewGrid`), pass `delay={i * 100}` to `<FadeIn>` so cards cascade rather than pop in together. Already declared in Task 5; double-check the prop is wired in pages built in Tasks 6–9.
- [ ] Mobile lightbox check on `PhotoGrid`: tap a photo → fullscreen → tap background or × button to close. Verify on Chrome DevTools mobile emulation (iPhone 14) and on a real device if possible.
- [ ] Image hover scale: confirm every grid item is wrapped in `group` and inner `<Image>` has `motion-safe:group-hover:scale-[1.04] transition-transform duration-500`. Hover effect should be invisible on touch devices (CSS `hover:` only fires on hover-capable pointers).
- [ ] Mobile nav close-on-route-change: `SiteHeader.tsx` `<Link>` items must call `setMenuOpen(false)` on click.

**Verify:**
- `pnpm dev` → walk all 4 pages on iPhone emulation. FadeIn stagger visible (slow CPU 4× in DevTools Performance throttling). Lightbox opens and closes. Anchor scrolling works. No layout shift on font load.
- `pnpm build` produces no warnings about missing images (all mocks present).
- `prefers-reduced-motion`: in DevTools Rendering panel set "Emulate CSS prefers-reduced-motion: reduce" → all `<FadeIn>` and hover-scale animations should disappear.

**Commit:**
```
feat(polish): focus-visible ring, scroll margin, selection color, motion verification
```

---

### Task 13 — Playwright smoke tests

**Files:**
- Create: `tests/playwright.config.ts`, `tests/smoke.spec.ts`, `tests/inquiry-form.spec.ts`
- Modify: `package.json` (add `test` scripts)

**Install:**
```
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

- [ ] `tests/playwright.config.ts`:
  ```ts
  import { defineConfig, devices } from '@playwright/test';

  export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: 'html',
    use: {
      baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
      trace: 'on-first-retry',
    },
    projects: [
      { name: 'mobile',  use: { ...devices['iPhone 14'] } },
      { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    ],
    webServer: {
      // Run the build + server with INQUIRY_DRY_RUN=1 so form-submission tests
      // don't hit Resend. A dummy RESEND_API_KEY keeps the module import happy.
      command: 'INQUIRY_DRY_RUN=1 RESEND_API_KEY=re_test pnpm build && INQUIRY_DRY_RUN=1 RESEND_API_KEY=re_test pnpm start',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  });
  ```
- [ ] `tests/smoke.spec.ts`:
  ```ts
  import { test, expect } from '@playwright/test';

  const PAGES = [
    { path: '/',        titleRe: /Eunjung/i },
    { path: '/tours',   titleRe: /Tour/i },
    { path: '/cooking', titleRe: /Cooking/i },
    { path: '/stay',    titleRe: /Stay/i },
  ];

  for (const { path, titleRe } of PAGES) {
    test(`${path} renders without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

      await page.goto(path);
      await expect(page).toHaveTitle(titleRe);
      await expect(page.getByRole('navigation').first()).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
      expect(errors).toHaveLength(0);
    });
  }

  test('home hero CTA links to /tours', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /explore tours/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /\/tours/);
  });
  ```
- [ ] `tests/inquiry-form.spec.ts`:
  ```ts
  import { test, expect, type Page } from '@playwright/test';

  const PAGES = ['/', '/tours', '/cooking', '/stay'] as const;

  test.describe('InquiryForm renders on every page', () => {
    for (const path of PAGES) {
      test(`${path} has the form section at #inquire`, async ({ page }) => {
        await page.goto(path);
        const form = page.locator('#inquire form');
        await expect(form).toBeVisible();
        await expect(form.getByLabel(/your name/i)).toBeVisible();
        await expect(form.getByLabel(/^email$/i)).toBeVisible();
      });
    }
  });

  test('empty submit shows required-field errors', async ({ page }) => {
    await page.goto('/tours');
    await scrollToForm(page);

    // On /tours, "Tours" is pre-checked via prefilledExperience — uncheck it
    // so we can exercise the experiences-required path as well.
    await page.getByLabel('Tours', { exact: true }).uncheck();

    await page.getByRole('button', { name: /send inquiry/i }).click();

    // aria-live region is populated with the summary.
    await expect(page.getByText(/fix the highlighted fields/i)).toBeVisible();
    // Per-field messages render.
    await expect(page.getByText(/pick at least one experience/i)).toBeVisible();
    await expect(page.getByText(/tell us your name/i)).toBeVisible();
    await expect(page.getByText(/email doesn't look right/i)).toBeVisible();
  });

  test('happy-path submit swaps to the success message (dry-run)', async ({ page }) => {
    await page.goto('/cooking');
    await scrollToForm(page);

    // "Cooking Class" is pre-checked on /cooking, so the experiences field is valid.
    await page.getByLabel(/your name/i).fill('Test Guest');
    await page.getByLabel(/^email$/i).fill('test.guest@example.com');
    await page.getByLabel(/country \/ city/i).fill('Berlin');
    await page.getByLabel(/approximate dates/i).fill('sometime in June 2026');
    await page.getByLabel(/group size/i).fill('2');
    await page.getByLabel(/anything eunjung should know/i)
      .fill('Vegetarian. Excited to learn kimbap.');

    await page.getByRole('button', { name: /send inquiry/i }).click();

    await expect(
      page.getByText(/eunjung will get back to you within a day or two/i),
    ).toBeVisible();
    // Form itself is gone — the section now shows the thank-you block.
    await expect(page.locator('#inquire form')).toHaveCount(0);
  });

  async function scrollToForm(page: Page) {
    await page.locator('#inquire').scrollIntoViewIfNeeded();
  }
  ```
  The happy-path test relies on the Playwright `webServer` being started with `INQUIRY_DRY_RUN=1` (configured above) so the Server Action skips the real Resend call and just returns `{ ok: true }`.
- [ ] `package.json` scripts:
  ```json
  {
    "scripts": {
      "dev":     "next dev",
      "build":   "next build",
      "start":   "next start",
      "lint":    "next lint",
      "test":    "playwright test",
      "test:ui": "playwright test --ui"
    }
  }
  ```

**Verify:**
```bash
pnpm test
```
All tests pass across mobile + desktop projects: smoke (4 pages + the home-hero CTA test) and inquiry-form (4 render tests + empty-submit validation + happy-path dry-run).

**Commit:**
```
test(e2e): playwright smoke + inquiry-form tests
```

---

### Task 14 — Inquiry form Server Action + Resend email

**Goal:** The `InquiryForm` component built in Task 5 goes live end-to-end. Submissions hit a Next.js Server Action, get validated with zod, are sent as a formatted email to `youseop@speakbridges.com` via Resend, and return a clean success/error state to the client. Honeypot blocks simple bots. `INQUIRY_DRY_RUN=1` lets Playwright exercise the happy path without calling Resend.

**Files created/modified:**
- `app/actions/submit-inquiry.ts` (new)
- `lib/email.ts` (new)
- `.env.example` (new/updated — add Resend keys)
- `components/sections/InquiryForm.tsx` (already scaffolded in Task 5; wire to the final action + field validation here)

**Install:**

```bash
pnpm add resend zod
```

`zod` was already installed in Task 1, so effectively only `resend` is new. Keep the line explicit so the task is self-contained.

**Steps:**

- [ ] Create `lib/email.ts`:
  ```ts
  import { Resend } from "resend";

  const resend = new Resend(process.env.RESEND_API_KEY);

  const TO   = process.env.INQUIRY_TO_EMAIL   ?? "youseop@speakbridges.com";
  const FROM = process.env.INQUIRY_FROM_EMAIL ?? "onboarding@resend.dev";
  const DRY  = process.env.INQUIRY_DRY_RUN === "1";

  export type InquiryPayload = {
    name: string;
    email: string;
    experiences: string[];
    location?: string;
    contactChannel: "Email" | "KakaoTalk" | "WhatsApp";
    contactHandle?: string;
    dates?: string;
    groupSize?: number;
    message?: string;
  };

  export async function sendInquiryEmail(p: InquiryPayload) {
    const subject = `New inquiry from ${p.name} — ${p.experiences.join(", ")}`;
    const html = renderInquiryHtml(p);

    if (DRY) {
      // Test / Playwright mode — skip the network call, log, succeed.
      console.log("[INQUIRY_DRY_RUN] Would send:", { to: TO, subject, payload: p });
      return { id: "dry-run" };
    }

    const result = await resend.emails.send({
      from: `Eunjung's Table <${FROM}>`,
      to: TO,
      replyTo: p.email, // Youseop can hit reply and it goes to the submitter
      subject,
      html,
    });

    if (result.error) throw new Error(result.error.message);
    return result.data;
  }

  function renderInquiryHtml(p: InquiryPayload) {
    const row = (k: string, v?: string | number | string[]) =>
      v == null || v === "" || (Array.isArray(v) && v.length === 0)
        ? ""
        : `<dt style="font-weight:600;color:#6B5641;margin-top:12px">${k}</dt>
           <dd style="margin:4px 0 0;color:#2C2118">${Array.isArray(v) ? v.join(", ") : String(v)}</dd>`;
    return `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#2C2118;background:#FAF6EE;padding:24px">
        <h1 style="font-family:Georgia,serif;color:#1E1610;margin:0 0 8px">New inquiry — Eunjung's Table</h1>
        <p style="margin:0 0 16px;color:#6B5641">Reply directly to this email to respond to ${p.name}.</p>
        <dl style="margin:0">
          ${row("Name", p.name)}
          ${row("Email", p.email)}
          ${row("Experiences", p.experiences)}
          ${row("Country / city", p.location)}
          ${row("Preferred contact channel", p.contactChannel)}
          ${row("Contact handle / number", p.contactHandle)}
          ${row("Approximate dates", p.dates)}
          ${row("Group size", p.groupSize)}
          ${row("Message", p.message)}
        </dl>
      </div>`;
  }
  ```
- [ ] Create `app/actions/submit-inquiry.ts`:
  ```ts
  "use server";

  import { z } from "zod";
  import { sendInquiryEmail } from "@/lib/email";

  const Schema = z.object({
    // Honeypot — if set, silently "succeed" so bots don't retry.
    hp_field: z.string().max(0).optional().or(z.literal("")),

    experiences: z
      .array(z.enum(["tours", "cooking", "stay", "chat"]))
      .min(1, "Pick at least one experience."),
    name:  z.string().trim().min(1, "Please tell us your name.").max(120),
    email: z.string().trim().email("That email doesn't look right."),
    location: z.string().trim().max(200).optional(),
    contactChannel: z.enum(["Email", "KakaoTalk", "WhatsApp"]).default("Email"),
    contactHandle:  z.string().trim().max(120).optional(),
    dates:      z.string().trim().max(200).optional(),
    groupSize:  z.coerce.number().int().min(1).max(20).optional(),
    message:    z.string().trim().max(2000).optional(),
  });

  export type InquiryState = {
    ok: true | false | null;
    fieldErrors?: Partial<Record<keyof z.infer<typeof Schema>, string>>;
    formError?: string | null;
  };

  export async function submitInquiry(
    _prev: InquiryState,
    formData: FormData,
  ): Promise<InquiryState> {
    // FormData → plain object. `experiences` comes in as multiple entries.
    const raw = {
      hp_field:       formData.get("hp_field") ?? "",
      experiences:    formData.getAll("experiences"),
      name:           formData.get("name"),
      email:          formData.get("email"),
      location:       formData.get("location") || undefined,
      contactChannel: formData.get("contactChannel") || "Email",
      contactHandle:  formData.get("contactHandle") || undefined,
      dates:          formData.get("dates") || undefined,
      groupSize:      formData.get("groupSize") || undefined,
      message:        formData.get("message") || undefined,
    };

    const parsed = Schema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: InquiryState["fieldErrors"] = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof z.infer<typeof Schema> | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return { ok: false, fieldErrors, formError: "Please fix the highlighted fields." };
    }

    // Honeypot tripped — pretend success so we don't signal back to the bot.
    if (parsed.data.hp_field) return { ok: true };

    try {
      await sendInquiryEmail(parsed.data);
      return { ok: true };
    } catch (err) {
      console.error("submitInquiry: email send failed", err);
      return {
        ok: false,
        formError:
          "Sorry — we couldn't send your message just now. Please try again in a moment, or email youseop@speakbridges.com directly.",
      };
    }
  }
  ```
- [ ] Finalize `components/sections/InquiryForm.tsx` per the Task 5 sketch — wire the imported `submitInquiry` + `InquiryState`, render `state.formError` in the `aria-live` region, show per-field errors from `state.fieldErrors`, and the full success state. Confirm the honeypot is in the DOM and `tabIndex={-1}`.
- [ ] `.env.example` additions — the final file should look like:
  ```
  # Copy to .env.local before running locally.

  # Production base URL, used in sitemap and metadata.
  # Default to the Vercel-assigned URL at launch; swap to a custom domain later.
  NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

  # Resend — transactional email for the inquiry form.
  # Get an API key at https://resend.com/api-keys
  RESEND_API_KEY=re_xxxxxxxxxxxx
  INQUIRY_TO_EMAIL=youseop@speakbridges.com
  INQUIRY_FROM_EMAIL=onboarding@resend.dev   # Replace with verified domain sender once domain is set up

  # Set to 1 to skip the real Resend call (used by Playwright happy-path test).
  # INQUIRY_DRY_RUN=0
  ```
- [ ] Sign up at [resend.com](https://resend.com), create an API key, paste into `.env.local`.

**Verify:**

```bash
pnpm dev
# Open http://localhost:3000/tours, scroll to the form at #inquire.
# 1) Submit empty → every required field shows an inline error; focus lands on the aria-live region.
# 2) Fill name/email/at-least-one-experience → submit → form swaps to the warm 은정 thank-you message.
# 3) Check youseop@speakbridges.com inbox → email arrives, subject "New inquiry from <name> — tours", reply-to is the submitter.
# 4) Hit the form 5 times with test data → 5 emails land. No duplicates, no 500s.
# 5) (Dev tools) set the honeypot input to "x" before submit → UI shows success, no email is sent, console shows no error.
```

Expected: all five checks pass. Resend dashboard shows 5 successful sends and the sender is `onboarding@resend.dev` on the "from" side.

**Commit:**
```
feat(inquiry): server action + resend email + honeypot spam guard
```

---

### Task 15 — Vercel deployment

**Files:**
- Create: `.env.example`, `vercel.json`
- Modify: `next.config.ts` (no `output: 'export'` — keep default)

**Steps:**

- [ ] `.env.example` was already finalized in Task 14. Confirm it contains `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`, and the commented `INQUIRY_DRY_RUN` line.
- [ ] `vercel.json` — only override needed is long-lived cache headers on `/images` and `/_next/static`:
  ```json
  {
    "headers": [
      {
        "source": "/images/(.*)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "/_next/static/(.*)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      }
    ]
  }
  ```
- [ ] Push the repo to GitHub (or GitLab).
- [ ] Vercel project setup:
  1. `vercel.com/new` → import the repo
  2. Framework preset: Next.js (auto-detected)
  3. Root directory: `moms-korean-experience` if the repo root is the `personal/` parent — set this explicitly
  4. Build command: `pnpm build` (auto-detected from `pnpm-lock.yaml`)
  5. In **Settings → Environment Variables**, add for both **Production** and **Preview** environments:
     - `NEXT_PUBLIC_SITE_URL` = the Vercel-assigned URL (or later, your custom domain)
     - `RESEND_API_KEY` = your real Resend API key (same value Task 14 put in `.env.local`)
     - `INQUIRY_TO_EMAIL` = `youseop@speakbridges.com`
     - `INQUIRY_FROM_EMAIL` = `onboarding@resend.dev` (replace with your verified-domain sender once the custom domain is added to Resend)
     - Do **not** set `INQUIRY_DRY_RUN` in Production — real emails should go out.
  6. Deploy
- [ ] Custom domain: Vercel project → Settings → Domains → add domain → add the A/CNAME records at your DNS provider. Vercel provisions SSL automatically.
- [ ] Preview deploys: every branch push gets its own URL. Share preview URLs with Mom and Youseop's testers for review.

**Verify:**
- Visit the preview URL: all 4 pages load. Image URLs include `?w=` (Vercel Image Optimization active). `/sitemap.xml` and `/robots.txt` return 200.
- Lighthouse mobile target: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.

**Commit:**
```
chore(deploy): vercel config, env example, cache headers
```

---

### Task 16 — Analytics stub (optional)

**Files:**
- Modify: `app/layout.tsx`
- Install: `@vercel/analytics` (Option A) **or** add inline `<Script>` (Option B)

**Option A — Vercel Analytics (recommended, zero config):**

```bash
pnpm add @vercel/analytics
```

In `app/layout.tsx` inside `<body>`:
```tsx
import { Analytics } from '@vercel/analytics/react';
// ...
<Analytics />
```

That's it. Privacy-friendly, no cookie banner needed for basic page views, dashboard in the Vercel project panel.

**Option B — Plausible (self-hosted or cloud, if Vercel Analytics is not preferred):**

```tsx
import Script from 'next/script';
// In <head>:
<Script
  defer
  // At launch this is the Vercel-assigned domain; swap to your custom domain
  // (and re-register the site in Plausible) once it's attached.
  data-domain="your-project.vercel.app"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

Replace `your-project.vercel.app` with the actual Vercel-assigned domain at launch, and update again to the custom domain when it's attached. No env variable needed.

Conversion tracking for inquiry submissions: since the form is in-app, drop a small `track('inquiry_submitted', { experience })` call from the `InquiryForm` success branch (client-side) into whichever analytics client is wired up (`@vercel/analytics`'s `track()` or Plausible's `window.plausible`). One event per successful submission.

**Verify:**
- Visit production URL from a real browser (not localhost).
- Vercel Analytics dashboard or Plausible dashboard shows page views within ~60 seconds.

**Commit (when wired):**
```
feat(analytics): vercel analytics
```

---

## 4. Design Review Checkpoints

Two mandatory pause points. Skipping these is the most expensive mistake — fixing design tokens after pages are built costs 3× the time of fixing them in isolation.

### Checkpoint 1 — after Task 5 (components in isolation)

**When:** Before starting Task 6 (Home page).
**Where:** `localhost:3000/design-preview` and the Vercel preview URL of the same branch.
**Who reviews:** Youseop. Optionally: anyone whose design opinion matters.

**What to verify:**
- Side-by-side comparison test: open `design-prototypes/cute-cozy/index.html` and `localhost:3000/design-preview` at 420px — the Hero block + 3 experience cards should be visually indistinguishable.
- Paper texture: kraft desktop surround visible around the cream page; page grain (SVG noise) is present but invisible at casual glance; faint notebook lines legible only at close inspection.
- Caveat at 64px reads like handwriting, not a font. If it looks too neat, check the `weight` axis — 700 feels best for the hero.
- Tomato `#E94B3C` is only used once per visible region (CTA, or scribble-underline, or pin — not all). If tomato appears twice in the same section, dial one back to cocoa/ink-soft.
- Washi tape shows the inner 4px stripe pattern under close inspection (not a flat rectangle). If it reads flat, re-check the `::before` `mix-blend-mode: overlay` rule.
- Section kicker chips: butter-yellow by default, pink for "the boss", sage for "p.s." — rotations feel hand-placed, not snapped.
- `ExperienceCard` odd/even alignment alternates; polaroid tilts are within ±3°; sticker badge on card 2 ("mom's favorite") reads as a real sticker, not a logo.
- `EunjungQuote` pinned-note: the push-pin, tape, dashed border, Caveat quote, and Indie Flower sig all land — the treatment reads as "something Mom literally pinned up."
- Decoration inventory renders with correct fills: butter-fill stars, sage-fill stars, tomato heart with cocoa stroke, tomato arrow + "tap this!" Caveat label.
- CTA pill button (tomato, Patrick Hand label, 2-layer shadow) has thumb-friendly padding on mobile (≥ 44px tap target) — `14px 26px` + Patrick Hand 18px hits this.

**Gate:** Do not proceed to Task 6 without sign-off.

### Checkpoint 2 — after Task 9 (all pages built, before polish)

**When:** After Stay page is complete, before Task 12 (motion & polish).
**Where:** All 4 pages on a Vercel preview deploy. Ideally on a real phone, not just DevTools emulation.
**Who reviews:** Youseop. Mom should see it too — read every line of copy aloud, check it sounds like her.

**What to verify on mobile:**
- Hero overlays: dark enough for legible text on every hero photo? If a hero photo is too bright, deepen the gradient.
- Tilted photo frames in the hero: does the rotation read as intentional editorial detail or as accidental misalignment? Err toward less rotation — `rotate-[0.5deg]` is safer than `rotate-1` if in doubt.
- Section flow per page: every page uses the same SectionLabel → H2 → content pattern. If it feels monotonous, vary one section per page (drop the label, or use a full-bleed colored background).
- Copy: read every paragraph aloud. Does it sound like a person? Does it sound like Mom?
- CTA placement: at least one `InquiryCTA` visible without scrolling on desktop, and one within the first viewport on mobile after the hero.
- Maru section: lands as warmth or as filler? If filler, shorten to one sentence + one photo.

**Gate:** Capture any bugs or copy edits in a notes doc before running Task 12. Motion and polish cannot fix layout or copy problems.

---

## 5. Handoff & Next Steps

### Two execution modes after the plan is approved

**Option A — Subagent-driven execution (recommended for solo work)**
Hand this plan to Claude Code (or a comparable agent) with: "Execute tasks 1–16 in order. After each task, run the verification steps and commit. Stop and surface findings at Checkpoint 1 (after Task 5) and Checkpoint 2 (after Task 9)." Tasks 1–5 are fully autonomous. Tasks 6–9 require at least mock images committed at the paths declared in the JSON content files. Task 14 (inquiry Server Action + Resend) needs a real Resend API key in `.env.local` before verification can complete — the agent should surface this for the user to paste in and resume.

**Option B — Inline execution (recommended for first-time setup)**
Work through the tasks yourself one commit at a time. Slower but gives you a feel for the codebase before delegating future changes.

### Swapping mock assets for real assets

When real photos arrive, follow `docs/02-asset-inventory.md` for exact filenames and placement. Workflow:

1. Drop photos into the correct `/public/images/<category>/` folder using the same filenames already referenced in the JSON content. Filenames are stable contracts — mock and real share the path verbatim.
2. Run `pnpm placeholders` to regenerate `content/blur-map.json` blur placeholders.
3. If the mock phase pulled from Unsplash live URLs, remove `images.unsplash.com` from `next.config.ts` `images.remotePatterns`.
4. `pnpm build` — fails loudly if any image path in JSON content is missing on disk. That's the desired behavior.
5. `git commit -m "assets: real photos for <section>"`

### Future enhancements (out of scope for v1)

- Korean-language version (the JSON content layer is i18n-ready — add `content/ko/` and a locale switcher when needed).
- Booking/calendar integration (Cal.com or similar) once volume justifies real-time booking.
- Rate limiting on the inquiry Server Action (Upstash Redis + a token bucket keyed by IP) if the honeypot stops being sufficient.
- Verify a custom sending domain in Resend (SPF + DKIM) and swap `INQUIRY_FROM_EMAIL` to `hello@eunjungstable.com` (or the final custom domain) once it's in place — will materially improve deliverability vs the `onboarding@resend.dev` sandbox sender.
- Rich-text editor for Mom (Tina CMS or similar) once she wants to update copy without Youseop's help.
- A real review submission flow (submit a review from the success state after a stay/tour).

---

## 6. Open Decisions That Block Task 1

Status as of 2026-04-18: **6 of 6 resolved.** Each item is also tracked in `docs/01-spec-checklist.md`.

1. **Brand name** — **RESOLVED (2026-04-18): `Eunjung's Table`.** Drives `content/site.json → brandName`, header logo, footer, all metadata titles, the OG image, and the favicon. The brand still leans on the "Mom" concept as the marketing hook — Eunjung is who Mom is.
2. **Accent color: terracotta or sage?** — **RESOLVED (2026-04-18, revised): cute/cozy multi-pastel + tomato pop.** Replaces the earlier Hanok Morning / terracotta answer. Accents are spread across `peach` `#FFD4B5`, `pink` `#F4B5BB`, `sage` `#B5D5B5`, `sky` `#C8E0EC`, and `butter` `#FFE8A3`. Tomato red `#E94B3C` is the punctuation pop — used once per section maximum (CTA pill, `<em>` scribble-underline, signoff, push-pin). Full palette in §1.1. Hanok Morning (terracotta + sage) is historical; see `docs/07-design-handoff.md`.
3. **Inquiry form strategy** — **RESOLVED (2026-04-18):** custom in-app form with a Next.js Server Action and **Resend** for transactional email. Tally is dropped entirely. One shared form, rendered inline at `#inquire` on every page with the service-page variant pre-checking the matching experience. See **Task 14** for the full implementation (Server Action + zod schema + `lib/email.ts` + `.env.example` + Playwright dry-run).
4. **Mom's name strategy** — **RESOLVED (2026-04-18):** Mom's real name is **Eunjung (은정)**. The brand voice still leans on the universal "Mom" concept; the public-facing brand is **Eunjung's Table**; personal signoff on the site reads "— Eunjung" in Caveat. **Hangul is NOT rendered on the surface** — English-only per the handoff (revises the earlier "light sprinkle" decision). Korean webfont is not needed in the Task 2 font stack.
5. **Final domain** — **RESOLVED (2026-04-18):** Launch on the default Vercel-assigned `<project>.vercel.app` URL. `NEXT_PUBLIC_SITE_URL` defaults to that URL with a comment noting it can be swapped to a custom domain later. Custom domain is deferred.
6. **Design system** — **RESOLVED (2026-04-18, revised): cute/cozy / scrapbook direction.** After comparing two prototypes, the user chose the cute/cozy direction. Source of truth: `design-prototypes/cute-cozy/index.html` + the synthesis doc `docs/08-design-cute-cozy.md`. That file is the primary reference for palette, fonts (Caveat + Nunito + Patrick Hand + Indie Flower), spacing, polaroid + washi treatment, decorative SVG inventory, and the mobile-only `.page` wrapper on kraft background. Implementation porting (Tailwind tokens + `globals.css` + React components under `components/` and `components/decoration/`) is **Task 2's primary deliverable** — translation work, not design work. The earlier editorial direction at `design-handoff/` + `docs/07-design-handoff.md` is historical reference only. **Note:** detail-page designs (Tours / Cooking / Stay) and several Home sections (Gallery, Reviews, WhyJeongja, full Inquire form, full Footer) have NOT been designed in the cute/cozy language yet — they will be designed in parallel with their implementation per the recommendation in `08-design-cute-cozy.md §4`. Code Home first to validate the design language in production; then design the rest in parallel with detail-page implementation.

