// `next dev`/`next build` load .env themselves; a bare tsx run does not, and
// without this the seed could never see DATABASE_URL.
import "dotenv/config";
import { db } from "./index";
import { products, testimonials } from "./schema";
import { PRODUCTS } from "@/data/products";

async function seed() {
  console.log("Seeding database...");

  // Seed products — one list with the UI (src/data/products.ts), so the API and
  // the storefront can never disagree on a slug, a price or an image again. The
  // `image` column holds the absolute media URL on purpose: it is fed straight
  // into <ProductImage /> by /api/products.
  await db.insert(products).values(
    PRODUCTS.map((product) => ({
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      badge: product.badge,
      image: product.image,
      featured: product.category === "cream",
      inStock: true,
    }))
  ).onConflictDoNothing();

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
