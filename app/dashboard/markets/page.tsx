import { Flame, Globe2 } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function MarketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Market Explorer"
        title="Map your"
        accent="next frontier."
        description="Discover where your products have the highest fit and lowest acquisition friction."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><Globe2 size={18} /></span>
          <h2 className="route-title">Opportunity Clusters</h2>
          <p className="route-sub">Market grouping by demand signals, pricing sensitivity, and logistics feasibility.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><Flame size={18} /></span>
          <h2 className="route-title">Competitive Heat</h2>
          <p className="route-sub">See saturation indicators and likely share capture potential before expansion.</p>
        </article>
      </section>
    </>
  );
}
