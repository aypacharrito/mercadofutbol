import { neon } from "@neondatabase/serverless";
import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { orders } from "@/db/schema";

function createDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not configured.");
  return drizzle(neon(databaseUrl), { schema: { orders } });
}

let database: ReturnType<typeof createDb> | null = null;

function getDb() {
  if (!database) database = createDb();
  return database;
}

export type OrderLine = {
  id: string;
  name: string;
  club: string;
  version: "Fan" | "Player";
  size: string;
  number: string;
  playerName: string;
  unitAmount: number;
  quantity: number;
};

export async function createPendingOrder(input: {
  id: string;
  orderNumber: string;
  clerkUserId: string | null;
  email: string;
  totalCents: number;
  items: OrderLine[];
}) {
  await getDb().insert(orders).values({
    id: input.id,
    orderNumber: input.orderNumber,
    clerkUserId: input.clerkUserId,
    email: input.email.toLowerCase(),
    totalCents: input.totalCents,
    itemsJson: JSON.stringify(input.items),
  });
}

export async function deletePendingOrder(orderNumber: string) {
  await getDb().delete(orders).where(and(eq(orders.orderNumber, orderNumber), eq(orders.status, "awaiting_payment")));
}

export async function attachStripeSession(orderNumber: string, stripeSessionId: string) {
  await getDb().update(orders).set({ stripeSessionId, updatedAt: new Date() }).where(eq(orders.orderNumber, orderNumber));
}

export async function markOrderPaid(input: {
  orderNumber: string;
  stripeSessionId: string;
  totalCents: number;
  shippingName?: string | null;
  shippingAddress?: unknown;
}) {
  await getDb().update(orders).set({
    status: "paid",
    stripeSessionId: input.stripeSessionId,
    totalCents: input.totalCents,
    shippingName: input.shippingName ?? null,
    shippingAddressJson: input.shippingAddress ? JSON.stringify(input.shippingAddress) : null,
    updatedAt: new Date(),
  }).where(eq(orders.orderNumber, input.orderNumber));
}

export async function getOrderByNumber(orderNumber: string) {
  const rows = await getDb().select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  return rows[0] ?? null;
}

export async function claimSupplierNotification(orderNumber: string) {
  const claimed = await getDb().update(orders).set({
    supplierNotificationStatus: "sending",
    updatedAt: new Date(),
  }).where(and(
    eq(orders.orderNumber, orderNumber),
    eq(orders.status, "paid"),
    eq(orders.supplierNotificationStatus, "pending"),
  )).returning({ orderNumber: orders.orderNumber });
  return claimed.length > 0;
}

export async function finishSupplierNotification(orderNumber: string, sent: boolean) {
  await getDb().update(orders).set({
    supplierNotificationStatus: sent ? "sent" : "pending",
    updatedAt: new Date(),
  }).where(and(
    eq(orders.orderNumber, orderNumber),
    eq(orders.supplierNotificationStatus, "sending"),
  ));
}

export async function listOrdersForUser(clerkUserId: string) {
  return getDb().select().from(orders).where(eq(orders.clerkUserId, clerkUserId)).orderBy(desc(orders.createdAt));
}
