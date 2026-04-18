# 06 — Design Direction

> Synthesis of `05-design-references.md` against the design system in `03-dev-plan.md` § 1. Opinionated. Picks favorites and defends them. Open decisions for Youseop are at the end.

The brief in one line: **a personal magazine made by a mom for the kind of guest who wants to come back.** Not a hotel site, not a tour site — a *home*, presented with editorial confidence.

---

## 1. What we're adopting from references

### 1a. Hero section pattern

Three patterns considered. One recommended.

#### Pattern A — Tilted asymmetric photo with paper grain (recommended) ★

Already in the dev plan as Distinctiveness Move #1. References doubled down: Kinfolk's off-center compositions (§3.2), Cereal's white space as active element (§3.1), Pytts House's tall vertical photos with soft framing (§1.3). The tilt + paper grain is what separates this from every Tailwind hero on the internet.

ASCII sketch (mobile):
```
┌──────────────────────────────────┐
│                                  │
│  엄마        (oversized faded    │
│              hangul, bg layer)   │
│                                  │
│   ┌─────────────────────┐        │
│   │                     │        │
│   │   PHOTO OF MOM      │        │
│   │   (tilted -2deg     │        │
│   │   on md+, no tilt   │  ←───  │
│   │   on mobile)        │        │
│   └─────────────────────┘        │
│                                  │
│   See Korea through              │
│   a local mom's eyes.            │
│                                  │
│   — A short paragraph in body    │
│     type, max-w-prose.           │
│                                  │
│   [ Explore tours →  ]           │
│                                  │
└──────────────────────────────────┘
```

ASCII sketch (desktop):
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   See Korea through              ┌───────────────┐       │
│   a local mom's eyes.            │               │       │
│                                  │  PHOTO OF     │       │
│   A short paragraph in body      │  MOM, tilted  │       │
│   type, max-w-prose, sitting     │  -2deg, paper │       │
│   left of the photo.             │  shadow under │       │
│                                  │               │       │
│   [ Explore tours → ]            └───────────────┘       │
│                                                          │
│   엄마  (oversized hangul, faded, bg layer behind text)  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Why:** Encodes the brand. The tilt says "this is a real photo someone pinned up," not "this is a hero asset." The oversized 엄마 says "a Korean mom is here" without translation. The paper grain says "this is a magazine, not an app."

#### Pattern B — Two-photo opening (Teo Yang move)

Page opens with two large photos stacked vertically (mobile) or side-by-side (desktop), no headline at all until you scroll. Tagline reveals on second screen. Reference: §1.7 Teo Yang Studio, §1.4 Hoshinoya theme pages.

**Why not primary:** Beautiful but withholds context. Mom's audience is people who Youseop hasn't met yet — they need to grok "a Korean mom in Seoul" in 2 seconds. Pattern A delivers context faster.

#### Pattern C — Single full-bleed cover image with overlaid serif headline

Classic magazine feature pattern. Reference: §3.6 Departures, §1.5 The PIG.

**Why not primary:** Risks reading as "another hotel site" — too many luxury hotels do exactly this. Pattern A has more identity.

**Decision:** Pattern A as primary across all four pages (Home, Tours, Cooking, Stay), with subtle variations per page (different photo subject, different oversized hangul word — see §1g).

---

### 1b. Color palette

Three candidates. **Decision pending Youseop pick** — see Open Decisions §4.

The dev plan currently proposes one warm cream base + a choice between Terracotta or Sage as accent. Research broadly confirms cream-warm is right; the question is *which warmth* and *which accent*. I'm proposing three full-system palettes (each pulling from a real reference) so you're not guessing in isolation.

#### Palette 1 — "Hanok Morning" (recommended) ★

Pulled from honey-stone Pytts House (§1.3) + early-morning Korean kitchen light. Warm cream base shifted slightly toward yellow, deep brown text, terracotta accent dialed slightly warmer than current spec.

| Role | Hex | Notes |
|------|-----|-------|
| Base (page bg) | `#FBF6E9` | A breath warmer than current `#FAF6EE`. Toward butter. |
| Surface (cards) | `#F4ECD7` | Aged paper. Warmer than current `#F5EEDF`. |
| Divider / hover | `#EBDFC2` | |
| Text body | `#3A2A1C` | Deep walnut, never black. |
| Text headings | `#241710` | Espresso. |
| Muted text | `#7A604A` | Caption + meta. |
| **Accent primary** | `#C76A3F` | Warm terracotta, slightly more orange than current `#C2714F`. |
| Accent dark | `#9C4F2A` | Pressed states. |
| Accent wash | `#EAB893` | Backgrounds, chips. |
| **Optional pop** | `#5C7A5A` | Tancheon-stream sage. Used *once or twice* on the Stay page for the "Why Jeongja" section. |

**Vibe:** Walking into a Korean kitchen at 8am with sunlight on the tile.

#### Palette 2 — "Sunlit Kitchen"

Cream base shifted neutral, deeper accents. References: Alison Roman (§2.1) restraint, Cereal Magazine (§3.1) restraint with warmth.

| Role | Hex | Notes |
|------|-----|-------|
| Base | `#F7F2E8` | Closer to current spec. |
| Surface | `#EFE7D2` | |
| Divider | `#E0D2B5` | |
| Text body | `#2E2419` | |
| Text headings | `#1B130C` | |
| Muted | `#6B5641` | |
| **Accent primary** | `#B65A3A` | Burnt sienna — earthier than terracotta. |
| Accent dark | `#8E3F23` | |
| Accent wash | `#E1A682` | |
| **Optional pop** | `#7A6B3A` | Olive-mustard. For Cooking-page "seasonal special" tag. |

**Vibe:** A magazine layout, but warm.

#### Palette 3 — "Tancheon Morning"

Greener register. References: Sage option in current spec, Tancheon-stream + Jeongja parks reality, Satoyama Jujo's connection to landscape (§1.2).

| Role | Hex | Notes |
|------|-----|-------|
| Base | `#F8F4EB` | |
| Surface | `#EDE6D2` | |
| Divider | `#DBD0B4` | |
| Text body | `#2C2B1F` | Brown with green undertone. |
| Text headings | `#161611` | |
| Muted | `#615E48` | |
| **Accent primary** | `#6F8F6E` | Sage — slightly warmer than current `#7A9E7E`. |
| Accent dark | `#4F6E51` | |
| Accent wash | `#BFCDB6` | |
| **Optional pop** | `#C2714F` | Terracotta as the *secondary* pop — used on Cooking page only, where heat belongs. |

**Vibe:** A morning walk along Tancheon, then home.

**My recommendation:** **Palette 1 — Hanok Morning.** The terracotta primary is *of the kitchen* — it reads as warmth + welcome + cooking + ginger. Sage is beautiful but reads as "wellness retreat," which is wrong for Mom (she is *not* wellness). The sage stays as a one-section pop in Palette 1 to honor the Tancheon reality without making it the brand color.

---

### 1c. Typography pairing

Current dev plan: Fraunces (display) + DM Sans (body) + Caveat (handwritten).

I considered four alternative pairings against the references:

#### Option 1 — Fraunces + DM Sans + Caveat (current spec)
- **Feels like:** A modern editorial blog with a warm humanist twist.
- **Strengths:** Fraunces' opsz axis lets headings get *bigger* without going stiff; the SOFT and WONK axes give us a quirky character that's hard to fake. DM Sans is friendly and reads well at small sizes. Caveat is an excellent restrained handwriting font.
- **Weaknesses:** DM Sans doesn't perfectly share x-height with Fraunces — the pairing works but isn't seamless. It's also the default-feeling sans Vercel ships with starters; risks template association.

#### Option 2 — Fraunces + Inter + Caveat
- **Feels like:** Substack-default. Skip.

#### Option 3 — Fraunces + Söhne (or fallback DM Sans) + Homemade Apple
- **Feels like:** Alison Roman territory.
- **Strengths:** Söhne is the New York editorial sans of choice (Alison Roman, NYT Cooking direction) — but it's Klim Type and not on next/font Google. Substituting DM Sans here loses the move.
- **Verdict:** Aspirationally right but blocked by font availability without paid licensing.

#### Option 4 — Fraunces + Söhne-substitute (GT America Mono fallback to DM Sans) + Caveat
- **Feels like:** Cereal Magazine. Restraint forward.
- **Verdict:** Adds complexity for a marginal feel improvement.

#### Option 5 — Recommended ★ — **Fraunces + DM Sans + Caveat (KEEP) but tighten usage rules**

The current pairing is the right pick *if we use it with discipline*. The risk isn't the fonts — it's deploying them sloppily.

**New rules:**
1. **Fraunces used at exactly 4 sizes**, not 8. Keep `display-xl`, `display-lg`, `display-md`, plus one new `display-sm` for sub-section headers.
2. **Hierarchy comes from italic + opsz, not weight.** Headings use Fraunces italic at large sizes (the opsz axis makes italic look hand-drawn at 60+px). Subheads use Fraunces upright, small caps where appropriate.
3. **DM Sans used in exactly 3 sizes.** Body, body-lg, caption. No DM Sans bold outside of CTAs.
4. **Caveat appears at most twice per page**, used as: (a) the "— Mom" byline and (b) one pull-quote per page maximum. No Caveat in nav, buttons, headings, or section labels.
5. **Hangul fallback typeface:** Add Pretendard or Gowun Dodum via next/font as a fourth family, used *only* for Hangul characters when they appear inline. CSS rule: `font-family: var(--font-fraunces), var(--font-pretendard), serif;` so Latin glyphs use Fraunces and Hangul falls through to Pretendard. Pretendard is the de facto modern Korean web typeface; pairs cleanly with Latin serifs.

**Keep the spec as-is on font choice. Add Pretendard. Add the discipline rules. Done.**

---

### 1d. Photo treatment

Direction: **Full-bleed editorial with a 2px radius and a warm grade.** Confirms current dev plan.

References cited for each piece of this:
- **Full-bleed:** Alison Roman (§2.1), Roads & Kingdoms (§3.3), Ace Hotel Editorial (§1.6). Universal among the editorial references.
- **2px radius:** Current dev plan Distinctiveness Move #4. Keeps the photo from reading as a UI chip while removing the harsh pixel corner.
- **Warm color grade:** Pytts House (§1.3) honey-stone palette and Alison Roman's natural-light food photography are both warm-shifted. Not high-contrast (that reads "lifestyle blog"). Not muted-pastel (that reads "Squarespace template"). Warm-shifted means: pull cool blues toward neutral, lift warm yellows in midtones, slightly desaturate greens. Like Kodak Portra 400 film stock.

**Specific photo rules:**
1. Hero photos and section-cover photos: full-bleed within container, `rounded-photo` (2px), `shadow-warm`.
2. Gallery grid photos: square crops, `rounded-photo`, no shadow (the grid is the rhythm).
3. **No black-and-white photography.** Black-and-white reads "art project," wrong for Mom.
4. **No duotone or color-overlay treatments.** Photos stay photographic.
5. **Polaroid frame treatment is rejected.** Considered (gives "trip album" feel) but it's done to death and ages instantly. Better: the *paper-grain background* + *2px radius* + *tilt* together do the job without literal Polaroid chrome.
6. **Color grade applied at the source**, not via CSS filter. CSS `filter: sepia()` looks like CSS sepia. Real warm grade lives in the JPG.

---

### 1e. Layout rhythm

Direction: **Editorial single-column on mobile; alternating image/text rows on md+ with occasional editorial-grid asymmetry.**

References:
- **Single-column scroll on mobile** is non-negotiable — the audience is mobile-first per the brief.
- **Alternating image/text rows on md+:** Pytts House (§1.3), Satoyama Jujo (§1.2). Image-left, text-right, then flipped, then flipped again. Gives rhythm without busy layouts.
- **Occasional editorial grid asymmetry:** Kinfolk's off-center compositions (§3.2), Cereal Magazine's eight-column grid (§3.1). One section per page should *break* the alternating rhythm with an asymmetric grid (e.g., one large image + two small images stacked + a paragraph block in the empty fourth quadrant). The break is what stops the page from feeling sing-songy.

**Per-page asymmetric break candidate:**
- Home: the "Three Experiences Preview" section becomes a 12-col grid where the three cards are *not* equal width — Tours card spans 7 cols, Cooking 5 cols, Stay 12 cols below. Reflects priority order visually.
- Tours: "Mom's Favorite Places" gallery uses an editorial grid (1 large + 2 small + 1 medium) instead of a uniform 3-col grid.
- Cooking: "Atmosphere Gallery" uses the same editorial grid.
- Stay: "Why Jeongja?" section is a magazine-style two-column block — left col is a large landscape photo of Tancheon, right col is body copy with a sage callout.

---

### 1f. Motion

**Confirm the dev plan: motion stays minimal.** Push back rejected.

References cited:
- **Alison Roman** (§2.1): almost no motion. Reads expensive precisely because it doesn't bounce.
- **Onomichi U2** (§1.1): no parallax, no fancy scroll. Restrained.
- **Cereal Magazine** (§3.1): print sensibility ports to web. Print doesn't animate.

The dev plan has it right:
- Fade-up + tiny scale on scroll reveal (400ms, custom easing, once per element).
- 150ms color hover, 200ms transform hover, no bounce.
- No parallax. Parallax is the giveaway tell.
- Honor `prefers-reduced-motion: reduce`.

**One addition:** Hover state on photo cards should be a *slow* (350ms) `scale: 1.0 → 1.02` lift, never a tilt or rotate. Subtle weight change, like lifting a polaroid off a table.

---

### 1g. Hangul integration

The references that matter here are §1.7 Teo Yang Studio (quiet bilingualism), §5.3 Seoul Hanok brand (Hangul as graphic), §5.2 Onjium (Korean cultural seriousness with restraint), and §4.3 Lo-ol Type Foundry (technical pairing).

**Recommended approach: Hangul as decorative graphic + Hangul as honest signature, but English is the body language of the site.**

Three concrete moves:

#### Move 1 — Oversized Hangul as decorative bg glyph in each hero
One Hangul word per page, set in Pretendard or a display Hangul face, sized at 12–16rem, opacity 0.06–0.08, positioned behind the hero text. Per page:
- Home: 엄마 (Eomma — Mom)
- Tours: 동네 (Dongne — neighborhood)
- Cooking: 집밥 (Jipbap — home cooking)
- Stay: 우리집 (Uri-jip — our house)

This is the Seoul Hanok brand move (§5.3) reduced to one moment per page. Powerful and unmistakable.

#### Move 2 — Caveat-style "from Mom" labels paired with Hangul transliteration
The "— Mom" byline below each Caveat pull quote becomes:
```
— 엄마 / Mom
```
Tiny, in muted text, set in Caveat for "Mom" and Pretendard for "엄마." This is a low-key way to signal "this is a real Korean person, not 'asian-themed'."

#### Move 3 — Place names get a small Hangul caption underneath
On the Tours page's "Mom's Favorite Places" gallery, each photo caption reads:
```
Tancheon Stream
탄천
```
English first (audience-led), Korean below in muted Pretendard. References: §1.2 Satoyama Jujo (Japanese-English bilingualism done quietly).

**What we're NOT doing:**
- Full Korean translation of the site (the brief says English-only for now).
- Hangul in nav, buttons, or section labels (would add cognitive load for non-Korean readers).
- Calligraphic brushed Hangul (reads "festive Korean," wrong register — Onjium's lesson §5.2).

---

## 2. Page-by-page design beats

### Home page

1. **Hero with tilted photo of Mom + 엄마 backdrop glyph** — the asymmetric photo from Distinctiveness Move #1, with the oversized Hangul behind. Sets the brand in 2 seconds.
2. **"Meet Mom" section ends with a Caveat-signed paragraph.** Following Satoyama Jujo's creative-director sign-off (§1.2). Three short paragraphs in Fraunces body weight, then one paragraph signed `— 엄마 / Mom` in Caveat.
3. **Three-experiences preview as an asymmetric grid**, not three equal cards. Tours = 7 cols wide with the largest photo, Cooking = 5 cols, Stay = full-width banner card below. Mirrors the priority order spec. Reference: Kinfolk off-center compositions (§3.2).
4. **Gallery preview uses square crops in a 2-col mobile / 4-col desktop grid**, with one image randomly oversized to 2x2. Reference: Ace Hotel Editorial (§1.6).
5. **Final CTA is *not* a sticky-bottom button — it's a section-break invitation** with body copy ("If something here caught your eye, send Mom a note") and a single pill button. Reference: Alison Roman newsletter signups break flow naturally (§2.1).

### Tours page

1. **Hero photo is *not* of Mom* — it's a Seoul backstreet alley or a Tancheon path with one figure walking away. The headline carries the "see Korea through" line; Mom appears later. Reference: Roads & Kingdoms documentary photography (§3.3).
2. **"The Concept" section uses long-form prose in Fraunces body, max-w-prose, with one Caveat pull-quote inset right.** Reference: Satoyama Jujo's expandable narrative (§1.2).
3. **"Mom's Favorite Places" uses the editorial grid asymmetric break.** 1 large + 2 small + 1 medium, every photo with bilingual caption (English + 한글). Reference: Wallpaper* feature card grid (§3.5).
4. **"How It Works" three steps in numbered Fraunces big italic display, each step a separate row** with image-left / text-right alternating rhythm. The numbers are *huge* — 8rem Fraunces italic in cream-200 behind small-caps step labels. Reference: Cereal page numbering (§3.1).
5. **Sample itineraries presented as case-study cards** — Alex Hunting Studio's case study layout (§4.1) — full-bleed cover image, small-caps category, italic title, two paragraphs of body.

### Cooking page

1. **Hero is a *food close-up*, not Mom cooking** — references warm-graded food photography (Alison Roman §2.1). The photo of Mom's hands shaping kimbap appears in the "Atmosphere Gallery" section, not the hero.
2. **"The Experience" section is a 2-column block on md+** — image-left of the kitchen, text-right with a Caveat sentence inset ("There's no recipe written down — that's how you'll learn"). Reference: Pytts House layout rhythm (§1.3).
3. **Three menus presented as long descriptive cards, not a comparison table.** Each menu is a stand-alone editorial card with menu name (Fraunces italic display-md), three dish names with one-sentence descriptions in body, an "If you have allergies or want to cook something else, just ask" closing line in Caveat. Reference: The PIG long room names (§1.5).
4. **Atmosphere Gallery uses the editorial grid asymmetric break** — same pattern as Tours's favorite places, but tighter crops (kitchen tools, hands, ingredients).
5. **One section break is *just the table set with a finished meal* full-bleed** — no headline, no caption, just the photo with `min-h-[60svh]`. Quiet beat that lets the page breathe. Reference: Cereal Magazine page breakers for time of day (§3.1).

### Stay page

1. **Hero is the room, framed through a doorway** — composition matters: don't shoot the room flat-on like a real-estate listing. Reference: Pytts House tall vertical photos with soft framing (§1.3).
2. **"The Home & The Room" alternates image/text rows** — bedroom photo + paragraph, bathroom photo + paragraph, common-area photo + paragraph. Reference: Satoyama Jujo modular property cards (§1.2).
3. **"Mom's Home Cooking, Every Day" gets a single oversized food photo + Caveat callout** — Caveat reads "Dinner is ready when you get home" or similar. The single biggest photo on the page lives here. Reference: Alison Roman recipe hero (§2.1).
4. **"Why Jeongja?" section uses the sage pop color** (Palette 1's optional pop, §1b). Sage callout box with Tancheon facts + a Tancheon-walk photo. Mirrors the brief's emphasis on Jeongja being "the most livable" Korean city Youseop has tried. Reference: Palette 1 optional pop justification.
5. **"Meet Maru" is its own intentional section break** — a single full-bleed photo of Maru, Caveat caption "Maru. 14. Schnauzer. Will sit on your feet.", small body paragraph below. Treat Maru like a magazine sidebar feature. Reference: Cereal sidebar treatments (§3.1) and the "human-centered storytelling" of Satoyama Jujo (§1.2).

---

## 3. Distinctiveness checklist (revised)

The dev plan has 5 distinctiveness moves. **Keep all 5.** Add 4 more from the research:

**Original 5 (kept verbatim from `03-dev-plan.md` §1.7):**
1. Asymmetric tilted-photo hero.
2. Faint SVG paper-grain texture overlay on `<body>`.
3. Caveat handwritten font reserved exclusively for Mom's voice.
4. Full-bleed photos with a tiny 2px radius.
5. Oversized low-opacity Fraunces section numbers in the background of section labels.

**Added (from research):**

6. **One oversized faded Hangul word per page** as a decorative bg glyph (§1g Move 1). 엄마 / 동네 / 집밥 / 우리집 per page. Identifies this as a Korean person's site, not a "Korean experience" template.

7. **Bilingual photo captions for places.** Every place name on the Tours and Stay pages is captioned `English / 한글`, both in muted small type. Quiet, honest, expensive-feeling.

8. **One asymmetric editorial grid break per page** — Mom's favorite places, atmosphere gallery, Maru section, Why Jeongja. Stops the alternating-rows rhythm from becoming sing-songy. From Kinfolk (§3.2) + Cereal (§3.1).

9. **Caveat-signed paragraph endings.** Mom's bio paragraph, the cooking class intro, the stay description, the final CTA — each ends with a sentence in Caveat as if Mom hand-wrote it. From Satoyama Jujo's creative-director sign-off (§1.2) and Alison Roman's first-person voice (§2.1).

**Distinctiveness tests (the site must pass all of these):**

- [ ] Open the homepage. Cover the logo with your thumb. Could this site be confused with a Tailwind UI template? (Pass = no.)
- [ ] Could a generic AI image generator have produced any photo on the page? (Pass = no — every photo is identifiably Mom's actual home / kitchen / Jeongja / Maru.)
- [ ] Does any section use the pattern hero-features-testimonials-CTA in that order? (Pass = no.)
- [ ] Are there any rounded-2xl cards anywhere? (Pass = no.)
- [ ] Are there any gradient blobs behind any heading? (Pass = no.)
- [ ] Is there a "Trusted by" logo strip? (Pass = no.)
- [ ] Is there a sticky bottom CTA bar? (Pass = no.)
- [ ] Does the page bounce on scroll? (Pass = no.)
- [ ] Is there an emoji in any feature card icon? (Pass = no — but the literal Maru section CAN use the 🐶 spec'd in `00-site-plan.md` as a one-off because Maru is Maru.)
- [ ] Does any heading use Fraunces bold instead of Fraunces italic + opsz scaling? (Pass = no — the discipline is opsz + italic.)
- [ ] Is Caveat used outside of (a) Mom signatures and (b) one pull-quote per page? (Pass = no.)
- [ ] Does any section title look identical in size and treatment to another? (Pass = no — there should be hierarchical variation that reads as editorial, not template.)

---

## 4. Open design decisions for Youseop

These need answers before Task 2 (design-system implementation) can start.

- [ ] **D1. Color palette.** Pick one of Palette 1 (Hanok Morning, terracotta + sage pop), Palette 2 (Sunlit Kitchen, burnt sienna + olive pop), or Palette 3 (Tancheon Morning, sage primary + terracotta pop). My recommendation is Palette 1.

- [ ] **D2. Hangul integration depth.** Pick one:
  - (a) Full Hangul integration: oversized hangul backdrop glyphs + bilingual place captions + 엄마/Mom signature pairings (recommended).
  - (b) Decorative only: oversized hangul backdrop glyphs in heroes, no bilingual captions.
  - (c) Skip Hangul entirely. English-only audience, no Hangul characters anywhere on the site.

- [ ] **D3. Mom's name.** Site-wide, when we sign off paragraphs in Caveat, do we use:
  - (a) `— 엄마 / Mom` (recommended, from §1g Move 2)
  - (b) `— Mom` only
  - (c) Mom's actual first name (Eunjung) — only if Youseop is comfortable with it being on the public site.
  This decision affects copy across all four pages, not just one moment.

- [ ] **D4. Maru section emoji.** The site plan (`00-site-plan.md` §6 Stay page) uses 🐶 in the section heading. Confirm: keep the literal emoji as a one-off (Maru is Maru, the warmth justifies it) or replace with text-only "Meet Maru" + a small SVG dog silhouette.

- [ ] **D5. Hero photo subject per page.** Confirm:
  - Home: Mom (smiling, mid-action, not staged portrait).
  - Tours: a Seoul backstreet or Tancheon path with one walking figure (NOT a Mom portrait).
  - Cooking: a food close-up (NOT Mom cooking — Mom appears in atmosphere gallery).
  - Stay: the room shot through a doorway (NOT a flat real-estate angle).
  This requires planning the photo shoot accordingly. Confirm before assets are captured.

- [ ] **D6. Tagline copy lock.** "See Korea through a local mom's eyes" is the spec's Tours headline. The Home hero needs its own one-liner. Pick one:
  - (a) "Your Korean mom in Seoul." (current spec candidate)
  - (b) "Stay with a Korean mom in Jeongja-dong."
  - (c) "Three ways to spend time with a Korean mom."
  - (d) Write your own.
  This locks the brand voice tone for everything downstream.

---

## Closing note

Every design move in this doc is anchored to a reference site URL in `05-design-references.md`. If a future contributor (or future-you) questions a choice, the answer is "because this reference does it and the reference is in the bibliography."

The single biggest risk to this site is *over-design*. The references that work — Satoyama Jujo, Alison Roman, Onomichi U2 — all share one trait: they trust the photos and the words. They don't dress them up. The temptation, especially with Fraunces and Caveat in the toolbox, will be to flourish. Resist. The flourish is the photo of Mom and the word 엄마. Everything else holds back.
