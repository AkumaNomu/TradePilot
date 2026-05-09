"use client";

import { motion } from "framer-motion";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <motion.header
      className="pg-header"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <span className="pg-eyebrow">{eyebrow}</span>
      <h1 className="pg-title">{title}</h1>
      {description ? <p className="pg-sub">{description}</p> : null}
    </motion.header>
  );
}
