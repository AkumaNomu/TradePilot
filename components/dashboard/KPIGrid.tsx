"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const kpis = [
  { label: "Total Leads", value: "2,184", delta: "+12.8%", trend: "up" },
  { label: "Scored Clients", value: "1,462", delta: "+7.4%", trend: "up" },
  { label: "Conversion Rate", value: "18.9%", delta: "+2.1%", trend: "up" },
  { label: "Churn Risk", value: "4.7%", delta: "-0.9%", trend: "down" },
] as const;

export default function KPIGrid() {
  return (
    <motion.section
      className="kpi-grid"
      aria-label="Key performance indicators"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
      }}
    >
      {kpis.map((item) => {
        const Icon = item.trend === "up" ? ArrowUpRight : ArrowDownRight;
        return (
          <motion.article
            key={item.label}
            className="kpi"
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" }
            }}
            transition={{ duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <div className="kpi-label">
              <span className="kpi-spark" />
              {item.label}
            </div>
            <div className="kpi-val">{item.value}</div>
            <div className={`kpi-delta ${item.trend === "up" ? "up" : "down"}`}>
              <Icon size={12} />
              {item.delta} this month
            </div>
          </motion.article>
        );
      })}
    </motion.section>
  );
}
