/**
 * NearbyList — Stay's "getting around" distance list.
 *
 * Intentionally distinct from Tours' PlacesGrid — no polaroids, no imagery.
 * A simple flat dl-style list of place + distance + optional mode hint.
 * Dotted cocoa rules separate rows so it reads like a handwritten journal
 * entry rather than a component. A small DoodleStar adorns the closest
 * entry (by default, the first row — usually Jeongja Station).
 */

import { DoodleStar } from "@/components/decoration/DoodleStar";

export type NearbyListItem = {
  place: string;
  distance: string;
  /** Optional mode hint — "subway" / "bus" / "walk". */
  mode?: string;
};

export type NearbyListProps = {
  places: readonly NearbyListItem[];
  /**
   * 0-based index of the entry that gets the DoodleStar. Default 0 —
   * the first item is treated as the closest.
   */
  starIndex?: number;
  className?: string;
};

export function NearbyList({
  places,
  starIndex = 0,
  className = "",
}: NearbyListProps) {
  return (
    <dl
      className={`mx-[22px] my-[14px] m-0 p-0 ${className}`}
      style={{
        // Dotted cocoa rule top + bottom frame — same treatment as FactStrip.
        backgroundImage:
          "radial-gradient(rgba(92, 64, 51, 0.42) 1px, transparent 1px), radial-gradient(rgba(92, 64, 51, 0.42) 1px, transparent 1px)",
        backgroundSize: "6px 2px, 6px 2px",
        backgroundRepeat: "repeat-x, repeat-x",
        backgroundPosition: "top, bottom",
      }}
    >
      {places.map((p, i) => (
        <div
          key={`${p.place}-${i}`}
          className="flex items-center justify-between gap-[12px] py-[10px]"
          style={{
            // Dotted rule between rows (not above the first).
            backgroundImage:
              i === 0
                ? "none"
                : "radial-gradient(rgba(92, 64, 51, 0.32) 1px, transparent 1px)",
            backgroundSize: "6px 2px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "top",
          }}
        >
          <dt className="font-display text-cocoa flex items-center gap-[8px] text-[22px] leading-[1.1] italic">
            {i === starIndex && (
              <span aria-hidden="true" className="-rotate-[10deg]">
                <DoodleStar size={18} fill="#FFE8A3" />
              </span>
            )}
            <span>{p.place}</span>
          </dt>
          <dd className="flex flex-col items-end gap-[2px] m-0 text-right">
            <span className="font-stamp text-cocoa text-[14px] leading-[1.1]">
              {p.distance}
            </span>
            {p.mode && (
              <span className="font-stamp text-ink-soft text-[11px] tracking-[0.04em] uppercase">
                {p.mode}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
