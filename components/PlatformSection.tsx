"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { platformFeatures } from "@/data/site";
import { cn } from "@/lib/utils";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

const toneClasses = {
  blue: "bg-primary-container/20 text-primary shadow-glow",
  cyan: "bg-secondary/15 text-secondary shadow-cyan-glow",
  green: "bg-tertiary-container/20 text-tertiary shadow-green-glow"
};

export function PlatformSection() {
  return (
    <section id="platform" data-nav-section="platform" className="relative px-5 py-section-gap md:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionItem>
          <SectionHeading
            eyebrow="Platform"
            title="Data that works for your sales team."
            description="Transform raw sales data into actionable vectors. TradePilot processes CRM activity, behavioral signals, market movement, and account context to surface precise conversion strategy."
          />
        </MotionItem>

        <MotionStagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <MotionItem key={feature.title}>
                <article className="glass-panel group relative overflow-hidden rounded-[2rem] p-9 transition duration-300 hover:-translate-y-1">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary-container/10 blur-3xl transition group-hover:bg-secondary/20" />
                  <div className={cn("mb-8 flex h-16 w-16 items-center justify-center rounded-2xl", toneClasses[feature.tone])}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-white">{feature.title}</h3>
                  <p className="mt-4 font-body text-body-md leading-relaxed text-on-surface-variant">{feature.description}</p>
                </article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
