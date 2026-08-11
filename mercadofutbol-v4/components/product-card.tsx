import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { ProductVisual } from "@/components/product-visual";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const isSale = typeof product.compareAtPrice === "number";
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-card-link" aria-label={`View ${product.name}`}>
        <div className="product-tag">{isSale ? "SALE" : product.categories.includes("new") ? "NEW" : product.season}</div>
        <ProductVisual product={product} priority={priority} />
        <div className="product-card-copy">
          <p>{product.club}</p>
          <h3>{product.name}</h3>
          <span>{product.season} · Fan &amp; Player</span>
          <div className="price-row">
            <strong>${product.price.toFixed(2)}</strong>
            {isSale ? <del>${product.compareAtPrice?.toFixed(2)}</del> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
