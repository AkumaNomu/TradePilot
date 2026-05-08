export default function UploadPage() {
  return (
    <>
      <h1 className="pg-title">Upload Data</h1>
      <p className="pg-sub">Import CRM exports, sales ledgers, or lead lists to start AI scoring.</p>

      <section className="route-grid">
        <article className="route-card">
          <h2 className="route-title">CSV Ingestion</h2>
          <p className="route-sub">Drop your historical client records. We map fields automatically and validate data quality.</p>
        </article>
        <article className="route-card">
          <h2 className="route-title">Data Health</h2>
          <p className="route-sub">Missing regions, duplicate companies, and weak contact profiles are flagged before scoring.</p>
        </article>
      </section>
    </>
  );
}

