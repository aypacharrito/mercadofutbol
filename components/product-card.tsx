import Link from "next/link";
import { getProductVariants, type Product } from "@/lib/catalog";
import { ProductVisual } from "@/components/product-visual";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const isSale = typeof product.compareAtPrice === "number";
  const variants = getProductVariants(product);
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-card-link" aria-label={`View ${product.name}`}>
        <div className="product-tag">{isSale ? "SALE" : product.categories.includes("new") ? "NEW" : product.season}</div>
        <ProductVisual product={product} priority={priority} />
        <div className="product-card-copy">
          <p>{product.league}</p>
          <h3>{product.club} Jerseys</h3>
          <span>{product.season} · Choose kit + fit</span>
          <div className="card-kit-options" aria-label="Available kits">
            {variants.map((variant) => <small key={variant.id}>{variant.kit}</small>)}
          </div>
        </div>
      </Link>
    </article>
  );
}
