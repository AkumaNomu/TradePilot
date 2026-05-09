"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { useTransition } from "@/components/TransitionProvider";
import { hero } from "@/data/site";
import { HeroPreview } from "@/components/HeroPreview";
import { FloatingFx } from "@/components/FloatingFx";
import { MouseFollower } from "@/components/MouseFollower";

const easeOut = [0.2, 0.9, 0.2, 1] as const;

export function HeroSection() {
  const router = useRouter();
  const transition = useTransition();
  const launchOnboarding = () => {
    transition.show("Initializing", "Routing you to the workspace");
    router.push("/onboarding");
  };

  return (
    <section
      data-nav-section="hero"
      className="relative flex min-h-[calc(100vh-5rem)] flex-col items-center px-5 pb-12 pt-28 md:px-8 md:pt-32"
    >
      <MouseFollower />
      <FloatingFx variant="hero" />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: easeOut }}
      >
        {hero.eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
            className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-secondary/60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-secondary" />
            </span>
            <Sparkles size={11} className="text-secondary" />
            <span className="font-body text-[0.74rem] font-semibold tracking-wide text-on-surface-variant">
              {hero.eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: easeOut, delay: 0.18 }}
          className="text-center font-headline text-display-xl text-white"
        >
          <span className="block">Your AI Co-Pilot</span>
          <span className="block">
            for{" "}
            <span className="gradient-text relative inline-block pb-2">
              Sales Growth
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.32 }}
          className="mt-7 max-w-2xl text-center font-body text-body-lg leading-relaxed text-on-surface-variant"
        >
          Identify, score, and convert your highest-value clients through a unified intelligence platform built for revenue teams that move fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.45 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button onClick={launchOnboarding}>
            {hero.primaryCta}
            <Rocket size={14} />
          </Button>
          <motion.a
            href="#platform"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-7 py-3.5 font-body text-[0.92rem] font-semibold tracking-tight text-white backdrop-blur-md transition duration-300 hover:bg-white/[0.06] hover:border-white/20"
          >
            {hero.secondaryCta}
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.6 }}
          className="mt-10 grid grid-cols-3 gap-x-8 gap-y-1 text-center sm:gap-x-14"
        >
          {hero.stats.map((s, idx) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.span
                className="font-headline text-2xl font-bold tracking-tight text-white sm:text-3xl bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: easeOut,
                  delay: 0.7 + idx * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                {s.value}
              </motion.span>
              <span className="mt-1.5 font-body text-[0.78rem] font-medium text-on-surface-variant/80">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <HeroPreview />
      </motion.div>
    </section>
  );
}
