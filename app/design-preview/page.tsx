/**
 * /design-preview — internal design-system sanity check.
 *
 * Re-creates the Hero + three Experience cards section from
 * `design-prototypes/cute-cozy/index.html` using only the production Tailwind
 * v4 tokens declared in `app/globals.css`. The goal is a side-by-side match
 * with the prototype at 420px mobile — if this renders correctly, the tokens
 * are wired up correctly.
 *
 * Not a shipping page; no SiteHeader/SiteFooter (those land in Task 3).
 * Markup here is intentionally duplicated — reusable components
 * (Polaroid, WashiTape, StickerBadge, HandArrow, etc.) are extracted in Task 5.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design preview · Eunjung's Table",
  robots: { index: false, follow: false },
};

export default function DesignPreviewPage() {
  return (
    <main className="page">
      {/* ============== TOPBAR (stub — full SiteHeader ships in Task 3) ============== */}
      <header className="font-stamp text-ink-soft flex items-center justify-between px-[22px] pt-[18px] pb-[6px] text-[14px] tracking-[0.02em]">
        <div className="font-display text-cocoa inline-block -rotate-2 text-[26px]">
          Eunjung&rsquo;s <span className="text-tomato">Table</span>
        </div>
        <div className="border-ink-soft font-stamp grid size-[38px] rotate-6 place-items-center rounded-full border-2 border-dashed text-[13px]">
          menu
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section className="relative px-[22px] pt-[10px] pb-[36px]">
        {/* Floating hero doodles — inline SVGs ported verbatim from the prototype. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 40 36"
          className="pointer-events-none absolute top-[36px] right-[28px] w-[34px] rotate-[14deg]"
          fill="none"
        >
          <path
            d="M20 32 C 6 22, 2 14, 8 8 C 13 3, 18 6, 20 10 C 22 6, 27 3, 32 8 C 38 14, 34 22, 20 32 Z"
            stroke="#E94B3C"
            strokeWidth="2.4"
            strokeLinejoin="round"
            fill="#FFD4B5"
          />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 30 30"
          className="pointer-events-none absolute top-[86px] right-[12px] w-[26px] -rotate-[8deg]"
          fill="none"
        >
          <path
            d="M15 3 L17 12 L26 13 L19 19 L21 28 L15 23 L9 28 L11 19 L4 13 L13 12 Z"
            stroke="#5C4033"
            strokeWidth="1.8"
            fill="#FFE8A3"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 30 30"
          className="pointer-events-none absolute top-[140px] left-[18px] w-[22px] rotate-[18deg]"
          fill="none"
        >
          <path
            d="M15 4 L17 13 L25 14 L19 19 L21 27 L15 23 L9 27 L11 19 L5 14 L13 13 Z"
            stroke="#5C4033"
            strokeWidth="1.8"
            fill="#B5D5B5"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 60 16"
          className="pointer-events-none absolute right-[16px] bottom-[78px] w-[52px] opacity-70"
          fill="none"
        >
          <path
            d="M2 8 Q 8 2 14 8 T 26 8 T 38 8 T 50 8 T 58 8"
            stroke="#5C4033"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Handwritten greeter */}
        <span className="font-display text-ink-soft mt-[6px] -mb-[4px] ml-[4px] inline-block -rotate-3 text-[22px]">
          hi hi! it&rsquo;s me ~
        </span>

        {/* Headline — Caveat 64px, "Eunjung" in tomato, scribble underline under "stay with me". */}
        <h1 className="font-display text-cocoa relative mt-[4px] mb-[14px] text-[64px] leading-[0.92] font-bold -tracking-[0.01em]">
          <span className="block">
            I&rsquo;m <span className="text-tomato inline-block -rotate-[1.5deg]">Eunjung</span>.
          </span>
          <span className="block">
            come{" "}
            <span
              className="relative inline-block after:absolute after:-right-1 after:-bottom-[6px] after:-left-1 after:h-[10px] after:bg-[length:100%_100%] after:bg-no-repeat after:content-['']"
              style={{
                /* Scribble underline — tomato wavy SVG as background-image. */
                ["--tw-bg" as string]: "",
              }}
            >
              <span className="relative z-[1]">stay with me</span>
              <span
                aria-hidden="true"
                className="absolute -right-1 -bottom-[6px] -left-1 block h-[10px]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 10' preserveAspectRatio='none'><path d='M2 6 Q 20 1 40 5 T 80 5 T 120 5 T 160 5 T 198 5' stroke='%23E94B3C' stroke-width='2.4' fill='none' stroke-linecap='round'/></svg>\")",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </span>
          </span>
          <span className="block" style={{ fontSize: "54px" }}>
            in Seoul.
          </span>
        </h1>

        <p className="font-body text-ink-soft mb-[24px] max-w-[290px] text-[15px] leading-[1.55]">
          A <b className="text-cocoa font-bold">Korean mom</b> in Jeongja-dong. I&rsquo;ll drive you
          to my favorite places, teach you to cook my kimbap, and feed you dinner every night you
          stay. <br />
          No script. just dinner.
        </p>

        {/* Hero polaroid + two washi tapes */}
        <div className="relative mx-auto w-[260px] -rotate-3">
          {/* washi: peach, top-left, -18deg */}
          <div
            className="washi -top-[14px] -left-[10px] -rotate-[18deg]"
            style={{ background: "var(--color-tape-peach)" }}
          />
          {/* washi: sage, top-right, +22deg */}
          <div
            className="washi -top-[10px] -right-[14px] rotate-[22deg]"
            style={{ background: "var(--color-tape-sage)" }}
          />
          <div className="polaroid w-full">
            <div className="aspect-4/5 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80"
                alt="Eunjung smiling in warm light"
              />
            </div>
            <div className="font-display text-cocoa absolute right-0 bottom-[8px] left-0 text-center text-[22px] leading-none">
              mom, summer &lsquo;24
            </div>
          </div>
        </div>

        {/* CTA pill with drawn arrow + handwritten "tap this!" */}
        <div className="relative mt-[26px] mb-[4px] flex items-center gap-[10px]">
          <a href="#inquire" className="cta-pill">
            <svg aria-hidden="true" viewBox="0 0 20 18" className="size-[16px]" fill="#fff">
              <path d="M10 16 C 2 11, 0 7, 3 3.5 C 5.5 1, 8.5 2, 10 4.5 C 11.5 2, 14.5 1, 17 3.5 C 20 7, 18 11, 10 16 Z" />
            </svg>
            come over for dinner
          </a>
          <svg
            aria-hidden="true"
            viewBox="0 0 72 48"
            className="h-[48px] w-[72px] rotate-6"
            fill="none"
          >
            <path
              d="M65 6 Q 45 0, 30 14 Q 18 25, 10 40"
              stroke="#E94B3C"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M6 38 L 12 42 L 14 34"
              stroke="#E94B3C"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-tomato absolute top-[-22px] left-[60px] -rotate-6 text-[20px]">
            tap this!
          </span>
        </div>
      </section>

      {/* Scribble divider — dot variant */}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 22"
        className="mx-auto my-[28px] h-[22px] w-[80%] opacity-70"
        fill="none"
      >
        <path
          d="M4 12 Q 20 2 40 12 T 80 12 T 120 12 T 160 12 T 200 12 T 240 12 T 296 12"
          stroke="#5C4033"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <circle cx="150" cy="12" r="3" fill="#E94B3C" />
      </svg>

      {/* ============== SECTION HEAD ============== */}
      <div className="relative px-[22px] pt-[14px] pb-[4px]">
        <span className="bg-tape-butter font-stamp text-cocoa shadow-warm-soft inline-block -rotate-2 rounded-full px-[12px] py-[3px] text-[13px]">
          #02 · 3 ways to hang out
        </span>
        <h2 className="font-display text-cocoa mt-[8px] mb-0 text-[42px] leading-none font-bold">
          what we can
          <br />
          do{" "}
          <em className="text-tomato relative not-italic">
            together
            <span
              aria-hidden="true"
              className="absolute -right-[2px] -bottom-1 -left-[2px] block h-[8px]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8' preserveAspectRatio='none'><path d='M2 5 Q 15 1 30 4 T 60 4 T 98 4' stroke='%23E94B3C' stroke-width='2' fill='none' stroke-linecap='round'/></svg>\")",
                backgroundSize: "100% 100%",
              }}
            />
          </em>
        </h2>
      </div>

      {/* ============== EXPERIENCES — 3 cards ============== */}
      <section className="px-[22px] pt-[6px] pb-[10px]">
        {/* CARD 1 — Tours (peach tag, sky card-tape, rotated -2.5deg, text-left) */}
        <article className="relative mt-[40px] mb-[10px] pt-1 pb-[24px] text-left">
          <div
            className="absolute -top-[10px] left-[10%] h-[18px] w-[60px] -rotate-[12deg] opacity-[0.88] shadow-[0_1px_2px_rgba(58,40,32,0.15)]"
            style={{ background: "var(--color-tape-sky)" }}
          />
          <div
            className="font-stamp text-cocoa shadow-warm-soft absolute top-[-14px] right-[-6px] z-[4] rotate-[8deg] px-[14px] py-[8px] text-[13px]"
            style={{
              background: "var(--color-tape-peach)",
              borderRadius: "40% 60% 45% 55% / 50% 45% 55% 50%",
            }}
          >
            Tours · half-day
          </div>
          <div className="relative m-0 w-[74%] -rotate-[2.5deg]">
            <div className="polaroid w-full">
              <div className="aspect-5/4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&q=80"
                  alt="Seoul alley"
                />
              </div>
              <div className="font-display text-cocoa absolute right-0 bottom-[8px] left-0 text-center text-[20px] leading-none">
                Seoul, my way
              </div>
            </div>
          </div>
          <h3 className="font-display text-cocoa my-[14px] mt-[14px] mb-[6px] inline-block -rotate-[1.5deg] text-[38px] leading-[0.95]">
            hidden corners,
            <br />
            with mom
          </h3>
          <p className="font-body text-ink-soft my-[6px] mb-[12px] text-[14.5px] leading-[1.6]">
            Not scripted, not touristy. I take you to the places my family and I actually love —
            backstreets in Seoul, a quiet temple on a hill, a pottery village outside the city. I
            can drive you there myself.
          </p>
          <a
            href="#tours"
            className="font-stamp text-tomato inline-flex items-center gap-[6px] text-[15px] no-underline"
          >
            see the tours
            <svg aria-hidden="true" viewBox="0 0 40 14" className="h-[16px] w-[38px]" fill="none">
              <path
                d="M2 7 Q 15 2 30 7"
                stroke="#E94B3C"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M26 3 L 32 7 L 26 11"
                stroke="#E94B3C"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </article>

        {/* CARD 2 — Cooking (sage tag, butter card-tape, rotated +2deg, text-right, badge-fav) */}
        <article className="relative mt-[40px] mb-[10px] pt-1 pb-[24px] text-right">
          <div
            className="absolute -top-[10px] right-[10%] h-[18px] w-[60px] rotate-[14deg] opacity-[0.88] shadow-[0_1px_2px_rgba(58,40,32,0.15)]"
            style={{ background: "var(--color-tape-butter)" }}
          />
          <div
            className="font-stamp text-cocoa shadow-warm-soft absolute top-[-14px] left-[-6px] z-[4] -rotate-[10deg] px-[14px] py-[8px] text-[13px]"
            style={{
              background: "var(--color-tape-sage)",
              borderRadius: "40% 60% 45% 55% / 50% 45% 55% 50%",
            }}
          >
            Cooking · 3hr
          </div>
          <div className="relative m-0 ml-auto w-[74%] rotate-[2deg]">
            {/* Mom's favorite sticker badge */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="absolute top-[-20px] right-[-8px] z-[5] size-[72px] rotate-[12deg] drop-shadow-[0_3px_4px_rgba(58,40,32,0.25)]"
            >
              <defs>
                <path id="circle-fav" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
              </defs>
              <circle cx="50" cy="50" r="42" fill="#E94B3C" stroke="#5C4033" strokeWidth="2" />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#fff"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text fontFamily="Patrick Hand, cursive" fontSize="11" fill="#fff" fontWeight="bold">
                <textPath href="#circle-fav" startOffset="5%">
                  ★ mom&rsquo;s favorite ★ mom&rsquo;s favorite ★
                </textPath>
              </text>
            </svg>
            <div className="polaroid w-full">
              <div className="aspect-5/4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&q=80"
                  alt="Korean home cooking spread"
                />
              </div>
              <div className="font-display text-cocoa absolute right-0 bottom-[8px] left-0 text-center text-[20px] leading-none">
                supper spread
              </div>
            </div>
          </div>
          <h3 className="font-display text-cocoa my-[14px] mt-[14px] mb-[6px] inline-block rotate-[1.5deg] text-[38px] leading-[0.95]">
            cook alongside
            <br />
            her
          </h3>
          <p className="font-body text-ink-soft my-[6px] mb-[12px] text-[14.5px] leading-[1.6]">
            Kimbap rolled on the counter, bulgogi sizzling in the pan, a seasonal side dish from
            whatever&rsquo;s at the market. Three set menus, allergy-friendly, and you eat what you
            make — together.
          </p>
          <a
            href="#cooking"
            className="font-stamp text-tomato inline-flex items-center gap-[6px] text-[15px] no-underline"
          >
            pick a menu
            <svg aria-hidden="true" viewBox="0 0 40 14" className="h-[16px] w-[38px]" fill="none">
              <path
                d="M2 7 Q 15 2 30 7"
                stroke="#E94B3C"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M26 3 L 32 7 L 26 11"
                stroke="#E94B3C"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </article>

        {/* CARD 3 — Stay (sky tag, peach card-tape, rotated -1.5deg, text-left) */}
        <article className="relative mt-[40px] mb-[10px] pt-1 pb-[24px] text-left">
          <div
            className="absolute -top-[10px] left-[10%] h-[18px] w-[60px] -rotate-[8deg] opacity-[0.88] shadow-[0_1px_2px_rgba(58,40,32,0.15)]"
            style={{ background: "var(--color-tape-peach)" }}
          />
          <div
            className="font-stamp text-cocoa shadow-warm-soft absolute top-[-14px] right-[-6px] z-[4] rotate-[6deg] px-[14px] py-[8px] text-[13px]"
            style={{
              background: "var(--color-tape-sky)",
              borderRadius: "40% 60% 45% 55% / 50% 45% 55% 50%",
            }}
          >
            Stay · per night
          </div>
          <div className="relative m-0 w-[74%] -rotate-[1.5deg]">
            <div className="polaroid w-full">
              <div className="aspect-5/4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80"
                  alt="Cozy bright room"
                />
              </div>
              <div className="font-display text-cocoa absolute right-0 bottom-[8px] left-0 text-center text-[20px] leading-none">
                your room
              </div>
            </div>
          </div>
          <h3 className="font-display text-cocoa my-[14px] mt-[14px] mb-[6px] inline-block -rotate-[1deg] text-[38px] leading-[0.95]">
            a quiet room,
            <br />a real dinner
          </h3>
          <p className="font-body text-ink-soft my-[6px] mb-[12px] text-[14.5px] leading-[1.6]">
            A private room &amp; bathroom in my home by{" "}
            <b className="text-cocoa font-bold">Tancheon stream</b>. Home-cooked dinner every
            evening. Five minutes to Jeongja Station. Best for travelers staying a week or more.
          </p>
          <a
            href="#stay"
            className="font-stamp text-tomato inline-flex items-center gap-[6px] text-[15px] no-underline"
          >
            see the room
            <svg aria-hidden="true" viewBox="0 0 40 14" className="h-[16px] w-[38px]" fill="none">
              <path
                d="M2 7 Q 15 2 30 7"
                stroke="#E94B3C"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M26 3 L 32 7 L 26 11"
                stroke="#E94B3C"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </article>
      </section>
    </main>
  );
}
