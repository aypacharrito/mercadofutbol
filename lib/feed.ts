import type { Product } from "@/lib/catalog";

export function csvCell(value: string | number) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}

export function productUrl(product: Product) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://mercadofutbol.shop";
  return `${base}/products/${product.slug}`;
}

export function productImageUrl(product: Product) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://mercadofutbol.shop";
  return product.image ? `${base}${product.image}` : `${base}/products/${product.slug}/opengraph-image`;
}
