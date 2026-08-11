"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function CartPageClient() {
  const { count, subtotalCents, setIsOpen } = useCart();
  return (
    <main className="simple-page">
      <p className="eyebrow">YOUR BAG</p>
      <h1>{count ? `${count} item${count === 1 ? "" : "s"} ready` : "Your bag is empty"}</h1>
      <p>{count ? `Current subtotal: $${(subtotalCents / 100).toFixed(2)} USD` : "Explore the latest club, country, retro, and kids styles."}</p>
      <div className="simple-actions">
        {count ? <button className="button-primary" type="button" onClick={() => setIsOpen(true)}>Review bag and checkout</button> : null}
        <Link className="button-secondary" href="/category/new">Continue shopping</Link>
      </div>
    </main>
  );
}
