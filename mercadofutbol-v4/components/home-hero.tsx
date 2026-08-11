import Link from "next/link";
import { products } from "@/lib/catalog";
import { ProductVisual } from "@/components/product-visual";

export function HomeHero() {
  const heroProduct = products.find((product) => product.featured && product.image) ?? products[0];
  return (
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow">THE 2026 DROP</p>
        <h1>Wear the<br />beautiful game.</h1>
        <p>Fan favorites, player cuts, retro classics, and custom name-and-number options—made simple.</p>
        <div className="hero-actions"><Link className="button-primary" href="/category/new">Shop new releases</Link><Link className="button-secondary" href="/category/national-teams">Shop national teams</Link></div>
      </div>
      <Link className="hero-product" href={`/products/${heroProduct.slug}`}>
        <span className="hero-sticker">FAN + PLAYER</span>
        <ProductVisual product={heroProduct} priority />
        <div><span>{heroProduct.club}</span><strong>{heroProduct.name}</strong><b>${heroProduct.price.toFixed(2)}</b></div>
      </Link>
    </section>
  );
}
