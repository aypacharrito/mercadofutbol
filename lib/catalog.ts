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
const clubPrice = 79.99;
const nationalPrice = 74.99;

type Listing = Omit<Product, "id" | "slug" | "name" | "sizes" | "categories" | "price" | "description" | "season"> & {
  id: string;
  kit: "Home" | "Away" | "Third";
  kind: "club" | "national";
  season?: string;
  featured?: boolean;
};

function listing({ id, club, kit, league, badge, tone, accent, image, kind, season, featured }: Listing): Product {
  const isNational = kind === "national";
  return {
    id: `mf-${id}`,
    slug: `${id}-jersey`,
    club,
    name: `${club} ${kit}`,
    league,
    price: isNational ? nationalPrice : clubPrice,
    categories: ["new", isNational ? "national-teams" : "clubs"],
    sizes: adultSizes,
    badge,
    tone,
    accent,
    image,
    description: `${club} ${kit.toLowerCase()} jersey in Fan and Player versions, with optional name and number personalization.`,
    season: season ?? (isNational ? "2026" : "2026/27"),
    featured,
  };
}

export const products: Product[] = [
  // World Cup 2026 national teams
  listing({ id: "mexico-home-2026", club: "Mexico", kit: "Home", league: "National Teams", badge: "MX", tone: "#07583a", accent: "#d8b976", image: "https://photo.yupoo.com/jerseywholesale888/b52e18393b/small.jpeg", kind: "national", featured: true }),
  listing({ id: "usa-home-2026", club: "USA", kit: "Home", league: "National Teams", badge: "USA", tone: "#f4f4f4", accent: "#1b3f8b", image: "https://photo.yupoo.com/jerseywholesale888/5cd4de5e65/medium.png", kind: "national", featured: true }),
  listing({ id: "usa-away-2026", club: "USA", kit: "Away", league: "National Teams", badge: "USA", tone: "#173c7c", accent: "#ef3340", image: "https://photo.yupoo.com/jerseywholesale888/914c88bfc7/small.jpg", kind: "national" }),
  listing({ id: "argentina-home-2026", club: "Argentina", kit: "Home", league: "National Teams", badge: "ARG", tone: "#83c7e8", accent: "#ffffff", image: "https://photo.yupoo.com/jerseywholesale888/6acae2ac54/small.jpeg", kind: "national", featured: true }),
  listing({ id: "argentina-away-2026", club: "Argentina", kit: "Away", league: "National Teams", badge: "ARG", tone: "#26365d", accent: "#83c7e8", image: "https://photo.yupoo.com/jerseywholesale888/14a37a1fd9/small.jpg", kind: "national" }),
  listing({ id: "brazil-home-2026", club: "Brazil", kit: "Home", league: "National Teams", badge: "BRA", tone: "#f4d13f", accent: "#176a3a", image: "https://photo.yupoo.com/jerseywholesale888/aef4d54f/small.jpg", kind: "national", featured: true }),
  listing({ id: "brazil-away-2026", club: "Brazil", kit: "Away", league: "National Teams", badge: "BRA", tone: "#1151a3", accent: "#f4d13f", image: "https://photo.yupoo.com/jerseywholesale888/5885dff7/small.jpg", kind: "national" }),
  listing({ id: "spain-home-2026", club: "Spain", kit: "Home", league: "National Teams", badge: "ESP", tone: "#c8192e", accent: "#f3c546", image: "https://photo.yupoo.com/jerseywholesale888/13cbc43514/small.jpeg", kind: "national" }),
  listing({ id: "spain-away-2026", club: "Spain", kit: "Away", league: "National Teams", badge: "ESP", tone: "#eef2ef", accent: "#c8192e", image: "https://photo.yupoo.com/jerseywholesale888/bdb24d18a1/small.jpg", kind: "national" }),
  listing({ id: "england-home-2026", club: "England", kit: "Home", league: "National Teams", badge: "ENG", tone: "#f5f5f2", accent: "#233c78", image: "https://photo.yupoo.com/jerseywholesale888/42495c80/small.jpg", kind: "national" }),
  listing({ id: "england-away-2026", club: "England", kit: "Away", league: "National Teams", badge: "ENG", tone: "#c9323f", accent: "#233c78", image: "https://photo.yupoo.com/jerseywholesale888/18fb5d15/small.jpg", kind: "national" }),
  listing({ id: "france-home-2026", club: "France", kit: "Home", league: "National Teams", badge: "FRA", tone: "#183b79", accent: "#d6bd78", image: "https://photo.yupoo.com/jerseywholesale888/0d0ab9f635/small.jpg", kind: "national" }),
  listing({ id: "france-away-2026", club: "France", kit: "Away", league: "National Teams", badge: "FRA", tone: "#f4f4f4", accent: "#183b79", image: "https://photo.yupoo.com/jerseywholesale888/2e132f58/small.jpg", kind: "national" }),
  listing({ id: "germany-home-2026", club: "Germany", kit: "Home", league: "National Teams", badge: "GER", tone: "#f1f1ee", accent: "#1d1d1d", image: "https://photo.yupoo.com/jerseywholesale888/1749f9df/small.jpg", kind: "national" }),
  listing({ id: "germany-away-2026", club: "Germany", kit: "Away", league: "National Teams", badge: "GER", tone: "#263526", accent: "#f1f1ee", image: "https://photo.yupoo.com/jerseywholesale888/955b15a4/small.jpg", kind: "national" }),
  listing({ id: "portugal-home-2026", club: "Portugal", kit: "Home", league: "National Teams", badge: "POR", tone: "#b7192c", accent: "#166b45", image: "https://photo.yupoo.com/jerseywholesale888/5aaecceaed/small.png", kind: "national" }),
  listing({ id: "portugal-away-2026", club: "Portugal", kit: "Away", league: "National Teams", badge: "POR", tone: "#f2efe4", accent: "#b7192c", image: "https://photo.yupoo.com/jerseywholesale888/594f0162/small.jpg", kind: "national" }),
  listing({ id: "netherlands-home-2026", club: "Netherlands", kit: "Home", league: "National Teams", badge: "NED", tone: "#ef7622", accent: "#1d1d1d", image: "https://photo.yupoo.com/jerseywholesale888/0a2d2057/small.jpg", kind: "national" }),
  listing({ id: "netherlands-away-2026", club: "Netherlands", kit: "Away", league: "National Teams", badge: "NED", tone: "#173a78", accent: "#ef7622", image: "https://photo.yupoo.com/jerseywholesale888/947e0f22/small.jpg", kind: "national" }),

  // Main 2026/27 club releases
  listing({ id: "real-madrid-home-2027", club: "Real Madrid", kit: "Home", league: "La Liga", badge: "RM", tone: "#f5f2e9", accent: "#c8b078", image: "https://photo.yupoo.com/jerseywholesale888/cc45530b/small.jpg", kind: "club", featured: true }),
  listing({ id: "real-madrid-away-2027", club: "Real Madrid", kit: "Away", league: "La Liga", badge: "RM", tone: "#202f50", accent: "#d6bd78", image: "https://photo.yupoo.com/jerseywholesale888/0b0a451686/small.jpg", kind: "club" }),
  listing({ id: "barcelona-home-2027", club: "FC Barcelona", kit: "Home", league: "La Liga", badge: "FCB", tone: "#173a78", accent: "#9d173d", image: "https://photo.yupoo.com/jerseywholesale888/b77442be/small.jpg", kind: "club", featured: true }),
  listing({ id: "barcelona-away-2027", club: "FC Barcelona", kit: "Away", league: "La Liga", badge: "FCB", tone: "#f0e7cf", accent: "#173a78", image: "https://photo.yupoo.com/jerseywholesale888/effe3eb610/small.jpg", kind: "club" }),
  listing({ id: "arsenal-home-2027", club: "Arsenal", kit: "Home", league: "Premier League", badge: "AFC", tone: "#d71920", accent: "#ffffff", image: "https://photo.yupoo.com/jerseywholesale888/e1fdb786/small.jpg", kind: "club", featured: true }),
  listing({ id: "arsenal-away-2027", club: "Arsenal", kit: "Away", league: "Premier League", badge: "AFC", tone: "#202624", accent: "#ef3f4b", image: "https://photo.yupoo.com/jerseywholesale888/e2567ce864/small.jpg", kind: "club" }),
  listing({ id: "manchester-city-home-2027", club: "Manchester City", kit: "Home", league: "Premier League", badge: "MC", tone: "#76bce3", accent: "#ffffff", image: "https://photo.yupoo.com/jerseywholesale888/b6c31fe9/small.jpg", kind: "club" }),
  listing({ id: "manchester-city-away-2027", club: "Manchester City", kit: "Away", league: "Premier League", badge: "MC", tone: "#151515", accent: "#76bce3", image: "https://photo.yupoo.com/jerseywholesale888/56ebe9aa2b/small.jpg", kind: "club" }),
  listing({ id: "manchester-united-home-2027", club: "Manchester United", kit: "Home", league: "Premier League", badge: "MU", tone: "#c70101", accent: "#ffffff", image: "https://photo.yupoo.com/jerseywholesale888/aaa63632/small.jpg", kind: "club" }),
  listing({ id: "manchester-united-away-2027", club: "Manchester United", kit: "Away", league: "Premier League", badge: "MU", tone: "#f0f0ec", accent: "#c70101", image: "https://photo.yupoo.com/jerseywholesale888/f304ebe1/small.jpg", kind: "club" }),
  listing({ id: "chelsea-home-2027", club: "Chelsea", kit: "Home", league: "Premier League", badge: "CFC", tone: "#034694", accent: "#ffffff", image: "https://photo.yupoo.com/jerseywholesale888/595eeb8988/small.jpg", kind: "club" }),
  listing({ id: "chelsea-third-2027", club: "Chelsea", kit: "Third", league: "Premier League", badge: "CFC", tone: "#1d1d1d", accent: "#034694", image: "https://photo.yupoo.com/jerseywholesale888/c8d7219715/small.jpg", kind: "club" }),
  listing({ id: "psg-home-2027", club: "Paris Saint-Germain", kit: "Home", league: "Ligue 1", badge: "PSG", tone: "#15244b", accent: "#d71920", image: "https://photo.yupoo.com/jerseywholesale888/0b2bcf27a0/small.jpg", kind: "club" }),
  listing({ id: "psg-away-2027", club: "Paris Saint-Germain", kit: "Away", league: "Ligue 1", badge: "PSG", tone: "#f1f1ee", accent: "#15244b", image: "https://photo.yupoo.com/jerseywholesale888/9ff89360bc/small.jpg", kind: "club" }),
  listing({ id: "bayern-home-2027", club: "Bayern Munich", kit: "Home", league: "Bundesliga", badge: "FCB", tone: "#d71920", accent: "#ffffff", image: "https://photo.yupoo.com/jerseywholesale888/51f3e5d8/small.jpg", kind: "club" }),
  listing({ id: "bayern-away-2027", club: "Bayern Munich", kit: "Away", league: "Bundesliga", badge: "FCB", tone: "#f0eee6", accent: "#d71920", image: "https://photo.yupoo.com/jerseywholesale888/6a0eda8969/small.jpg", kind: "club" }),
  listing({ id: "dortmund-home-2027", club: "Borussia Dortmund", kit: "Home", league: "Bundesliga", badge: "BVB", tone: "#fdeb00", accent: "#111111", image: "https://photo.yupoo.com/jerseywholesale888/e20ffa86/small.jpg", kind: "club" }),
  listing({ id: "dortmund-away-2027", club: "Borussia Dortmund", kit: "Away", league: "Bundesliga", badge: "BVB", tone: "#111111", accent: "#fdeb00", image: "https://photo.yupoo.com/jerseywholesale888/747495c7f1/small.jpg", kind: "club" }),
  listing({ id: "ac-milan-home-2027", club: "AC Milan", kit: "Home", league: "Serie A", badge: "ACM", tone: "#b3132b", accent: "#171717", image: "https://photo.yupoo.com/jerseywholesale888/fa20335181/small.jpg", kind: "club" }),
  listing({ id: "ac-milan-away-2027", club: "AC Milan", kit: "Away", league: "Serie A", badge: "ACM", tone: "#efefe9", accent: "#b3132b", image: "https://photo.yupoo.com/jerseywholesale888/bd47a78254/small.jpg", kind: "club" }),
  listing({ id: "inter-milan-home-2027", club: "Inter Milan", kit: "Home", league: "Serie A", badge: "INT", tone: "#1f4c9c", accent: "#111111", image: "https://photo.yupoo.com/jerseywholesale888/2437ab8bfc/small.jpg", kind: "club" }),
  listing({ id: "inter-milan-away-2027", club: "Inter Milan", kit: "Away", league: "Serie A", badge: "INT", tone: "#f3f3ef", accent: "#1f4c9c", image: "https://photo.yupoo.com/jerseywholesale888/9a5b81916f/small.jpg", kind: "club" }),
  listing({ id: "club-america-home-2027", club: "Club América", kit: "Home", league: "Liga MX", badge: "AME", tone: "#f2df4a", accent: "#1f3b78", image: "https://photo.yupoo.com/jerseywholesale888/8c63587780/small.jpg", kind: "club", featured: true }),
  listing({ id: "club-america-away-2027", club: "Club América", kit: "Away", league: "Liga MX", badge: "AME", tone: "#1f3b78", accent: "#f2df4a", image: "https://photo.yupoo.com/jerseywholesale888/cc0005bf83/small.png", kind: "club" }),
  listing({ id: "chivas-home-2027", club: "Chivas", kit: "Home", league: "Liga MX", badge: "CHI", tone: "#d2212b", accent: "#ffffff", image: "https://photo.yupoo.com/jerseywholesale888/8f102c7a2d/small.png", kind: "club", featured: true }),
  listing({ id: "chivas-away-2027", club: "Chivas", kit: "Away", league: "Liga MX", badge: "CHI", tone: "#193868", accent: "#d2212b", image: "https://photo.yupoo.com/jerseywholesale888/81d299021d/small.jpg", kind: "club" }),
  listing({ id: "inter-miami-away-2027", club: "Inter Miami", kit: "Away", league: "MLS", badge: "MIA", tone: "#161616", accent: "#f4a9c5", image: "https://photo.yupoo.com/jerseywholesale888/270751ad77/small.jpg", kind: "club" }),
  listing({ id: "la-galaxy-home-2027", club: "LA Galaxy", kit: "Home", league: "MLS", badge: "LAG", tone: "#f4f4ef", accent: "#1e4b91", image: "https://photo.yupoo.com/jerseywholesale888/9df382bf/small.jpg", kind: "club" }),
  listing({ id: "lafc-home-2027", club: "LAFC", kit: "Home", league: "MLS", badge: "LAFC", tone: "#151515", accent: "#c8a95c", image: "https://photo.yupoo.com/jerseywholesale888/9e271046/small.jpg", kind: "club" }),
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
