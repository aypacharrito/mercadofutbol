import Link from "next/link";
import { catalogProducts } from "@/lib/catalog";
import { ProductVisual } from "@/components/product-visual";

export function HomeHero() {
  const heroProduct = catalogProducts.find((product) => product.id === "mf-mexico-home-2026") ?? catalogProducts.find((product) => product.featured && product.image) ?? catalogProducts[0];
  return (
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow">WORLD CUP 2026</p>
        <h1>Wear the<br />beautiful game.</h1>
        <p>Start with the World Cup collection, then browse Liga MX, La Liga, Premier League, MLS, and more.</p>
        <div className="hero-actions"><Link className="button-primary" href="/collections/world-cup">Shop World Cup 2026</Link><Link className="button-secondary" href="#discover">Browse competitions</Link></div>
      </div>
      <Link className="hero-product" href={`/products/${heroProduct.slug}`}>
        <span className="hero-sticker">FAN + PLAYER</span>
        <ProductVisual product={heroProduct} priority />
        <div><span>{heroProduct.club}</span><strong>Home + Away</strong><b>Choose Fan or Player</b></div>
      </Link>
    </section>
  );
}
