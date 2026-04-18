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
