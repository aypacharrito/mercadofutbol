"use client";

import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
