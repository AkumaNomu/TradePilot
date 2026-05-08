export default function ForecastPage() {
  return (
    <>
      <h1 className="pg-title">Forecast</h1>
      <p className="pg-sub">Projection models for pipeline quality, conversion velocity, and revenue confidence.</p>

      <section className="route-grid">
        <article className="route-card">
          <h2 className="route-title">30-Day Outlook</h2>
          <p className="route-sub">AI estimates likely won opportunities and expected close value by destination market.</p>
        </article>
        <article className="route-card">
          <h2 className="route-title">Risk Signals</h2>
          <p className="route-sub">Low activity accounts and delayed responses are surfaced as early warning indicators.</p>
        </article>
      </section>
    </>
  );
}

