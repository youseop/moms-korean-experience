/**
 * /cooking — Priority 2 detail page.
 *
 * Composes the cute/cozy detail-page primitives against `content/cooking.json`,
 * plus the cooking-specific `MenuCard` signature component. Mirrors the
 * section order from `/tours/page.tsx` (Breadcrumb → SubNav → DetailHero →
 * page-specific signature → reviews → FAQ → CrossSell → InquiryForm → FAB)
 * so the three detail pages feel like siblings.
 *
 * Page order:
 *   0. Breadcrumb ("← back home")
 *   1. SubNav (the day · 3 menus · dietary · past cooks · ask eunjung)
 *   2. DetailHero (pink washi — Tours uses peach, keeping colors distinct)
 *   3. § The Experience (#experience) — paragraphs + PullRibbon
 *   4. § Menus (#menus) — 3 stacked MenuCards (A/B/C)
 *   5. § Custom + Dietary (#dietary) — two callouts in StickyNotes
 *   6. § Seasonal Special — Patrick Hand kicker + blurb
 *   7. § Reviews (#reviews) — cooking-service Reviews
 *   8. § FAQ (#faq) — hardcoded FAQs (see TODO)
 *   9. § CrossSell — Tours + Stay
 *  10. § Inquire (#inquire) — InquiryForm with cooking pre-checked
 *  11. FloatingInquireFab
 *
 * TODO: FAQ content is hardcoded inline (same pattern as /tours). If we
 * want it editable per-service, add `faq: Array<{ q; a }>` to
 * `content/cooking.json` + the zod schema in `lib/content.ts`.
 */

import type { Metadata } from "next";

import { ScribbleDivider } from "@/components/decoration/ScribbleDivider";
import { ScribbleUnderline } from "@/components/decoration/ScribbleUnderline";
import { StickyNote } from "@/components/decoration/StickyNote";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { Reviews } from "@/components/sections/Reviews";
import { Breadcrumb } from "@/components/sections/detail/Breadcrumb";
import { CrossSell } from "@/components/sections/detail/CrossSell";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { FAQ } from "@/components/sections/detail/FAQ";
import { FloatingInquireFab } from "@/components/sections/detail/FloatingInquireFab";
import { MenuCard } from "@/components/sections/detail/MenuCard";
import { PullRibbon } from "@/components/sections/detail/PullRibbon";
import { SubNav } from "@/components/sections/detail/SubNav";
import { cooking, reviewsByIds } from "@/lib/content";
import { defaultOpenGraphImages } from "@/lib/site-url";

// `title` is a plain string so the root layout's `title.template` wraps it
// into "Cooking class — Eunjung's Table". OG image/siteName are inherited
// from `app/layout.tsx` — we only override the OG title/description/type.
export const metadata: Metadata = {
  title: "Cooking class",
  description: cooking.hero.lead.slice(0, 155),
  openGraph: {
    ...defaultOpenGraphImages,
    title: "Cook a Korean meal with Eunjung",
    description: cooking.hero.lead,
    type: "article",
  },
};

/**
 * Washi colors per menu card. Menu A (Eunjung's pick) gets peach so it
 * visually aligns with the sticker-badge's warm palette; B is calmer sage
 * (vegetable-forward menu), C is sky (meat-lover's menu).
 */
const MENU_COLORS = ["peach", "sage", "sky"] as const;
const MENU_LETTERS = ["A", "B", "C"] as const;

const FAQ_ITEMS = [
  {
    q: "How long is a class?",
    a: "About three hours, door-to-door. That includes plenty of time for tea and chatting while things cook — nobody's standing over a stopwatch.",
  },
  {
    q: "How many people per session?",
    a: "One to four. The kitchen fits that count comfortably around the counter, and Eunjung likes to be able to answer every question without raising her voice.",
  },
  {
    q: "What if I have a serious allergy?",
    a: "Tell her when you inquire — ideally three or more days before. She'll swap ingredients cleanly (no hidden sesame, no peanut cross-contact) and walk through the menu with you in advance so there are no surprises.",
  },
  {
    q: "Do we eat the food after?",
    a: "Yes — that's the whole point. When the cooking is done you sit down at the kitchen table together and eat what you made, usually with a pot of barley tea or a small glass of makgeolli.",
  },
  {
    q: "Can I bring leftovers home?",
    a: "Of course. She sends leftovers home in a Tupperware, and if you want, a small jar of her kimchi to go with it.",
  },
];

export default function CookingPage() {
  const serviceReviews = reviewsByIds(cooking.reviewIds);

  return (
    <>
      <Breadcrumb href="/" label="back home" />

      <SubNav
        items={[
          { id: "experience", label: "the day" },
          { id: "menus", label: "3 menus" },
          { id: "dietary", label: "dietary" },
          { id: "reviews", label: "past cooks" },
          { id: "inquire", label: "ask eunjung" },
        ]}
      />

      {/* 1. Hero */}
      <DetailHero
        kicker={cooking.hero.kicker}
        title={cooking.hero.title}
        lead={cooking.hero.lead}
        imageId={cooking.hero.imageId}
        imageCaption={cooking.hero.imageCaption}
        washiColor="pink"
      />

      <ScribbleDivider variant="dot" />

      {/* 2. § The Experience */}
      <section
        id="experience"
        className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[24px]"
      >
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #01 · the day
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[12px] text-[34px] leading-[1.05]">
          Cook at her counter, not in front of her.
        </h2>

        {/* First paragraph */}
        <p className="font-body text-ink-soft text-[15px] leading-[1.7]">
          {cooking.experience.paragraphs[0]}
        </p>

        {/* Pull ribbon — pulls a warm phrase from the Cooking voice. */}
        <PullRibbon
          quote="You eat what you cook — and leftovers come home with you."
          signoff="— Eunjung"
        />

        {/* Remaining paragraphs */}
        {cooking.experience.paragraphs.slice(1).map((p, i) => (
          <p
            key={i}
            className="font-body text-ink-soft mt-[14px] text-[15px] leading-[1.7]"
          >
            {p}
          </p>
        ))}
      </section>

      <ScribbleDivider />

      {/* 3. § Menus */}
      <section id="menus" className="scroll-mt-[120px] pt-[10px] pb-[6px]">
        <div className="px-[22px]">
          <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
            #02 · what you&rsquo;ll cook
          </span>
          <h2 className="font-display text-cocoa mt-[6px] mb-[8px] text-[34px] leading-[1.05]">
            Three set menus, plus what you ask for.
          </h2>
          <p className="font-body text-ink-soft text-[14.5px] leading-[1.65]">
            Pick one, or tell Eunjung what you&rsquo;re curious about and
            she&rsquo;ll build the class around it. Every menu includes a
            seasonal side that changes with the market.
          </p>
        </div>

        {cooking.menus.map((menu, i) => (
          <MenuCard
            key={menu.id}
            name={menu.name}
            letter={MENU_LETTERS[i] ?? "A"}
            dishes={menu.dishes}
            description={menu.description}
            imageId={menu.imageId}
            accentColor={MENU_COLORS[i] ?? "peach"}
          />
        ))}
      </section>

      <ScribbleDivider variant="dot" />

      {/* 4. § Custom + Dietary */}
      <section
        id="dietary"
        className="scroll-mt-[120px] px-[22px] pt-[10px] pb-[18px]"
      >
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #03 · custom &amp; dietary
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[14px] text-[32px] leading-[1.05]">
          Tell her what you need.
        </h2>

        {/* Custom-menu note — butter StickyNote (default). */}
        <div className="my-[20px]">
          <StickyNote tilt={-1.6}>
            <ScribbleUnderline>
              <span>Want to learn something else?</span>
            </ScribbleUnderline>{" "}
            {cooking.customMenuNote.replace(
              /^Want to learn something else\?\s*/,
              "",
            )}
          </StickyNote>
        </div>

        {/* Dietary note — same component, no washi tape, peach tint via
            inline style. Adds explicit "3 days" microcopy underneath. */}
        <div className="my-[22px]">
          <StickyNote
            tilt={1.2}
            withTape={false}
            style={{ background: "var(--color-tape-peach)" }}
          >
            {cooking.dietaryNote.split(/(allergy-friendly)/).map((part, i) =>
              part === "allergy-friendly" ? (
                <ScribbleUnderline key={i}>
                  <span>{part}</span>
                </ScribbleUnderline>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </StickyNote>
          <p className="font-stamp text-ink-soft mt-[10px] ml-[6px] text-[12px] tracking-[0.04em] -rotate-1">
            ↳ tell us at least 3 days ahead so she can shop for the swap.
          </p>
        </div>
      </section>

      <ScribbleDivider />

      {/* 5. § Seasonal Special */}
      <section className="px-[22px] pt-[6px] pb-[18px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          #04 · what&rsquo;s seasonal?
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[10px] text-[32px] leading-[1.05]">
          Whatever looked best this morning.
        </h2>
        <p className="font-body text-ink-soft text-[15px] leading-[1.7]">
          {cooking.seasonalSpecial}
        </p>
      </section>

      <ScribbleDivider variant="x" />

      {/* 6. § Reviews */}
      <section id="reviews" className="scroll-mt-[120px]">
        <Reviews
          kicker="#05 · past cooks"
          title="they came hungry, left full."
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
        {/* TODO: Move FAQ_ITEMS to content/cooking.json if we want this
            editable without a deploy. For now, hardcoded — see file header. */}
        <FAQ items={FAQ_ITEMS} />
      </section>

      <ScribbleDivider />

      {/* 8. § CrossSell */}
      <CrossSell excludeId="cooking" />

      <ScribbleDivider variant="x" />

      {/* 9. § Inquire */}
      <section className="px-[22px] pt-[10px] pb-[6px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          ask eunjung
        </span>
        <h2 className="font-display text-cocoa mt-[6px] mb-[6px] text-[32px] leading-[1.05]">
          Want to cook with Eunjung?
        </h2>
        <p className="font-stamp text-tomato inline-block -rotate-1 text-[16px]">
          {cooking.inquiryCtaLabel}
        </p>
      </section>

      <InquiryForm prefilledExperiences={["cooking"]} />

      {/* Floating pill — appears after scrolling past the hero. */}
      <FloatingInquireFab label="Ask Eunjung" />
    </>
  );
}
