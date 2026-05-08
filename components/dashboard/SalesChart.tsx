"use client";

import { motion } from "framer-motion";

const monthlySeries = [56, 64, 58, 74, 82, 77, 88, 79, 92, 85, 96, 90];

export default function SalesChart() {
  return (
    <section className="panel" aria-label="Sales momentum chart">
      <h2 className="panel-title">Sales Momentum</h2>
      <p className="panel-sub">12-month export pipeline performance</p>
      <div className="bars">
        {monthlySeries.map((point, index) => (
          <motion.div
            key={index}
            className="bar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${point}%`, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 + index * 0.05, ease: [0.2, 0.9, 0.2, 1] }}
          />
        ))}
      </div>
    </section>
  );
}
