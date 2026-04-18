/**
 * HouseRules — Stay's "a few small things" check-list.
 *
 * A vertical list of short rules. Each row gets a small hand-drawn
 * checkmark SVG to its left, then the rule text. Typography automatically
 * picks Patrick Hand for short rules (<= 40 chars, reads as a quick
 * hand-written note) and Nunito for longer prose (keeps readability).
 * Dotted cocoa separators between rows, on a cream paper-deep card.
 *
 * Reused on the Stay page both for "House rules" and "What's included" —
 * same visual container, different payload.
 */

export type HouseRulesProps = {
  rules: readonly string[];
  className?: string;
};

function Check() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="shrink-0 mt-[3px]"
    >
      {/* Hand-drawn check — two strokes, rounded ends, slight wobble. */}
      <path
        d="M3 9.5 Q 5.5 12.2, 7.3 13.8"
        stroke="#E94B3C"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7 13.6 Q 10 8.5, 15 4"
        stroke="#E94B3C"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function HouseRules({ rules, className = "" }: HouseRulesProps) {
  return (
    <ul
      className={`mx-[22px] my-[14px] list-none rounded-[10px] px-[14px] py-[4px] shadow-warm-soft ${className}`}
      style={{
        background: "var(--color-paper-deep)",
        border: "1px dashed rgba(92, 64, 51, 0.28)",
      }}
    >
      {rules.map((rule, i) => {
        const isShort = rule.length <= 40;
        return (
          <li
            key={`${i}-${rule}`}
            className="flex items-start gap-[10px] py-[11px]"
            style={{
              // Dotted cocoa rule between rows (not above the first).
              backgroundImage:
                i === 0
                  ? "none"
                  : "radial-gradient(rgba(92, 64, 51, 0.32) 1px, transparent 1px)",
              backgroundSize: "6px 2px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "top",
            }}
          >
            <Check />
            <span
              className={
                isShort
                  ? "font-stamp text-cocoa text-[15px] leading-[1.35]"
                  : "font-body text-ink-soft text-[14px] leading-[1.5]"
              }
            >
              {rule}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
