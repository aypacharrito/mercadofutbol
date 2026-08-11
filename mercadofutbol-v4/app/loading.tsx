export default function Loading() {
  return (
    <main className="section-shell loading-page" aria-busy="true">
      <div className="loading-line loading-line-short" />
      <div className="loading-line loading-line-title" />
      <div className="loading-grid">
        {Array.from({ length: 4 }, (_, index) => <div className="loading-card" key={index} />)}
      </div>
    </main>
  );
}
