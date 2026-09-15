"use client";

import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AccountContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F4EF] pt-28 pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="bg-white rounded-3xl p-10 boty-shadow text-center">
            <div className="w-20 h-20 bg-[#F0EDE7] rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-[#8B7355]" />
            </div>
            <h1 className="font-serif text-3xl text-[#1a1a1a] mb-3">
              My Account
            </h1>
            <p className="text-[#6b6560] mb-8">
              Sign in to track orders and manage your skincare routine.
            </p>
            <div className="space-y-3 max-w-xs mx-auto">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-[#D8D4CC] rounded-full px-5 py-3 text-sm text-[#1a1a1a] placeholder:text-[#6b6560] focus:outline-none focus:border-[#8B7355] boty-transition"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-[#D8D4CC] rounded-full px-5 py-3 text-sm text-[#1a1a1a] placeholder:text-[#6b6560] focus:outline-none focus:border-[#8B7355] boty-transition"
              />
              <button
                type="button"
                className="w-full bg-[#8B7355] text-[#F7F4EF] py-3.5 rounded-full text-sm tracking-wide boty-transition hover:bg-[#7a6448] font-medium"
              >
                Sign In
              </button>
              <p className="text-xs text-[#6b6560] pt-2">
                New to Boty?{" "}
                <button type="button" className="text-[#8B7355] hover:underline">
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function AccountPage() {
  return (
    <CartProvider>
      <AccountContent />
    </CartProvider>
  );
}
