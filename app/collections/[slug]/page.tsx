import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogBrowser } from "@/components/catalog-browser";
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
        <CatalogBrowser products={collectionProducts} />
      </section>
    </main>
  );
}
