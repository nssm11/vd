import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query = db.select().from(products);

    if (category && category !== "all") {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.category, category));
      return NextResponse.json(result);
    }

    const result = await query;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Products error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
