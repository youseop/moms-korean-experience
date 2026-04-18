/**
 * /design-preview — Checkpoint 1 component showcase.
 *
 * Every reusable component built in Task 5 is rendered here against real
 * content from `content/home.json` + `content/reviews.json`, so the
 * design can be compared side-by-side with the cute/cozy prototype at
 * `design-prototypes/cute-cozy/index.html`.
 *
 * Not a shipping page; `robots: noindex`. The real Home page comes in
 * Task 6.
 */

import type { Metadata } from "next";

import { DoodleHeart } from "@/components/decoration/DoodleHeart";
import { DoodleStar } from "@/components/decoration/DoodleStar";
import { HandArrow } from "@/components/decoration/HandArrow";
import { Polaroid } from "@/components/decoration/Polaroid";
import { PushPin } from "@/components/decoration/PushPin";
import { ScribbleDivider } from "@/components/decoration/ScribbleDivider";
import { ScribbleUnderline } from "@/components/decoration/ScribbleUnderline";
import { StickerBadge } from "@/components/decoration/StickerBadge";
import { StickyNote } from "@/components/decoration/StickyNote";
import { TornPaperTop } from "@/components/decoration/TornPaperTop";
import { WashiTape } from "@/components/decoration/WashiTape";

import { Experiences } from "@/components/sections/Experiences";
import { Hero } from "@/components/sections/Hero";
import { InquiryCTA } from "@/components/sections/InquiryCTA";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { MaruBlock } from "@/components/sections/MaruBlock";
import { MeetEunjung } from "@/components/sections/MeetEunjung";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { Reviews } from "@/components/sections/Reviews";
import { WhyJeongja } from "@/components/sections/WhyJeongja";

import { CrossSell } from "@/components/sections/detail/CrossSell";
import { DetailHero } from "@/components/sections/detail/DetailHero";
import { FactStrip } from "@/components/sections/detail/FactStrip";
import { FAQ } from "@/components/sections/detail/FAQ";
import { HandDrawnMap } from "@/components/sections/detail/HandDrawnMap";
import { PlaceCard } from "@/components/sections/detail/PlaceCard";
import { Process } from "@/components/sections/detail/Process";
import { PullRibbon } from "@/components/sections/detail/PullRibbon";
import { SubNav } from "@/components/sections/detail/SubNav";
import { Timeline } from "@/components/sections/detail/Timeline";

import { home, reviews, tours } from "@/lib/content";
import { imageUrl } from "@/lib/images";

export const metadata: Metadata = {
  title: "Design preview · Eunjung's Table",
  robots: { index: false, follow: false },
};

export default function DesignPreviewPage() {
  return (
    <>
      {/* Tiny header so reviewers know where they are. */}
      <div className="px-[22px] pt-[12px]">
        <h1 className="font-stamp text-ink-soft text-[13px]">
          Design Preview — Checkpoint 1
        </h1>
      </div>

      <ScribbleDivider />

      {/* =========================================================
           SECTION 1 — Decoration primitives showcase
         ========================================================= */}
      <section className="px-[22px] pt-[14px] pb-[30px]">
        <span className="bg-tape-butter font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          #00 · decoration primitives
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-[16px] text-[32px] leading-[1.05] font-bold">
          the 11 little bits
        </h2>

        {/* Polaroid */}
        <DecoRow label="Polaroid (with caption)">
          <Polaroid
            src={imageUrl("mom-portrait-01")}
            alt="Eunjung portrait"
            width={160}
            height={200}
            caption="mom, summer '24"
            tilt={-3}
          />
        </DecoRow>

        {/* WashiTape — all 5 colors */}
        <DecoRow label="WashiTape — peach / pink / sage / sky / butter">
          <div className="relative flex h-[60px] items-center gap-[14px] pl-[6px]">
            <span className="relative inline-block h-[22px] w-[74px]">
              <WashiTape color="peach" tilt={-6} className="static" />
            </span>
            <span className="relative inline-block h-[22px] w-[74px]">
              <WashiTape color="pink" tilt={4} className="static" />
            </span>
            <span className="relative inline-block h-[22px] w-[74px]">
              <WashiTape color="sage" tilt={-3} className="static" />
            </span>
            <span className="relative inline-block h-[22px] w-[74px]">
              <WashiTape color="sky" tilt={7} className="static" />
            </span>
            <span className="relative inline-block h-[22px] w-[74px]">
              <WashiTape color="butter" tilt={-2} className="static" />
            </span>
          </div>
        </DecoRow>

        {/* ScribbleUnderline */}
        <DecoRow label="ScribbleUnderline on inline text">
          <p className="font-display text-cocoa text-[28px] leading-[1.1]">
            come{" "}
            <ScribbleUnderline>
              <span>stay with me</span>
            </ScribbleUnderline>{" "}
            in Seoul.
          </p>
        </DecoRow>

        {/* HandArrow in 4 directions */}
        <DecoRow label="HandArrow — right / down / left / up">
          <div className="flex items-center gap-[20px]">
            <HandArrow direction="right" length={56} />
            <HandArrow direction="down" length={56} />
            <HandArrow direction="left" length={56} />
            <HandArrow direction="up" length={56} />
          </div>
        </DecoRow>

        {/* DoodleHeart */}
        <DecoRow label="DoodleHeart">
          <div className="flex items-center gap-[14px]">
            <DoodleHeart size={22} fill="#FFD4B5" />
            <DoodleHeart size={26} />
            <DoodleHeart size={30} color="#5C4033" fill="#E94B3C" />
          </div>
        </DecoRow>

        {/* DoodleStar */}
        <DecoRow label="DoodleStar">
          <div className="flex items-center gap-[14px]">
            <DoodleStar size={22} fill="#FFE8A3" />
            <DoodleStar size={26} fill="#B5D5B5" />
            <DoodleStar size={30} fill="#F4B5BB" />
          </div>
        </DecoRow>

        {/* PushPin */}
        <DecoRow label="PushPin">
          <div className="flex items-center gap-[14px]">
            <PushPin size={20} />
            <PushPin size={28} />
          </div>
        </DecoRow>

        {/* StickerBadge */}
        <DecoRow label="StickerBadge">
          <StickerBadge text="★ mom's favorite ★ mom's favorite ★" size={90} />
        </DecoRow>

        {/* TornPaperTop */}
        <DecoRow label="TornPaperTop (sits above a card)">
          <div className="relative w-[260px] pt-[10px]">
            <TornPaperTop color="#fffdf3" className="absolute top-0 left-0 right-0" />
            <div className="bg-[#fffdf3] px-[14px] py-[14px] shadow-warm-soft">
              <p className="font-body text-ink-soft m-0 text-[13px]">
                This card has a torn top edge.
              </p>
            </div>
          </div>
        </DecoRow>

        {/* ScribbleDivider */}
        <DecoRow label="ScribbleDivider — plain / dot / x">
          <ScribbleDivider variant="plain" />
          <ScribbleDivider variant="dot" />
          <ScribbleDivider variant="x" />
        </DecoRow>

        {/* StickyNote */}
        <DecoRow label="StickyNote">
          <StickyNote>
            come hungry. bring photos of your family — I&rsquo;ll show you mine.
            <span className="font-script text-tomato mt-[6px] block text-right text-[16px]">
              — E.
            </span>
          </StickyNote>
        </DecoRow>
      </section>

      <ScribbleDivider variant="dot" />

      {/* =========================================================
           SECTION 2 — Hero
         ========================================================= */}
      <Hero
        tagline={home.hero.tagline}
        lead={home.hero.lead}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
        imageId={home.hero.imageId}
        imageCaption={home.hero.imageCaption}
      />

      <ScribbleDivider variant="dot" />

      {/* =========================================================
           SECTION 3 — Meet Eunjung
         ========================================================= */}
      <MeetEunjung
        kicker={home.meetEunjung.kicker}
        title={home.meetEunjung.title}
        paragraphs={home.meetEunjung.paragraphs}
        pullQuote={home.meetEunjung.pullQuote}
        pullQuoteSignoff={home.meetEunjung.pullQuoteSignoff}
        imageIds={home.meetEunjung.imageIds}
      />

      <ScribbleDivider variant="x" />

      {/* =========================================================
           SECTION 4 — Experiences
         ========================================================= */}
      <Experiences experiences={home.experiences} />

      <ScribbleDivider />

      {/* =========================================================
           SECTION 5 — One ReviewCard + small Reviews block
         ========================================================= */}
      <section className="px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-sage font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          a single review
        </span>
      </section>
      <ReviewCard review={reviews[0]!} />
      <Reviews reviews={reviews} />

      <ScribbleDivider variant="dot" />

      {/* =========================================================
           SECTION 6 — WhyJeongja
         ========================================================= */}
      <WhyJeongja
        kicker={home.whyJeongja.kicker}
        title={home.whyJeongja.title}
        body={home.whyJeongja.body}
        transit={home.whyJeongja.transit}
      />

      <ScribbleDivider />

      {/* =========================================================
           SECTION 7 — MaruBlock
         ========================================================= */}
      <MaruBlock
        kicker={home.maru.kicker}
        name={home.maru.name}
        caption={home.maru.caption}
        allergyNote={home.maru.allergyNote}
        imageId={home.maru.imageId}
      />

      <ScribbleDivider variant="x" />

      {/* =========================================================
           SECTION 8 — InquiryCTA + InquiryForm
         ========================================================= */}
      <InquiryCTA label="write to Eunjung" />
      <InquiryForm />

      <ScribbleDivider variant="x" />

      {/* =========================================================
           SECTION 9 — Detail-page primitives (Tasks 7–9 shared)
         ========================================================= */}
      <section className="px-[22px] pt-[14px] pb-[12px]">
        <span className="bg-tape-peach font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          #09 · detail-page primitives
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-[12px] text-[32px] leading-[1.05] font-bold">
          the Tours / Cooking / Stay bits
        </h2>
        <p className="font-body text-ink-soft text-[14px] leading-[1.6]">
          Shared components the three detail pages compose. Previewed with
          mock copy so designers can flag issues before all three pages
          ship.
        </p>
      </section>

      {/* SubNav — previews as sticky under the header on this page too. */}
      <SubNav
        items={[
          { id: "deco-subnav-one", label: "first" },
          { id: "deco-subnav-two", label: "second" },
          { id: "deco-subnav-three", label: "third" },
          { id: "deco-subnav-four", label: "fourth" },
        ]}
      />

      {/* DetailHero with mock content. */}
      <DetailHero
        kicker="Preview · DetailHero"
        title="Places she'd take her own kids."
        lead="A mock lead paragraph, the kind of sentence that'd sit under a detail-page hero. It fits inside the 420px column and breathes a bit."
        imageId="mom-portrait-01"
        imageCaption="a mock caption"
        washiColor="peach"
      />

      <ScribbleDivider variant="dot" />

      {/* FactStrip — 4 mock facts. */}
      <section className="px-[22px] pt-[10px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          FactStrip
        </span>
      </section>
      <FactStrip
        facts={[
          { k: "Duration", v: "5–7 hours" },
          { k: "Group size", v: "1–4" },
          { k: "Meeting point", v: "Jeongja Station" },
          { k: "Bring", v: "comfy shoes" },
        ]}
      />

      {/* Timeline — 3 mock steps. */}
      <section className="px-[22px] pt-[6px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          Timeline
        </span>
      </section>
      <Timeline
        items={[
          {
            time: "morning",
            title: "Meet at the station",
            body: "Eunjung is usually 10 minutes early and waves from somewhere obvious. She'll have a thermos.",
          },
          {
            time: "midday",
            title: "A long, slow lunch",
            body: "Somewhere she trusts, usually with seats for six and a grandmother at the stove. Allergies? Tell her.",
          },
          {
            time: "late",
            title: "Home when the day asks",
            body: "Dusk, or later. If you're having too much fun she'll text your host to say you'll be a bit.",
          },
        ]}
      />

      {/* PullRibbon */}
      <section className="px-[22px] pt-[6px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          PullRibbon
        </span>
      </section>
      <PullRibbon
        quote="Not scripted, not touristy — just the corner of Korea I know best."
        signoff="— Eunjung"
      />

      {/* HandDrawnMap — 4 mock pins. */}
      <section className="px-[22px] pt-[6px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          HandDrawnMap
        </span>
      </section>
      <HandDrawnMap
        pins={[
          { id: "p1", label: "Ikseon-dong", x: 30, y: 42 },
          { id: "p2", label: "Bukchon", x: 22, y: 30 },
          { id: "p3", label: "Gapyeong", x: 74, y: 28 },
          { id: "p4", label: "Jeongja", x: 38, y: 74 },
        ]}
        youAreHerePinId="p4"
      />

      {/* PlaceCard (single) */}
      <section className="px-[22px] pt-[6px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          PlaceCard (one)
        </span>
      </section>
      <div className="px-[22px]">
        <PlaceCard
          name={tours.places[0].name}
          neighborhood={tours.places[0].neighborhood}
          blurb={tours.places[0].blurb}
          imageId={tours.places[0].imageId}
          pinNumber={1}
          tapeColor="peach"
          index={0}
        />
      </div>

      {/* Process — 3 mock steps. */}
      <section className="px-[22px] pt-[6px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          Process
        </span>
      </section>
      <Process
        steps={[
          {
            title: "Send her a note",
            body: "A few lines is enough — when you're here, how long you have, what you're curious about.",
          },
          {
            title: "She sends a rough plan",
            body: "Within a day or two. It's a starting point — you'll edit it together over a back-and-forth.",
          },
          {
            title: "Spend the day",
            body: "No paperwork the morning-of. Just show up at the meeting point she picks.",
          },
        ]}
      />

      {/* FAQ — 3 mock items. */}
      <section className="px-[22px] pt-[6px] pb-[0px]">
        <span className="font-stamp text-ink-soft inline-block -rotate-2 text-[12px] tracking-[0.08em] uppercase">
          FAQ
        </span>
      </section>
      <FAQ
        items={[
          {
            q: "How long is a typical day?",
            a: "Usually 5 to 7 hours. Eunjung plans around your pace, not a stopwatch.",
          },
          {
            q: "Can Eunjung speak English?",
            a: "Gentle, patient English — plenty for a full day together.",
          },
          {
            q: "What if it rains?",
            a: "She quietly swaps to indoor favorites — a tea house, the workshop with the kiln, a long cozy lunch.",
          },
        ]}
      />

      {/* CrossSell excluding tours */}
      <CrossSell excludeId="tours" />
    </>
  );
}

/**
 * Small label wrapper that puts a Patrick Hand caption under each
 * decoration primitive example.
 */
function DecoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="my-[24px]">
      <div className="relative">{children}</div>
      <div className="font-stamp text-ink-soft mt-[10px] text-[12px] tracking-[0.02em]">
        {label}
      </div>
    </div>
  );
}
