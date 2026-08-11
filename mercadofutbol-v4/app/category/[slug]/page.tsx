import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCategory, productsForCategory } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.label,
    description: `Shop ${category.label.toLowerCase()} in Fan and Player versions at Mercado Fútbol.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryProducts = productsForCategory(category.slug);

  return (
    <main className="listing-page">
      <section className="listing-hero">
        <p className="eyebrow">MERCADO FÚTBOL</p>
        <h1>{category.label}</h1>
        <p>{categoryProducts.length} styles · Fan and Player options · Optional personalization</p>
      </section>
      <section className="section-shell">
        <div className="listing-tools"><span>{categoryProducts.length} products</span><span>Sorted by Featured</span></div>
        <div className="product-grid">
          {categoryProducts.map((product, index) => <ProductCard product={product} priority={index < 3} key={product.id} />)}
        </div>
      </section>
    </main>
  );
}
