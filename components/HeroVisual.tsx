"use client";

import { Activity, Database, Gauge, LineChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const nodes = [
  { label: "CRM", icon: Database, className: "left-[8%] top-[18%]" },
  { label: "Intent", icon: Activity, className: "right-[10%] top-[12%]" },
  { label: "Score", icon: Gauge, className: "left-[14%] bottom-[16%]" },
  { label: "Forecast", icon: LineChart, className: "right-[12%] bottom-[18%]" }
];

export function HeroVisual() {
  return (
    <div className="gradient-border glass-panel relative min-h-[560px] overflow-hidden rounded-[2rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,142,255,0.22),transparent_30rem)]" />
      <div className="absolute inset-6 rounded-[1.6rem] border border-white/10 bg-slate-950/35" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <motion.svg
        className="absolute inset-0 h-full w-full opacity-80"
        viewBox="0 0 600 560"
        fill="none"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 0.8, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1], delay: 0.15 }}
      >
        <path d="M84 140 C190 70 335 88 506 112" stroke="url(#blueLine)" strokeWidth="1.2" />
        <path d="M108 442 C228 330 361 312 492 440" stroke="url(#greenLine)" strokeWidth="1.2" />
        <path d="M102 150 C220 230 328 300 502 440" stroke="rgba(76,215,246,.22)" strokeWidth="1" />
        <path d="M498 120 C388 230 262 340 104 440" stroke="rgba(173,198,255,.18)" strokeWidth="1" />
        <defs>
          <linearGradient id="blueLine" x1="80" y1="100" x2="520" y2="120">
            <stop stopColor="#adc6ff" stopOpacity=".05" />
            <stop offset=".5" stopColor="#4cd7f6" stopOpacity=".75" />
            <stop offset="1" stopColor="#4d8eff" stopOpacity=".08" />
          </linearGradient>
          <linearGradient id="greenLine" x1="90" y1="450" x2="510" y2="430">
            <stop stopColor="#4edea3" stopOpacity=".08" />
            <stop offset=".55" stopColor="#4edea3" stopOpacity=".75" />
            <stop offset="1" stopColor="#4cd7f6" stopOpacity=".08" />
          </linearGradient>
        </defs>
      </motion.svg>

      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            className={`absolute ${node.className}`}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1], delay: 0.2 + nodes.findIndex((n) => n.label === node.label) * 0.08 }}
          >
            <motion.div
              className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/15 text-secondary">
                <Icon size={18} />
              </span>
              <span className="font-headline text-label-md uppercase text-white">{node.label}</span>
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div
        className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/20 bg-slate-950/60 p-5 shadow-cyan-glow backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.95, ease: [0.2, 0.9, 0.2, 1], delay: 0.25 }}
      >
        <div className="aspect-square rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(76,215,246,.22),rgba(77,142,255,.08)_42%,transparent_68%)] p-8">
          <div className="flex h-full flex-col items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-center">
            <p className="font-headline text-label-sm uppercase tracking-[0.2em] text-secondary">AI Revenue Core</p>
            <p className="mt-3 font-headline text-5xl font-black tracking-[-0.08em] text-white">91%</p>
            <p className="mt-2 text-sm text-on-surface-variant">forecast confidence</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6 glass-panel flex items-center gap-4 rounded-2xl p-4"
        initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1], delay: 0.42 }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary text-secondary">
          <TrendingUp size={22} />
        </div>
        <div>
          <p className="font-headline text-label-sm uppercase text-on-surface-variant">Trajectory</p>
          <p className="font-headline text-2xl font-bold text-white">+24.8%</p>
        </div>
      </motion.div>
    </div>
  );
}
