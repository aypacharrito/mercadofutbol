import { products } from "@/lib/catalog";
import { csvCell, productImageUrl, productUrl } from "@/lib/feed";

export function GET() {
  const header = ["id", "title", "description", "availability", "condition", "price", "link", "image_link", "brand", "google_product_category"];
  const rows = products.map((product) => [
    product.id,
    `${product.club} ${product.name}`,
    product.description,
    "in stock",
    "new",
    `${product.price.toFixed(2)} USD`,
    productUrl(product),
    productImageUrl(product),
    "Mercado Fútbol",
    "Apparel & Accessories > Clothing > Shirts & Tops",
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "public, s-maxage=3600" } });
}
