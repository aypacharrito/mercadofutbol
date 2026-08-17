"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="success-page">
      <div className="success-icon">✓</div>
      <p className="eyebrow">PAYMENT RECEIVED</p>
      <h1>Your order is in.</h1>
      <p>We’re confirming your jersey details and preparing the supplier order. Save your Mercado Fútbol order number.</p>
      {orderNumber ? <strong className="success-order">{orderNumber}</strong> : null}
      <div className="simple-actions"><Link className="button-primary" href="/account">View My Orders</Link><Link className="button-secondary" href="/">Back to shop</Link></div>
    </main>
  );
}
