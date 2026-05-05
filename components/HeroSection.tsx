"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { LinkButton } from "@/components/Button";
import { AnimatedText } from "@/components/AnimatedText";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { hero } from "@/data/site";

const cycleWords = ["Clarity", "Speed", "Precision", "Signal", "Sales Growth"];
const wordDelays = [180, 170, 170, 180, 420];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (wordIndex >= cycleWords.length - 1) return;

    const delay = window.setTimeout(() => {
      setWordIndex((current) => Math.min(current + 1, cycleWords.length - 1));
    }, wordDelays[wordIndex] ?? 360);

    return () => window.clearTimeout(delay);
  }, [wordIndex]);

  return (
    <section data-nav-section="hero" className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-5 py-20 md:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <HeroAtmosphere />
        <motion.div
          className="absolute left-[-8%] top-[8%] h-[26rem] w-[26rem] rounded-full bg-primary-container/16 blur-[120px]"
          animate={{ x: [0, 26, 0], y: [0, -18, 0], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-2%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-secondary/10 blur-[120px]"
          animate={{ x: [0, -22, 0], y: [0, 20, 0], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[28%] h-[28rem] w-[28rem] rounded-full bg-tertiary-container/16 blur-[140px]"
          animate={{ x: [0, 14, 0], y: [0, -24, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-[-10%] top-[18%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: [0, 0.85, 0.25], scaleX: [0.6, 1.08, 1] }}
          transition={{ duration: 1.8, ease: [0.2, 0.9, 0.2, 1] }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/10 to-white/0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.18] }}
          transition={{ duration: 2.1, ease: [0.2, 0.9, 0.2, 1], delay: 0.2 }}
        />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-headline text-headline-xl text-white"
            initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: [0.2, 0.9, 0.2, 1], delay: 0.16 }}
          >
            <AnimatedText text="Your AI Co-Pilot for" mode="letters" stagger={0.018} />
            <br />
            <span className="neon-text-glow inline-block min-h-[1.15em] bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cycleWords[wordIndex]}
                  className="inline-block"
                  initial={{ opacity: 0, y: 12, filter: "blur(7px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(7px)" }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnimatedText text={cycleWords[wordIndex]} mode="letters" stagger={0.02} />
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

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
              <LinkButton href="#demo">
                {hero.primaryCta}
                <Rocket size={16} />
              </LinkButton>
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
        </div>
      </div>
    </section>
  );
}
