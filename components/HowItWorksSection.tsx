"use client";

import { motion } from "framer-motion";
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

        <MotionStagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" staggerChildren={0.07}>
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <MotionItem key={step.number}>
                <motion.article
                  className="glass-panel group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] p-7"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* Enhanced glow orbs */}
                  <motion.div
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl transition-all"
                    whileHover={{ scale: 1.4, opacity: 0.5 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-tertiary/8 blur-3xl opacity-0 transition-all group-hover:opacity-100"
                    whileHover={{ scale: 1.35, opacity: 0.45 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Animated shimmer border overlay */}
                  <div className="absolute inset-0 rounded-[1.6rem] opacity-0 transition-opacity group-hover:opacity-100">
                    <div
                      className="absolute inset-0 rounded-[1.6rem]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(76,215,246,0.15) 50%, transparent 100%)",
                        animation: "shimmer-move 3s ease-in-out infinite"
                      }}
                    />
                  </div>

                  <div className="relative mb-7 flex items-center justify-between">
                    <motion.p
                      className="font-headline text-6xl font-extrabold tracking-tighter"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(173,198,255,0.18), rgba(76,215,246,0.10) 50%, rgba(78,222,163,0.08))",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent"
                      }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {step.number}
                    </motion.p>
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/10 text-secondary shadow-cyan-glow"
                      whileHover={{
                        rotate: 12,
                        scale: 1.15,
                        boxShadow: "0 0 24px rgba(76,215,246,0.6), inset 0 0 12px rgba(76,215,246,0.2)"
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Icon size={22} />
                    </motion.div>
                  </div>
                  <h3 className="relative font-headline text-2xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 font-body text-[0.94rem] leading-relaxed text-on-surface-variant">
                    {step.description}
                  </p>
                </motion.article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
