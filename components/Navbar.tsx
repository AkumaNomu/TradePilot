"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/site";
import { useTransition } from "@/components/TransitionProvider";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const transition = useTransition();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.dataset.navSection || "hero");
        }
      },
      { root: null, threshold: [0.22, 0.35, 0.5, 0.65] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const launch = () => {
    transition.show("Initializing", "Routing you to the workspace");
    router.push("/onboarding");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 border-b transition-all duration-500 ${
        scrolled
          ? "border-white/10 bg-slate-950/70 backdrop-blur-xl"
          : "border-transparent bg-slate-950/30 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-full w-full max-w-7xl items-center px-4 md:px-8">
        <a href="#" className="flex items-center gap-2.5 text-white">
          <span className="font-headline text-[0.95rem] font-extrabold uppercase tracking-[0.18em]">TradePilot</span>
        </a>

        <div className="relative hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 font-body text-[0.92rem] font-medium tracking-tight transition ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </a>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={launch}
            className="hidden font-body text-[0.9rem] font-medium tracking-tight text-slate-300 transition hover:text-white md:inline-flex"
          >
            Log In
          </button>
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            onClick={launch}
            className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-primary/30 bg-gradient-to-b from-primary-container to-blue-700 px-5 py-2.5 font-body text-[0.88rem] font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_24px_-8px_rgba(77,142,255,0.45)] transition"
          >
            <span className="relative z-10">Launch Terminal</span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ animation: "glint 4s ease-in-out infinite", animationDelay: "1.5s" }}
            />
          </motion.button>
          <button className="rounded-full border border-white/10 p-2 text-white md:hidden" aria-label="Open navigation menu">
            <Menu size={16} />
          </button>
        </div>
      </nav>
    </header>
  );
}
