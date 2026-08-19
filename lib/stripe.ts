import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  if (process.env.VERCEL_ENV === "production" && key.startsWith("sk_test_")) {
    throw new Error("Production checkout is configured with a Stripe test key. Replace STRIPE_SECRET_KEY with the live key in Vercel and redeploy.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    });
  }
  return stripeClient;
}
