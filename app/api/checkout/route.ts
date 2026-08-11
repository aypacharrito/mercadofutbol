import { NextRequest, NextResponse } from "next/server";
import { createPendingOrder, deletePendingOrder, attachStripeSession } from "../../../db/store";
import { CheckoutItemInput, getProduct, itemPriceCents } from "../../../lib/catalog";
import { getRuntimeEnv } from "../../../lib/runtime-env";

export const runtime = "edge";

const sizes = new Set(["S", "M", "L", "XL", "2XL"]);

function orderNumber() {
  return `MF-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const env = await getRuntimeEnv();
    const stripeKey = env.STRIPE_RESTRICTED_KEY;
    if (!stripeKey) return NextResponse.json({ error: "Secure checkout is being connected. Please try again soon." }, { status: 503 });

    const body = await request.json() as { email?: string; items?: CheckoutItemInput[] };
    const email = body.email?.trim().toLowerCase() ?? "";
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 12) {
      return NextResponse.json({ error: "Your bag is empty or too large." }, { status: 400 });
    }

    const normalized = body.items.map((item) => {
      const product = getProduct(Number(item.id));
      const version = item.version === "Player" ? "Player" : "Fan";
      if (!product || !sizes.has(item.size)) throw new Error("Invalid product selection.");
      return {
        id: product.id,
        club: product.club,
        name: product.name,
        version,
        size: item.size,
        number: String(item.number ?? "").replace(/\D/g, "").slice(0, 2),
        playerName: String(item.playerName ?? "").trim().toUpperCase().slice(0, 14),
        unitAmount: itemPriceCents(product, version),
      };
    });
    const totalCents = normalized.reduce((sum, item) => sum + item.unitAmount, 0);
    const number = orderNumber();
    const id = crypto.randomUUID();
    await createPendingOrder({ id, orderNumber: number, email, totalCents, itemsJson: JSON.stringify(normalized) });

    const origin = new URL(request.url).origin;
    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("customer_email", email);
    params.set("success_url", `${origin}/order-success?order=${encodeURIComponent(number)}&session_id={CHECKOUT_SESSION_ID}`);
    params.set("cancel_url", `${origin}/?checkout=cancelled`);
    params.set("phone_number_collection[enabled]", "true");
    params.set("shipping_address_collection[allowed_countries][0]", "US");
    params.set("metadata[order_number]", number);
    params.set("integration_identifier", "mercado-futbol-hqzptmna");
    normalized.forEach((item, index) => {
      const personalization = item.playerName || item.number ? ` — #${item.number || "—"} ${item.playerName || ""}` : "";
      params.set(`line_items[${index}][price_data][currency]`, "usd");
      params.set(`line_items[${index}][price_data][unit_amount]`, String(item.unitAmount));
      params.set(`line_items[${index}][price_data][product_data][name]`, `${item.name} — ${item.version}, ${item.size}${personalization}`);
      params.set(`line_items[${index}][quantity]`, "1");
    });

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${stripeKey}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const session = await stripeResponse.json() as { id?: string; url?: string; error?: { message?: string } };
    if (!stripeResponse.ok || !session.id || !session.url) {
      await deletePendingOrder(number);
      return NextResponse.json({ error: session.error?.message ?? "Checkout could not be started." }, { status: 502 });
    }
    await attachStripeSession(number, session.id);
    return NextResponse.json({ url: session.url, orderNumber: number });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout could not be started.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
