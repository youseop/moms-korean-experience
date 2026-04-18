# Eunjung's Table

Marketing site for Eunjung's three services (Tours, Cooking Class, Stay).
Mobile-first, warm-editorial, statically-leaning Next.js app that deploys to Vercel.

Full project brief and design direction: [`docs/00-site-plan.md`](./docs/00-site-plan.md).
Implementation plan: [`docs/03-dev-plan.md`](./docs/03-dev-plan.md).
Chosen design system: [`docs/08-design-cute-cozy.md`](./docs/08-design-cute-cozy.md).

## Stack

- Next.js 16 (App Router, Server Actions) on React 19
- TypeScript (strict)
- Tailwind CSS v4
- ESLint 9 (flat config) + Prettier
- pnpm

## Development

```bash
pnpm install        # install deps
pnpm dev            # start dev server at http://localhost:3000
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint
pnpm format         # prettier --write
pnpm build          # production build
```

## Layout

- `app/` — App Router routes, layout, global styles
- `public/` — static assets (images under `public/images/` in later tasks)
- `docs/` — planning, design, and implementation docs
- `design-prototypes/cute-cozy/index.html` — source-of-truth design prototype

## Design system

The cute/cozy scrapbook design is ported into Tailwind v4's CSS-first config:

- **Tokens** (colors, fonts, radii, shadows) live in the `@theme` block at the top of
  [`app/globals.css`](./app/globals.css). Tailwind v4 auto-generates utility classes
  from those CSS custom properties (e.g. `--color-tape-peach` becomes `bg-tape-peach`,
  `--font-display` becomes `font-display`). There is no `tailwind.config.ts`.
- **Fonts** are loaded in [`app/fonts.ts`](./app/fonts.ts) via `next/font/google` —
  Caveat (display), Nunito (body), Patrick Hand (stamp), Indie Flower (signature).
  Their CSS variables are attached to `<html>` in [`app/layout.tsx`](./app/layout.tsx).
- **Reference prototype:** [`design-prototypes/cute-cozy/index.html`](./design-prototypes/cute-cozy/index.html).
  Open it directly in a browser, or run it via the local static server the design
  team uses (`localhost:8801`).
- **Spec:** [`docs/08-design-cute-cozy.md`](./docs/08-design-cute-cozy.md).
- **Internal preview:** `/design-preview` route — a token-only re-creation of the
  prototype's Hero + three Experience cards. Not linked from the site; run
  `pnpm dev` and open `http://localhost:3000/design-preview` to verify the port.
