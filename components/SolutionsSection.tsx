"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { solutionTags } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

export function SolutionsSection() {
  return (
    <section id="solutions" data-nav-section="solutions" className="px-5 py-section-gap md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <MotionItem>
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-7 md:p-9">
            <motion.div
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/12 blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-tertiary/10 blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
              transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
            />
            <div className="relative">
              <div className="label-eyebrow">
                <span className="dot" />
                <span>Custom AI Systems</span>
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
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 md:p-8">
            <MotionStagger className="grid gap-4 sm:grid-cols-2" staggerChildren={0.06}>
              {solutionTags.map((tag, idx) => {
                const Icon = tag.icon;

                return (
                  <MotionItem key={tag.label}>
                    <motion.div
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 26 }}
                      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-secondary/30"
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 0%, rgba(76,215,246,0.12), transparent 60%)"
                        }}
                      />
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container/15 text-secondary transition group-hover:shadow-cyan-glow">
                        <Icon size={20} />
                      </div>
                      <span
                        className="relative font-body text-[0.92rem] font-semibold tracking-tight text-white"
                        style={{ letterSpacing: idx % 2 === 0 ? "-0.005em" : "0em" }}
                      >
                        {tag.label}
                      </span>
                    </motion.div>
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
