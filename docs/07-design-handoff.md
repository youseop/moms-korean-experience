> **⚠️ HISTORICAL REFERENCE — NOT THE CHOSEN DIRECTION**
>
> This document captured the editorial-warm direction produced by claude.ai/design. After comparing it side-by-side with a cute/cozy prototype, the user chose the cute/cozy direction instead. The new source of truth is `docs/08-design-cute-cozy.md` and the prototype at `design-prototypes/cute-cozy/index.html`.
>
> The contents below are preserved for reference, comparison, and in case any visual move (e.g. paper-grain texture, oversized section numbers) is worth borrowing later. The bundled assets at `design-handoff/project/` remain available but are not the implementation source.

---

# 07 — Design Handoff

**Status:** Source of truth for the design system, as of 2026-04-18.
**Supersedes:** `05-design-references.md`, `06-design-direction.md` (see § 6).
**Complements:** `00-site-plan.md` (IA), `03-dev-plan.md` (implementation order).

This document is the bridge between the polished HTML/CSS/JS prototype the user
built on `claude.ai/design` and the real Next.js implementation. It extracts
the tokens, lists the components to port, resolves decisions that were still
open in earlier planning docs, and flags what to skip.

The prototype itself lives at
`/Users/youseoplee/Documents/dev/personal/moms-korean-experience/design-handoff/`.
Do not edit those files as part of production work — they are reference only.

---

## 1. What's in the handoff bundle

Root: `design-handoff/`

| File | Kind | Why it exists |
|---|---|---|
| `README.md` | Meta | Short note explaining this is a handoff from Claude Design; tells a coding agent to read the chat first. |
| `chats/chat1.md` | **Reference — read for intent** | Full transcript of the user iterating with the design assistant. Shows which options were considered and where Youseop landed. |
| `project/screenshots/` | Reference | Reference PNGs captured during iteration. Not needed for implementation — the source is the source of truth. |

Inside `design-handoff/project/` — **the production inputs**:

| File | Lines | Role |
|---|---|---|
| `design-system.css` | 1232 | The heart. Tokens, palettes, type scale, layout primitives, most component classes. Read this most carefully. |
| `directions.css` | ~115 | Direction A / B overlays. Only Direction A ships (§ 5). |
| `content.jsx` | 112 | Home-page copy: Unsplash URLs, 4 tagline variants, 3 `EXPERIENCES`, 3 `REVIEWS`, `GALLERY` items. |
| `detail-content.jsx` | 284 | Copy for Tours, Cooking, Stay: hero, facts, timelines, menus, ingredients, FAQ, reviews, map pins, nearby, walks, maru, etc. |
| `components.jsx` | 186 | Shared primitives: `Photo`, `Section`, `Signoff`, `Nav`, `Drawer`, `DirectionToggle`, `Lightbox`, `useRevealObserver`, `useScrolled`. |
| `sections.jsx` | 387 | Home-page sections: `Hero`, `MeetMom`, `Experiences` + `ExperienceCard`, `Gallery`, `Reviews` + `ReviewCard`, `WhyJeongja`, `Maru`, `Inquire` + `Field`, `Footer`. |
| `detail-components.jsx` | 628 | Detail-page primitives (see § 3). |
| `detail-layout.jsx` | ~90 | `DetailLayout` shell: Nav + Drawer + DirectionToggle + Breadcrumb + Footer + Tweaks + state persistence. |
| `Eunjung's Table.html` | 96 | Home shell. Loads CSS + React UMD + scripts. |
| `Tours.html`, `Cooking.html`, `Stay.html` | ~120 each | Per-page shells that compose `DetailLayout` + the page-specific layout. |
| `tweaks.jsx` | 124 | **Design-tool only.** Don't ship (§ 5). |
| `app.jsx` | 96 | Root React App for the home page. Sets `data-palette`, `data-direction`, `data-hero-font`, CSS vars from state. |

Two `.md` files in `chats/` are human-readable reference only. Everything
that actually renders is in `project/`.

---

## 2. Design tokens

All values below are lifted verbatim from `design-handoff/project/design-system.css`.

### 2.1 Palettes

Three palettes ship as data attributes: `[data-palette="hanok" | "sunlit" | "tancheon"]`.
**Hanok Morning is the production default.** The other two are "alternates if
Eunjung ever wants to try" — see § 5.

| Token | Hanok Morning *(ship)* | Sunlit Kitchen *(alt)* | Tancheon Morning *(alt)* |
|---|---|---|---|
| `--base` | `#FBF6E9` | `#F7F2E8` | `#F8F4EB` |
| `--surface` | `#F4ECD7` | `#EFE7D2` | `#EDE6D2` |
| `--surface-2` | `#EEE3C6` | `#E8DDC2` | `#E5DCC0` |
| `--divider` | `#EBDFC2` | `#E0D2B5` | `#DBD0B4` |
| `--text` | `#3A2A1C` | `#2E2419` | `#2C2B1F` |
| `--heading` | `#241710` | `#1B130C` | `#161611` |
| `--muted` | `#7A604A` | `#6B5641` | `#615E48` |
| `--accent` | `#C76A3F` (terra) | `#B65A3A` | `#6F8F6E` (sage-as-primary) |
| `--accent-dark` | `#9C4F2A` | `#8E3F23` | `#4F6E51` |
| `--accent-wash` | `#EAB893` | `#E1A682` | `#BFCDB6` |
| `--pop` | `#5C7A5A` (sage) | `#7A6B3A` | `#C2714F` |
| `--pop-wash` | `#C8D4BF` | `#D6CB9B` | `#EAC6B0` |

`--pop` is used **for one section only** on Home (`.why-jeongja` in Direction B).
In Direction A (the shipping direction) the pop color is barely visible.

Source: `design-system.css` L9–L59.

### 2.2 Typography

Three families loaded via Google Fonts:

```
Fraunces   — display, ital+opsz 9..144, weights 400/500/600
DM Sans    — body, weights 400/500/600
Caveat     — "Mom's voice" script, weights 400/500/600
```

Fraunces uses variable-font axes: `opsz` (optical size) plus the expressive
`SOFT` and `WONK` features for hero-scale italics. The display utilities
apply these through `font-variation-settings`:

| Utility | Size | Variation settings | Style |
|---|---|---|---|
| `.h-display-xl` | `clamp(2.75rem, 9vw, 3.75rem)` | `"opsz" 144, "SOFT" 50, "WONK" 1` | italic 400 |
| `.h-display-lg` | `clamp(2.1rem, 6.5vw, 2.75rem)` | `"opsz" 120, "SOFT" 50` | italic 400 |
| `.h-display-md` | `1.625rem` | `"opsz" 72` | roman 500 |
| `.h-display-sm` | `1.25rem` | `"opsz" 32` | roman 500 |
| `.eyebrow` | `var(--caption)` | sans 500, 0.18em tracking, uppercase | — |
| `.lead` | `var(--body-lg)` line-height 1.6 | sans 400 | — |
| `.prose` | `var(--body)` line-height 1.65, `max-width: 32rem` | sans 400 | — |
| `.script` / `.signoff` | `1.375rem` | Caveat 500, colored `--accent-dark` | — |
| `.caption` | `var(--caption)`, 0.02em tracking | sans, `--muted` | — |

Body size scale:

```
--body-lg : 1.0625rem
--body    : 0.9375rem
--caption : 0.75rem
```

Source: `design-system.css` L62–L216.

### 2.3 Radii, shadows, grain, wrapper

| Token | Value |
|---|---|
| `--radius-photo` | `2px` (intentionally tiny — this is a defining detail) |
| `--radius-pill` | `9999px` (buttons, chips, FAB) |
| `--shadow-warm` | `0 1px 2px rgba(58,42,28,0.06), 0 14px 32px -18px rgba(58,42,28,0.22)` |
| `--shadow-lift` | `0 2px 4px rgba(58,42,28,0.08), 0 22px 48px -20px rgba(58,42,28,0.28)` |
| `--grain-opacity` | `0.09` |
| `--measure` | `32rem` (prose max-width) |

**Photo grade** — applied via CSS filter on every `.photo img`:

```css
filter: saturate(0.92) sepia(0.06) contrast(1.02) brightness(1.01);
```

**Photo tilt** — optional `-1.5deg` (configurable via `--tilt-angle`, set to
`0deg` by Direction A). Applied through `.photo-tilt` / `.photo-tilt--right`.

**Paper grain** — fixed-position, full-viewport, `mix-blend-mode: multiply`,
SVG `feTurbulence` encoded inline:

```
background-image: url("data:image/svg+xml;utf8,
  <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.82'
                    numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix values='0 0 0 0 0.22  0 0 0 0 0.16  0 0 0 0 0.1  0 0 0 0.55 0'/>
    </filter>
    <rect width='200' height='200' filter='url(#n)'/>
  </svg>");
background-size: 240px 240px;
opacity: var(--grain-opacity);   /* 0.09 default */
mix-blend-mode: multiply;
```

**Page wrapper** (load-bearing):

```css
.page {
  max-width: 420px;
  margin: 0 auto;
  background: var(--base);
  min-height: 100vh;
  overflow-x: hidden;
  box-shadow: 0 0 80px rgba(36,23,16,0.08);
}
html, body { background: #2a1f14; }   /* dark brown "outside" */
```

This makes desktop show the mobile layout as a **centered narrow column**
against a dark-brown canvas (see § 6 decision 5). No responsive breakpoints
widen the layout.

Source: `design-system.css` L80–L89, L218–L231, L291–L318, L108–L119;
`Eunjung's Table.html` L47–L51.

### 2.4 Motion

Baseline motion is minimal:

- Reveal: `.reveal` elements are **visible by default**. `.is-visible` triggers
  a one-shot `revealRise` keyframe (14px rise + fade). If JS fails, content
  still shows. `animation: revealRise 0.7s cubic-bezier(.2,.7,.2,1) both`.
  Source: `design-system.css` L320–L331.
- Hover on photo: `transform: scale(1.02)` over 500ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Button hover: 150ms. `.arrow` translates 3px on hover.
- `prefers-reduced-motion: reduce` disables `revealRise`.

### 2.5 Oversized section number (signature move)

`.section-number` — absolute-positioned, top-right, `7rem` Fraunces italic
opsz-144, colored `--accent`, `opacity: 0.08`. Rendered per section via
`<span class="section-number" aria-hidden>02</span>` (or similar).
Direction A reduces it to `5rem` / `0.05` opacity.
Source: `design-system.css` L237–L251, `directions.css` L17.

---

## 3. Component inventory (port targets)

Every component below lives in a `.jsx` file as a plain function, wired to
`window.X` at the bottom for global access. In Next.js, each becomes a
React/TSX component — prefer `components/` for shared primitives and
`app/<route>/` for page sections.

### 3.1 Layout primitives (`components.jsx`)

| Component | Source | Purpose |
|---|---|---|
| `Photo` | L6–L20 | Wraps `<img>` with `.photo` class, aspect ratio, optional tilt, optional rotation custom prop (`--rot`), optional `onClick` for Lightbox. |
| `Section` | L23–L35 | Wraps a `<section>` with optional `number` (oversized backdrop) and `eyebrow`. Accepts `id` for sub-nav anchoring. |
| `Signoff` | L38–L45 | Renders `"— Eunjung"` in Caveat. Variant prop supports `"eunjung"` / `"mom"` / `"um-mom"` — ship with `"eunjung"` hard-wired (see § 6). |
| `Nav` | L48–L60 | Sticky top nav. Brand on left, Menu button on right. Adds `.is-scrolled` border when `scrolled`. |
| `Drawer` | L62–L98 | Slide-in right drawer. 5 links (Home / Tours / Cooking / Stay / Inquire). Escape closes. |
| `Lightbox` | L123–L146 | Modal for enlarged gallery images. Escape closes, body scroll-locked while open. |
| `useRevealObserver` | L149–L170 | `IntersectionObserver` that adds `.is-visible` once. |
| `useScrolled` | L173–L181 | Hook returning `true` when `scrollY > 12`. |

### 3.2 Home-page sections (`sections.jsx`)

| Component | Source | Purpose |
|---|---|---|
| `Hero` | L6–L38 | Section 01. Eyebrow + Photo + `h1` tagline (pre-line for `\n`) + lead + two CTAs. |
| `MeetMom` | L41–L73 | Section 02. Heading + portrait + 3 paragraphs + script quote + `Signoff`. |
| `ExperienceCard` | L76–L96 | One of three. Photo + kicker + title + blurb + link. |
| `Experiences` | L99–L113 | Section 03. Maps `EXPERIENCES` → 3 cards. |
| `Gallery` | L116–L148 | Section 04. 2-col grid of 6 `Photo` with rotation, click opens Lightbox. |
| `ReviewCard` | L151–L183 | Eyebrow + italic blockquote (Fraunces) + avatar + name/where. |
| `Reviews` | L186–L198 | Section 05. Maps `REVIEWS` → 3 cards. |
| `WhyJeongja` | L201–L238 | Section 06. Heading + prose + 2×2 grid of distance facts. Uses `--pop`/`--pop-wash` in Direction B. |
| `Maru` | L241–L255 | Section 07. Small centered photo + Caveat one-liner + caption. |
| `Inquire` | L258–L355 | Section 08. 4-field form with experience chip picker; optimistic success state. |
| `Field` | L357–L366 | Label wrapper used inside `Inquire`. |
| `Footer` | L369–L385 | Site footer. |

### 3.3 Detail-page primitives (`detail-components.jsx`)

| Component | Source | Purpose |
|---|---|---|
| `DetailHero` | L3–L14 | Kicker (Caveat) + title (Fraunces italic opsz-144) + lead + framed Photo with dotted border offset. |
| `FactStrip` | L16–L29 | 2-col `<dl>` of key/value facts (group size, duration, price, etc.). |
| `Timeline` | L31–L55 | Ordered list with counter-increment decimal-leading-zero numbering; each item has optional `time`, `title`, `body`, and `stops[]`. |
| `Pullquote` | L57–L66 | Italic serif pullquote + Caveat cite, bordered top/bottom. |
| `DetailGallery` | L68–L89 | 2-col grid like Home `Gallery`. |
| `SubNav` | L92–L139 | Sticky-below-nav pill row; scroll-spy highlights active section. |
| `FloatingCTA` (Fab) | L142–L156 | Floating pill button, fades in after 600px scroll; pulsing dot. |
| `FAQ` | L159–L175 | Native `<details>`/`<summary>` accordion with plus/minus glyph. |
| `Reviews` (detail) | L178–L191 | Left-bordered card list. **Named clash with Home `Reviews`** — see § 5 note on port. |
| `Process` | L194–L211 | Numbered steps (large Fraunces italic numerals). |
| `HandDrawnMap` | L214–L292 | Inline SVG with grid pattern, wavy Han river, dashed road, pins with labels, scale bar, legend. `showRoute` toggles a dashed accent polyline. |
| `IngredientsGrid` | L295–L310 | 2-col (3-col ≥ 560px) grid of name/Korean-caption/note. |
| `RecipeTabs` | L313–L353 | Tabs across 3 menus; each reveals a `.menu-card`. |
| `FloorPlan` | L356–L423 | Inline SVG floor plan (guest room, bath, kitchen, balcony, compass) + legend. |
| `Nearby` | L426–L440 | 2-col `<dl>` of place / distance. |
| `HouseRooms` | L443–L458 | Timeline-shaped list of rooms (size + body). |
| `MaruCard` | L461–L498 | Photo + name + breed + body + habits list. |
| `Walks` | L501–L529 | List of 3 nearby walk recommendations. |
| `CrossSell` | L532–L589 | "Keep looking" row showing the other two experiences. |
| `NoteStrip` | L592–L594 | Quiet Caveat callout, dotted top/bottom borders. |
| `DetailClose` | L597–L621 | Closing CTA back to home inquiry form. |

### 3.4 Layout shell (`detail-layout.jsx`)

| Component | Purpose |
|---|---|
| `DetailLayout` | Wraps each detail page: Nav + Drawer + DirectionToggle + breadcrumb + children + Footer + Tweaks. In production, strip DirectionToggle + Tweaks (§ 5). |

### 3.5 Component count

**Total to port: 33** (8 primitives, 12 home sections, 20 detail primitives,
minus duplicates/helpers). In Next.js these collapse to roughly:

- 8 shared primitives in `components/`
- ~12 Home sections in `app/page.tsx` or `components/home/`
- ~20 detail primitives in `components/detail/`
- 3 page compositions (`app/tours`, `app/cooking`, `app/stay`)

---

## 4. Page structures

Sections are numbered the way the prototype labels them (oversized corner
number). Use the same numbering in production.

### 4.1 Home — `Eunjung's Table.html` → `app/page.tsx`

Source: `app.jsx` L70–L90.

| # | Section | Component |
|---|---|---|
| — | Top nav | `Nav` + `Drawer` |
| 01 | Hero | `Hero` (tagline default: variant 0) |
| 02 | Meet Eunjung | `MeetMom` |
| 03 | Three ways to spend time | `Experiences` |
| 04 | From her phone (gallery) | `Gallery` + `Lightbox` |
| 05 | What guests say | `Reviews` (home variant) |
| 06 | Why Jeongja | `WhyJeongja` |
| 07 | House resident (Maru) | `Maru` |
| 08 | Ask Eunjung | `Inquire` |
| — | Footer | `Footer` |

### 4.2 Tours — `Tours.html` → `app/tours/page.tsx`

Source: `Tours.html` L60–L128.

1. `SubNav` (courses, map, reviews, booking, faq)
2. `DetailHero`
3. Ribbon — *"Not scripted. Just the places she loves."*
4. `FactStrip`
5. `NoteStrip` — adjusts to you
6. `Timeline` — "Four days she can build"
7. `HandDrawnMap` — with route-line toggle button
8. `Pullquote`
9. `Reviews` (detail variant)
10. `Process` — "Four messages, usually."
11. `FAQ`
12. `DetailGallery`
13. `CrossSell`
14. `DetailClose`
15. `Lightbox` + `FloatingCTA`

### 4.3 Cooking — `Cooking.html` → `app/cooking/page.tsx`

Source: `Cooking.html` L58–L114.

1. `SubNav`
2. `DetailHero`
3. Ribbon — *"The pot's already on. Come on in."*
4. `FactStrip`
5. `RecipeTabs` — 3 menus (kimbap / bulgogi / seasonal banchan)
6. `IngredientsGrid`
7. `NoteStrip` — allergies, needs
8. `Timeline` — "Three unhurried hours."
9. `Pullquote`
10. `Reviews`
11. `FAQ`
12. `DetailGallery`
13. `CrossSell`
14. `DetailClose`
15. `Lightbox` + `FloatingCTA("Book a class")`

### 4.4 Stay — `Stay.html` → `app/stay/page.tsx`

Source: `Stay.html` L57–L120.

1. `SubNav`
2. `DetailHero`
3. Ribbon — *"The kettle's always on. You'll find your rhythm."*
4. `FactStrip`
5. `Timeline` — "A day in the house"
6. `FloorPlan`
7. `HouseRooms`
8. `NoteStrip` — she locks up by 11
9. `MaruCard`
10. `Nearby` — "Close to the subway, quiet from it."
11. `Walks`
12. `Pullquote`
13. `Reviews`
14. `FAQ`
15. `DetailGallery`
16. `CrossSell`
17. `DetailClose`
18. `Lightbox` + `FloatingCTA("Ask about dates")`

---

## 5. Things to skip when porting to production

The prototype is also a live design tool. Several pieces exist to support
that tool and should **not** ship:

| Skip | Why | Port as |
|---|---|---|
| `DirectionToggle` (`components.jsx` L101–L120) + `directions.css` | Exploration overlays; the user saw both and didn't pick "maximal." | Pick **Direction A** as the baseline. Delete Direction B rules. Delete the toggle UI entirely. The base design-system.css stands alone. |
| `Tweaks` panel (`tweaks.jsx`) | Live theme tweaker, used during iteration. | Delete. |
| Hero font swap via `[data-hero-font="..."]` (HTML `<head>` inline styles) | Fraunces was the only serious contender. | Hard-wire `fraunces-italic`. Remove the Playfair / DM Serif / Instrument font imports. |
| `.hero__tag-backdrop` ("Mom" text behind hero) | Direction A already `display: none`s it. | Delete the `<span>` in `Hero`. |
| `sunlit` + `tancheon` palettes | Youseop locked in Hanok Morning. | Leave the CSS palette blocks present but unused (documented as "available alternates" for future). Do not wire a UI switcher. |
| `?v=4` cache-busters on `<link>` / `<script>` | Manual cache-busting for the iframe preview. | Next.js handles this via asset hashing. |
| Inline `<style>.reveal { opacity: 1 }</style>` fallback | Belt-and-suspenders for the design iframe. | Already the default in `design-system.css` L323. Delete. |
| React + ReactDOM + Babel UMD `<script>` tags | Runtime-compiled JSX. | Replaced by Next.js's build. |
| `window.parent.postMessage(...)` edit-mode plumbing (`app.jsx` L41–L49, `detail-layout.jsx` L37–L45) | Talks to the claude.ai/design host. | Delete entirely. |
| `EDITMODE-BEGIN` / `EDITMODE-END` comment markers | Host tool tokens. | Delete. |
| `localStorage` state for direction / palette / signoff / grain / tiltAngle | Existed to persist Tweaks choices. | Delete. Everything is fixed at build time. |
| Named clash — `Reviews` is defined in both `sections.jsx` L186 and `detail-components.jsx` L178 | The prototype relied on script-load order. | Rename on port: `HomeReviews` vs `DetailReviews` (or put them in separate files/folders). |

---

## 6. Decisions that override existing project docs

**These are resolved. Treat as binding unless the user explicitly pushes back.**

### 1. Hangul integration: **NONE.**

Chat transcript `chats/chat1.md` L84: *"한글 없이 영어만."* English only.
No oversized Hangul glyph, no bilingual captions, no Korean signoff.

This **overrides** `01-spec-checklist.md` (which previously decided "light
sprinkle — 은정/엄마 as accents") and `06-design-direction.md` (which
cited Hangul as a texture element). The prototype has precisely zero
Hangul in user-facing copy (only the unused "엄마 / Mom" signoff variant
in `tweaks.jsx`, which won't ship).

Caveat: the `IngredientsGrid` component on the Cooking page *does* show
short Hangul labels like `간장` / `고춧가루` as tiny uppercase captions
under each ingredient's English name (`ingredient__ko` class,
`design-system.css` L978–L985). This is **ingredient-label typography, not
Hangul integration** — treat it as English content with a Korean gloss,
same as the menu cards' `menu-card__ko`. Keep it.

### 2. Mom signoff style: **`— Eunjung`** in Caveat.

Chat L85. Resolves the "still open" status. `Signoff` variant `"eunjung"`
renders `"— Eunjung"`. Ship this one; remove the `"mom"` and `"um-mom"`
variants and remove the style prop.

### 3. Palette: **Hanok Morning**.

Chat L87 ("Tweaks로 세 가지 모두 토글 가능하게" was for exploration;
the default selection never changed). Terra (`#C76A3F`) as primary
accent, sage (`#5C7A5A`) as one-section pop. Resolves the "still open"
status in `03-dev-plan.md` § 6.

### 4. Tagline default: **"Your Korean mom in Seoul."**

`content.jsx` L33 (`TAGLINES[0]`). Three other variants live in
`TAGLINES[1..3]` — keep the array in content, but the Home `Hero` ships
with index 0. Don't build a picker UI.

### 5. Page width: **420px max, centered, dark brown bg outside.**

`design-system.css` L222; `Eunjung's Table.html` L48–L51. This is
**more aggressive than "mobile-first"** — it's "mobile-only layout,
centered narrow column on desktop." A responsive breakpoint that widens
the column is not desired.

The only desktop-aware rule is a thin vertical border at `min-width: 600px`
(`design-system.css` L229–L231) to visually separate the column from the
dark-brown canvas. Keep that.

### 6. Aesthetic direction: **warm-editorial, not scrapbook.** ⚠️

The prototype lands on:

- Fraunces italic at opsz-144 with `SOFT 50` / `WONK 1`
- Oversized faded section numbers (02, 03 … at 7rem / 0.08 opacity)
- 2px photo radius
- Paper grain overlay at 9%
- `-1.5°` photo tilt (Direction A zeros this out — so essentially no tilt)
- Satoyama-Jujo-meets-Alison-Roman vibe

This **does not match** `05-design-references.md` and `06-design-direction.md`,
which framed a **"cute / cozy / scrapbook"** direction with washi tape,
polaroid frames, handmade textures, etc. That vocabulary is nowhere in the
prototype.

Interestingly, `05-design-references.md`'s *first* reference pass had also
cited Satoyama Jujo and Alison Roman — so the handoff is a return to the
original taste after the intermediate scrapbook detour.

**Action required from the user — pick one:**

> (a) **Accept the handoff.** Add a one-line "SUPERSEDED by
> `07-design-handoff.md` (2026-04-18)" note at the top of `05-design-references.md`
> and `06-design-direction.md`. Proceed to build.
>
> (b) **Reject the handoff.** Go back to claude.ai/design and re-prompt with
> the cute/cozy/scrapbook direction. This doc, the dev-plan design-system
> rewrite, and most of the CSS would then be discarded.

The rest of this doc assumes (a). If (b), stop before implementation.

---

## 7. Implementation handoff — next steps

Before writing a single line of production code:

1. **Rewrite `03-dev-plan.md` § 1 "Design System"** to mirror the handoff
   tokens from § 2 of this doc. (A sibling subagent is already handling
   this; coordinate before editing.)
2. **Sweep `01-spec-checklist.md`** for items the handoff resolved:
   - Hangul integration: set to "none"
   - Signoff: set to `— Eunjung`
   - Palette: set to Hanok Morning (single palette)
   - Home tagline: set to `"Your Korean mom in Seoul."`
   - Page width: note 420px mobile-only centered column
3. **Mark `05-design-references.md` and `06-design-direction.md` as SUPERSEDED**
   with a one-line header pointing to this doc (assuming decision 6a above).
4. **Copy the tokens from § 2 into `tailwind.config.ts`** as CSS-var-backed
   tokens (`colors.base`, `colors.accent`, etc.) and load Fraunces / DM Sans /
   Caveat via `next/font/google`.
5. **Port components in the order they appear in § 3** — primitives first,
   then home sections, then detail primitives, then page compositions.
6. **Then start Task 1 (Project bootstrap)** of `03-dev-plan.md`.

---

*End of handoff doc.*
