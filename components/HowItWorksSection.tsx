"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/data/site";
import { cn } from "@/lib/utils";

const stepSpacing = 126;
const wheelLockMs = 320;

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastWheelAt = useRef(0);
  const progressHeight = `${(activeIndex / (processSteps.length - 1)) * 100}%`;

  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      if (event.ctrlKey || Math.abs(event.deltaY) < 8) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const direction = Math.sign(event.deltaY);
      const captureLine = window.innerHeight * 0.18;
      const releaseLine = window.innerHeight * 0.78;
      const isInCaptureRange = rect.top <= captureLine && rect.bottom >= releaseLine;
      const isMovingDown = direction > 0 && activeIndex < processSteps.length - 1;
      const isMovingUp = direction < 0 && activeIndex > 0 && rect.top < 120;

      if (!isInCaptureRange || (!isMovingDown && !isMovingUp)) return;

      event.preventDefault();

      if (Math.abs(rect.top) > 2) {
        window.scrollBy({ top: rect.top, behavior: "auto" });
      }

      const now = Date.now();
      if (now - lastWheelAt.current < wheelLockMs) return;

      lastWheelAt.current = now;
      setActiveIndex((current) => Math.min(processSteps.length - 1, Math.max(0, current + direction)));
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex]);

  return (
<section
  id="how-it-works"
  ref={sectionRef}
  data-nav-section="how-it-works"
  className="relative h-screen overflow-visible px-5 md:px-8"
>
  <div className="flex h-screen items-center overflow-visible pt-20">
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      {/* left content */}

      <div className="relative mx-auto h-[min(42rem,calc(100vh-4rem))] w-full max-w-[60rem] overflow-visible px-14 py-16">
        <div className="absolute -inset-x-16 -inset-y-16 overflow-visible">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background via-background/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="pointer-events-none absolute left-14 right-14 top-1/2 z-10 h-px bg-gradient-to-r from-transparent via-secondary/45 to-transparent" />

          <div className="relative h-full overflow-hidden px-16">
            <motion.div
              className="space-y-5 py-[15rem]"
              animate={{ y: -activeIndex * stepSpacing }}
              transition={{ duration: 0.36, ease: [0.2, 0.9, 0.2, 1] }}
            >
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const distance = Math.abs(activeIndex - index);
                const isActive = activeIndex === index;

                return (
                  <motion.article
                    key={step.number}
                    className={cn(
                      "relative grid min-h-[7rem] grid-cols-[3.5rem_1fr_auto] items-center gap-4 rounded-xl border px-5 py-4 backdrop-blur-md transition duration-500",
                      isActive
                        ? "border-secondary/45 bg-white/[0.06] opacity-100 shadow-cyan-glow"
                        : "border-white/10 bg-white/[0.025] opacity-45 blur-[1.5px]",
                      distance > 1 && "opacity-20 blur-[3px]"
                    )}
                    animate={{ scale: isActive ? 1 : 0.94 }}
                    transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
                  >
                    <p className={cn("font-headline text-3xl font-black text-white/25", isActive && "text-secondary")}>
                      {step.number}
                    </p>
                    <div>
                      <h3 className="font-headline text-xl font-bold text-white">{step.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-on-surface-variant">{step.description}</p>
                    </div>
                    <div className={cn("hidden h-12 w-12 items-center justify-center rounded-xl border md:flex", isActive ? "border-secondary/35 bg-secondary/10 text-secondary" : "border-white/10 bg-white/[0.03] text-white/50")}>
                      <Icon size={22} />
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
