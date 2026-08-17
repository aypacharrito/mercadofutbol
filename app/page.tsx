import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { collectionDefinitions } from "@/lib/collections";

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

      <section className="category-rail section-shell" id="discover">
        <div className="section-title">
          <div><p className="eyebrow">DISCOVER</p><h2>Shop by competition.</h2></div>
          <Link href="/collections/world-cup">Start with World Cup 2026 →</Link>
        </div>
        <div className="category-cards">
          {collectionDefinitions.map((collection, index) => (
            <Link className={`category-card category-${(index % 6) + 1}`} href={`/collections/${collection.slug}`} key={collection.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{collection.label}</h3>
              <p>{collection.description}</p>
              <b>Browse collection →</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="version-story">
        <div className="version-fan"><span>01</span><p>EVERYDAY COMFORT</p><h2>Fan version.</h2><ul><li>Relaxed standard fit</li><li>Comfort-first construction</li><li>Best for everyday wear</li></ul></div>
        <div className="version-player"><span>02</span><p>MATCH-INSPIRED</p><h2>Player version.</h2><ul><li>Athletic tapered fit</li><li>Performance-style details</li><li>$55 per jersey</li></ul></div>
      </section>

      <section className="personalization-banner">
        <div><p className="eyebrow">YOUR NAME. YOUR NUMBER.</p><h2>Make the shirt yours.</h2><p>Add a player name, your own name, and a number before checkout.</p><Link className="button-primary" href="/collections/world-cup">Shop World Cup 2026</Link></div>
        <div className="number-art"><span>10</span><b>MERCADO</b></div>
      </section>
    </main>
  );
}
