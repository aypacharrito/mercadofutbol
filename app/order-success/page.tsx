import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccessClient } from "@/components/order-success-client";

export const metadata: Metadata = { title: "Order Confirmed", robots: { index: false, follow: false } };

export default function OrderSuccessPage() {
  return <Suspense fallback={<main className="success-page"><p>Loading your order…</p></main>}><OrderSuccessClient /></Suspense>;
}
