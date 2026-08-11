CREATE TABLE IF NOT EXISTS "orders" (
  "id" text PRIMARY KEY NOT NULL,
  "order_number" text NOT NULL,
  "clerk_user_id" text,
  "email" text NOT NULL,
  "stripe_session_id" text,
  "status" text DEFAULT 'awaiting_payment' NOT NULL,
  "total_cents" integer NOT NULL,
  "currency" text DEFAULT 'usd' NOT NULL,
  "items_json" text NOT NULL,
  "shipping_name" text,
  "shipping_address_json" text,
  "tracking_number" text,
  "supplier_notification_status" text DEFAULT 'pending' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "orders_number_unique" ON "orders" USING btree ("order_number");
CREATE UNIQUE INDEX IF NOT EXISTS "orders_stripe_session_unique" ON "orders" USING btree ("stripe_session_id");
CREATE INDEX IF NOT EXISTS "orders_user_idx" ON "orders" USING btree ("clerk_user_id");
CREATE INDEX IF NOT EXISTS "orders_email_idx" ON "orders" USING btree ("email");
