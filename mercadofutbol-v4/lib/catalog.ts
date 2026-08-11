export const categoryDefinitions = [
  { slug: "new", label: "New Releases", shortLabel: "New" },
  { slug: "clubs", label: "Club Jerseys", shortLabel: "Clubs" },
  { slug: "national-teams", label: "National Teams", shortLabel: "National Teams" },
  { slug: "retro", label: "Retro Jerseys", shortLabel: "Retro" },
  { slug: "kids", label: "Kids", shortLabel: "Kids" },
  { slug: "sale", label: "Sale", shortLabel: "Sale" },
] as const;

export type CategorySlug = (typeof categoryDefinitions)[number]["slug"];

export type Product = {
  id: string;
  slug: string;
  club: string;
  name: string;
  league: string;
  price: number;
  compareAtPrice?: number;
  categories: CategorySlug[];
  sizes: string[];
  badge: string;
  tone: string;
  accent: string;
  image?: string;
  description: string;
  season: string;
  featured?: boolean;
};

const adultSizes = ["S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  {
    id: "mf-rm-green-26",
    slug: "real-madrid-forest-green-2026",
    club: "Real Madrid",
    name: "Forest Green 2026",
    league: "La Liga",
    price: 79.99,
    categories: ["new", "clubs"],
    sizes: adultSizes,
    badge: "RM",
    tone: "#123d32",
    accent: "#efe8d9",
    image: "/products/real-madrid-green-fan-player.webp",
    description: "A deep forest-green match look offered in Fan and Player cuts, with optional name and number personalization.",
    season: "2025/26",
    featured: true,
  },
  {
    id: "mf-im-away-25",
    slug: "inter-miami-away-2025",
    club: "Inter Miami",
    name: "Miami Away",
    league: "MLS",
    price: 74.99,
    categories: ["new", "clubs"],
    sizes: adultSizes,
    badge: "MIA",
    tone: "#161616",
    accent: "#f4a9c5",
    description: "A black-and-pink away look with Fan and Player options.",
    season: "2024/25",
    featured: true,
  },
  {
    id: "mf-barca-home-26",
    slug: "barcelona-home-2026",
    club: "FC Barcelona",
    name: "Barcelona Home",
    league: "La Liga",
    price: 79.99,
    categories: ["new", "clubs"],
    sizes: adultSizes,
    badge: "FCB",
    tone: "#173a78",
    accent: "#9d173d",
    description: "Classic home colors in an everyday Fan fit or athletic Player cut.",
    season: "2025/26",
    featured: true,
  },
  {
    id: "mf-arg-home-26",
    slug: "argentina-home-2026",
    club: "Argentina",
    name: "Argentina Home",
    league: "National Teams",
    price: 69.99,
    categories: ["new", "national-teams"],
    sizes: adultSizes,
    badge: "ARG",
    tone: "#83c7e8",
    accent: "#ffffff",
    description: "Sky-blue and white national-team styling ready for personalization.",
    season: "2026",
    featured: true,
  },
  {
    id: "mf-mex-home-26",
    slug: "mexico-home-2026",
    club: "Mexico",
    name: "México Home",
    league: "National Teams",
    price: 69.99,
    categories: ["new", "national-teams"],
    sizes: adultSizes,
    badge: "MX",
    tone: "#07583a",
    accent: "#d8b976",
    description: "A rich green home design offered in Fan and Player versions.",
    season: "2026",
  },
  {
    id: "mf-bra-away-26",
    slug: "brazil-away-2026",
    club: "Brazil",
    name: "Brazil Away",
    league: "National Teams",
    price: 69.99,
    categories: ["national-teams"],
    sizes: adultSizes,
    badge: "BRA",
    tone: "#1151a3",
    accent: "#f4d13f",
    description: "Blue away colors with a lightweight match-inspired finish.",
    season: "2026",
  },
  {
    id: "mf-mc-home-26",
    slug: "manchester-city-home-2026",
    club: "Manchester City",
    name: "City Home",
    league: "Premier League",
    price: 74.99,
    categories: ["clubs"],
    sizes: adultSizes,
    badge: "MC",
    tone: "#76bce3",
    accent: "#ffffff",
    description: "Sky-blue club colors in Fan and Player constructions.",
    season: "2025/26",
  },
  {
    id: "mf-ars-away-26",
    slug: "arsenal-away-2026",
    club: "Arsenal",
    name: "Arsenal Away",
    league: "Premier League",
    price: 74.99,
    categories: ["clubs", "sale"],
    sizes: adultSizes,
    badge: "AFC",
    tone: "#202624",
    accent: "#ef3f4b",
    compareAtPrice: 84.99,
    description: "A dark away look with red accents and optional personalization.",
    season: "2025/26",
  },
  {
    id: "mf-acm-retro-07",
    slug: "ac-milan-retro-2007",
    club: "AC Milan",
    name: "Milan Retro",
    league: "Serie A",
    price: 84.99,
    categories: ["clubs", "retro"],
    sizes: adultSizes,
    badge: "ACM",
    tone: "#b3132b",
    accent: "#171717",
    description: "A throwback red-and-black design inspired by a legendary European season.",
    season: "2006/07",
  },
  {
    id: "mf-mex-retro-98",
    slug: "mexico-retro-1998",
    club: "Mexico",
    name: "México Retro",
    league: "National Teams",
    price: 84.99,
    categories: ["national-teams", "retro"],
    sizes: adultSizes,
    badge: "MX",
    tone: "#0a6a45",
    accent: "#e4d39f",
    description: "A bold archival-style national-team design for collectors.",
    season: "1998",
  },
  {
    id: "mf-rm-kids-26",
    slug: "real-madrid-home-kids-2026",
    club: "Real Madrid",
    name: "Madrid Home Kids",
    league: "La Liga",
    price: 59.99,
    categories: ["clubs", "kids"],
    sizes: ["YS", "YM", "YL", "YXL"],
    badge: "RM",
    tone: "#f5f2e9",
    accent: "#c8b078",
    description: "A youth-sized home look with optional name and number.",
    season: "2025/26",
  },
  {
    id: "mf-arg-kids-26",
    slug: "argentina-home-kids-2026",
    club: "Argentina",
    name: "Argentina Home Kids",
    league: "National Teams",
    price: 54.99,
    compareAtPrice: 64.99,
    categories: ["national-teams", "kids", "sale"],
    sizes: ["YS", "YM", "YL", "YXL"],
    badge: "ARG",
    tone: "#83c7e8",
    accent: "#ffffff",
    description: "Youth national-team colors in a comfortable Fan construction.",
    season: "2026",
  },
];

export const productMap = new Map(products.map((product) => [product.id, product]));

export function getProductById(id: string) {
  return productMap.get(id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export function productsForCategory(slug: CategorySlug) {
  return products.filter((product) => product.categories.includes(slug));
}

export function itemPriceCents(product: Product, version: "Fan" | "Player") {
  return Math.round(product.price * 100) + (version === "Player" ? 1500 : 0);
}
