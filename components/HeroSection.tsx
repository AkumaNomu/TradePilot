"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/Button";
import { AnimatedText } from "@/components/AnimatedText";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { useTransition } from "@/components/TransitionProvider";
import { hero } from "@/data/site";

export function HeroSection() {
  const router = useRouter();
  const transition = useTransition();
  const launchOnboarding = () => {
    transition.show("Initializing Uplink", "Establishing a secure channel to the intelligence engine");
    router.push("/onboarding");
  };
  return (
    <section data-nav-section="hero" className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-5 py-20 md:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <HeroAtmosphere />
        <motion.div
          className="absolute left-[-8%] top-[8%] h-[26rem] w-[26rem] rounded-full bg-primary-container/8 blur-[140px]"
          animate={{ x: [0, 26, 0], y: [0, -18, 0], opacity: [0.28, 0.5, 0.28] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-2%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-secondary/6 blur-[140px]"
          animate={{ x: [0, -22, 0], y: [0, 20, 0], opacity: [0.22, 0.42, 0.22] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[28%] h-[28rem] w-[28rem] rounded-full bg-tertiary-container/8 blur-[160px]"
          animate={{ x: [0, 14, 0], y: [0, -24, 0], opacity: [0.18, 0.38, 0.18] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="noise-overlay opacity-50" />
      </div>

      <motion.div
        className="pointer-events-none absolute left-[6%] top-[24%] z-10 hidden lg:block"
        initial={{ opacity: 0, y: 30, x: -20 }}
        animate={{ opacity: 1, y: [0, -10, 0], x: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.9 },
          x: { duration: 1, delay: 0.9 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
      >
        <div className="glass-panel glass-shimmer flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-tertiary-container/40 to-transparent text-tertiary">
            <TrendingUp className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-headline text-[0.62rem] uppercase tracking-[0.18em] text-on-surface-variant">Pipeline</span>
            <span className="font-headline text-sm font-semibold text-white">+24.6% MRR</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[7%] top-[30%] z-10 hidden lg:block"
        initial={{ opacity: 0, y: 30, x: 20 }}
        animate={{ opacity: 1, y: [0, 10, 0], x: 0 }}
        transition={{
          opacity: { duration: 1, delay: 1.1 },
          x: { duration: 1, delay: 1.1 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
        }}
      >
        <div className="glass-panel glass-shimmer flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/30 to-transparent text-secondary">
            <Activity className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-headline text-[0.62rem] uppercase tracking-[0.18em] text-on-surface-variant">Lead Score</span>
            <span className="font-headline text-sm font-semibold text-white">92 / 100</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[18%] right-[14%] z-10 hidden lg:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.3 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }
        }}
      >
        <div className="glass-panel glass-shimmer flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container/40 to-transparent text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-headline text-[0.62rem] uppercase tracking-[0.18em] text-on-surface-variant">Signal</span>
            <span className="font-headline text-sm font-semibold text-white">Bullish · 0.87</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 26, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.05, ease: [0.2, 0.9, 0.2, 1], delay: 0.12 }}
      >
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 10, scale: 0.99, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1], delay: 0.18 }}
        >
          <motion.p
            className="mb-5 font-headline text-label-md uppercase tracking-[0.18em] text-secondary"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1], delay: 0.18 }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            className="font-headline text-headline-xl text-white"
            initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1], delay: 0.22 }}
          >
            <span className="block text-white">
              <AnimatedText text="Your AI Co-Pilot for" mode="letters" stagger={0.014} />
            </span>
            <span className="neon-text-glow inline-block min-h-[1.15em] bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              <AnimatedText text="Sales Growth" mode="letters" stagger={0.02} />
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-body-md text-on-surface-variant"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1], delay: 0.32 }}
          >
            Identify, score, and convert your best clients through a unified AI powered platform.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { delayChildren: 0.56, staggerChildren: 0.13 } }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" },
                show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              }}
              transition={{ duration: 0.72, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <Button onClick={launchOnboarding}>
                {hero.primaryCta}
                <Rocket size={16} />
              </Button>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" },
                show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              }}
              transition={{ duration: 0.72, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <motion.a
                href="#platform"
                className="glass-panel inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-headline text-label-md uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-secondary/50"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {hero.secondaryCta}
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

