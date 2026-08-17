import type { OrderLine } from "@/lib/db";

export async function notifySupplier(input: {
  orderNumber: string;
  totalCents: number;
  items: OrderLine[];
}) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const supplier = process.env.SUPPLIER_WHATSAPP_NUMBER;
  const template = process.env.WHATSAPP_TEMPLATE_NAME;

  if (!token || !phoneId || !supplier || !template) {
    return { sent: false, reason: "WhatsApp is not configured." };
  }

  const summary = input.items
    .map((item) => {
      const custom = item.playerName || item.number
        ? `; Number: ${item.number || "none"}; name: ${item.playerName || "none"}`
        : "; Number: none; name: none";
      return `${item.quantity}x ${item.name}; ${item.version.toLowerCase()} version; size: ${item.size}${custom}`;
    })
    .join(" | ")
    .slice(0, 900);

  const response = await fetch(`https://graph.facebook.com/v23.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: supplier,
      type: "template",
      template: {
        name: template,
        language: { code: "en_US" },
        components: [{
          type: "body",
          parameters: [
            { type: "text", text: input.orderNumber },
            { type: "text", text: summary },
            { type: "text", text: `$${(input.totalCents / 100).toFixed(2)} USD` },
          ],
        }],
      },
    }),
  });

  return { sent: response.ok, status: response.status };
}
