import { pgTable, serial, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(), // cream, oil, serum
  badge: text("badge"), // Sale, Bestseller, New
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
  inStock: boolean("in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  location: text("location").notNull(),
  product: text("product").notNull(),
  quote: text("quote").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
