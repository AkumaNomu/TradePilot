"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, BrainCircuit, CheckCircle2, Database, FileUp, ArrowRight, RotateCcw, Sparkles, Table2 } from "lucide-react";
import { MotionItem, MotionReveal } from "@/components/MotionPrimitives";
import { LinkButton } from "@/components/Button";

type DemoStep = "upload" | "model" | "insights";
type UploadState = "idle" | "uploading" | "done";

const mockFiles = [
  { name: "crm_export.csv", size: "12.4 MB" },
  { name: "web_events.jsonl", size: "48.1 MB" },
  { name: "intent_signals.parquet", size: "96.7 MB" }
];

const metrics = [
  { label: "Rows ingested", value: "2,417,982" },
  { label: "Features built", value: "184" },
  { label: "Anomalies flagged", value: "37" },
  { label: "Confidence", value: "0.91" }
];

const matrixCols = ["Account", "Score", "Segment", "Risk", "Insight"];
const matrixRows = [
  ["Northwind", "0.87", "High value", "Low", "Pricing intent rising"],
  ["Contoso", "0.74", "Growth", "Med", "Champion engaged (3 touches)"],
  ["Fabrikam", "0.69", "Mid-market", "Low", "Close window: 10-14 days"],
  ["Adventure", "0.58", "SMB", "High", "Budget friction detected"],
  ["Tailspin", "0.53", "SMB", "Med", "ICP mismatch: industry signal"]
];

const sparkSeries = [18, 28, 24, 35, 42, 38, 55, 61, 58, 66, 72, 69, 78, 83, 81, 90];

function seriesToPath(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 84 - 8;
    return [x, y] as const;
  });
  return pts.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
}

export function DemoSection() {
  const [step, setStep] = useState<DemoStep>("upload");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (step !== "upload") return;
    if (uploadState !== "uploading") return;

    const interval = window.setInterval(() => {
      setUploadProgress((p) => {
        const next = Math.min(100, p + (p < 62 ? 7 : 3));
        return next;
      });
    }, 110);

    const finish = window.setTimeout(() => {
      window.clearInterval(interval);
      setUploadProgress(100);
      setUploadState("done");
      setToast("Data uploaded. Starting model run...");
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = window.setTimeout(() => setToast(null), 2200);
      window.setTimeout(() => setStep("model"), 520);
    }, 1550);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(finish);
    };
  }, [step, uploadState]);

  useEffect(() => {
    if (step !== "model") return;
    const id = window.setInterval(() => setActiveMetric((v) => (v + 1) % metrics.length), 1300);
    return () => window.clearInterval(id);
  }, [step]);

  const modelProgress = useMemo(() => {
    if (step === "upload") return Math.max(6, uploadProgress * 0.55);
    if (step === "insights") return 100;
    return 72 + activeMetric * 7;
  }, [step, uploadProgress, activeMetric]);

  function reset() {
    setStep("upload");
    setUploadState("idle");
    setUploadProgress(0);
    setActiveMetric(0);
    setToast(null);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = null;
  }

  function beginUpload() {
    setUploadState("uploading");
    setUploadProgress(0);
  }

  return (
    <section id="demo" data-nav-section="demo" className="relative px-5 py-20 md:px-8 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-[30%] h-80 w-80 rounded-full bg-tertiary-container/20 blur-[140px]" />
        <div className="absolute bottom-[14%] right-[8%] h-96 w-96 rounded-full bg-secondary/10 blur-[160px]" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <MotionItem>
          <p className="font-headline text-label-sm uppercase tracking-[0.18em] text-secondary">Interactive demo</p>
        </MotionItem>
        <MotionReveal delay={0.12}>
          <h2 className="mt-5 font-headline text-headline-lg text-white">
            Simulate ingestion. Watch the model work.{" "}
            <span className="neon-text-glow bg-gradient-to-r from-tertiary via-secondary to-primary bg-clip-text text-transparent">
              Inspect results in a matrix
            </span>
            .
          </h2>
        </MotionReveal>
        <MotionReveal delay={0.22}>
          <p className="mt-6 max-w-3xl text-body-md text-on-surface-variant">
            Fake-but-faithful: ingestion, streaming feature builds, model scoring, then decision-ready outputs.
          </p>
        </MotionReveal>
        <MotionReveal delay={0.32}>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <LinkButton href="#waitlist">Join the waitlist</LinkButton>
            <LinkButton href="#platform" variant="secondary">
              See the platform
            </LinkButton>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.18}>
          <div className="mt-12 gradient-border glass-panel relative h-[760px] overflow-hidden rounded-[2rem] p-5 md:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(78,222,163,0.16),transparent_34rem)]" />
            <div className="absolute inset-0 opacity-70 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tertiary-container/20 text-tertiary shadow-green-glow">
                    <Sparkles size={20} />
                  </span>
                  <div>
                    <p className="font-headline text-label-sm uppercase tracking-[0.18em] text-slate-300">TradePilot Demo</p>
                    <p className="mt-1 font-headline text-lg font-bold text-white">Revenue Intelligence Dashboard</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.06]"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("insights")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.06]"
                  >
                    Skip <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="glass-panel rounded-2xl p-4 md:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-slate-300">Pipeline</p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                      <span className={step === "upload" ? "text-white" : ""}>Ingest</span>
                      <span className="text-white/20">/</span>
                      <span className={step === "model" ? "text-white" : ""}>Model</span>
                      <span className="text-white/20">/</span>
                      <span className={step === "insights" ? "text-white" : ""}>Insights</span>
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] p-1">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary"
                      initial={false}
                      animate={{ width: `${modelProgress}%` }}
                      transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Database size={14} className="text-secondary" /> Sources connected
                    </span>
                    <span>
                      Status:{" "}
                      <span className="text-white">
                        {step === "upload"
                          ? uploadState === "done"
                            ? "Ingestion complete"
                            : uploadState === "uploading"
                              ? `Uploading (${Math.round(uploadProgress)}%)`
                              : "Waiting for upload"
                          : step === "model"
                            ? "Model analyzing"
                            : "Insights ready"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-4">
                  <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-slate-300">Output</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Recommendations</span>
                    <span className="font-headline text-lg font-bold text-white">{step === "insights" ? "128" : step === "model" ? "64" : "0"}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Alerts</span>
                    <span className="font-headline text-lg font-bold text-white">{step === "insights" ? "37" : step === "model" ? "12" : "0"}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Confidence</span>
                    <span className="font-headline text-lg font-bold text-white">{step === "upload" ? "--" : "0.91"}</span>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 p-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                        <Activity size={14} className="text-tertiary" /> Signal rate
                      </span>
                      <span className="font-headline text-sm font-bold text-white">{step === "upload" ? "--" : "2.1k/min"}</span>
                    </div>
                    <svg className="mt-3 h-10 w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path
                        d={seriesToPath(sparkSeries)}
                        fill="none"
                        stroke="rgba(76,215,246,0.95)"
                        strokeWidth="3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: step === "upload" ? 0 : 1, opacity: step === "upload" ? 0 : 1 }}
                        transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid flex-1 gap-4 overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
                <div className="glass-panel min-h-0 rounded-2xl p-5">
                  <div className="h-full overflow-auto pr-1">
                    <AnimatePresence mode="wait">
                      {step === "upload" ? (
                        <motion.div
                          key="upload"
                          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                          transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-container/15 text-primary shadow-glow">
                                <FileUp size={18} />
                              </span>
                              <div>
                                <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">Upload data</p>
                                <p className="mt-1 text-sm text-on-surface-variant">Click once to simulate ingestion and start the pipeline.</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              ref={uploadButtonRef}
                              onClick={() => {
                                if (uploadState !== "idle") return;
                                beginUpload();
                              }}
                              className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.06]"
                            >
                              Simulate upload
                            </button>
                          </div>

                          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-slate-300">Sample inputs</p>
                              {uploadState === "uploading" ? (
                                <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Uploading ({Math.round(uploadProgress)}%)</span>
                              ) : uploadState === "done" ? (
                                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-tertiary">
                                  <CheckCircle2 size={14} /> Uploaded
                                </span>
                              ) : null}
                            </div>

                            <div className="mt-4 space-y-3">
                              {mockFiles.map((file) => (
                                <button
                                  key={file.name}
                                  type="button"
                                  onClick={() => {
                                    if (uploadState !== "idle") return;
                                    beginUpload();
                                  }}
                                  className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:border-secondary/30 hover:bg-white/[0.06]"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-secondary shadow-cyan-glow">
                                      <Database size={16} />
                                    </span>
                                    <div>
                                      <p className="font-headline text-sm font-bold text-white">{file.name}</p>
                                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{file.size}</p>
                                    </div>
                                  </div>
                                  <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Upload</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ) : step === "model" ? (
                        <motion.div
                          key="model"
                          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                          transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-tertiary-container/20 text-tertiary shadow-green-glow">
                                <BrainCircuit size={18} />
                              </span>
                              <div>
                                <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">Model at work</p>
                                <p className="mt-1 text-sm text-on-surface-variant">Streaming feature builds, scoring, and anomaly detection.</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setStep("insights")}
                              className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.06]"
                            >
                              Show results
                            </button>
                          </div>

                          <div className="mt-5 grid gap-3 md:grid-cols-2">
                            {metrics.map((m, idx) => {
                              const isActive = idx === activeMetric;
                              return (
                                <button
                                  key={m.label}
                                  type="button"
                                  onClick={() => setActiveMetric(idx)}
                                  className={
                                    isActive
                                      ? "glass-panel rounded-2xl border border-secondary/30 bg-white/[0.04] p-4 text-left shadow-cyan-glow transition"
                                      : "glass-panel rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:bg-white/[0.06]"
                                  }
                                >
                                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{m.label}</p>
                                  <p className="mt-2 font-headline text-2xl font-bold text-white">{m.value}</p>
                                  <div className="mt-4 h-2 overflow-hidden rounded-full border border-white/10 bg-slate-950/40 p-[2px]">
                                    <motion.div
                                      className="h-full rounded-full bg-gradient-to-r from-secondary to-tertiary"
                                      initial={false}
                                      animate={{ width: isActive ? "100%" : "42%" }}
                                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                                    />
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-slate-300">Live analysis</p>
                              <span className="text-xs uppercase tracking-[0.16em] text-slate-400">Streaming</span>
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              {["Joining sources", "Normalizing fields", "Building features", "Scoring accounts", "Flagging anomalies", "Ranking insights"].map((label, idx) => (
                                <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                  <span className="text-sm text-on-surface-variant">{label}</span>
                                  <motion.span className="h-2 w-16 overflow-hidden rounded-full bg-slate-950/50">
                                    <motion.span
                                      className="block h-full rounded-full bg-gradient-to-r from-tertiary via-secondary to-primary"
                                      initial={{ x: "-60%" }}
                                      animate={{ x: "60%" }}
                                      transition={{ duration: 0.9 + idx * 0.07, repeat: Infinity, ease: [0.2, 0.9, 0.2, 1] }}
                                    />
                                  </motion.span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
                              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                <p className="font-headline text-[11px] uppercase tracking-[0.18em] text-slate-300">Stream</p>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Vectors</p>
                              </div>
                              <div className="h-28 overflow-hidden px-4 py-3">
                                <motion.div
                                  initial={{ y: 0 }}
                                  animate={{ y: -72 }}
                                  transition={{ duration: 2.8, ease: "linear", repeat: Infinity }}
                                  className="space-y-2"
                                >
                                  {Array.from({ length: 18 }).map((_, i) => (
                                    <div key={i} className="flex items-center justify-between gap-3 text-xs text-on-surface-variant">
                                      <span className="font-mono text-[11px] text-slate-400">{`evt_${(1042 + i).toString(16)}`}</span>
                                      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px]">
                                        {`vec=[${(Math.random() * 0.9 + 0.05).toFixed(2)}, ${(Math.random() * 0.9 + 0.05).toFixed(2)}, ${(Math.random() * 0.9 + 0.05).toFixed(2)}…]`}
                                      </span>
                                      <span className="font-mono text-[11px] text-tertiary">ok</span>
                                    </div>
                                  ))}
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="insights"
                          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                          transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/15 text-secondary shadow-cyan-glow">
                                <Table2 size={18} />
                              </span>
                              <div>
                                <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">Results matrix</p>
                                <p className="mt-1 text-sm text-on-surface-variant">Decision-ready output: scores, risks, and key insights.</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={reset}
                              className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.06]"
                            >
                              Run again
                            </button>
                          </div>

                          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35">
                            <div className="grid grid-cols-5 gap-px bg-white/10">
                              {matrixCols.map((c) => (
                                <div key={c} className="bg-slate-950/50 px-3 py-3">
                                  <p className="font-headline text-[11px] uppercase tracking-[0.18em] text-slate-300">{c}</p>
                                </div>
                              ))}
                            </div>

                            <div className="divide-y divide-white/10">
                              {matrixRows.map((row) => (
                                <button
                                  key={row[0]}
                                  type="button"
                                  className="grid w-full grid-cols-5 items-center gap-px bg-white/0 text-left transition hover:bg-white/[0.03]"
                                >
                                  {row.map((cell, idx) => (
                                    <div key={`${row[0]}-${idx}`} className="px-3 py-3">
                                      <p className={idx === 0 ? "font-headline text-sm font-bold text-white" : "text-sm text-on-surface-variant"}>
                                        {cell}
                                      </p>
                                    </div>
                                  ))}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                              <p className="font-headline text-[11px] uppercase tracking-[0.18em] text-slate-300">Score distribution</p>
                              <div className="mt-4 flex h-20 items-end gap-2">
                                {[22, 35, 48, 64, 72, 81, 58, 42].map((v, i) => (
                                  <motion.div
                                    key={i}
                                    className="flex-1 rounded-t-xl bg-gradient-to-t from-secondary/15 to-secondary/80 shadow-cyan-glow"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${v}%` }}
                                    transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.05 + i * 0.03 }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                              <p className="font-headline text-[11px] uppercase tracking-[0.18em] text-slate-300">Top segments</p>
                              <div className="mt-4 space-y-3">
                                {[
                                  { label: "High value", pct: 38, tone: "from-tertiary/25 to-tertiary" },
                                  { label: "Growth", pct: 27, tone: "from-secondary/25 to-secondary" },
                                  { label: "Mid-market", pct: 21, tone: "from-primary-container/25 to-primary-container" },
                                  { label: "SMB", pct: 14, tone: "from-white/10 to-white/40" }
                                ].map((s, i) => (
                                  <div key={s.label} className="flex items-center gap-3">
                                    <span className="w-24 text-xs uppercase tracking-[0.16em] text-slate-400">{s.label}</span>
                                    <div className="h-2 flex-1 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
                                      <motion.div
                                        className={`h-full rounded-full bg-gradient-to-r ${s.tone}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${s.pct}%` }}
                                        transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.08 + i * 0.04 }}
                                      />
                                    </div>
                                    <span className="w-10 text-right font-headline text-xs text-white">{s.pct}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="glass-panel min-h-0 rounded-2xl p-5">
                  <p className="font-headline text-label-sm uppercase tracking-[0.16em] text-slate-300">Controls</p>
                  <div className="mt-4 grid gap-3">
                    {([
                      { id: "upload", label: "Upload", icon: FileUp, desc: "Bring data in" },
                      { id: "model", label: "Model", icon: BrainCircuit, desc: "Analyze signals" },
                      { id: "insights", label: "Matrix", icon: Table2, desc: "Review results" }
                    ] as const).map((item) => {
                      const Icon = item.icon;
                      const isActive = step === item.id;
                      const isDisabled = item.id !== "upload" && uploadState !== "done";
                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setStep(item.id)}
                          className={
                            isDisabled
                              ? "flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left opacity-50"
                              : isActive
                                ? "flex items-center justify-between rounded-2xl border border-secondary/30 bg-white/[0.04] px-4 py-3 text-left shadow-cyan-glow transition"
                                : "flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.06]"
                          }
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={
                                isActive
                                  ? "flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/15 text-secondary shadow-cyan-glow"
                                  : "flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-container/12 text-primary"
                              }
                            >
                              <Icon size={18} />
                            </span>
                            <div>
                              <p className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">{item.label}</p>
                              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{item.desc}</p>
                            </div>
                          </div>
                          {isActive ? <CheckCircle2 size={18} className="text-tertiary" /> : <ArrowRight size={16} className="text-slate-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {toast ? (
                  <motion.div
                    className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2"
                    initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    transition={{ duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
                  >
                    <div className="glass-panel rounded-full px-5 py-3">
                      <p className="font-headline text-xs uppercase tracking-[0.16em] text-white">{toast}</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
