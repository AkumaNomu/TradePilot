"use client";

import { Cpu, Clock3, Globe, PlugZap, ShieldCheck } from "lucide-react";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

const stats = [
  { label: "Signals processed", value: "2.4M", suffix: "/day", icon: Cpu },
  { label: "Time to insight", value: "12s", suffix: " or less", icon: Clock3 },
  { label: "Integrations", value: "30+", suffix: " sources", icon: PlugZap },
  { label: "Uptime target", value: "99.9%", suffix: " SLA", icon: Globe },
  { label: "Security", value: "SOC2", suffix: " ready", icon: ShieldCheck }
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
                <div className="glass-panel relative overflow-hidden rounded-[1.6rem] p-6">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-tertiary/10 blur-3xl" />
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tertiary-container/15 text-tertiary shadow-green-glow">
                      <Icon size={19} />
                    </span>
                    <p className="font-mono text-mono-sm uppercase tracking-[0.18em] text-on-surface-variant">{stat.label}</p>
                  </div>
                  <p className="relative mt-6 font-headline text-3xl font-extrabold tracking-tight text-white">
                    {stat.value}
                    <span className="ml-0.5 font-body text-sm font-normal text-on-surface-variant/70">{stat.suffix}</span>
                  </p>
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
