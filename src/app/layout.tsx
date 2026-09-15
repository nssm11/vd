import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

// DM Sans (body) and Playfair Display (headings) are self-hosted via
// `@fontsource-variable/*` and wired up in globals.css `@theme`, so the build
// does not depend on reaching fonts.googleapis.com — see the note there.

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
};

export const metadata: Metadata = {
  title: "Boty — Natural Skincare",
  description:
    "Premium natural skincare and body care products. Glow gently with Boty.",
  keywords: "skincare,natural,organic,beauty,body care,cruelty-free",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#F7F4EF] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
