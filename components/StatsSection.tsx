"use client";

import { Cpu, Clock3, Globe, PlugZap, ShieldCheck } from "lucide-react";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const stats = [
  { label: "Signals processed", count: 2.4, prefix: "", suffix: "M", decimals: 1, post: "/day", icon: Cpu },
  { label: "Time to insight", count: 12, prefix: "", suffix: "s", decimals: 0, post: " or less", icon: Clock3 },
  { label: "Integrations", count: 30, prefix: "", suffix: "+", decimals: 0, post: " sources", icon: PlugZap },
  { label: "Uptime target", count: 99.9, prefix: "", suffix: "%", decimals: 1, post: " SLA", icon: Globe },
  { label: "Security", count: 0, prefix: "SOC", suffix: "2", decimals: 0, post: " ready", icon: ShieldCheck }
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
                <div className="glass-panel lift-card relative overflow-hidden rounded-[1.6rem] p-6">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-tertiary/10 blur-3xl" />
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tertiary-container/15 text-tertiary shadow-green-glow">
                      <Icon size={20} />
                    </span>
                    <p className="font-body text-[0.72rem] font-semibold tracking-wide text-on-surface-variant">{stat.label}</p>
                  </div>
                  <p className="relative mt-6 font-headline text-3xl font-extrabold tracking-tight text-white tabular-nums">
                    {stat.label === "Security" ? (
                      <span>SOC2</span>
                    ) : (
                      <AnimatedCounter
                        value={stat.count}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                      />
                    )}
                    <span className="ml-1 font-body text-sm font-normal text-on-surface-variant/70">{stat.post}</span>
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
