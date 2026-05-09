"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/Button";
import { useTransition } from "@/components/TransitionProvider";
import { hero } from "@/data/site";
import { HeroPreview } from "@/components/HeroPreview";

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
      className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-5 py-24 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-[34%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(76,215,246,0.16), rgba(77,142,255,0.06) 45%, transparent 72%)",
            filter: "blur(40px)"
          }}
          animate={{ opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-secondary/60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-secondary" />
          </span>
          <span className="font-body text-label-md uppercase text-on-surface-variant">{hero.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.18 }}
          className="text-center font-headline text-headline-xl text-white"
        >
          <span className="block">Your AI Co-Pilot for</span>
          <span className="block bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text pb-2 text-transparent">
            Sales Growth
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.3 }}
          className="mt-5 max-w-xl text-center font-body text-body-md text-on-surface-variant"
        >
          Identify, score, and convert your best clients through a unified intelligence platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.42 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-7 py-3.5 font-body text-label-md uppercase text-white transition duration-300 hover:bg-white/[0.04] hover:border-white/20"
          >
            {hero.secondaryCta}
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>

        <HeroPreview />
      </motion.div>
    </section>
  );
}
