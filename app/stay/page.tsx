/**
 * /stay — Priority 3 detail page.
 *
 * Composes the cute/cozy detail-page primitives (`components/sections/detail/*`)
 * against `content/stay.json`. Server Component except where the child
 * primitive is intentionally client (`SubNav`, `FloatingInquireFab`,
 * `InquiryForm`).
 *
 * Page order:
 *   0. Breadcrumb ("← back home")
 *   1. SubNav (the room · every dinner · jeongja · around · maru · rules ·
 *      past stays · ask eunjung)
 *   2. DetailHero (sky washi)
 *   3. § The Room (#room) — prose + FloorPlan signature element
 *   4. § Daily Dinner (#dinner) — prose + PullRibbon
 *   5. § Why Jeongja (#jeongja) — prose + 4-item transit grid
 *      (reuses stay.gettingAround subset since stay.whyJeongja has no transit)
 *   6. § Getting Around (#around) — NearbyList
 *   7. § Meet Maru (#maru) — reuses MaruBlock with home.maru data
 *   8. § House Rules (#rules) — HouseRules
 *   9. § What's Included — HouseRules again (same visual container)
 *  10. § Reviews (#reviews) — Reviews
 *  11. § FAQ (#faq) — FAQ (data hardcoded — see TODO below)
 *  12. § CrossSell — Tours + Cooking
 *  13. § Inquire (#inquire) — InquiryForm with stay pre-checked
 *  14. FloatingInquireFab
 *
 * TODO: FAQ content is hardcoded. If we want per-service editable FAQ,
 * add `faq: Array<{ q: string; a: string }>` to `content/stay.json` + the
 * zod schema in `lib/content.ts`. (Same note on `/tours` and `/cooking`.)
 */

import type { Metadata } from "next";

import { ScribbleDivider } from "@/components/decoration/ScribbleDivider";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { MaruBlock } from "@/components/sections/MaruBlock";
import { Reviews } from "@/components/sections/Reviews";
import { Breadcrumb } from "@/components/sections/detail/Breadcrumb";
import { CrossSell } from "@/components/sections/detail/CrossSell";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { FAQ } from "@/components/sections/detail/FAQ";
import { FloatingInquireFab } from "@/components/sections/detail/FloatingInquireFab";
import { FloorPlan } from "@/components/sections/detail/FloorPlan";
import { HouseRules } from "@/components/sections/detail/HouseRules";
import { NearbyList } from "@/components/sections/detail/NearbyList";
import { PullRibbon } from "@/components/sections/detail/PullRibbon";
import { SubNav } from "@/components/sections/detail/SubNav";
import { home, reviewById, stay } from "@/lib/content";
import { defaultOpenGraphImages } from "@/lib/site-url";

// `title` is a plain string so the root layout's `title.template` wraps it
// into "Stay — Eunjung's Table". OG image/siteName are inherited from
// `app/layout.tsx` — we only override the OG title/description/type.
export const metadata: Metadata = {
  title: "Stay",
  description: stay.hero.lead.slice(0, 155),
  openGraph: {
    ...defaultOpenGraphImages,
    title: "Stay at Eunjung's home in Jeongja",
    description: stay.hero.lead,
    type: "article",
  },
};

/**
 * Approximate 320x220 floor-plan layout of the apartment. Not to scale —
 * chosen so the guest's room + bathroom clearly occupy the "yours" half.
 * The shared kitchen + living+balcony fill the rest. Matches the spec in
 * Task 9 deliverable A (4-5 rooms, guest room + guest bath highlighted).
 */
const FLOOR_PLAN_ROOMS = [
  {
    id: "guest-room",
    name: "guest room",
    sub: "yours",
    x: 14,
    y: 16,
    w: 150,
    h: 110,
    isGuest: true,
  },
  {
    id: "guest-bath",
    name: "guest bath",
    sub: "yours ☆",
    x: 170,
    y: 16,
    w: 80,
    h: 58,
    isGuest: true,
  },
  { id: "kitchen", name: "kitchen", sub: "share", x: 170, y: 78, w: 136, h: 56 },
  {
    id: "living",
    name: "living + balcony",
    sub: "share",
    x: 14,
    y: 132,
    w: 292,
    h: 72,
  },
];

/**
 * FAQ — hardcoded for now. See header TODO. Five questions tuned to the
 * Stay's concerns: minimum stay, partners, allergies (→ Maru), laundry,
 * and whether guests can cook themselves.
 */
const FAQ_ITEMS = [
  {
    q: "What's the minimum stay?",
    a: "A week feels like the real sweet spot — that's when guests stop being guests and dinner starts feeling like a habit. Shorter stays are possible if Eunjung's schedule allows; write to her and ask.",
  },
  {
    q: "Can I bring a partner?",
    a: "Yes. The guest room has a queen bed and fits two comfortably. The dinners and the house rhythm are set up for a pair just as easily as for one. Mention it in your note so Eunjung can plan portions.",
  },
  {
    q: "What if I'm allergic to dogs?",
    a: "Then this stay isn't the right fit — Maru (a 14-year-old schnauzer) lives in the home. Please tell Eunjung when you write so she can point you to Tours or Cooking instead.",
  },
  {
    q: "Is there laundry?",
    a: "Yes — a washing machine you're welcome to use, plus a drying rack on the balcony. Towels and linens are changed weekly. For longer stays, Eunjung can show you the building's dryer too.",
  },
  {
    q: "Can I cook in the kitchen too?",
    a: "Absolutely. The kitchen is shared, so stockpots, knives, rice cooker — all yours to use. If you'd like a cooking lesson on top of the stay, Eunjung loves doing that (see the Cooking page).",
  },
];

export default function StayPage() {
  const serviceReviews = stay.reviewIds
    .map((id) => reviewById(id))
    .filter((r): r is NonNullable<ReturnType<typeof reviewById>> => Boolean(r));

  return (
    <>
      <Breadcrumb href="/" label="back home" />

      <SubNav
        items={[
          { id: "room", label: "the room" },
          { id: "dinner", label: "every dinner" },
          { id: "jeongja", label: "jeongja" },
          { id: "around", label: "around" },
          { id: "maru", label: "maru" },
          { id: "rules", label: "rules" },
          { id: "reviews", label: "past stays" },
          { id: "inquire", label: "ask eunjung" },
        ]}
      />

      {/* 1. Hero */}
      <DetailHero
        kicker={stay.hero.kicker}
        title={stay.hero.title}
        lead={stay.hero.lead}
        imageId={stay.hero.imageId}
        imageCaption={stay.hero.imageCaption}
        washiColor="sky"
      />

      <ScribbleDivider variant="dot" />

      {/* 2. § The Room */}
      <section id="room" className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[8px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #01 · the room
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[12px] text-[34px] leading-[1.05]">
          A room that stays quiet.
        </h2>

        {stay.room.paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-body text-ink-soft mt-[12px] text-[15px] leading-[1.7]"
          >
            {p}
          </p>
        ))}
      </section>

      {/* Floor plan — the Stay page's signature element. */}
      <FloorPlan
        rooms={FLOOR_PLAN_ROOMS}
        caption="your bits ↑ guest room + guest bath have your name on them"
      />

      <ScribbleDivider />

      {/* 3. § Daily Dinner */}
      <section id="dinner" className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[6px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #02 · every dinner
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[12px] text-[34px] leading-[1.05]">
          Dinner, every evening.
        </h2>
        <p className="font-body text-ink-soft text-[15px] leading-[1.7]">
          {stay.dailyDinner.blurb}
        </p>

        <PullRibbon
          quote="Whatever I cook for my family that night — you eat that too."
          signoff="— Eunjung"
        />
      </section>

      <ScribbleDivider variant="dot" />

      {/* 4. § Why Jeongja */}
      <section id="jeongja" className="scroll-mt-[120px] pt-[10px] pb-[4px]">
        <div className="px-[22px]">
          <span className="bg-tape-sky font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
            {stay.whyJeongja.kicker}
          </span>
          <h2 className="font-display text-cocoa mt-[8px] mb-[10px] text-[34px] leading-[1.05]">
            {stay.whyJeongja.title}
          </h2>
          <p className="font-body text-ink-soft my-[14px] text-[15px] leading-[1.65]">
            {stay.whyJeongja.body}
          </p>

          {/* 4-item transit grid mirroring Home's WhyJeongja treatment. We
              inline it here rather than reuse the component because stay's
              whyJeongja schema doesn't ship a `transit` array — we slice
              the first 4 entries off stay.gettingAround. */}
          <div className="mt-[14px] mb-[20px] grid grid-cols-2 gap-[12px]">
            {stay.gettingAround.slice(0, 4).map((t, i) => (
              <div
                key={t.place}
                className="bg-[#fffdf7] border border-dashed border-cocoa/20 px-[10px] py-[12px] shadow-warm-soft text-center"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.2 : 0.9}deg)` }}
              >
                <div className="font-stamp text-ink-soft text-[12px] tracking-[0.02em]">
                  {t.place}
                </div>
                <div className="font-display text-cocoa mt-[2px] text-[22px] leading-[1]">
                  {t.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScribbleDivider />

      {/* 5. § Getting Around */}
      <section id="around" className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[4px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #03 · getting around
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[6px] text-[32px] leading-[1.05]">
          By foot, train, bus.
        </h2>
        <p className="font-body text-ink-soft text-[14.5px] leading-[1.6]">
          Jeongja sits on the neunggok / bundang line — quiet streets at the
          door, a subway that takes you into Seoul when you want it back.
        </p>
      </section>

      <NearbyList
        places={stay.gettingAround.map((g) => ({
          place: g.place,
          distance: g.value,
          mode: inferMode(g.place, g.value),
        }))}
        starIndex={0}
      />

      <ScribbleDivider variant="x" />

      {/* 6. § Meet Maru — reuses the MaruBlock from Home. */}
      <section id="maru" className="scroll-mt-[120px]">
        <MaruBlock
          kicker={home.maru.kicker}
          name={home.maru.name}
          caption={home.maru.caption}
          allergyNote={home.maru.allergyNote}
          imageId={home.maru.imageId}
        />
      </section>

      <ScribbleDivider variant="dot" />

      {/* 7. § House Rules */}
      <section id="rules" className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #04 · house rules
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[6px] text-[32px] leading-[1.05]">
          A few small things.
        </h2>
      </section>
      <HouseRules rules={stay.houseRules} />

      <ScribbleDivider />

      {/* 8. § What's Included — same visual container as House Rules. */}
      <section className="px-[22px] pt-[10px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #05 · what&rsquo;s included
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[6px] text-[32px] leading-[1.05]">
          Included with your stay.
        </h2>
      </section>
      <HouseRules rules={stay.whatsIncluded} />

      <ScribbleDivider variant="x" />

      {/* 9. § Reviews */}
      <section id="reviews" className="scroll-mt-[120px]">
        <Reviews
          kicker="#06 · past stays"
          title="they slept here. they came back."
          reviews={serviceReviews}
        />
      </section>

      <ScribbleDivider variant="dot" />

      {/* 10. § FAQ */}
      <section id="faq" className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[18px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #07 · questions
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[8px] text-[34px] leading-[1.05]">
          Stuff guests ask.
        </h2>
        {/* TODO: Move FAQ_ITEMS to content/stay.json if we want this editable
            without a deploy. See file header. */}
        <FAQ items={FAQ_ITEMS} />
      </section>

      <ScribbleDivider />

      {/* 11. § CrossSell */}
      <CrossSell excludeId="stay" />

      <ScribbleDivider variant="x" />

      {/* 12. § Inquire */}
      <section className="px-[22px] pt-[10px] pb-[6px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          ask eunjung
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[6px] text-[32px] leading-[1.05]">
          Want to stay a while?
        </h2>
        <p className="font-stamp text-tomato inline-block -rotate-1 text-[16px]">
          {stay.inquiryCtaLabel}
        </p>
      </section>

      <InquiryForm prefilledExperiences={["stay"]} />

      {/* Floating pill — appears after scrolling past the hero. */}
      <FloatingInquireFab label="Ask Eunjung" />
    </>
  );
}

/**
 * Best-effort mode hint for the NearbyList — keyed off common keywords in
 * the place name + distance string. Falls back to undefined (NearbyList
 * gracefully omits the mode line when absent).
 */
function inferMode(place: string, distance: string): string | undefined {
  const hay = `${place} ${distance}`.toLowerCase();
  if (hay.includes("walk")) return "walk";
  if (hay.includes("subway")) return "subway";
  if (hay.includes("bus")) return "bus";
  if (hay.includes("airport")) return "bus";
  return undefined;
}
