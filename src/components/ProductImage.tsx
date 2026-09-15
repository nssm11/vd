"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { MEDIA_FALLBACK_IMAGE } from "@/lib/media";

interface ProductImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
}

/**
 * `next/image` for product photography, with a graceful degrade.
 *
 * The shots are hot-linked from the reference deployment (see
 * `src/lib/media.ts`), so if that host is ever unreachable — or you repoint
 * `NEXT_PUBLIC_MEDIA_BASE` before uploading the files — a card would otherwise
 * render a broken-image icon. Falling back to a still that ships in `public/`
 * keeps the grid whole; the same guard catches a missing *local* file, which is
 * exactly how this repo shipped with eight broken product images.
 */
export default function ProductImage({ src, alt, ...props }: ProductImageProps) {
  const isRemote = /^https?:\/\//.test(src);
  // Derived, not mirrored into state: a tab switch that changes `src` resets
  // the fallback automatically instead of pinning a stale one. If the fallback
  // itself fails there is nothing left to degrade to, and `src` no longer
  // matches so no update loop is possible.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const usingFallback = failedSrc === src && src !== MEDIA_FALLBACK_IMAGE;

  return (
    <Image
      {...props}
      src={usingFallback ? MEDIA_FALLBACK_IMAGE : src}
      alt={alt}
      // In development the browser fetches hot-linked shots directly. The
      // optimizer would otherwise round-trip every request through the dev
      // server — which has to reach the media host itself, and fails with a
      // 500 on any machine (sandbox, offline CI) that can't. Production keeps
      // the optimizer, so assets are still resized and re-encoded as AVIF/WebP.
      unoptimized={isRemote && process.env.NODE_ENV !== "production"}
      onError={() => setFailedSrc(src)}
    />
  );
}
