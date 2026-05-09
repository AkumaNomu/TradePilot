"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const rows = [
  { name: "Helios Energy", region: "MENA", segment: "Energy", score: 94, value: "DZD 480,000", trend: "up" },
  { name: "Concordia Foods", region: "Europe", segment: "Agri", score: 88, value: "DZD 312,000", trend: "up" },
  { name: "Northwind Tech", region: "Americas", segment: "SaaS", score: 84, value: "DZD 268,000", trend: "up" },
  { name: "Atlas Logistics", region: "Europe", segment: "Logistics", score: 81, value: "DZD 240,000", trend: "up" },
  { name: "Saharan Mining", region: "MENA", segment: "Resources", score: 76, value: "DZD 198,000", trend: "flat" },
  { name: "Riviera Pharma", region: "Europe", segment: "Biotech", score: 72, value: "DZD 172,000", trend: "up" }
];

export default function TopAccounts() {
  return (
    <section className="dash-card" aria-label="Top accounts">
      <div className="panel-head">
        <div>
          <h3 className="section-title">Top accounts this week</h3>
          <p className="section-sub">Highest scoring opportunities by predicted value.</p>
        </div>
        <button className="btn-ghost">View all</button>
      </div>

      <div className="table-wrap" style={{ marginTop: "1rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Region</th>
              <th>Segment</th>
              <th>Score</th>
              <th>Forecast</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
              >
                <td className="cell-strong">{r.name}</td>
                <td className="cell-mono">{r.region}</td>
                <td>
                  <span className="chip">{r.segment}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2.5">
                    <div className="score-bar">
                      <motion.div
                        className="score-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${r.score}%` }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.05 }}
                      />
                    </div>
                    <span className="cell-mono" style={{ color: "#fff" }}>{r.score}</span>
                  </div>
                </td>
                <td className="cell-strong">{r.value}</td>
                <td>
                  <button className="btn-ghost" aria-label="Open">
                    <ArrowUpRight size={12} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
