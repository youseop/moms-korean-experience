/**
 * ReviewCard — one review, rendered as a butter sticky note.
 *
 * Not in the cute/cozy prototype directly — derived per Task 5 §B.7 and
 * `docs/08-design-cute-cozy.md §4`. The quote sits on a yellow
 * `StickyNote`, Patrick Hand attribution sits below; a small circular
 * avatar polaroid attaches at the top-left, and the service tag sits at
 * the top-right as a Patrick Hand stamp.
 */

import Image from "next/image";

import { StickyNote } from "@/components/decoration/StickyNote";
import type { Review } from "@/lib/content";
import { IMG, SIZES } from "@/lib/image-sizes";

const SERVICE_LABEL: Record<Review["service"], string> = {
  tours: "Tours",
  cooking: "Cooking",
  stay: "Stay",
};

export type ReviewCardProps = {
  review: Review;
  /** Optional small alternating tilt (default varies by id hash). */
  tilt?: number;
};

export function ReviewCard({ review, tilt }: ReviewCardProps) {
  // Deterministic small tilt derived from the id string if not provided.
  const fallbackTilt =
    review.id.charCodeAt(0) % 2 === 0 ? -1.8 : 1.4;
  const appliedTilt = tilt ?? fallbackTilt;

  return (
    <div className="relative my-[22px] px-[18px]">
      {/* Service stamp, top-right. */}
      <span
        className="font-stamp text-cocoa absolute right-[14px] -top-[6px] z-[2] rotate-[6deg] rounded-full px-[10px] py-[3px] text-[12px] shadow-warm-soft"
        style={{ background: "var(--color-tape-sage)" }}
      >
        {SERVICE_LABEL[review.service]}
      </span>

      <StickyNote tilt={appliedTilt} withTape className="block">
        <p className="font-display text-cocoa m-0 text-[22px] leading-[1.2]">
          &ldquo;{review.quote}&rdquo;
        </p>
        <div className="mt-[12px] flex items-center gap-[10px]">
          <Image
            src={review.avatarUrl}
            alt={review.guestName}
            width={IMG.avatar.width}
            height={IMG.avatar.height}
            sizes={SIZES.avatar}
            className="h-[36px] w-[36px] rounded-full border-2 border-white shadow-warm-soft"
          />
          <span className="font-stamp text-ink-soft text-[14px]">
            — {review.guestName}, {review.guestLocation}
          </span>
        </div>
      </StickyNote>
    </div>
  );
}
