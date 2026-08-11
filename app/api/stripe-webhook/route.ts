import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { claimSupplierNotification, finishSupplierNotification, getOrderByNumber, markOrderPaid, type OrderLine } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { notifySupplier } from "@/lib/whatsapp";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderNumber = session.metadata?.order_number;
    if (orderNumber) {
      const shipping = session.collected_information?.shipping_details;
      await markOrderPaid({
        orderNumber,
        stripeSessionId: session.id,
        totalCents: session.amount_total ?? 0,
        shippingName: shipping?.name,
        shippingAddress: shipping?.address,
      });
      const order = await getOrderByNumber(orderNumber);
      if (order && await claimSupplierNotification(orderNumber)) {
        try {
          const notification = await notifySupplier({
            orderNumber,
            totalCents: order.totalCents,
            items: JSON.parse(order.itemsJson) as OrderLine[],
          });
          await finishSupplierNotification(orderNumber, notification.sent);
          if (!notification.sent) throw new Error("Supplier WhatsApp notification was not accepted.");
        } catch (notificationError) {
          await finishSupplierNotification(orderNumber, false);
          throw notificationError;
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
