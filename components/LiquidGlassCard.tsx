"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { LiquidGlass } from "./LiquidGlass";

interface LiquidGlassCardProps extends Omit<MotionProps, "children"> {
  children: ReactNode;
  className?: string;
  liquidVariant?: "blob" | "wave" | "glow" | "morph";
  liquidIntensity?: "light" | "medium" | "heavy";
  interactive?: boolean;
}

export function LiquidGlassCard({
  children,
  className = "",
  liquidVariant = "blob",
  liquidIntensity = "light",
  interactive = true,
  ...motionProps
}: LiquidGlassCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
      }}
      whileHover={interactive ? { y: -4, boxShadow: "0 16px 48px rgba(76,215,246,0.15), inset 0 1px 0 rgba(255,255,255,0.2)" } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...motionProps}
    >
      <LiquidGlass variant={liquidVariant} intensity={liquidIntensity} className="top-0 right-0 -w-32 -h-32" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
