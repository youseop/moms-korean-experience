# 08 — Design Synthesis: Cute / Cozy / Scrapbook Direction

**Status:** Source of truth for the design system, as of 2026-04-18.
**Prototype:** `design-prototypes/cute-cozy/index.html`
**Historical (rejected) alternative:** `docs/07-design-handoff.md` + `design-handoff/project/` (the polished editorial direction — preserved for reference only).

---

## 1. What this doc is

This document captures the **cute / cozy / scrapbook** design direction the user picked after comparing two explored prototypes side-by-side. The single-file HTML prototype at `design-prototypes/cute-cozy/index.html` (~969 lines, no JS, inline SVG for every decoration) is the canonical source for palette, typography, spacing, and decorative primitives — when this doc and the prototype disagree, the prototype wins.

`docs/07-design-handoff.md` describes a **parallel, historical** editorial-warm direction (Fraunces / Hanok Morning / paper-grain) that was produced by `claude.ai/design`. It is preserved as a comparison reference but is **not** the direction being shipped. Do not port from its CSS.

Tonally: this is a mom's scrapbook. Photos are polaroids held down with washi-tape. Section headers are scrawled in Caveat, not set in italic Fraunces. The dominant voice is warm and personal — the page is the table, Eunjung is hosting.

---

## 2. Design tokens (extracted from prototype)

All values below are copied verbatim from the `<style>` block in `design-prototypes/cute-cozy/index.html`. Preserve hex values exactly when porting.

### 2.1 Color palette

| CSS var | Hex | Role |
|---------|-----|------|
| `--paper` | `#FDF5E6` | Cream page background (inside the 420px column) |
| `--paper-deep` | `#F7E9CE` | Slightly darker cream for seams / alt surfaces |
| `--kraft` | `#D4B896` | **Desktop outside background** (warm kraft, replaces `#2a1f14`) |
| `--peach` | `#FFD4B5` | Accent / washi tape / service tag (Tours) |
| `--pink` | `#F4B5BB` | Accent / washi tape / "boss" kicker / wave underline |
| `--sage` | `#B5D5B5` | Accent / washi tape / service tag (Cooking) / P.S. kicker |
| `--sky` | `#C8E0EC` | Accent / washi tape / service tag (Stay) |
| `--butter` | `#FFE8A3` | Accent / sticky-note background / kicker chip / star fill |
| `--tomato` | `#E94B3C` | **Punctuation pop** — use sparingly, max one element per section |
| `--cocoa` | `#5C4033` | Body text |
| `--ink` | `#3A2820` | Doodle ink (hand-drawn SVG strokes) |
| `--ink-soft` | `#6B4E3D` | Muted text / doodle ink variant |

Shadows:

| Var | Value |
|-----|-------|
| `--shadow` | `0 6px 14px rgba(58, 40, 32, 0.18)` |
| `--shadow-soft` | `0 3px 8px rgba(58, 40, 32, 0.12)` |

### 2.2 Typography

Four Google Fonts families, each with a narrow job. All loaded in a single `<link>` in the prototype; port to `next/font/google`.

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=Patrick+Hand&family=Indie+Flower&display=swap" rel="stylesheet">
```

| Var | Family | Weights | Role |
|-----|--------|---------|------|
| `--font-hand` | Caveat | 400, 500, 600, 700 | **Dominant display voice.** H1 (64px), H2 (42px), card H3 (38px), Maru H3 (34px), pullquote (26px), pull-note (24px), polaroid captions (18–22px), footer tagline (32px), hero "hello" (22px), arrow-note (20px). |
| `--font-body` | Nunito | 400, 500, 600, 700, 800 | Body copy (14–15px), hero sub, paragraphs, footer sub, fine print. |
| `--font-print` | Patrick Hand | 400 | Rubber-stamped / printed labels — topbar menu (14px), section kicker chips (13px), service tags (13px), meta lines (13px), CTA button text (18px), "mom's favorite" sticker text (11px), cta-link labels (15px). |
| `--font-marker` | Indie Flower | 400 | **Signatures only.** Pullquote sig, sticky-note sig — "— Eunjung" / "— E." in tomato (17px / 16px). |

Specific size anchors from the prototype:

- Hero `h1`: `font-hand` 700, **64px**, `line-height: 0.92`, `-0.01em` tracking. The "in Seoul." span drops to **54px**.
- Section `h2`: `font-hand` 700, **42px**, `line-height: 1`.
- Hero `sub` (Nunito): **15px**, `line-height: 1.55`, max-width 290px.
- Body paragraphs: **14.5–15px** Nunito, `line-height: 1.55–1.65`.
- Captions / kickers (Patrick Hand): **13px**.

### 2.3 Spacing / rhythm

| Token | Value | Role |
|-------|-------|------|
| Page max-width | `420px` | Hard constraint. No breakpoint opens it up. |
| Body top/bottom padding | `28px 0 60px` | Space between the page column and the viewport edges. |
| Page bottom padding | `40px` | Internal bottom gutter. |
| Horizontal section padding | `22px` | Stays constant across hero / meet / experiences / foot. |
| Divider margin | `28px auto` | Between sections. |
| Card top margin | `40px` | Between experience cards. |
| Pull-quote margin | `30px 18px 10px` | |
| Sticky-note margin | `36px 26px 20px` | |

The page bleeds its decorations (tape, tags, doodles, badges) past the `.photo-wrap` edges but never past the 420px column — the paper itself is the hard bound.

### 2.4 Photo treatment — polaroid frame

The core photo primitive. Every `<img>` on the site is wrapped in a `.polaroid`.

```css
.polaroid {
  background: #fffdf7;            /* off-white paper */
  padding: 12px 12px 44px;        /* big bottom for caption */
  box-shadow: var(--shadow);      /* 0 6px 14px rgba(58,40,32,0.18) */
  display: inline-block;
  position: relative;
}
.polaroid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.05) contrast(0.98);   /* slight warmth */
}
.polaroid .caption {
  position: absolute;
  left: 0; right: 0; bottom: 8px;
  text-align: center;
  font-family: var(--font-hand);            /* Caveat */
  font-size: 22px;
  color: var(--cocoa);
  line-height: 1;
}
```

Tilt: the `.photo-wrap` (or `.polaroid` directly) carries a `transform: rotate(-3deg)` / `-2.5deg` / `+2deg` / `-1.5deg` — the tilt defaults feel like "laid down by hand, not snapped to grid." Safe range: **±4°**. Stay inside it; more reads accidental.

Aspect ratios in the prototype: hero `4/5`, meet `1/1`, card `5/4`, Maru `1/1`. Caption area below the image is a fixed 44px.

### 2.5 Decorative SVG patterns

All decorative SVGs are **inline in the prototype** (no sprite sheet, no external files). On port, each becomes a React component under `components/decoration/` and gets a `currentColor` / prop-driven fill where practical. Stroke style is consistent:

- Stroke width **1.8–2.4px**
- `stroke-linecap: round`, `stroke-linejoin: round`
- Stroke color: `var(--ink)` or `var(--ink-soft)` for doodles; `var(--tomato)` for arrow / underline / accent marks
- Fill: usually none, or a soft palette color (peach / butter / sage) for hearts / stars / badges

**Washi tape** (`.washi`):
- Width: 60–80px, height: 18–22px
- Background: solid palette color (peach / pink / sage / sky / butter) at **0.88 opacity**
- Inner `::before` adds 4px repeating white stripes at 25% opacity via `mix-blend-mode: overlay` — gives the paper-tape fiber illusion
- Shadow: `0 1px 2px rgba(58,40,32,0.15)`
- Rotated `-18°` / `+22°` / similar per-instance

**Hand-drawn arrows** (hero CTA arrow, footer arrow, card "see the tours →" chevron): quadratic path with a chevron head, stroke-width 1.8–2.2px, stroke `var(--tomato)` for punch.

**Hearts** (hero floater, maru "heart-bounce", CTA micro-heart): same underlying 5-point cordate path at different scales and fills. The Maru heart animates with `@keyframes bounce` (translateY -6px, rotate ±6deg, 1.6s ease-in-out infinite).

**Stars** (5-point): two variants in the hero, one filled butter, one filled sage.

**Scribble underline** (hero `h1 .underline`, section `h2 em`, meet `.wave`): SVG `path` with a bouncy `Q`/`T` curve, painted inline as a data URL `background-image` under the text — expressed in `::after` pseudo-elements.

**Push pin** (pull-quote top): 20px circle, tomato fill, cocoa stroke, white highlight dot.

**Sticker badge** ("mom's favorite"): 100px circle, tomato fill, dashed white inner ring, text on a circular `textPath` in Patrick Hand. Rotated `+12°`, drop-shadow.

**Scribble dividers**: horizontal wavy `path`, stroke 1.4px ink-soft, opacity 0.5. Variants include a dot in the middle, or a small `X` mark.

**Torn-paper top edge** (Maru block `.maru::before`): data-URL SVG with a `M…Q…T…` path drawn to fake a torn edge, filled with the card's own background color so it sits flush.

### 2.6 Paper / page texture

Two layers, both baked into `.page` pseudo-elements — nothing fixed to the viewport like in the editorial handoff.

1. **Dot-grid paper grain** (`body` background):
   ```css
   background: var(--kraft);
   background-image:
     radial-gradient(rgba(58,40,32,0.08) 1px, transparent 1px),
     radial-gradient(rgba(58,40,32,0.06) 1px, transparent 1px);
   background-size: 3px 3px, 7px 7px;
   background-position: 0 0, 1px 2px;
   ```
2. **SVG turbulence noise on `.page::before`** (7% opacity, `mix-blend-mode: multiply`) — gives the cream paper a faint tooth.
3. **Faint notebook ruling on `.page::after`**: 32px horizontal lines at ~8% opacity. Near-invisible but adds "paper you can write on."

`.page > *` gets `position: relative; z-index: 2;` so content sits above both pseudo-layers.

---

## 3. Component inventory — port targets

Each component below maps to a chunk of the prototype. Line ranges refer to `design-prototypes/cute-cozy/index.html`.

### 3.1 Layout

| Component | Source lines | Role |
|---|---|---|
| `PageFrame` (or keep as `<div class="page">` inside `layout.tsx`) | L55–L86 (`.page`, `.page::before`, `.page::after`) | 420px cream-paper column, paper grain, notebook lines. |
| `TopBar` | L89–L116, markup L679–L682 | "Eunjung's Table" wordmark (Caveat, tilted -2°) + dashed-circle "menu" button. |
| `Footer` (scaffold — needs full design still, see §4) | L611–L666, markup L936–L965 | Tagline + subline + CTA + address hint + "fine" line + doodle arrow. |

### 3.2 Sections

| Component | Source lines | Role |
|---|---|---|
| `Hero` | CSS L118–L277, markup L685–L745 | "hi hi!" greeter, big Caveat H1, portrait polaroid with two washi tapes, drawn arrow + "tap this!" note + tomato pill CTA. |
| `SectionHeader` | L280–L315, markup L755–L758 | Butter-chip kicker (`#01 · meet mom`) + two-line Caveat H2 with an `<em>` word scribble-underlined in tomato. |
| `MeetEunjung` | L326–L407, markup L760–L795 | Body paragraph, pair of overlapping polaroids with washi tape, second paragraph, pinned pull-quote. |
| `PullQuote` (pinned note variant) | L367–L407, markup L786–L794 | Dashed-border note with a tomato push-pin top-center, pink tape top-left, Caveat body, Indie Flower sig. |
| `Experiences` + `ExperienceCard` | L409–L505, markup L803–L892 | Three asymmetric cards (odd = left-aligned text, even = right). Photo wrap tilted, washi tape top, service tag (peach/sage/sky), optional "mom's favorite" circular sticker (card 2), Caveat H3, Nunito body, Patrick Hand `cta-link` with mini chevron arrow. |
| `MaruBlock` | L507–L576, markup L899–L927 | Rounded note card with torn-paper top edge. 150px square polaroid with pink tape, text block (Caveat H3 + meta + body), animated heart in the corner (`@keyframes bounce`). |
| `StickyNote` (butter sticky note) | L579–L608, markup L930–L933 | Butter background, sage tape on top, Caveat body, Indie Flower sig in tomato. |
| `FooterCta` / `Foot` | L611–L666, markup L936–L965 | Kicker "p.s.", Caveat tagline, Nunito sub, second tomato CTA, hint, fine-print line, doodle arrow. |

### 3.3 Decorative primitives — `components/decoration/`

| Component | Source lines | Role |
|---|---|---|
| `Polaroid` | CSS L174–L204 | White-paper photo frame with caption slot. Props: tilt, aspect, caption, size. |
| `WashiTape` | CSS L207–L230, L497–L505 | Colored tape strip. Props: color (`peach/pink/sage/sky/butter`), width, rotation, position. |
| `PushPin` | Inline SVG L788–L791 | 20px tomato circle pin. Used on pinned notes. |
| `StickerBadge` | Inline SVG L841–L850 | Circular "mom's favorite" badge with circular textPath. Props: label, color. |
| `HandArrow` | Inline SVG L738–L742 (hero), L937–L941 (footer), L828–L831 (card link mini) | Quadratic-path arrow with chevron head. Props: variant (hero-curve / footer-hook / mini), color. |
| `DoodleHeart` | Inline SVG L688–L691 (hero floater), L906–L909 (Maru bouncer), L733–L735 / L953–L955 (CTA micro) | Cordate heart SVG. Props: fill, stroke, size, animate (`bounce`). |
| `DoodleStar` | Inline SVG L692–L699 | 5-point star. Props: fill (butter / sage), rotation. |
| `ScribbleUnderline` | CSS L149–L161 (hero), L308–L315 (section), L341–L348 (wave) | `::after` / inline-positioned SVG path painted under an inline span. Props: color, wavy/straight, length. |
| `ScribbleDivider` | CSS L318–L323, markup L748–L752, L797–L801, L894–L897 | Full-width wavy SVG divider. Variants: plain, dot-center, x-mark. |
| `TornPaperTop` | CSS L517–L525 | `::before` data-URL SVG edge. Props: fillColor (matches the card bg). |
| `Squiggle` | Inline SVG L700–L703 | Small wavy line. Used as decorative floater. |

Porting guidance: keep each SVG inline in the component (no sprite sheet, no external assets) — they're tiny and inline-ing keeps them stylable via `currentColor`.

---

## 4. What's MISSING from the prototype

The prototype covers the **home page only**, and even there several sections from `00-site-plan.md` are absent. These must be designed in the cute/cozy language before launch. Calling them out explicitly so nothing gets accidentally skipped.

| Missing piece | Present in editorial handoff? | Status |
|---|---|---|
| **Gallery section** on Home | Yes | Needs design. Likely: a polaroid photo-cluster with mixed tape colors, rotated ±3°, 6 images in a loose grid. |
| **Reviews section** on Home (`ReviewCard`) | Yes | Needs design. Likely: each review as a torn-edge note card (like Maru's block) with a tiny guest-avatar polaroid, Caveat quote, Indie Flower sig. |
| **WhyJeongja section** (lives on Stay, but home handoff also had it) | Yes | Needs design — maybe a "passport-stamp" cluster of small peach/sage/sky badges stating "Tancheon 5 min" etc. |
| **Inquire form** (actual fields, not just the CTA pill) | Yes (`Inquire` L258–L356 in editorial JSX) | **Critical.** Prototype only has the `come over for dinner` / `write to Eunjung` button. Form inputs, labels, radio/checkbox styling, error messaging, success state all need cute/cozy treatment — the "mom writing you a note back" framing should probably drive the form visuals. |
| **Footer (full)** | Yes | Prototype's `.foot` is close, but we still need: social links row (or explicit "no socials" decision), sitemap-esque "quick links" in Patrick Hand, final smallprint. |
| **Detail pages: Tours / Cooking / Stay** | Yes (full editorial detail system: `DetailHero`, `FactStrip`, `Timeline`, `Pullquote`, `DetailGallery`, `SubNav`, `FloatingCTA`, `FAQ`, `Process`, `HandDrawnMap`, `IngredientsGrid`, `RecipeTabs`, `FloorPlan`, `Nearby`, `HouseRooms`, `MaruCard`, `Walks`, `CrossSell`, `NoteStrip`, `DetailClose`) | **Not designed.** Every detail-page section in the editorial direction needs a cute/cozy reinterpretation. The "hand-drawn map" and "ingredients grid" in particular are strong moves that would translate well to doodles + washi labels. |

### Recommendation

**Code the Home page first from the existing prototype.** This is the fastest path to validating that the cute/cozy language survives the Tailwind / React port — if a polaroid + washi looks wrong in production it's better to catch that now than after designing 20 more screens.

Once Home is up in production and the design language is verified, design the missing Home sections (Gallery, Reviews, WhyJeongja, full Footer, Inquire form) and the three detail pages **in parallel with implementation** — each can land as its own PR atop the Home base.

Alternative rejected: design everything up front, then code. Risks spending another design round discovering the direction doesn't fit the production stack.

---

## 5. What we're NOT carrying over from the editorial handoff

Explicit list — if a coding agent ports from `design-handoff/project/*.css` or `*.jsx`, these things should NOT come across:

- **Fraunces italic display type** — replaced entirely by Caveat handwritten. The display voice is handwriting, not editorial serif.
- **Oversized faded section numbers** (Fraunces `opsz:144`, 8% opacity, top-right decorative `01/02/03`) — replaced by Patrick Hand kicker chips (`#01 · meet mom`) rotated on butter-yellow pills.
- **Paper-grain noise overlay fixed to the viewport** at 9% opacity — replaced by the kraft desktop bg + cream page bg + dot-grid grain + faint notebook lines inside the page column. The noise SVG we use is similar in intent but baked into `.page::before` (not `body::before`), sits at 7% opacity, and never bleeds onto the kraft surround.
- **Terracotta `#C76A3F` as primary accent** — replaced by the multi-pastel palette (peach, pink, sage, sky, butter) spread across accents, with tomato `#E94B3C` reserved for one-element-per-section pops only.
- **Hanok Morning palette** entirely — all three documented palettes (Hanok / Sunlit / Tancheon) are gone.
- **Dark espresso `#2a1f14` desktop surround** — replaced by warm kraft `#D4B896`. The frame feels like craft paper, not a museum mat.
- **DM Sans body** — replaced by Nunito (rounder, cozier).
- **`Signoff` / `Pullquote` / detail-component JSX** in `design-handoff/project/*.jsx` — not a port source anymore. If a coding agent needs structural inspiration for the same problem (e.g. "how do I render a quote?"), it should read the editorial version for intent but build new markup matching the prototype's `.pullquote` / `.note` / `.maru` patterns.
- **`.section--bleed`** full-bleed sections inside the column — not a pattern in the cute/cozy prototype. Everything sits in the 22px-padded column; bleeds happen via decorative overlap (tape, tags, doodles), not by breaking the gutter.
- **Reveal-on-scroll animation** is the one potential borrow: the handoff's default-visible + `.is-visible`-adds-animation pattern is worth keeping since it's an opt-in pattern that degrades cleanly. Port that JS pattern, but re-style the keyframes (e.g. a slight rotate + translate instead of just translateY, to feel scrapbook-y).

---

## 6. Decisions resolved by this direction

Reconfirming cross-doc decisions so nothing drifts:

| Decision | Value | Status |
|---|---|---|
| Hangul on the surface | **NONE.** English-only. | Unchanged from editorial direction. |
| Mom signoff typography | **"— Eunjung"** in Caveat / Indie Flower (sig variant). | Unchanged — Caveat is now the dominant display voice, not just the signoff voice. |
| Palette | **Cute/cozy multi-pastel + tomato pop.** NOT Hanok Morning. | **Revised from editorial `07-design-handoff.md`.** |
| Page width | **420px mobile-only**, kraft `#D4B896` outside on desktop. | Column width unchanged; outside bg color revised from `#2a1f14` to kraft `#D4B896`. |
| Body / page backgrounds | Page = `#FDF5E6` cream paper; outside = `#D4B896` kraft. | Revised (editorial used a single cream `#FBF6E9` with dark-brown surround). |
| Display fonts | **Caveat** (display) + **Nunito** (body) + **Patrick Hand** (stamps) + **Indie Flower** (signatures). | **Revised** — replaces Fraunces + DM Sans. |
| Primary CTA style | Tomato pill button, Patrick Hand label, 2-layer shadow stack (`0 4px 0 #b03a2e, 0 8px 14px rgba(233,75,60,0.35)`), tilted -1.5°. | New — replaces editorial's flat pill. |
| Photo style | **Polaroid frame + washi tape**, tilted ±3°, warm filter (saturate 1.05, contrast 0.98). | Revised — the editorial direction had tilted photos without the polaroid + tape chrome. |
| Reveal-on-scroll | Same opt-in pattern (default visible, JS adds `.is-visible`). Keyframe restyled to suit scrapbook feel. | Unchanged pattern. |

---

## 7. Implementation handoff — next steps

1. **Do NOT design the missing screens up front.** Begin implementation from the prototype's Home; validate the cute/cozy language in production; then design missing Home sections + detail pages in parallel with their implementation.
2. Begin **Task 1** of `docs/03-dev-plan.md` (project bootstrap). No design-system work in that task — just Next.js 15 + TS strict + Tailwind + pnpm.
3. In **Task 2** (design system port), use `design-prototypes/cute-cozy/index.html` as the source of truth. The `design-handoff/project/design-system.css` file is **not** the port source anymore — see `docs/03-dev-plan.md §1` for the cute/cozy token map.
4. In **Task 5** (reusable components), port from `design-prototypes/cute-cozy/index.html` line ranges (this doc §3) instead of `design-handoff/project/sections.jsx`. Expect to add a `components/decoration/` folder for the nine decorative primitives listed in §3.3.
5. When missing sections are ready to design (post-Home launch), do a mini design pass per section — Gallery, Reviews, WhyJeongja, Inquire form, full Footer — and each detail page. Reuse the existing decorative primitives; the goal is to not invent new primitives for new sections, only new compositions.
6. After Home ships: revisit this doc, move the "missing" §4 items that are now designed into §3 proper, and remove the "recommendation" paragraph.
