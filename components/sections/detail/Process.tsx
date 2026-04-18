/**
 * Process — "how booking works" card stack.
 *
 * Same DNA as `Timeline` but designed for 3–4 longer, prose-heavy steps
 * where each step feels like its own small paper card. Each step:
 *   - Big Caveat tomato numeral.
 *   - Caveat title.
 *   - Nunito body paragraph.
 * Dotted cocoa borders separate cards.
 *
 * Not in the cute/cozy prototype — designed per the detail-page plan in
 * `docs/03-dev-plan.md`.
 */

export type ProcessStep = {
  title: string;
  body: string;
};

export type ProcessProps = {
  steps: readonly ProcessStep[];
  className?: string;
};

export function Process({ steps, className = "" }: ProcessProps) {
  return (
    <ol className={`mx-[22px] my-[14px] list-none p-0 ${className}`}>
      {steps.map((s, i) => {
        const n = String(i + 1).padStart(2, "0");
        return (
          <li
            key={`${s.title}-${i}`}
            className="relative bg-[#fffdf7] border border-dashed border-cocoa/25 shadow-warm-soft my-[14px] px-[16px] pt-[16px] pb-[18px]"
            style={{
              transform: `rotate(${i % 2 === 0 ? -0.6 : 0.8}deg)`,
            }}
          >
            <span
              aria-hidden="true"
              className="font-display text-tomato absolute -top-[10px] -left-[6px] text-[36px] leading-[0.9] -rotate-[8deg]"
            >
              {n}
            </span>
            <h3 className="font-display text-cocoa m-0 mt-[6px] ml-[42px] text-[22px] leading-[1.15]">
              {s.title}
            </h3>
            <p className="font-body text-ink-soft mt-[8px] mb-0 text-[14px] leading-[1.6]">
              {s.body}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
