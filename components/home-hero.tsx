import Link from "next/link";
import { products } from "@/lib/catalog";
import { ProductVisual } from "@/components/product-visual";

export function HomeHero() {
  const heroProduct = products.find((product) => product.id === "mf-mexico-home-2026") ?? products.find((product) => product.featured && product.image) ?? products[0];
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
        <div><span>{heroProduct.club}</span><strong>{heroProduct.name}</strong><b>${heroProduct.price.toFixed(2)}</b></div>
      </Link>
    </section>
  );
}
