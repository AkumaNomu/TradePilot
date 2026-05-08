"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, accent, description }: PageHeaderProps) {
  return (
    <motion.header
      className="pg-header"
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <span className="pg-eyebrow">
        <Sparkles size={12} />
        {eyebrow}
      </span>
      <h1 className="pg-title">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="pg-title-accent">{accent}</span>
          </>
        ) : null}
      </h1>
      {description ? <p className="pg-sub">{description}</p> : null}
    </motion.header>
  );
}
