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
  brand: string;
  price: number;
  compareAtPrice?: number;
  categories: CategorySlug[];
  sizes: string[];
  badge: string;
  tone: string;
  accent: string;
  kit: "Home" | "Away" | "Third";
  image?: string;
  playerImage?: string;
  description: string;
  season: string;
  featured?: boolean;
};

const adultSizes = ["S", "M", "L", "XL", "2XL"];
export const FAN_PRICE = 35;
export const PLAYER_PRICE = 55;
export const RETRO_PRICE = 45;

const clubPrice = FAN_PRICE;
const nationalPrice = FAN_PRICE;

type Listing = Omit<Product, "id" | "slug" | "name" | "sizes" | "categories" | "price" | "description" | "season" | "brand"> & {
  id: string;
  kit: "Home" | "Away" | "Third";
  kind: "club" | "national";
  season?: string;
  featured?: boolean;
  brand?: string;
};

const brandByClub: Record<string, string> = {
  Mexico: "adidas", USA: "Nike", Argentina: "adidas", Brazil: "Nike", Spain: "adidas", England: "Nike",
  France: "Nike", Germany: "adidas", Portugal: "PUMA", Netherlands: "Nike", "Real Madrid": "adidas",
  "FC Barcelona": "Nike", Arsenal: "adidas", "Manchester City": "PUMA", "Manchester United": "adidas",
  Chelsea: "Nike", "Paris Saint-Germain": "Nike", "Bayern Munich": "adidas", "Borussia Dortmund": "PUMA",
  "AC Milan": "PUMA", "Inter Milan": "Nike", "Club América": "adidas", Chivas: "PUMA", "Inter Miami": "adidas",
  "LA Galaxy": "adidas", LAFC: "adidas",
};

function listing({ id, club, kit, league, badge, tone, accent, image, playerImage, kind, season, featured, brand }: Listing): Product {
  const isNational = kind === "national";
  const imageFile = image?.split("/").at(-1);
  const playerCatalogImage = imageFile ? `/products-player/${imageFile}` : playerImage;
  return {
    id: `mf-${id}`,
    slug: `${id}-jersey`,
    club,
    brand: brand ?? brandByClub[club] ?? "Teamwear",
    name: `${club} ${kit}`,
    league,
    price: isNational ? nationalPrice : clubPrice,
    categories: ["new", isNational ? "national-teams" : "clubs"],
    sizes: adultSizes,
    badge,
    tone,
    accent,
    kit,
    image,
    playerImage: playerCatalogImage,
    description: `${club} ${kit.toLowerCase()} jersey in Fan and Player versions, with optional name and number personalization.`,
    season: season ?? (isNational ? "2026" : "2026/27"),
    featured,
  };
}

type ExpandedFamily = {
  club: string;
  league: string;
  badge: string;
  brand: string;
  kind: "club" | "national";
  tone: string;
  accent: string;
};

const expandedFamilies: readonly ExpandedFamily[] = [
  { club: "Italy", league: "National Teams", badge: "ITA", brand: "adidas", kind: "national", tone: "#1769a4", accent: "#ffffff" },
  { club: "Japan", league: "National Teams", badge: "JPN", brand: "adidas", kind: "national", tone: "#17408b", accent: "#e13a3e" },
  { club: "Colombia", league: "National Teams", badge: "COL", brand: "adidas", kind: "national", tone: "#f3cf3b", accent: "#123d82" },
  { club: "Belgium", league: "National Teams", badge: "BEL", brand: "adidas", kind: "national", tone: "#b11f2e", accent: "#f3c63f" },
  { club: "Uruguay", league: "National Teams", badge: "URU", brand: "Nike", kind: "national", tone: "#78c4e5", accent: "#111111" },
  { club: "Nigeria", league: "National Teams", badge: "NGA", brand: "Nike", kind: "national", tone: "#16835f", accent: "#ffffff" },
  { club: "Croatia", league: "National Teams", badge: "CRO", brand: "Nike", kind: "national", tone: "#ffffff", accent: "#d22b36" },
  { club: "South Korea", league: "National Teams", badge: "KOR", brand: "Nike", kind: "national", tone: "#e94555", accent: "#1a2c63" },
  { club: "Canada", league: "National Teams", badge: "CAN", brand: "Nike", kind: "national", tone: "#cf1f2c", accent: "#ffffff" },
  { club: "Morocco", league: "National Teams", badge: "MAR", brand: "PUMA", kind: "national", tone: "#b2182b", accent: "#17804d" },
  { club: "Senegal", league: "National Teams", badge: "SEN", brand: "PUMA", kind: "national", tone: "#ffffff", accent: "#17804d" },
  { club: "Switzerland", league: "National Teams", badge: "SUI", brand: "PUMA", kind: "national", tone: "#d32632", accent: "#ffffff" },
  { club: "Austria", league: "National Teams", badge: "AUT", brand: "PUMA", kind: "national", tone: "#d5252f", accent: "#ffffff" },
  { club: "South Africa", league: "National Teams", badge: "RSA", brand: "adidas", kind: "national", tone: "#e7b91c", accent: "#16804d" },
  { club: "Liverpool", league: "Premier League", badge: "LFC", brand: "adidas", kind: "club", tone: "#8b1b2b", accent: "#ffffff" },
  { club: "Tottenham", league: "Premier League", badge: "THFC", brand: "Nike", kind: "club", tone: "#f4f4f0", accent: "#172a52" },
  { club: "Newcastle United", league: "Premier League", badge: "NUFC", brand: "adidas", kind: "club", tone: "#111111", accent: "#ffffff" },
  { club: "Aston Villa", league: "Premier League", badge: "AVFC", brand: "adidas", kind: "club", tone: "#7b1736", accent: "#78b9dc" },
  { club: "Atletico Madrid", league: "La Liga", badge: "ATM", brand: "Nike", kind: "club", tone: "#c71d2f", accent: "#ffffff" },
  { club: "Girona", league: "La Liga", badge: "GIR", brand: "PUMA", kind: "club", tone: "#d9212e", accent: "#ffffff" },
  { club: "Juventus", league: "Serie A", badge: "JUV", brand: "adidas", kind: "club", tone: "#f3f3ef", accent: "#e998ad" },
  { club: "Roma", league: "Serie A", badge: "ROM", brand: "adidas", kind: "club", tone: "#8c162a", accent: "#e3a42d" },
  { club: "RB Leipzig", league: "Bundesliga", badge: "RBL", brand: "PUMA", kind: "club", tone: "#f4f4f1", accent: "#d6253f" },
  { club: "Bayer Leverkusen", league: "Bundesliga", badge: "B04", brand: "New Balance", kind: "club", tone: "#cf172c", accent: "#111111" },
  { club: "Marseille", league: "Ligue 1", badge: "OM", brand: "PUMA", kind: "club", tone: "#f3f3ef", accent: "#49a9d8" },
  { club: "Lyon", league: "Ligue 1", badge: "OL", brand: "adidas", kind: "club", tone: "#f3f3ef", accent: "#234a9a" },
  { club: "Tigres", league: "Liga MX", badge: "TIG", brand: "adidas", kind: "club", tone: "#f2cc2f", accent: "#1a3c7c" },
  { club: "Pumas UNAM", league: "Liga MX", badge: "PUM", brand: "PUMA", kind: "club", tone: "#f1eee1", accent: "#b69a51" },
  { club: "Monterrey", league: "Liga MX", badge: "MTY", brand: "PUMA", kind: "club", tone: "#17396f", accent: "#ffffff" },
  { club: "Cruz Azul", league: "Liga MX", badge: "CAZ", brand: "Pirma", kind: "club", tone: "#1960a8", accent: "#ffffff" },
  { club: "Toluca", league: "Liga MX", badge: "TOL", brand: "New Balance", kind: "club", tone: "#c91d32", accent: "#ffffff" },
  { club: "Atlanta United", league: "MLS", badge: "ATL", brand: "adidas", kind: "club", tone: "#151515", accent: "#c49b50" },
  { club: "New York City FC", league: "MLS", badge: "NYC", brand: "adidas", kind: "club", tone: "#72bde3", accent: "#ffffff" },
  { club: "San Diego FC", league: "MLS", badge: "SDFC", brand: "adidas", kind: "club", tone: "#1c5a55", accent: "#72d8ce" },
  { club: "Austin FC", league: "MLS", badge: "ATX", brand: "adidas", kind: "club", tone: "#151515", accent: "#69be28" },
  { club: "Seattle Sounders", league: "MLS", badge: "SEA", brand: "adidas", kind: "club", tone: "#1b4e85", accent: "#78be20" },
  { club: "Ajax", league: "Global Clubs", badge: "AJX", brand: "adidas", kind: "club", tone: "#ffffff", accent: "#d7222f" },
  { club: "Benfica", league: "Global Clubs", badge: "SLB", brand: "adidas", kind: "club", tone: "#cf1f2b", accent: "#ffffff" },
  { club: "Boca Juniors", league: "Global Clubs", badge: "BOC", brand: "adidas", kind: "club", tone: "#173d85", accent: "#f0cc2f" },
  { club: "River Plate", league: "Global Clubs", badge: "RIV", brand: "adidas", kind: "club", tone: "#ffffff", accent: "#d5212e" },
  { club: "Flamengo", league: "Global Clubs", badge: "FLA", brand: "adidas", kind: "club", tone: "#b5172d", accent: "#111111" },
  { club: "Palmeiras", league: "Global Clubs", badge: "PAL", brand: "PUMA", kind: "club", tone: "#176b45", accent: "#ffffff" },
  { club: "Corinthians", league: "Global Clubs", badge: "COR", brand: "Nike", kind: "club", tone: "#f2f2ef", accent: "#111111" },
  { club: "Al Hilal", league: "Global Clubs", badge: "HIL", brand: "PUMA", kind: "club", tone: "#1752a4", accent: "#ffffff" },
];

function catalogSlug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function expandFamily(family: ExpandedFamily): Product[] {
  const year = family.kind === "national" ? "2026" : "2027";
  const base = catalogSlug(family.club);
  return (["Home", "Away"] as const).map((kit) => listing({
    id: `${base}-${kit.toLowerCase()}-${year}`,
    club: family.club,
    kit,
    league: family.league,
    badge: family.badge,
    brand: family.brand,
    tone: kit === "Home" ? family.tone : family.accent,
    accent: kit === "Home" ? family.accent : family.tone,
    image: `/products-catalog/${base}-${kit.toLowerCase()}-2027.webp`,
    kind: family.kind,
  }));
}

export const products: Product[] = [
  // World Cup 2026 national teams
  listing({ id: "mexico-home-2026", club: "Mexico", kit: "Home", league: "National Teams", badge: "MX", tone: "#07583a", accent: "#d8b976", image: "/products-studio/mexico-home-2026.webp", playerImage: "/products-studio/mexico-home-2026-player.webp", kind: "national", featured: true }),
  listing({ id: "mexico-away-2026", club: "Mexico", kit: "Away", league: "National Teams", badge: "MX", tone: "#f3f3ef", accent: "#0b5b3f", image: "/products-studio/mexico-away-2026.webp", kind: "national" }),
  listing({ id: "usa-home-2026", club: "USA", kit: "Home", league: "National Teams", badge: "USA", tone: "#f4f4f4", accent: "#1b3f8b", image: "/products-studio/usa-home-2026.webp", kind: "national", featured: true }),
  listing({ id: "usa-away-2026", club: "USA", kit: "Away", league: "National Teams", badge: "USA", tone: "#173c7c", accent: "#ef3340", image: "/products/yupoo-914c88bfc7.webp", kind: "national" }),
  listing({ id: "argentina-home-2026", club: "Argentina", kit: "Home", league: "National Teams", badge: "ARG", tone: "#83c7e8", accent: "#ffffff", image: "/products-studio/argentina-home-2026.webp", kind: "national", featured: true }),
  listing({ id: "argentina-away-2026", club: "Argentina", kit: "Away", league: "National Teams", badge: "ARG", tone: "#26365d", accent: "#83c7e8", image: "/products/yupoo-14a37a1fd9.webp", kind: "national" }),
  listing({ id: "brazil-home-2026", club: "Brazil", kit: "Home", league: "National Teams", badge: "BRA", tone: "#f4d13f", accent: "#176a3a", image: "/products-studio/brazil-home-2026.webp", kind: "national", featured: true }),
  listing({ id: "brazil-away-2026", club: "Brazil", kit: "Away", league: "National Teams", badge: "BRA", tone: "#1151a3", accent: "#f4d13f", image: "/products/yupoo-5885dff7.webp", kind: "national" }),
  listing({ id: "spain-home-2026", club: "Spain", kit: "Home", league: "National Teams", badge: "ESP", tone: "#c8192e", accent: "#f3c546", image: "/products/yupoo-13cbc43514.webp", kind: "national" }),
  listing({ id: "spain-away-2026", club: "Spain", kit: "Away", league: "National Teams", badge: "ESP", tone: "#eef2ef", accent: "#c8192e", image: "/products/yupoo-bdb24d18a1.webp", kind: "national" }),
  listing({ id: "england-home-2026", club: "England", kit: "Home", league: "National Teams", badge: "ENG", tone: "#f5f5f2", accent: "#233c78", image: "/products/yupoo-42495c80.webp", kind: "national" }),
  listing({ id: "england-away-2026", club: "England", kit: "Away", league: "National Teams", badge: "ENG", tone: "#c9323f", accent: "#233c78", image: "/products/yupoo-18fb5d15.webp", kind: "national" }),
  listing({ id: "france-home-2026", club: "France", kit: "Home", league: "National Teams", badge: "FRA", tone: "#183b79", accent: "#d6bd78", image: "/products/yupoo-0d0ab9f635.webp", kind: "national" }),
  listing({ id: "france-away-2026", club: "France", kit: "Away", league: "National Teams", badge: "FRA", tone: "#f4f4f4", accent: "#183b79", image: "/products/yupoo-2e132f58.webp", kind: "national" }),
  listing({ id: "germany-home-2026", club: "Germany", kit: "Home", league: "National Teams", badge: "GER", tone: "#f1f1ee", accent: "#1d1d1d", image: "/products/yupoo-1749f9df.webp", kind: "national" }),
  listing({ id: "germany-away-2026", club: "Germany", kit: "Away", league: "National Teams", badge: "GER", tone: "#263526", accent: "#f1f1ee", image: "/products/yupoo-955b15a4.webp", kind: "national" }),
  listing({ id: "portugal-home-2026", club: "Portugal", kit: "Home", league: "National Teams", badge: "POR", tone: "#b7192c", accent: "#166b45", image: "/products-catalog/portugal-home-2027.webp", kind: "national" }),
  listing({ id: "portugal-away-2026", club: "Portugal", kit: "Away", league: "National Teams", badge: "POR", tone: "#f2efe4", accent: "#b7192c", image: "/products-catalog/portugal-away-2027.webp", kind: "national" }),
  listing({ id: "netherlands-home-2026", club: "Netherlands", kit: "Home", league: "National Teams", badge: "NED", tone: "#ef7622", accent: "#1d1d1d", image: "/products/yupoo-0a2d2057.webp", kind: "national" }),
  listing({ id: "netherlands-away-2026", club: "Netherlands", kit: "Away", league: "National Teams", badge: "NED", tone: "#173a78", accent: "#ef7622", image: "/products/yupoo-947e0f22.webp", kind: "national" }),

  // Main 2026/27 club releases
  listing({ id: "real-madrid-home-2027", club: "Real Madrid", kit: "Home", league: "La Liga", badge: "RM", tone: "#f5f2e9", accent: "#c8b078", image: "/products-studio/real-madrid-home-2027.webp", playerImage: "/products-studio/real-madrid-home-2027-player.webp", kind: "club", featured: true }),
  listing({ id: "real-madrid-away-2027", club: "Real Madrid", kit: "Away", league: "La Liga", badge: "RM", tone: "#202f50", accent: "#d6bd78", image: "/products-studio/real-madrid-away-2027.webp", playerImage: "/products-studio/real-madrid-away-2027-player.webp", kind: "club" }),
  listing({ id: "barcelona-home-2027", club: "FC Barcelona", kit: "Home", league: "La Liga", badge: "FCB", tone: "#173a78", accent: "#9d173d", image: "/products-studio/barcelona-home-2027.webp", kind: "club", featured: true }),
  listing({ id: "barcelona-away-2027", club: "FC Barcelona", kit: "Away", league: "La Liga", badge: "FCB", tone: "#f0e7cf", accent: "#173a78", image: "/products/yupoo-effe3eb610.webp", kind: "club" }),
  listing({ id: "arsenal-home-2027", club: "Arsenal", kit: "Home", league: "Premier League", badge: "AFC", tone: "#d71920", accent: "#ffffff", image: "/products-studio/arsenal-home-2027.webp", kind: "club", featured: true }),
  listing({ id: "arsenal-away-2027", club: "Arsenal", kit: "Away", league: "Premier League", badge: "AFC", tone: "#202624", accent: "#ef3f4b", image: "/products/yupoo-e2567ce864.webp", kind: "club" }),
  listing({ id: "manchester-city-home-2027", club: "Manchester City", kit: "Home", league: "Premier League", badge: "MC", tone: "#76bce3", accent: "#ffffff", image: "/products/yupoo-b6c31fe9.webp", kind: "club" }),
  listing({ id: "manchester-city-away-2027", club: "Manchester City", kit: "Away", league: "Premier League", badge: "MC", tone: "#151515", accent: "#76bce3", image: "/products/yupoo-56ebe9aa2b.webp", kind: "club" }),
  listing({ id: "manchester-united-home-2027", club: "Manchester United", kit: "Home", league: "Premier League", badge: "MU", tone: "#c70101", accent: "#ffffff", image: "/products/yupoo-aaa63632.webp", kind: "club" }),
  listing({ id: "manchester-united-away-2027", club: "Manchester United", kit: "Away", league: "Premier League", badge: "MU", tone: "#f0f0ec", accent: "#c70101", image: "/products/yupoo-f304ebe1.webp", kind: "club" }),
  listing({ id: "chelsea-home-2027", club: "Chelsea", kit: "Home", league: "Premier League", badge: "CFC", tone: "#034694", accent: "#ffffff", image: "/products/yupoo-595eeb8988.webp", kind: "club" }),
  listing({ id: "chelsea-away-2027", club: "Chelsea", kit: "Away", league: "Premier League", badge: "CFC", tone: "#111111", accent: "#d8b24c", image: "/products-studio/chelsea-away-2027.webp", playerImage: "/products-studio/chelsea-away-2027-player.webp", kind: "club" }),
  listing({ id: "chelsea-third-2027", club: "Chelsea", kit: "Third", league: "Premier League", badge: "CFC", tone: "#1d1d1d", accent: "#034694", image: "/products/yupoo-c8d7219715.webp", kind: "club" }),
  listing({ id: "psg-home-2027", club: "Paris Saint-Germain", kit: "Home", league: "Ligue 1", badge: "PSG", tone: "#15244b", accent: "#d71920", image: "/products/yupoo-0b2bcf27a0.webp", kind: "club" }),
  listing({ id: "psg-away-2027", club: "Paris Saint-Germain", kit: "Away", league: "Ligue 1", badge: "PSG", tone: "#f1f1ee", accent: "#15244b", image: "/products/yupoo-9ff89360bc.webp", kind: "club" }),
  listing({ id: "bayern-home-2027", club: "Bayern Munich", kit: "Home", league: "Bundesliga", badge: "FCB", tone: "#d71920", accent: "#ffffff", image: "/products/yupoo-51f3e5d8.webp", kind: "club" }),
  listing({ id: "bayern-away-2027", club: "Bayern Munich", kit: "Away", league: "Bundesliga", badge: "FCB", tone: "#f0eee6", accent: "#d71920", image: "/products/yupoo-6a0eda8969.webp", kind: "club" }),
  listing({ id: "dortmund-home-2027", club: "Borussia Dortmund", kit: "Home", league: "Bundesliga", badge: "BVB", tone: "#fdeb00", accent: "#111111", image: "/products/yupoo-e20ffa86.webp", kind: "club" }),
  listing({ id: "dortmund-away-2027", club: "Borussia Dortmund", kit: "Away", league: "Bundesliga", badge: "BVB", tone: "#111111", accent: "#fdeb00", image: "/products/yupoo-747495c7f1.webp", kind: "club" }),
  listing({ id: "ac-milan-home-2027", club: "AC Milan", kit: "Home", league: "Serie A", badge: "ACM", tone: "#b3132b", accent: "#171717", image: "/products/yupoo-fa20335181.webp", kind: "club" }),
  listing({ id: "ac-milan-away-2027", club: "AC Milan", kit: "Away", league: "Serie A", badge: "ACM", tone: "#efefe9", accent: "#b3132b", image: "/products/yupoo-bd47a78254.webp", kind: "club" }),
  listing({ id: "inter-milan-home-2027", club: "Inter Milan", kit: "Home", league: "Serie A", badge: "INT", tone: "#1f4c9c", accent: "#111111", image: "/products/yupoo-2437ab8bfc.webp", kind: "club" }),
  listing({ id: "inter-milan-away-2027", club: "Inter Milan", kit: "Away", league: "Serie A", badge: "INT", tone: "#f3f3ef", accent: "#1f4c9c", image: "/products/yupoo-9a5b81916f.webp", kind: "club" }),
  listing({ id: "club-america-home-2027", club: "Club América", kit: "Home", league: "Liga MX", badge: "AME", tone: "#f2df4a", accent: "#1f3b78", image: "/products-studio/club-america-home-2027.webp", kind: "club", featured: true }),
  listing({ id: "club-america-away-2027", club: "Club América", kit: "Away", league: "Liga MX", badge: "AME", tone: "#1f3b78", accent: "#f2df4a", image: "/products/yupoo-cc0005bf83.webp", kind: "club" }),
  listing({ id: "chivas-home-2027", club: "Chivas", kit: "Home", league: "Liga MX", badge: "CHI", tone: "#d2212b", accent: "#ffffff", image: "/products-studio/chivas-home-2027.webp", kind: "club", featured: true }),
  listing({ id: "chivas-away-2027", club: "Chivas", kit: "Away", league: "Liga MX", badge: "CHI", tone: "#193868", accent: "#d2212b", image: "/products/yupoo-81d299021d.webp", kind: "club" }),
  listing({ id: "inter-miami-home-2027", club: "Inter Miami", kit: "Home", league: "MLS", badge: "MIA", tone: "#f5a9c4", accent: "#111111", image: "/products-studio/inter-miami-home-2027.webp", kind: "club" }),
  listing({ id: "inter-miami-away-2027", club: "Inter Miami", kit: "Away", league: "MLS", badge: "MIA", tone: "#161616", accent: "#f4a9c5", image: "/products/yupoo-270751ad77.webp", kind: "club" }),
  listing({ id: "la-galaxy-home-2027", club: "LA Galaxy", kit: "Home", league: "MLS", badge: "LAG", tone: "#f4f4ef", accent: "#1e4b91", image: "/products/yupoo-9df382bf.webp", kind: "club" }),
  listing({ id: "la-galaxy-away-2027", club: "LA Galaxy", kit: "Away", league: "MLS", badge: "LAG", tone: "#41206d", accent: "#f4b246", image: "/products-studio/la-galaxy-away-2027.webp", kind: "club" }),
  listing({ id: "lafc-home-2027", club: "LAFC", kit: "Home", league: "MLS", badge: "LAFC", tone: "#151515", accent: "#c8a95c", image: "/products/yupoo-9e271046.webp", kind: "club" }),
  listing({ id: "lafc-away-2027", club: "LAFC", kit: "Away", league: "MLS", badge: "LAFC", tone: "#f4f1e8", accent: "#c8a95c", image: "/products-studio/lafc-away-2027.webp", kind: "club" }),
  ...expandedFamilies.flatMap(expandFamily),
];

export const productMap = new Map(products.map((product) => [product.id, product]));

const kitOrder = { Home: 0, Away: 1, Third: 2 } as const;

export function productFamilyKey(product: Product) {
  return `${product.club}::${product.season}`;
}

export function getProductVariants(product: Product) {
  const family = productFamilyKey(product);
  return products
    .filter((item) => productFamilyKey(item) === family)
    .sort((a, b) => kitOrder[a.kit] - kitOrder[b.kit]);
}

export const catalogProducts = products.filter((product, index) => (
  products.findIndex((item) => productFamilyKey(item) === productFamilyKey(product)) === index
));

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
  return catalogProducts.filter((product) => product.categories.includes(slug));
}

export function itemPriceCents(product: Product, version: "Fan" | "Player") {
  if (version === "Player") return PLAYER_PRICE * 100;
  if (product.categories.includes("retro")) return RETRO_PRICE * 100;
  return FAN_PRICE * 100;
}
