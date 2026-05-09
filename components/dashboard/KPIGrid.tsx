"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const kpis = [
  { label: "Pipeline value", value: 8.42, prefix: "$", suffix: "M", decimals: 2, delta: "+12.8%", trend: "up", series: [22, 28, 34, 30, 42, 48, 56, 62, 70] },
  { label: "Scored accounts", value: 1462, prefix: "", suffix: "", decimals: 0, delta: "+7.4%", trend: "up", series: [40, 38, 44, 49, 51, 56, 62, 64, 68] },
  { label: "Conversion rate", value: 18.9, prefix: "", suffix: "%", decimals: 1, delta: "+2.1%", trend: "up", series: [12, 14, 13, 16, 17, 17, 18, 18, 19] },
  { label: "Churn risk", value: 4.7, prefix: "", suffix: "%", decimals: 1, delta: "-0.9%", trend: "down", series: [12, 11, 10, 9, 8, 8, 7, 6, 5] }
] as const;

function MicroSpark({ values, color }: { values: readonly number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const stepX = w / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const fillPath = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`ms-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={fillPath}
        fill={`url(#ms-${color.replace(/[^a-z0-9]/gi, "")})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: [0.2, 0.9, 0.2, 1] }}
      />
    </svg>
  );
}

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
        const color = item.trend === "up" ? "#4edea3" : "#ff8a99";
        return (
          <motion.article
            key={item.label}
            className="kpi"
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" }
            }}
            transition={{ duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="kpi-label">
              <span className="kpi-spark" />
              {item.label}
            </div>
            <motion.div
              className="kpi-val tabular-nums bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <AnimatedCounter
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                decimals={item.decimals}
              />
            </motion.div>
            <div className="mt-2 flex items-end justify-between gap-3">
              <div className={`kpi-delta ${item.trend === "up" ? "up" : "down"}`}>
                <Icon size={12} />
                {item.delta} 30d
              </div>
              <div className="w-[60%] max-w-[120px]">
                <MicroSpark values={item.series} color={color} />
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.section>
  );
}
