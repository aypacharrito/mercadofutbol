import Image from "next/image";
import type { Product } from "@/lib/catalog";

export function ProductVisual({
  product,
  priority = false,
  className = "",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  if (product.image) {
    return (
      <div className={`product-visual product-visual-photo ${className}`}>
        <Image
          src={product.image}
          alt={`${product.club} ${product.name} Fan and Player jerseys`}
          fill
          priority={priority}
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`product-visual product-visual-mock ${className}`}
      style={{ "--kit": product.tone, "--trim": product.accent } as React.CSSProperties}
      aria-label={`${product.club} ${product.name} color preview`}
      role="img"
    >
      <div className="kit-shadow" />
      <div className="kit">
        <span className="kit-badge">{product.badge}</span>
        <span className="kit-wordmark">MERCADO</span>
      </div>
      <span className="preview-label">PHOTO COMING SOON</span>
    </div>
  );
}
