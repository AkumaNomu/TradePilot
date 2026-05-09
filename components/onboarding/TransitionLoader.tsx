"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

type TransitionLoaderProps = {
  label?: string;
  caption?: string;
  variant?: "fixed" | "page";
};

export function TransitionLoader({
  label = "Loading",
  caption,
  variant = "fixed"
}: TransitionLoaderProps) {
  const positionClass =
    variant === "fixed" ? "fixed inset-0 z-[80]" : "relative min-h-screen w-full";

  return (
    <div
      className={`${positionClass} flex items-center justify-center overflow-hidden bg-[#0a0f1e]`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(76,215,246,0.16), rgba(77,142,255,0.08) 38%, transparent 70%)",
          filter: "blur(50px)"
        }}
      />

      {/* Drifting particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-secondary"
            style={{
              left: `${(i * 47.13) % 100}%`,
              top: `${(i * 71.91) % 100}%`,
              boxShadow: "0 0 12px rgba(76,215,246,0.85)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0], y: [-8, -50, -100] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: (i % 7) * 0.5,
              ease: [0.2, 0.9, 0.2, 1]
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-9 px-6">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute -inset-4 rounded-full border border-secondary/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{ borderStyle: "dashed" }}
          />
          <motion.span
            className="absolute -inset-9 rounded-full border border-white/[0.04]"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{ borderStyle: "dashed" }}
          />
          <span
            className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]"
            style={{ boxShadow: "0 0 40px rgba(76,215,246,0.45), inset 0 1px 0 rgba(255,255,255,0.1)" }}
          >
            <BarChart3 className="h-7 w-7 text-white" strokeWidth={2.4} />
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-white">{label}</h2>
          {caption ? (
            <p className="max-w-sm font-body text-body-sm leading-relaxed text-on-surface-variant">
              {caption}
            </p>
          ) : null}
        </div>

        <div className="relative h-[2px] w-[240px] overflow-hidden bg-white/[0.07]">
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(76,215,246,1), transparent)",
              boxShadow: "0 0 14px rgba(76,215,246,0.85)"
            }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TransitionLoader;
