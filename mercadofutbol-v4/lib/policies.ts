export const policies = {
  shipping: {
    title: "Shipping Policy",
    updated: "August 10, 2026",
    sections: [
      ["Processing", "Orders are reviewed after successful payment. Personalized jerseys may require additional handling time before shipment."],
      ["U.S. shipping", "Standard U.S. shipping is free when the merchandise subtotal is $100 or more. Orders below $100 are charged the rate shown at Stripe Checkout."],
      ["Tracking", "Tracking information appears in My Orders when it becomes available."],
      ["Address accuracy", "Customers are responsible for entering a complete and accurate shipping address at checkout."],
    ],
  },
  returns: {
    title: "Returns Policy",
    updated: "August 10, 2026",
    sections: [
      ["Standard items", "Unworn, unused, non-personalized items may be eligible for return within 14 days of delivery. Contact support before returning anything."],
      ["Personalized items", "Items printed with a custom name or number are final sale unless the item arrives damaged or the customization does not match the confirmed order."],
      ["Problems with an order", "Contact support@mercadofutbol.shop with your order number and clear photos of the issue."],
      ["Condition", "Returned products must include their original tags and packaging."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "August 10, 2026",
    sections: [
      ["Information collected", "We collect account details, contact information, order selections, shipping details, and payment status needed to process and support purchases."],
      ["Payments", "Payment card information is handled by Stripe and is not stored by Mercado Fútbol."],
      ["Fulfillment", "Order details needed to produce and ship a jersey may be shared with the supplier and delivery providers."],
      ["Analytics", "When configured, Meta and TikTok pixels may collect website event data for measurement and advertising."],
      ["Contact", "Questions can be sent to support@mercadofutbol.shop."],
    ],
  },
  terms: {
    title: "Terms of Sale",
    updated: "August 10, 2026",
    sections: [
      ["Orders", "An order is accepted after payment confirmation. We may cancel and refund an order that cannot be fulfilled."],
      ["Product information", "Colors may vary by screen. Product photographs and descriptions should be reviewed before purchase."],
      ["Personalization", "Customers are responsible for spelling, capitalization, and number selections submitted with an order."],
      ["Brand rights", "Third-party team and brand names remain the property of their respective owners. Mercado Fútbol must maintain any permissions required to sell branded merchandise."],
      ["Contact", "Questions about these terms can be sent to support@mercadofutbol.shop."],
    ],
  },
} as const;
