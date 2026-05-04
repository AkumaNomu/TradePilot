"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary";

type SharedProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function buttonClasses(variant: Variant, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 font-headline text-label-md uppercase tracking-[0.16em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50",
    variant === "primary" &&
      "bg-gradient-to-b from-primary-container to-blue-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_24px_rgba(77,142,255,0.26)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_0_36px_rgba(77,142,255,0.45)]",
    variant === "secondary" &&
      "glass-panel text-white hover:bg-white/[0.06]",
    className
  );
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <button className={buttonClasses(variant, className)} {...props}>
        {children}
      </button>
    </motion.div>
  );
}

export function LinkButton({ variant = "primary", className, children, ...props }: LinkButtonProps) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <a className={buttonClasses(variant, className)} {...props}>
        {children}
      </a>
    </motion.div>
  );
}
