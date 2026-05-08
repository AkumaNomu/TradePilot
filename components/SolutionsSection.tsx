"use client";

import { Button } from "@/components/Button";
import { solutionTags } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

export function SolutionsSection() {
  return (
    <section id="solutions" data-nav-section="solutions" className="px-5 py-section-gap md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <MotionItem>
          <div className="glass-panel gradient-border rounded-[2rem] p-6 md:p-8">
            <p className="font-headline text-label-md uppercase tracking-[0.22em] text-secondary">
              Custom AI Systems
            </p>
            <h2 className="mt-4 font-headline text-headline-lg text-white">
              Build your own AI solution around your sales motion.
            </h2>
            <p className="mt-5 text-body-lg text-on-surface-variant">
              Every business is different. TradePilot can be shaped around your industry, data, sales process, and internal workflows so the intelligence layer fits how your team already operates.
            </p>
            <div className="mt-8">
              <Button>Design Workflow</Button>
            </div>
          </div>
        </MotionItem>

        <MotionItem>
          <div className="glass-panel gradient-border rounded-[2rem] p-5 md:p-8">
            <MotionStagger className="grid gap-4 sm:grid-cols-2" staggerChildren={0.06}>
              {solutionTags.map((tag) => {
                const Icon = tag.icon;

                return (
                  <MotionItem key={tag.label}>
                    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-secondary/30 hover:bg-white/[0.06]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container/15 text-secondary transition group-hover:shadow-cyan-glow">
                        <Icon size={20} />
                      </div>
                      <span className="font-headline text-sm font-bold uppercase tracking-[0.08em] text-white">
                        {tag.label}
                      </span>
                    </div>
                  </MotionItem>
                );
              })}
            </MotionStagger>
          </div>
        </MotionItem>
      </div>
    </section>
  );
}
