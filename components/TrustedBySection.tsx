"use client";

import { MotionItem, MotionStagger } from "@/components/MotionPrimitives";

const logos = ["Northwind", "Contoso", "Fabrikam", "Tailspin", "Adventure", "Litware"];

export function TrustedBySection() {
  return (
    <section aria-label="Trusted by" className="px-5 py-section-gap md:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionStagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" staggerChildren={0.05}>
          {logos.map((logo) => (
            <MotionItem key={logo}>
              <div className="glass-panel rounded-2xl px-4 py-4 text-center">
                <p className="font-headline text-sm font-black uppercase tracking-[0.12em] text-white/80">{logo}</p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
