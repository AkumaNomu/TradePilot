"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Filter, Target, Zap } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const accounts = [
  { name: "Helios Energy", segment: "Energy", region: "MENA", score: 94, intent: "Surging", value: "DA480K", lastTouch: "Today", action: "Schedule demo" },
  { name: "Concordia Foods", segment: "Agri", region: "Europe", score: 88, intent: "Active", value: "DA312K", lastTouch: "1d", action: "Send proposal" },
  { name: "Northwind Tech", segment: "SaaS", region: "Americas", score: 84, intent: "Active", value: "DA268K", lastTouch: "2d", action: "Intro champion" },
  { name: "Atlas Logistics", segment: "Logistics", region: "Europe", score: 81, intent: "Engaged", value: "DA240K", lastTouch: "3d", action: "Pricing call" },
  { name: "Saharan Mining", segment: "Resources", region: "MENA", score: 76, intent: "Engaged", value: "DA198K", lastTouch: "5d", action: "Re-engage" },
  { name: "Riviera Pharma", segment: "Biotech", region: "Europe", score: 72, intent: "Warm", value: "DA172K", lastTouch: "1w", action: "Nurture" },
  { name: "Cedar Components", segment: "Manufacturing", region: "Americas", score: 68, intent: "Warm", value: "DA142K", lastTouch: "1w", action: "Nurture" },
  { name: "Arctic Telecom", segment: "Telecom", region: "Europe", score: 64, intent: "Cool", value: "DA118K", lastTouch: "2w", action: "Educational" },
  { name: "Verde Logistics", segment: "Logistics", region: "Americas", score: 58, intent: "Cool", value: "DA96K", lastTouch: "3w", action: "Pause" }
];

const distributionBuckets = [
  { range: "90-100", count: 18, label: "Hot" },
  { range: "75-89", count: 64, label: "Active" },
  { range: "60-74", count: 142, label: "Warm" },
  { range: "40-59", count: 218, label: "Cool" },
  { range: "0-39", count: 1020, label: "Cold" }
];

const factors = [
  { name: "Buying intent", weight: 0.32 },
  { name: "Firmographic fit", weight: 0.24 },
  { name: "Engagement depth", weight: 0.18 },
  { name: "Champion strength", weight: 0.14 },
  { name: "Budget signals", weight: 0.12 }
];

function intentChip(v: string) {
  if (v === "Surging") return "up";
  if (v === "Active" || v === "Engaged") return "cyan";
  if (v === "Warm") return "warn";
  return "";
}

export default function ScoringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Scoring engine"
        title="Account intelligence"
        description="Rank accounts by intent, deal size potential, and probability to convert. Every score is explainable."
      />

      <div className="kpi-grid">
        {[
          { label: "Total scored", value: "1,462", delta: "+74" },
          { label: "Hot accounts", value: "82", delta: "+11" },
          { label: "Avg score", value: "61.4", delta: "+2.8" },
          { label: "Conversion lift", value: "24.8%", delta: "+4.2" }
        ].map((k) => (
          <article key={k.label} className="kpi">
            <div className="kpi-label">
              <span className="kpi-spark" />
              {k.label}
            </div>
            <div className="kpi-val">{k.value}</div>
            <div className="kpi-delta up">▲ {k.delta} 30d</div>
          </article>
        ))}
      </div>

      <div className="g21">
        <section className="dash-card">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Prioritized queue</h3>
              <p className="section-sub">Highest probability conversions, ranked live.</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="btn-ghost active">All</button>
              <button className="btn-ghost">Hot</button>
              <button className="btn-ghost">Active</button>
              <button className="btn-ghost">
                <Filter size={11} style={{ marginRight: 4 }} /> Filter
              </button>
            </div>
          </div>

          <div className="table-wrap" style={{ marginTop: "1rem" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Account</th>
                  <th>Segment</th>
                  <th>Score</th>
                  <th>Intent</th>
                  <th>Value</th>
                  <th>Last touch</th>
                  <th>Next action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a, i) => (
                  <motion.tr
                    key={a.name}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.04 + i * 0.03 }}
                  >
                    <td className="cell-mono">#{(i + 1).toString().padStart(2, "0")}</td>
                    <td>
                      <div className="cell-strong">{a.name}</div>
                      <div className="cell-mono">{a.region}</div>
                    </td>
                    <td>
                      <span className="chip">{a.segment}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="score-bar">
                          <motion.div
                            className="score-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${a.score}%` }}
                            transition={{ duration: 0.9, delay: 0.2 + i * 0.04 }}
                          />
                        </div>
                        <span className="cell-mono" style={{ color: "#fff" }}>{a.score}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`chip ${intentChip(a.intent)}`}>
                        <Zap size={10} style={{ marginRight: 4 }} />
                        {a.intent}
                      </span>
                    </td>
                    <td className="cell-strong">{a.value}</td>
                    <td className="cell-mono">{a.lastTouch}</td>
                    <td>
                      <button className="btn-ghost">
                        {a.action}
                        <ArrowUpRight size={11} style={{ marginLeft: 4 }} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div style={{ display: "grid", gap: "0.95rem" }}>
          <section className="dash-card">
            <div className="panel-head">
              <div>
                <h3 className="section-title">Score distribution</h3>
                <p className="section-sub">All scored accounts</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {distributionBuckets.map((b, i) => {
                const max = Math.max(...distributionBuckets.map((x) => x.count));
                const w = (b.count / max) * 100;
                return (
                  <motion.div
                    key={b.range}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                    className="grid grid-cols-[64px_1fr_46px] items-center gap-2"
                  >
                    <span className="cell-mono">{b.range}</span>
                    <div className="relative h-5 overflow-hidden rounded-md bg-white/[0.04]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${w}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                        className="absolute inset-y-0 left-0 rounded-md"
                        style={{
                          background:
                            i === 0
                              ? "linear-gradient(90deg, #4edea3, #4cd7f6)"
                              : i === 1
                              ? "linear-gradient(90deg, #4cd7f6, #adc6ff)"
                              : "linear-gradient(90deg, rgba(173,198,255,0.4), rgba(76,215,246,0.25))"
                        }}
                      />
                    </div>
                    <span className="cell-strong" style={{ textAlign: "right", fontSize: "0.86rem" }}>{b.count}</span>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="dash-card">
            <div className="panel-head">
              <div>
                <h3 className="section-title">Score factors</h3>
                <p className="section-sub">Live model weights</p>
              </div>
              <Target size={14} className="text-secondary" />
            </div>
            <div className="mt-4 grid gap-2.5">
              {factors.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                  className="grid grid-cols-[1fr_auto] items-center gap-2"
                >
                  <div>
                    <div className="text-sm text-white">{f.name}</div>
                    <div className="score-bar mt-1.5" style={{ width: "100%" }}>
                      <motion.div
                        className="score-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${f.weight * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.04 }}
                      />
                    </div>
                  </div>
                  <span className="cell-mono" style={{ minWidth: 38, textAlign: "right" }}>
                    {Math.round(f.weight * 100)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
