import { NextRequest, NextResponse } from "next/server";
import { findOrder } from "../../../db/store";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const email = params.get("email")?.trim().toLowerCase() ?? "";
  const orderNumber = params.get("order")?.trim().toUpperCase() ?? "";
  if (!email || !orderNumber) return NextResponse.json({ error: "Email and order number are required." }, { status: 400 });
  const order = await findOrder(orderNumber, email);
  if (!order) return NextResponse.json({ error: "We could not find an order matching those details." }, { status: 404 });
  return NextResponse.json({
    orderNumber: order.order_number,
    status: order.status,
    total: order.total_cents / 100,
    currency: order.currency,
    items: JSON.parse(order.items_json),
    trackingNumber: order.tracking_number,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
  });
}
