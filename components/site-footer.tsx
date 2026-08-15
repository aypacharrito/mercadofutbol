import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand footer-brand" href="/"><Image className="brand-logo" src="/brand/mercado-futbol-fireball.png" alt="" width={52} height={52} /><span>MERCADO <b>FÚTBOL</b></span></Link>
          <p>Jerseys for everyone who lives the match.</p>
        </div>
        <div><h3>Shop</h3><Link href="/category/new">New</Link><Link href="/category/clubs">Clubs</Link><Link href="/category/national-teams">National Teams</Link><Link href="/category/retro">Retro</Link></div>
        <div><h3>Help</h3><Link href="/account">My Orders</Link><Link href="/policies/shipping">Shipping</Link><Link href="/policies/returns">Returns</Link><a href="mailto:support@mercadofutbol.shop">Contact</a></div>
        <div><h3>Legal</h3><Link href="/policies/privacy">Privacy</Link><Link href="/policies/terms">Terms</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Mercado Fútbol</span><span>Secure checkout powered by Stripe</span></div>
    </footer>
  );
}

