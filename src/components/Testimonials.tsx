"use client";

const testimonials = [
  {
    author: "Sarah M.",
    location: "New York",
    product: "Radiance Serum",
    quote:
      "My skin has never felt so soft and nourished. The Radiance Serum is now a permanent part of my morning routine.",
  },
  {
    author: "Emma L.",
    location: "Los Angeles",
    product: "Gentle Cleanser",
    quote:
      "Finally, skincare that actually feels natural. No more harsh chemicals. My sensitive skin loves Boty products.",
  },
  {
    author: "Jessica R.",
    location: "Chicago",
    product: "Hydra Cream",
    quote:
      "The Hydra Cream is absolutely divine. It absorbs beautifully and keeps my skin hydrated all day long.",
  },
  {
    author: "Maria K.",
    location: "Miami",
    product: "Glow Serum",
    quote:
      "I've tried countless serums but nothing compares to the glow I get from Boty. Absolutely transformative.",
  },
  {
    author: "Sophie T.",
    location: "Seattle",
    product: "Night Cream",
    quote:
      "The packaging is beautiful and sustainable. I feel good knowing I'm choosing eco-friendly skincare.",
  },
  {
    author: "Anna P.",
    location: "Boston",
    product: "Gentle Cleanser",
    quote:
      "My acne-prone skin has cleared up since switching to Boty. Natural ingredients really make a difference.",
  },
  {
    author: "Claire B.",
    location: "Austin",
    product: "Renewal Oil",
    quote:
      "The texture of the Renewal Oil is perfection. It absorbs quickly and leaves my skin glowing.",
  },
  {
    author: "Lily W.",
    location: "Portland",
    product: "Hydra Cream",
    quote:
      "I love that Boty is cruelty-free and vegan. Great products that align with my values.",
  },
  {
    author: "Rachel D.",
    location: "Denver",
    product: "Radiance Serum",
    quote:
      "The scent is so subtle and natural. No overpowering fragrances, just pure botanical goodness.",
  },
];

const cardStyle: React.CSSProperties = {
  boxShadow:
    "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
};

function TestimonialCard({
  author,
  location,
  product,
  quote,
}: {
  author: string;
  location: string;
  product: string;
  quote: string;
}) {
  return (
    <div className="rounded-3xl p-6 bg-white mb-4 flex-shrink-0" style={cardStyle}>
      <p className="text-[#1a1a1a]/80 leading-relaxed mb-4 font-medium text-xl font-serif tracking-wide">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[#1a1a1a] text-sm font-bold">{author}</p>
          <p className="text-xs text-[#6b6560]">{location}</p>
        </div>
        <span className="text-xs tracking-wide text-[#8B7355]/70 bg-[#8B7355]/5 px-2 py-1 rounded-full whitespace-nowrap">
          {product}
        </span>
      </div>
    </div>
  );
}

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);
const mobileAll = testimonials;

export default function Testimonials() {
  return (
    <section
      className="py-24 overflow-hidden pb-24 pt-12"
      style={{ backgroundColor: "#F7F4EF" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-[#8B7355] mb-4 block">
            Kind Words
          </span>
          <h2 className="font-serif text-4xl leading-tight text-[#1a1a1a] text-balance md:text-7xl">
            Loved by thousands
          </h2>
        </div>

        <div className="relative">
          {/* Top / bottom fade overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F7F4EF] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F7F4EF] to-transparent z-10 pointer-events-none" />

          {/* Mobile — single scrolling column */}
          <div className="md:hidden h-[600px]">
            <div className="relative overflow-hidden h-full">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...mobileAll, ...mobileAll].map((t, i) => (
                  <TestimonialCard key={`m-${i}`} {...t} />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop — 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 h-[600px]">
            {/* Col 1 — scroll down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...col1, ...col1].map((t, i) => (
                  <TestimonialCard key={`c1-${i}`} {...t} />
                ))}
              </div>
            </div>

            {/* Col 2 — scroll up */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-up hover:animate-scroll-up-slow">
                {[...col2, ...col2].map((t, i) => (
                  <TestimonialCard key={`c2-${i}`} {...t} />
                ))}
              </div>
            </div>

            {/* Col 3 — scroll down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...col3, ...col3].map((t, i) => (
                  <TestimonialCard key={`c3-${i}`} {...t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
