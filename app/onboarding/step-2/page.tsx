import type { Metadata } from "next";
import { ArrowRight, BarChart3, CandlestickChart, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "TradePilot - Onboarding Step 2"
};

export default function OnboardingStepTwoPage() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col overflow-hidden bg-transparent text-on-background selection:bg-primary-container selection:text-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(77,142,255,0.15)_0%,transparent_40%),radial-gradient(circle_at_bottom_left,rgba(76,215,246,0.1)_0%,transparent_40%)]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-secondary/5 blur-[80px]" />

      <header className="z-20 flex h-20 w-full items-center justify-between px-8">
        <div className="flex items-center gap-2 text-white">
          <BarChart3 className="h-7 w-7 fill-white text-white" />
          <span className="font-headline text-headline-md font-bold uppercase tracking-tight text-white">TradePilot</span>
        </div>
        <span className="rounded-full border border-white/5 bg-surface-container/50 px-3 py-1 font-body text-label-md text-on-surface-variant backdrop-blur-md">
          STEP 2 OF 3
        </span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center p-8">
        <div className="glass-panel absolute left-10 top-1/2 hidden h-48 w-64 -translate-y-1/2 -rotate-6 rounded-xl border border-white/5 p-4 shadow-[0_0_30px_rgba(77,142,255,0.05)] lg:block">
          <div className="flex h-full flex-col gap-2">
            <div className="h-2 w-1/3 rounded-full bg-primary/20" />
            <div className="relative mt-2 flex-grow">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                <path d="M0 35 Q 20 25, 40 30 T 80 18 L 100 24 L 100 50 L 0 50 Z" fill="rgba(76,215,246,0.1)" />
                <path
                  className="drop-shadow-[0_0_5px_rgba(76,215,246,0.45)]"
                  d="M0 35 Q 20 25, 40 30 T 80 18 L 100 24"
                  fill="none"
                  stroke="#4cd7f6"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass-panel absolute right-10 top-1/3 hidden h-56 w-48 rotate-3 rounded-xl border border-white/5 p-4 shadow-[0_0_30px_rgba(76,215,246,0.05)] lg:block">
          <div className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
                <CandlestickChart className="h-4 w-4 text-secondary" />
              </div>
              <div className="text-xs text-tertiary">Secured</div>
            </div>
            <div className="mt-2 flex flex-grow items-end gap-1">
              <div className="h-2/5 w-1/4 rounded-t-sm bg-secondary/20" />
              <div className="h-3/4 w-1/4 rounded-t-sm bg-secondary/40" />
              <div className="h-full w-1/4 rounded-t-sm bg-secondary/60 shadow-[0_0_10px_rgba(76,215,246,0.3)]" />
              <div className="h-3/5 w-1/4 rounded-t-sm bg-secondary/30" />
            </div>
          </div>
        </div>

        <div className="z-20 flex w-full max-w-xl flex-col gap-stack-lg">
          <div className="flex flex-col gap-stack-sm text-center md:text-left">
            <h1 className="font-headline text-headline-xl text-on-surface">Secure Contact Channel</h1>
            <p className="max-w-md font-body text-body-lg text-on-surface-variant">
              Enter your email so we can attach this demo session to your TradePilot profile.
            </p>
          </div>

          <form action="/onboarding/step-3" className="mt-4 flex flex-col gap-stack-lg" method="get">
            <div className="group flex flex-col gap-stack-sm">
              <label className="pl-1 font-body text-label-md uppercase tracking-wider text-on-surface-variant" htmlFor="email">
                Work Email
              </label>
              <div className="relative rounded-lg border border-outline-variant bg-surface-container/60 p-1 transition-all duration-300 group-focus-within:border-secondary group-focus-within:shadow-[0_0_15px_rgba(76,215,246,0.4)]">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full rounded-md border-none bg-transparent px-4 py-4 font-body text-body-lg text-on-surface placeholder:text-outline focus:ring-0"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 transition-opacity group-focus-within:opacity-100">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4">
              <button type="submit" className="group relative overflow-hidden rounded-lg p-[1px]">
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center gap-2 rounded-[7px] bg-surface-bright/80 px-8 py-4 font-body text-label-md uppercase tracking-wider text-on-surface transition-colors group-hover:bg-surface-bright/60">
                  Continue
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-1 w-12 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.6)]" />
            <div className="h-1 w-12 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.6)]" />
            <div className="h-2 w-2 rounded-full bg-outline-variant" />
          </div>
        </div>
      </main>
    </div>
  );
}
