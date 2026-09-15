"use client";

import { useEffect, useRef } from "react";
import { Leaf, Droplets, Sparkles, Flower2 } from "lucide-react";

const badges = [
  {
    icon: Leaf,
    title: "Organic Certified",
    desc: "100% organic ingredients",
  },
  {
    icon: Droplets,
    title: "Natural Extracts",
    desc: "Pure botanical formulas",
  },
  {
    icon: Sparkles,
    title: "Clean Beauty",
    desc: "No toxic chemicals",
  },
  {
    icon: Flower2,
    title: "Vegan Formula",
    desc: "Plant-powered skincare",
  },
];

export default function TrustBadges() {
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
                el.style.transform = "translateY(0)";
              }
            }, i * 150);
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
    <section className="py-20" style={{ backgroundColor: "#F7F4EF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                ref={(el) => { refs.current[i] = el; }}
                className="bg-[#F7F4EF] p-6 lg:p-8 text-center rounded-xl transition-all duration-700 ease-out"
                style={{ opacity: 0, transform: "translateY(32px)" }}
              >
                <Icon
                  className="text-[#8B7355] mb-4 mx-auto"
                  style={{ width: 48, height: 48, strokeWidth: 1 }}
                />
                <h3 className="font-serif text-[#1a1a1a] mb-2 text-2xl">
                  {badge.title}
                </h3>
                <p className="text-sm text-[#6b6560]">{badge.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
