"use client";

import { motion } from "framer-motion";

const markets = [
  { name: "Europe", value: "43%", color: "#4cd7f6" },
  { name: "MENA", value: "31%", color: "#4edea3" },
  { name: "Americas", value: "26%", color: "#6e82ff" },
] as const;

export default function MarketChart() {
  return (
    <section className="panel" aria-label="Top market mix chart">
      <h2 className="panel-title">Market Mix</h2>
      <p className="panel-sub">Regional share of qualified opportunities</p>

      <div className="mk-row">
        <motion.div
          className="mk-ring"
          initial={{ rotate: -90, opacity: 0, scale: 0.85 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
        />
        <div className="mk-list">
          {markets.map((market, idx) => (
            <motion.div
              key={market.name}
              className="mk-item"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <span>
                <span className="mk-dot" style={{ background: market.color, color: market.color }} />
                {market.name}
              </span>
              <strong>{market.value}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
