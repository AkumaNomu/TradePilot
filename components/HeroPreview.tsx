"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const easeOut = [0.2, 0.9, 0.2, 1] as const;

const kpis = [
  { label: "Pipeline", value: "$8.42M", delta: "+12.8%" },
  { label: "Lead Score", value: "92 / 100", delta: "+4.1%" },
  { label: "Conversion", value: "18.9%", delta: "+2.1%" }
];

const sparkline = [42, 48, 44, 56, 52, 64, 58, 72, 68, 80, 76, 88];

function Sparkline() {
  const max = Math.max(...sparkline);
  const min = Math.min(...sparkline);
  const range = max - min || 1;
  const w = 380;
  const h = 96;
  const stepX = w / (sparkline.length - 1);
  const points = sparkline.map((v, i) => {
    const x = i * stepX;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return [x, y] as const;
  });

  const path = points
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");
  const fillPath = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hp-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hp-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#adc6ff" />
          <stop offset="60%" stopColor="#4cd7f6" />
          <stop offset="100%" stopColor="#4edea3" />
        </linearGradient>
      </defs>
      <motion.path
        d={fillPath}
        fill="url(#hp-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
      <motion.path
        d={path}
        stroke="url(#hp-stroke)"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: easeOut, delay: 0.7 }}
      />
      {points.map(([x, y], i) =>
        i === points.length - 1 ? (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={3}
            fill="#4cd7f6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.0, ease: easeOut }}
            style={{ filter: "drop-shadow(0 0 8px rgba(76,215,246,0.9))" }}
          />
        ) : null
      )}
    </svg>
  );
}

export function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeOut, delay: 0.6 }}
      className="relative mt-20 w-full max-w-5xl"
    >
      <div className="absolute inset-x-12 -top-6 h-12 rounded-full bg-gradient-to-r from-transparent via-secondary/30 to-transparent blur-2xl" />

      <div
        className="glass-panel relative overflow-hidden rounded-md p-3 md:p-4"
        style={{ boxShadow: "0 40px 120px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-3 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-tertiary/60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-tertiary" />
            </span>
            <span className="font-body text-label-sm uppercase">tradepilot.app/dashboard</span>
          </div>
          <span className="font-body text-label-sm uppercase text-on-surface-variant">Live</span>
        </div>

        <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-[1.6fr_1fr]">
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-body text-label-sm uppercase text-on-surface-variant">Pipeline Momentum</p>
                <p className="mt-1 font-headline text-2xl text-white">$8.42M</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 font-body text-label-sm uppercase text-tertiary">
                <ArrowUpRight size={11} />
                12.8%
              </span>
            </div>
            <div className="mt-5 h-24">
              <Sparkline />
            </div>
            <div className="mt-3 flex items-center justify-between font-body text-label-sm uppercase text-on-surface-variant">
              <span>Jan</span>
              <span>Apr</span>
              <span>Jul</span>
              <span>Oct</span>
              <span>Dec</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: easeOut, delay: 1.0 + i * 0.1 }}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <p className="font-body text-label-sm uppercase text-on-surface-variant">{k.label}</p>
                <p className="mt-1.5 font-headline text-xl text-white">{k.value}</p>
                <p className="mt-0.5 font-body text-label-sm uppercase text-tertiary">{k.delta}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
