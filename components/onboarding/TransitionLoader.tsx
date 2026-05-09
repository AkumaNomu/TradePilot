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
      className={`${positionClass} flex items-center justify-center overflow-hidden bg-background`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(76,215,246,0.14), rgba(77,142,255,0.06) 38%, transparent 70%)",
          filter: "blur(40px)"
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-7 px-6">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute -inset-3 rounded-full border border-secondary/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ borderStyle: "dashed" }}
          />
          <span
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
            style={{ boxShadow: "0 0 32px rgba(76,215,246,0.35)" }}
          >
            <BarChart3 className="h-5 w-5 text-white" />
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-headline text-headline-md text-white">{label}</h2>
          {caption ? (
            <p className="max-w-xs font-body text-body-sm text-on-surface-variant">
              {caption}
            </p>
          ) : null}
        </div>

        <div className="relative h-px w-[200px] overflow-hidden bg-white/10">
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(76,215,246,1), transparent)",
              boxShadow: "0 0 8px rgba(76,215,246,0.7)"
            }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TransitionLoader;
