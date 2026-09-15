"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="py-24 bg-[#8B7355]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl leading-tight text-[#F7F4EF] mb-4 text-balance md:text-7xl">
            Join the ritual
          </h2>
          <p className="text-lg text-[#F7F4EF]/80 mb-10">
            Subscribe for exclusive offers, skincare tips, and early access to
            new products.
          </p>

          {status === "success" ? (
            <div className="bg-[#F7F4EF]/10 border border-[#F7F4EF]/20 rounded-2xl px-8 py-6 text-[#F7F4EF]">
              <p className="text-lg font-medium">✨ {message}</p>
              <p className="text-sm text-[#F7F4EF]/70 mt-2">
                Welcome to the Boty family!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-[#F7F4EF]/10 backdrop-blur-sm border border-[#F7F4EF]/20 rounded-full px-6 py-4 text-[#F7F4EF] placeholder:text-[#F7F4EF]/50 focus:outline-none focus:border-[#F7F4EF]/40 boty-transition"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex items-center justify-center gap-2 bg-[#F7F4EF] text-[#8B7355] px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-[#F7F4EF]/90 disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
                {status !== "loading" && (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-sm text-red-200 mt-3">{message}</p>
          )}

          <p className="text-sm text-[#F7F4EF]/60 mt-6">
            Unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
