"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { LinkButton } from "@/components/Button";
import { AnimatedText } from "@/components/AnimatedText";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { hero } from "@/data/site";

export function HeroSection() {
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
        <div className="noise-overlay" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        initial={{ opacity: 0, y: 26, filter: "blur(16px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.05, ease: [0.2, 0.9, 0.2, 1], delay: 0.12 }}
      >
        <div className="mx-auto max-w-4xl text-center">
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
      </motion.div>
    </section>
  );
}
