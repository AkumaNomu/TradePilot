import { Flame, Globe2 } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function MarketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Markets"
        title="Market explorer"
        description="Discover where your products have the highest fit and lowest acquisition friction."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><Globe2 size={16} /></span>
          <h2 className="route-title">Opportunity clusters</h2>
          <p className="route-sub">Markets grouped by demand signals, pricing sensitivity, and logistics feasibility.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><Flame size={16} /></span>
          <h2 className="route-title">Competitive heat</h2>
          <p className="route-sub">Saturation indicators and likely share capture potential before expansion.</p>
        </article>
      </section>
    </>
  );
}
