import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#F0EDE7] pt-20 pb-10 relative overflow-hidden">
      {/* Giant watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="font-serif text-[200px] sm:text-[200px] md:text-[400px] font-bold text-white/20 whitespace-nowrap leading-none">
          Boty
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-serif text-3xl text-[#1a1a1a] mb-4">Boty</h2>
            <p className="text-sm text-[#6b6560] leading-relaxed mb-6">
              Natural skincare for those who believe beauty should feel as good
              as it looks.
            </p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F7F4EF] flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#1a1a1a] boty-transition boty-shadow"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F7F4EF] flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#1a1a1a] boty-transition boty-shadow"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#F7F4EF] flex items-center justify-center text-[#1a1a1a]/60 hover:text-[#1a1a1a] boty-transition boty-shadow"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-medium text-[#1a1a1a] mb-4">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: "All Products", href: "/shop" },
                { label: "Serums", href: "/shop?category=serum" },
                { label: "Moisturizers", href: "/shop?category=cream" },
                { label: "Cleansers", href: "/shop?category=cream" },
                { label: "Gift Sets", href: "/shop" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-medium text-[#1a1a1a] mb-4">About</h3>
            <ul className="space-y-3">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Ingredients", href: "/ingredients" },
                { label: "Sustainability", href: "/about" },
                { label: "Press", href: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium text-[#1a1a1a] mb-4">Support</h3>
            <ul className="space-y-3">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Shipping", href: "/shipping" },
                { label: "Returns", href: "/returns" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-[#D8D4CC]/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6b6560]">
              © {new Date().getFullYear()} Boty. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[#6b6560] hover:text-[#1a1a1a] boty-transition"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
