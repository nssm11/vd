"use client";

import { useState, type CSSProperties } from "react";
import { STILLS } from "@/lib/media";

interface LoopingVideoProps {
  /** URL of the clip, normally taken from `VIDEOS` in `src/lib/media.ts`. */
  src: string;
  className?: string;
  style?: CSSProperties;
  /**
   * `auto` primes the clip before first paint (hero); `metadata` is plenty for
   * below-the-fold cards and avoids downloading three extra multi-MB files.
   */
  preload?: "auto" | "metadata" | "none";
  /** Still shown if the clip cannot be fetched, so the slot never goes grey. */
  poster?: string;
}

/**
 * Muted background loop used by the hero and the feature cards.
 *
 * The v0 export hand-wrote four of these, each pointing at a temporary
 * `*.public.blob.vercel-storage.com` URL, and left a bare `<video>` behind when
 * the bucket expired — an empty grey rectangle on every section. The clips are
 * now committed under `public/media/`, and a still that ships alongside them is
 * painted as a background if a fetch ever fails, so the layout degrades to
 * photography rather than to nothing.
 *
 * `aria-hidden` marks the loop decorative: the section copy around it is what
 * should be announced.
 */
export default function LoopingVideo({
  src,
  className = "",
  style,
  preload = "metadata",
  poster = STILLS.featureNatural,
}: LoopingVideoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${poster})`, ...style }}
      />
    );
  }

  return (
    <video
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      disablePictureInPicture
      onError={() => setFailed(true)}
      className={`pointer-events-none ${className}`}
      style={style}
      src={src}
    />
  );
}
