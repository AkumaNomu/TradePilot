"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 52 }, (_, index) => {
  const col = index % 6;
  const row = Math.floor(index / 6);
  const left = 6 + col * 17 + (row % 2) * 4;
  const top = 8 + row * 15 + ((index * 7) % 8);

  return {
    id: index,
    left: `${Math.min(left, 96)}%`,
    top: `${Math.min(top, 96)}%`,
    size: 1.6 + (index % 5) * 1.2,
    delay: (index % 7) * 0.42,
    duration: 8 + (index % 7) * 2.1
  };
});

export function MouseReactiveBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="absolute inset-0 opacity-65 blur-[0.4px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(173,198,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(173,198,255,0.08) 1px, transparent 1px)",
          backgroundSize: "54px 54px"
        }}
      />
      <motion.div
        className="absolute inset-0 blur-2xl"
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 55% 18%, rgba(76,215,246,0.24), transparent 52%), radial-gradient(circle at 40% 72%, rgba(78,222,163,0.18), transparent 56%), radial-gradient(circle at 85% 45%, rgba(173,198,255,0.18), transparent 48%)"
        }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: "0 0 14px rgba(173, 198, 255, 0.8), 0 0 26px rgba(76, 215, 246, 0.45)"
          }}
          initial={{ opacity: 0.24 }}
          animate={{
            opacity: [0.2, 0.88, 0.3],
            y: [0, -28, 12, 0],
            x: [0, particle.id % 2 === 0 ? 16 : -16, particle.id % 2 === 0 ? -8 : 8, 0],
            scale: [1, 1.45, 0.95, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
