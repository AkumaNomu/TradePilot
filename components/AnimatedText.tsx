"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  mode?: "words" | "letters";
  delay?: number;
  stagger?: number;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } }
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" }
};

const letterItem: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export function AnimatedText({
  text,
  className,
  mode = "words",
  delay = 0,
  stagger
}: AnimatedTextProps) {
  const parts = mode === "letters" ? Array.from(text) : text.split(" ");
  const item = mode === "letters" ? letterItem : wordItem;

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {parts.map((part, idx) => (
        <motion.span
          key={`${part}-${idx}`}
          variants={item}
          transition={{
            duration: 0.7,
            ease: [0.2, 0.9, 0.2, 1],
            ...(typeof stagger === "number" ? { delay: idx * stagger } : null)
          }}
          className={mode === "letters" ? "inline-block" : "inline-block"}
        >
          {mode === "letters" ? (
            part === " " ? (
              <span>&nbsp;</span>
            ) : (
              part
            )
          ) : (
            <Fragment>
              {part}
              {idx < parts.length - 1 ? <span>&nbsp;</span> : null}
            </Fragment>
          )}
        </motion.span>
      ))}
    </motion.span>
  );
}

