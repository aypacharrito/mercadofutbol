import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { ProductCard } from "@/components/product-card";
import { categoryDefinitions, products } from "@/lib/catalog";

const featured = products.filter((product) => product.featured);

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <section className="benefit-strip">
        <div><b>Fan + Player</b><span>Choose your preferred fit</span></div>
        <div><b>Make it yours</b><span>Optional name and number</span></div>
        <div><b>Track every order</b><span>Simple customer account</span></div>
        <div><b>Secure payment</b><span>Protected by Stripe</span></div>
      </section>

      <section className="category-rail section-shell">
        <div className="section-title"><div><p className="eyebrow">SHOP YOUR WAY</p><h2>Find your colors.</h2></div></div>
        <div className="category-cards">
          {categoryDefinitions.map((category, index) => (
            <Link className={`category-card category-${index + 1}`} href={`/category/${category.slug}`} key={category.slug}>
              <span>0{index + 1}</span><h3>{category.label}</h3><b>Shop now →</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell product-section">
        <div className="section-title"><div><p className="eyebrow">TRENDING NOW</p><h2>Fan favorites.</h2></div><Link href="/category/new">View all new releases →</Link></div>
        <div className="product-grid">
          {featured.map((product, index) => <ProductCard product={product} priority={index < 2} key={product.id} />)}
        </div>
      </section>

      <section className="version-story">
        <div className="version-fan"><span>01</span><p>EVERYDAY COMFORT</p><h2>Fan version.</h2><ul><li>Relaxed standard fit</li><li>Comfort-first construction</li><li>Best for everyday wear</li></ul></div>
        <div className="version-player"><span>02</span><p>MATCH-INSPIRED</p><h2>Player version.</h2><ul><li>Athletic tapered fit</li><li>Performance-style details</li><li>+$15 per jersey</li></ul></div>
      </section>

      <section className="personalization-banner">
        <div><p className="eyebrow">YOUR NAME. YOUR NUMBER.</p><h2>Make the shirt yours.</h2><p>Add a player name, your own name, and a number before checkout.</p><Link className="button-primary" href="/category/clubs">Start customizing</Link></div>
        <div className="number-art"><span>10</span><b>MERCADO</b></div>
      </section>
    </main>
  );
}
