import { catalogProducts } from "@/lib/catalog";

export const collectionDefinitions = [
  { slug: "world-cup", label: "World Cup 2026", shortLabel: "World Cup", league: "National Teams", description: "The biggest national teams headed to 2026." },
  { slug: "liga-mx", label: "Liga MX", shortLabel: "Liga MX", league: "Liga MX", description: "América, Chivas, and Mexico's biggest clubs." },
  { slug: "la-liga", label: "La Liga", shortLabel: "La Liga", league: "La Liga", description: "Spain's iconic clubs and newest releases." },
  { slug: "premier-league", label: "Premier League", shortLabel: "Premier League", league: "Premier League", description: "England's biggest clubs, home and away." },
  { slug: "mls", label: "MLS", shortLabel: "MLS", league: "MLS", description: "The latest shirts from across Major League Soccer." },
  { slug: "serie-a", label: "Serie A", shortLabel: "Serie A", league: "Serie A", description: "Milan, Inter, and Italy's modern classics." },
  { slug: "bundesliga", label: "Bundesliga", shortLabel: "Bundesliga", league: "Bundesliga", description: "Germany's leading clubs and newest kits." },
  { slug: "ligue-1", label: "Ligue 1", shortLabel: "Ligue 1", league: "Ligue 1", description: "France's standout teams and current drops." },
] as const;

export type CollectionSlug = (typeof collectionDefinitions)[number]["slug"];

export function getCollection(slug: string) {
  return collectionDefinitions.find((collection) => collection.slug === slug);
}

export function productsForCollection(slug: string) {
  const collection = getCollection(slug);
  return collection ? catalogProducts.filter((product) => product.league === collection.league) : [];
}
