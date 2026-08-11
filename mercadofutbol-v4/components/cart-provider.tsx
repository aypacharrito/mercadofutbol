"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { trackCommerceEvent } from "@/lib/analytics";

export type CartItem = {
  cartId: string;
  productId: string;
  slug: string;
  club: string;
  name: string;
  priceCents: number;
  version: "Fan" | "Player";
  size: string;
  number: string;
  playerName: string;
  quantity: number;
  image?: string;
  tone: string;
  accent: string;
  badge: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  addItem: (item: Omit<CartItem, "cartId">) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "mercado-futbol-cart-v4";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      } finally {
        setLoaded(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, loaded]);

  const addItem = useCallback((item: Omit<CartItem, "cartId">) => {
    setItems((current) => [...current, { ...item, cartId: crypto.randomUUID() }]);
    trackCommerceEvent("AddToCart", {
      value: item.priceCents / 100,
      contentId: item.productId,
      contentName: item.name,
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((current) => current.filter((item) => item.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    setItems((current) => current.map((item) => item.cartId === cartId
      ? { ...item, quantity: Math.max(1, Math.min(5, quantity)) }
      : item));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotalCents = items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
  const value = useMemo(() => ({
    items,
    count,
    subtotalCents,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }), [items, count, subtotalCents, isOpen, addItem, removeItem, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider.");
  return context;
}
