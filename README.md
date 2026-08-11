# Mercado Fútbol

Full-stack soccer jersey storefront for `mercadofutbol.shop`.

## Included

- Responsive jersey catalog with Fan and Player versions
- Size, name, and number personalization
- Server-calculated Stripe Checkout Sessions
- Stripe webhook signature verification
- Durable Cloudflare D1 order records
- Customer **My Orders** lookup with status and tracking
- Order-success page
- WhatsApp Business Platform supplier notification hook
- Meta Pixel and TikTok Pixel hooks
- JSON product catalog endpoint at `/api/catalog`
- Product-image folder at `public/products`

## Product photos

Add finished jersey photos to `public/products`. Use square JPG or WebP files at least 1200 × 1200 pixels and preferably under 1.5 MB. Then add the matching path to the product in `lib/catalog.ts`:

```ts
image: "/products/inter-miami-away-2025.jpg"
```

Until a product has an `image` value, the site displays its temporary jersey illustration.

## Private configuration

Copy `.env.example` to a local `.env` for development. Store real values only in your hosting provider's secret/environment settings. Never paste real Stripe or WhatsApp credentials into GitHub.

Required for checkout:

- `STRIPE_RESTRICTED_KEY`
- `STRIPE_WEBHOOK_SECRET`

Required later for automatic supplier messages:

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `SUPPLIER_WHATSAPP_NUMBER`
- `WHATSAPP_TEMPLATE_NAME`

Optional analytics:

- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID`

Stripe's webhook endpoint is `/api/stripe-webhook`. Subscribe it to `checkout.session.completed`.

## Local development

Requirements: Node.js 22.13 or later.

```bash
npm ci
npm run dev
```

Generate a D1 migration after database schema changes:

```bash
npm run db:generate
```

## Important launch notes

- Prices are verified on the server from `lib/catalog.ts`; the browser cannot choose its own price.
- Stripe and WhatsApp secrets must remain server-side.
- Stripe webhook signatures are verified before an order is marked paid.
- Sales tax is not automatically enabled. Configure tax registrations before enabling automatic collection.
