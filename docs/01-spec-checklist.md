# Spec Checklist — Mom's Korean Experience

> Working doc. Every concrete decision or piece of content needed before the site can ship. Fill in or check off each item. Sibling doc `02-asset-inventory.md` covers the detailed visual asset list.

Legend: `- [x]` = already decided in `00-site-plan.md`. `- [ ]` = still open.

> **Recently locked decisions (2026-04-18)**
>
> - **Brand name: Eunjung's Table.** Finalized — the brand still leans on the universal **"Mom"** concept as the marketing hook, and Eunjung is who Mom is. "Eunjung's Table" is the public-facing brand across logo, header, footer, metadata, OG tags.
> - **Mom's name + branding voice.** Mom's real name is **Eunjung (은정)**. The brand still leans on the universal **"Mom"** concept as the marketing hook; "Eunjung" surfaces when the personal-name register fits. Hangul (`은정`, `엄마`) appears as a light design accent only.
> - **Form strategy.** **Custom in-app form, Tally dropped.** One shared inquiry form rendered by a new `<InquiryForm />` React component, submitted via a Next.js Server Action that emails Youseop through **Resend**. No external form host. See `03-dev-plan.md` Task 14 for the full implementation.
> - **Domain at launch.** Launch on the **default Vercel-assigned URL** (e.g. `<project>.vercel.app`). `NEXT_PUBLIC_SITE_URL` defaults to that URL with a comment noting it can be swapped to a custom domain later. Custom domain is deferred.
>
> Still open (handled by parallel subagents): accent color (terra vs sage), final tagline wording, and (later) a verified custom email sending domain for Resend.

---

## 1. Brand & Identity

- [x] Language: English only at launch. Korean version deferred.
- [x] **Brand name / site title.** Drives logo, domain, OG tags, repo naming. [decided: Eunjung's Table — 2026-04-18] _The brand still leans on the universal "Mom" concept as the marketing hook; Eunjung is who Mom is, and "Eunjung's Table" is the public-facing brand._
- [ ] **Tagline / one-liner.** Shown in hero + meta description. Current placeholder to seed (still open for final wording): "Korean home cooking, hidden corners, and a quiet room in Jeongja — at Eunjung's table." Alternate seeds: "Your Korean mom in Seoul — at Eunjung's table." / "Home cooking, hidden spots, and a quiet room in Jeongja."
- [x] **How we refer to Mom on the site.** Three options: "Mom" (warm, anonymous, matches the brand feeling), "Umma" (Korean flavor, but needs a gloss first time it appears), or her real name (personal, but a privacy decision). Must pick one to write any copy. [decided: lean on "Mom" branding throughout, with Eunjung 은정 as her name when the personal-name register fits — 2026-04-18]
- [x] **Korean-character support.** Do we want Hangul anywhere visible (e.g. 엄마, dish names like 김밥, 정자동)? If yes, font stack must include a Korean webfont (e.g. Noto Sans KR / Noto Serif KR). Decide: none / light sprinkle / full dual-script labels. [decided: light sprinkle — 은정 / 엄마 as design accents only — 2026-04-18]
- [ ] **Domain name.** E.g. `eunjungstable.com`, `momskorea.com`. Check availability before committing. _Note: v1 launches on the Vercel-assigned URL (confirmed) — custom domain is deferred._
- [ ] **Logo.** Wordmark only is fine for v1. Decide: plain type treatment or a small hand-drawn mark? Provide SVG if custom. _Note: v1 wordmark should be just "Eunjung's Table" in the display font (Fraunces)._
- [ ] **Favicon.** 32x32 PNG + SVG. Can be initial letter in brand color, or a small illustration (teapot, house, heart). _Note: initial "E" or "eT" monogram in the chosen accent color is fine for v1._
- [ ] **Social handles to link (optional).** Instagram? KakaoChannel? If none, skip footer social row.

---

## 2. Copy / Written Content

For each block: short headline + body. Keep Mom's voice in first-person when it feels natural ("I love taking people to..."). Placeholders below are starting points, not finals.

### Home

- [ ] **Hero headline.** ~4–7 words. Placeholder: "Your Korean mom in Seoul."
- [ ] **Hero subhead.** 1–2 sentences. Placeholder: "Local tours, home cooking, and a quiet room in Jeongja-dong — with Mom."
- [ ] **Hero CTA label.** Default: "Explore Tours." Confirm.
- [ ] **Meet Mom — story (2–3 paragraphs).** The most important piece of writing on the site. Must cover: who she is, why she started doing this, what she loves about hosting. Needs to be in Mom's voice, translated/polished by Youseop. No placeholder — this has to be written from a real conversation with Mom.
- [ ] **Three-experiences intro line.** One sentence above the three cards. Placeholder: "Three ways to spend a day (or a week) with Mom."
- [ ] **Tours card copy.** 1 line. Placeholder: "Real local places, hand-picked by Mom."
- [ ] **Cooking Class card copy.** 1 line. Placeholder: "Cook a full Korean meal in her kitchen."
- [ ] **Stay card copy.** 1 line. Placeholder: "A private room, home-cooked dinners, a real neighborhood."
- [ ] **Gallery section intro (optional).** One line or skip.
- [ ] **Featured reviews intro.** Placeholder: "What guests are saying."
- [ ] **Final CTA block.** Headline + subhead + button label. Placeholder: "Curious? Ask Mom anything." / "She usually replies within a day."

### Tours

- [ ] **Hero headline.** Placeholder from plan: "See Korea through a local mom's eyes."
- [ ] **Hero subhead.**
- [ ] **"The Concept" section — 2–3 short paragraphs.** Emphasize: not scripted, not touristy, places Mom and her family actually love, can drive to hard-to-reach spots.
- [ ] **"Mom's Favorite Places" — intro paragraph** + short caption per place in the gallery (1 sentence each). Need a list of 6–12 specific places to feature.
- [ ] **"How It Works" — 3 steps, 1 short paragraph each.** (Tell Mom your interests → she plans a custom day → spend the day together.)
- [ ] **Sample itineraries (optional).** 2–3 example days, each ~60–100 words. Placeholder titles: "A day in Seoul's quiet corners" and "Outside the city — nature and local food." Decide whether to include this section at all.
- [ ] **Reviews section intro (optional).**
- [ ] **Inquiry CTA copy.** Button label + one-line prompt. Placeholder: "Tell Mom what you're curious about →"

### Cooking Class

- [ ] **Hero headline + subhead.**
- [ ] **"The Experience" — 2–3 short paragraphs.** Cooking together, eating together, homey atmosphere.
- [ ] **Atmosphere gallery intro (optional).**
- [ ] **"What You Can Cook" intro paragraph.**
- [ ] **Menu A / B / C names + 1-line descriptions.** The plan lists the dishes; we need a short English description per menu (what it is, why it's fun to cook).
  - Menu A: Kimbap + Bulgogi + Seasonal Special
  - Menu B: Kimbap + Japchae + Seasonal Special
  - Menu C: Korean-style Chicken + Kimbap + Seasonal Special
- [ ] **"Seasonal Special" explainer.** One line — what does seasonal mean here?
- [ ] **Custom menu blurb.** Placeholder: "Want to learn something else? Tell us and we'll plan it together."
- [ ] **Dietary / allergy blurb.** Placeholder: "Vegetarian, vegan, and allergy-friendly menus are no problem with a few days' notice."
- [ ] **Reviews section intro (optional).**
- [ ] **Inquiry CTA copy.**

### Stay

- [ ] **Hero headline + subhead.**
- [ ] **"The Home & The Room" — 1–2 paragraphs.** What the room is like, private bathroom note, overall feel of the apartment.
- [ ] **"Mom's Home Cooking, Every Day" blurb.** Sell the daily dinner. Mention what kinds of things Mom cooks.
- [ ] **"Why Jeongja?" — 1–2 paragraphs.** Youseop's 5+ cities perspective, Tancheon, parks, quiet residential feel.
- [ ] **"Getting Around" — the three numbers.** Confirm times from plan: Jeongja Station 5 min walk, Gangnam 20 min subway, Myeongdong 40 min bus. Add any other useful ones (Incheon airport? Hongdae?).
- [ ] **"Meet Maru" — 2–4 sentences.** Include the allergy disclosure here (see §7).
- [ ] **Reviews section intro (optional).**
- [ ] **Inquiry CTA copy.**

### Global

- [ ] **Footer copy.** Year, small about line, contact link, optional credit ("Made with love by Youseop").
- [ ] **404 page line.** Placeholder: "Mom can't find this page — let's go home."

---

## 3. Visuals Needed (high-level)

Full asset list lives in `02-asset-inventory.md`. Dev only needs to know which categories exist per page:

- [ ] Home: hero portrait of Mom, three card images (one per service), gallery mix (~8–12), review avatars.
- [ ] Tours: hero tour photo, 6–12 favorite-place photos, optional step-illustration trio for "How It Works", 2 review media sets (photo + video thumb).
- [ ] Cooking Class: hero kitchen/food photo, atmosphere gallery (~8), one representative photo per menu (A/B/C), review media.
- [ ] Stay: hero of room or apartment, room + bathroom photos, meal photos, Jeongja/Tancheon photos, Maru photos, review media.
- [ ] Global: favicon, OG share image (1200x630), logo SVG.

See `02-asset-inventory.md` for specific counts, orientations, and shot lists.

---

## 4. Reviews / Testimonials

Minimum targets: 2 per service page (Tours already has 2 prepared; Cooking and Stay need to be sourced).

- [x] Two tour reviews already collected (text + image + video).
- [ ] **Format per review.** Confirm for each: reviewer first name + country, text quote (50–150 words), one photo, optional short video (<60s, muted autoplay friendly).
- [ ] **Video hosting.** Decide: self-host MP4, YouTube unlisted, or Vimeo. Affects embed and performance.
- [ ] **Consent confirmation.** Every reviewer has okayed use of their name, photo, and video on a public site. Note this somewhere for the record.
- [ ] **Cooking Class reviews.** Need ≥ 2. Ask recent guests.
- [ ] **Stay reviews.** Need ≥ 2. Ask past lodgers.
- [ ] **Featured reviews on Home.** Pick 2–3 to surface. Can rotate later.
- [ ] **Fallback plan** if Cooking / Stay reviews aren't ready at launch: show only the Tours reviews on Home and a "first guests welcome" note on the thin pages. Decide yes/no.

---

## 5. Forms & Inquiry Flow

- [x] **Form strategy: one shared vs three separate forms.** [decided: ONE shared custom in-app form, no Tally — 2026-04-18] _The form is rendered inline on each page (a section at the bottom, anchor `#inquire`), with a mid-page `InquiryCTA` button that scrolls to it. Service pages pre-check the matching "Which experience?" option via a prop._
- [x] ~~Tally form URL(s)~~ **Custom form — no external URL needed.** [decided: build an in-app `<InquiryForm />` component + Next.js Server Action + Resend email — 2026-04-18]
- [x] **Email service.** [decided: **Resend** (`resend` npm package), free tier 3000/mo, `from: onboarding@resend.dev` for v1 while no verified custom domain exists — 2026-04-18]
- [x] **Email destination (inquiry-received notification).** [decided: `youseop@speakbridges.com`, set via `INQUIRY_TO_EMAIL` env var — 2026-04-18]
- [x] **Spam strategy.** [decided: hidden honeypot field (`hp_field`) only for v1; add Upstash Redis rate limiting later if abused — 2026-04-18]
- [x] **Fields — shared.** [decided — 2026-04-18] Which experience(s)? (multi-select checkbox: Tours / Cooking Class / Stay / Just curious, want to chat), Name (required), Email (required, validated), Country / city (optional), Preferred contact channel (radio: Email / KakaoTalk / WhatsApp — if Kakao/WhatsApp, reveal a "username/number" text field), Approximate dates if any (optional free-text, e.g. "anytime in May 2026"), Group size (optional number), "Anything Eunjung should know?" (free-text textarea: allergies, accessibility, vibes). Plus a hidden honeypot field. _Note: all sub-field groups (Tours / Cooking / Stay) below are merged into this single shared form; the "anything else" textarea covers service-specific details for v1._
- [ ] **Fields — Tours (optional extra specificity).** Preferred date range, group size, interests (food / nature / history / shopping / off-the-beaten-path), mobility notes, whether they want Mom to drive. _For v1 these are captured via the free-text "Anything Eunjung should know?" textarea; can be promoted to explicit fields later if inbound volume justifies it._
- [ ] **Fields — Cooking Class (optional extra specificity).** Preferred date, group size, menu preference (A/B/C/other), dietary restrictions & allergies, Korean food experience level. _Same v1 handling as Tours._
- [ ] **Fields — Stay (optional extra specificity).** Check-in date, check-out date, number of guests, dog-allergy check (see Maru disclosure), purpose of trip, any dietary restrictions for the nightly dinner. _Same v1 handling as Tours._
- [ ] **Button placement.** Minimum: one `InquiryCTA` button mid-page on each service page that scrolls to the in-page `#inquire` form section + the Home final CTA. Decide whether a sticky mobile CTA bar is wanted.
- [x] **Submit behavior.** [decided: same-page success state, no redirect — 2026-04-18] _On successful submit the form swaps to a warm thank-you message and stays on the current page. On error, inline error with a "try again" link; the Server Action returns previous state so input isn't lost. Focus management: focus moves to the first error on validation failure; errors are announced via `aria-live="polite"`._
- [x] **Thank-you success message** (no separate page). [decided: "Thanks! Eunjung will get back to you within a day or two. — 은정 ❤️" — 2026-04-18]
- [x] **Inquiry-received notification.** [decided: Resend sends an HTML email to `youseop@speakbridges.com` with subject `New inquiry from <name> — <experience>`, reply-to set to the submitter's email for 1-click replies — 2026-04-18]

---

## 6. Contact & Business Info

- [ ] **Primary contact email.** Where inquiry notifications go and what's shown on the site (if any). Suggest a branded address on the custom domain, e.g. `hello@<domain>`.
- [ ] **Phone / KakaoTalk ID / WhatsApp.** Decide whether to publish any real-time channel, or keep all contact through the form. International guests often prefer WhatsApp or Kakao; posting a number invites spam.
- [ ] **Expected response time.** Placeholder: "within 1–2 days." Shown on thank-you page and near CTAs.
- [ ] **Pricing strategy.** Three options: (a) publish prices per service, (b) publish a "from $X" floor, (c) "inquire for pricing." Pick one per service — they can differ.
- [ ] **Actual prices (if publishing).** Per person, per group, per night, etc. Include what's included.
- [ ] **Currency + payment method.** KRW only? USD equivalents shown? How is payment collected (bank transfer, Wise, PayPal, in-person cash)? Disclose on the site so guests aren't surprised.
- [ ] **Cancellation policy.** Short policy per service. E.g. "Free cancellation up to 7 days before; 50% refund within 7 days." Needed before Stay especially.
- [ ] **Deposit policy (if any).** For Stay and multi-day tours.
- [ ] **Who to contact in emergencies during a stay.** Youseop's number as backup?

---

## 7. Logistics & Policy Content

### Tours

- [ ] **Duration options.** Half-day vs full-day vs multi-day? List what's offered.
- [ ] **Group size min/max.** E.g. 1–4 people.
- [ ] **Transport.** Clear rule on when Mom drives vs public transit vs taxi/guest pays. Placeholder: "Most days use subway and walking. For further spots Mom can drive, included in the fee."
- [ ] **What's included.** Guiding, transport, translation, any food/entrance fees?
- [ ] **What's not included.** Meals at restaurants, entrance tickets, taxis for very long distances — whatever the real rule is.
- [ ] **Meeting point.** Where does the day start?
- [ ] **Weather / cancellation handling.**
- [ ] **Language level.** Is Mom comfortable guiding in English, or is it English with help from Youseop / a translation app? Be honest on the site.

### Cooking Class

- [ ] **Duration.** E.g. 3 hours including eating together.
- [ ] **Group size min/max.**
- [ ] **What's included.** Ingredients, apron, recipes to take home, the meal itself, drinks.
- [ ] **Dietary substitution process.** Min notice period (e.g. 3 days). Which allergies can't be accommodated (if any).
- [ ] **Location & directions.** Same as Stay? Provided after booking?
- [ ] **What to wear / bring.**

### Stay

- [ ] **Check-in time.** Placeholder: 3pm.
- [ ] **Check-out time.** Placeholder: 11am.
- [ ] **Minimum stay length.** Recommended in plan: 1+ week. Is that a hard minimum or a suggestion?
- [ ] **Maximum stay length.**
- [ ] **What's included.** Private room, private bathroom, daily dinner, wifi, towels, bed linens, laundry access?
- [ ] **What's not included.** Lunch/breakfast? Toiletries?
- [ ] **House rules.** Quiet hours, shoes-off, kitchen use, guests visiting, smoking, alcohol.
- [ ] **Maru (dog) disclosure.** Explicit note on the Stay page: "Maru, a 14-year-old Schnauzer, lives in the home. Guests with dog allergies should not book." Also mirrored in form as a checkbox.
- [ ] **Accessibility notes.** Stairs? Elevator? Floor of the apartment?
- [ ] **Smoking policy.**
- [ ] **ID / registration requirements.** Any Korean legal requirements for hosting foreign guests? Youseop to confirm.

---

## 8. SEO & Sharing Metadata

- [ ] **Site-wide title template.** E.g. `{Page} — Eunjung's Table`.
- [ ] **Home meta description.** ~150 chars. Placeholder: "Local tours, home cooking, and a quiet room in Jeongja with a Korean mom who loves hosting."
- [ ] **Per-page meta descriptions.** One each for Tours / Cooking / Stay.
- [ ] **OG image (1200x630).** Single default is fine; ideally a warm photo of Mom + food or Mom + guest.
- [ ] **OG image per page (optional).** One each would be nicer for link previews.
- [ ] **Favicon.** Confirmed in §1.
- [ ] **Structured data (optional).** `LocalBusiness` / `TouristTrip` / `LodgingBusiness` schema can help with Google. Decide whether to add.
- [ ] **Sitemap.xml + robots.txt.** Dev will generate; nothing to decide content-wise.
- [ ] **Link-preview smoke test.** After launch: paste the URL into KakaoTalk, iMessage, Instagram DM, and WhatsApp to confirm the preview renders correctly.

---

## 9. Analytics & Privacy

- [ ] **Analytics.** Pick one: none / Plausible (privacy-friendly, paid) / Google Analytics 4 (free, invasive) / Vercel Analytics (simple, built-in). Recommendation for a small site with an EU-ish audience: Plausible or Vercel Analytics.
- [ ] **Cookie banner.** Only required if using GA or other tracking cookies. If we stick with Plausible / Vercel Analytics, no banner needed.
- [ ] **Privacy policy.** Required once any form collects personal data. Short version covering: what we collect (form fields), how we use it (replying to inquiries), how long we keep it, who to email for deletion. Placeholder template is fine.
- [ ] **Terms / booking terms.** Optional but good once money is involved. Can live on the same page as the privacy policy.

---

## 10. Launch Checklist

- [ ] Domain purchased. [decided: launch on Vercel-assigned URL; custom domain deferred — 2026-04-18]
- [ ] DNS pointed at Vercel (or chosen host).
- [ ] Vercel project created, production branch configured.
- [ ] Custom domain attached + HTTPS verified.
- [ ] Email forwarding set up (e.g. `hello@<domain>` → Youseop / Mom).
- [ ] Inquiry form live: `RESEND_API_KEY` and `INQUIRY_TO_EMAIL` set in Vercel for Production + Preview; submit a real test inquiry and confirm the email lands in `youseop@speakbridges.com`.
- [ ] All copy reviewed with Mom (ideally read aloud in Korean so she agrees with the voice).
- [ ] All photos have Mom's + guests' consent confirmed.
- [ ] Mobile smoke test on iOS Safari + Android Chrome.
- [ ] Lighthouse pass (perf / a11y / best practices / SEO all ≥ 90 on mobile).
- [ ] Link previews tested (see §8).
- [ ] Form end-to-end test: submit → receive email → reply works.
- [ ] 404 page reachable and on-brand.
- [ ] Analytics verified receiving events (if enabled).
- [ ] Announce plan: who we tell first (Youseop's Korean students), how (email/DM), when.
