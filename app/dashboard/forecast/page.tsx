import { AlertTriangle, LineChart } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function ForecastPage() {
  return (
    <>
      <PageHeader
        eyebrow="Forecast Engine"
        title="Predict the next"
        accent="winning quarter."
        description="Projection models for pipeline quality, conversion velocity, and revenue confidence."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><LineChart size={18} /></span>
          <h2 className="route-title">30-Day Outlook</h2>
          <p className="route-sub">AI estimates likely won opportunities and expected close value by destination market.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><AlertTriangle size={18} /></span>
          <h2 className="route-title">Risk Signals</h2>
          <p className="route-sub">Low activity accounts and delayed responses are surfaced as early warning indicators.</p>
        </article>
      </section>
    </>
  );
}
