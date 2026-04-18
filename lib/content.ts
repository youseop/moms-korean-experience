import { z } from "zod";

import siteRaw from "@/content/site.json";
import homeRaw from "@/content/home.json";
import toursRaw from "@/content/tours.json";
import cookingRaw from "@/content/cooking.json";
import stayRaw from "@/content/stay.json";
import reviewsRaw from "@/content/reviews.json";

/* ── Shared primitives ─────────────────────────── */
const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const transitSchema = z.object({
  place: z.string(),
  value: z.string(),
});

const galleryItemSchema = z.object({
  imageId: z.string(),
  alt: z.string(),
  rotate: z.number(),
});

const heroSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  lead: z.string(),
  imageId: z.string(),
  imageCaption: z.string(),
});

const maruSchema = z.object({
  kicker: z.string(),
  name: z.string(),
  caption: z.string(),
  allergyNote: z.string(),
  imageId: z.string(),
});

const experienceSchema = z.object({
  id: z.enum(["tours", "cooking", "stay"]),
  kicker: z.string(),
  title: z.string(),
  blurb: z.string(),
  ctaLabel: z.string(),
  href: z.string(),
  imageId: z.string(),
  imageCaption: z.string(),
  stickerBadge: z.string().nullable(),
});

const reviewSchema = z.object({
  id: z.string(),
  service: z.enum(["tours", "cooking", "stay"]),
  guestName: z.string(),
  guestLocation: z.string(),
  date: z.string(),
  quote: z.string(),
  avatarUrl: z.string().url(),
  imageIds: z.array(z.string()),
  rating: z.number().int().min(1).max(5),
  featured: z.boolean(),
  mock: z.boolean(),
});

/* ── Site ──────────────────────────────────────── */
const siteSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  shortDescription: z.string(),
  location: z.string(),
  establishedYear: z.number(),
  host: z.object({
    name: z.string(),
    signoff: z.string(),
  }),
  contact: z.object({
    email: z.string().email(),
    responseTime: z.string(),
  }),
  social: z.object({
    instagram: z.string().nullable(),
    kakaoChannelId: z.string().nullable(),
  }),
});

/* ── Home ──────────────────────────────────────── */
const homeHeroSchema = z.object({
  tagline: z.string(),
  lead: z.string(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  imageId: z.string(),
  imageCaption: z.string(),
});

const homeSchema = z.object({
  hero: homeHeroSchema,
  meetEunjung: z.object({
    kicker: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()),
    pullQuote: z.string(),
    pullQuoteSignoff: z.string(),
    imageIds: z.array(z.string()),
  }),
  experiences: z.array(experienceSchema).length(3),
  gallery: z.object({
    kicker: z.string(),
    title: z.string(),
    caption: z.string(),
    items: z.array(galleryItemSchema),
  }),
  whyJeongja: z.object({
    kicker: z.string(),
    title: z.string(),
    body: z.string(),
    transit: z.array(transitSchema),
  }),
  maru: maruSchema,
  featuredReviewIds: z.array(z.string()),
});

/* ── Tours ─────────────────────────────────────── */
const toursSchema = z.object({
  hero: heroSchema,
  concept: z.object({
    paragraphs: z.array(z.string()),
  }),
  places: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      neighborhood: z.string(),
      blurb: z.string(),
      imageId: z.string(),
    }),
  ),
  howItWorks: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    }),
  ),
  sampleItineraries: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
      imageId: z.string(),
    }),
  ),
  reviewIds: z.array(z.string()),
  inquiryCtaLabel: z.string(),
});

/* ── Cooking ───────────────────────────────────── */
const cookingSchema = z.object({
  hero: heroSchema,
  experience: z.object({
    paragraphs: z.array(z.string()),
  }),
  menus: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      dishes: z.array(z.string()),
      description: z.string(),
      imageId: z.string(),
    }),
  ),
  customMenuNote: z.string(),
  dietaryNote: z.string(),
  seasonalSpecial: z.string(),
  reviewIds: z.array(z.string()),
  inquiryCtaLabel: z.string(),
});

/* ── Stay ──────────────────────────────────────── */
const staySchema = z.object({
  hero: heroSchema,
  room: z.object({
    paragraphs: z.array(z.string()),
  }),
  dailyDinner: z.object({
    blurb: z.string(),
  }),
  whyJeongja: z.object({
    kicker: z.string(),
    title: z.string(),
    body: z.string(),
  }),
  gettingAround: z.array(transitSchema),
  meetMaru: maruSchema,
  houseRules: z.array(z.string()),
  whatsIncluded: z.array(z.string()),
  reviewIds: z.array(z.string()),
  inquiryCtaLabel: z.string(),
});

/* ── Validate at import time ───────────────────── */
export const site = siteSchema.parse(siteRaw);
export const home = homeSchema.parse(homeRaw);
export const tours = toursSchema.parse(toursRaw);
export const cooking = cookingSchema.parse(cookingRaw);
export const stay = staySchema.parse(stayRaw);
export const reviews = z.array(reviewSchema).parse(reviewsRaw);

/* ── Cross-reference validation ────────────────── */
const reviewIdSet = new Set(reviews.map((r) => r.id));

function assertReviewIds(ids: readonly string[], source: string): void {
  for (const id of ids) {
    if (!reviewIdSet.has(id)) {
      throw new Error(
        `[content] Unknown review id "${id}" referenced from ${source}. ` +
          `Add it to content/reviews.json or remove the reference.`,
      );
    }
  }
}

assertReviewIds(home.featuredReviewIds, "home.featuredReviewIds");
assertReviewIds(tours.reviewIds, "tours.reviewIds");
assertReviewIds(cooking.reviewIds, "cooking.reviewIds");
assertReviewIds(stay.reviewIds, "stay.reviewIds");

/* ── Derived types ─────────────────────────────── */
export type Site = typeof site;
export type Home = typeof home;
export type Tours = typeof tours;
export type Cooking = typeof cooking;
export type Stay = typeof stay;
export type Review = (typeof reviews)[number];
export type Service = Review["service"];

/* ── Loaders / helpers ─────────────────────────── */
export function getSite(): Site {
  return site;
}

export function getHome(): Home {
  return home;
}

export function getTours(): Tours {
  return tours;
}

export function getCooking(): Cooking {
  return cooking;
}

export function getStay(): Stay {
  return stay;
}

export function getReviews(): readonly Review[] {
  return reviews;
}

export function reviewsByService(service: Service): Review[] {
  return reviews.filter((r) => r.service === service);
}

export function featuredReviews(): Review[] {
  return reviews.filter((r) => r.featured);
}

export function reviewById(id: string): Review | undefined {
  return reviews.find((r) => r.id === id);
}

export function reviewsByIds(ids: readonly string[]): Review[] {
  return ids.map((id) => reviewById(id)).filter((r): r is Review => r !== undefined);
}
