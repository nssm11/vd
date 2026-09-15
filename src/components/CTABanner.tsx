"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Leaf, Flower2, Globe } from "lucide-react";
import { STILLS } from "@/lib/media";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24" style={{ backgroundColor: "#F7F4EF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="rounded-3xl p-12 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[400px] transition-all duration-700 ease-out"
          style={{ opacity: 0, transform: "scale(0.95)" }}
        >
          <Image
            src={STILLS.ctaBanner}
            alt="Botanical skincare bottles and jars on a sage backdrop"
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover"
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 text-left max-w-2xl">
            <h3 className="text-4xl md:text-5xl text-white mb-4 lg:text-5xl font-serif">
              100% Natural
            </h3>
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white/70 mb-8 font-serif">
              100% You
            </h3>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 text-white/90">
                <Leaf className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">No Harsh Chemicals</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Flower2 className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Plant-Based Goodness</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Globe className="w-5 h-5 flex-shrink-0" strokeWidth={1} />
                <span className="text-base">Ethically Sourced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
