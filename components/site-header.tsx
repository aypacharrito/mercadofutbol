"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { collectionDefinitions } from "@/lib/collections";
import { useCart } from "@/components/cart-provider";

export function SiteHeader() {
  const { count, setIsOpen } = useCart();
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement">FREE U.S. SHIPPING ON $100+ <span>•</span> FAN &amp; PLAYER VERSIONS <span>•</span> CUSTOM NAME + NUMBER</div>
      <header className="site-header">
        <button className="mobile-menu" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Open navigation">☰</button>
        <Link className="brand" href="/">
          <Image className="brand-logo" src="/brand/mercado-futbol-fireball.png" alt="" width={52} height={52} priority />
          <span>MERCADO <b>FÚTBOL</b></span>
        </Link>
        <form className="header-search" action="/search">
          <label htmlFor="site-search">Search</label>
          <input id="site-search" name="q" placeholder="Search teams, leagues, or countries" />
          <button type="submit" aria-label="Search">⌕</button>
        </form>
        <div className="header-actions">
          {isSignedIn ? <Link href="/account">My Orders</Link> : <Link href="/sign-in">Sign In</Link>}
          {isSignedIn ? <UserButton /> : null}
          <button type="button" onClick={() => setIsOpen(true)} aria-label={`Open bag with ${count} items`}>Bag <span>{count}</span></button>
        </div>
      </header>
      <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        <Link className={pathname === "/category/clubs" ? "active" : ""} href="/category/clubs" onClick={() => setMenuOpen(false)}>All Jerseys</Link>
        {collectionDefinitions.map((collection) => {
          const href = `/collections/${collection.slug}`;
          return <Link className={pathname === href ? "active" : ""} href={href} key={collection.slug} onClick={() => setMenuOpen(false)}>{collection.shortLabel}</Link>;
        })}
      </nav>
    </>
  );
}
