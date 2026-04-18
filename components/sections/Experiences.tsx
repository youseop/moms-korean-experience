/**
 * Experiences — wraps the three ExperienceCards vertically.
 *
 * Ports the prototype `.experiences` section + section-head
 * (`design-prototypes/cute-cozy/index.html` markup L803–L892).
 *
 * Each card gets a distinct washi-tape color (sky → butter → peach) and
 * service-tag color (peach → sage → sky) matching the prototype cycle.
 */

import { ExperienceCard } from "@/components/sections/ExperienceCard";
import type { Home } from "@/lib/content";

// Per-index tape + tag palette, matching the prototype card rotation.
const TAPE_CYCLE = ["sky", "butter", "peach"] as const;
const TAG_CYCLE = ["peach", "sage", "sky"] as const;

export type ExperiencesProps = {
  kicker?: string;
  title?: string;
  experiences: Home["experiences"];
};

export function Experiences({
  kicker = "#02 · 3 ways to hang out",
  title = "what we can do together",
  experiences,
}: ExperiencesProps) {
  return (
    <section>
      <div className="relative px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-butter font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          {kicker}
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[38px] leading-[1.05] font-bold">
          {title}
        </h2>
      </div>

      <div className="px-[22px] pt-[6px] pb-[10px]">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            kicker={exp.kicker}
            title={exp.title}
            blurb={exp.blurb}
            ctaLabel={exp.ctaLabel}
            href={exp.href}
            imageId={exp.imageId}
            imageCaption={exp.imageCaption}
            stickerBadge={exp.stickerBadge}
            index={i}
            tagColor={TAG_CYCLE[i % 3]}
            tapeColor={TAPE_CYCLE[i % 3]}
          />
        ))}
      </div>
    </section>
  );
}
