"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";
import { processSteps } from "@/data/site";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      data-nav-section="how-it-works"
      className="relative px-5 py-section-gap md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <MotionItem>
          <SectionHeading
            eyebrow="How It Works"
            title="A clear workflow your team can run every day."
            description="TradePilot turns scattered signals into a repeatable process: capture data, rank opportunity, and execute with confidence."
          />
        </MotionItem>

        <MotionStagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.07}>
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <MotionItem key={step.number}>
                <article className="glass-panel gradient-border group flex h-full flex-col rounded-[1.6rem] p-6 transition duration-300 hover:-translate-y-1">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="font-headline text-3xl font-black text-secondary/85">{step.number}</p>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/10 text-secondary shadow-cyan-glow">
                      <Icon size={21} />
                    </div>
                  </div>
                  <h3 className="font-headline text-headline-md text-white">{step.title}</h3>
                  <p className="mt-3 text-body-sm leading-6 text-on-surface-variant">{step.description}</p>
                </article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
