"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { itemPriceCents } from "@/lib/catalog";
import { trackCommerceEvent } from "@/lib/analytics";
import { useCart } from "@/components/cart-provider";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [version, setVersion] = useState<"Fan" | "Player">("Fan");
  const [size, setSize] = useState(product.sizes[0]);
  const [playerName, setPlayerName] = useState("");
  const [number, setNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const priceCents = useMemo(() => itemPriceCents(product, version), [product, version]);

  useEffect(() => {
    trackCommerceEvent("ViewContent", {
      value: product.price,
      contentId: product.id,
      contentName: product.name,
    });
  }, [product.id, product.name, product.price]);

  function addToBag() {
    addItem({
      productId: product.id,
      slug: product.slug,
      club: product.club,
      name: product.name,
      priceCents,
      version,
      size,
      number,
      playerName,
      quantity,
      image: product.image,
      tone: product.tone,
      accent: product.accent,
      badge: product.badge,
    });
  }

  return (
    <div className="purchase-panel">
      <div className="purchase-heading">
        <p>{product.league} · {product.season}</p>
        <h1>{product.name}</h1>
        <span>{product.club}</span>
        <div className="product-page-price">
          <strong>${(priceCents / 100).toFixed(2)}</strong>
          {product.compareAtPrice ? <del>${product.compareAtPrice.toFixed(2)}</del> : null}
        </div>
      </div>
      <p className="product-description">{product.description}</p>
      <fieldset>
        <legend>Version</legend>
        <div className="option-grid two">
          <button className={version === "Fan" ? "selected" : ""} type="button" onClick={() => setVersion("Fan")}><b>Fan</b><span>Relaxed everyday fit</span></button>
          <button className={version === "Player" ? "selected" : ""} type="button" onClick={() => setVersion("Player")}><b>Player +$15</b><span>Athletic match fit</span></button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Size</legend>
        <div className="size-grid">
          {product.sizes.map((productSize) => (
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
    </div>
  );
}
