"use client";

import { useMemo, useState } from "react";
import { intelligenceMetrics } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";
import { motion, AnimatePresence } from "framer-motion";

const bars = [
  { label: "Mon", height: "34%" },
  { label: "Tue", height: "48%" },
  { label: "Wed", height: "43%" },
  { label: "Thu", height: "66%", active: true },
  { label: "Fri", height: "57%" },
  { label: "Sat", height: "88%", active: true },
  { label: "Sun", height: "73%" },
  { label: "Next", height: "63%" }
];

export function IntelligenceSection() {
  const [period, setPeriod] = useState<"Daily" | "Weekly" | "Monthly">("Weekly");
  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = bars.findIndex((b) => b.active);
    return idx >= 0 ? idx : 0;
  });

  const series = useMemo(() => {
    // Values are 0..100 for the SVG line, derived from the existing bar heights.
    const raw = bars.map((b) => Number.parseFloat(b.height));
    if (period === "Daily") return raw.map((v) => Math.max(8, Math.min(96, v - 8)));
    if (period === "Monthly") return raw.map((v, i) => Math.max(8, Math.min(96, v + (i % 2 === 0 ? 6 : -4))));
    return raw;
  }, [period]);

  const activeValue = series[activeIndex] ?? series[0] ?? 50;

  return (
    <section id="intelligence" data-nav-section="intelligence" className="px-5 py-section-gap md:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionItem>
          <div className="glass-panel gradient-border overflow-hidden rounded-[3rem] p-1">
            <div className="relative overflow-hidden rounded-[2.9rem] bg-surface-container-lowest p-6 md:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(76,215,246,.16),transparent_24rem)]" />

              <div className="relative z-10 grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
                <div>
                  <p className="font-headline text-label-md uppercase tracking-[0.22em] text-secondary">
                    Decision Dashboard
                  </p>
                  <h2 className="mt-4 font-headline text-headline-lg text-white">
                    Revenue trajectory, visible before the quarter closes.
                  </h2>
                  <p className="mt-5 text-body-lg text-on-surface-variant">
                    Real-time analysis compares pipeline movement against targets and exposes which conversion paths deserve attention first.
                  </p>

                  <MotionStagger className="mt-8 grid grid-cols-2 gap-3" staggerChildren={0.08}>
                    {intelligenceMetrics.map((metric) => (
                      <MotionItem key={metric.label}>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="font-headline text-2xl font-bold text-white">{metric.value}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-on-surface-variant">{metric.label}</p>
                          <p className="mt-3 font-headline text-label-md uppercase text-tertiary">{metric.delta}</p>
                        </div>
                      </MotionItem>
                    ))}
                  </MotionStagger>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-5">
                  <div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-headline text-headline-md text-white">Revenue Trajectory Vector</h3>
                      <p className="mt-2 text-body-sm text-on-surface-variant">Q3 pipeline performance vs target.</p>
                    </div>

                    <div className="flex gap-2">
                      {(["Daily", "Weekly", "Monthly"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPeriod(p)}
                          className={
                            p === period
                              ? "rounded-full bg-primary-container px-3 py-2 font-headline text-label-sm uppercase text-white shadow-glow"
                              : "rounded-full border border-white/10 bg-surface-container px-3 py-2 font-headline text-label-sm uppercase text-on-surface transition hover:bg-white/[0.06]"
                          }
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-8 flex h-72 items-end justify-between gap-2 md:gap-4">
                    <div className="absolute inset-0 rounded-2xl border-t border-white/5 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {bars.map((bar, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={bar.label}
                          type="button"
                          onMouseEnter={() => setActiveIndex(index)}
                          onFocus={() => setActiveIndex(index)}
                          onClick={() => setActiveIndex(index)}
                          className="relative z-10 flex h-full flex-1 flex-col justify-end gap-3 outline-none"
                          aria-label={`Select ${bar.label}`}
                        >
                          <motion.div
                            initial={false}
                            animate={{ height: series[index] ? `${series[index]}%` : bar.height }}
                            transition={{ type: "spring", stiffness: 260, damping: 26 }}
                            className={
                              isActive
                                ? "rounded-t-xl border-t border-secondary bg-gradient-to-t from-secondary/20 to-secondary/80 shadow-cyan-glow"
                                : "rounded-t-xl bg-surface-container"
                            }
                          />
                          <span className={isActive ? "text-center text-xs uppercase tracking-[0.12em] text-white" : "text-center text-xs uppercase tracking-[0.12em] text-on-surface-variant"}>
                            {bar.label}
                          </span>
                        </button>
                      );
                    })}

                    <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <motion.path
                        key={period}
                        d={`M0 ${100 - series[0]} Q 20 ${100 - series[2]}, 40 ${100 - series[3]} T 80 ${100 - series[5]} L 100 ${100 - series[7]}`}
                        fill="none"
                        stroke="rgba(78, 222, 163, 0.9)"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_8px_rgba(78,222,163,0.8)]"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
                      />
                      <motion.circle
                        key={`${period}-${activeIndex}`}
                        cx={(activeIndex / (bars.length - 1)) * 100}
                        cy={100 - activeValue}
                        r="2.4"
                        fill="rgba(76,215,246,0.95)"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                      />
                    </svg>

                    <div className="pointer-events-none absolute left-4 top-4 z-30">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${period}-${activeIndex}-tooltip`}
                          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -6, filter: "blur(8px)" }}
                          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
                          className="glass-panel inline-flex items-center gap-3 rounded-2xl px-4 py-3"
                        >
                          <span className="h-2 w-2 rounded-full bg-tertiary shadow-green-glow" />
                          <div>
                            <p className="font-headline text-label-sm uppercase tracking-[0.18em] text-slate-300">{period}</p>
                            <p className="font-headline text-lg font-bold text-white">
                              {bars[activeIndex]?.label}: {Math.round(activeValue)}%
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>
      </div>
    </section>
  );
}
