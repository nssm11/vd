import { db } from "./index";
import { products, testimonials } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Seed products
  await db.insert(products).values([
    {
      slug: "hydra-cream",
      name: "Hydra Cream",
      description: "Deep moisture with hyaluronic acid",
      price: "54.00",
      category: "cream",
      badge: null,
      image: "/images/products/cream-jars-colored.png",
      featured: true,
      inStock: true,
    },
    {
      slug: "gentle-cleanser",
      name: "Gentle Cleanser",
      description: "Soothing botanical wash",
      price: "38.00",
      originalPrice: "48.00",
      category: "cream",
      badge: "Sale",
      image: "/images/products/tube-bottles.png",
      featured: true,
      inStock: true,
    },
    {
      slug: "night-cream",
      name: "Night Cream",
      description: "Restorative overnight treatment",
      price: "64.00",
      category: "cream",
      badge: "Bestseller",
      image: "/images/products/jars-wooden-lid.png",
      featured: true,
      inStock: true,
    },
    {
      slug: "day-cream-spf",
      name: "Day Cream SPF 30",
      description: "Protection & hydration",
      price: "58.00",
      category: "cream",
      badge: null,
      image: "/images/products/pump-bottles-lavender.png",
      featured: true,
      inStock: true,
    },
    {
      slug: "renewal-oil",
      name: "Renewal Oil",
      description: "Nourishing botanical face oil",
      price: "72.00",
      category: "oil",
      badge: null,
      image: "/images/products/oil-bottle.png",
      featured: false,
      inStock: true,
    },
    {
      slug: "radiance-serum",
      name: "Radiance Serum",
      description: "Brightening vitamin C complex",
      price: "86.00",
      category: "serum",
      badge: "New",
      image: "/images/products/serum-bottle.png",
      featured: false,
      inStock: true,
    },
    {
      slug: "glow-serum",
      name: "Glow Serum",
      description: "Niacinamide & peptide blend",
      price: "79.00",
      category: "serum",
      badge: null,
      image: "/images/products/glow-serum.png",
      featured: false,
      inStock: true,
    },
    {
      slug: "rose-hip-oil",
      name: "Rosehip Oil",
      description: "Pure cold-pressed rosehip",
      price: "48.00",
      category: "oil",
      badge: null,
      image: "/images/products/rosehip-oil.png",
      featured: false,
      inStock: true,
    },
  ]).onConflictDoNothing();

  // Seed testimonials
  await db.insert(testimonials).values([
    {
      author: "Sarah M.",
      location: "New York",
      product: "Radiance Serum",
      quote: "My skin has never felt so soft and nourished. The Radiance Serum is now a permanent part of my morning routine.",
    },
    {
      author: "Emma L.",
      location: "Los Angeles",
      product: "Gentle Cleanser",
      quote: "Finally, skincare that actually feels natural. No more harsh chemicals. My sensitive skin loves Boty products.",
    },
    {
      author: "Jessica R.",
      location: "Chicago",
      product: "Hydra Cream",
      quote: "The Hydra Cream is absolutely divine. It absorbs beautifully and keeps my skin hydrated all day long.",
    },
    {
      author: "Maria K.",
      location: "Miami",
      product: "Glow Serum",
      quote: "I've tried countless serums but nothing compares to the glow I get from Boty. Absolutely transformative.",
    },
    {
      author: "Sophie T.",
      location: "Seattle",
      product: "Night Cream",
      quote: "The packaging is beautiful and sustainable. I feel good knowing I'm choosing eco-friendly skincare.",
    },
    {
      author: "Anna P.",
      location: "Boston",
      product: "Gentle Cleanser",
      quote: "My acne-prone skin has cleared up since switching to Boty. Natural ingredients really make a difference.",
    },
    {
      author: "Claire B.",
      location: "Austin",
      product: "Renewal Oil",
      quote: "The texture of the Renewal Oil is perfection. It absorbs quickly and leaves my skin glowing.",
    },
    {
      author: "Lily W.",
      location: "Portland",
      product: "Hydra Cream",
      quote: "I love that Boty is cruelty-free and vegan. Great products that align with my values.",
    },
    {
      author: "Rachel D.",
      location: "Denver",
      product: "Radiance Serum",
      quote: "The scent is so subtle and natural. No overpowering fragrances, just pure botanical goodness.",
    },
  ]).onConflictDoNothing();

  console.log("Seeding complete!");
}

seed().catch(console.error).finally(() => process.exit(0));
