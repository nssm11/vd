"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string | null;
  category: string;
  badge: string | null;
  image: string;
}

const ALL_PRODUCTS: Product[] = [
  { id: 1, slug: "hydra-cream", name: "Hydra Cream", description: "Deep moisture with hyaluronic acid", price: "54.00", originalPrice: null, category: "cream", badge: null, image: "/images/products/hydra-cream.jpg" },
  { id: 2, slug: "gentle-cleanser", name: "Gentle Cleanser", description: "Soothing botanical wash", price: "38.00", originalPrice: "48.00", category: "cream", badge: "Sale", image: "/images/products/gentle-cleanser.jpg" },
  { id: 3, slug: "night-cream", name: "Night Cream", description: "Restorative overnight treatment", price: "64.00", originalPrice: null, category: "cream", badge: "Bestseller", image: "/images/products/night-cream.jpg" },
  { id: 4, slug: "day-cream-spf", name: "Day Cream SPF 30", description: "Protection & hydration", price: "58.00", originalPrice: null, category: "cream", badge: null, image: "/images/products/day-cream-spf.jpg" },
  { id: 5, slug: "renewal-oil", name: "Renewal Oil", description: "Nourishing botanical face oil", price: "72.00", originalPrice: null, category: "oil", badge: null, image: "/images/products/renewal-oil.jpg" },
  { id: 6, slug: "rose-hip-oil", name: "Rosehip Oil", description: "Pure cold-pressed rosehip", price: "48.00", originalPrice: null, category: "oil", badge: null, image: "/images/products/rosehip-oil.jpg" },
  { id: 7, slug: "radiance-serum", name: "Radiance Serum", description: "Brightening vitamin C complex", price: "86.00", originalPrice: null, category: "serum", badge: "New", image: "/images/products/radiance-serum.jpg" },
  { id: 8, slug: "glow-serum", name: "Glow Serum", description: "Niacinamide & peptide blend", price: "79.00", originalPrice: null, category: "serum", badge: null, image: "/images/products/glow-serum.jpg" },
];

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Creams", value: "cream" },
  { label: "Oils", value: "oil" },
  { label: "Serums", value: "serum" },
];

function ShopContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [added, setAdded] = useState<number | null>(null);
  const { addItem } = useCart();

  const filtered = activeCategory === "all"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAdd = (product: Product) => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F4EF] pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <h1 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] mb-4">
              Our Collection
            </h1>
            <p className="text-lg text-[#6b6560] max-w-md">
              Thoughtfully crafted products for your daily skincare ritual
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium boty-transition ${
                  activeCategory === cat.value
                    ? "bg-[#1a1a1a] text-[#F7F4EF]"
                    : "bg-[#F0EDE7] text-[#6b6560] hover:text-[#1a1a1a]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div key={product.slug} className="group">
                <div className="bg-white rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                  <div className="relative aspect-square bg-[#F0EDE7] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover boty-transition group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
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
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`absolute bottom-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center boty-transition boty-shadow ${
                        added === product.id
                          ? "bg-[#8B7355] opacity-100 translate-y-0"
                          : "bg-[#F7F4EF]/90 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                      }`}
                      aria-label="Add to cart"
                    >
                      <ShoppingBag
                        className={`w-4 h-4 ${added === product.id ? "text-white" : "text-[#1a1a1a]"}`}
                      />
                    </button>
                  </div>
                  <div className="p-5">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-serif text-lg text-[#1a1a1a] mb-1 hover:text-[#8B7355] boty-transition">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#6b6560] mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
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
                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`text-xs px-3 py-1.5 rounded-full boty-transition font-medium ${
                          added === product.id
                            ? "bg-[#8B7355] text-white"
                            : "bg-[#F0EDE7] text-[#1a1a1a] hover:bg-[#8B7355] hover:text-white"
                        }`}
                      >
                        {added === product.id ? "Added ✓" : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}
