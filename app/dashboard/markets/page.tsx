export default function MarketsPage() {
  return (
    <>
      <h1 className="pg-title">Market Explorer</h1>
      <p className="pg-sub">Discover where your products have the highest fit and lowest acquisition friction.</p>

      <section className="route-grid">
        <article className="route-card">
          <h2 className="route-title">Opportunity Clusters</h2>
          <p className="route-sub">Market grouping by demand signals, pricing sensitivity, and logistics feasibility.</p>
        </article>
        <article className="route-card">
          <h2 className="route-title">Competitive Heat</h2>
          <p className="route-sub">See saturation indicators and likely share capture potential before expansion.</p>
        </article>
      </section>
    </>
  );
}

