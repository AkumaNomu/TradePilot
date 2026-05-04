"use client";

import { ArrowRight, Rocket } from "lucide-react";
import { LinkButton } from "@/components/Button";
import { HeroVisual } from "@/components/HeroVisual";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/MotionPrimitives";
import { AnimatedText } from "@/components/AnimatedText";
import { hero } from "@/data/site";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] px-5 py-20 md:px-8 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-primary-container/20 blur-[100px]" />
        <div className="absolute bottom-[8%] right-[10%] h-96 w-96 rounded-full bg-tertiary-container/20 blur-[120px]" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <MotionStagger delayChildren={0.18} staggerChildren={0.12}>
            <MotionItem>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-secondary/20 bg-slate-950/50 px-4 py-2 text-secondary shadow-cyan-glow backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_12px_rgba(76,215,246,0.9)]" />
                <span className="font-headline text-label-sm uppercase">
                  <AnimatedText text={hero.eyebrow} mode="words" />
                </span>
              </div>
            </MotionItem>

            <MotionItem>
              <h1 className="max-w-5xl font-headline text-headline-xl text-white">
                <AnimatedText text="Your AI Co-Pilot for" mode="words" stagger={0.06} />
                <span className="neon-text-glow ml-3 inline-block bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                  <AnimatedText text="Sales Growth" mode="letters" stagger={0.03} />
                </span>
              </h1>
            </MotionItem>

            <MotionItem>
              <p className="mt-7 max-w-2xl text-body-lg text-on-surface-variant">
                <AnimatedText text={hero.subtitle} mode="words" stagger={0.008} />
              </p>
            </MotionItem>

            <MotionItem>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <LinkButton href="#demo">
                  {hero.primaryCta}
                  <Rocket size={16} />
                </LinkButton>
                <LinkButton href="#platform" variant="secondary">
                  {hero.secondaryCta}
                  <ArrowRight size={16} />
                </LinkButton>
              </div>
            </MotionItem>

            <MotionItem>
              <MotionStagger className="mt-10 grid max-w-2xl grid-cols-3 gap-3" staggerChildren={0.1}>
                {hero.stats.map((stat) => (
                  <MotionItem key={stat.label}>
                    <div className="glass-panel rounded-2xl px-4 py-4">
                      <p className="font-headline text-2xl font-bold text-white">{stat.value}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-on-surface-variant">{stat.label}</p>
                    </div>
                  </MotionItem>
                ))}
              </MotionStagger>
            </MotionItem>
          </MotionStagger>
        </div>

        <MotionReveal delay={0.15}>
          <HeroVisual />
        </MotionReveal>
      </div>
    </section>
  );
}
