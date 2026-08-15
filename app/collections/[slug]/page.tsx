import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCollection, productsForCollection } from "@/lib/collections";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.label,
    description: `Shop ${collection.label} jerseys in Fan and Player versions at Mercado Fútbol.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const collectionProducts = productsForCollection(slug);

  return (
    <main className="listing-page">
      <section className="listing-hero">
        <p className="eyebrow">MERCADO FÚTBOL</p>
        <h1>{collection.label}</h1>
        <p>{collection.description} · Fan and Player options · Optional personalization</p>
      </section>
      <section className="section-shell">
        <div className="listing-tools"><span>{collectionProducts.length} products</span><span>2026/27 releases first</span></div>
        <div className="product-grid">
          {collectionProducts.map((product, index) => <ProductCard product={product} priority={index < 3} key={product.id} />)}
        </div>
      </section>
    </main>
  );
}
