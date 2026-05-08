"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "@/data/site";
import { useTransition } from "@/components/TransitionProvider";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const router = useRouter();
  const transition = useTransition();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.dataset.navSection || "hero");
        }
      },
      { root: null, threshold: [0.22, 0.35, 0.5, 0.65] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const launchDemo = () => {
    transition.show("Initializing Uplink", "Establishing a secure channel to the intelligence engine");
    router.push("/onboarding");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-transparent" />
      <nav className="glass-panel relative mx-auto mt-3 flex h-14 max-w-6xl items-center justify-between rounded-full px-3 pl-6 backdrop-blur-2xl md:mt-4">
        <div className="flex items-center gap-8">
          <a href="#" className="font-headline text-lg font-black uppercase tracking-[-0.06em] text-white">
            TradePilot
          </a>

          <motion.div
            className="hidden items-center gap-6 md:flex"
            initial={false}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
            }}
          >
            {navLinks.map((link) => (
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
                  activeSection === link.href.slice(1)
                    ? "font-headline text-[0.72rem] uppercase tracking-[0.16em] text-secondary transition"
                    : "font-headline text-[0.72rem] uppercase tracking-[0.16em] text-on-surface-variant transition hover:text-white"
                }
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={launchDemo}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 font-headline text-[0.7rem] uppercase tracking-[0.18em] text-slate-950"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary opacity-95 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_28px_rgba(76,215,246,0.55)] transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-1.5">
              Try Demo
              <ArrowRight size={14} />
            </span>
          </motion.button>
          <button className="rounded-full border border-white/10 p-2 text-white md:hidden" aria-label="Open navigation menu">
            <Menu size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}
