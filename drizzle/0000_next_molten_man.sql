CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`order_number` text NOT NULL,
	`email` text NOT NULL,
	`stripe_session_id` text,
	`status` text DEFAULT 'awaiting_payment' NOT NULL,
	`total_cents` integer NOT NULL,
	`currency` text DEFAULT 'usd' NOT NULL,
	`items_json` text NOT NULL,
	`tracking_number` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_number_unique` ON `orders` (`order_number`);--> statement-breakpoint
CREATE INDEX `orders_email_idx` ON `orders` (`email`);--> statement-breakpoint
CREATE INDEX `orders_number_idx` ON `orders` (`order_number`);