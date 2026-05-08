"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TransitionLoader } from "@/components/onboarding/TransitionLoader";

type TransitionState = {
  visible: boolean;
  label: string;
  caption: string;
};

type TransitionContextValue = {
  show: (label: string, caption: string) => void;
  hide: () => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransition must be used inside <TransitionProvider>");
  }
  return ctx;
}

export function useHideTransitionOnMount(delay = 380) {
  const { hide } = useTransition();
  useEffect(() => {
    const t = window.setTimeout(() => hide(), delay);
    return () => window.clearTimeout(t);
  }, [hide, delay]);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TransitionState>({
    visible: false,
    label: "Calibrating Intelligence",
    caption: "Synchronizing signal streams"
  });

  const show = useCallback((label: string, caption: string) => {
    setState({ visible: true, label, caption });
  }, []);

  const hide = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <TransitionContext.Provider value={{ show, hide }}>
      {children}
      <AnimatePresence>
        {state.visible ? (
          <motion.div
            key="transition-loader"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <TransitionLoader variant="page" label={state.label} caption={state.caption} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
