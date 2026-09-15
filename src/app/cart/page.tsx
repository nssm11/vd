"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function CartContent() {
  const { items, total, removeItem, updateQuantity } = useCart();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F4EF] pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue shopping
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-10">
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="w-16 h-16 text-[#D8D4CC] mb-6" />
              <h2 className="font-serif text-2xl text-[#1a1a1a] mb-3">
                Your cart is empty
              </h2>
              <p className="text-[#6b6560] mb-8">
                Discover our natural skincare collection
              </p>
              <Link
                href="/shop"
                className="bg-[#8B7355] text-[#F7F4EF] px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-[#7a6448]"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-5 flex items-center gap-5 boty-shadow"
                  >
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#F0EDE7] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[#1a1a1a] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#6b6560]">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center border border-[#D8D4CC] rounded-full overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] boty-transition text-sm"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] boty-transition text-sm"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium text-[#1a1a1a] w-16 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[#6b6560] hover:text-red-500 boty-transition ml-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-8 boty-shadow sticky top-24">
                  <h2 className="font-serif text-xl text-[#1a1a1a] mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b6560]">Subtotal</span>
                      <span className="text-[#1a1a1a]">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6b6560]">Shipping</span>
                      <span className="text-[#1a1a1a]">
                        {total >= 75 ? "Free" : "$6.95"}
                      </span>
                    </div>
                    {total < 75 && (
                      <p className="text-xs text-[#8B7355]">
                        Add ${(75 - total).toFixed(2)} more for free shipping
                      </p>
                    )}
                  </div>
                  <div className="border-t border-[#D8D4CC] pt-4 mb-6">
                    <div className="flex justify-between font-medium">
                      <span className="text-[#1a1a1a]">Total</span>
                      <span className="text-[#1a1a1a]">
                        ${(total + (total >= 75 ? 0 : 6.95)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-[#8B7355] text-[#F7F4EF] py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-[#7a6448] font-medium"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-xs text-center text-[#6b6560] mt-4">
                    Secure checkout · Free returns
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  );
}
