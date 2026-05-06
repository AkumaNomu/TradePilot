"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Line, Radar as RadarChart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Database,
  FileUp,
  Gauge,
  LineChart,
  Radar as RadarIcon,
  Sparkles
} from "lucide-react";
import { MotionItem, MotionReveal } from "@/components/MotionPrimitives";
import {
  calcScore,
  confidence,
  clients,
  forecastSeries,
  marketRecommendations,
  markets,
  months,
  radarVector,
  rank,
  type Recommendation
} from "@/data/demo";
import { cn } from "@/lib/utils";

void ChartJS;

type DemoPhase = "upload" | "analyze" | "results";
const phaseOrder: DemoPhase[] = ["upload", "analyze", "results"];
const frameHeightClass = "h-[min(40rem,calc(100vh-12rem))]";

const uploads = [
  { name: "mkt_signals.csv", tone: "bg-secondary/80" },
  { name: "client_accounts.json", tone: "bg-primary/80" },
  { name: "distance_scores.parquet", tone: "bg-tertiary/80" }
];

const modelSignals = [
  "Normalizing market and client features",
  "Applying deterministic scoring model",
  "Ranking markets and clients by score",
  "Loading forecast and confidence intervals",
  "Mapping static recommendations to top markets"
];

function priorityTone(priority: Recommendation["priority"]) {
  if (priority === "HIGH") return "border-tertiary/35 bg-tertiary/10 text-tertiary";
  if (priority === "MED") return "border-secondary/35 bg-secondary/10 text-secondary";
  return "border-white/15 bg-white/[0.04] text-white/75";
}

export function DemoSection() {
  const rankedMarkets = useMemo(() => rank(markets), []);
  const rankedClients = useMemo(() => rank(clients), []);
  const selectedMarket = rankedMarkets[0];
  const selectedClient = rankedClients[0];
  const selectedMarketRecs = marketRecommendations[selectedMarket.id] ?? [];

  const [phase, setPhase] = useState<DemoPhase>("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeSignal, setActiveSignal] = useState(0);
  const [loopTick, setLoopTick] = useState(0);

  function setPhaseState(nextPhase: DemoPhase) {
    setPhase(nextPhase);
    if (nextPhase === "upload") {
      setUploadProgress(0);
      setAnalysisProgress(0);
      setActiveSignal(0);
    }
    if (nextPhase === "analyze") {
      setUploadProgress(100);
      setAnalysisProgress(0);
      setActiveSignal(0);
    }
    if (nextPhase === "results") {
      setUploadProgress(100);
      setAnalysisProgress(100);
      setActiveSignal(modelSignals.length - 1);
    }
  }

  useEffect(() => {
    setPhaseState("upload");

    const uploadTimer = window.setInterval(() => {
      setUploadProgress((current) => {
        const next = Math.min(100, current + (current < 70 ? 8 : 4));
        if (next === 100) {
          window.clearInterval(uploadTimer);
          window.setTimeout(() => setPhase("analyze"), 300);
        }
        return next;
      });
    }, 120);

    return () => window.clearInterval(uploadTimer);
  }, [loopTick]);

  useEffect(() => {
    if (phase !== "analyze") return;

    const signalTimer = window.setInterval(() => {
      setActiveSignal((current) => (current + 1) % modelSignals.length);
    }, 760);

    const progressTimer = window.setInterval(() => {
      setAnalysisProgress((current) => {
        const next = Math.min(100, current + (current < 78 ? 6 : 3));
        if (next === 100) {
          window.clearInterval(progressTimer);
          window.clearInterval(signalTimer);
          window.setTimeout(() => setPhase("results"), 420);
        }
        return next;
      });
    }, 140);

    return () => {
      window.clearInterval(signalTimer);
      window.clearInterval(progressTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "results") return;
    const loopTimer = window.setTimeout(() => {
      setLoopTick((current) => current + 1);
    }, 4200);
    return () => window.clearTimeout(loopTimer);
  }, [phase]);

  const lineData = useMemo(() => {
    const lower = forecastSeries.forecast.map((value, index) =>
      value == null ? null : confidence[Math.max(0, index - 5)]?.lower ?? null
    );
    const upper = forecastSeries.forecast.map((value, index) =>
      value == null ? null : confidence[Math.max(0, index - 5)]?.upper ?? null
    );

    return {
      labels: months,
      datasets: [
        {
          label: "Lower",
          data: lower,
          borderColor: "rgba(0,0,0,0)",
          backgroundColor: "rgba(76, 215, 246, 0.08)",
          pointRadius: 0,
          fill: false,
          tension: 0.35
        },
        {
          label: "Upper",
          data: upper,
          borderColor: "rgba(0,0,0,0)",
          backgroundColor: "rgba(76, 215, 246, 0.08)",
          pointRadius: 0,
          fill: "-1",
          tension: 0.35
        },
        {
          label: "Actual",
          data: forecastSeries.actual,
          borderColor: "rgba(173, 198, 255, 0.9)",
          pointRadius: 2,
          borderWidth: 2,
          tension: 0.35
        },
        {
          label: "Forecast",
          data: forecastSeries.forecast,
          borderColor: "rgba(76, 215, 246, 0.95)",
          pointRadius: 2,
          borderWidth: 2,
          borderDash: [6, 6],
          tension: 0.35
        }
      ]
    };
  }, []);

  const radarData = useMemo(() => {
    const score = calcScore(selectedMarket);
    return {
      labels: ["Demand", "Access", "Risk Adj", "Distance", "Score"],
      datasets: [
        {
          data: radarVector({ ...selectedMarket, score }),
          borderColor: "rgba(78, 222, 163, 0.85)",
          backgroundColor: "rgba(78, 222, 163, 0.12)",
          pointBackgroundColor: "rgba(76, 215, 246, 0.95)",
          pointRadius: 2,
          borderWidth: 2
        }
      ]
    };
  }, [selectedMarket]);

  const lineOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: "index" as const, intersect: false } },
      scales: {
        x: { grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "rgba(220,225,251,0.7)" } },
        y: { grid: { color: "rgba(255,255,255,0.06)" }, ticks: { color: "rgba(220,225,251,0.7)" } }
      }
    }),
    []
  );

  const radarOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: 100,
          grid: { color: "rgba(255,255,255,0.06)" },
          angleLines: { color: "rgba(255,255,255,0.08)" },
          pointLabels: { color: "rgba(220,225,251,0.72)", font: { size: 11 } },
          ticks: { display: false }
        }
      }
    }),
    []
  );

  const summaryMetrics = [
    { label: "Top market", value: `${selectedMarket.name} ${selectedMarket.score}` },
    { label: "Top client", value: `${selectedClient.name} ${selectedClient.score}` },
    { label: "Forecast confidence", value: "91%" },
    { label: "Signals processed", value: "2.4M" }
  ];

  const currentPhaseIndex = phaseOrder.indexOf(phase);

  return (
    <section
      id="demo"
      data-nav-section="demo"
      className="relative flex min-h-[calc(100vh-5rem)] items-center px-5 py-20 md:px-8 lg:py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-[30%] h-80 w-80 rounded-full bg-tertiary-container/10 blur-[150px]" />
        <div className="absolute bottom-[14%] right-[8%] h-96 w-96 rounded-full bg-secondary/8 blur-[180px]" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <MotionItem>
          <p className="font-headline text-label-sm uppercase tracking-[0.18em] text-secondary">Demo</p>
        </MotionItem>
        <MotionReveal delay={0.08}>
          <h2 className="mt-5 max-w-4xl font-headline text-headline-lg text-white">
            A full frontend simulation of upload, analysis, and scored results.
          </h2>
        </MotionReveal>

        <div className={`mt-10 grid ${frameHeightClass} gap-6 lg:grid-cols-[0.34fr_0.66fr]`}>
          <motion.div
            className="glass-panel gradient-border flex h-full flex-col rounded-2xl p-6"
            initial={{ opacity: 0, x: -14, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-slate-300">Session</p>
            <div className="mt-6 space-y-3">
              {[
                { id: "upload", label: "Upload", icon: FileUp },
                { id: "analyze", label: "Analyze", icon: BrainCircuit },
                { id: "results", label: "Results", icon: BadgeCheck }
              ].map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPhaseIndex === index;
                const isComplete = currentPhaseIndex > index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPhaseState(item.id as DemoPhase)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition",
                      isActive
                        ? "border-secondary/30 bg-white/[0.05] shadow-cyan-glow"
                        : isComplete
                          ? "border-tertiary/20 bg-tertiary/8"
                          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        isActive
                          ? "bg-secondary/15 text-secondary"
                          : isComplete
                            ? "bg-tertiary/15 text-tertiary"
                            : "bg-white/[0.04] text-white/60"
                      )}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">{item.label}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                        {isComplete ? "Completed" : isActive ? "Running" : "Waiting"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-slate-300">Spec mode</p>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                Frontend-only deterministic logic. Static datasets, precomputed forecast values, and hardcoded recommendations.
              </p>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={() => setLoopTick((current) => current + 1)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-headline text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-white/[0.06]"
              >
                Restart loop
              </button>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel gradient-border h-full rounded-2xl p-6"
            initial={{ opacity: 0, x: 14, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1], delay: 0.04 }}
          >
            {phase !== "results" ? (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary shadow-cyan-glow">
                      {phase === "upload" ? <Database size={20} /> : <BrainCircuit size={20} />}
                    </span>
                    <div>
                      <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">
                        {phase === "upload" ? "Data upload" : "Model analysis"}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                        {phase === "upload" ? "Static input arrays loading" : modelSignals[activeSignal]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-white">
                        {phase === "upload" ? "Upload progress" : "Analysis progress"}
                      </p>
                      <p className="font-headline text-sm font-bold text-white">
                        {phase === "upload" ? uploadProgress : analysisProgress}%
                      </p>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-secondary via-primary to-tertiary"
                        animate={{ width: `${phase === "upload" ? uploadProgress : analysisProgress}%` }}
                        transition={{ duration: 0.18, ease: "linear" }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {(phase === "upload" ? uploads : modelSignals).map((item, index) => {
                      const label = typeof item === "string" ? item : item.name;
                      const isComplete =
                        phase === "upload"
                          ? uploadProgress >= (index + 1) * 28
                          : analysisProgress >= (index + 1) * 18;

                      return (
                        <motion.div
                          key={label}
                          className={cn(
                            "flex items-center justify-between rounded-xl border px-4 py-3 transition",
                            isComplete ? "border-secondary/25 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]"
                          )}
                          animate={{ opacity: isComplete ? 1 : 0.55, scale: isComplete ? 1 : 0.985 }}
                          transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "h-2.5 w-2.5 rounded-full",
                                phase === "upload" ? uploads[index]?.tone ?? "bg-secondary/80" : "bg-secondary/80"
                              )}
                            />
                            <p className="font-headline text-xs font-bold uppercase tracking-[0.12em] text-white">{label}</p>
                          </div>
                          <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                            {isComplete ? "Done" : phase === "upload" ? "Streaming" : index === activeSignal ? "Running" : "Queued"}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Rows", value: "2,417,982" },
                    { label: "Features", value: "4 core inputs" },
                    { label: "Mode", value: "Deterministic" }
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
                      <p className="font-headline text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{metric.label}</p>
                      <p className="mt-2 font-headline text-lg font-bold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid h-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="min-h-0 space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Gauge size={18} className="text-secondary" />
                      <p className="font-headline text-xs font-bold uppercase tracking-[0.16em] text-white">Ranked outputs</p>
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        {rankedMarkets.slice(0, 3).map((market) => (
                          <div key={market.id} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                            <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">{market.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-on-surface-variant">{market.region}</p>
                            <p className="mt-2 font-headline text-lg font-black text-secondary">{market.score}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {rankedClients.slice(0, 3).map((client) => (
                          <div key={client.id} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                            <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">{client.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-on-surface-variant">{client.segment}</p>
                            <p className="mt-2 font-headline text-lg font-black text-primary">{client.score}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="flex items-center gap-2">
                        <LineChart size={18} className="text-secondary" />
                        <p className="font-headline text-xs font-bold uppercase tracking-[0.16em] text-white">Forecast</p>
                      </div>
                      <div className="mt-4 h-52">
                        <Line data={lineData} options={lineOptions} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="flex items-center gap-2">
                        <RadarIcon size={18} className="text-tertiary" />
                        <p className="font-headline text-xs font-bold uppercase tracking-[0.16em] text-white">Radar</p>
                      </div>
                      <div className="mt-4 h-52">
                        <RadarChart data={radarData} options={radarOptions} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="min-h-0 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/15 text-secondary shadow-cyan-glow">
                      <BrainCircuit size={18} />
                    </span>
                    <div>
                      <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">Recommendations</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-on-surface-variant">Rule-based and static</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {summaryMetrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
                        <p className="font-headline text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">{metric.label}</p>
                        <p className="mt-2 font-headline text-lg font-bold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  {selectedMarketRecs.map((rec) => (
                    <div key={rec.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-headline text-base font-bold text-white">{rec.title}</p>
                          <p className="mt-2 text-sm leading-6 text-on-surface-variant">{rec.insight}</p>
                        </div>
                        <span className={cn("rounded-full border px-3 py-1 font-headline text-[10px] font-black uppercase tracking-[0.2em]", priorityTone(rec.priority))}>
                          {rec.priority}
                        </span>
                      </div>
                      <div className="mt-4 space-y-2">
                        {rec.actions.map((action) => (
                          <div key={action} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-secondary/80" />
                            <p className="text-sm text-on-surface-variant">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-tertiary/10 text-tertiary">
                        <Sparkles size={18} />
                      </span>
                      <div>
                        <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">Client action</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-on-surface-variant">Static client-specific output</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                      <span className="font-headline font-bold text-white">{selectedClient.name}:</span> {selectedClient.action}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
