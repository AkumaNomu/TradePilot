"use client";

import { motion } from "framer-motion";
import { Flame, Globe2, MapPin, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";

const markets = [
  { code: "DEU", name: "Germany", region: "Europe", score: 92, fit: "Excellent", growth: "+24.8%", deals: 38, tint: "rgba(76,215,246,0.22)" },
  { code: "FRA", name: "France", region: "Europe", score: 88, fit: "Excellent", growth: "+18.4%", deals: 31, tint: "rgba(76,215,246,0.18)" },
  { code: "ITA", name: "Italy", region: "Europe", score: 84, fit: "Strong", growth: "+14.2%", deals: 27, tint: "rgba(173,198,255,0.18)" },
  { code: "ESP", name: "Spain", region: "Europe", score: 78, fit: "Strong", growth: "+11.6%", deals: 22, tint: "rgba(173,198,255,0.14)" },
  { code: "ARE", name: "UAE", region: "MENA", score: 86, fit: "Excellent", growth: "+22.3%", deals: 24, tint: "rgba(78,222,163,0.20)" },
  { code: "SAU", name: "Saudi Arabia", region: "MENA", score: 81, fit: "Strong", growth: "+19.1%", deals: 19, tint: "rgba(78,222,163,0.16)" },
  { code: "EGY", name: "Egypt", region: "MENA", score: 71, fit: "Moderate", growth: "+8.4%", deals: 14, tint: "rgba(78,222,163,0.10)" },
  { code: "USA", name: "United States", region: "Americas", score: 79, fit: "Strong", growth: "+9.7%", deals: 26, tint: "rgba(173,198,255,0.16)" },
  { code: "BRA", name: "Brazil", region: "Americas", score: 64, fit: "Moderate", growth: "+5.2%", deals: 9, tint: "rgba(173,198,255,0.10)" },
  { code: "TUR", name: "Türkiye", region: "MENA", score: 73, fit: "Moderate", growth: "+12.1%", deals: 15, tint: "rgba(78,222,163,0.12)" },
  { code: "GBR", name: "United Kingdom", region: "Europe", score: 82, fit: "Strong", growth: "+10.8%", deals: 23, tint: "rgba(76,215,246,0.16)" },
  { code: "CAN", name: "Canada", region: "Americas", score: 68, fit: "Moderate", growth: "+6.9%", deals: 11, tint: "rgba(173,198,255,0.10)" }
];

const regions = [
  { name: "Europe", deals: 141, share: "43%", color: "#4cd7f6" },
  { name: "MENA", deals: 87, share: "31%", color: "#4edea3" },
  { name: "Americas", deals: 64, share: "26%", color: "#adc6ff" }
];

export default function MarketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Market explorer"
        title="Where to expand next"
        description="Discover where your products have the highest fit and lowest acquisition friction. Scored by demand, conversion, and pricing sensitivity."
      />

      <section className="dash-card">
        <div className="panel-head">
          <div>
            <h2 className="section-title">Markets matrix</h2>
            <p className="section-sub">12 active regions · refreshed every 6h</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5">
              <Search size={12} className="text-on-surface-variant" />
              <input
                placeholder="Search market"
                className="border-0 bg-transparent text-xs text-white placeholder:text-on-surface-variant/60 focus:outline-none"
              />
            </div>
            <button className="btn-ghost active">All</button>
            <button className="btn-ghost">Europe</button>
            <button className="btn-ghost">MENA</button>
            <button className="btn-ghost">Americas</button>
          </div>
        </div>

        <div className="market-grid" style={{ marginTop: "1.1rem" }}>
          {markets.map((m, i) => (
            <motion.article
              key={m.code}
              className="market-tile"
              style={{ ["--tint" as string]: m.tint } as React.CSSProperties}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 + i * 0.03 }}
            >
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="cell-mono" style={{ color: "#c2c6d6" }}>
                    <MapPin size={10} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} />
                    {m.region}
                  </div>
                  <div
                    className="mt-1 font-headline font-bold tracking-tight text-white"
                    style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
                  >
                    {m.name}
                  </div>
                  <div className="cell-mono mt-0.5" style={{ color: "rgba(194,198,214,0.7)" }}>{m.code}</div>
                </div>
                <span
                  className="font-headline font-extrabold text-white"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.025em" }}
                >
                  {m.score}
                </span>
              </div>
              <div className="relative mt-4 flex items-center justify-between gap-3">
                <span className="chip">{m.fit}</span>
                <span className="chip up">{m.growth}</span>
              </div>
              <div className="relative mt-3 flex items-center justify-between text-xs">
                <span className="cell-mono">Active deals</span>
                <span className="cell-strong">{m.deals}</span>
              </div>
              <div className="relative mt-2.5">
                <div className="score-bar" style={{ width: "100%" }}>
                  <motion.div
                    className="score-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${m.score}%` }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.03 }}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <div className="g21">
        <section className="dash-card">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Region split</h3>
              <p className="section-sub">Active opportunities by region</p>
            </div>
            <Globe2 size={14} className="text-secondary" />
          </div>
          <div style={{ display: "grid", gap: "0.6rem", marginTop: "1rem" }}>
            {regions.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="legend-dot" style={{ background: r.color }} />
                  <span className="cell-strong text-sm">{r.name}</span>
                </div>
                <span className="cell-mono">{r.deals} deals</span>
                <span className="cell-strong">{r.share}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="dash-card">
          <div className="panel-head">
            <div>
              <h3 className="section-title">Competitive heat</h3>
              <p className="section-sub">Saturation by region · lower is better</p>
            </div>
            <Flame size={14} className="text-[#ffb84d]" />
          </div>
          <div className="mt-4 grid gap-2.5">
            {[
              { name: "Europe / SaaS", h: 0.72 },
              { name: "MENA / Energy", h: 0.34 },
              { name: "MENA / Logistics", h: 0.42 },
              { name: "Americas / Biotech", h: 0.68 },
              { name: "Europe / Agri", h: 0.51 }
            ].map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                className="grid grid-cols-[1fr_auto_140px] items-center gap-3"
              >
                <span className="text-sm text-white">{d.name}</span>
                <span className="cell-mono">{Math.round(d.h * 100)}%</span>
                <div className="score-bar" style={{ width: 140 }}>
                  <motion.div
                    className="score-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.h * 100}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.04 }}
                    style={{
                      background: d.h > 0.6
                        ? "linear-gradient(90deg, #ffb84d, #ff8a99)"
                        : "linear-gradient(90deg, #adc6ff, #4cd7f6, #4edea3)"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
