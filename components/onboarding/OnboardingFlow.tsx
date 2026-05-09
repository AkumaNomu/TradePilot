"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bitcoin,
  Bolt,
  Building2,
  Check,
  Mail,
  Microchip,
  Rocket,
  UserRound
} from "lucide-react";

import { useTransition } from "@/components/TransitionProvider";
import { FloatingFx } from "@/components/FloatingFx";
import { Logo } from "@/components/Logo";

type Step = 1 | 2 | 3;

type ProfileDraft = {
  fullName: string;
  email: string;
  industry: string;
};

const easeOut = [0.2, 0.9, 0.2, 1] as const;

const industries = [
  { title: "Digital Assets", description: "DeFi, crypto and on-chain networks.", icon: Bitcoin },
  { title: "Tech & AI", description: "Semiconductors, cloud and frontier AI.", icon: Microchip },
  { title: "Energy", description: "Renewables, grids and EV infrastructure.", icon: Bolt },
  { title: "Biotech", description: "Pharma, genomics and medical devices.", icon: BarChart3 },
  { title: "TradFi", description: "Banks, institutions and macro signals.", icon: Building2 }
] as const;

const stepCopy: Record<Step, { title: string; subtitle: string }> = {
  1: {
    title: "What should we call you?",
    subtitle: "Your name personalizes every signal we surface."
  },
  2: {
    title: "Where should we reach you?",
    subtitle: "We deliver intelligence briefings and access keys to this address."
  },
  3: {
    title: "Choose your focus.",
    subtitle: "We calibrate the engine to the sectors that move you."
  }
};

const PROFILE_STORAGE_KEY = "tradepilot_onboarding_profile";
const DEFAULT_PROFILE: ProfileDraft = {
  fullName: "",
  email: "",
  industry: industries[0].title
};

function loadStoredProfile(): ProfileDraft {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const saved = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!saved) return DEFAULT_PROFILE;
  try {
    const parsed = JSON.parse(saved) as Partial<ProfileDraft>;
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

const stepVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

const stepTransition = { duration: 0.4, ease: easeOut };

function PrimaryButton({
  children,
  onClick,
  disabled
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="group relative inline-flex min-w-[160px] items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-body text-label-md uppercase text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary" />
      <span className="absolute inset-0 rounded-full bg-white/0 transition group-hover:bg-white/10" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

function GhostButton({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 font-body text-label-md uppercase text-on-surface-variant transition hover:border-white/20 hover:text-white"
    >
      {children}
    </motion.button>
  );
}

function ProgressLine({ step }: { step: Step }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[2px] w-full items-stretch gap-1 px-0">
      {[1, 2, 3].map((seg) => {
        const reached = seg <= step;
        return (
          <div key={seg} className="relative flex-1 overflow-hidden bg-white/[0.05]">
            <motion.div
              className="absolute inset-y-0 left-0"
              initial={false}
              animate={{ width: reached ? "100%" : "0%" }}
              transition={{ duration: 0.55, ease: easeOut }}
              style={{
                background: "linear-gradient(90deg, #adc6ff, #4cd7f6 55%, #4edea3)",
                boxShadow: "0 0 12px rgba(76,215,246,0.7), 0 0 24px rgba(76,215,246,0.35)"
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function OnboardingFlow() {
  const router = useRouter();
  const transition = useTransition();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<ProfileDraft>(loadStoredProfile);

  useEffect(() => {
    const t = window.setTimeout(() => transition.hide(), 420);
    return () => window.clearTimeout(t);
  }, [transition]);

  const copy = stepCopy[step];

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
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) return;
    const next = { ...form, email };
    setForm(next);
    persistDraft(next);
    setStep(3);
  };

  const completeOnboarding = () => {
    const finalProfile = { ...form, completedAt: new Date().toISOString() };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(finalProfile));
    transition.show("Launching", "Routing live signals to your workspace");
    window.setTimeout(() => router.push("/dashboard"), 240);
  };

  const fullNameValid = form.fullName.trim().length > 0;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  return (
    <div className="relative z-10 flex h-[100dvh] flex-col overflow-hidden bg-background font-body text-body-md text-on-background selection:bg-primary-container selection:text-slate-950">
      <ProgressLine step={step} />

      <div className="absolute inset-0 -z-10">
        <FloatingFx variant="onboarding" />
      </div>

      <header className="relative z-20 flex h-16 w-full shrink-0 items-center justify-between px-6 pt-1 md:px-10">
        <div className="flex items-center gap-2.5 text-white">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-secondary/50" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(76,215,246,0.85)]" />
          </span>
          <Logo variant="minimal" />
        </div>
        <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 backdrop-blur-md">
          <span className="font-body text-[0.74rem] font-semibold tracking-wide text-secondary">Step {step}</span>
          <span className="font-body text-[0.74rem] font-medium tracking-wide text-on-surface-variant/70">of 3</span>
        </span>
      </header>

      <main className="relative z-10 flex flex-1 min-h-0 items-center justify-center px-6 pb-10 md:px-10">
        <div className="grid w-full max-w-4xl grid-rows-[auto_minmax(0,1fr)_auto] gap-8">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
            <motion.h1
              key={`title-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="font-headline text-display-lg text-white"
            >
              {copy.title}
            </motion.h1>
            <motion.p
              key={`sub-${step}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.08 }}
              className="max-w-lg font-body text-body-lg leading-relaxed text-on-surface-variant"
            >
              {copy.subtitle}
            </motion.p>
          </div>

          <div className="relative flex min-h-[220px] w-full items-start justify-center">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step-1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  onSubmit={goToStepTwo}
                  id="onboarding-form-1"
                  className="mx-auto w-full max-w-md"
                >
                  <label
                    className="font-body text-label-sm uppercase text-on-surface-variant"
                    htmlFor="fullName"
                  >
                    Full name
                  </label>
                  <div className="group relative mt-3 border-b border-white/20 transition-colors duration-200 focus-within:border-secondary">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      autoFocus
                      value={form.fullName}
                      onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                      placeholder="Jane Doe"
                      className="w-full border-none bg-transparent px-0 py-2 font-body text-2xl font-semibold text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-0"
                    />
                  </div>
                </motion.form>
              ) : null}

              {step === 2 ? (
                <motion.form
                  key="step-2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  onSubmit={goToStepThree}
                  id="onboarding-form-2"
                  className="mx-auto w-full max-w-md"
                >
                  <label
                    className="font-body text-label-sm uppercase text-on-surface-variant"
                    htmlFor="email"
                  >
                    Work email
                  </label>
                  <div className="group relative mt-3 border-b border-white/20 transition-colors duration-200 focus-within:border-secondary">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      autoFocus
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="jane@company.com"
                      className="w-full border-none bg-transparent px-0 py-2 font-body text-2xl font-semibold text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-0"
                    />
                  </div>
                </motion.form>
              ) : null}

              {step === 3 ? (
                <motion.div
                  key="step-3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  className="w-full"
                >
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                    {industries.map(({ title, description, icon: Icon }) => {
                      const active = form.industry === title;
                      return (
                        <motion.button
                          key={title}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 28 }}
                          onClick={() => {
                            const next = { ...form, industry: title };
                            setForm(next);
                            persistDraft(next);
                          }}
                          className={`group relative flex h-[150px] flex-col justify-between rounded-md border p-3.5 text-left transition-colors duration-200 ${
                            active
                              ? "border-secondary/50 bg-secondary/[0.04]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <Icon
                              className={`h-4 w-4 ${active ? "text-secondary" : "text-on-surface-variant"}`}
                            />
                            {active ? (
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-slate-950">
                                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                              </span>
                            ) : null}
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-headline text-sm text-white">{title}</h3>
                            <p className="font-body text-label-sm leading-relaxed text-on-surface-variant">
                              {description}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <footer className="mx-auto flex w-full max-w-md items-center justify-between">
            <div className="min-w-[110px]">
              {step > 1 ? (
                <GhostButton onClick={() => setStep((s) => (s === 3 ? 2 : 1))}>
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </GhostButton>
              ) : (
                <span className="inline-block min-w-[110px]" />
              )}
            </div>

            <div>
              {step === 1 ? (
                <PrimaryButton
                  disabled={!fullNameValid}
                  onClick={() => (document.getElementById("onboarding-form-1") as HTMLFormElement | null)?.requestSubmit()}
                >
                  Continue
                  <ArrowRight className="h-3.5 w-3.5" />
                </PrimaryButton>
              ) : null}
              {step === 2 ? (
                <PrimaryButton
                  disabled={!emailValid}
                  onClick={() => (document.getElementById("onboarding-form-2") as HTMLFormElement | null)?.requestSubmit()}
                >
                  Continue
                  <ArrowRight className="h-3.5 w-3.5" />
                </PrimaryButton>
              ) : null}
              {step === 3 ? (
                <PrimaryButton onClick={completeOnboarding}>
                  Launch
                  <Rocket className="h-3.5 w-3.5" />
                </PrimaryButton>
              ) : null}
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
