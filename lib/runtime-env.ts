export type MercadoRuntimeEnv = {
  DB?: D1Database;
  STRIPE_RESTRICTED_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  WHATSAPP_ACCESS_TOKEN?: string;
  WHATSAPP_PHONE_NUMBER_ID?: string;
  SUPPLIER_WHATSAPP_NUMBER?: string;
  WHATSAPP_TEMPLATE_NAME?: string;
};

export async function getRuntimeEnv(): Promise<MercadoRuntimeEnv> {
  const workers = await import("cloudflare:workers");
  return workers.env as MercadoRuntimeEnv;
}
