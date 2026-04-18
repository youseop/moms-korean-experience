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

## Deploy (Vercel)

This site is built to deploy to Vercel with zero custom infrastructure. Steps:

1. Push the repo to GitHub (already done — `git@github.com:youseop/moms-korean-experience.git`).
2. Go to https://vercel.com/new and import the repo. Framework auto-detects as Next.js.
3. **Required env vars** (Project Settings → Environment Variables, add for both Production AND Preview):
   - `RESEND_API_KEY` — get from https://resend.com → API Keys (free tier covers our v1 volume)
   - `INQUIRY_TO_EMAIL` — `youseop@speakbridges.com` (default already in code; explicit env var lets you change without a redeploy)
   - `NEXT_PUBLIC_SITE_URL` — leave empty for the first deploy; once Vercel assigns a URL like `https://eunjungs-table.vercel.app`, set this to that URL so sitemap/OG/robots reference it correctly. Update again when a custom domain lands.
4. `INQUIRY_FROM_EMAIL` is **optional** — defaults to `Eunjung's Table <onboarding@resend.dev>` (Resend's sandbox sender, works without a verified domain). When a custom domain is ready, verify it in Resend and set this env var to e.g. `Eunjung's Table <hello@<your-domain>>`.
5. Hit Deploy. First build takes ~2 minutes; subsequent deploys are faster.
6. After deploy, smoke test: visit `/`, `/tours`, `/cooking`, `/stay`, `/sitemap.xml`, `/robots.txt`, `/og-default`. Submit a test inquiry — confirm it lands at `youseop@speakbridges.com`.

`vercel.json` at the repo root sets long-lived immutable cache headers on
`/images/*` and `/_next/static/*`, and a shorter stale-while-revalidate cache
on `/_next/image*` (external Unsplash sources may rotate). No framework or
build command overrides — Next.js + pnpm auto-detect from `package.json` and
`pnpm-lock.yaml`.

### Analytics

`@vercel/analytics` is mounted in `app/layout.tsx` via the `<Analytics />`
component. It activates automatically once deployed to Vercel (no env vars
to manage; no-ops in local dev and tests). The dashboard lives in the
Vercel project panel.

### Custom domain (later)

In Vercel project → Settings → Domains → add your domain. Add the
recommended DNS records at your registrar. Vercel provisions SSL
automatically. Update `NEXT_PUBLIC_SITE_URL` to the custom domain once
active.

### Preview deploys

Every git branch push creates a preview URL automatically. Use these for
design reviews before merging to `main`.
