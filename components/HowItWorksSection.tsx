"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-5 py-section-gap md:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionItem>
          <SectionHeading
            eyebrow="How it works"
            title="From raw data to closed deals in five steps."
            description="The workflow is built to feel simple for operators while handling complex scoring, enrichment, forecasting, and recommendations in the background."
          />
        </MotionItem>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-primary/0 via-primary/40 to-tertiary/0 lg:block" />

          <MotionStagger className="grid gap-5" staggerChildren={0.1}>
            {processSteps.map((step) => {
              const Icon = step.icon;

              return (
                <MotionItem key={step.number}>
                  <article className="glass-panel gradient-border grid gap-5 rounded-[2rem] p-6 md:grid-cols-[7rem_1fr_auto] md:items-center md:p-7">
                    <div>
                      <p className="font-headline text-5xl font-black tracking-[-0.08em] text-white/15">{step.number}</p>
                    </div>

                    <div>
                      <h3 className="font-headline text-2xl font-bold text-white">{step.title}</h3>
                      <p className="mt-2 max-w-3xl text-body-md text-on-surface-variant">{step.description}</p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-secondary">
                      <Icon size={24} />
                    </div>
                  </article>
                </MotionItem>
              );
            })}
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
