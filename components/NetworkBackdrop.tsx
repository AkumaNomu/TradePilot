"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Animated SVG constellation: nodes connected by faint lines.
 * Nodes pulse, lines fade in. Premium / techy feel without scanlines.
 */
export function NetworkBackdrop({
  density = 22,
  className = ""
}: {
  density?: number;
  className?: string;
}) {
  const nodes = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: i,
      x: ((i * 53.13) % 100),
      y: ((i * 31.91) % 100),
      r: 1 + ((i * 3) % 3) * 0.5,
      delay: (i % 7) * 0.3
    }));
  }, [density]);

  // Build edges between nearest nodes (pseudo-Delaunay on grid)
  const edges = useMemo(() => {
    const out: { a: number; b: number; d: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 22) out.push({ a: i, b: j, d });
      }
    }
    return out.slice(0, 36);
  }, [nodes]);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="net-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#adc6ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#4cd7f6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="net-node">
          <stop offset="0%" stopColor="#4cd7f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {edges.map((e, i) => {
        const a = nodes[e.a];
        const b = nodes[e.b];
        return (
          <motion.line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#net-edge)"
            strokeWidth={0.08}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.2, 0.5] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: (i % 7) * 0.4 }}
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r * 0.4}
            fill="#4cd7f6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3 + (n.id % 4), repeat: Infinity, delay: n.delay }}
          />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r * 1.4}
            fill="url(#net-node)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0] }}
            transition={{ duration: 4 + (n.id % 5), repeat: Infinity, delay: n.delay + 0.3 }}
          />
        </g>
      ))}
    </svg>
  );
}
