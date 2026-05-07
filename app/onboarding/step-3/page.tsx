import type { Metadata } from "next";
import Link from "next/link";
import {
  Bitcoin,
  Bolt,
  BrainCircuit,
  Building2,
  Check,
  CirclePlus,
  HeartPulse,
  Microchip,
  Rocket,
  Search
} from "lucide-react";

export const metadata: Metadata = {
  title: "TradePilot Onboarding - Select Industry"
};

const industries = [
  {
    title: "Digital Assets",
    description: "High-frequency tracking of decentralized finance, cryptocurrencies, and blockchain networks.",
    readiness: "AI Readiness: 98%",
    icon: Bitcoin,
    tone: "text-primary",
    active: true
  },
  {
    title: "Tech & AI",
    description: "Semiconductors, cloud infrastructure, and emerging artificial intelligence ventures.",
    readiness: "AI Readiness: 94%",
    icon: Microchip,
    tone: "text-secondary"
  },
  {
    title: "Energy Transition",
    description: "Renewables, smart grids, EV infrastructure, and traditional energy commodities.",
    readiness: "AI Readiness: 88%",
    icon: Bolt,
    tone: "text-tertiary"
  },
  {
    title: "Biotech",
    description: "Pharmaceuticals, genomic research, and next-generation medical devices.",
    readiness: "AI Readiness: 82%",
    icon: HeartPulse,
    tone: "text-on-surface"
  },
  {
    title: "TradFi",
    description: "Legacy banking, institutional finance, and global macro-economic indicators.",
    readiness: "AI Readiness: 91%",
    icon: Building2,
    tone: "text-primary"
  }
];

export default function OnboardingStepThreePage() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col overflow-x-hidden bg-transparent font-body text-body-md text-on-background selection:bg-primary-container selection:text-slate-950">
      <main className="relative flex flex-1 items-center justify-center p-container-padding py-section-gap">
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary opacity-10 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary opacity-10 blur-[150px]" />

        <div className="z-10 w-full max-w-5xl space-y-section-gap">
          <div className="space-y-stack-md text-center">
            <div className="glass-panel mb-stack-sm inline-flex items-center gap-unit rounded-full border border-primary/30 px-4 py-2 text-primary">
              <BrainCircuit className="h-[18px] w-[18px]" />
              <span className="font-body text-label-md uppercase tracking-wider">Step 3 of 3 - AI Profiling</span>
            </div>
            <h1 className="font-headline text-headline-xl text-on-surface">Select Your Market Focus</h1>
            <p className="mx-auto max-w-2xl font-body text-body-lg text-on-surface-variant">
              Calibrate the TradePilot neural engine. Select the industry vectors you want to track for algorithmic insights.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ title, description, readiness, icon: Icon, tone, active }) => (
              <button
                key={title}
                className={`glass-panel group relative flex h-full flex-col gap-stack-md rounded-xl p-6 text-left transition-all duration-300 ${
                  active ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(173,198,255,0.3)]" : "hover:border-outline"
                }`}
                type="button"
              >
                {active ? <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#adc6ff]" /> : null}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant ${
                    active ? "bg-surface-container-highest" : "bg-surface-container"
                  } ${tone}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-grow space-y-stack-sm">
                  <h3 className="font-headline text-headline-md text-on-surface">{title}</h3>
                  <p className="font-body text-body-sm text-on-surface-variant">{description}</p>
                </div>
                <div
                  className={`flex items-center justify-between border-t pt-stack-sm font-body text-label-md uppercase ${
                    active ? "border-outline-variant/50 text-primary" : "border-outline-variant/30 text-on-surface-variant"
                  }`}
                >
                  <span>{readiness}</span>
                  {active ? <Check className="h-[18px] w-[18px]" /> : <CirclePlus className="h-[18px] w-[18px]" />}
                </div>
              </button>
            ))}

            <button
              type="button"
              className="glass-panel group relative flex h-full flex-col items-center justify-center gap-stack-md rounded-xl border border-dashed border-outline-variant p-6 text-center transition-all duration-300 hover:border-primary"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface-variant transition-colors group-hover:border-primary group-hover:text-primary">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-headline-md text-on-surface">Explore More</h3>
              <p className="font-body text-body-sm text-on-surface-variant">Search for specific micro-sectors.</p>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-stack-md border-t border-outline-variant/30 pt-stack-lg">
            <p className="flex items-center gap-2 font-body text-body-sm text-on-surface-variant">
              <Check className="h-4 w-4 text-tertiary" />
              Neural engine calibrated based on 1 selection.
            </p>
            <Link
              href="/dashboard"
              className="flex items-center gap-unit rounded-lg bg-primary px-8 py-4 font-headline text-[20px] font-bold text-slate-950 shadow-[0_0_30px_rgba(77,142,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(77,142,255,0.6)]"
            >
              Launch Intelligence Dashboard
              <Rocket className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
