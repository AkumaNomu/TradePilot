export default function RecommendationsPage() {
  return (
    <>
      <h1 className="pg-title">Recommendations</h1>
      <p className="pg-sub">Actionable AI playbooks tailored to market, segment, and client readiness.</p>

      <section className="route-grid">
        <article className="route-card">
          <h2 className="route-title">Next Best Market</h2>
          <p className="route-sub">Model-selected expansion targets with rationale and expected impact range.</p>
        </article>
        <article className="route-card">
          <h2 className="route-title">Conversion Playbook</h2>
          <p className="route-sub">Suggested outreach timing, channel mix, and messaging for top-ranked accounts.</p>
        </article>
      </section>
    </>
  );
}

