"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  Mail,
  MessageSquare,
  PhoneCall,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const playbooks = [
  {
    title: "MENA energy expansion",
    summary: "Open Helios Energy and 6 sister accounts via partner intro. Expected lift +18%.",
    impact: "+$1.4M",
    confidence: 87,
    timeline: "30d",
    tone: "cyan" as const,
    icon: Compass
  },
  {
    title: "Champion-led growth in Europe agri",
    summary: "Concordia Foods exec referred 4 peers. Trigger triple-tap intro sequence.",
    impact: "+$640K",
    confidence: 79,
    timeline: "45d",
    tone: "up" as const,
    icon: TrendingUp
  },
  {
    title: "Reactivate cold mid-market SaaS",
    summary: "Re-warm 38 dormant accounts via product-led nudge + new pricing pack.",
    impact: "+$420K",
    confidence: 64,
    timeline: "60d",
    tone: "warn" as const,
    icon: Zap
  }
];

const queue = [
  { account: "Helios Energy", channel: "Demo", time: "Today · 16:00", reason: "Surging intent · CFO viewed pricing 3x", icon: PhoneCall },
  { account: "Concordia Foods", channel: "Email", time: "Today · 17:30", reason: "Champion replied warm in <2h window", icon: Mail },
  { account: "Atlas Logistics", channel: "Linked-in DM", time: "Tomorrow · 09:15", reason: "VP Ops opened deck twice", icon: MessageSquare },
  { account: "Northwind Tech", channel: "Call", time: "Tomorrow · 11:00", reason: "Renewal in 28d, re-pricing window", icon: PhoneCall },
  { account: "Saharan Mining", channel: "Email", time: "Thu · 10:30", reason: "New stakeholder added on LinkedIn", icon: Mail }
];

const messaging = [
  {
    label: "Hook",
    copy: "Open with the EU-MENA agri export benchmark you saved last week."
  },
  {
    label: "Value prop",
    copy: "Frame around 18% pipeline lift seen by Helios within 30 days."
  },
  {
    label: "Proof point",
    copy: "Reference the Concordia case study (PDF auto-attached)."
  },
  {
    label: "Ask",
    copy: "Request 25-min slot Thursday with VP Sales + Ops."
  }
];

export default function RecommendationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Playbooks"
        title="Recommended next moves"
        description="Actionable plays tailored to market, segment, and client readiness — with expected impact and timing."
      />

      <section>
        <div className="panel-head" style={{ marginBottom: "0.85rem" }}>
          <div>
            <h3 className="section-title">Top playbooks</h3>
            <p className="section-sub">Ranked by expected impact, calibrated to your data</p>
          </div>
          <span className="chip cyan">
            <Sparkles size={11} style={{ marginRight: 4 }} /> Updated 4m ago
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {playbooks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.title}
                className="dash-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
              >
                <div className="flex items-start justify-between">
                  <span className="route-card-icon">
                    <Icon size={16} />
                  </span>
                  <span className={`chip ${p.tone}`}>{p.impact}</span>
                </div>
                <h3
                  className="mt-4 font-headline font-bold tracking-tight text-white"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{p.summary}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="cell-mono">Confidence</div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="score-bar" style={{ width: 60 }}>
                        <motion.div
                          className="score-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${p.confidence}%` }}
                          transition={{ duration: 0.9, delay: 0.3 + i * 0.05 }}
                        />
                      </div>
                      <span className="cell-strong">{p.confidence}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="cell-mono">Timeline</div>
                    <div className="mt-1 cell-strong">{p.timeline}</div>
                  </div>
                </div>

                <button
                  className="btn-ghost mt-4 w-full justify-center"
                  style={{ display: "inline-flex", justifyContent: "center" }}
                >
                  Activate playbook
                  <ArrowUpRight size={12} style={{ marginLeft: 6 }} />
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      <div className="g21">
        <section className="dash-card">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Next-best-action queue</h3>
              <p className="section-sub">Live recommendations, ordered by signal strength</p>
            </div>
            <span className="chip up">{queue.length} items</span>
          </div>
          <div style={{ display: "grid", gap: "0.55rem", marginTop: "0.95rem" }}>
            {queue.map((q, i) => {
              const Icon = q.icon;
              return (
                <motion.div
                  key={q.account}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                  className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-md border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
                >
                  <span className="feed-icon">
                    <Icon size={14} />
                  </span>
                  <div>
                    <div className="cell-strong" style={{ fontSize: "0.92rem" }}>
                      {q.account}{" "}
                      <span className="cell-mono" style={{ marginLeft: 6 }}>· {q.channel}</span>
                    </div>
                    <div className="cell-mono" style={{ marginTop: "0.2rem" }}>{q.reason}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="cell-mono">{q.time}</div>
                    <button className="btn-ghost mt-1.5">Run</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="dash-card">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Conversion script</h3>
              <p className="section-sub">For Helios Energy · Energy / MENA</p>
            </div>
            <BookOpen size={14} className="text-secondary" />
          </div>
          <div style={{ display: "grid", gap: "0.6rem", marginTop: "0.95rem" }}>
            {messaging.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                className="rounded-md border border-white/[0.05] bg-white/[0.015] px-3.5 py-3"
              >
                <div className="cell-mono" style={{ color: "#4cd7f6" }}>{m.label}</div>
                <p className="mt-1 text-sm leading-relaxed text-white">{m.copy}</p>
              </motion.div>
            ))}
          </div>
          <button className="btn mt-4 w-full" style={{ display: "block" }}>
            Send to inbox
          </button>
        </section>
      </div>
    </>
  );
}
