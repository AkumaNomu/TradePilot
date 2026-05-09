"use client";

import { useState } from "react";
import AreaChart from "@/components/dashboard/AreaChart";

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const closed = [56, 64, 58, 74, 82, 77, 88, 79, 92, 85, 96, 90];
const pipeline = [70, 72, 80, 82, 90, 94, 102, 108, 112, 118, 124, 132];

const ranges = [
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
  { key: "12m", label: "12M" },
  { key: "ytd", label: "YTD" }
] as const;

export default function SalesChart() {
  const [range, setRange] = useState<(typeof ranges)[number]["key"]>("12m");
  return (
    <section className="panel" aria-label="Sales momentum chart">
      <div className="panel-head">
        <div>
          <h2 className="panel-title">Pipeline momentum</h2>
          <p className="panel-sub">Closed-won vs. forecasted pipeline</p>
        </div>
        <div className="flex items-center gap-1">
          {ranges.map((r) => (
            <button
              key={r.key}
              className={`btn-ghost ${r.key === range ? "active" : ""}`}
              onClick={() => setRange(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-h" style={{ marginTop: "1rem" }}>
        <AreaChart
          xLabels={months}
          series={[
            { name: "Pipeline", values: pipeline, color: "#adc6ff", dashed: true },
            { name: "Closed", values: closed, color: "#4cd7f6" }
          ]}
        />
      </div>

      <div className="legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#4cd7f6", boxShadow: "0 0 8px rgba(76,215,246,0.7)" }} />
          Closed won
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#adc6ff", boxShadow: "0 0 8px rgba(173,198,255,0.7)" }} />
          Forecast pipeline
        </div>
      </div>
    </section>
  );
}
