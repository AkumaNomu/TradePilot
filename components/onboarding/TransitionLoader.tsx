"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { AnimatedText } from "@/components/AnimatedText";

type TransitionLoaderProps = {
  label?: string;
  caption?: string;
  variant?: "fixed" | "page";
};

const orbitDots = [
  { radius: 96, duration: 7, delay: 0, color: "bg-secondary" },
  { radius: 132, duration: 11, delay: 0.4, color: "bg-tertiary" },
  { radius: 168, duration: 14, delay: 0.8, color: "bg-primary" }
];

export function TransitionLoader({
  label = "Calibrating Intelligence",
  caption = "Synchronizing signal streams",
  variant = "fixed"
}: TransitionLoaderProps) {
  const positionClass =
    variant === "fixed"
      ? "fixed inset-0 z-[80]"
      : "relative min-h-screen w-full";

  return (
    <div
      className={`${positionClass} flex items-center justify-center overflow-hidden`}
      style={{
        background:
          "radial-gradient(circle at 18% 20%, rgba(0, 165, 114, 0.18), transparent 38rem), radial-gradient(circle at 82% 28%, rgba(76, 215, 246, 0.16), transparent 32rem), radial-gradient(circle at 50% 100%, rgba(77, 142, 255, 0.12), transparent 36rem), #050a18"
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[10%] top-[14%] h-[28rem] w-[28rem] rounded-full bg-primary-container/14 blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[6%] top-[20%] h-[22rem] w-[22rem] rounded-full bg-secondary/12 blur-[120px]"
          animate={{ x: [0, -24, 0], y: [0, 18, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-12%] left-[28%] h-[26rem] w-[26rem] rounded-full bg-tertiary-container/14 blur-[140px]"
          animate={{ x: [0, 18, 0], y: [0, -22, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(circle at 50% 50%, black 10%, transparent 70%)"
          }}
        />
      </div>

      <motion.svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 860"
        fill="none"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        <motion.path
          d="M120 360 C340 200 540 240 720 340 C900 440 1100 460 1320 300"
          stroke="url(#loaderSignalA)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0.75, 1, 1], opacity: [0, 0.7, 0.32, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M100 620 C320 490 520 540 720 440 C920 330 1120 360 1340 560"
          stroke="url(#loaderSignalB)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0.7, 1, 1], opacity: [0, 0.6, 0.26, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut", delay: 0.6 }}
        />
        <defs>
          <linearGradient id="loaderSignalA" x1="120" y1="320" x2="1320" y2="320">
            <stop stopColor="#4edea3" stopOpacity="0" />
            <stop offset="0.5" stopColor="#4cd7f6" stopOpacity="0.78" />
            <stop offset="1" stopColor="#adc6ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="loaderSignalB" x1="100" y1="540" x2="1340" y2="500">
            <stop stopColor="#adc6ff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#4edea3" stopOpacity="0.7" />
            <stop offset="1" stopColor="#4cd7f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        <div className="relative flex h-64 w-64 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-secondary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ borderStyle: "dashed" }}
          />
          <motion.span
            className="absolute inset-6 rounded-full border border-primary/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            style={{ borderStyle: "dashed" }}
          />
          <motion.span
            className="absolute inset-12 rounded-full border border-tertiary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            style={{ borderStyle: "dotted" }}
          />

          {orbitDots.map((dot) => (
            <motion.span
              key={dot.radius}
              className={`absolute h-2 w-2 rounded-full ${dot.color} shadow-cyan-glow`}
              style={{ filter: "blur(0.5px)" }}
              initial={{ rotate: 0, x: dot.radius, y: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: [0, 1, 1] }}
              transition={{
                rotate: { duration: dot.duration, repeat: Infinity, ease: "linear", delay: dot.delay },
                opacity: { duration: 1.2, ease: "easeOut", delay: dot.delay }
              }}
            />
          ))}

          <motion.div
            className="absolute inset-16 rounded-full bg-[radial-gradient(circle,rgba(76,215,246,0.32),rgba(77,142,255,0.12)_46%,transparent_72%)]"
            animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-surface-container/70 backdrop-blur-md"
            animate={{ boxShadow: [
              "0 0 24px rgba(76,215,246,0.25)",
              "0 0 48px rgba(76,215,246,0.55)",
              "0 0 24px rgba(76,215,246,0.25)"
            ] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <BarChart3 className="h-8 w-8 text-white" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <motion.span
            className="font-headline text-label-md uppercase tracking-[0.32em] text-secondary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            TradePilot
          </motion.span>
          <h2 className="neon-text-glow font-headline text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.05] tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              <AnimatedText text={label} mode="letters" stagger={0.018} />
            </span>
          </h2>
          <motion.p
            className="font-body text-body-sm text-on-surface-variant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {caption}
          </motion.p>
        </div>

        <div className="relative h-[2px] w-[260px] overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TransitionLoader;
