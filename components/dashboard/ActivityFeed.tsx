"use client";

import { motion } from "framer-motion";
import { Activity, BadgeCheck, Sparkles, TriangleAlert, Zap } from "lucide-react";

const events = [
  {
    icon: BadgeCheck,
    tone: "green",
    text: <>Deal <strong>Helios Energy</strong> moved to <strong>Won</strong> · $480K</>,
    time: "2m"
  },
  {
    icon: Sparkles,
    tone: "purple",
    text: <>Model surfaced <strong>14 new high-intent accounts</strong> in MENA region</>,
    time: "11m"
  },
  {
    icon: Zap,
    tone: "cyan",
    text: <>Forecast confidence updated to <strong>91%</strong> for Q3 pipeline</>,
    time: "23m"
  },
  {
    icon: TriangleAlert,
    tone: "warn",
    text: <>Risk signal on <strong>Adriatic Foods</strong> · activity dropped 64%</>,
    time: "47m"
  },
  {
    icon: Activity,
    tone: "cyan",
    text: <>Synced <strong>2,184 leads</strong> from Salesforce export</>,
    time: "1h"
  }
] as const;

export default function ActivityFeed() {
  return (
    <section className="dash-card" aria-label="Live activity">
      <div className="panel-head">
        <div>
          <h3 className="section-title">Live activity</h3>
          <p className="section-sub">Signals and events ingested in the last hour.</p>
        </div>
        <span className="chip cyan">● Streaming</span>
      </div>
      <div className="feed">
        {events.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.div
              key={i}
              className="feed-row"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.07, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <span className={`feed-icon ${e.tone}`}>
                <Icon size={14} />
              </span>
              <span className="feed-line">{e.text}</span>
              <span className="feed-time">{e.time} ago</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
