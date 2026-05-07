"use client";

import { Activity, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";

const signalDots = [
  { className: "left-[18%] top-[42%]", delay: 0, duration: 9, size: "h-2 w-2", color: "bg-secondary", travel: { x: [0, 82, 174, 260], y: [0, -22, -40, 12] } },
  { className: "right-[20%] top-[38%]", delay: 0.45, duration: 11, size: "h-1.5 w-1.5", color: "bg-primary", travel: { x: [0, -70, -156, -248], y: [0, -34, -18, 18] } },
  { className: "left-[26%] bottom-[26%]", delay: 0.9, duration: 10, size: "h-2.5 w-2.5", color: "bg-tertiary", travel: { x: [0, 64, 126, 190], y: [0, -48, -112, -148] } },
  { className: "right-[28%] bottom-[24%]", delay: 1.25, duration: 12, size: "h-2 w-2", color: "bg-secondary", travel: { x: [0, -62, -138, -205], y: [0, -38, -96, -142] } },
];


export function HeroAtmosphere() {
  return (
    <>
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 860"
        fill="none"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <motion.path
          d="M132 346 C354 176 536 222 720 332 C904 442 1072 458 1308 284"
          stroke="url(#heroSignalA)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0.72, 1, 1], opacity: [0, 0.7, 0.36, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M108 634 C330 496 536 548 720 438 C914 322 1116 356 1336 560"
          stroke="url(#heroSignalB)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0.7, 1, 1], opacity: [0, 0.62, 0.28, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.circle
          cx="720"
          cy="392"
          r="180"
          stroke="rgba(76,215,246,.16)"
          strokeWidth="1"
          strokeDasharray="2 16"
          animate={{ rotate: 360, opacity: [0.18, 0.42, 0.18] }}
          transition={{ rotate: { duration: 32, repeat: Infinity, ease: "linear" }, opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          style={{ transformOrigin: "720px 392px" }}
        />
        <motion.circle
          cx="720"
          cy="392"
          r="280"
          stroke="rgba(78,222,163,.12)"
          strokeWidth="1"
          strokeDasharray="1 22"
          animate={{ rotate: -360, opacity: [0.1, 0.28, 0.1] }}
          transition={{ rotate: { duration: 44, repeat: Infinity, ease: "linear" }, opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          style={{ transformOrigin: "720px 392px" }}
        />
        <defs>
          <linearGradient id="heroSignalA" x1="132" y1="300" x2="1308" y2="320">
            <stop stopColor="#4edea3" stopOpacity="0" />
            <stop offset="0.48" stopColor="#4cd7f6" stopOpacity="0.72" />
            <stop offset="1" stopColor="#adc6ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroSignalB" x1="108" y1="560" x2="1336" y2="480">
            <stop stopColor="#adc6ff" stopOpacity="0" />
            <stop offset="0.52" stopColor="#4edea3" stopOpacity="0.62" />
            <stop offset="1" stopColor="#4cd7f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div
        className="absolute left-1/2 top-[43%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/15 bg-[radial-gradient(circle,rgba(76,215,246,.24),rgba(77,142,255,.07)_48%,transparent_70%)] blur-[1px]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0.28, 0.62, 0.28], scale: [0.94, 1.08, 0.94] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      {signalDots.map((dot) => (
        <motion.span
          key={dot.className}
          className={`absolute ${dot.className} ${dot.size} ${dot.color} rounded-full blur-[3px] shadow-cyan-glow opacity-80`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.9, 0.9], scale: [0.9, 1.12, 0.9], x: dot.travel.x, y: dot.travel.y }}
          transition={{
            opacity: { duration: 1.1, ease: "easeOut", delay: dot.delay },
            scale: { duration: dot.duration, repeat: Infinity, repeatType: "mirror", ease: "linear", delay: dot.delay },
            x: { duration: dot.duration, repeat: Infinity, repeatType: "mirror", ease: "linear", delay: dot.delay },
            y: { duration: dot.duration, repeat: Infinity, repeatType: "mirror", ease: "linear", delay: dot.delay }
          }}
        />
      ))}


      <motion.div
        className="absolute inset-x-[12%] bottom-[10%] h-px bg-gradient-to-r from-transparent via-tertiary/35 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0.65], opacity: [0, 0.65, 0.16] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.8, ease: [0.2, 0.9, 0.2, 1], delay: 1.3 }}
      />
    </>
  );
}
