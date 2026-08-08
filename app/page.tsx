"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  club: string;
  name: string;
  league: string;
  price: number;
  accent: string;
  tone: string;
  badge: string;
};

type CartItem = Product & {
  cartId: string;
  version: "Fan" | "Player";
  size: string;
  number: string;
  playerName: string;
};

const products: Product[] = [
  { id: 1, club: "Inter Miami", name: "Miami Away 24/25", league: "MLS", price: 74.99, accent: "#f5a8c4", tone: "#171717", badge: "IM" },
  { id: 2, club: "Real Madrid", name: "Madrid Home 25/26", league: "La Liga", price: 79.99, accent: "#d9c8ff", tone: "#f5f3ed", badge: "RM" },
  { id: 3, club: "FC Barcelona", name: "Barcelona Home 25/26", league: "La Liga", price: 79.99, accent: "#e6be38", tone: "#143a77", badge: "FCB" },
  { id: 4, club: "México", name: "México Home 2026", league: "Selecciones", price: 69.99, accent: "#e8d09d", tone: "#0b5b3d", badge: "MX" },
  { id: 5, club: "Argentina", name: "Argentina Home 2026", league: "Selecciones", price: 69.99, accent: "#ffffff", tone: "#77bfe2", badge: "ARG" },
  { id: 6, club: "Manchester City", name: "City Home 25/26", league: "Premier League", price: 74.99, accent: "#ffffff", tone: "#76bce3", badge: "MC" },
];

function JerseyArt({ product }: { product: Product }) {
  return (
    <div className="jersey-stage" style={{ "--jersey": product.tone, "--trim": product.accent } as React.CSSProperties}>
      <div className="jersey">
        <span className="jersey-badge">{product.badge}</span>
        <span className="jersey-wordmark">MERCADO</span>
      </div>
      <span className="photo-note">Tu foto aquí</span>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [version, setVersion] = useState<"Fan" | "Player">("Fan");
  const [size, setSize] = useState("M");
  const [playerName, setPlayerName] = useState("");
  const [number, setNumber] = useState("");

  const filtered = useMemo(() => products.filter((p) => {
    const matchesFilter = filter === "Todos" || p.league === filter;
    const term = search.toLowerCase().trim();
    return matchesFilter && (!term || `${p.club} ${p.name} ${p.league}`.toLowerCase().includes(term));
  }), [filter, search]);

  const total = cart.reduce((sum, item) => sum + item.price + (item.version === "Player" ? 15 : 0), 0);

  function addToCart() {
    if (!selected) return;
    setCart((current) => [...current, {
      ...selected,
      cartId: `${selected.id}-${Date.now()}`,
      version,
      size,
      playerName: playerName.trim(),
      number: number.trim(),
    }]);
    setSelected(null);
    setCartOpen(true);
    setVersion("Fan"); setSize("M"); setPlayerName(""); setNumber("");
  }

  function sendOrder() {
    const lines = cart.map((item, i) => [
      `${i + 1}. ${item.club} — ${item.name}`,
      `${item.version.toLowerCase()} version; size: ${item.size}; Number: ${item.number || "none"}; name: ${item.playerName || "none"}`,
    ].join("\n"));
    const message = `NUEVO PEDIDO — MERCADO FÚTBOL\n\n${lines.join("\n\n")}\n\nTotal cliente: $${total.toFixed(2)} USD`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <div className="announcement">ENVÍO GRATIS EN PEDIDOS DE $100+ <span>•</span> PERSONALIZA TU JERSEY</div>
      <header className="header">
        <a className="brand" href="#top" aria-label="Mercado Fútbol inicio">
          <span className="brand-mark">MF</span>
          <span>MERCADO <b>FÚTBOL</b></span>
        </a>
        <label className="search">
          <span>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Busca equipos, ligas o selecciones" aria-label="Buscar jerseys" />
        </label>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Carrito con ${cart.length} artículos`}>
          Bolsa <span>{cart.length}</span>
        </button>
      </header>
      <nav className="nav" aria-label="Categorías principales">
        {['Nuevos', 'Clubes', 'Selecciones', 'Retro', 'Niños', 'Ofertas'].map((item) => <a key={item} href="#catalogo">{item}</a>)}
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">TEMPORADA 2026</p>
          <h1>El fútbol se lleva puesto.</h1>
          <p>Jerseys de tus clubes y selecciones favoritas. Elige versión, talla y personalización en un solo lugar.</p>
          <a className="primary" href="#catalogo">Comprar jerseys <span>→</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="ball">MF</div>
          <div className="hero-shirt shirt-one"><span>10</span></div>
          <div className="hero-shirt shirt-two"><span>9</span></div>
        </div>
      </section>

      <section className="trust-row">
        <div><b>✓ Calidad seleccionada</b><span>Versiones Fan y Player</span></div>
        <div><b>↗ Pedido directo</b><span>Confirmación por WhatsApp</span></div>
        <div><b>✦ Personalizable</b><span>Nombre y número opcionales</span></div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="section-head">
          <div><p className="eyebrow">FAVORITOS DE LA AFICIÓN</p><h2>Jerseys destacados</h2></div>
          <p>Fotos provisionales. Tu catálogo real puede reemplazarlas cuando nos envíes las imágenes.</p>
        </div>
        <div className="filters" role="group" aria-label="Filtrar jerseys">
          {["Todos", "La Liga", "Premier League", "MLS", "Selecciones"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}
        </div>
        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="tag">NUEVO</div>
              <JerseyArt product={product} />
              <div className="product-info">
                <p>{product.league}</p>
                <h3>{product.name}</h3>
                <div><strong>${product.price.toFixed(2)}</strong><button onClick={() => setSelected(product)}>Elegir opciones</button></div>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="empty">No encontramos jerseys con esa búsqueda.</p>}
      </section>

      <section className="how">
        <p className="eyebrow">FÁCIL Y DIRECTO</p><h2>De la cancha a tu puerta</h2>
        <div><article><span>01</span><h3>Elige tu jersey</h3><p>Explora por equipo, liga o selección.</p></article><article><span>02</span><h3>Hazlo tuyo</h3><p>Selecciona versión, talla, nombre y número.</p></article><article><span>03</span><h3>Confirma el pedido</h3><p>Tu orden queda lista para enviar por WhatsApp.</p></article></div>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">MF</span><span>MERCADO <b>FÚTBOL</b></span></a><p>Jerseys para quienes viven el partido.</p><span>© 2026 Mercado Fútbol</span></footer>

      {selected && <div className="overlay" onMouseDown={() => setSelected(null)}>
        <section className="modal" role="dialog" aria-modal="true" aria-label="Personalizar jersey" onMouseDown={(e) => e.stopPropagation()}>
          <button className="close" onClick={() => setSelected(null)} aria-label="Cerrar">×</button>
          <JerseyArt product={selected} />
          <div className="modal-content"><p className="eyebrow">PERSONALIZA TU PEDIDO</p><h2>{selected.name}</h2><p className="price">Desde ${selected.price.toFixed(2)}</p>
            <fieldset><legend>Versión</legend><div className="choice-row"><button className={version === "Fan" ? "selected" : ""} onClick={() => setVersion("Fan")}>Fan</button><button className={version === "Player" ? "selected" : ""} onClick={() => setVersion("Player")}>Player +$15</button></div></fieldset>
            <fieldset><legend>Talla</legend><div className="choice-row sizes">{["S", "M", "L", "XL", "2XL"].map((s) => <button className={size === s ? "selected" : ""} onClick={() => setSize(s)} key={s}>{s}</button>)}</div></fieldset>
            <div className="input-row"><label>Nombre opcional<input maxLength={14} value={playerName} onChange={(e) => setPlayerName(e.target.value.toUpperCase())} placeholder="MESSI" /></label><label>Número opcional<input maxLength={2} inputMode="numeric" value={number} onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))} placeholder="10" /></label></div>
            <button className="add" onClick={addToCart}>Agregar a la bolsa — ${(selected.price + (version === "Player" ? 15 : 0)).toFixed(2)}</button>
          </div>
        </section>
      </div>}

      {cartOpen && <div className="overlay drawer-overlay" onMouseDown={() => setCartOpen(false)}>
        <aside className="drawer" role="dialog" aria-modal="true" aria-label="Bolsa de compras" onMouseDown={(e) => e.stopPropagation()}>
          <div className="drawer-head"><div><p className="eyebrow">TU PEDIDO</p><h2>Bolsa ({cart.length})</h2></div><button className="close" onClick={() => setCartOpen(false)}>×</button></div>
          <div className="cart-items">{cart.length === 0 ? <div className="empty-cart"><span>MF</span><h3>Tu bolsa está vacía</h3><p>Elige un jersey para comenzar.</p></div> : cart.map((item) => <article className="cart-item" key={item.cartId}><div className="mini-shirt" style={{ background: item.tone, borderColor: item.accent }}>{item.badge}</div><div><h3>{item.name}</h3><p>{item.version} · Talla {item.size}</p><p>{item.number || item.playerName ? `#${item.number || "—"} ${item.playerName || "Sin nombre"}` : "Sin personalización"}</p><strong>${(item.price + (item.version === "Player" ? 15 : 0)).toFixed(2)}</strong></div><button onClick={() => setCart((current) => current.filter((x) => x.cartId !== item.cartId))}>Quitar</button></article>)}</div>
          {cart.length > 0 && <div className="checkout"><div><span>Total</span><strong>${total.toFixed(2)} USD</strong></div><button onClick={sendOrder}>Enviar pedido por WhatsApp <span>↗</span></button><p>Se abrirá WhatsApp con el pedido escrito en el formato de tu proveedora.</p></div>}
        </aside>
      </div>}
    </main>
  );
}
