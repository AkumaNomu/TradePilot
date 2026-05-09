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

        <MotionStagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <MotionItem key={feature.title}>
                <article className="glass-panel group relative overflow-hidden rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary-container/10 blur-3xl transition group-hover:bg-secondary/15" />
                  <div className={cn("mb-7 flex h-14 w-14 items-center justify-center rounded-2xl", toneClasses[feature.tone])}>
                    <Icon size={25} />
                  </div>
                  <h3 className="font-headline text-headline-md text-white">{feature.title}</h3>
                  <p className="mt-4 text-body-md text-on-surface-variant">{feature.description}</p>
                </article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
