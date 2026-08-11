import { NextRequest, NextResponse } from "next/server";
import { getOrderForFulfillment, markOrderPaid } from "../../../db/store";
import { getRuntimeEnv } from "../../../lib/runtime-env";

export const runtime = "edge";

function hex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function verifySignature(payload: string, signatureHeader: string, secret: string) {
  const parts = signatureHeader.split(",").map((part) => part.split("="));
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${payload}`)));
  return signatures.some((signature) => safeEqual(signature, digest));
}

async function notifySupplier(orderNumber: string) {
  const env = await getRuntimeEnv();
  const token = env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = env.WHATSAPP_PHONE_NUMBER_ID;
  const supplier = env.SUPPLIER_WHATSAPP_NUMBER;
  const template = env.WHATSAPP_TEMPLATE_NAME;
  if (!token || !phoneId || !supplier || !template) return;
  const order = await getOrderForFulfillment(orderNumber);
  if (!order) return;
  const items = JSON.parse(order.items_json) as Array<{ name: string; version: string; size: string; number: string; playerName: string }>;
  const summary = items.map((item) => `${item.name}; ${item.version.toLowerCase()} version; size: ${item.size}; Number: ${item.number || "none"}; name: ${item.playerName || "none"}`).join(" | ").slice(0, 900);
  await fetch(`https://graph.facebook.com/v23.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: supplier,
      type: "template",
      template: {
        name: template,
        language: { code: "en_US" },
        components: [{ type: "body", parameters: [
          { type: "text", text: orderNumber },
          { type: "text", text: summary },
          { type: "text", text: `$${(order.total_cents / 100).toFixed(2)} USD` },
        ] }],
      },
    }),
  });
}

export async function POST(request: NextRequest) {
  const env = await getRuntimeEnv();
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";
  if (!(await verifySignature(payload, signature, webhookSecret))) return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  const event = JSON.parse(payload) as { type: string; data: { object: { id: string; amount_total?: number; metadata?: { order_number?: string } } } };
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderNumber = session.metadata?.order_number;
    if (orderNumber) {
      await markOrderPaid(orderNumber, session.id, session.amount_total ?? 0);
      await notifySupplier(orderNumber);
    }
  }
  return NextResponse.json({ received: true });
}
