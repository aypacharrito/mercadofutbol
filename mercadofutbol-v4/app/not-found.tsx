import Link from "next/link";

export default function NotFound() {
  return <main className="simple-page"><p className="eyebrow">404</p><h1>That jersey went missing.</h1><p>Return to the shop and find another match-day favorite.</p><Link className="button-primary" href="/">Back to Mercado Fútbol</Link></main>;
}
