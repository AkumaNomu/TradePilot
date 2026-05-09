"use client";

import { footerLinks } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

export function Footer() {
  return (
    <footer className="px-5 pb-12 pt-24 md:px-8">
      <MotionStagger
        className="glass-panel mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] px-7 py-9 md:flex-row md:px-10"
        staggerChildren={0.08}
      >
        <MotionItem>
          <a href="#" className="flex items-center gap-2.5 text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(76,215,246,0.85)]" />
            <span className="font-headline text-base font-extrabold uppercase tracking-[0.18em] text-white">
              TradePilot
            </span>
          </a>
        </MotionItem>

        <MotionItem>
          <div className="flex flex-wrap items-center justify-center gap-7">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-mono-sm uppercase tracking-[0.16em] text-on-surface-variant transition hover:text-secondary"
              >
                {link}
              </a>
            ))}
          </div>
        </MotionItem>

        <MotionItem>
          <p className="font-mono text-mono-sm uppercase tracking-[0.14em] text-on-surface-variant/70">
            © 2026 TradePilot Systems
          </p>
        </MotionItem>
      </MotionStagger>
    </footer>
  );
}
