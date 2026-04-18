/**
 * FloorPlan — Stay page signature element.
 *
 * A hand-drawn-feeling SVG of Eunjung's apartment. NOT architectural
 * precision — it should read as "a friend doodled this on a napkin." The
 * guest's room and bathroom fill with a soft peach wash so the reader
 * immediately clocks which bits belong to them.
 *
 * Design choices:
 *   - Cream paper-deep card with a dashed cocoa border, slight -0.5deg tilt.
 *   - Pink WashiTape strip anchoring the top-right corner (decorative).
 *   - Room rectangles are drawn as `<path>` elements with intentionally wobbly
 *     corners (micro random offsets) so they don't feel perfectly square —
 *     each corner is nudged ~0.5-1.2px off so lines look hand-drawn.
 *   - Guest rooms get a cream-peach fill (`#FFD4B5`), shared rooms cream.
 *   - Labels in Caveat italic (display font), placed inside each rect.
 *   - Patrick Hand caption beneath.
 *   - Legend below with two tiny swatches: "yours" / "shared".
 *
 * This component is intentionally ornamental; it ships default rooms if the
 * caller gives it nothing, so the design-preview showcase can mount it with
 * zero data.
 */

import { WashiTape } from "@/components/decoration/WashiTape";

export type FloorPlanRoom = {
  id: string;
  name: string;
  /** x/y/w/h in SVG user units (0..VIEW_W / 0..VIEW_H). */
  x: number;
  y: number;
  w: number;
  h: number;
  /** True = fill with peach (the guest's room / bathroom). */
  isGuest?: boolean;
  /**
   * Optional tiny Caveat-italic subcaption printed under the room name
   * (e.g. "yours"). Kept short; it sits ~12px below the label.
   */
  sub?: string;
};

export type FloorPlanProps = {
  rooms: readonly FloorPlanRoom[];
  /** Patrick Hand caption below the plan. Default is the stay-friendly copy. */
  caption?: string;
  className?: string;
};

// SVG viewBox. 320x220 is a comfortable ratio for the 420px column.
const VIEW_W = 320;
const VIEW_H = 220;

/**
 * Draw a wobbly "rect" as an open path — each corner gets a small random
 * (seeded, deterministic per id) offset so the box doesn't feel laser-cut.
 * Uses a tiny LCG seeded off the room id so the wobble is stable across
 * renders (SSR/CSR hydration agreement).
 */
function wobblyRectPath(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
): string {
  // Simple string-hash -> seed for a stable per-room wobble.
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) & 0xffffffff;
  function rand() {
    // LCG — output in [-1, 1].
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return ((seed >>> 0) / 0xffffffff) * 2 - 1;
  }
  const amp = 1.4;
  const p = (xx: number, yy: number) =>
    `${(xx + rand() * amp).toFixed(2)},${(yy + rand() * amp).toFixed(2)}`;
  const tl = p(x, y);
  const tr = p(x + w, y);
  const br = p(x + w, y + h);
  const bl = p(x, y + h);
  return `M ${tl} L ${tr} L ${br} L ${bl} Z`;
}

const DEFAULT_ROOMS: readonly FloorPlanRoom[] = [
  { id: "guest-room", name: "guest room", sub: "yours", x: 14, y: 16, w: 150, h: 110, isGuest: true },
  { id: "guest-bath", name: "guest bath", sub: "yours ☆", x: 170, y: 16, w: 80, h: 58, isGuest: true },
  { id: "kitchen", name: "kitchen", sub: "share", x: 170, y: 78, w: 136, h: 56 },
  { id: "living", name: "living + balcony", sub: "share", x: 14, y: 132, w: 292, h: 72 },
];

export function FloorPlan({
  rooms = DEFAULT_ROOMS,
  caption = "your bits ↑ guest room + guest bath have your name on them",
  className = "",
}: FloorPlanProps) {
  return (
    <figure
      className={`relative mx-[22px] my-[22px] rounded-[10px] px-[14px] pt-[22px] pb-[16px] shadow-warm-soft ${className}`}
      style={{
        background: "var(--color-paper-deep)",
        border: "1.5px dashed rgba(92, 64, 51, 0.35)",
        transform: "rotate(-0.5deg)",
      }}
    >
      {/* Decorative pink washi tape anchoring the top-right. */}
      <WashiTape
        color="pink"
        tilt={12}
        width={74}
        height={20}
        className="-top-[10px] right-[16px]"
      />

      <svg
        role="img"
        aria-label="Hand-drawn floor plan of Eunjung's apartment"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block h-auto w-full"
      >
        {/* Outer wall — wobbly rectangle around the whole plan. */}
        <path
          d={wobblyRectPath("outer", 8, 10, VIEW_W - 16, VIEW_H - 20)}
          fill="none"
          stroke="#5C4033"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.72"
        />

        {/* Rooms. */}
        {rooms.map((r) => {
          const cx = r.x + r.w / 2;
          const cy = r.y + r.h / 2;
          return (
            <g key={r.id}>
              {/* Filled body — peach for guest, cream otherwise. */}
              <path
                d={wobblyRectPath(`${r.id}-body`, r.x, r.y, r.w, r.h)}
                fill={r.isGuest ? "#FFD4B5" : "#fffdf3"}
                fillOpacity={r.isGuest ? 0.9 : 0.7}
                stroke="#5C4033"
                strokeWidth="1.2"
                strokeDasharray={r.isGuest ? undefined : "3 3"}
                strokeLinejoin="round"
                opacity="0.9"
              />
              {/* Room name — Caveat italic, centered. */}
              <text
                x={cx}
                y={cy - (r.sub ? 2 : -4)}
                textAnchor="middle"
                fontSize="14"
                fill="#5C4033"
                fontFamily="var(--font-caveat), cursive"
                fontStyle="italic"
              >
                {r.name}
              </text>
              {r.sub && (
                <text
                  x={cx}
                  y={cy + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b4e3d"
                  fontFamily="var(--font-patrick-hand), 'Patrick Hand', cursive"
                  opacity="0.85"
                >
                  {r.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* Tiny north arrow in the top-right corner of the plan. */}
        <g transform={`translate(${VIEW_W - 26}, 28)`} opacity="0.55">
          <circle r="7" fill="none" stroke="#5C4033" strokeWidth="0.8" />
          <path d="M 0 -5 L 2.2 1 L 0 0 L -2.2 1 Z" fill="#E94B3C" />
          <text
            y="-10"
            textAnchor="middle"
            fontSize="7"
            fill="#6b4e3d"
            fontFamily="var(--font-patrick-hand), 'Patrick Hand', cursive"
          >
            N
          </text>
        </g>
      </svg>

      {/* Patrick Hand caption underneath the plan. */}
      <p className="font-stamp text-ink-soft mt-[10px] mb-[6px] text-center text-[13px] leading-[1.4]">
        {caption}
      </p>

      {/* Legend: yours / shared. */}
      <div className="mt-[6px] flex items-center justify-center gap-[18px]">
        <span className="inline-flex items-center gap-[6px]">
          <span
            aria-hidden="true"
            className="inline-block h-[12px] w-[18px] border border-[#5C4033]"
            style={{ background: "#FFD4B5" }}
          />
          <span className="font-stamp text-cocoa text-[12px]">yours</span>
        </span>
        <span className="inline-flex items-center gap-[6px]">
          <span
            aria-hidden="true"
            className="inline-block h-[12px] w-[18px] border border-dashed border-[#5C4033]"
            style={{ background: "#fffdf3" }}
          />
          <span className="font-stamp text-cocoa text-[12px]">shared</span>
        </span>
      </div>
    </figure>
  );
}
