import { BookOpen, Compass } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

export default function RecommendationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recommendations"
        title="Playbooks"
        description="Actionable plays tailored to market, segment and client readiness."
      />

      <section className="route-grid">
        <article className="route-card">
          <span className="route-card-icon"><Compass size={16} /></span>
          <h2 className="route-title">Next best market</h2>
          <p className="route-sub">Model-selected expansion targets with rationale and expected impact range.</p>
        </article>
        <article className="route-card">
          <span className="route-card-icon"><BookOpen size={16} /></span>
          <h2 className="route-title">Conversion playbook</h2>
          <p className="route-sub">Suggested outreach timing, channel mix and messaging for top-ranked accounts.</p>
        </article>
      </section>
    </>
  );
}
