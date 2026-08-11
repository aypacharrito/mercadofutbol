import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  email: text("email").notNull(),
  stripeSessionId: text("stripe_session_id"),
  status: text("status").notNull().default("awaiting_payment"),
  totalCents: integer("total_cents").notNull(),
  currency: text("currency").notNull().default("usd"),
  itemsJson: text("items_json").notNull(),
  trackingNumber: text("tracking_number"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  index("orders_email_idx").on(table.email),
  index("orders_number_idx").on(table.orderNumber),
]);
