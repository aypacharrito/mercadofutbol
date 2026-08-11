import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { attachStripeSession, createPendingOrder, deletePendingOrder, type OrderLine } from "@/lib/db";
import { getProductById, itemPriceCents } from "@/lib/catalog";
import { getStripe } from "@/lib/stripe";

type CheckoutItemInput = {
  id?: string;
  version?: string;
  size?: string;
  number?: string;
  playerName?: string;
  quantity?: number;
};

const emailPattern = /^\S+@\S+\.\S+$/;

function newOrderNumber() {
  return `MF-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const [{ userId }, user, body] = await Promise.all([
      auth(),
      currentUser(),
      request.json() as Promise<{ email?: string; items?: CheckoutItemInput[] }>,
    ]);

    const accountEmail = user?.primaryEmailAddress?.emailAddress;
    const email = (accountEmail ?? body.email ?? "").trim().toLowerCase();
    if (!emailPattern.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 12) {
      return NextResponse.json({ error: "Your bag is empty or contains too many line items." }, { status: 400 });
    }

    const items: OrderLine[] = body.items.map((input) => {
      const product = getProductById(String(input.id ?? ""));
      const version = input.version === "Player" ? "Player" : "Fan";
      const quantity = Math.max(1, Math.min(5, Number(input.quantity) || 1));
      if (!product || !product.sizes.includes(String(input.size ?? ""))) throw new Error("Invalid product or size selection.");
      return {
        id: product.id,
        name: product.name,
        club: product.club,
        version,
        size: String(input.size),
        number: String(input.number ?? "").replace(/\D/g, "").slice(0, 2),
        playerName: String(input.playerName ?? "").trim().toUpperCase().slice(0, 14),
        unitAmount: itemPriceCents(product, version),
        quantity,
      };
    });

    const subtotalCents = items.reduce((total, item) => total + item.unitAmount * item.quantity, 0);
    const shippingCents = subtotalCents >= 10000 ? 0 : 899;
    const orderNumber = newOrderNumber();
    const orderId = crypto.randomUUID();

    await createPendingOrder({
      id: orderId,
      orderNumber,
      clerkUserId: userId,
      email,
      totalCents: subtotalCents + shippingCents,
      items,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    try {
      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        customer_email: email,
        client_reference_id: userId ?? undefined,
        line_items: items.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: "usd",
            unit_amount: item.unitAmount,
            product_data: {
              name: `${item.club} — ${item.name}`,
              description: `${item.version} · Size ${item.size}${item.playerName || item.number ? ` · #${item.number || "—"} ${item.playerName}` : ""}`,
              metadata: { product_id: item.id },
            },
          },
        })),
        phone_number_collection: { enabled: true },
        shipping_address_collection: { allowed_countries: ["US"] },
        shipping_options: [{
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCents, currency: "usd" },
            display_name: shippingCents ? "Standard U.S. shipping" : "Free U.S. shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 12 },
            },
          },
        }],
        metadata: { order_number: orderNumber },
        success_url: `${appUrl}/order-success?order=${encodeURIComponent(orderNumber)}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/cart?checkout=cancelled`,
      });
      if (!session.url) throw new Error("Stripe did not return a checkout URL.");
      await attachStripeSession(orderNumber, session.id);
      return NextResponse.json({ url: session.url, orderNumber });
    } catch (stripeError) {
      await deletePendingOrder(orderNumber);
      throw stripeError;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout could not be started.";
    const status = /configured|DATABASE_URL|STRIPE_SECRET_KEY/.test(message) ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
