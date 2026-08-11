import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { orders as ordersTable } from "@/db/schema";
import { listOrdersForUser, type OrderLine } from "@/lib/db";

export const metadata: Metadata = { title: "My Orders" };
export const dynamic = "force-dynamic";

function statusLabel(status: string) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function AccountPage() {
  const [{ userId }, user] = await Promise.all([auth(), currentUser()]);
  if (!userId) redirect("/sign-in?redirect_url=/account");

  let orders: (typeof ordersTable.$inferSelect)[] = [];
  let setupError = false;
  try {
    orders = await listOrdersForUser(userId);
  } catch {
    setupError = true;
  }

  return (
    <main className="account-page section-shell">
      <div className="account-heading">
        <div><p className="eyebrow">CUSTOMER ACCOUNT</p><h1>My Orders</h1><p>Welcome back{user?.firstName ? `, ${user.firstName}` : ""}. View payment, fulfillment, and tracking status here.</p></div>
      </div>
      {setupError ? (
        <div className="account-notice"><h2>Order tracking is ready for database connection.</h2><p>Connect Neon in Vercel and run the included migration to activate this page.</p></div>
      ) : orders.length ? (
        <div className="order-list">
          {orders.map((order) => {
            const items = JSON.parse(order.itemsJson) as OrderLine[];
            return (
              <article className="order-card" key={order.id}>
                <div className="order-card-head"><div><span>ORDER</span><strong>{order.orderNumber}</strong></div><div><span>PLACED</span><strong>{new Date(order.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}</strong></div><div><span>TOTAL</span><strong>${(order.totalCents / 100).toFixed(2)}</strong></div><b className={`status status-${order.status}`}>{statusLabel(order.status)}</b></div>
                <ul>{items.map((item, index) => <li key={`${item.id}-${index}`}><div><strong>{item.quantity}× {item.name}</strong><span>{item.version} · Size {item.size}{item.playerName || item.number ? ` · #${item.number || "—"} ${item.playerName}` : ""}</span></div><b>${((item.unitAmount * item.quantity) / 100).toFixed(2)}</b></li>)}</ul>
                <div className="tracking-row"><span>Tracking</span><strong>{order.trackingNumber ?? "Not shipped yet"}</strong></div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="account-empty"><h2>No orders yet.</h2><p>Your paid Mercado Fútbol orders will appear here.</p><Link className="button-primary" href="/category/new">Shop new releases</Link></div>
      )}
    </main>
  );
}
