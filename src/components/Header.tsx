"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 backdrop-blur-md rounded-2xl py-0 animate-scale-fade-in"
        style={{
          background: "rgba(255,255,255,0.4)",
          border: "1px solid rgba(255,255,255,0.32)",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
        }}
      >
        <div className="flex items-center justify-between h-[68px]">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-[#1a1a1a]/80 hover:text-[#1a1a1a] boty-transition"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop left nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
            >
              About
            </Link>
            <Link
              href="/ingredients"
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
            >
              Ingredients
            </Link>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-3xl tracking-wider text-[#1a1a1a]">
              Boty
            </h1>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/account"
              className="hidden sm:block p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#8B7355] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden boty-transition ${
            menuOpen ? "max-h-64 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-[#D8D4CC]/50">
            <Link
              href="/shop"
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/ingredients"
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
              onClick={() => setMenuOpen(false)}
            >
              Ingredients
            </Link>
            <Link
              href="/account"
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#1a1a1a] boty-transition"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
