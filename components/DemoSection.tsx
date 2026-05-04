"use client";

import { useEffect, useState } from "react";
import { MotionItem, MotionReveal, MotionStagger } from "@/components/MotionPrimitives";
import { LinkButton } from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";

const demoFrames = [
  {
    title: "Ingest",
    caption: "CRM, web behavior, intent signals",
    left: ["CRM: HubSpot", "Visits: 4,112", "Intent: pricing page", "Firmographics: Mid-market"],
    right: ["Normalize", "Enrich", "Join", "Validate"],
    tone: "from-blue-400/20 via-slate-950/40 to-slate-950/20"
  },
  {
    title: "Model",
    caption: "Feature extraction and scoring",
    left: ["Lag features", "Recency", "Engagement", "Deal velocity"],
    right: ["Lead score: 0.87", "Segment: High value", "Risk: Low", "Next best action"],
    tone: "from-cyan-400/20 via-slate-950/40 to-slate-950/20"
  },
  {
    title: "Insight",
    caption: "Clear recommendation for the team",
    left: ["Account: Northwind", "Buying committee: 3", "Timing: 7 days"],
    right: ["Action: book demo", "Channel: email + call", "Message: ROI + timeline", "Confidence: 91%"],
    tone: "from-emerald-400/20 via-slate-950/40 to-slate-950/20"
  }
];

export function DemoSection() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setFrame((v) => (v + 1) % demoFrames.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  const current = demoFrames[frame];

  return (
    <section id="demo" className="relative px-5 py-20 md:px-8 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-[30%] h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute bottom-[14%] right-[8%] h-96 w-96 rounded-full bg-tertiary-container/20 blur-[140px]" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <MotionItem>
            <p className="font-headline text-label-sm uppercase tracking-[0.18em] text-secondary">Animated demo</p>
          </MotionItem>
          <MotionReveal delay={0.12}>
            <h2 className="mt-5 font-headline text-headline-lg text-white">
              Watch data become{" "}
              <span className="neon-text-glow bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                actionable insights
              </span>
              .
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.22}>
            <p className="mt-6 max-w-xl text-body-md text-on-surface-variant">
              TradePilot pulls signals from your stack, processes them in real time, and outputs recommendations your team can act on immediately.
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
        </div>

        <MotionReveal delay={0.18}>
          <div className="gradient-border glass-panel relative overflow-hidden rounded-[2rem] p-6 md:p-7">
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,142,255,0.22),transparent_32rem)]`} />
            <div className={`absolute inset-0 bg-gradient-to-br ${current.tone}`} />
            <div className="absolute inset-0 opacity-70 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.title}
                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                  >
                    <p className="font-headline text-label-sm uppercase tracking-[0.18em] text-secondary">Data → Insight</p>
                    <p className="mt-3 font-headline text-3xl font-black tracking-[-0.06em] text-white">{current.title}</p>
                    <p className="mt-2 text-sm text-on-surface-variant">{current.caption}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="hidden md:flex gap-2">
                  {demoFrames.map((_, idx) => (
                    <span
                      key={idx}
                      className={[
                        "h-2 w-10 rounded-full transition",
                        idx === frame ? "bg-secondary shadow-[0_0_14px_rgba(76,215,246,0.55)]" : "bg-white/10"
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current.title}-lists`}
                  initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
                  className="mt-7 grid gap-5 md:grid-cols-2"
                >
                  <div className="glass-panel rounded-2xl p-5">
                    <p className="font-headline text-label-sm uppercase tracking-[0.14em] text-slate-300">Signals</p>
                    <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
                      {current.left.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-panel rounded-2xl p-5">
                    <p className="font-headline text-label-sm uppercase tracking-[0.14em] text-slate-300">Output</p>
                    <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
                      {current.right.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Auto-advances every 2.6s</p>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.06]"
                    onClick={() => setFrame((v) => (v + demoFrames.length - 1) % demoFrames.length)}
                    type="button"
                  >
                    Prev
                  </button>
                  <button
                    className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.06]"
                    onClick={() => setFrame((v) => (v + 1) % demoFrames.length)}
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
