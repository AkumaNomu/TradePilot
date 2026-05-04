"use client";

import { type PropsWithChildren } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  once = true
}: PropsWithChildren<{ className?: string; delay?: number; once?: boolean }>) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.22 }}
      transition={{ duration: 0.85, ease: [0.2, 0.9, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  className,
  once = true,
  delayChildren = 0.05,
  staggerChildren = 0.08
}: PropsWithChildren<{
  className?: string;
  once?: boolean;
  delayChildren?: number;
  staggerChildren?: number;
}>) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.22 }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren } }
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div className={cn(className)} variants={fadeUp} transition={{ duration: 0.75, ease: [0.2, 0.9, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

