/**
 * HandDrawnMap — Tours signature element.
 *
 * A cute/cozy SVG "map of where Eunjung takes you" rendered on a kraft-
 * paper tinted background. Includes:
 *   - Faint graph-paper grid.
 *   - A wavy Han river with a dashed highlight stroke + "Han river" label.
 *   - A squiggly dashed road.
 *   - Numbered circular pins connected by a dashed tomato route line.
 *   - A small cocoa "you are here" star icon at one pin (configurable).
 *   - Two region labels ("Seoul", "Gyeonggi").
 *   - Scale bar.
 *   - Legend: 2-column list mapping pin numbers to place names.
 *
 * Not geographically accurate — it's an illustration. `pins[].x/y` are
 * percentages (0–100) of the SVG's 400×280 viewBox.
 *
 * Ported loosely from `design-handoff/project/detail-components.jsx`
 * L214–L292 (editorial) + adapted to cute/cozy typography.
 */

export type MapPin = {
  id: string;
  label: string;
  /** 0–100 percent across the 400-wide viewBox. */
  x: number;
  /** 0–100 percent down the 280-tall viewBox. */
  y: number;
};

export type HandDrawnMapProps = {
  pins: readonly MapPin[];
  /** Which pin id gets the "you are here" star. Defaults to first pin. */
  youAreHerePinId?: string;
  /** Draw the dashed route line connecting pins. Default true. */
  showRoute?: boolean;
  className?: string;
};

const W = 400;
const H = 280;

export function HandDrawnMap({
  pins,
  youAreHerePinId,
  showRoute = true,
  className = "",
}: HandDrawnMapProps) {
  const starPin = youAreHerePinId
    ? pins.find((p) => p.id === youAreHerePinId)
    : pins[0];

  return (
    <figure className={`mx-[22px] my-[18px] ${className}`}>
      <div
        className="relative overflow-hidden border border-dashed border-cocoa/30 shadow-warm-soft"
        style={{
          // Kraft paper body.
          background:
            "linear-gradient(135deg, #eeddba 0%, #e4d0a5 100%)",
        }}
      >
        {/* Tiny Patrick Hand corner caption. */}
        <span className="font-stamp text-ink-soft absolute top-[8px] left-[10px] z-[1] -rotate-2 text-[11px] tracking-[0.08em] uppercase">
          Gyeonggi-do, roughly
        </span>

        <svg
          role="img"
          aria-label="Hand-drawn map of places Eunjung takes guests"
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
        >
          {/* Graph-paper grid. */}
          <defs>
            <pattern
              id="mapGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#5C4033"
                strokeWidth="0.5"
                opacity="0.14"
              />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#mapGrid)" />

          {/* Han river — soft wide stroke then a dashed darker highlight. */}
          <path
            d="M -10 110 Q 80 95, 150 115 T 320 100 T 420 120"
            fill="none"
            stroke="#c8e0ec"
            strokeWidth="8"
            opacity="0.85"
            strokeLinecap="round"
          />
          <path
            d="M -10 112 Q 80 97, 150 117 T 320 102 T 420 122"
            fill="none"
            stroke="#5c4033"
            strokeWidth="1.4"
            opacity="0.35"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          <text
            x="70"
            y="96"
            fontSize="10"
            fill="#5c4033"
            fontFamily="var(--font-patrick-hand), 'Patrick Hand', cursive"
            opacity="0.65"
          >
            Han river
          </text>

          {/* Squiggly dashed road. */}
          <path
            d="M 40 250 Q 120 200, 180 200 T 280 170 Q 330 150, 360 110"
            fill="none"
            stroke="#5c4033"
            strokeWidth="1.4"
            opacity="0.4"
            strokeDasharray="4 3"
          />

          {/* Dashed tomato route line linking pins. */}
          {showRoute && pins.length > 1 && (
            <polyline
              points={pins
                .map((p) => `${(p.x / 100) * W},${(p.y / 100) * H}`)
                .join(" ")}
              fill="none"
              stroke="#E94B3C"
              strokeWidth="1.6"
              strokeDasharray="4 3"
              opacity="0.55"
            />
          )}

          {/* Region labels. */}
          <text
            x="48"
            y="40"
            fontSize="12"
            fill="#5c4033"
            fontFamily="var(--font-caveat), cursive"
            opacity="0.65"
          >
            Seoul
          </text>
          <text
            x="330"
            y="56"
            fontSize="12"
            fill="#5c4033"
            fontFamily="var(--font-caveat), cursive"
            opacity="0.65"
          >
            Gyeonggi
          </text>

          {/* Pins. */}
          {pins.map((p, i) => {
            const cx = (p.x / 100) * W;
            const cy = (p.y / 100) * H;
            const isStar = starPin?.id === p.id;
            return (
              <g key={p.id}>
                {/* soft halo */}
                <circle cx={cx} cy={cy} r="13" fill="#E94B3C" opacity="0.18" />
                {/* pin body */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="9"
                  fill="#E94B3C"
                  stroke="#5c4033"
                  strokeWidth="1"
                />
                {/* number inside */}
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#fff"
                  fontFamily="var(--font-patrick-hand), 'Patrick Hand', cursive"
                >
                  {i + 1}
                </text>
                {/* "you are here" star — a small cocoa 5-point star drawn
                    just above the pin on one chosen pin. */}
                {isStar && (
                  <g transform={`translate(${cx + 10}, ${cy - 12})`}>
                    <path
                      d="M0 -6 L1.8 -1.8 L6 -1.2 L2.8 1.8 L3.6 6 L0 3.6 L-3.6 6 L-2.8 1.8 L-6 -1.2 L-1.8 -1.8 Z"
                      fill="#FFE8A3"
                      stroke="#5c4033"
                      strokeWidth="0.8"
                    />
                  </g>
                )}
                {/* label, offset right */}
                <text
                  x={cx + 16}
                  y={cy + 4}
                  fontSize="10"
                  fill="#5c4033"
                  fontFamily="var(--font-caveat), cursive"
                >
                  {p.label}
                </text>
              </g>
            );
          })}

          {/* Scale bar. */}
          <g transform="translate(20, 260)" opacity="0.55">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#5c4033" strokeWidth="1.5" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#5c4033" strokeWidth="1.5" />
            <line x1="60" y1="-3" x2="60" y2="3" stroke="#5c4033" strokeWidth="1.5" />
            <text
              x="68"
              y="4"
              fontSize="9"
              fill="#5c4033"
              fontFamily="var(--font-patrick-hand), 'Patrick Hand', cursive"
            >
              ~30 km
            </text>
          </g>
        </svg>
      </div>

      {/* Legend: 2-column list. */}
      <figcaption className="mt-[14px] grid grid-cols-2 gap-x-[12px] gap-y-[6px]">
        {pins.map((p, i) => (
          <div key={p.id} className="flex items-center gap-[8px]">
            <span
              className="font-stamp inline-flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
              style={{ background: "var(--color-tomato)" }}
            >
              {i + 1}
            </span>
            <span className="font-body text-cocoa text-[13px] leading-[1.2]">
              {p.label}
            </span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
