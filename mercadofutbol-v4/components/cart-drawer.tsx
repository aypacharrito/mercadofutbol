"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { trackCommerceEvent } from "@/lib/analytics";
import { useCart } from "@/components/cart-provider";

export function CartDrawer() {
  const { items, count, subtotalCents, isOpen, setIsOpen, removeItem, updateQuantity } = useCart();
  const { user } = useUser();
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const email = enteredEmail ?? user?.primaryEmailAddress?.emailAddress ?? "";

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  async function checkout() {
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email for your receipt.");
      return;
    }
    if (!items.length) return;
    setLoading(true);
    trackCommerceEvent("InitiateCheckout", { value: subtotalCents / 100 });
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: items.map((item) => ({
            id: item.productId,
            version: item.version,
            size: item.size,
            number: item.number,
            playerName: item.playerName,
            quantity: item.quantity,
          })),
        }),
      });
      const result = await response.json() as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error ?? "Checkout could not be started.");
      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout could not be started.");
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onMouseDown={() => setIsOpen(false)}>
      <aside className="cart-drawer" aria-label="Shopping bag" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div><span>YOUR BAG</span><h2>Bag ({count})</h2></div>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close bag">×</button>
        </div>
        <div className="drawer-items">
          {items.length ? items.map((item) => (
            <article className="drawer-item" key={item.cartId}>
              <div className="drawer-thumb" style={{ background: item.tone }}>
                {item.image ? <Image src={item.image} alt="" fill sizes="92px" /> : <span>{item.badge}</span>}
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.version} · Size {item.size}</p>
                <p>{item.playerName || item.number ? `#${item.number || "—"} ${item.playerName || "No name"}` : "No personalization"}</p>
                <label>Qty
                  <select value={item.quantity} onChange={(event) => updateQuantity(item.cartId, Number(event.target.value))}>
                    {[1, 2, 3, 4, 5].map((quantity) => <option key={quantity}>{quantity}</option>)}
                  </select>
                </label>
              </div>
              <div className="drawer-item-price">
                <strong>${((item.priceCents * item.quantity) / 100).toFixed(2)}</strong>
                <button type="button" onClick={() => removeItem(item.cartId)}>Remove</button>
              </div>
            </article>
          )) : (
            <div className="empty-bag">
              <span>MF</span>
              <h3>Your bag is empty.</h3>
              <p>Find a jersey and make it yours.</p>
              <Link href="/category/new" onClick={() => setIsOpen(false)}>Shop new releases</Link>
            </div>
          )}
        </div>
        {items.length ? (
          <div className="drawer-checkout">
            <div className="subtotal"><span>Subtotal</span><strong>${(subtotalCents / 100).toFixed(2)} USD</strong></div>
            <p>{subtotalCents >= 10000 ? "You unlocked free U.S. shipping." : `$${((10000 - subtotalCents) / 100).toFixed(2)} away from free shipping.`}</p>
            <label>Email for receipt and order access
              <input type="email" value={email} onChange={(event) => setEnteredEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button className="checkout-button" type="button" onClick={checkout} disabled={loading}>
              {loading ? "Opening secure checkout…" : "Secure checkout"}
            </button>
            <small>Payment is processed securely by Stripe. Orders reach the supplier only after payment confirmation.</small>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
