# Design Direction — Eunjung's Table

> Synthesis of `05-design-references.md`. Opinionated. Picks favorites and defends them.
> Open decisions for Youseop are at the end.
> **The previous version of this doc (editorial / warm-magazine direction) is fully superseded.** A follow-up task also needs to rewrite `03-dev-plan.md` § 1 (Design System) to match — flagged at the end of this doc.

The brief in one line: **a Korean mom's weekend website about her home, her cooking, and her favorite places.** Not a hotel site, not a tour operator, not a boutique. A *home* with a name on the door — hand-lettered, a little crooked, very much hers.

---

## 1. What we're adopting — design dimensions

### 1.1 Hero pattern

**We pick one and commit.**

The three candidates, ranked:

#### A. **PRIMARY RECOMMENDATION — "Polaroid stack" hero**
> Three real photos (portrait of Eunjung, Mom's kitchen, Maru) laid out as white-bordered polaroids at slight rotations, with a hand-lettered "Eunjung's Table / 은정의 식탁" masthead sitting above/behind them. A Caveat-font aside in the margin: "come in, take your shoes off →" with a hand-drawn arrow pointing at a primary CTA.

- Why this one:
  - Photographs carry the warmth without requiring editorial styling.
  - Polaroids inherently say "snapshots from a specific life," not "production from a brand."
  - The stack *wobbles* — it's not a grid. The non-alignment is the personality.
  - We can start with two polaroids and grow to a messier stack later without breaking the layout.
- Reference anchors: Samantha Dion Baker's substack header, Under A Tin Roof photography, the generic scrapbook-polaroid pattern language.

#### B. Alt — "Hand-drawn welcome scribble + portrait photo"
> Large Caveat/hand-lettered "Hi, I'm Eunjung." centered above a single warm portrait. A tiny hand-drawn arrow in the margin points at the first sentence of the About paragraph.
- Why it's strong: maximum personal, minimum production. Feels like a personal Substack header.
- Why not primary: relies on one commissioned hand-lettering asset and one portrait photo being *really* good. High variance until we have the assets.

#### C. Alt — "Sticker collage of what you'll do here"
> A 2x2 sticker/badge composition labeling Tours, Cooking, Stay, Maru — each sticker a hand-illustrated little icon (a bowl of bibimbap, Tancheon stream, a key, a dog).
- Why it's strong: most genuinely *cute* option. Closest to zine cover energy.
- Why not primary: requires 4 commissioned illustrations up front. Delays launch.

**Decision request:** start building toward A (Polaroid Stack). Hold B in reserve if photography comes in weaker than hoped. Hold C for a future seasonal homepage refresh.

### 1.2 Color palette — three candidates, pick one

All three pass the "cute / cozy / warm" test. None is cream-and-sage-boutique. Hex values are targets, to be verified in actual UI with tokens.

#### Palette 1 — **Butter Kitchen** (warmest, most "kitchen-at-noon")
> Soft butter yellow + tomato red + sage accent. Like opening a 1990s Korean cookbook.

| Role | Token | Hex | Notes |
|---|---|---|---|
| Paper | `cream-50` | `#FBF6E7` | Page background; slight yellow undertone |
| Butter | `butter-200` | `#F5E3A8` | Section backgrounds, polaroid washi accents |
| Tomato | `tomato-500` | `#D94A3A` | Primary CTAs, "Mom's voice" emphasis |
| Tomato pressed | `tomato-700` | `#A32E21` | Pressed state |
| Sage | `sage-500` | `#7FA586` | Secondary accents, Tancheon gallery, navigation underline |
| Ink | `ink-800` | `#3B2A1E` | Body text (warm brown, never true black) |
| Ink soft | `ink-500` | `#7A6652` | Captions, metadata |

- Vibe: 1980s-Korean-home warmth. Closest to a real Korean kitchen's color memory.
- Trade-off: tomato red is assertive — risks feeling "diner-y" if photography is also red-dominant. Keep food photography in green-and-neutral where possible.

#### Palette 2 — **Warm Scrapbook** (most "handmade zine")
> Kraft-paper tan + ink-brown + pop of red + pale sky. The palette of a spiral notebook from 1995.

| Role | Token | Hex | Notes |
|---|---|---|---|
| Kraft paper | `kraft-100` | `#F2E8D5` | Page background |
| Aged paper | `kraft-300` | `#E3D2B0` | Card backgrounds, polaroid mount |
| Ink | `ink-900` | `#2A1F14` | Body text |
| Pen red | `pen-500` | `#C23B2E` | Pull quotes, "Mom's pen" marginalia, primary CTA |
| Pen red soft | `pen-300` | `#E5A79E` | Hover, washi-tape accents |
| Sky | `sky-200` | `#C9DDE4` | Secondary accent — for Tancheon-stream moments specifically |
| Meta | `meta-600` | `#7A6145` | Captions |

- Vibe: kraft paper, ballpoint pen, a real polaroid stack taped to a wall.
- Trade-off: can drift toward "pinterest craft blog" if over-decorated. Reserve sky for only two or three moments on the site.

#### Palette 3 — **Korean Dessert Café** (softest, most "cute")
> Peach + cream + soft milk-chocolate brown + mint accent. Seoul café-shaped, 2026-current.

| Role | Token | Hex | Notes |
|---|---|---|---|
| Cream | `cream-100` | `#FBF3E6` | Page background |
| Peach | `peach-200` | `#F9D3B4` | Section backgrounds, soft fills |
| Peach pop | `peach-500` | `#EF8E5E` | Primary CTA |
| Choco | `choco-700` | `#5C3B22` | Body text (warm milk-chocolate, not brown-brown) |
| Choco dark | `choco-900` | `#3B2414` | Display type |
| Mint | `mint-400` | `#A8D6C3` | Secondary accents, Maru's sticker fill |
| Meta | `meta-500` | `#9A8774` | Captions |

- Vibe: closest to current Korean indie café / stationery-shop aesthetic. Most likely to read as instantly "cute" to our Korean-language-student audience.
- Trade-off: softest of the three; risks reading as *dessert shop* if food photography doesn't counterweight with savory, rich meals.

**Recommendation if forced to pick now: Palette 2 — Warm Scrapbook.**
It leans hardest into the "handmade zine / scrapbook" direction that separates this project from every boutique-hotel site that got rejected. The kraft-paper tone reads like a real material. Pen-red does the work of both "cute" and "Mom is decisive," and the sky accent gives us one clean cool-tone moment for Tancheon stream imagery without softening the whole site into dessert-shop-cute.

Palette 3 is the close runner-up if Youseop wants to bias *cuter over handmade.* Palette 1 is the right answer if Youseop decides food photography is the hero and wants the palette to disappear under it.

### 1.3 Typography pairing — three candidates, pick one

The previous direction (Fraunces + DM Sans + Caveat) is **revoked.** Fraunces's optical-size axis and "SOFT/WONK" quirks read as *editorial display,* and that's the exact editorial-magazine tone we're walking away from. We also don't need a variable-font display serif. We need one rounded approachable display, one quiet body, and one clearly handwritten accent.

All three candidate pairs are Google-font-available (important: next/font, no custom licensing right now).

#### Pair A — **PRIMARY RECOMMENDATION**
- **Display:** [Fraunces](https://fonts.google.com/specimen/Fraunces) weight 700, opsz 144, softness set low, *no* WONK axis
  — Wait. On reflection, still Fraunces but dialed *way* back to the soft humanist end, used only as an optional "letter-from-a-cookbook" serif. More realistically, use a warmer default:
- **Display:** [Recoleta](https://www.fontshare.com/fonts/recoleta) (Fontshare, free for commercial use) — rounded retro-warm serif. Or free fallback: **[Fraunces](https://fonts.google.com/specimen/Fraunces)** locked to a single soft/rounded configuration, used sparingly.
- **Body:** [Nunito](https://fonts.google.com/specimen/Nunito) 400/600 — rounded terminals, friendly, very readable at body sizes, zero SaaS energy.
- **Hand accent:** [Caveat](https://fonts.google.com/specimen/Caveat) — unchanged from the previous plan; it's the right handwritten.

**Why this pair is the primary rec:** Nunito is the quietest "clearly friendly" body font on Google Fonts. Rounded without being childish. Pairs with a display serif without fighting it. Caveat reads as a felt-tip marker and does not cosplay as print-cursive.

#### Pair B — Rounded-and-rounder
- **Display:** [Quicksand](https://fonts.google.com/specimen/Quicksand) 700 — very round, very soft, used *only* for the masthead
- **Body:** [Nunito](https://fonts.google.com/specimen/Nunito) 400/600
- **Hand accent:** [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand) — looks like a fine-line pen; more "legible handwriting" than Caveat's marker
- Why consider: pushes further toward *cute*; both display and body are rounded-sans. Risk: loses the slight editorial stability the display serif gave us.

#### Pair C — Serif-plus-rounded-sans (the "Cup of Jo" pair)
- **Display:** [Fraunces](https://fonts.google.com/specimen/Fraunces) 600 (held soft, one configuration only)
- **Body:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) 400/500
- **Hand accent:** [Shadows Into Light](https://fonts.google.com/specimen/Shadows+Into+Light) — thinner, more schoolbook handwriting
- Why consider: closest to the prior direction but with the WONK/SOFT axes locked down. Safest migration from the old plan. Shadows Into Light reads more like "a woman's note on a fridge" than Caveat's more dramatic loops.

**Concrete recommendation: Pair A.** Nunito body + Caveat accent is the right cute-but-grown-up combination. For the display, start with Fraunces locked to a single soft configuration to avoid new font licensing, and keep Recoleta in reserve if Youseop wants to upgrade the masthead later. This is an explicit *replacement* of the "Fraunces + DM Sans" body choice — DM Sans is too neutral-SaaS for this direction.

### 1.4 Photo treatment

**Recommendation: Polaroid frames, used intentionally, not wallpaper.**

- Full-bleed editorial photography is out.
- Every feature photograph (hero, feature card, gallery item) is rendered as a polaroid:
  - White border: 24 px on top/left/right, 72 px on bottom (for the caption/washi area)
  - Slight rotation: `-3°` to `+3°`, random-ish per image, deterministic per slot (CSS variable)
  - Soft drop shadow: `0 4px 20px rgba(0,0,0,0.10)`
  - Optional washi-tape SVG corner decoration, rotated 8–12°
- In-post inline photos are *not* polaroids — they're plain rounded rectangles (16 px radius). Polaroid framing is reserved for hero moments so it stays special.
- **Grain overlay** (5–8% opacity noise texture) applied to photographs to pull them slightly away from the "crisp DSLR" editorial feel.
- Avoid: duotone filters, heavy color grading, "moody" underexposure. Keep Mom's photos warm, bright, and honest.

Reference anchor: Under A Tin Roof's golden-hour kitchen photography + scrapbook polaroid-framing pattern language.

### 1.5 Layout rhythm

**Recommendation: single-column scroll with scrapbook pockets.**

The backbone is a single mobile-first scrolling column — no multi-column magazine grids, no asymmetric hero-and-sidebar. But inside that scroll, certain moments break out into **"scrapbook pockets":**

- A polaroid stack (hero).
- A "recipe card" (menu listings in the Cooking Class page).
- A "from Mom's notebook" Caveat-handwritten aside, set apart as a sticky-note card tilted ~2°.
- A Maru sticker peeking from the margin.

The scrapbook-collage layout was considered and *rejected as a primary layout* because it breaks mobile readability and performance. Collage vibes come in as *occasional pockets,* not as the whole page grammar.

Single-column + pockets is the single most defensible decision: it reads as a *personal blog*, not a magazine, and it works the same on phone and laptop.

### 1.6 Decorative elements — our visual vocabulary

The set we commit to (don't invent new ones beyond these without revisiting this doc):

1. **Hand-drawn arrows** — small SVG arrows, wobbly line, used to point from Caveat marginalia to a CTA or photo. Reference: Samantha Dion Baker sketch-journal pages.
2. **Scribble underlines on key words** — one custom SVG underline per page, applied to the emphasis word in a heading. Reference: Wizard Zines hand-drawn emphasis.
3. **Washi-tape corners** — two to three washi-tape SVGs (patterns: small-red-dots, mint-gingham, cream-stripes). Placed at corners of polaroids and recipe cards. Max one washi tape per pocket.
4. **Hand-drawn dividers** — instead of `<hr>`, a small doodled divider (teapot line / waveform / row of rice grains). One per page at most, at a narrative break.
5. **Polaroid stacks** — see §1.4. Our signature framing.
6. **Sticker-shaped badges** — "new", "seasonal", "Maru's favorite", etc. Circular, irregular white stroke. Reference: die-cut sticker conventions.
7. **Caveat marginalia blocks** — short asides in Caveat, presented as sticky-note cards with `rotate(-2deg)`, on a pale-butter/pale-peach fill. Written in Mom's voice.
8. **은정 hanko stamp** — a tiny red-ink seal–style SVG with the Hangul 은정 inside a rough circle, used once per page as a "signed by Mom" mark. Placed in the corner of one polaroid per page.

### 1.7 Motion

Reduce-motion-friendly. Observe `prefers-reduced-motion: reduce` and disable all non-essential animations.

- **Polaroid enter animation:** a 200ms fade-in + `transform: rotate(-8deg) scale(0.98) → rotate(-2deg) scale(1)` — as if the photo is being placed onto the page by hand. Triggered on scroll-into-view, runs once, never repeats.
- **Hover-tilt on polaroids (desktop only):** `rotate(-2deg) → rotate(0deg)` with a 250ms transition. Tiny interaction that says "someone just picked this photo up."
- **Maru sticker hover-bob:** a 150ms `translateY(-3px)` on hover. Gentle. (No repeating float animation — we do not want ambient motion.)
- **No parallax, no scroll-jacking, no sticky video hero, no auto-playing carousel.** These are all boutique-hotel tells.
- **Page transitions:** none — standard Next.js link behavior, with a ~200ms fade if it comes cheap. Not required for MVP.

### 1.8 Hangul integration

Locked: **light sprinkle, bilingual but not translated.**

Specific placements:

- **Brand lockup:** "Eunjung's Table" primary, "은정의 식탁" beneath or beside it in a smaller rounded sans (or hand-lettered if we commission the logo). Both visible; neither labeled.
- **은정 hanko stamp** in one polaroid corner per page (see decorative element 8).
- **"from 엄마" Caveat sign-offs** — section-closing Caveat marginalia signed with "— love, 엄마" instead of English.
- **"우리집" hand-drawn label** — appears exactly once, on the Stay page hero, hand-lettered over the apartment photo.
- **Food names** — Hangul in parentheses after English on first use: *Bulgogi (불고기)*. Then English-only for the rest of the paragraph.
- **Nav** stays English. Do not bilingual-label nav items — that's a corporate-government-site tell.

Ref: WOOHEE Studio's bilingual-without-apology nav; the Hangul isn't flagged, it just exists alongside English.

---

## 2. Page-by-page design beats

Three to five specific, concrete design moves per page. The goal: each page needs **one moment you remember** and several small personality details around it.

### 2.1 Home

1. **Hero polaroid stack** — three warm photos (Eunjung smiling / kitchen window / Maru), white borders, hand-lettered masthead above. Tagline in a Caveat aside with a hand-drawn arrow to the "Explore Tours" CTA.
2. **"Meet Mom" section with sticky-note aside** — block of body copy, but a Caveat sticky-note card tilted -2° at the end reads: *"ps — if you don't like spicy food, tell me. I have a softer kimchi recipe. — 엄마"*
3. **Three Experiences as scrapbook cards** — Tours / Cooking / Stay as three polaroid-framed cards, each with a washi-tape corner in a different pattern. Photos of: a Tours moment, a cooking moment, the room.
4. **Gallery preview as "fridge magnets"** — 6 square photos taped to a subtle cream background with faint tape corners. Tap to expand into a lightbox.
5. **Footer signoff** — "Thanks for stopping by. — 은정" in Caveat, plus a small Maru sticker.

### 2.2 Tours

1. **Hero: a map polaroid** — a photo of a *real* hand-annotated paper map of Jeongja and surroundings, polaroid-framed. Mom's actual handwriting on the map if possible. If not, a Caveat-font overlay annotating three spots.
2. **"How It Works" as a three-panel recipe card** — numbered steps in a kraft-paper card with a hand-drawn arrow between them.
3. **"Mom's favorite places" gallery** — each photo is a polaroid with a Caveat-font caption in Mom's voice: *"the bakery lady here remembers my order"*, *"this stream is where I walked Maru every morning for 9 years"*. Captions do the heavy lifting.
4. **Sample itineraries as sticker-tabs** — each itinerary opens as an accordion with a cute custom sticker (a bowl, a mountain, a temple) next to its title.
5. **Inquiry CTA as a handwritten note card** — "tell me what you're curious about — I'll write back" in Caveat, with the Tally form link underneath.

### 2.3 Cooking Class

1. **Hero: an overhead shot of Mom's kitchen counter mid-cook** — polaroid-framed, with a small "은정" hanko stamp in the corner.
2. **Menus as three recipe cards** — kraft-paper cards, one per menu, each with a hand-drawn divider between dishes. Menu name hand-lettered. "What you'll cook together" bullets set in Nunito, "Allergies / vegetarian" note in Caveat at the bottom.
3. **"Not on the menu?" sticky-note** — the "tell me what you'd like to learn" custom-request line is a tilted Caveat sticky-note, not a standard paragraph. Makes clear this is a real conversation, not a dropdown.
4. **Atmosphere gallery** — 4–6 square photos in a scrapbook grid (slight rotations, overlapping corners). Include the *imperfect* ones — flour on the counter, a hand reaching for a pot lid.
5. **Two-line testimonial in Caveat** — a guest's handwritten-feeling quote, not a styled pull-quote.

### 2.4 Stay

1. **Hero: a hand-drawn floor plan of the apartment** — commissioned SVG illustration. Simple lines, labeled rooms in both English and Hangul (*Your Room / 네 방*, *Kitchen / 부엌*, *Tancheon view / 탄천*). One of the clearest "a person drew this for you" moves on the site.
2. **"Your room" polaroid stack** — 3–4 polaroid photos of the private room, the private bathroom, and the window view, slightly overlapping with washi-tape accents.
3. **"One cup of coffee in the morning at the kitchen window" Caveat note** — a Caveat marginalia line set next to the window photo. Mom's voice, not marketing copy.
4. **"What's included" as a cute icon list** — hand-drawn icons (bowl for dinner, cup for coffee, key for the key, bed, wifi) with Nunito labels. Not Feather/Lucide icons — custom, slightly wobbly lines.
5. **Meet Maru sticker card** — a round polaroid/sticker of Maru with hand-lettered "Maru • 14 • good boy • 마루". On hover, Maru gently bobs (see §1.7 motion).
6. **"Why Jeongja?" as a cream notebook page** — one kraft-paper card with Mom's three-sentence pitch, a hand-drawn subway-stop diagram showing "5 min → Jeongja, 20 min → Gangnam, 40 min → Myeongdong," and a small sage-accent sketch of Tancheon waterline.

---

## 3. Distinctiveness checklist

Eight moves. The final site must pass every one of these, or it's drifting back toward agency-designed. These fully replace the previous round's distinctiveness checklist.

- [ ] **1. A hand-drawn or hand-lettered asset appears on every page.** Not a font pretending to be handwriting — an actual SVG of a scribble, arrow, underline, marginalia note, or floor plan. At least one per page.
- [ ] **2. Every photograph that appears in a hero or feature slot uses the polaroid frame.** Consistently. Full-bleed editorial photography is forbidden in hero/feature slots.
- [ ] **3. Mom's voice (Caveat font, first-person, affectionate) appears at least once per page** — as a sticky-note, marginalia, or sign-off. Never use Caveat for UI chrome.
- [ ] **4. Hangul appears on every page, and is never flagged as "translation."** It lives alongside English, unmarked.
- [ ] **5. At least one deliberately "imperfect" moment per page.** A tilted card, a misaligned washi-tape, flour on the counter in the photograph. If every element is aligned and clean, the site has failed.
- [ ] **6. Maru appears somewhere on at least three of the four pages.** A sticker, a photo, a caption. He's the mascot whether we formalize it or not.
- [ ] **7. No "Trusted by" logo strip, no gradient hero overlay, no lucide-react icon grid, no "three-up feature cards with identical structure," no stock photography.** If any of these appear, the site has failed.
- [ ] **8. The footer is a signoff, not a sitemap.** Minimum: "Thanks for stopping by. — 은정" with a small Maru sticker or hanko stamp. Optional: a tiny email address in plain text. No social-icon grid unless strictly necessary.

---

## 4. Open design decisions for Youseop

Answer before Task 2 (design-system implementation) can start.

- [ ] **1. Color palette.** Which one: (A) Butter Kitchen, (B) Warm Scrapbook — *my rec*, or (C) Korean Dessert Café? See §1.2. One sentence on *why* helps downstream decisions.
- [ ] **2. Typography pairing.** Which one: (A) Fraunces(soft) + Nunito + Caveat — *my rec*, (B) Quicksand + Nunito + Patrick Hand, or (C) Fraunces(soft) + DM Sans + Shadows Into Light? See §1.3.
- [ ] **3. Polaroid framing vs. scrapbook collage as the hero pattern.** Confirm Polaroid Stack (§1.1 A) as the hero? Or bias toward the Sticker Collage (§1.1 C) if you want to commit to commissioning illustrations?
- [ ] **4. Illustration strategy — photography-heavy or illustration-heavy?** Pick one of:
  - (a) **Photography-first**: we rely on real photos (polaroids of Mom, kitchen, Maru, rooms, tours), with SVG washi-tape and hand-drawn arrows as the only illustration. *Cheaper and faster.*
  - (b) **Illustration-augmented**: (a) + we commission 4–6 custom watercolor/ink illustrations (hand-drawn apartment floor plan, Maru sticker, Tancheon scene, section dividers). *~2–4 weeks of commissioned work; best visual ceiling.*
  - (c) **Illustration-first**: most of the page is illustrated and photography is secondary. *Too slow for launch; revisit in v2.*
  - *My rec: start at (a), plan to upgrade to (b) within 6 weeks of launch.*
- [ ] **5. Do we commission a hand-drawn portrait/mark of Eunjung as the brand mark?** Options: (a) no — a hand-lettered wordmark is enough; (b) yes — a small line-drawn portrait of Eunjung that appears in the footer and as the favicon; (c) yes, but of Maru instead, as a brand mascot. *My rec: (b) for the final site, but launch with (a) and upgrade.*
- [ ] **6. Hangul typography.** Use Noto Sans KR (free, neutral, safest), or hand-letter all Hangul (highest personality, most work)? *My rec: Noto Sans KR for body Hangul + hand-lettered logo/masthead only. No middle ground.*

---

## 5. Implications for the existing dev plan

**`03-dev-plan.md` § 1 (Design System) is now out of date.** The old section documented:

- A cream + terracotta *or* sage palette (Options A/B).
- Fraunces + DM Sans + Caveat typography.
- An older "warm editorial" set of distinctiveness moves.

All of that needs surgical rewriting to match this doc:

- § 1.1 Color Palette → rewrite to match §1.2 of this doc, reflecting the chosen palette (pending Youseop's answer to open-decision #1).
- § 1.2 Typography → rewrite to match §1.3 (pending answer to #2). `next/font` config in the dev plan references Fraunces axes `["opsz", "SOFT", "WONK"]` — if we stay on Fraunces we need to *remove* the WONK axis and lock SOFT to a single value; if we move off Fraunces we need to swap imports.
- § 1 Distinctiveness moves → rewrite to match §3 of this doc (the eight-item checklist).
- Add a new subsection for: polaroid framing component, washi-tape SVG library, Caveat-marginalia component, hanko-stamp asset, Maru-sticker asset.

**This rewrite is a follow-up task and is intentionally not done here.** The orchestrator should open a new task to rewrite `03-dev-plan.md` § 1 after Youseop answers the six open decisions above. Do not begin Task 2 (design-system implementation) against the current § 1 — it will produce a site in the rejected editorial direction.
