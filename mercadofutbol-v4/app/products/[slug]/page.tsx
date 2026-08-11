import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductVisual } from "@/components/product-visual";
import { getProductBySlug, products } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.club} ${product.name}`,
    description: product.description,
    openGraph: { images: [`/products/${product.slug}/opengraph-image`] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && item.categories.some((category) => product.categories.includes(category))).slice(0, 4);

  return (
    <main>
      <section className="product-page">
        <div className="product-gallery"><ProductVisual product={product} priority /></div>
        <ProductPurchase product={product} />
      </section>
      <section className="product-details section-shell">
        <div><span>01</span><h3>Fan or Player</h3><p>Choose a relaxed everyday version or a closer athletic cut.</p></div>
        <div><span>02</span><h3>Personalized</h3><p>Add an optional name and number directly from this page.</p></div>
        <div><span>03</span><h3>Tracked</h3><p>Signed-in customers can see payment and shipping status in My Orders.</p></div>
      </section>
      <section className="section-shell related-products">
        <div className="section-title"><div><p className="eyebrow">YOU MAY ALSO LIKE</p><h2>More to wear.</h2></div></div>
        <div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div>
      </section>
    </main>
  );
}
