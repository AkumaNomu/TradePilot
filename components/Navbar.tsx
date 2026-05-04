"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/site";
import { LinkButton } from "@/components/Button";
import { motion } from "framer-motion";

export function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/65 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-10">
          <a href="#" className="font-headline text-2xl font-black uppercase tracking-[-0.06em] text-white">
            TradePilot
          </a>

          <motion.div
            className="hidden items-center gap-7 md:flex"
            initial={false}
            animate={mounted ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
            }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={{
                  hidden: { opacity: 0, y: -6, filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" }
                }}
                transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
                style={{ willChange: "transform, opacity, filter" }}
                className={
                  index === 0
                    ? "border-b-2 border-blue-500 pb-1 font-headline text-sm uppercase tracking-[0.08em] text-blue-300 transition hover:text-blue-200"
                    : "font-headline text-sm uppercase tracking-[0.08em] text-slate-400 transition hover:text-blue-300"
                }
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button className="font-headline text-sm uppercase tracking-[0.08em] text-slate-400 transition hover:text-blue-300">
            Log In
          </button>
          <LinkButton href="#demo" className="px-5 py-3">
            View demo
          </LinkButton>
        </div>

        <button className="rounded-full border border-white/10 p-2 text-white md:hidden" aria-label="Open navigation menu">
          <Menu size={22} />
        </button>
      </nav>
    </header>
  );
}
