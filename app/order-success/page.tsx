"use client";

import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const params = useSearchParams();
  const order = params.get("order") ?? "Your order";
  return <main className="success-page">
    <div className="success-card">
      <span className="success-check">✓</span>
      <p className="eyebrow">PAYMENT RECEIVED</p>
      <h1>Thank you for your order.</h1>
      <p>Your Mercado Fútbol order number is <strong>{order}</strong>. Save it with the email used at checkout to view your status and tracking.</p>
      <a className="primary" href={`/?orders=${encodeURIComponent(order)}`}>View My Orders <span>→</span></a>
    </div>
  </main>;
}
