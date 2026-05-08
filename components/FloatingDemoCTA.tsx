"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import { useTransition } from "@/components/TransitionProvider";

export function FloatingDemoCTA() {
  const router = useRouter();
  const transition = useTransition();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const launch = () => {
    transition.show("Initializing Uplink", "Establishing a secure channel to the intelligence engine");
    router.push("/onboarding");
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="floating-cta"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
          className="pointer-events-none fixed bottom-6 right-6 z-40"
        >
          <motion.button
            onClick={launch}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="glass-panel glass-shimmer pointer-events-auto group relative flex items-center gap-3 rounded-full py-3 pl-3 pr-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary via-secondary to-tertiary text-slate-950">
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: [
                  "0 0 0 0 rgba(76,215,246,0.0)",
                  "0 0 0 8px rgba(76,215,246,0.15)",
                  "0 0 0 0 rgba(76,215,246,0.0)"
                ] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <Rocket className="relative h-4 w-4" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="font-headline text-[0.6rem] uppercase tracking-[0.22em] text-on-surface-variant">Live preview</span>
              <span className="font-headline text-sm font-semibold tracking-tight">Try the Demo</span>
            </span>
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
