import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { listOrdersForUser } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const orders = await listOrdersForUser(userId);
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Order database is not configured." }, { status: 503 });
  }
}
