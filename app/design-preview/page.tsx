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

import { home, reviews } from "@/lib/content";
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
