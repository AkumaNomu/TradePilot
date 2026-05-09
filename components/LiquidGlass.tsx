"use client";

import { motion } from "framer-motion";

type LiquidGlassVariant = "blob" | "wave" | "glow" | "morph";

interface LiquidGlassProps {
  variant?: LiquidGlassVariant;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  style?: React.CSSProperties;
}

export function LiquidGlass({
  variant = "blob",
  className = "",
  intensity = "medium",
  style
}: LiquidGlassProps) {
  const intensityMap = {
    light: { opacity: 0.15, blur: "blur-2xl" },
    medium: { opacity: 0.25, blur: "blur-3xl" },
    heavy: { opacity: 0.35, blur: "blur-[4rem]" }
  };

  const config = intensityMap[intensity];

  if (variant === "blob") {
    return (
      <motion.div
        className={`absolute pointer-events-none ${config.blur} ${className}`}
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          x: [0, 30, -20, 25, 0],
          y: [0, -40, 30, -25, 0],
          borderRadius: ["30% 70% 70% 30%", "60% 40% 30% 70%", "70% 30% 40% 60%", "40% 60% 70% 30%", "30% 70% 70% 30%"]
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          background: "radial-gradient(circle at 30% 40%, rgba(76,215,246,0.8), rgba(76,215,246,0.2), transparent 70%)",
          opacity: config.opacity,
          mixBlendMode: "screen",
          ...style
        }}
      />
    );
  }

  if (variant === "wave") {
    return (
      <motion.svg
        className={`absolute pointer-events-none ${className}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        animate={{
          x: [0, -100, 0]
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          filter: `${config.blur}`,
          opacity: config.opacity,
          mixBlendMode: "screen"
        }}
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(76,215,246,0)" />
            <stop offset="50%" stopColor="rgba(76,215,246,0.4)" />
            <stop offset="100%" stopColor="rgba(76,215,246,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q300,30 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#wave-gradient)"
        />
      </motion.svg>
    );
  }

  if (variant === "glow") {
    return (
      <motion.div
        className={`absolute rounded-full pointer-events-none ${className}`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [config.opacity * 0.5, config.opacity, config.opacity * 0.5]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          background: "radial-gradient(circle, rgba(76,215,246,0.6), rgba(76,215,246,0.1), transparent)",
          filter: config.blur,
          mixBlendMode: "screen"
        }}
      />
    );
  }

  // morph variant
  return (
    <motion.div
      className={`absolute pointer-events-none ${config.blur} ${className}`}
      animate={{
        scale: [1, 1.3, 0.95, 1.2, 1],
        rotate: [0, 90, 180, 270, 360],
        x: [0, 40, -30, 20, 0],
        y: [0, -50, 40, -30, 0]
      }}
      transition={{
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity
      }}
      style={{
        background: "conic-gradient(from 0deg at 50% 50%, rgba(76,215,246,0.8), rgba(174,206,255,0.6), rgba(78,222,163,0.6), rgba(76,215,246,0.8))",
        opacity: config.opacity,
        mixBlendMode: "screen",
        clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
      }}
    />
  );
}
