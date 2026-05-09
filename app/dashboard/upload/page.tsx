import { ShieldCheck, UploadCloud } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function UploadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Data"
        title="Upload data"
        description="Import CRM exports, sales ledgers, or lead lists to start scoring."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><UploadCloud size={16} /></span>
          <h2 className="route-title">CSV ingestion</h2>
          <p className="route-sub">Drop your historical client records — fields map automatically and validate on the fly.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><ShieldCheck size={16} /></span>
          <h2 className="route-title">Data health</h2>
          <p className="route-sub">Missing regions, duplicate companies and weak contact profiles flagged before scoring.</p>
        </article>
      </section>
    </>
  );
}
