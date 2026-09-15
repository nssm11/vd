/**
 * Single source of truth for every media URL the site renders.
 *
 * The v0 export that this repo was seeded from had two classes of broken media:
 *
 *  1. The hero + feature videos pointed at
 *     `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/…mp4`, i.e. v0's
 *     *temporary*, per-project blob bucket. Those links are not a durable host,
 *     so the sections rendered as empty grey boxes. The four clips were also
 *     sitting unused in `public/` — they are now organised under `public/media/`
 *     and served from our own origin.
 *  2. Product photography pointed at `/images/products/<slug>.jpg` files that
 *     were never committed, so every `next/image` in the shop 404'd. The real
 *     files live on the reference design, so they are hot-linked from there and
 *     keyed to the exact filenames that deployment serves.
 *
 * Point `NEXT_PUBLIC_MEDIA_BASE` at your own CDN (or at a future `public/`
 * mirror of the photography) to move the product images off the reference host
 * without touching a single component. Remember to keep
 * `next.config.ts → images.remotePatterns` in sync with that host — it is
 * derived from the same variable.
 */

/** The live v0 design that currently hosts the product photography. */
export const DEFAULT_MEDIA_BASE = "https://v0-boty-website-design.vercel.app";

const configuredBase = process.env.NEXT_PUBLIC_MEDIA_BASE?.trim();

/** Absolute origin the hot-linked assets are read from, without a trailing slash. */
export const MEDIA_BASE = (configuredBase || DEFAULT_MEDIA_BASE).replace(/\/+$/, "");

/** Hostname of {@link MEDIA_BASE}; `next.config.ts` allow-lists it for image optimisation. */
export const MEDIA_HOSTNAME = (() => {
  try {
    return new URL(MEDIA_BASE).hostname;
  } catch {
    return new URL(DEFAULT_MEDIA_BASE).hostname;
  }
})();

/** Resolve an asset bundled in `public/` against our own origin. */
const local = (path: string): string => path;

/** Resolve an asset that only exists on the reference deployment. */
export const remote = (path: string): string => `${MEDIA_BASE}${path}`;

/**
 * Motion loops, copied out of the v0 export into `public/media/` and renamed
 * after where they are used.
 */
export const VIDEOS = {
  /** Full-bleed hero loop (`f3d8cad2-…mp4` in the v0 export). */
  hero: local("/media/hero.mp4"),
  /** "100% Plant-Based" card loop (`c4baaf67-…mp4`). */
  plantBased: local("/media/plant-based.mp4"),
  /** "Eco-Friendly Packaging" card loop (`a0b7c364-…mp4`). */
  ecoPackaging: local("/media/eco-packaging.mp4"),
  /** "Care that breathes" / why-Boty loop (`0c826034-…mp4`). */
  ritual: local("/media/ritual.mp4"),
} as const;

/**
 * Stills that ship with the repo. Filenames — and therefore URLs — mirror the
 * reference deployment so a screenshot diff between the two is meaningful.
 */
export const STILLS = {
  /** Cleansing tubes on sand, used by the "100% Natural / 100% You" card. */
  featureNatural: local("/images/products/0ed61900-dd29-4dd2-bc2d-abc2db54c352.png"),
  /** Amber + sage dropper bottles on green, used by the CTA banner. */
  ctaBanner: local("/images/bf965cf4-e728-4e72-ab1b-16b1cd8f1822.png"),
} as const;

/**
 * Product photography, keyed by product slug and mapped to the filenames the
 * reference deployment actually serves. Where the live site renders a slug we
 * also have, the same file is reused; the remaining slots use other real
 * frames from that set so no two products in a grid share one image.
 */
export const PRODUCT_IMAGES = {
  "hydra-cream": "cream-jars-colored.png",
  "gentle-cleanser": "tube-bottles.png",
  "night-cream": "jars-wooden-lid.png",
  "day-cream-spf": "pump-bottles-lavender.png",
  "renewal-oil": "amber-dropper-bottles.png",
  "rose-hip-oil": "eye-serum-bottles.png",
  "radiance-serum": "serum-bottles-1.png",
  "glow-serum": "spray-bottles.png",
} as const;

export type ProductImageKey = keyof typeof PRODUCT_IMAGES;

/** Absolute URL for a product's photography. */
export function productImage(slug: ProductImageKey): string {
  return remote(`/images/products/${PRODUCT_IMAGES[slug]}`);
}

/**
 * On-brand still swapped in if a hot-linked asset ever fails to load, so a
 * missing frame degrades to brand photography instead of a broken-image icon.
 */
export const MEDIA_FALLBACK_IMAGE = STILLS.featureNatural;
