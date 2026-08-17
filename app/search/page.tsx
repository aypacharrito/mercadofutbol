import { ProductCard } from "@/components/product-card";
import { catalogProducts } from "@/lib/catalog";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const results = term
    ? catalogProducts.filter((product) => `${product.club} ${product.name} ${product.league} ${product.season}`.toLowerCase().includes(term))
    : catalogProducts;
  return (
    <main className="listing-page">
      <section className="listing-hero"><p className="eyebrow">SEARCH</p><h1>{term ? `Results for “${q}”` : "All Jerseys"}</h1><p>{results.length} matching styles</p></section>
      <section className="section-shell">
        {results.length ? <div className="product-grid">{results.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="no-results"><h2>No jerseys found.</h2><p>Try a team, country, league, or season.</p></div>}
      </section>
    </main>
  );
}
