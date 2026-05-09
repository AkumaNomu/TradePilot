"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
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

  const launch = () => {
    transition.show("Initializing", "Routing you to the workspace");
    router.push("/onboarding");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        <a href="#" className="flex items-center gap-2.5 text-white">
          <span className="h-3 w-3 rounded-full bg-secondary shadow-[0_0_10px_rgba(76,215,246,0.8)] animate-pulse" />
          <span className="font-headline text-base font-bold uppercase tracking-[0.18em]">TradePilot</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "border-b-2 border-blue-500 pb-1 font-body text-label-md uppercase text-blue-400 transition"
                    : "font-body text-label-md uppercase text-slate-400 transition hover:text-blue-300"
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={launch}
            className="hidden font-body text-label-md uppercase text-slate-300 transition hover:text-white md:inline-flex"
          >
            Log In
          </button>
          <button
            onClick={launch}
            className="relative inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-gradient-to-b from-primary-container to-blue-700 px-5 py-2 font-body text-label-md uppercase text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition hover:from-blue-500 hover:to-blue-700"
          >
            Launch Terminal
          </button>
          <button className="rounded-full border border-white/10 p-2 text-white md:hidden" aria-label="Open navigation menu">
            <Menu size={16} />
          </button>
        </div>
      </nav>
    </header>
  );
}
