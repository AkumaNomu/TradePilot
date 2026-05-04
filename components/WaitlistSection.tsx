"use client";

import { FormEvent, useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MotionItem, MotionReveal } from "@/components/MotionPrimitives";

export function WaitlistSection() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
  }

  return (
    <section id="waitlist" className="relative px-5 py-20 md:px-8 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[12%] bottom-[18%] h-96 w-96 rounded-full bg-primary-container/25 blur-[140px]" />
        <div className="absolute right-[12%] top-[10%] h-72 w-72 rounded-full bg-secondary/10 blur-[120px]" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="gradient-border glass-panel mx-auto max-w-3xl overflow-hidden rounded-[2.2rem] p-8 md:p-10">
          <MotionItem>
            <p className="font-headline text-label-sm uppercase tracking-[0.18em] text-secondary">Waitlist</p>
          </MotionItem>
          <MotionReveal delay={0.12}>
            <h2 className="mt-5 font-headline text-headline-md text-white">
              Get early access to TradePilot.
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.22}>
            <p className="mt-4 text-body-md text-on-surface-variant">
              Drop your email and we’ll send the demo link and launch updates.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.32}>
            {status === "success" ? (
              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 p-6">
                <p className="font-headline text-lg font-bold text-white">You’re on the list.</p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  We’ll reach out at <span className="text-white">{email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8">
                <label htmlFor={emailId} className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id={emailId}
                    type="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-panel h-14 flex-1 rounded-full px-6 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-secondary/70 to-primary-container/70 px-7 font-headline text-label-md uppercase tracking-[0.16em] text-white shadow-[0_0_24px_rgba(76,215,246,0.18)] transition hover:shadow-[0_0_36px_rgba(76,215,246,0.35)] focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  >
                    Join waitlist <ArrowRight size={16} />
                  </button>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
