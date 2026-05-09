"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Variant = "hero" | "ambient" | "onboarding";

const easeOut = [0.2, 0.9, 0.2, 1] as const;

/**
 * Decorative floating elements: drifting orbs, drifting particles,
 * gradient meshes, and orbiting rings. No scanlines.
 */
export function FloatingFx({ variant = "ambient" }: { variant?: Variant }) {
  const particles = useMemo(() => {
    const count = variant === "hero" ? 18 : 10;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      // deterministic pseudo-random so SSR matches CSR
      x: ((i * 47.13) % 100),
      y: ((i * 71.91) % 100),
      delay: (i % 7) * 0.6,
      duration: 6 + ((i * 13) % 7),
      size: ((i * 3) % 3) + 2
    }));
  }, [variant]);

  const orbs = variant === "hero"
    ? [
        { className: "left-[12%] top-[18%] h-[26rem] w-[26rem] animate-drift-slow", color: "rgba(77,142,255,0.18)" },
        { className: "right-[6%] top-[8%] h-[22rem] w-[22rem] animate-float-y", color: "rgba(76,215,246,0.16)" },
        { className: "right-[18%] bottom-[6%] h-[24rem] w-[24rem] animate-drift-slow", color: "rgba(78,222,163,0.12)" }
      ]
    : variant === "onboarding"
      ? [
          { className: "left-1/2 top-[40%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 animate-float-y", color: "rgba(76,215,246,0.10)" },
          { className: "right-[10%] top-[10%] h-[18rem] w-[18rem] animate-drift-slow", color: "rgba(173,198,255,0.10)" }
        ]
      : [
          { className: "left-[-8%] top-[-6%] h-[34rem] w-[34rem] animate-drift-slow", color: "rgba(77,142,255,0.10)" },
          { className: "right-[-6%] top-[20%] h-[28rem] w-[28rem] animate-float-y", color: "rgba(76,215,246,0.09)" },
          { className: "left-[40%] bottom-[-10%] h-[32rem] w-[32rem] animate-drift-slow", color: "rgba(78,222,163,0.07)" }
        ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${orb.className}`}
          style={{
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(50px)"
          }}
        />
      ))}

      {/* Drifting data particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-secondary/70"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 12px rgba(76,215,246,0.7)"
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [-12, -60, -120] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: easeOut,
            delay: p.delay
          }}
        />
      ))}

      {/* Connecting line/mesh hint - subtle horizontal gradient lines */}
      {variant === "hero" ? (
        <svg
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
          viewBox="0 0 600 600"
          fill="none"
        >
          <defs>
            <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#4cd7f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4edea3" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="300"
            cy="300"
            r="220"
            stroke="url(#ring-grad)"
            strokeWidth="0.8"
            strokeDasharray="2 6"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px" }}
          />
          <motion.circle
            cx="300"
            cy="300"
            r="160"
            stroke="url(#ring-grad)"
            strokeWidth="0.8"
            strokeDasharray="1 8"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px" }}
          />
          <motion.circle
            cx="300"
            cy="300"
            r="100"
            stroke="url(#ring-grad)"
            strokeWidth="0.8"
            strokeDasharray="3 4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px" }}
          />
        </svg>
      ) : null}
    </div>
  );
}
