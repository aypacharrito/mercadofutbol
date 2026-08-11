"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track?: (event: string, data?: Record<string, unknown>) => void };
  }
}

export function trackCommerceEvent(
  event: "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase",
  data: { value: number; contentId?: string; contentName?: string; currency?: string },
) {
  const payload = {
    value: data.value,
    currency: data.currency ?? "USD",
    content_ids: data.contentId ? [data.contentId] : undefined,
    content_name: data.contentName,
  };
  window.fbq?.("track", event, payload);
  const tiktokEvent = event === "ViewContent" ? "ViewContent" : event;
  window.ttq?.track?.(tiktokEvent, payload);
}
