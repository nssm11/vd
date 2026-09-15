import type { NextConfig } from "next";
import { MEDIA_HOSTNAME } from "./src/lib/media";

/**
 * `next/image` refuses to optimise (or even render) a remote source whose host
 * is not allow-listed, and the product photography is hot-linked from the live
 * Boty design — so that host has to be configured here. It is read from
 * `src/lib/media` rather than repeated, which keeps this file in step with
 * `NEXT_PUBLIC_MEDIA_BASE` if you move the assets to your own CDN.
 *
 * The `*.public.blob.vercel-storage.com` entry is the bucket v0 wrote into this
 * project. The components no longer point at it, but keeping it allow-listed
 * means any asset URL you paste back in from the v0 export still renders while
 * you migrate it into `public/`.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: MEDIA_HOSTNAME },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
