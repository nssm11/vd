"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Leaf, Flower2, Globe, Check } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImage from "@/components/ProductImage";
import { findProduct, relatedProducts as findRelated } from "@/data/products";

function ProductContent({ slug }: { slug: string }) {
  const product = findProduct(slug);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#1a1a1a] mb-4">Product not found</h1>
          <Link href="/shop" className="text-[#8B7355] hover:underline">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: String(product.id),
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = findRelated(product);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F4EF] pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>

          {/* Product Detail */}
          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            {/* Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#F0EDE7] boty-shadow">
              <ProductImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <span
                  className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs tracking-wide font-medium ${
                    product.badge === "Sale"
                      ? "bg-white text-[#c94040]"
                      : "bg-white text-[#1a1a1a]"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="text-sm tracking-[0.2em] uppercase text-[#8B7355] mb-3">
                {product.category === "cream" ? "Moisturizer" : product.category === "oil" ? "Face Oil" : "Serum"}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-[#6b6560] mb-6 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-medium text-[#1a1a1a]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-[#6b6560] line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Qty */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-[#1a1a1a]">Quantity</span>
                <div className="flex items-center border border-[#D8D4CC] rounded-full overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] boty-transition"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-medium">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] boty-transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex items-center justify-center gap-3 w-full sm:w-auto sm:px-12 py-4 rounded-full text-sm tracking-wide boty-transition font-medium ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-[#8B7355] text-[#F7F4EF] hover:bg-[#7a6448]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Key ingredients */}
              <div className="mt-10 pt-8 border-t border-[#D8D4CC]">
                <h3 className="font-medium text-[#1a1a1a] mb-4">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1.5 bg-[#F0EDE7] text-sm text-[#6b6560] rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { Icon: Leaf, label: "100% Natural" },
                  { Icon: Flower2, label: "Vegan" },
                  { Icon: Globe, label: "Ethical" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 p-3 bg-[#F0EDE7] rounded-2xl text-center"
                  >
                    <Icon className="w-5 h-5 text-[#8B7355]" />
                    <span className="text-xs text-[#6b6560]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl text-[#1a1a1a] mb-8">
                You might also like
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <Link key={p.slug} href={`/product/${p.slug}`} className="group">
                    <div className="bg-white rounded-3xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02]">
                      <div className="relative aspect-square bg-[#F0EDE7] overflow-hidden">
                        <ProductImage
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover boty-transition group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-lg text-[#1a1a1a] mb-1">
                          {p.name}
                        </h3>
                        <p className="text-sm text-[#6b6560] mb-2">
                          {p.description}
                        </p>
                        <span className="font-medium text-[#1a1a1a]">
                          ${p.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <CartProvider>
      <ProductContent slug={slug} />
    </CartProvider>
  );
}
