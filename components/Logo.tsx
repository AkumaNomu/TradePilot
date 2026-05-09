"use client";

import { BarChart3 } from "lucide-react";

type LogoVariant = "default" | "sidebar" | "minimal";

interface LogoProps {
  variant?: LogoVariant;
}

export function Logo({ variant = "default" }: LogoProps) {
  if (variant === "sidebar") {
    return (
      <div className="logo-wrap">
        <span className="logo-mark">
          <BarChart3 size={16} strokeWidth={2.4} />
        </span>
        <div>
          <div className="logo-name">TradePilot</div>
          <div className="logo-tag">Workspace</div>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <span className="font-headline text-sm font-extrabold uppercase tracking-[0.2em] text-white">
        TradePilot
      </span>
    );
  }

  // default
  return (
    <div className="flex items-center gap-2.5 text-white">
      <span className="font-headline text-[0.95rem] font-extrabold uppercase tracking-[0.18em]">
        TradePilot
      </span>
    </div>
  );
}
