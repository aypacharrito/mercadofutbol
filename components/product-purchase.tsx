"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { itemPriceCents } from "@/lib/catalog";
import { trackCommerceEvent } from "@/lib/analytics";
import { useCart } from "@/components/cart-provider";
import { ProductVisual } from "@/components/product-visual";

export function ProductPurchase({ product, variants }: { product: Product; variants: Product[] }) {
  const { addItem } = useCart();
  const [selectedId, setSelectedId] = useState(product.id);
  const [version, setVersion] = useState<"Fan" | "Player">("Fan");
  const [size, setSize] = useState(product.sizes[0]);
  const [playerName, setPlayerName] = useState("");
  const [number, setNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = variants.find((variant) => variant.id === selectedId) ?? product;
  const priceCents = useMemo(() => itemPriceCents(selectedProduct, version), [selectedProduct, version]);

  useEffect(() => {
    trackCommerceEvent("ViewContent", {
      value: selectedProduct.price,
      contentId: selectedProduct.id,
      contentName: selectedProduct.name,
    });
  }, [selectedProduct.id, selectedProduct.name, selectedProduct.price]);

  function addToBag() {
    addItem({
      productId: selectedProduct.id,
      slug: selectedProduct.slug,
      club: selectedProduct.club,
      name: selectedProduct.name,
      priceCents,
      version,
      size,
      number,
      playerName,
      quantity,
      image: version === "Player" ? (selectedProduct.playerImage ?? selectedProduct.image) : selectedProduct.image,
      tone: selectedProduct.tone,
      accent: selectedProduct.accent,
      badge: selectedProduct.badge,
    });
  }

  return (
    <section className="product-page">
      <div className="product-gallery">
        <div className="product-gallery-layout">
          <div className="product-gallery-thumbs" aria-label="Jersey styles">
            {variants.map((variant) => (
              <button
                type="button"
                className={selectedProduct.id === variant.id ? "selected" : ""}
                aria-pressed={selectedProduct.id === variant.id}
                onClick={() => setSelectedId(variant.id)}
                key={variant.id}
              >
                <ProductVisual product={variant} version={version} />
                <span>{variant.kit}</span>
              </button>
            ))}
          </div>
          <div className="product-gallery-main">
            <ProductVisual product={selectedProduct} version={version} showVersionLabel priority />
            <div className="gallery-caption"><span>{selectedProduct.kit}</span><span>{version} version</span></div>
          </div>
        </div>
      </div>
      <div className="purchase-panel">
      <div className="purchase-heading">
        <p>{selectedProduct.league} · {selectedProduct.season}</p>
        <h1>{selectedProduct.club} Jerseys</h1>
        <span>{selectedProduct.kit} · {version}</span>
        <div className="product-page-price">
          <strong>${(priceCents / 100).toFixed(2)}</strong>
          {selectedProduct.compareAtPrice ? <del>${selectedProduct.compareAtPrice.toFixed(2)}</del> : null}
        </div>
      </div>
      <p className="product-description">Select the kit and fit you want. The product photo updates as you choose.</p>
      <fieldset>
        <legend>Kit</legend>
        <div className={`option-grid ${variants.length > 2 ? "three" : "two"}`}>
          {variants.map((variant) => (
            <button className={selectedProduct.id === variant.id ? "selected" : ""} type="button" onClick={() => setSelectedId(variant.id)} key={variant.id}>
              <b>{variant.kit}</b><span>{variant.season}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Fit</legend>
        <div className="option-grid two">
          <button className={version === "Fan" ? "selected" : ""} type="button" onClick={() => setVersion("Fan")}><b>Fan $35</b><span>Relaxed everyday fit</span></button>
          <button className={version === "Player" ? "selected" : ""} type="button" onClick={() => setVersion("Player")}><b>Player $55</b><span>Athletic match fit</span></button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Size</legend>
        <div className="size-grid">
          {selectedProduct.sizes.map((productSize) => (
            <button className={size === productSize ? "selected" : ""} type="button" onClick={() => setSize(productSize)} key={productSize}>{productSize}</button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Optional personalization</legend>
        <div className="personalization-grid">
          <label>Name
            <input maxLength={14} value={playerName} onChange={(event) => setPlayerName(event.target.value.toUpperCase())} placeholder="MESSI" />
          </label>
          <label>Number
            <input maxLength={2} inputMode="numeric" value={number} onChange={(event) => setNumber(event.target.value.replace(/\D/g, ""))} placeholder="10" />
          </label>
        </div>
      </fieldset>
      <label className="quantity-field">Quantity
        <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
          {[1, 2, 3, 4, 5].map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <button className="add-to-bag" type="button" onClick={addToBag}>Add to bag — ${((priceCents * quantity) / 100).toFixed(2)}</button>
      <div className="purchase-benefits"><span>✓ Secure Stripe checkout</span><span>✓ Free U.S. shipping on $100+</span><span>✓ Order tracking in your account</span></div>
      <div className="product-accordions">
        <details open>
          <summary>Fan vs. Player</summary>
          <p><b>Fan</b> has a relaxed everyday fit. <b>Player</b> is slimmer with a performance-style cut.</p>
        </details>
        <details>
          <summary>Shipping & delivery</summary>
          <p>Orders include tracking. Personalized jerseys may require additional processing time.</p>
        </details>
        <details>
          <summary>Jersey care</summary>
          <p>Wash cold, inside out, and air dry. Avoid bleach, fabric softener, and high heat.</p>
        </details>
      </div>
      </div>
    </section>
  );
}
