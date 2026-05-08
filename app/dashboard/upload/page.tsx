import { ShieldCheck, UploadCloud } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function UploadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Upload Data"
        title="Bring your data"
        accent="into orbit."
        description="Import CRM exports, sales ledgers, or lead lists to start AI scoring."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><UploadCloud size={18} /></span>
          <h2 className="route-title">CSV Ingestion</h2>
          <p className="route-sub">Drop your historical client records. We map fields automatically and validate data quality.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><ShieldCheck size={18} /></span>
          <h2 className="route-title">Data Health</h2>
          <p className="route-sub">Missing regions, duplicate companies, and weak contact profiles are flagged before scoring.</p>
        </article>
      </section>
    </>
  );
}
