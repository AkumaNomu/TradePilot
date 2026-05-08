export default function ScoringPage() {
  return (
    <>
      <h1 className="pg-title">Client Scoring</h1>
      <p className="pg-sub">Rank accounts by intent, deal size potential, and probability to convert.</p>

      <section className="route-grid">
        <article className="route-card">
          <h2 className="route-title">Intent Index</h2>
          <p className="route-sub">Behavioral and engagement events feed a weighted AI score for each client.</p>
        </article>
        <article className="route-card">
          <h2 className="route-title">Prioritized Queue</h2>
          <p className="route-sub">Sales teams receive a next-best-action queue focused on high-probability wins.</p>
        </article>
      </section>
    </>
  );
}

