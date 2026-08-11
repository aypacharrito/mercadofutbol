"use client";

import { useEffect } from "react";

declare global { interface Window { fbq?: (...args: unknown[]) => void; _fbq?: unknown; ttq?: Record<string, unknown> & { page?: () => void; load?: (id: string) => void } } }

export function SocialPixels() {
  useEffect(() => {
    const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (metaId && !window.fbq) {
      const fbq = function (...args: unknown[]) { (fbq as unknown as { queue: unknown[] }).queue.push(args); } as typeof window.fbq;
      Object.assign(fbq!, { queue: [], loaded: true, version: "2.0" });
      window.fbq = fbq;
      const script = document.createElement("script"); script.async = true; script.src = "https://connect.facebook.net/en_US/fbevents.js"; document.head.appendChild(script);
      window.fbq("init", metaId); window.fbq("track", "PageView");
    }
    const tikTokId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
    if (tikTokId && !window.ttq) {
      const queue: unknown[][] = [];
      window.ttq = { page: () => queue.push(["page"]), load: (id: string) => {
        const script = document.createElement("script"); script.async = true; script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(id)}&lib=ttq`; document.head.appendChild(script);
      } };
      window.ttq.load(tikTokId); window.ttq.page?.();
    }
  }, []);
  return null;
}
