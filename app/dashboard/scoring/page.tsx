import { ListOrdered, Target } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function ScoringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client Scoring"
        title="Rank every account by"
        accent="conversion potential."
        description="Rank accounts by intent, deal size potential, and probability to convert."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><Target size={18} /></span>
          <h2 className="route-title">Intent Index</h2>
          <p className="route-sub">Behavioral and engagement events feed a weighted AI score for each client.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><ListOrdered size={18} /></span>
          <h2 className="route-title">Prioritized Queue</h2>
          <p className="route-sub">Sales teams receive a next-best-action queue focused on high-probability wins.</p>
        </article>
      </section>
    </>
  );
}
