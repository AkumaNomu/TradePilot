"use client";

import { footerLinks } from "@/data/site";
import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

export function Footer() {
  return (
    <footer className="px-5 py-12 md:px-8">
      <MotionStagger
        className="glass-panel gradient-border mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-[2rem] px-6 py-8 md:flex-row md:px-8"
        staggerChildren={0.08}
      >
        <MotionItem>
          <a href="#" className="font-headline text-xl font-black uppercase tracking-[-0.05em] text-white">
            TradePilot
          </a>
        </MotionItem>

        <MotionItem>
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a key={link} href="#" className="font-headline text-sm text-slate-500 transition hover:text-blue-300">
                {link}
              </a>
            ))}
          </div>
        </MotionItem>

        <MotionItem>
          <p className="font-headline text-sm text-blue-400">&copy; 2026 TradePilot Intelligence Systems.</p>
        </MotionItem>
      </MotionStagger>
    </footer>
  );
}
