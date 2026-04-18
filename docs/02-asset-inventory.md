# Asset Inventory

> Companion to `00-site-plan.md`. Catalogs every image, video, and review asset the site needs, where it lives in the repo, its target aspect ratio, and the mock/placeholder strategy so development can start before real assets arrive.

**Guiding principle:** Filenames are stable contracts. A mock `mom-portrait-01.jpg` and the real `mom-portrait-01.jpg` occupy the same path, same dimensions — only the pixels change.

---

## 1. Folder Structure

```
moms-korean-experience/
├── public/
│   ├── images/
│   │   ├── mom/                    # Mom portraits (hero, meet-mom, about)
│   │   ├── tours/
│   │   │   ├── seoul/              # Hidden-gem Seoul spots
│   │   │   └── outskirts/          # Day trips outside Seoul
│   │   ├── cooking/
│   │   │   ├── kitchen/            # Kitchen space, atmosphere
│   │   │   ├── process/            # Cooking moments (hands, prep)
│   │   │   └── food/               # Finished dishes
│   │   ├── stay/
│   │   │   ├── room/               # Private guest room
│   │   │   ├── bathroom/           # Private bathroom
│   │   │   ├── home/               # Apartment interior/exterior
│   │   │   ├── neighborhood/       # Tancheon, Jeongja, parks
│   │   │   └── meals/              # Daily dinners at home
│   │   ├── maru/                   # The 14-yr-old Schnauzer
│   │   ├── gallery/                # Mixed Seoul+outskirts photos
│   │   ├── og/                     # Social share previews
│   │   └── placeholders/           # Local SVG/solid-color fallbacks (dev)
│   ├── videos/
│   │   └── posters/                # Poster frames for <video> elements
│   ├── reviews/
│   │   ├── tours/
│   │   │   ├── guest-anna-germany/
│   │   │   └── guest-david-canada/
│   │   ├── cooking/
│   │   └── stay/
│   ├── favicon.ico
│   └── favicon.svg
├── content/
│   ├── reviews.json                # Single source of review data
│   ├── pages/                      # MDX for page copy (optional)
│   │   ├── home.mdx
│   │   ├── tours.mdx
│   │   ├── cooking.mdx
│   │   └── stay.mdx
│   └── site.json                   # Site-wide config (brand name, links)
└── docs/
```

### Filename convention

`<scope>-<descriptor>-<index>.<ext>`, kebab-case, zero-padded 2-digit index.

Examples:
- `mom-portrait-01.jpg`
- `tours-seoul-hidden-cafe-02.jpg`
- `cooking-food-bulgogi-01.jpg`
- `stay-room-window-01.jpg`
- `maru-couch-01.jpg`

Videos mirror the same convention: `tours-review-anna-01.mp4` with a sibling `tours-review-anna-01-poster.jpg`.

### Formats

- **Photos:** `.jpg` (hero/content, quality 82), `.webp` optional at build time via `next/image`.
- **Icons / UI:** `.svg`.
- **Video:** `.mp4` (H.264, AAC audio, ≤ 10 MB each, ≤ 60s ideal). Always ship a poster frame.
- **OG:** `.jpg` at 1200x630.

### Resolution targets

Export at 2x the display size, max width 2400px. `next/image` handles responsive sizing downstream. Keep originals elsewhere (Drive/iCloud); commit only web-optimized versions.

---

## 2. Asset Inventory Tables

Aspect ratios used throughout:
- **16:9** — page heroes, wide feature images (1920x1080 source)
- **4:5** — portraits, card images (1200x1500)
- **1:1** — gallery thumbs, avatars (1200x1200)
- **3:2** — place photos, general editorial (1800x1200)
- **9:16** — vertical video, mobile-first storytelling (1080x1920)

### 2.1 Home Page

| ID | Page section | Description | Target path | Aspect / size | Usage | Mock source |
|----|--------------|-------------|-------------|---------------|-------|-------------|
| H-01 | Hero | Warm smiling portrait of Mom | `/public/images/mom/mom-portrait-01.jpg` | 4:5 / 1200x1500 | Hero left/bg | `https://unsplash.com/s/photos/korean-woman-smiling` or `/placeholders/portrait-4x5.svg` |
| H-02 | Hero (alt) | Mom in kitchen or outdoors, wider crop | `/public/images/mom/mom-portrait-02.jpg` | 16:9 / 1920x1080 | Hero background fallback (desktop) | Unsplash `korean-home` + local SVG |
| H-03 | Meet Mom | Candid Mom portrait, softer | `/public/images/mom/mom-portrait-03.jpg` | 3:2 / 1800x1200 | Section image | Unsplash `portrait-warm` |
| H-04 | Card 1 (Tours) | Signature Seoul hidden spot | `/public/images/tours/seoul/tours-seoul-hero-01.jpg` | 4:5 / 1200x1500 | Card image | `https://unsplash.com/s/photos/seoul-alley` |
| H-05 | Card 2 (Cooking) | Finished Korean meal spread | `/public/images/cooking/food/cooking-food-hero-01.jpg` | 4:5 / 1200x1500 | Card image | `https://unsplash.com/s/photos/korean-food` |
| H-06 | Card 3 (Stay) | The room or Tancheon view | `/public/images/stay/room/stay-room-hero-01.jpg` | 4:5 / 1200x1500 | Card image | `https://unsplash.com/s/photos/korean-apartment` |
| H-07..12 | Gallery preview | 6 mixed thumbnails | `/public/images/gallery/gallery-0{1-6}.jpg` | 1:1 / 1200x1200 | Grid | Unsplash `seoul`, `korean-food`, `tancheon` |
| H-13 | Featured reviews | Avatar 1 | `/public/reviews/tours/guest-anna-germany/avatar.jpg` | 1:1 / 400x400 | Review avatar | `https://i.pravatar.cc/400?u=anna` |
| H-14 | Featured reviews | Avatar 2 | `/public/reviews/tours/guest-david-canada/avatar.jpg` | 1:1 / 400x400 | Review avatar | `https://i.pravatar.cc/400?u=david` |
| H-15 | OG image | Social share card | `/public/images/og/og-home.jpg` | 1.91:1 / 1200x630 | `<meta og:image>` | Canva template or generated via `@vercel/og` |
| H-16 | Favicon | Site icon (stylized "M" or simple symbol) | `/public/favicon.svg` + `.ico` | 1:1 / 512x512 | Browser tab | Placeholder: terracotta square with "M" |

### 2.2 Tours Page

| ID | Page section | Description | Target path | Aspect / size | Usage | Mock source |
|----|--------------|-------------|-------------|---------------|-------|-------------|
| T-01 | Hero | Mom walking guest through an alley or market | `/public/images/tours/tours-hero-01.jpg` | 16:9 / 1920x1080 | Page hero | `https://unsplash.com/s/photos/seoul-market` |
| T-02 | Hero (mobile) | Vertical crop of hero | `/public/images/tours/tours-hero-01-portrait.jpg` | 4:5 / 1200x1500 | Mobile hero | Same Unsplash source, cropped |
| T-03..08 | Favorite places gallery | 6 Seoul hidden spots | `/public/images/tours/seoul/tours-seoul-{cafe,alley,temple,market,park,bookshop}-01.jpg` | 3:2 / 1800x1200 | Gallery | Unsplash: `seoul-cafe`, `bukchon`, `ikseon-dong`, `gwangjang-market`, `seochon`, `yeonnam-dong` |
| T-09..12 | Favorite places gallery | 4 outside-Seoul spots | `/public/images/tours/outskirts/tours-outskirts-{gapyeong,paju,ganghwa,yangpyeong}-01.jpg` | 3:2 / 1800x1200 | Gallery | Unsplash: `gapyeong`, `paju`, `ganghwa-island`, `korean-countryside` |
| T-13 | How it works | Three step icons or small photos | `/public/images/tours/tours-howitworks-0{1,2,3}.jpg` | 1:1 / 800x800 | Step visuals | Solid-color SVG + emoji, or Unsplash `conversation` / `map-planning` / `walking-together` |
| T-14 | Sample itinerary A | Collage-style photo | `/public/images/tours/tours-itinerary-seoul-01.jpg` | 3:2 / 1800x1200 | Itinerary card | Unsplash `seoul-street` |
| T-15 | Sample itinerary B | Outskirts day | `/public/images/tours/tours-itinerary-outskirts-01.jpg` | 3:2 / 1800x1200 | Itinerary card | Unsplash `korean-mountain` |
| T-R1-* | Review: Anna (Germany) | Text + image + video | `/public/reviews/tours/guest-anna-germany/*` | see section 3 | Review block | Placeholder avatar, sample-video.mp4 |
| T-R2-* | Review: David (Canada) | Text + image + video | `/public/reviews/tours/guest-david-canada/*` | see section 3 | Review block | Placeholder avatar, sample-video.mp4 |
| T-16 | OG image | Tours share card | `/public/images/og/og-tours.jpg` | 1.91:1 / 1200x630 | `<meta og:image>` | `@vercel/og` generated |

### 2.3 Cooking Class Page

| ID | Page section | Description | Target path | Aspect / size | Usage | Mock source |
|----|--------------|-------------|-------------|---------------|-------|-------------|
| C-01 | Hero | Mom cooking, steam + warm light | `/public/images/cooking/cooking-hero-01.jpg` | 16:9 / 1920x1080 | Page hero | `https://unsplash.com/s/photos/korean-cooking` |
| C-02 | Hero (mobile) | Vertical crop | `/public/images/cooking/cooking-hero-01-portrait.jpg` | 4:5 / 1200x1500 | Mobile hero | Same source |
| C-03..05 | Kitchen atmosphere | 3 kitchen/prep shots | `/public/images/cooking/kitchen/cooking-kitchen-0{1,2,3}.jpg` | 3:2 / 1800x1200 | Atmosphere gallery | Unsplash `home-kitchen`, `cutting-board`, `stove-top` |
| C-06..08 | Process gallery | Hands, mixing, plating | `/public/images/cooking/process/cooking-process-0{1,2,3}.jpg` | 3:2 / 1800x1200 | Atmosphere gallery | Unsplash `hands-cooking`, `korean-ingredients` |
| C-09 | Menu A — Kimbap | | `/public/images/cooking/food/cooking-food-kimbap-01.jpg` | 1:1 / 1200x1200 | Menu card | Unsplash `kimbap` |
| C-10 | Menu A — Bulgogi | | `/public/images/cooking/food/cooking-food-bulgogi-01.jpg` | 1:1 / 1200x1200 | Menu card | Unsplash `bulgogi` |
| C-11 | Menu B — Japchae | | `/public/images/cooking/food/cooking-food-japchae-01.jpg` | 1:1 / 1200x1200 | Menu card | Unsplash `japchae` |
| C-12 | Menu C — Korean chicken | | `/public/images/cooking/food/cooking-food-chicken-01.jpg` | 1:1 / 1200x1200 | Menu card | Unsplash `dakgalbi` |
| C-13 | Seasonal special | Generic seasonal dish | `/public/images/cooking/food/cooking-food-seasonal-01.jpg` | 1:1 / 1200x1200 | Menu card | Unsplash `korean-banchan` |
| C-14 | Shared meal | Table full, people eating | `/public/images/cooking/cooking-shared-meal-01.jpg` | 3:2 / 1800x1200 | Feature | Unsplash `korean-meal-table` |
| C-R1..3 | Mock reviews | 3 avatars | `/public/reviews/cooking/guest-*/avatar.jpg` | 1:1 / 400x400 | Review avatars | `https://i.pravatar.cc/400?u=<slug>` |
| C-15 | OG image | Cooking share card | `/public/images/og/og-cooking.jpg` | 1.91:1 / 1200x630 | `<meta og:image>` | `@vercel/og` |

### 2.4 Stay Page

| ID | Page section | Description | Target path | Aspect / size | Usage | Mock source |
|----|--------------|-------------|-------------|---------------|-------|-------------|
| S-01 | Hero | Room or Tancheon view | `/public/images/stay/stay-hero-01.jpg` | 16:9 / 1920x1080 | Page hero | `https://unsplash.com/s/photos/korean-bedroom` |
| S-02 | Hero (mobile) | Vertical | `/public/images/stay/stay-hero-01-portrait.jpg` | 4:5 / 1200x1500 | Mobile hero | Same source |
| S-03..05 | The room | 3 angles of private room | `/public/images/stay/room/stay-room-0{1,2,3}.jpg` | 3:2 / 1800x1200 | Room gallery | Unsplash `minimal-bedroom`, `cozy-room` |
| S-06 | Bathroom | Private bathroom | `/public/images/stay/bathroom/stay-bathroom-01.jpg` | 3:2 / 1800x1200 | Room gallery | Unsplash `small-bathroom` |
| S-07..08 | The home | Living room, balcony | `/public/images/stay/home/stay-home-0{1,2}.jpg` | 3:2 / 1800x1200 | Home gallery | Unsplash `korean-apartment-interior` |
| S-09 | Building exterior | Apartment from outside | `/public/images/stay/home/stay-home-exterior-01.jpg` | 3:2 / 1800x1200 | Home gallery | Unsplash `korean-apartment-building` |
| S-10..13 | Meals | 4 home-cooked dinners | `/public/images/stay/meals/stay-meal-0{1-4}.jpg` | 1:1 / 1200x1200 | Food grid | Unsplash `korean-home-dinner`, `banchan-spread` |
| S-14..16 | Neighborhood | Tancheon stream, parks | `/public/images/stay/neighborhood/stay-tancheon-0{1,2,3}.jpg` | 3:2 / 1800x1200 | Neighborhood section | Unsplash `tancheon`, `seongnam-park` |
| S-17 | Jeongja station | Station exterior (context) | `/public/images/stay/neighborhood/stay-jeongja-station-01.jpg` | 3:2 / 1800x1200 | Getting around | Unsplash `korean-subway-station` |
| S-18..20 | Maru | 3 photos of Maru | `/public/images/maru/maru-0{1,2,3}.jpg` | 4:5 / 1200x1500 | Meet Maru section | Unsplash `schnauzer` (as mock only — real Maru required for launch) |
| S-R1..3 | Mock reviews | 3 avatars | `/public/reviews/stay/guest-*/avatar.jpg` | 1:1 / 400x400 | Review avatars | `https://i.pravatar.cc/400?u=<slug>` |
| S-21 | OG image | Stay share card | `/public/images/og/og-stay.jpg` | 1.91:1 / 1200x630 | `<meta og:image>` | `@vercel/og` |

### 2.5 Site-wide

| ID | Description | Target path | Size | Mock source |
|----|-------------|-------------|------|-------------|
| G-01 | Site favicon | `/public/favicon.svg` + `/public/favicon.ico` | 512x512 | Terracotta square with "M" monogram |
| G-02 | Apple touch icon | `/public/apple-touch-icon.png` | 180x180 | Same as favicon, rasterized |
| G-03 | Default OG | `/public/images/og/og-default.jpg` | 1200x630 | `@vercel/og` fallback |
| G-04 | Logo (optional wordmark) | `/public/images/logo.svg` | vector | Placeholder SVG with chosen brand name |

---

## 3. Reviews Asset Spec

### 3.1 Data shape

Single source of truth: `/content/reviews.json`.

```json
[
  {
    "id": "tours-anna-germany-2024",
    "service": "tours",
    "guest_name": "Anna",
    "guest_location": "Germany",
    "date": "2024-09-12",
    "rating": 5,
    "quote": "Mom took us to a little cafe tucked behind...",
    "images": [
      "/reviews/tours/guest-anna-germany/photo-01.jpg",
      "/reviews/tours/guest-anna-germany/photo-02.jpg"
    ],
    "video": {
      "src": "/reviews/tours/guest-anna-germany/video.mp4",
      "poster": "/reviews/tours/guest-anna-germany/video-poster.jpg",
      "duration_sec": 42
    },
    "avatar": "/reviews/tours/guest-anna-germany/avatar.jpg",
    "featured": true
  }
]
```

Alternative: one MDX file per review at `/content/reviews/<id>.mdx` with frontmatter — use this only if reviews need rich formatting.

### 3.2 Per-reviewer folder layout

```
/public/reviews/tours/guest-anna-germany/
├── avatar.jpg              # 1:1, 400x400, JPG q82
├── photo-01.jpg            # 3:2, 1800x1200 (primary review photo)
├── photo-02.jpg            # 3:2, 1800x1200 (optional)
├── video.mp4               # H.264 MP4, ≤ 60s, ≤ 10 MB, 1080p max
├── video-poster.jpg        # 16:9, 1920x1080, first-frame or curated frame
└── transcript.txt          # optional, for accessibility/captions
```

### 3.3 What to ask the two real tour reviewers for

Deliver via Drive/email. Convert to these targets before committing:

| Item | Format in | Target in repo |
|------|-----------|----------------|
| Avatar / headshot | any | 1:1 JPG, 400x400 |
| 1–3 photos from their tour | JPG/HEIC, any size | 3:2 JPG, max 1800w, q82 |
| Video testimonial | MP4/MOV, phone-shot OK | H.264 MP4, ≤ 60s, ≤ 10 MB, 1080p max |
| Video poster frame | — | Extract via `ffmpeg -ss 00:00:02 -vframes 1` |
| Written quote (English) | text | Store in `reviews.json` `quote` |
| Name + country/city | text | Store as `guest_name` + `guest_location` |
| Date of tour (approx) | text | `YYYY-MM-DD` |
| Permission to publish | checkbox/email | Archive in `/docs/permissions/` (not public) |

### 3.4 Review coverage targets

- **Tours page:** 2 real + 2 mock = 4 total to ship; show all, label real ones.
- **Cooking page:** 0 real + 3 mock = 3 placeholder reviews until real ones come in.
- **Stay page:** 0 real + 3 mock = 3 placeholder reviews.
- **Home page featured:** top 3 across all services (prefer real).

Mock reviewers should have plausible names (Anna, Maya, David, Lukas, Priya, Sofia) and varied origin countries. Mark them in data with `"mock": true` so they can be filtered/replaced in one pass.

---

## 4. Mock Data Strategy

### 4.1 Drop-in replacement principle

1. Every real asset has a fixed path + filename decided now (see tables above).
2. Mock assets live at the same path. When real ones arrive, `cp` over them — no code change.
3. Dimensions are fixed by design tokens (aspect ratio + `next/image` `sizes`), so mocks must match those ratios even as throwaways.

### 4.2 Three layers of placeholder

1. **Local SVG placeholders** (`/public/images/placeholders/`) — solid terracotta/cream SVGs at each aspect ratio (`portrait-4x5.svg`, `landscape-16x9.svg`, `square-1x1.svg`, `editorial-3x2.svg`). Always available, no network. Use during `next dev` offline.
2. **Unsplash source URLs** — concrete photographed stand-ins. Reference in a dev-only JSON (`/content/mock-images.json`) that maps asset ID → Unsplash URL. Component reads from there in dev mode, falls back to `/public/images/...` in prod.
3. **Real committed files** — final state.

Suggested util:

```ts
// lib/asset.ts
export function asset(path: string): string {
  if (process.env.NODE_ENV === "development" && process.env.USE_UNSPLASH === "1") {
    return mockMap[path] ?? path;
  }
  return path; // /public/... served directly
}
```

Default `next dev` should use local committed files (even if those files are solid-color SVGs). Unsplash mode is opt-in.

### 4.3 Next.js Image requirements

- `next/image` needs `width` + `height` or `fill` mode with a sized parent.
- Centralize dimensions in `lib/image-sizes.ts`:
  ```ts
  export const IMG = {
    heroWide:   { width: 1920, height: 1080 },
    portrait:   { width: 1200, height: 1500 },
    editorial:  { width: 1800, height: 1200 },
    square:     { width: 1200, height: 1200 },
    avatar:     { width: 400,  height: 400  },
    og:         { width: 1200, height: 630  },
  };
  ```
- For external Unsplash URLs in dev, add `images.remotePatterns` for `images.unsplash.com` in `next.config.js`.
- Use `placeholder="blur"` with `blurDataURL` generated by `plaiceholder` at build time for the final (real) images.

### 4.4 Content separation

- Copy lives in `/content/pages/*.mdx` (or `.json` if you want to skip MDX).
- Review data lives in `/content/reviews.json`.
- Images live in `/public/images/...`.

Editing any one of those does not touch the others. Mom can change her intro paragraph without anyone re-shooting a photo, and vice versa.

---

## 5. Content Delivery Handoff

Scannable checklist for Youseop + Mom, in rough order. Each arrow is a milestone — ship each one to unblock the next.

- [ ] **Mom portrait** (hero) — 1 great smiling photo, natural light, portrait orientation. *Unblocks: Home hero, Meet Mom section.*
- [ ] **3–4 tour-place photos** — Mom's actual favorite spots, 1–2 Seoul + 1–2 outskirts. *Unblocks: Tours page ships.*
- [ ] **2 cooking photos** — one kitchen atmosphere, one finished dish. *Unblocks: Cooking page ships.*
- [ ] **1 room photo + 1 apartment exterior** — the private room and the building from outside. *Unblocks: Stay page ships.*
- [ ] **1 Maru photo** — the 14-year-old Schnauzer, clear and well-lit. *Unblocks: Meet Maru moment.*
- [ ] **2 real tour reviews** — avatar + 1–2 photos + video + written quote + permission. *Unblocks: social proof on Tours.*
- [ ] **Meal photo set** — 3–4 dinners at the table over a couple of weeks. *Unblocks: Stay "Mom's Home Cooking" section.*
- [ ] **Neighborhood set** — Tancheon stream, parks, Jeongja station area. *Unblocks: "Why Jeongja?" section.*
- [ ] **Secondary Mom portraits** — 1 candid + 1 outdoor. *Improves: Home / Tours hero rotation.*
- [ ] **Brand decisions** — site name + chosen mom name. *Unblocks: OG images, logo, favicon.*
- [ ] **Gallery photos** — 6+ from Mom/Dad/Youseop's existing Seoul+outskirts outings. *Unblocks: Home gallery preview.*

Shoot tips to pass to Mom:
- Use portrait mode on iPhone, natural daylight, no flash.
- For food: overhead + 45° angle, shoot right before eating.
- For places: include a person (back turned is fine) for scale and warmth.
- Originals go to Drive; Youseop will web-optimize before committing.
