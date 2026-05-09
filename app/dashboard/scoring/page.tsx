import { ListOrdered, Target } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function ScoringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Scoring"
        title="Client scoring"
        description="Rank accounts by intent, deal size potential, and probability to convert."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><Target size={16} /></span>
          <h2 className="route-title">Intent index</h2>
          <p className="route-sub">Behavioral and engagement events feed a weighted score for each client.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><ListOrdered size={16} /></span>
          <h2 className="route-title">Prioritized queue</h2>
          <p className="route-sub">A next-best-action queue focused on high-probability wins.</p>
        </article>
      </section>
    </>
  );
}
