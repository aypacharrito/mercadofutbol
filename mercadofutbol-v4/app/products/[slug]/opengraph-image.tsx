import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/catalog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProductOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3f1ea", color: "#0d1714", fontFamily: "sans-serif" }}>
      <div style={{ width: "52%", padding: "70px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, fontWeight: 800 }}><span style={{ width: 58, height: 58, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "#0b7453", color: "#d9ff58" }}>MF</span> MERCADO FÚTBOL</div>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ color: "#0b7453", fontSize: 22, letterSpacing: 4 }}>{product.club.toUpperCase()}</span><strong style={{ fontSize: 72, lineHeight: 1, letterSpacing: -4 }}>{product.name}</strong><span style={{ marginTop: 22, fontSize: 28 }}>Fan + Player · From ${product.price.toFixed(2)}</span></div>
      </div>
      <div style={{ flex: 1, background: product.tone, color: product.accent, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}><span style={{ width: 210, height: 210, border: `10px solid ${product.accent}`, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 66, fontWeight: 900 }}>{product.badge}</span><span style={{ marginTop: 28, fontSize: 26, letterSpacing: 8 }}>WEAR THE GAME</span></div>
    </div>,
    size,
  );
}
