/**
 * Home (`/`) — the real shipping front page.
 *
 * Composes the Task 5 section components in priority order against the
 * `home` data exported from `lib/content.ts`. All copy + imageIds live in
 * `content/home.json`; this file just wires sections together.
 *
 * Anchor target `id="inquire"` lives on the `InquiryForm` component itself
 * (see `components/sections/InquiryForm.tsx`), so InquiryCTA pills and any
 * `href="#inquire"` link from elsewhere on the page scroll to the form.
 * Smooth-scroll behavior is set globally in `app/globals.css`.
 *
 * The `/design-preview` route is a separate showcase that includes the
 * same components against the same content; it must keep working.
 */

import type { Metadata } from "next";

import { ScribbleDivider } from "@/components/decoration/ScribbleDivider";
import { Experiences } from "@/components/sections/Experiences";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Hero } from "@/components/sections/Hero";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { MaruBlock } from "@/components/sections/MaruBlock";
import { MeetEunjung } from "@/components/sections/MeetEunjung";
import { Reviews } from "@/components/sections/Reviews";
import { WhyJeongja } from "@/components/sections/WhyJeongja";
import { home, reviewById, site } from "@/lib/content";
import { defaultOpenGraphImages } from "@/lib/site-url";

// Home uses `title.absolute` so it isn't wrapped by the root layout's
// `title.template`. The rest of the metadata (description, OG image, OG
// siteName, locale, twitter card, metadataBase) is inherited from
// `app/layout.tsx` — we only override what's page-specific here.
export const metadata: Metadata = {
  title: {
    absolute: `${site.brandName} — ${site.tagline.replace(/\.$/, "")}`,
  },
  description: site.shortDescription,
  openGraph: {
    ...defaultOpenGraphImages,
    title: `${site.brandName} — ${site.tagline.replace(/\.$/, "")}`,
    description: site.shortDescription,
    type: "website",
  },
};

export default function HomePage() {
  // Look up the featured reviews from the home content's id list. Filter
  // out any unknowns defensively — `lib/content.ts` already throws at import
  // for unknown ids, so this filter is belt-and-suspenders for the type
  // narrowing rather than runtime safety.
  const featured = home.featuredReviewIds
    .map((id) => reviewById(id))
    .filter((r): r is NonNullable<ReturnType<typeof reviewById>> => Boolean(r));

  return (
    <>
      {/* 1. Hero — tagline + lead + polaroid + CTA. */}
      <Hero
        tagline={home.hero.tagline}
        lead={home.hero.lead}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
        imageId={home.hero.imageId}
        imageCaption={home.hero.imageCaption}
      />

      {/* 2. Meet Eunjung — overlapping polaroids + pull quote. */}
      <MeetEunjung
        kicker={home.meetEunjung.kicker}
        title={home.meetEunjung.title}
        paragraphs={home.meetEunjung.paragraphs}
        pullQuote={home.meetEunjung.pullQuote}
        pullQuoteSignoff={home.meetEunjung.pullQuoteSignoff}
        imageIds={home.meetEunjung.imageIds}
      />

      <ScribbleDivider variant="dot" />

      {/* 3. Experiences — Tours / Cooking / Stay (priority order). */}
      <Experiences experiences={home.experiences} />

      {/* 4. Gallery — 6 polaroid thumbs with Lightbox. */}
      <GalleryGrid
        kicker={home.gallery.kicker}
        title={home.gallery.title}
        caption={home.gallery.caption}
        items={home.gallery.items}
      />

      <ScribbleDivider />

      {/* 5. Past guests — featured reviews lookup-from-ids. The Reviews
          section already renders its own kicker chip + Caveat title; we
          override defaults to "Past guests" for the Home page voice. */}
      <Reviews kicker="Past guests" title="people who came over." reviews={featured} />

      {/* 6. Why Jeongja — neighborhood pitch + transit grid. */}
      <WhyJeongja
        kicker={home.whyJeongja.kicker}
        title={home.whyJeongja.title}
        body={home.whyJeongja.body}
        transit={home.whyJeongja.transit}
      />

      {/* 7. Maru — the dog block, with allergy note. */}
      <MaruBlock
        kicker={home.maru.kicker}
        name={home.maru.name}
        caption={home.maru.caption}
        allergyNote={home.maru.allergyNote}
        imageId={home.maru.imageId}
      />

      <ScribbleDivider variant="x" />

      {/* 8. Inquiry form — visitors pick their own experiences. The
          `id="inquire"` anchor + scroll-mt offset live inside InquiryForm
          itself, so we don't need a wrapping section here. */}
      <InquiryForm />
    </>
  );
}
