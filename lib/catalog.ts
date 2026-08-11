export type Product = {
  id: number;
  club: string;
  name: string;
  league: string;
  price: number;
  accent: string;
  tone: string;
  badge: string;
  image?: string;
};

export type CheckoutItemInput = {
  id: number;
  version: "Fan" | "Player";
  size: string;
  number?: string;
  playerName?: string;
};

export const products: Product[] = [
  { id: 1, club: "Inter Miami", name: "Miami Away 24/25", league: "MLS", price: 74.99, accent: "#f5a8c4", tone: "#171717", badge: "IM" },
  { id: 2, club: "Real Madrid", name: "Madrid Home 25/26", league: "La Liga", price: 79.99, accent: "#d9c8ff", tone: "#f5f3ed", badge: "RM" },
  { id: 3, club: "FC Barcelona", name: "Barcelona Home 25/26", league: "La Liga", price: 79.99, accent: "#e6be38", tone: "#143a77", badge: "FCB" },
  { id: 4, club: "México", name: "México Home 2026", league: "Selecciones", price: 69.99, accent: "#e8d09d", tone: "#0b5b3d", badge: "MX" },
  { id: 5, club: "Argentina", name: "Argentina Home 2026", league: "Selecciones", price: 69.99, accent: "#ffffff", tone: "#77bfe2", badge: "ARG" },
  { id: 6, club: "Manchester City", name: "City Home 25/26", league: "Premier League", price: 74.99, accent: "#ffffff", tone: "#76bce3", badge: "MC" },
];

export function getProduct(id: number) {
  return products.find((product) => product.id === id);
}

export function itemPriceCents(product: Product, version: "Fan" | "Player") {
  return Math.round(product.price * 100) + (version === "Player" ? 1500 : 0);
}
