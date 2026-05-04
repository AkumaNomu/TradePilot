"use client";

import { intelligenceMetrics } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

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
  return (
    <section id="intelligence" className="px-5 py-section-gap md:px-8">
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
                      {["Daily", "Weekly", "Monthly"].map((period) => (
                        <span
                          key={period}
                          className={
                            period === "Weekly"
                              ? "rounded-full bg-primary-container px-3 py-2 font-headline text-label-sm uppercase text-white shadow-glow"
                              : "rounded-full border border-white/10 bg-surface-container px-3 py-2 font-headline text-label-sm uppercase text-on-surface"
                          }
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-8 flex h-72 items-end justify-between gap-2 md:gap-4">
                    <div className="absolute inset-0 rounded-2xl border-t border-white/5 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {bars.map((bar) => (
                      <div key={bar.label} className="relative z-10 flex h-full flex-1 flex-col justify-end gap-3">
                        <div
                          style={{ height: bar.height }}
                          className={
                            bar.active
                              ? "rounded-t-xl border-t border-secondary bg-gradient-to-t from-secondary/20 to-secondary/80 shadow-cyan-glow"
                              : "rounded-t-xl bg-surface-container"
                          }
                        />
                        <span className="text-center text-xs uppercase tracking-[0.12em] text-on-surface-variant">
                          {bar.label}
                        </span>
                      </div>
                    ))}

                    <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path
                        d="M0 78 Q 20 58, 40 68 T 80 22 L 100 31"
                        fill="none"
                        stroke="rgba(78, 222, 163, 0.9)"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_8px_rgba(78,222,163,0.8)]"
                      />
                    </svg>
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
