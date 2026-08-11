import { NextResponse } from "next/server";
import { products } from "../../../lib/catalog";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    brand: "Mercado Fútbol",
    currency: "USD",
    products: products.map((product) => ({
      id: `MF-${product.id}`,
      title: product.name,
      brand: product.club,
      category: product.league,
      price: product.price,
      availability: "in stock",
      url: `https://mercadofutbol.shop/?product=${product.id}`,
    })),
  });
}
