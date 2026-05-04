"use client";

import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = PropsWithChildren<{
  className?: string;
  delayMs?: number;
  once?: boolean;
  threshold?: number;
  active?: boolean;
}>;

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  once = true,
  threshold = 0.18,
  active = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!active) {
      setIsVisible(false);
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) setIsVisible(false);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active, once, threshold]);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", isVisible && "is-visible", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
