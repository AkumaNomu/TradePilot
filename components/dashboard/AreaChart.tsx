"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type Series = {
  name: string;
  values: number[];
  color: string;
  dashed?: boolean;
};

type Band = {
  upper: number[];
  lower: number[];
  color?: string;
};

type Props = {
  series: Series[];
  band?: Band;
  height?: number;
  xLabels?: string[];
  yMax?: number;
  yMin?: number;
};

const easeOut = [0.2, 0.9, 0.2, 1] as const;

export default function AreaChart({
  series,
  band,
  height = 240,
  xLabels = [],
  yMax,
  yMin
}: Props) {
  const id = useId().replace(/:/g, "");
  const w = 800;
  const h = height;
  const padTop = 12;
  const padBot = 24;
  const padLeft = 36;
  const padRight = 12;

  const allValues = series.flatMap((s) => s.values);
  if (band) {
    allValues.push(...band.upper, ...band.lower);
  }
  const max = yMax ?? Math.max(...allValues) * 1.05;
  const min = yMin ?? Math.min(...allValues) * 0.95;
  const range = max - min || 1;

  const chartW = w - padLeft - padRight;
  const chartH = h - padTop - padBot;
  const pointCount = series[0]?.values.length ?? 0;
  const stepX = chartW / Math.max(pointCount - 1, 1);

  const toX = (i: number) => padLeft + i * stepX;
  const toY = (v: number) => padTop + chartH - ((v - min) / range) * chartH;

  const buildPath = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");

  const buildBand = () => {
    if (!band) return "";
    const top = band.upper.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
    const bot = band.lower
      .slice()
      .reverse()
      .map((v, i, arr) => `L ${toX(arr.length - 1 - i)} ${toY(v)}`)
      .join(" ");
    return `${top} ${bot} Z`;
  };

  const yTicks = 4;
  const ySteps = Array.from({ length: yTicks + 1 }, (_, i) => min + (range * i) / yTicks);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <pattern id={`grid-${id}`} width={chartW / 8} height={chartH / 4} patternUnits="userSpaceOnUse" x={padLeft} y={padTop}>
          <path d={`M 0 0 L 0 ${chartH / 4}`} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          <path d={`M 0 0 L ${chartW / 8} 0`} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        </pattern>
        {series.map((s, i) => (
          <linearGradient key={i} id={`fill-${id}-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
        <linearGradient id={`band-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={band?.color ?? "#4cd7f6"} stopOpacity="0.18" />
          <stop offset="100%" stopColor={band?.color ?? "#4cd7f6"} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`shimmer-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <rect x={padLeft} y={padTop} width={chartW} height={chartH} fill={`url(#grid-${id})`} />


      {/* Y axis labels */}
      {ySteps.map((v, i) => (
        <g key={i}>
          <line
            x1={padLeft}
            x2={w - padRight}
            y1={toY(v)}
            y2={toY(v)}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={0.5}
          />
          <text
            x={padLeft - 8}
            y={toY(v) + 3}
            textAnchor="end"
            fontSize="9"
            fill="rgba(194,198,214,0.6)"
            fontFamily="var(--font-inter), sans-serif"
          >
            {Math.round(v)}
          </text>
        </g>
      ))}

      {band ? <path d={buildBand()} fill={`url(#band-${id})`} stroke="none" /> : null}

      {/* Series */}
      {series.map((s, i) => {
        const path = buildPath(s.values);
        const fillPath = `${path} L ${toX(s.values.length - 1)} ${toY(min)} L ${toX(0)} ${toY(min)} Z`;
        return (
          <g key={i}>
            {!s.dashed ? (
              <motion.path
                d={fillPath}
                fill={`url(#fill-${id}-${i})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
              />
            ) : null}
            <motion.path
              d={path}
              stroke={s.color}
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={s.dashed ? "5 5" : undefined}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: easeOut, delay: 0.1 + i * 0.15 }}
            />
            {/* end dot */}
            {!s.dashed ? (
              <motion.circle
                cx={toX(s.values.length - 1)}
                cy={toY(s.values[s.values.length - 1])}
                r={3.5}
                fill={s.color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                style={{ filter: `drop-shadow(0 0 8px ${s.color})` }}
              />
            ) : null}
          </g>
        );
      })}

      {/* X labels */}
      {xLabels.map((label, i) => (
        <text
          key={i}
          x={toX(i)}
          y={h - 6}
          textAnchor="middle"
          fontSize="9"
          fill="rgba(194,198,214,0.6)"
          fontFamily="ui-monospace, monospace"
          style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
