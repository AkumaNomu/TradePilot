import { AlertTriangle, LineChart } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function ForecastPage() {
  return (
    <>
      <PageHeader
        eyebrow="Forecast"
        title="Pipeline projections"
        description="Models for pipeline quality, conversion velocity, and revenue confidence."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><LineChart size={16} /></span>
          <h2 className="route-title">30-day outlook</h2>
          <p className="route-sub">Likely won opportunities and expected close value by destination market.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><AlertTriangle size={16} /></span>
          <h2 className="route-title">Risk signals</h2>
          <p className="route-sub">Low activity accounts and delayed responses surfaced as early warnings.</p>
        </article>
      </section>
    </>
  );
}
