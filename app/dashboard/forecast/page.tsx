"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, BrainCircuit, Sparkles, TrendingUp } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import AreaChart from "@/components/dashboard/AreaChart";

const forecast = [62, 64, 70, 72, 78, 84, 88, 96, 100, 108, 116, 124];
const upper = forecast.map((v) => v + 14);
const lower = forecast.map((v) => v - 12);
const actual = [60, 62, 71, 70, 78, 80, 88, 90, 100, null, null, null].map((v) =>
  v == null ? NaN : v
);
// AreaChart expects numeric values; fill non-recorded months with the forecast line continuation by hiding the dashed.
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const horizons = [
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
  { key: "12m", label: "12M" },
  { key: "24m", label: "24M" }
];

const scenarios = [
  {
    name: "Base case",
    desc: "Current run-rate continues, no major macro shifts.",
    pipeline: "DZD 8,420,000",
    confidence: 91,
    delta: "+12.8%",
    tone: "cyan"
  },
  {
    name: "Bull case",
    desc: "MENA expansion lands; conversion rate +3pts.",
    pipeline: "DZD 10,600,000",
    confidence: 64,
    delta: "+41.2%",
    tone: "up"
  },
  {
    name: "Bear case",
    desc: "Top 5 accounts slip a quarter; FX headwinds.",
    pipeline: "DZD 6,100,000",
    confidence: 18,
    delta: "-18.4%",
    tone: "down"
  }
] as const;

const risks = [
  { account: "Adriatic Foods", signal: "Activity drop 64%", severity: "high" },
  { account: "Meridian Steel", signal: "Renewal slipping 14d", severity: "med" },
  { account: "Verde Logistics", signal: "Champion left role", severity: "high" },
  { account: "Caspian Tech", signal: "No reply 9d", severity: "low" }
];

export default function ForecastPage() {
  const [horizon, setHorizon] = useState("12m");
  // Replace NaN actuals with last valid value for the rendering trail (visual continuity)
  const lastValid = actual.findIndex((v) => Number.isNaN(v));
  const actualClean = actual.map((v) =>
    Number.isNaN(v) ? actual[lastValid === -1 ? actual.length - 1 : lastValid - 1] : v
  );

  return (
    <>
      <PageHeader
        eyebrow="Forecasting"
        title="Pipeline projections"
        description="Models for pipeline quality, conversion velocity, and revenue confidence with scenario analysis."
      />

      <section className="panel">
        <div className="panel-head">
          <div>
            <h2 className="panel-title">12-month forecast</h2>
            <p className="panel-sub">Pipeline projection with 80% confidence band</p>
          </div>
          <div className="flex items-center gap-1">
            {horizons.map((h) => (
              <button
                key={h.key}
                className={`btn-ghost ${horizon === h.key ? "active" : ""}`}
                onClick={() => setHorizon(h.key)}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-h" style={{ marginTop: "1rem" }}>
          <AreaChart
            xLabels={months}
            band={{ upper, lower, color: "#4cd7f6" }}
            series={[
              { name: "Forecast", values: forecast, color: "#adc6ff", dashed: true },
              { name: "Actual", values: actualClean, color: "#4cd7f6" }
            ]}
          />
        </div>

        <div className="legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#4cd7f6" }} />
            Actual
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#adc6ff" }} />
            Forecast
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "rgba(76,215,246,0.18)" }} />
            80% confidence
          </div>
        </div>
      </section>

      <section>
        <div className="panel-head" style={{ marginBottom: "0.85rem" }}>
          <div>
            <h3 className="section-title">Scenarios</h3>
            <p className="section-sub">Live model probabilities and revenue ranges</p>
          </div>
          <span className="chip cyan">
            <BrainCircuit size={11} style={{ marginRight: 4 }} /> Updated 2m ago
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {scenarios.map((s, i) => (
            <motion.article
              key={s.name}
              className="dash-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="cell-mono" style={{ color: "#c2c6d6" }}>{s.name}</div>
                  <div
                    className="mt-1 font-headline font-bold tracking-tight text-white"
                    style={{ fontSize: "1.85rem", letterSpacing: "-0.02em" }}
                  >
                    {s.pipeline}
                  </div>
                </div>
                <span className={`chip ${s.tone}`}>{s.delta}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{s.desc}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="cell-mono">Confidence</span>
                  <span className="cell-mono" style={{ color: "#fff" }}>{s.confidence}%</span>
                </div>
                <div className="score-bar mt-2" style={{ width: "100%" }}>
                  <motion.div
                    className="score-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.confidence}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <div className="g21">
        <section className="dash-card">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Forecast drivers</h3>
              <p className="section-sub">Top model features influencing this period</p>
            </div>
            <Sparkles size={14} className="text-secondary" />
          </div>
          <div className="mt-4 grid gap-2.5">
            {[
              { f: "Pipeline coverage", w: 0.92 },
              { f: "Stage-2 velocity", w: 0.78 },
              { f: "Email engagement", w: 0.61 },
              { f: "Champion stability", w: 0.55 },
              { f: "Macro: EUR/USD", w: 0.34 }
            ].map((d, i) => (
              <motion.div
                key={d.f}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                className="grid grid-cols-[1fr_auto_120px] items-center gap-3"
              >
                <span className="text-sm text-white">{d.f}</span>
                <span className="cell-mono">{Math.round(d.w * 100)}%</span>
                <div className="score-bar" style={{ width: 120 }}>
                  <motion.div
                    className="score-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.w * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="dash-card">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Risk signals</h3>
              <p className="section-sub">Accounts trending below baseline</p>
            </div>
            <span className="chip warn">
              <AlertTriangle size={11} style={{ marginRight: 4 }} /> 4 active
            </span>
          </div>
          <div style={{ display: "grid", gap: "0.55rem", marginTop: "0.95rem" }}>
            {risks.map((r, i) => (
              <motion.div
                key={r.account}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                className="flex items-center justify-between rounded-md border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
              >
                <div>
                  <div className="cell-strong" style={{ fontSize: "0.88rem" }}>{r.account}</div>
                  <div className="cell-mono">{r.signal}</div>
                </div>
                <span
                  className={`chip ${
                    r.severity === "high" ? "down" : r.severity === "med" ? "warn" : ""
                  }`}
                >
                  {r.severity}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <div className="cta">
        <div>
          <div className="cta-title">
            <TrendingUp size={16} style={{ display: "inline", marginRight: 8, verticalAlign: -2 }} />
            Want a custom horizon?
          </div>
          <div className="cta-sub">
            Run multi-quarter projections segmented by region, product, or rep team.
          </div>
        </div>
        <button className="btn">Build scenario</button>
      </div>
    </>
  );
}
