"use client";

import { Cpu, Clock3, Globe, PlugZap, ShieldCheck } from "lucide-react";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

const stats = [
  { label: "Signals processed", value: "2.4M/day", icon: Cpu },
  { label: "Time to insight", value: "< 12s", icon: Clock3 },
  { label: "Integrations", value: "30+", icon: PlugZap },
  { label: "Uptime target", value: "99.9%", icon: Globe },
  { label: "Security", value: "SOC2-ready", icon: ShieldCheck }
];

export function StatsSection() {
  return (
    <section aria-label="Key stats" className="px-5 py-section-gap md:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionStagger className="grid gap-4 md:grid-cols-5" staggerChildren={0.06}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <MotionItem key={stat.label}>
                <div className="glass-panel rounded-[2rem] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-headline text-[11px] uppercase tracking-[0.18em] text-slate-300">{stat.label}</p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-tertiary-container/15 text-tertiary shadow-green-glow">
                      <Icon size={18} />
                    </span>
                  </div>
                  <p className="mt-4 font-headline text-2xl font-semibold tracking-[-0.01em] text-white">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-400">Realtime</p>
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}

