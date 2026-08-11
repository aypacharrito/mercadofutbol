# Mercado Fútbol v4

A Vercel-ready soccer jersey storefront built with Next.js 16. The design uses the strong product photography, generous spacing, category navigation, and product-option patterns common to leading sports retailers while keeping Mercado Fútbol's own black, cream, green, and lime identity.

## Included now

- Home page, search, category pages, product pages, cart drawer, and full cart page
- Club, national team, retro, kids, new-release, and sale categories
- Fan and Player versions, sizes, quantities, custom name, and custom number
- Server-validated Stripe Checkout with free shipping over $100
- Stripe webhook that saves paid orders and triggers supplier fulfillment
- Clerk customer accounts with a private order-history page
- Neon Postgres order database and Drizzle migration
- WhatsApp Business Platform supplier template integration
- Meta and TikTok pixels plus catalog-feed endpoints
- Shipping, returns, privacy, and terms pages
- SEO metadata, sitemap, robots file, and per-product social images
- Responsive desktop and mobile layout
- One approved real jersey image plus polished placeholders for the remaining photos

## First: upload this folder to GitHub

If you downloaded the ZIP, unzip it. In the `aypacharrito/mercadofutbol` repository, remove the old project files and upload **the contents inside this folder** so `package.json` is at the repository root. Commit the upload to `main`.

Do not upload `node_modules`, `.next`, or a real `.env` file.

## Vercel setup (do this only after GitHub is updated)

Import the GitHub repository into Vercel as a Next.js project. Set the following Environment Variables for Production, Preview, and Development:

```text
NEXT_PUBLIC_APP_URL=https://mercadofutbol.shop
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/account
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/account
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
SUPPLIER_WHATSAPP_NUMBER=
WHATSAPP_TEMPLATE_NAME=mercado_futbol_supplier_order
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
```

Use test keys first. Never put secret keys in variables beginning with `NEXT_PUBLIC_`.

### Database

Create a Neon Postgres integration in Vercel Marketplace so `DATABASE_URL` is injected. Then run:

```bash
npm install
npm run db:migrate
```

### Stripe

Add a Stripe webhook endpoint pointing to:

```text
https://mercadofutbol.shop/api/stripe-webhook
```

Subscribe it to `checkout.session.completed` and `checkout.session.async_payment_succeeded`, then copy its signing secret into `STRIPE_WEBHOOK_SECRET`.

### WhatsApp supplier fulfillment

The supplier may keep regular WhatsApp, but Mercado Fútbol must send through a Meta WhatsApp Business Platform number. Create an approved template named `mercado_futbol_supplier_order` with three body variables:

```text
New paid order: {{1}}
Items: {{2}}
Total: {{3}}
```

The webhook formats the items as version, size, number, and name—the same information shown in the supplied example.

### Meta, Instagram, and TikTok shops

After real product photos and accurate inventory are loaded, use these public feeds:

```text
https://mercadofutbol.shop/api/feeds/meta
https://mercadofutbol.shop/api/feeds/tiktok
```

Facebook and Instagram share Meta Commerce Manager. TikTok Shop is configured separately. Account approval, domain verification, product eligibility, inventory accuracy, and permission to sell branded merchandise remain the store owner's responsibility.

## Local checks

```bash
npm install
npm test
npm run lint
npm run build
```

Copy `.env.example` to `.env.local` only for local development and fill in test credentials.
