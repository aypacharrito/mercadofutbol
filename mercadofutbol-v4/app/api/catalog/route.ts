import { NextResponse } from "next/server";
import { products } from "@/lib/catalog";

export function GET() {
  return NextResponse.json({
    store: "Mercado Fútbol",
    currency: "USD",
    products: products.map((product) => ({
      id: product.id,
      slug: product.slug,
      club: product.club,
      name: product.name,
      league: product.league,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      categories: product.categories,
      sizes: product.sizes,
      image: product.image,
      description: product.description,
      season: product.season,
      featured: product.featured,
    })),
  }, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
}
