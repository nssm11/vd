"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { CATEGORIES, productsByCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState("cream");
  const { addItem } = useCart();
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const filtered = productsByCategory(activeTab);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "scale(0.95)";
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (el) {
                el.style.opacity = "1";
                el.style.transform = "scale(1)";
              }
            }, i * 80);
            obs.disconnect();
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [activeTab]);

  const tabIndex = CATEGORIES.findIndex((t) => t.value === activeTab);

  return (
    <section className="py-24" style={{ backgroundColor: "#F0EDE7" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-[#8B7355] mb-4 block">
            Our Collection
          </span>
          <h2 className="font-serif leading-tight text-[#1a1a1a] mb-4 text-balance text-6xl lg:text-7xl">
            Gentle essentials
          </h2>
          <p className="text-lg text-[#6b6560] max-w-md mx-auto">
            Thoughtfully crafted products for your daily skincare ritual
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#F7F4EF] rounded-full p-1 gap-1 relative">
            <div
              className="absolute top-1 bottom-1 bg-[#1a1a1a] rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{
                left: `calc(${tabIndex * 33.333}% + 4px)`,
                width: "calc(33.333% - 4px)",
              }}
            />
            {CATEGORIES.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.value
                    ? "text-[#F7F4EF]"
                    : "text-[#6b6560] hover:text-[#1a1a1a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <a
              key={product.slug}
              href={`/product/${product.slug}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group transition-all duration-500 ease-out"
              style={{ opacity: 0, transform: "scale(0.95)" }}
            >
              <div className="bg-[#F7F4EF] rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                {/* Image */}
                <div className="relative aspect-square bg-[#E8E4DC] overflow-hidden">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover boty-transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide font-medium ${
                        product.badge === "Sale"
                          ? "bg-white text-[#c94040]"
                          : "bg-white text-[#1a1a1a]"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  {/* Add to cart button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        id: String(product.id),
                        name: product.name,
                        price: parseFloat(product.price),
                        image: product.image,
                      });
                    }}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#F7F4EF]/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#1a1a1a]" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#1a1a1a] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#6b6560] mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#1a1a1a]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#6b6560] line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#1a1a1a]/20 text-[#1a1a1a] px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-[#1a1a1a]/5"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
