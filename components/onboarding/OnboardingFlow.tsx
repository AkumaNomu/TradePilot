"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Bitcoin,
  Bolt,
  BrainCircuit,
  Building2,
  Check,
  LoaderCircle,
  Mail,
  Microchip,
  Rocket,
  UserRound
} from "lucide-react";

type Step = 1 | 2 | 3;

type ProfileDraft = {
  fullName: string;
  email: string;
  industry: string;
};

const industries = [
  {
    title: "Digital Assets",
    description: "High-frequency tracking of decentralized finance, cryptocurrencies, and blockchain networks.",
    readiness: "AI Readiness: 98%",
    icon: Bitcoin,
    tone: "text-primary"
  },
  {
    title: "Tech and AI",
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
    icon: BarChart3,
    tone: "text-on-surface"
  },
  {
    title: "TradFi",
    description: "Legacy banking, institutional finance, and global macro-economic indicators.",
    readiness: "AI Readiness: 91%",
    icon: Building2,
    tone: "text-primary"
  }
] as const;

const PROFILE_STORAGE_KEY = "tradepilot_onboarding_profile";
const DEFAULT_PROFILE: ProfileDraft = {
  fullName: "",
  email: "",
  industry: industries[0].title
};

function loadStoredProfile(): ProfileDraft {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE;
  }

  const savedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!savedProfile) {
    return DEFAULT_PROFILE;
  }

  try {
    const parsed = JSON.parse(savedProfile) as Partial<ProfileDraft>;
    return {
      fullName: parsed.fullName ?? DEFAULT_PROFILE.fullName,
      email: parsed.email ?? DEFAULT_PROFILE.email,
      industry: parsed.industry ?? DEFAULT_PROFILE.industry
    };
  } catch {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    return DEFAULT_PROFILE;
  }
}

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [booting, setBooting] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Preparing onboarding...");
  const [form, setForm] = useState<ProfileDraft>(loadStoredProfile);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBooting(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  const stepBadge = useMemo(() => `STEP ${step} OF 3`, [step]);

  const persistDraft = (next: ProfileDraft) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
  };

  const goToStepTwo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.fullName.trim();
    if (!name) return;
    const next = { ...form, fullName: name };
    setForm(next);
    persistDraft(next);
    setStep(2);
  };

  const goToStepThree = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = form.email.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) return;
    const next = { ...form, email };
    setForm(next);
    persistDraft(next);
    setStep(3);
  };

  const completeOnboarding = () => {
    const finalProfile = {
      ...form,
      completedAt: new Date().toISOString()
    };

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(finalProfile));

    setStatusMessage("Launching intelligence dashboard...");
    setExiting(true);
    window.setTimeout(() => {
      router.push("/dashboard");
    }, 650);
  };

  const overlayVisible = booting || exiting;

  return (
    <div className="relative z-10 flex min-h-screen flex-col overflow-x-hidden bg-transparent font-body text-body-md text-on-background selection:bg-primary-container selection:text-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(77,142,255,0.15)_0%,transparent_40%),radial-gradient(circle_at_bottom_left,rgba(76,215,246,0.1)_0%,transparent_40%)]" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-secondary/5 blur-[80px]" />

      {overlayVisible ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/95 backdrop-blur-md">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3">
            <LoaderCircle className="h-5 w-5 animate-spin text-secondary" />
            <span className="font-body text-label-md uppercase tracking-[0.14em] text-on-surface-variant">{statusMessage}</span>
          </div>
        </div>
      ) : null}

      <header className="z-20 flex h-20 w-full items-center justify-between px-8">
        <div className="flex items-center gap-2 text-white">
          <BarChart3 className="h-7 w-7 fill-white text-white" />
          <span className="font-headline text-headline-md font-bold uppercase tracking-tight text-white">TradePilot</span>
        </div>
        <span className="rounded-full border border-white/5 bg-surface-container/50 px-3 py-1 font-body text-label-md text-on-surface-variant backdrop-blur-md">
          {stepBadge}
        </span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center p-container-padding py-section-gap">
        <div className="z-10 w-full max-w-5xl space-y-section-gap">
          {step === 1 ? (
            <section className="mx-auto flex w-full max-w-xl flex-col gap-stack-lg">
              <div className="flex flex-col gap-stack-sm text-center md:text-left">
                <h1 className="font-headline text-headline-xl text-on-surface">What should we call you?</h1>
  
              </div>

              <form className="mt-4 flex flex-col gap-stack-lg" onSubmit={goToStepTwo}>
                <div className="group flex flex-col gap-stack-sm">
                  <label className="pl-1 font-body text-label-md uppercase tracking-wider text-on-surface-variant" htmlFor="fullName">
                    Full Name
                  </label>
                  <div className="relative rounded-lg border border-outline-variant bg-surface-container/60 p-1 transition-all duration-300 group-focus-within:border-secondary group-focus-within:shadow-[0_0_15px_rgba(76,215,246,0.4)]">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.fullName}
                      onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                      placeholder="Jane Doe"
                      className="w-full rounded-md border-none bg-transparent px-4 py-4 font-body text-body-lg text-on-surface placeholder:text-outline focus:ring-0"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-70">
                      <UserRound className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-4">
                  <button type="submit" className="group relative overflow-hidden rounded-lg p-[1px]">
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container opacity-80 transition-opacity group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2 rounded-[7px] bg-surface-bright/80 px-8 py-4 font-body text-label-md uppercase tracking-wider text-on-surface transition-colors group-hover:bg-surface-bright/60">
                      Establish Uplink
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </form>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="mx-auto flex w-full max-w-xl flex-col gap-stack-lg">
              <div className="flex flex-col gap-stack-sm text-center md:text-left">
                <h1 className="font-headline text-headline-xl text-on-surface">Join our waitlist</h1>
              </div>

              <form className="mt-4 flex flex-col gap-stack-lg" onSubmit={goToStepThree}>
                <div className="group flex flex-col gap-stack-sm">
                  <label className="pl-1 font-body text-label-md uppercase tracking-wider text-on-surface-variant" htmlFor="email">
                    Professional Email
                  </label>
                  <div className="relative rounded-lg border border-outline-variant bg-surface-container/60 p-1 transition-all duration-300 group-focus-within:border-secondary group-focus-within:shadow-[0_0_15px_rgba(76,215,246,0.4)]">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="jane@company.com"
                      className="w-full rounded-md border-none bg-transparent px-4 py-4 font-body text-body-lg text-on-surface placeholder:text-outline focus:ring-0"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-70">
                      <Mail className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-lg border border-white/10 px-5 py-3 font-body text-label-md uppercase tracking-wider text-on-surface-variant transition hover:border-white/20 hover:text-on-surface"
                  >
                    Back
                  </button>
                  <button type="submit" className="group relative overflow-hidden rounded-lg p-[1px]">
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container opacity-80 transition-opacity group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2 rounded-[7px] bg-surface-bright/80 px-8 py-4 font-body text-label-md uppercase tracking-wider text-on-surface transition-colors group-hover:bg-surface-bright/60">
                      Continue
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </form>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-section-gap">
              <div className="space-y-stack-md text-center">
                <div className="glass-panel mb-stack-sm inline-flex items-center gap-unit rounded-full border border-primary/30 px-4 py-2 text-primary">
                  <BrainCircuit className="h-[18px] w-[18px]" />
                  <span className="font-body text-label-md uppercase tracking-wider">Step 3 of 3 - AI Profiling</span>
                </div>
                <h1 className="font-headline text-headline-xl text-on-surface">Select Your Market Focus</h1>
              </div>

              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
                {industries.map(({ title, description, readiness, icon: Icon, tone }) => {
                  const active = form.industry === title;
                  return (
                    <button
                      key={title}
                      className={`glass-panel group relative flex h-full flex-col gap-stack-md rounded-xl p-6 text-left transition-all duration-300 ${
                        active ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(173,198,255,0.3)]" : "hover:border-outline"
                      }`}
                      type="button"
                      onClick={() => {
                        const next = { ...form, industry: title };
                        setForm(next);
                        persistDraft(next);
                      }}
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
                        {active ? <Check className="h-[18px] w-[18px]" /> : <ArrowRight className="h-[18px] w-[18px]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col items-center justify-center space-y-stack-md border-t border-outline-variant/30 pt-stack-lg">
                <p className="flex items-center gap-2 font-body text-body-sm text-on-surface-variant">
                  <Check className="h-4 w-4 text-tertiary" />
                  Neural engine calibrated for {form.industry}.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-lg border border-white/10 px-5 py-3 font-body text-label-md uppercase tracking-wider text-on-surface-variant transition hover:border-white/20 hover:text-on-surface"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={completeOnboarding}
                    className="flex items-center gap-unit rounded-lg bg-primary px-8 py-4 font-headline text-[20px] font-bold text-slate-950 shadow-[0_0_30px_rgba(77,142,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(77,142,255,0.6)]"
                  >
                    Launch Intelligence Dashboard
                    <Rocket className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}
