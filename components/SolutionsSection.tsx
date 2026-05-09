"use client";

import { Button } from "@/components/Button";
import { solutionTags } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

export function SolutionsSection() {
  return (
    <section id="solutions" data-nav-section="solutions" className="px-5 py-section-gap md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <MotionItem>
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-7 md:p-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.85)]" />
                <span className="font-mono text-mono-sm uppercase tracking-[0.18em] text-secondary">
                  Custom AI Systems
                </span>
              </div>
              <h2 className="mt-6 font-headline text-headline-xl text-white">
                Build your own AI solution around your sales motion.
              </h2>
              <p className="mt-6 font-body text-body-lg leading-relaxed text-on-surface-variant">
                Every business is different. TradePilot can be shaped around your industry, data, sales process, and internal workflows so the intelligence layer fits how your team already operates.
              </p>
              <div className="mt-9">
                <Button>Design Workflow</Button>
              </div>
            </div>
          </div>
        </MotionItem>

        <MotionItem>
          <div className="glass-panel rounded-[2rem] p-5 md:p-8">
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
