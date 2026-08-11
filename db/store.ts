import { getRuntimeEnv } from "../lib/runtime-env";

export type StoredOrder = {
  order_number: string;
  email: string;
  status: string;
  total_cents: number;
  currency: string;
  items_json: string;
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
};

async function database() {
  const env = await getRuntimeEnv();
  if (!env.DB) throw new Error("Order database is not configured.");
  return env.DB;
}

export async function ensureOrderSchema() {
  const db = await database();
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      stripe_session_id TEXT,
      status TEXT NOT NULL DEFAULT 'awaiting_payment',
      total_cents INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'usd',
      items_json TEXT NOT NULL,
      tracking_number TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS orders_email_idx ON orders(email)"),
    db.prepare("CREATE INDEX IF NOT EXISTS orders_number_idx ON orders(order_number)"),
  ]);
}

export async function createPendingOrder(input: {
  id: string;
  orderNumber: string;
  email: string;
  totalCents: number;
  itemsJson: string;
}) {
  await ensureOrderSchema();
  const now = new Date().toISOString();
  await (await database()).prepare(`INSERT INTO orders
    (id, order_number, email, status, total_cents, currency, items_json, created_at, updated_at)
    VALUES (?, ?, ?, 'awaiting_payment', ?, 'usd', ?, ?, ?)`)
    .bind(input.id, input.orderNumber, input.email.toLowerCase(), input.totalCents, input.itemsJson, now, now)
    .run();
}

export async function deletePendingOrder(orderNumber: string) {
  await ensureOrderSchema();
  await (await database()).prepare("DELETE FROM orders WHERE order_number = ? AND status = 'awaiting_payment'")
    .bind(orderNumber).run();
}

export async function attachStripeSession(orderNumber: string, sessionId: string) {
  await ensureOrderSchema();
  await (await database()).prepare("UPDATE orders SET stripe_session_id = ?, updated_at = ? WHERE order_number = ?")
    .bind(sessionId, new Date().toISOString(), orderNumber).run();
}

export async function markOrderPaid(orderNumber: string, sessionId: string, totalCents: number) {
  await ensureOrderSchema();
  await (await database()).prepare(`UPDATE orders SET status = 'paid', stripe_session_id = ?, total_cents = ?, updated_at = ? WHERE order_number = ?`)
    .bind(sessionId, totalCents, new Date().toISOString(), orderNumber).run();
}

export async function findOrder(orderNumber: string, email: string): Promise<StoredOrder | null> {
  await ensureOrderSchema();
  return (await database()).prepare(`SELECT order_number, email, status, total_cents, currency, items_json,
      tracking_number, created_at, updated_at FROM orders WHERE order_number = ? AND email = ? LIMIT 1`)
    .bind(orderNumber.toUpperCase(), email.toLowerCase()).first<StoredOrder>();
}

export async function getOrderForFulfillment(orderNumber: string): Promise<StoredOrder | null> {
  await ensureOrderSchema();
  return (await database()).prepare(`SELECT order_number, email, status, total_cents, currency, items_json,
      tracking_number, created_at, updated_at FROM orders WHERE order_number = ? LIMIT 1`)
    .bind(orderNumber).first<StoredOrder>();
}
