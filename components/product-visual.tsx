import Image from "next/image";
import type { Product } from "@/lib/catalog";

export function ProductVisual({
  product,
  priority = false,
  className = "",
  version = "Fan",
  showVersionLabel = false,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  version?: "Fan" | "Player";
  showVersionLabel?: boolean;
}) {
  const selectedImage = version === "Player" ? (product.playerImage ?? product.image) : product.image;

  if (selectedImage) {
    return (
      <div className={`product-visual product-visual-photo product-visual-${version.toLowerCase()} ${className}`}>
        <Image
          key={`${selectedImage}-${version}`}
          src={selectedImage}
          alt={`${product.club} ${product.kit} ${version} jersey`}
          fill
          priority={priority}
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        {showVersionLabel ? <span className="visual-version-label">{version} fit preview</span> : null}
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
