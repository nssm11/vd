import { productImage, type ProductImageKey } from "@/lib/media";

export type ProductCategory = "cream" | "oil" | "serum";

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  originalPrice: string | null;
  category: ProductCategory;
  badge: "Sale" | "Bestseller" | "New" | null;
  image: string;
  ingredients: string[];
}

/**
 * The catalogue, in one place.
 *
 * It used to be copy-pasted into the home grid, the shop page and the product
 * page — three files that drifted, which is how every card ended up pointing at
 * `/images/products/<slug>.jpg`, a set of files this repo never contained.
 * Images now come from {@link productImage}, so there is exactly one list of
 * real asset URLs to maintain (and `src/db/seed.ts` seeds the same ones).
 */
const CATALOGUE: Array<Omit<Product, "image"> & { imageKey: ProductImageKey }> = [
  {
    id: 1,
    slug: "hydra-cream",
    name: "Hydra Cream",
    description: "Deep moisture with hyaluronic acid",
    longDescription:
      "Our Hydra Cream delivers 72-hour moisture retention through a potent blend of hyaluronic acid, aloe vera, and shea butter. Perfect for dry and combination skin types, this lightweight cream absorbs quickly to leave skin plump, soft, and visibly hydrated.",
    price: "54.00",
    originalPrice: null,
    category: "cream",
    badge: null,
    imageKey: "hydra-cream",
    ingredients: ["Hyaluronic Acid", "Aloe Vera", "Shea Butter", "Jojoba Oil", "Vitamin E"],
  },
  {
    id: 2,
    slug: "gentle-cleanser",
    name: "Gentle Cleanser",
    description: "Soothing botanical wash",
    longDescription:
      "A gentle, soap-free cleanser formulated for sensitive skin. Our blend of chamomile, calendula, and oat extract removes impurities without stripping the skin's natural moisture barrier, leaving your complexion clean, calm, and balanced.",
    price: "38.00",
    originalPrice: "48.00",
    category: "cream",
    badge: "Sale",
    imageKey: "gentle-cleanser",
    ingredients: ["Chamomile Extract", "Calendula", "Oat Extract", "Aloe Vera", "Rose Water"],
  },
  {
    id: 3,
    slug: "night-cream",
    name: "Night Cream",
    description: "Restorative overnight treatment",
    longDescription:
      "While you sleep, our Night Cream works to restore and replenish your skin. Enriched with retinol-alternative bakuchiol, peptides, and nourishing plant oils, this rich formula supports cell renewal for a visibly refreshed, glowing complexion by morning.",
    price: "64.00",
    originalPrice: null,
    category: "cream",
    badge: "Bestseller",
    imageKey: "night-cream",
    ingredients: ["Bakuchiol", "Peptide Complex", "Rosehip Oil", "Squalane", "Vitamin C"],
  },
  {
    id: 4,
    slug: "day-cream-spf",
    name: "Day Cream SPF 30",
    description: "Protection & hydration",
    longDescription:
      "All-in-one daily moisturizer with broad-spectrum SPF 30 protection. Lightweight and non-greasy, it hydrates, protects, and primes your skin for the day ahead. Enriched with antioxidant-rich green tea and niacinamide.",
    price: "58.00",
    originalPrice: null,
    category: "cream",
    badge: null,
    imageKey: "day-cream-spf",
    ingredients: ["Zinc Oxide", "Niacinamide", "Green Tea Extract", "Hyaluronic Acid", "Vitamin B5"],
  },
  {
    id: 5,
    slug: "renewal-oil",
    name: "Renewal Oil",
    description: "Nourishing botanical face oil",
    longDescription:
      "A luxurious blend of seven cold-pressed botanical oils that deeply nourish, restore and add a natural luminosity to your skin. Suitable for all skin types, it absorbs rapidly without leaving any greasy residue.",
    price: "72.00",
    originalPrice: null,
    category: "oil",
    badge: null,
    imageKey: "renewal-oil",
    ingredients: ["Rosehip Oil", "Argan Oil", "Sea Buckthorn", "Jojoba Oil", "Marula Oil"],
  },
  {
    id: 6,
    slug: "rose-hip-oil",
    name: "Rosehip Oil",
    description: "Pure cold-pressed rosehip",
    longDescription:
      "100% pure, cold-pressed rosehip seed oil — nature's most powerful skin restorative. Rich in vitamins A, C, and E plus essential fatty acids, it visibly reduces fine lines and evens skin tone with consistent use.",
    price: "48.00",
    originalPrice: null,
    category: "oil",
    badge: null,
    imageKey: "rose-hip-oil",
    ingredients: ["Rosehip Seed Oil (100%)", "Vitamin A", "Vitamin C", "Vitamin E", "Omega-3"],
  },
  {
    id: 7,
    slug: "radiance-serum",
    name: "Radiance Serum",
    description: "Brightening vitamin C complex",
    longDescription:
      "A powerhouse brightening serum featuring 15% stabilized Vitamin C, ferulic acid, and turmeric extract. It visibly fades dark spots, evens skin tone, and boosts natural radiance for a luminous, glass-skin effect.",
    price: "86.00",
    originalPrice: null,
    category: "serum",
    badge: "New",
    imageKey: "radiance-serum",
    ingredients: ["Vitamin C 15%", "Ferulic Acid", "Turmeric Extract", "Niacinamide", "Hyaluronic Acid"],
  },
  {
    id: 8,
    slug: "glow-serum",
    name: "Glow Serum",
    description: "Niacinamide & peptide blend",
    longDescription:
      "A multi-action serum combining 10% niacinamide with a comprehensive peptide complex to minimize pores, reduce redness, and improve skin texture. Clinically shown to improve skin clarity in just 4 weeks.",
    price: "79.00",
    originalPrice: null,
    category: "serum",
    badge: null,
    imageKey: "glow-serum",
    ingredients: ["Niacinamide 10%", "Peptide Complex", "Zinc PCA", "Panthenol", "Allantoin"],
  },
];

export const PRODUCTS: Product[] = CATALOGUE.map(({ imageKey, ...product }) => ({
  ...product,
  image: productImage(imageKey),
}));

export const CATEGORIES: Array<{ label: string; value: ProductCategory }> = [
  { label: "Cream", value: "cream" },
  { label: "Oil", value: "oil" },
  { label: "Serum", value: "serum" },
];

export function productsByCategory(category: string): Product[] {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter((product) => product.category === category);
}

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

/** Same category, excluding the product being viewed. */
export function relatedProducts(product: Product, limit = 3): Product[] {
  return PRODUCTS.filter(
    (candidate) => candidate.category === product.category && candidate.slug !== product.slug
  ).slice(0, limit);
}
