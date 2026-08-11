import { index, integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull(),
  clerkUserId: text("clerk_user_id"),
  email: text("email").notNull(),
  stripeSessionId: text("stripe_session_id"),
  status: text("status").notNull().default("awaiting_payment"),
  totalCents: integer("total_cents").notNull(),
  currency: text("currency").notNull().default("usd"),
  itemsJson: text("items_json").notNull(),
  shippingName: text("shipping_name"),
  shippingAddressJson: text("shipping_address_json"),
  trackingNumber: text("tracking_number"),
  supplierNotificationStatus: text("supplier_notification_status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("orders_number_unique").on(table.orderNumber),
  uniqueIndex("orders_stripe_session_unique").on(table.stripeSessionId),
  index("orders_user_idx").on(table.clerkUserId),
  index("orders_email_idx").on(table.email),
]);
