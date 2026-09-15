"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Leaf, Flower2, Globe, Recycle } from "lucide-react";
import LoopingVideo from "@/components/LoopingVideo";
import { STILLS, VIDEOS } from "@/lib/media";

export default function FeatureSection() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (el) {
                el.style.opacity = "1";
                el.style.transform = "scale(1) translateY(0)";
              }
            }, i * 100);
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="py-24" style={{ backgroundColor: "#F7F4EF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid md:grid-cols-4 mb-20 md:grid-rows-[300px_300px] gap-6">
          {/* Large video card */}
          <div
            ref={(el) => { refs.current[0] = el; }}
            className="relative rounded-3xl overflow-hidden h-[500px] md:h-auto md:col-span-2 md:row-span-2 transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "scale(0.95)" }}
          >
            <LoopingVideo
              src={VIDEOS.plantBased}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-lg rounded-xl">
              <h3 className="text-xl text-[#1a1a1a] mb-2 font-medium">
                100% <span className="font-serif">Plant-Based</span>
              </h3>
              <p className="text-sm text-[#6b6560] leading-relaxed">
                Formulated exclusively with botanical ingredients and natural
                plant extracts.
              </p>
            </div>
          </div>

          {/* Natural image card */}
          <div
            ref={(el) => { refs.current[1] = el; }}
            className="rounded-3xl p-6 md:p-8 flex flex-col justify-center md:col-span-2 relative overflow-hidden transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "scale(0.95)" }}
          >
            <Image
              src={STILLS.featureNatural}
              alt="Cleansing tubes arranged with dried botanicals"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* The still is pale at the top-left, so white copy needs a scrim. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/85 via-[#1a1a1a]/50 to-[#1a1a1a]/25"
            />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl text-white mb-2">
                100% Natural
              </h3>
              <h3 className="text-2xl md:text-3xl text-white/70 mb-4">
                100% You
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Leaf className="w-4 h-4 flex-shrink-0" />
                  <span>No Harsh Chemicals</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Flower2 className="w-4 h-4 flex-shrink-0" />
                  <span>Plant-Based Goodness</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span>Ethically Sourced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Eco video card */}
          <div
            ref={(el) => { refs.current[2] = el; }}
            className="rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden md:col-span-2 transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "scale(0.95)" }}
          >
            <LoopingVideo
              src={VIDEOS.ecoPackaging}
              className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            />
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative z-10 flex flex-col justify-center h-full text-left items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3">
                <Recycle className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-sans text-base mb-1 text-black">
                Eco-Friendly
              </h3>
              <h3 className="text-2xl md:text-3xl mb-2 text-black font-serif">
                Packaging
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom — Why Boty */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
          {/* Video */}
          <div
            ref={(el) => { refs.current[3] = el; }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden boty-shadow transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "scale(0.95)" }}
          >
            <LoopingVideo
              src={VIDEOS.ritual}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div
            ref={(el) => { refs.current[4] = el; }}
            className="transition-all duration-700 ease-out"
            style={{ opacity: 0, transform: "translateY(32px)" }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-[#8B7355] mb-4 block">
              Why Boty
            </span>
            <h2 className="font-serif text-4xl leading-tight text-[#1a1a1a] mb-6 text-balance md:text-7xl">
              Care that breathes.
            </h2>
            <p className="text-lg text-[#6b6560] leading-relaxed mb-10 max-w-md">
              We believe skincare should be a gentle ritual, not a complicated
              routine. Every product is crafted with intention and love for your
              skin.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  Icon: Recycle,
                  title: "Eco-Friendly Packaging",
                  desc: "Recyclable and biodegradable materials",
                },
                {
                  Icon: Leaf,
                  title: "100% Natural",
                  desc: "No synthetic chemicals or parabens",
                },
                {
                  Icon: Flower2,
                  title: "Plant-Based",
                  desc: "Botanical extracts and essential oils",
                },
                {
                  Icon: Globe,
                  title: "Ethical Sourcing",
                  desc: "Fair trade certified ingredients",
                },
              ].map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="group p-5 boty-transition hover:scale-[1.02] rounded-xl bg-white"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 bg-[#F0EDE7] group-hover:bg-[#8B7355]/20 boty-transition">
                    <Icon className="w-5 h-5 text-[#8B7355]" />
                  </div>
                  <h3 className="font-medium text-[#1a1a1a] mb-1">{title}</h3>
                  <p className="text-sm text-[#6b6560]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
