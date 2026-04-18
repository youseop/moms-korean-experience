/**
 * Reviews — wraps multiple `ReviewCard`s.
 *
 * Section heading uses the shared kicker-chip + Caveat H2 pattern from the
 * prototype section-head. Layout is single-column on the 420px mobile
 * column.
 */

import { ReviewCard } from "@/components/sections/ReviewCard";
import type { Review } from "@/lib/content";

export type ReviewsProps = {
  kicker?: string;
  title?: string;
  reviews: readonly Review[];
};

export function Reviews({
  kicker = "#05 · from guests",
  title = "what people say.",
  reviews,
}: ReviewsProps) {
  return (
    <section>
      <div className="relative px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-sage font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          {kicker}
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[38px] leading-[1.05] font-bold">
          {title}
        </h2>
      </div>

      <div className="pt-[6px] pb-[10px]">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </section>
  );
}
