# vd — Boty Natural Skincare

Next.js 16 (App Router) storefront for Boty, with a Tailwind v4 theme, a
Postgres/Drizzle data layer and an in-memory cart.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

The site renders without a database — the storefront reads from
`src/data/products.ts`. `DATABASE_URL` is only needed for the API routes and
`npm run seed`; without it `/api/health` reports `{ ok: false }` and the
storefront is unaffected.

## Media

Every image and video URL is resolved in one place: **`src/lib/media.ts`**. Read
it before adding an asset — components import `VIDEOS`, `STILLS` and
`productImage()` rather than hard-coding a URL.

| Kind | Where it lives | Notes |
| --- | --- | --- |
| Section loops | `public/media/*.mp4` | Served from this origin; supports HTTP range requests, so playback and scrubbing work. |
| Brand stills | `public/images/*.png`, `public/images/products/*.png` | Same filenames as the reference design, so the two sites can be diffed. |
| Product photography | `NEXT_PUBLIC_MEDIA_BASE` | Hot-linked from the live deployment until the files are mirrored into `public/images/products/`. |

To move the product photography onto your own host, drop the files under
`public/images/products/` and set:

```bash
NEXT_PUBLIC_MEDIA_BASE=""   # served from this origin, no remote host at all
```

…or point it at a CDN. `next.config.ts` derives
`images.remotePatterns → hostname` from the same value, so the allow-list stays
in step automatically; `src/lib/media.ts → PRODUCT_IMAGES` is the filename map.

Two components keep the media honest:

- `LoopingVideo` — muted autoplay loop with `preload` tuned per placement, and
  a still painted behind it if a clip ever fails to load (no more empty grey
  boxes).
- `ProductImage` — `next/image` with an `onError` fallback to a bundled still.

## Scripts

```bash
npm run dev         # dev server
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint (next/core-web-vitals)
npm run typecheck   # tsc --noEmit
npm run seed        # drizzle-kit push + seed products & testimonials
```

## Structure

```
src/
  app/                 routes: /, /shop, /product/[slug], /cart, /account, /api/*
  components/          header, hero, sections, footer, LoopingVideo, ProductImage
  context/             CartContext (client-side cart state)
  data/products.ts     the catalogue — one source for grid, shop, product, seed
  db/                  Drizzle schema, lazy pool, seed script
  lib/media.ts         all media URLs
```

Fonts (DM Sans, Playfair Display) are self-hosted through
`@fontsource-variable/*` and wired up in `src/app/globals.css`, so builds do not
depend on reaching Google Fonts.
