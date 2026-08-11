"use client";

import { useMemo, useState } from "react";
import { Product, products } from "../lib/catalog";

type CartItem = Product & {
  cartId: string;
  version: "Fan" | "Player";
  size: string;
  number: string;
  playerName: string;
};

function JerseyArt({ product }: { product: Product }) {
  return (
    <div className="jersey-stage" style={{ "--jersey": product.tone, "--trim": product.accent } as React.CSSProperties}>
      {product.image ? <img className="product-photo" src={product.image} alt={`${product.club} ${product.name} jersey`} /> : <>
        <div className="jersey">
          <span className="jersey-badge">{product.badge}</span>
          <span className="jersey-wordmark">MERCADO</span>
        </div>
        <span className="photo-note">Tu foto aquí</span>
      </>}
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
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<null | { orderNumber: string; status: string; total: number; trackingNumber: string | null; items: Array<{ name: string; version: string; size: string; number: string; playerName: string }> }>(null);
  const [accountError, setAccountError] = useState("");

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

  async function startCheckout() {
    setCheckoutError("");
    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) { setCheckoutError("Enter a valid email for your receipt and order access."); return; }
    setCheckoutLoading(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        email: customerEmail,
        items: cart.map(({ id, version, size, number, playerName }) => ({ id, version, size, number, playerName })),
      }) });
      const data = await response.json() as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error ?? "Checkout could not be started.");
      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Checkout could not be started.");
      setCheckoutLoading(false);
    }
  }

  async function lookupOrder(event: React.FormEvent) {
    event.preventDefault();
    setAccountError(""); setOrderResult(null); setAccountLoading(true);
    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(accountEmail)}&order=${encodeURIComponent(accountNumber)}`);
      const data = await response.json() as typeof orderResult & { error?: string };
      if (!response.ok || !data || !("orderNumber" in data)) throw new Error(data?.error ?? "Order not found.");
      setOrderResult(data);
    } catch (error) { setAccountError(error instanceof Error ? error.message : "Order not found."); }
    finally { setAccountLoading(false); }
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
        <button className="account-button" onClick={() => setAccountOpen(true)}>My Orders</button>
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
          {cart.length > 0 && <div className="checkout"><div><span>Total</span><strong>${total.toFixed(2)} USD</strong></div>
            <label className="checkout-email">Email for receipt and order access<input type="email" autoComplete="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="you@example.com" /></label>
            {checkoutError && <p className="form-error">{checkoutError}</p>}
            <button onClick={startCheckout} disabled={checkoutLoading}>{checkoutLoading ? "Opening secure checkout…" : "Secure checkout"} <span>↗</span></button>
            <p>Payment is completed securely with Stripe. Your order is sent to the supplier only after payment is confirmed.</p>
          </div>}
        </aside>
      </div>}

      {accountOpen && <div className="overlay" onMouseDown={() => setAccountOpen(false)}>
        <section className="account-modal" role="dialog" aria-modal="true" aria-label="My Orders" onMouseDown={(event) => event.stopPropagation()}>
          <button className="close" onClick={() => setAccountOpen(false)} aria-label="Close">×</button>
          <p className="eyebrow">CUSTOMER PORTAL</p><h2>My Orders</h2>
          <p>Enter the email used at checkout and your Mercado Fútbol order number.</p>
          <form onSubmit={lookupOrder} className="order-form">
            <label>Email<input type="email" required value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} placeholder="you@example.com" /></label>
            <label>Order number<input required value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.toUpperCase())} placeholder="MF-12AB34CD" /></label>
            <button className="add" disabled={accountLoading}>{accountLoading ? "Finding order…" : "View order"}</button>
          </form>
          {accountError && <p className="form-error">{accountError}</p>}
          {orderResult && <article className="order-result">
            <div><span>Order</span><strong>{orderResult.orderNumber}</strong></div>
            <div><span>Status</span><strong className="status-pill">{orderResult.status.replaceAll("_", " ")}</strong></div>
            <div><span>Total</span><strong>${orderResult.total.toFixed(2)} USD</strong></div>
            <div><span>Tracking</span><strong>{orderResult.trackingNumber || "Not shipped yet"}</strong></div>
            <ul>{orderResult.items.map((item, index) => <li key={`${item.name}-${index}`}><b>{item.name}</b><span>{item.version} · {item.size}{item.playerName || item.number ? ` · #${item.number || "—"} ${item.playerName}` : ""}</span></li>)}</ul>
          </article>}
        </section>
      </div>}
    </main>
  );
}
