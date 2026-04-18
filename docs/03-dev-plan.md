# Eunjung's Table — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a warm, design-forward, mobile-first marketing site for Eunjung's three services (Tours, Cooking Class, Stay) on Vercel with content easily editable by non-developers. The brand is **Eunjung's Table**; the marketing voice still leans on the universal "Mom" concept — Eunjung is who Mom is.

**Architecture:** Next.js 15 App Router static-leaning site with all content in JSON files under `/content/` and images under `/public/images/`. The only server-side piece is a **Next.js Server Action** that accepts the inquiry form submission and sends an email via **Resend**. No database, no API routes. Tailwind CSS with a custom warm-editorial design system that explicitly avoids generic AI-template aesthetics.

**Tech Stack:** Next.js 15 (App Router + Server Actions), React 19, TypeScript (strict), Tailwind CSS, pnpm, next/font (Fraunces + DM Sans + Caveat), `zod` (form + content validation), `resend` (transactional email), Playwright (smoke tests), Vercel.

---

## 1. Design System

The whole point of this system is to not look like every other Next.js + Tailwind marketing site on the internet. Warm editorial, not cold SaaS. Photo album, not product page.

### 1.1 Color Palette

Base is warm cream. Text is soft brown (never true black — harsh on cream). Two accent options are proposed; **Youseop to pick one before Task 2 starts** (see §6 Open Decisions).

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Page background | `cream-50` | `#FAF6EE` | `<body>`, default surfaces |
| Warm paper | `cream-100` | `#F5EEDF` | Cards, section alternates |
| Ivory | `cream-200` | `#EDE3CF` | Dividers, hover states |
| Aged paper | `cream-300` | `#E2D4B7` | Subtle accents |
| Soft brown (body) | `brown-700` | `#3B2E22` | Primary text |
| Warm brown (headings) | `brown-800` | `#2C2118` | H1–H3 |
| Espresso (emphasis) | `brown-900` | `#1E1610` | Very large display type |
| Faded brown (meta) | `brown-600` | `#6B5641` | Captions, timestamps |

**Accent — Option A: Terracotta (warm, energetic, "home kitchen")**

| Token | Hex | Usage |
|-------|-----|-------|
| `terra-300` | `#E8B59A` | Subtle wash, chip backgrounds |
| `terra-400` | `#D58A67` | Hover states |
| `terra-500` | `#C2714F` | Primary CTAs, links |
| `terra-600` | `#A45938` | Pressed states, strong emphasis |

**Accent — Option B: Sage (calm, natural, "countryside")**

| Token | Hex | Usage |
|-------|-----|-------|
| `sage-300` | `#B6C9B0` | Subtle wash |
| `sage-400` | `#97B391` | Hover states |
| `sage-500` | `#7A9E7E` | Primary CTAs, links |
| `sage-600` | `#5D8263` | Pressed states |

The chosen accent is aliased as `accent-{300,400,500,600}` so components reference `accent-*` and the choice is one-line swappable.

### 1.2 Typography

- **Display / Serif:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — variable font with optical-size axis, soft humanist, slightly quirky. Used for H1/H2/H3, hero type, review quotes.
- **Body / Sans:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — clean, modern, generous x-height, friendly but neutral. Used for body copy, nav, buttons.
- **Handwritten accent:** [Caveat](https://fonts.google.com/specimen/Caveat) — reserved **exclusively** for Mom's voice: signature pull-quotes, the "— Mom" byline, handwritten-style captions. Never used for UI chrome.

Loaded via `next/font/google` with `display: 'swap'` and `variable` CSS vars.

```ts
// app/fonts.ts
import { Fraunces, DM_Sans, Caveat } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});
```

Tailwind config snippet:

```ts
// tailwind.config.ts
fontFamily: {
  display: ["var(--font-fraunces)", "Georgia", "serif"],
  sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
  hand:    ["var(--font-caveat)", "cursive"],
},
fontSize: {
  // Editorial scale — slightly larger than default for warmth
  "display-xl": ["clamp(2.75rem, 6vw + 1rem, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
  "display-lg": ["clamp(2.25rem, 4vw + 1rem, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
  "display-md": ["clamp(1.75rem, 2.5vw + 1rem, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
  "body-lg":    ["1.125rem", { lineHeight: "1.65" }],
  "body":       ["1rem",     { lineHeight: "1.7" }],
  "caption":    ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
},
```

### 1.3 Spacing, Rhythm, Layout

- Base Tailwind spacing scale retained.
- Custom spacing additions: `section-y: 6rem` (mobile) → `8rem` (md) → `10rem` (lg). Applied via a `Section` component prop.
- Container max-width: `max-w-6xl` for most sections, `max-w-prose` for long-form copy blocks.
- **Hero pattern:** `min-h-[80svh]` on mobile (uses small-viewport unit to avoid iOS Safari URL-bar jump) → `min-h-[85vh]` on desktop.
- Section bottom rhythm keyed off a 24px baseline; paragraph `max-w-[56ch]` for body text readability.

### 1.4 Radii

Deliberately understated. Big pill radii on photos scream "Framer template."

```ts
borderRadius: {
  photo:  "2px",    // editorial photo edge — feels like print
  card:   "10px",   // informational cards
  pill:   "9999px", // CTAs only
}
```

Photo assets use `rounded-photo` (2px) — a barely-there edge that reads as printed photograph rather than UI chrome.

### 1.5 Shadow

One warm shadow used sparingly. No layered Material Design stack.

```ts
boxShadow: {
  warm: "0 8px 24px rgba(91, 65, 36, 0.12)",
  "warm-sm": "0 2px 8px rgba(91, 65, 36, 0.08)",
}
```

Tinted brown-toned RGBA — shadows on a cream field go muddy if left neutral-gray.

### 1.6 Motion

- Global `prefers-reduced-motion: reduce` honored. Animations become instant state changes.
- Scroll-reveal: small 8–12px fade-up + 0.98→1 scale, 400ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`, triggered once per element via `IntersectionObserver` in the `FadeIn` component.
- **No parallax.** Parallax on scroll is the hallmark of AI-template sites. Skip.
- Hover: 150ms on color, 200ms on transform, no bounce.
- Link underlines animate via `background-size` transition (classic editorial move, not `border-bottom` snap).

### 1.7 Five Distinctiveness Moves (escape the AI-template look)

1. **Asymmetric tilted-photo hero.** Instead of a centered 1200px hero image, the main Mom portrait sits slightly off-axis, rotated -2deg to +1.5deg on md+ screens, with a cream paper texture peeking at the edges. Reads as a printed photograph pinned to a cork board, not a stock-photo hero.
2. **Faint SVG paper-grain texture overlay on `<body>`.** A single inline SVG with turbulence filter, opacity ~0.04, fixed to the viewport. Gives every surface a subtle paper tooth — the tell that separates warm editorial from flat SaaS.
3. **Caveat handwritten font reserved exclusively for Mom's voice.** Every pull quote signed "— Mom" and every "note from Mom" block uses Caveat. Nowhere else. This makes it feel like Mom herself is on the page, not a brand pretending to be her.
4. **Full-bleed photos with a tiny 2px radius.** `rounded-photo` is 2px — invisible at a glance but removes the hard pixel corner. Combined with the warm shadow this reads editorial, not UI.
5. **Oversized low-opacity Fraunces section numbers in the background of section labels.** A `SectionLabel` component renders a big italic Fraunces "01", "02" etc. at ~8rem, `text-cream-200`, absolutely positioned behind the small-caps section label text. Classic magazine-layout move. Very clearly *not* a Framer template.

A 6th quiet move: default link style is `background-image: linear-gradient(accent, accent); background-size: 100% 1px; background-position: 0 92%; background-repeat: no-repeat;` with `transition: background-size 200ms`. Hover expands to `background-size: 100% 40%;` for a soft highlighter-pen effect. Not AI-template.

---

## 2. File Structure

```
moms-korean-experience/
├── app/
│   ├── layout.tsx                    # Root layout: fonts, <body> paper-grain, SiteHeader, SiteFooter
│   ├── page.tsx                      # Home
│   ├── globals.css                   # Tailwind directives + base typography + paper-grain SVG
│   ├── fonts.ts                      # next/font definitions (Fraunces, DM Sans, Caveat)
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
│   └── 03-dev-plan.md                # ← this document
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
    return <main className="p-8"><h1 className="text-2xl">Mom's Korean Experience — bootstrap</h1></main>;
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

### Task 2 — Design system

**Goal:** All design tokens wired (colors, fonts, spacing, shadows). Paper-grain SVG overlay renders site-wide. `/design-preview` route showcases the full system visually — critical for Checkpoint 1 sign-off.

**Files created/modified:**
- `tailwind.config.ts` (full tokens)
- `app/globals.css` (Tailwind directives, base typography, paper-grain overlay)
- `app/fonts.ts` (next/font)
- `app/layout.tsx` (apply font variables + paper grain)
- `app/design-preview/page.tsx` (showcase route)
- `public/textures/paper-grain.svg`
- `lib/cn.ts`

**Steps:**

- [ ] Fill `tailwind.config.ts` with the color/font/radius/shadow tokens from §1. Include both `terra` and `sage` palettes; alias `accent` to the chosen one. Content globs: `./app/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`.
- [ ] Create `app/fonts.ts` per §1.2 (Fraunces, DM Sans, Caveat loaders).
- [ ] Create `lib/cn.ts`:
  ```ts
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
  ```
- [ ] Create `public/textures/paper-grain.svg` — an SVG filter-based turbulence noise, 600x600, opacity baked into the SVG (~0.04). Tileable.
- [ ] Replace `app/globals.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    html { @apply scroll-smooth; scroll-padding-top: 5rem; }
    body {
      @apply bg-cream-50 text-brown-700 font-sans antialiased;
      font-feature-settings: "ss01", "ss02";
    }
    body::before {
      content: "";
      position: fixed; inset: 0;
      background: url("/textures/paper-grain.svg");
      opacity: 0.04;
      pointer-events: none;
      z-index: 100;
      mix-blend-mode: multiply;
    }
    h1, h2, h3 { @apply font-display text-brown-800; }
    ::selection { @apply bg-accent-300 text-brown-900; }
    :focus-visible { @apply outline-none ring-2 ring-accent-500 ring-offset-2 ring-offset-cream-50; }
    a { transition: background-size 200ms ease; }
  }
  ```
- [ ] Update `app/layout.tsx` to attach font variables on `<html>`:
  ```tsx
  import { fraunces, dmSans, caveat } from "./fonts";
  // <html className={`${fraunces.variable} ${dmSans.variable} ${caveat.variable}`} lang="en">
  ```
- [ ] Build `app/design-preview/page.tsx`. Must display:
  1. Type scale: `display-xl` / `lg` / `md`, `body-lg` / `body`, `caption`, one block in Caveat labeled "Mom's voice".
  2. Color swatches: cream 50/100/200/300, brown 600/700/800/900, accent 300/400/500/600.
  3. Buttons: primary (filled accent, pill), secondary (outlined brown, pill), tertiary (text-only w/ highlight-pen link underline). Include hover state examples.
  4. Shadow sample: a photo-sized placeholder with `shadow-warm` and `rounded-photo`.
  5. SectionLabel gimmick preview: small-caps label with giant bg "01".
  6. Link sample paragraph using the highlight-pen underline.

**Verify:**
```bash
pnpm dev
# open http://localhost:3000/design-preview on mobile viewport (Chrome devtools iPhone 14)
```
Expected: paper grain visible on every surface; three fonts load (FOUT fine); no layout shift; tap-targets on buttons ≥ 44px.

**Commit:**
```
feat(design): design system, next/font, paper grain overlay, /design-preview
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
  - Sticky top, `bg-cream-50/85 backdrop-blur`, border-b `border-cream-200`.
  - Left: brand wordmark in Fraunces, 1.25rem, links to `/`.
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

### Task 5 — Reusable components

**Goal:** The library of section + UI primitives pages will assemble from. Built in isolation and previewed at `/design-preview`. This is the gate for Checkpoint 1.

**Files created:**
- `components/ui/Button.tsx`
- `components/ui/FadeIn.tsx`
- `components/ui/PhotoGrid.tsx`
- `components/ui/Lightbox.tsx`
- `components/ui/Pill.tsx`
- `components/sections/Hero.tsx`
- `components/sections/Section.tsx`
- `components/sections/SectionLabel.tsx`
- `components/sections/ExperienceCard.tsx`
- `components/sections/ReviewCard.tsx`
- `components/sections/StepList.tsx`
- `components/sections/MenuCard.tsx`
- `components/sections/IconList.tsx`
- `components/sections/MomQuote.tsx`
- `components/sections/InquiryCTA.tsx`
- `components/sections/InquiryForm.tsx`
- `app/design-preview/page.tsx` (extended to render every component with sample data)

**Steps:**

- [ ] `Button`:
  ```tsx
  type Variant = "primary" | "secondary" | "ghost";
  export function Button({ href, external, variant = "primary", children, className }: Props) {
    const Tag = href ? "a" : "button";
    return <Tag href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      className={cn("inline-flex items-center justify-center rounded-pill px-6 py-3 text-body font-medium transition",
        variant === "primary" && "bg-accent-500 text-cream-50 hover:bg-accent-600 shadow-warm-sm",
        variant === "secondary" && "border border-brown-700 text-brown-800 hover:bg-cream-100",
        variant === "ghost" && "text-brown-800 hover:text-accent-600",
        className)}>{children}</Tag>;
  }
  ```
- [ ] `FadeIn`: wraps children in a div, uses `IntersectionObserver` + CSS transitions. Respects `prefers-reduced-motion`. Unobserves after first reveal. Optional `delay` prop for stagger.
- [ ] `Section`: `<section className="py-[var(--section-y)] ...">`. Takes `label?`, `number?`, `id?`, `className?`. Renders `SectionLabel` inline if label provided. Exposes a `max-w-6xl mx-auto px-6` container inside.
- [ ] `SectionLabel`:
  ```tsx
  export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
    return (
      <div className="relative mb-8">
        <span aria-hidden className="absolute -left-2 -top-14 font-display italic text-cream-200 text-[8rem] leading-none pointer-events-none select-none">{number}</span>
        <p className="relative text-caption uppercase tracking-[0.2em] text-brown-600">{children}</p>
      </div>
    );
  }
  ```
- [ ] `Hero`: accepts `headline`, `subhead`, `ctaLabel`, `ctaHref`, `image`. Asymmetric layout: portrait photo on right (md+), slightly tilted `-2deg`, `shadow-warm`, `rounded-photo`. On mobile the photo sits above the text, tilted `+1.5deg`. `min-h-[80svh]` on mobile, `min-h-[85vh]` desktop. Cream paper peek at edges.
- [ ] `ExperienceCard`: image on top (`aspect-[4/5]`), title in Fraunces `display-md`, one-line blurb, "Learn more →" link. Entire card is a Next `<Link>`. Photo uses `rounded-photo`, `shadow-warm` on hover.
- [ ] `ReviewCard`: avatar (rounded-full 48px), name + location + date, Fraunces italic quote, optional hero photo (rounded-photo) underneath, optional video pill labeled "▶ Watch video (42s)" that opens a modal. Mobile-first single column.
- [ ] `PhotoGrid`:
  - Props: `images: Array<{ src, alt, aspect }>` and `columns?: 2 | 3 | 4`.
  - Renders a CSS grid, mobile = 2 col, md = `columns`.
  - Tapping an image opens the `Lightbox`.
  - Uses `next/image` w/ `sizes="(min-width: 768px) 33vw, 50vw"`.
- [ ] `Lightbox`: portal-based fullscreen overlay. Dismisses on tap-outside, ESC, swipe down on mobile. Arrow keys navigate. Keeps focus trapped.
- [ ] `StepList`: ordered steps with big Fraunces numerals (`display-md`), title + body per step. Horizontal on md+, stacked on mobile.
- [ ] `MenuCard`: square food photo (`aspect-square rounded-photo`), menu key (A/B/C) in Caveat top-left overlay, title in Fraunces, list of dishes as small pills, 1-line blurb.
- [ ] `IconList`: rows of `label — value — note` (used for Getting Around). Label in caption caps, value in Fraunces display-md, note in body muted.
- [ ] `MomQuote`:
  ```tsx
  export function MomQuote({ children }: { children: React.ReactNode }) {
    return (
      <figure className="relative mx-auto max-w-prose py-12 text-center">
        <blockquote className="font-hand text-4xl md:text-5xl leading-snug text-brown-800">“{children}”</blockquote>
        <figcaption className="mt-4 text-caption uppercase tracking-[0.2em] text-brown-600">— Mom</figcaption>
      </figure>
    );
  }
  ```
- [ ] `InquiryCTA`: full-bleed cream-100 band, headline in Fraunces, subhead, primary `Button` that is now an **in-page anchor** to `#inquire` (the id of the `InquiryForm` section at the bottom of every page). Smooth-scroll via the global `html { scroll-behavior: smooth }` + `scroll-margin-top` on the form section. Kept as a lightweight "scroll-to-form" block that mid-page calls-to-action use when the full form would be too heavy inline.
  ```tsx
  export function InquiryCTA({ headline, subhead, ctaLabel = "Send an inquiry" }: Props) {
    return (
      <section className="bg-cream-100 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-display-md text-brown-800">{headline}</h2>
          {subhead && <p className="mt-3 text-body-lg text-brown-700">{subhead}</p>}
          <Button href="#inquire" className="mt-8">{ctaLabel} ↓</Button>
        </div>
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
      return (
        <section id="inquire" className="scroll-mt-24 bg-cream-100 py-24">
          <div className="mx-auto max-w-prose px-6 text-center">
            <p className="font-hand text-4xl text-brown-800">
              Thanks! Eunjung will get back to you within a day or two.
            </p>
            <p className="mt-4 text-body text-brown-700">— 은정 ❤️</p>
          </div>
        </section>
      );
    }

    return (
      <section id="inquire" className="scroll-mt-24 bg-cream-100 py-24">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-display-md text-brown-800">Send Eunjung a note</h2>
          <p className="mt-2 text-body text-brown-700">She'll reply within a day or two.</p>

          <form action={formAction} className="mt-8 space-y-6" noValidate>
            <fieldset>
              <legend className="text-body font-medium text-brown-800">
                Which experience are you interested in? <span aria-hidden>*</span>
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {EXPERIENCES.map((e) => (
                  <label key={e.value} className="inline-flex items-center gap-2">
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
                <p className="mt-1 text-caption text-red-700">{state.fieldErrors.experiences}</p>
              )}
            </fieldset>

            <Field label="Your name" name="name" required error={state.fieldErrors?.name} />
            <Field label="Email"     name="email" type="email" required error={state.fieldErrors?.email} />
            <Field label="Country / city (optional)" name="location" error={state.fieldErrors?.location} />

            <fieldset>
              <legend className="text-body font-medium text-brown-800">Preferred contact channel</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {["Email", "KakaoTalk", "WhatsApp"].map((c) => (
                  <label key={c} className="inline-flex items-center gap-2">
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
              <span className="text-body font-medium text-brown-800">Anything Eunjung should know?</span>
              <textarea name="message" rows={5} className="mt-1 w-full rounded-card border border-cream-300 px-3 py-2" />
            </label>

            {/* Honeypot — hidden, must stay empty */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Do not fill<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <p ref={errorRef} tabIndex={-1} aria-live="polite" className="text-caption text-red-700">
              {state.formError ?? ""}
            </p>

            <Button type="submit" disabled={pending}>{pending ? "Sending…" : "Send inquiry"}</Button>
          </form>
        </div>
      </section>
    );
  }

  function Field({ label, name, error, type = "text", required, ...rest }: FieldProps) {
    return (
      <label className="block">
        <span className="text-body font-medium text-brown-800">
          {label}{required && <span aria-hidden> *</span>}
        </span>
        <input name={name} type={type} required={required} aria-invalid={!!error}
          className="mt-1 w-full rounded-card border border-cream-300 px-3 py-2" {...rest} />
        {error && <span className="mt-1 block text-caption text-red-700">{error}</span>}
      </label>
    );
  }
  ```
  Notes on the sketch:
  - **Every input has a visible `<label>`.** Required fields marked both visually (`*`) and via `required`.
  - **Errors use `aria-live="polite"`** and focus moves to the first error on validation failure.
  - **Honeypot** (`hp_field`) hidden off-screen (not `display: none` — screen readers should still see the label, the visual position keeps it out of sight for sighted users, `tabIndex={-1}` keeps keyboard users from landing in it). Server action rejects any submission where it's non-empty.
  - **`useActionState`** keeps the previous submission's state (field values re-populate via `defaultValue` from `state.values` if the action returns them — omitted from the sketch for brevity, add in implementation).
  - **Success state** fully replaces the form — no redirect, no separate page.
- [ ] `Pill`: small tag with accent-300 background, brown-800 text, rounded-pill. Used for dietary notes ("vegetarian-friendly") and dish lists.
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
     - Custom-request block: cream-100 band with the `cooking.customBlurb` ("Want to cook something else? Tell us.").
     - Dietary block: cream-100 band with the `cooking.dietaryBlurb` and explicit mention of vegetarian / vegan / allergy accommodations.
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
     - Allergy disclosure block (cream-200 band, bold-ish): "Maru, a 14-year-old Schnauzer, lives in the home. If you have dog allergies, this stay isn't for you — and that's okay. Let us know for tours and cooking instead."
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
- [ ] Seed `/public/images/placeholders/` with 4 solid SVGs (`portrait-4x5.svg`, `landscape-16x9.svg`, `square-1x1.svg`, `editorial-3x2.svg`) — cream bg, subtle paper-grain, brown-600 label "placeholder 4:5" etc. These are the offline fallback per asset inventory §4.2.
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
- Add: `public/og-default.jpg` (1200×630 mock — terracotta background, brand name in Fraunces)

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
- [ ] OG image (mock phase): a 1200×630 JPEG at `public/og-default.jpg`. Solid terracotta background with brand name in Fraunces, white. Replace with composed photo+wordmark when real assets land. Per-page OG images (`/images/og/og-tours.jpg` etc.) can be the same default until Mom's portraits are ready.

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
- Paper-grain texture is present but invisible at casual glance — feels like paper, not noise.
- Fraunces at 5xl–7xl looks editorial and warm, not stuffy.
- Caveat in `MomQuote` reads like handwriting, not clip-art. If it looks too cute, dial down the size.
- Terracotta (or sage — pick now) feels right at full saturation as a CTA, and at 10–20% opacity as a wash.
- Section labels: the oversized magazine number reads as decorative background, not as content competing with the H2.
- `ReviewCard` hierarchy reads in order: service tag → quote → author. If anything competes visually, fix the type weights now.
- `StepList` numbers are generous (`text-5xl` Fraunces) and warm. If they feel too heavy, try `font-light`.
- `InquiryCTA` pill button has thumb-friendly padding on mobile (≥ 44px tap target).

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

Status as of 2026-04-18: 3 of 5 resolved. Each item is also tracked in `docs/01-spec-checklist.md`.

1. **Brand name** — **still open.** 5 candidates being generated separately by a parallel subagent for the user to pick from. Drives `content/site.json → brandName`, header logo, footer, all metadata titles, the OG image, and the favicon. Plan uses `Mom's Seoul` as a placeholder until the real name is chosen.
2. **Accent color: terracotta or sage?** — **still open.** A design-research subagent is reviewing references and will recommend a palette. Task 2 builds the design preview around whichever is picked. Switching later is a one-line Tailwind alias change but every screenshot for review needs to match the chosen accent.
3. **Tally form strategy** — **RESOLVED (2026-04-18):** ONE shared form with a "Which experience are you interested in?" first question. Use the placeholder URL `https://tally.so/r/REPLACE_ME` everywhere until the real form exists. Per-service URLs (`tally.tours`, `tally.cooking`, `tally.stay`) collapse into a single `inquiryFormUrl` field in `content/site.json`.
4. **Mom's name strategy** — **RESOLVED (2026-04-18):** Mom's real name is **Eunjung (은정)**. The brand still leans hard on the universal **"Mom"** concept as the marketing hook; "Eunjung" is used when the personal-name register fits (e.g. "Eunjung — your Korean mom in Seoul"). Hangul (`은정`, `엄마`) appears as a light design accent only — confirms the Task 2 typography stack does not need a Korean webfont for body copy.
5. **Final domain** — **RESOLVED (2026-04-18):** Launch on the default Vercel-assigned `<project>.vercel.app` URL. `NEXT_PUBLIC_SITE_URL` defaults to that URL with a comment noting it can be swapped to a custom domain later. Custom domain is deferred.

