"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="section-shell error-page">
      <p className="eyebrow">MERCADO FÚTBOL</p>
      <h1>That play did not work.</h1>
      <p>Refresh the page or try again. Your bag is saved on this device.</p>
      <button className="button-primary" onClick={reset} type="button">Try again</button>
    </main>
  );
}
