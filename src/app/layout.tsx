import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased bg-[#F7F4EF] text-[#1a1a1a]`}
      >
        {children}
      </body>
    </html>
  );
}
