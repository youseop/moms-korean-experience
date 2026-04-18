/**
 * /tours — Priority 1 detail page. Gets extra visual love per the plan.
 *
 * Composes the cute/cozy detail-page primitives (`components/sections/detail/*`)
 * against `content/tours.json`. Server Component except where the child
 * primitive is intentionally client (`SubNav`, `FloatingInquireFab`).
 *
 * Page order:
 *   0. Breadcrumb ("← back home")
 *   1. SubNav (the idea · mom's spots · how it works · past trips · ask eunjung)
 *   2. DetailHero (peach washi)
 *   3. § The Concept (#concept) — PullRibbon interrupts the prose
 *   4. § Mom's Favorite Places (#places) — HandDrawnMap above + PlacesGrid
 *   5. § How It Works (#how-it-works) — Timeline
 *   6. § Sample Itineraries — polaroid + caption cards
 *   7. § What guests say (#reviews) — Reviews
 *   8. § FAQ (#faq) — FAQ (data hardcoded for now — see note below)
 *   9. § CrossSell — Cooking + Stay
 *  10. § Inquire (#inquire) — InquiryForm with tours pre-checked
 *  11. FloatingInquireFab
 *
 * TODO: FAQ content is hardcoded inline. If we want it editable per-service,
 * add `faq: Array<{ q: string; a: string }>` to `content/tours.json` + the
 * zod schema in `lib/content.ts`. Same for `/cooking` and `/stay`.
 */

import type { Metadata } from "next";

import { ScribbleDivider } from "@/components/decoration/ScribbleDivider";
import { Polaroid } from "@/components/decoration/Polaroid";
import { WashiTape } from "@/components/decoration/WashiTape";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { Reviews } from "@/components/sections/Reviews";
import { Breadcrumb } from "@/components/sections/detail/Breadcrumb";
import { CrossSell } from "@/components/sections/detail/CrossSell";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { FAQ } from "@/components/sections/detail/FAQ";
import { FloatingInquireFab } from "@/components/sections/detail/FloatingInquireFab";
import { HandDrawnMap } from "@/components/sections/detail/HandDrawnMap";
import { PlacesGrid } from "@/components/sections/detail/PlacesGrid";
import { PullRibbon } from "@/components/sections/detail/PullRibbon";
import { SubNav } from "@/components/sections/detail/SubNav";
import { Timeline } from "@/components/sections/detail/Timeline";
import { reviewById, tours } from "@/lib/content";
import { imageUrl } from "@/lib/images";

export const metadata: Metadata = {
  title: "Tours — Eunjung's Table",
  description: tours.hero.lead.slice(0, 155),
  openGraph: {
    title: "Tours with Eunjung — local Korea, hand-picked",
    description: tours.hero.lead,
    type: "article",
  },
};

/**
 * Rough percentage coordinates for each place on the HandDrawnMap's
 * 400×280 viewBox. Not geographic — chosen so pins spread across the
 * kraft canvas with Seoul on the left, outskirts to the right, and
 * Jeongja south-central. Order matches `content/tours.json`'s places.
 */
const PLACE_COORDS: Record<string, { x: number; y: number }> = {
  "ikseon-dong": { x: 28, y: 42 },
  "bukchon-steps": { x: 22, y: 32 },
  "seochon-bookshop": { x: 16, y: 46 },
  "gwangjang-market": { x: 34, y: 52 },
  "jongmyo": { x: 26, y: 56 },
  "yeoju-pottery": { x: 82, y: 60 },
  "gapyeong-countryside": { x: 72, y: 26 },
  "tancheon-sunrise": { x: 40, y: 78 },
};

const FAQ_ITEMS = [
  {
    q: "How long is a typical day?",
    a: "5 to 8 hours door-to-door. Eunjung plans around your pace — she'd rather you linger at one good lunch than rush through five stops. If you want a half-day instead, just say so when you inquire.",
  },
  {
    q: "Can Eunjung speak English?",
    a: "Gentle, patient English. She's been hosting guests for years and can absolutely carry a conversation. For nuanced stuff (deep history, tea-master chat), her son Youseop sometimes joins to translate.",
  },
  {
    q: "What does the day cost?",
    a: "She'll send you a quote after understanding what you're curious about and how many of you are coming. It's not a fixed menu. Expect transparent pricing — her time, the driving if she's driving, a lunch budget you can set.",
  },
  {
    q: "What if it rains?",
    a: "She'll quietly swap the plan to indoor favorites — a tea house, the pottery workshop with a kiln you can watch, a long lunch somewhere cozy. Seoul is full of hidden rainy-day corners she's been collecting for decades.",
  },
  {
    q: "Can we customize the day?",
    a: "Yes — that's the whole idea. Tell her what you want (a particular neighborhood, a food you've been curious about, a quiet day vs. a busy one). She'll send a plan and you edit it from there.",
  },
];

export default function ToursPage() {
  const serviceReviews = tours.reviewIds
    .map((id) => reviewById(id))
    .filter((r): r is NonNullable<ReturnType<typeof reviewById>> => Boolean(r));

  const mapPins = tours.places.map((p) => ({
    id: p.id,
    label: p.name,
    x: PLACE_COORDS[p.id]?.x ?? 50,
    y: PLACE_COORDS[p.id]?.y ?? 50,
  }));

  return (
    <>
      <Breadcrumb href="/" label="back home" />

      <SubNav
        items={[
          { id: "concept", label: "the idea" },
          { id: "places", label: "mom's spots" },
          { id: "how-it-works", label: "how it works" },
          { id: "reviews", label: "past trips" },
          { id: "inquire", label: "ask eunjung" },
        ]}
      />

      {/* 1. Hero */}
      <DetailHero
        kicker={tours.hero.kicker}
        title={tours.hero.title}
        lead={tours.hero.lead}
        imageId={tours.hero.imageId}
        imageCaption={tours.hero.imageCaption}
        washiColor="peach"
      />

      <ScribbleDivider variant="dot" />

      {/* 2. § The Concept */}
      <section id="concept" className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[24px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #01 · the idea
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[12px] text-[34px] leading-[1.05]">
          Not scripted. Not rushed.
        </h2>

        {/* First paragraph */}
        <p className="font-body text-ink-soft text-[15px] leading-[1.7]">
          {tours.concept.paragraphs[0]}
        </p>

        {/* Pull ribbon — takes a memorable phrase from the section. */}
        <PullRibbon
          quote="I'll take you where my family actually goes — no scripts, no rush."
          signoff="— Eunjung"
        />

        {/* Remaining paragraphs */}
        {tours.concept.paragraphs.slice(1).map((p, i) => (
          <p
            key={i}
            className="font-body text-ink-soft mt-[14px] text-[15px] leading-[1.7]"
          >
            {p}
          </p>
        ))}
      </section>

      <ScribbleDivider />

      {/* 3. § Mom's Favorite Places */}
      <section id="places" className="scroll-mt-[120px] pt-[10px] pb-[18px]">
        <div className="px-[22px]">
          <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
            #02 · mom&rsquo;s spots
          </span>
          <h2 className="font-display text-cocoa mt-[6px] mb-[8px] text-[34px] leading-[1.05]">
            Places she&rsquo;d take you.
          </h2>
          <p className="font-body text-ink-soft text-[14.5px] leading-[1.65]">
            Eight corners she returns to. Your day might include a few of them,
            or none — it depends on the weather, the season, and what you
            tell her you&rsquo;re curious about.
          </p>
        </div>

        {/* Illustrated map */}
        <HandDrawnMap pins={mapPins} youAreHerePinId="tancheon-sunrise" />

        {/* Places list */}
        <PlacesGrid places={tours.places} />
      </section>

      <ScribbleDivider variant="dot" />

      {/* 4. § How It Works */}
      <section
        id="how-it-works"
        className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[18px]"
      >
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #03 · how it works
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[10px] text-[34px] leading-[1.05]">
          Three steps, no surprises.
        </h2>
        <Timeline items={tours.howItWorks} />
      </section>

      <ScribbleDivider />

      {/* 5. § Sample Itineraries */}
      <section className="px-[22px] pt-[4px] pb-[18px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #04 · sample days
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[16px] text-[32px] leading-[1.05]">
          Two days she&rsquo;s done before.
        </h2>

        {tours.sampleItineraries.map((it, i) => (
          <article
            key={it.title}
            className="relative my-[20px] px-[4px]"
            style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 0.6}deg)` }}
          >
            <div className="relative mx-auto w-[250px]">
              <WashiTape
                color={i % 2 === 0 ? "sage" : "butter"}
                tilt={-12}
                width={70}
                height={18}
                className="-top-[10px] left-[28px]"
              />
              <Polaroid
                src={imageUrl(it.imageId)}
                alt={it.title}
                width={226}
                height={170}
                className="w-full"
              />
            </div>
            <h3 className="font-display text-cocoa mt-[16px] mb-[6px] inline-block -rotate-[0.6deg] text-[26px] leading-[1.1]">
              {it.title}
            </h3>
            <p className="font-body text-ink-soft m-0 text-[14.5px] leading-[1.65]">
              {it.body}
            </p>
          </article>
        ))}
      </section>

      <ScribbleDivider variant="x" />

      {/* 6. § Reviews */}
      <section id="reviews" className="scroll-mt-[120px]">
        <Reviews
          kicker="#05 · past trips"
          title="people who came along."
          reviews={serviceReviews}
        />
      </section>

      <ScribbleDivider variant="dot" />

      {/* 7. § FAQ */}
      <section id="faq" className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[18px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #06 · questions
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[8px] text-[34px] leading-[1.05]">
          Stuff people ask.
        </h2>
        {/* TODO: Move FAQ_ITEMS to content/tours.json if we want this editable
            without a deploy. For now, hardcoded — see file header comment. */}
        <FAQ items={FAQ_ITEMS} />
      </section>

      <ScribbleDivider />

      {/* 8. § CrossSell */}
      <CrossSell excludeId="tours" />

      <ScribbleDivider variant="x" />

      {/* 9. § Inquire */}
      <section className="px-[22px] pt-[10px] pb-[6px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          ask eunjung
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[6px] text-[32px] leading-[1.05]">
          Want to spend a day with Eunjung?
        </h2>
        <p className="font-stamp text-tomato inline-block -rotate-1 text-[16px]">
          {tours.inquiryCtaLabel}
        </p>
      </section>

      <InquiryForm prefilledExperiences={["tours"]} />

      {/* Floating pill — appears after scrolling past the hero. */}
      <FloatingInquireFab label="Ask Eunjung" />
    </>
  );
}
