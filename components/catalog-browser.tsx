"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";

type SortMode = "featured" | "az" | "brand";

export function CatalogBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState<SortMode>("featured");

  const brands = useMemo(() => {
    const available = new Set(products.map((product) => product.brand));
    const preferred = ["adidas", "Nike", "PUMA"];
    return ["All", ...preferred.filter((item) => available.has(item)), ...[...available].filter((item) => !preferred.includes(item)).sort()];
  }, [products]);

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesBrand = brand === "All" || product.brand === brand;
      const matchesQuery = !term || `${product.club} ${product.league} ${product.brand}`.toLowerCase().includes(term);
      return matchesBrand && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "az") return a.club.localeCompare(b.club);
      if (sort === "brand") return a.brand.localeCompare(b.brand) || a.club.localeCompare(b.club);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.club.localeCompare(b.club);
    });
  }, [brand, products, query, sort]);

  return (
    <>
      <div className="catalog-controls">
        <div className="catalog-search">
          <label htmlFor="collection-search">Find your team</label>
          <input id="collection-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search team or country" />
        </div>
        <div className="brand-filter" aria-label="Filter by brand">
          {brands.map((item) => (
            <button className={brand === item ? "selected" : ""} type="button" aria-pressed={brand === item} onClick={() => setBrand(item)} key={item}>{item}</button>
          ))}
        </div>
        <label className="catalog-sort">
          Sort
          <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
            <option value="featured">Featured</option>
            <option value="az">Team A–Z</option>
            <option value="brand">Brand</option>
          </select>
        </label>
      </div>
      <div className="listing-tools"><span>{visibleProducts.length} teams</span><span>Home + Away grouped together</span></div>
      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product, index) => <ProductCard product={product} priority={index < 4} key={product.id} />)}
        </div>
      ) : <div className="no-results"><h2>No teams found.</h2><p>Try a different team or brand.</p></div>}
    </>
  );
}
