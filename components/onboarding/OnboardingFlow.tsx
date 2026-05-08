"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bitcoin,
  Bolt,
  BrainCircuit,
  Building2,
  Check,
  Mail,
  Microchip,
  Rocket,
  Sparkles,
  UserRound
} from "lucide-react";
import { AnimatedText } from "@/components/AnimatedText";
import { useTransition } from "@/components/TransitionProvider";

type Step = 1 | 2 | 3;

type ProfileDraft = {
  fullName: string;
  email: string;
  industry: string;
};

const industries = [
  {
    title: "Digital Assets",
    description: "DeFi, crypto and on-chain networks.",
    readiness: "Readiness 98%",
    icon: Bitcoin,
    tone: "text-primary"
  },
  {
    title: "Tech & AI",
    description: "Semiconductors, cloud and frontier AI.",
    readiness: "Readiness 94%",
    icon: Microchip,
    tone: "text-secondary"
  },
  {
    title: "Energy Transition",
    description: "Renewables, grids and EV infrastructure.",
    readiness: "Readiness 88%",
    icon: Bolt,
    tone: "text-tertiary"
  },
  {
    title: "Biotech",
    description: "Pharma, genomics and medical devices.",
    readiness: "Readiness 82%",
    icon: BarChart3,
    tone: "text-on-surface"
  },
  {
    title: "TradFi",
    description: "Banks, institutions and macro signals.",
    readiness: "Readiness 91%",
    icon: Building2,
    tone: "text-primary"
  }
] as const;

const stepCopy: Record<Step, { eyebrow: string; title: string; accent: string; subtitle: string }> = {
  1: {
    eyebrow: "Step 01 — Identity",
    title: "What should we call",
    accent: "you?",
    subtitle: "Your name personalizes every signal we surface."
  },
  2: {
    eyebrow: "Step 02 — Channel",
    title: "Open a private",
    accent: "channel.",
    subtitle: "We deliver intelligence briefings and access keys here."
  },
  3: {
    eyebrow: "Step 03 — Focus",
    title: "Tune your market",
    accent: "frequency.",
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

const stepVariants = {
  enter: { opacity: 0, y: 20, filter: "blur(10px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, filter: "blur(8px)" }
};

const stepTransition = { duration: 0.5, ease: [0.2, 0.9, 0.2, 1] as const };

function PrimaryButton({
  children,
  type = "button",
  onClick
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-headline text-label-md uppercase tracking-[0.16em] text-slate-950"
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary opacity-95 transition-opacity group-hover:opacity-100" />
      <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_38px_rgba(76,215,246,0.55)] transition-opacity duration-300 group-hover:opacity-100" />
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
      className="glass-panel inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-headline text-label-md uppercase tracking-[0.16em] text-on-surface-variant transition duration-300 hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </motion.button>
  );
}

function StepProgress({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((index) => {
        const reached = index <= step;
        const active = index === step;
        return (
          <div key={index} className="flex items-center gap-2">
            <div className="relative flex h-7 w-7 items-center justify-center">
              <span
                className={`absolute inset-0 rounded-full border transition-colors duration-500 ${
                  reached ? "border-secondary/60" : "border-white/10"
                }`}
              />
              {active ? (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  animate={{ boxShadow: [
                    "0 0 0 0 rgba(76,215,246,0.0)",
                    "0 0 0 6px rgba(76,215,246,0.18)",
                    "0 0 0 0 rgba(76,215,246,0.0)"
                  ] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
              <span
                className={`relative h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                  reached ? "bg-gradient-to-r from-primary to-secondary shadow-[0_0_12px_rgba(76,215,246,0.6)]" : "bg-white/15"
                }`}
              />
            </div>
            {index < 3 ? (
              <div className="relative h-px w-8 overflow-hidden bg-white/10">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary"
                  initial={false}
                  animate={{ width: index < step ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function CornerBrackets() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {[
        "left-3 top-3 border-l-2 border-t-2",
        "right-3 top-3 border-r-2 border-t-2",
        "left-3 bottom-3 border-l-2 border-b-2",
        "right-3 bottom-3 border-r-2 border-b-2"
      ].map((cls) => (
        <motion.span
          key={cls}
          className={`absolute h-5 w-5 ${cls} border-secondary/50`}
          animate={{ opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function OnboardingFlow() {
  const router = useRouter();
  const transition = useTransition();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<ProfileDraft>(loadStoredProfile);

  useEffect(() => {
    const t = window.setTimeout(() => transition.hide(), 480);
    return () => window.clearTimeout(t);
  }, [transition]);

  const copy = stepCopy[step];
  const stepBadge = useMemo(() => `0${step} / 03`, [step]);

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

    transition.show("Launching Dashboard", "Routing live market signals to your workspace");
    window.setTimeout(() => {
      router.push("/dashboard");
    }, 280);
  };

  return (
    <div
      className="relative z-10 flex h-[100dvh] flex-col overflow-hidden font-body text-body-md text-on-background selection:bg-primary-container selection:text-slate-950"
      style={{
        background:
          "radial-gradient(circle at 14% 16%, rgba(0,165,114,0.14), transparent 40rem), radial-gradient(circle at 86% 22%, rgba(76,215,246,0.14), transparent 34rem), radial-gradient(circle at 50% 100%, rgba(77,142,255,0.10), transparent 38rem), #050a18"
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[-10%] top-[6%] h-[28rem] w-[28rem] rounded-full bg-primary-container/14 blur-[120px]"
          animate={{ x: [0, 28, 0], y: [0, -18, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-4%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-secondary/12 blur-[120px]"
          animate={{ x: [0, -22, 0], y: [0, 20, 0], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-12%] left-[24%] h-[26rem] w-[26rem] rounded-full bg-tertiary-container/14 blur-[140px]"
          animate={{ x: [0, 16, 0], y: [0, -22, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(circle at 50% 30%, black 5%, transparent 70%)"
          }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <header className="relative z-20 flex h-16 w-full shrink-0 items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-2 text-white">
          <BarChart3 className="h-6 w-6 text-white" />
          <span className="font-headline text-headline-md font-bold uppercase tracking-tight text-white">TradePilot</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-body text-label-md uppercase tracking-[0.18em] text-on-surface-variant md:inline">
            {stepBadge}
          </span>
          <StepProgress step={step} />
        </div>
      </header>

      <main className="relative z-10 flex flex-1 min-h-0 items-center justify-center px-4 pb-6 md:px-10">
        <div className="flex w-full max-w-5xl flex-col">
          <div className="mb-5 flex flex-col items-center gap-2 text-center md:mb-7">
            <motion.span
              key={`eyebrow-${step}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-headline text-[0.7rem] uppercase tracking-[0.22em] text-secondary backdrop-blur-md"
            >
              <Sparkles className="h-3 w-3" />
              {copy.eyebrow}
            </motion.span>
            <motion.h1
              key={`title-${step}`}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
              className="font-headline text-[clamp(1.85rem,4.6vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-white"
            >
              <span className="block text-white">
                <AnimatedText text={copy.title} mode="words" stagger={0.04} />
              </span>
              <span className="neon-text-glow inline-block bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                <AnimatedText text={copy.accent} mode="letters" stagger={0.025} />
              </span>
            </motion.h1>
            <motion.p
              key={`sub-${step}`}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1], delay: 0.12 }}
              className="max-w-xl font-body text-body-sm text-on-surface-variant md:text-body-md"
            >
              {copy.subtitle}
            </motion.p>
          </div>

          <div className="flex min-h-0 flex-1 items-start justify-center">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.section
                  key="step-1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  className="mx-auto w-full max-w-xl"
                >
                  <form
                    className="glass-panel gradient-border relative flex flex-col gap-5 rounded-3xl p-6 md:p-8"
                    onSubmit={goToStepTwo}
                  >
                    <CornerBrackets />
                    <div className="flex flex-col gap-2">
                      <label
                        className="pl-1 font-headline text-[0.7rem] uppercase tracking-[0.2em] text-on-surface-variant"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="group relative rounded-2xl border border-white/10 bg-surface-container-low/60 transition-all duration-300 focus-within:border-secondary/60 focus-within:shadow-[0_0_28px_rgba(76,215,246,0.25)]">
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
                          className="w-full rounded-2xl border-none bg-transparent px-5 py-3.5 pr-12 font-body text-body-md text-white placeholder:text-outline focus:outline-none focus:ring-0"
                        />
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-secondary/80">
                          <UserRound className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-1">
                      <PrimaryButton type="submit">
                        Establish Uplink
                        <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                    </div>
                  </form>
                </motion.section>
              ) : null}

              {step === 2 ? (
                <motion.section
                  key="step-2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  className="mx-auto w-full max-w-xl"
                >
                  <form
                    className="glass-panel gradient-border relative flex flex-col gap-5 rounded-3xl p-6 md:p-8"
                    onSubmit={goToStepThree}
                  >
                    <CornerBrackets />
                    <div className="flex flex-col gap-2">
                      <label
                        className="pl-1 font-headline text-[0.7rem] uppercase tracking-[0.2em] text-on-surface-variant"
                        htmlFor="email"
                      >
                        Professional Email
                      </label>
                      <div className="group relative rounded-2xl border border-white/10 bg-surface-container-low/60 transition-all duration-300 focus-within:border-secondary/60 focus-within:shadow-[0_0_28px_rgba(76,215,246,0.25)]">
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
                          className="w-full rounded-2xl border-none bg-transparent px-5 py-3.5 pr-12 font-body text-body-md text-white placeholder:text-outline focus:outline-none focus:ring-0"
                        />
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-secondary/80">
                          <Mail className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="pl-1 pt-0.5 font-body text-body-sm text-on-surface-variant/80">
                        Hello {form.fullName.split(" ")[0] || "there"} — we&rsquo;ll send your access keys here.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <GhostButton onClick={() => setStep(1)}>
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </GhostButton>
                      <PrimaryButton type="submit">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                    </div>
                  </form>
                </motion.section>
              ) : null}

              {step === 3 ? (
                <motion.section
                  key="step-3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={stepTransition}
                  className="flex w-full flex-col gap-5"
                >
                  <motion.div
                    className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { delayChildren: 0.08, staggerChildren: 0.06 } }
                    }}
                  >
                    {industries.map(({ title, description, readiness, icon: Icon, tone }) => {
                      const active = form.industry === title;
                      return (
                        <motion.button
                          key={title}
                          type="button"
                          variants={{
                            hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
                            show: { opacity: 1, y: 0, filter: "blur(0px)" }
                          }}
                          transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const next = { ...form, industry: title };
                            setForm(next);
                            persistDraft(next);
                          }}
                          className={`glass-panel group relative flex h-full flex-col gap-2.5 overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ${
                            active
                              ? "border-secondary/60 shadow-[0_0_36px_rgba(76,215,246,0.25)]"
                              : "hover:border-white/20"
                          }`}
                        >
                          {active ? (
                            <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(76,215,246,0.18),transparent_60%)]" />
                          ) : null}
                          <div className="flex items-start justify-between">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-container/70 ${tone}`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            {active ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-slate-950 shadow-[0_0_18px_rgba(76,215,246,0.55)]">
                                <Check className="h-3 w-3" />
                              </span>
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                            )}
                          </div>
                          <div className="flex-grow space-y-1">
                            <h3 className="font-headline text-base font-semibold leading-tight text-white">{title}</h3>
                            <p className="font-body text-[0.78rem] leading-snug text-on-surface-variant">{description}</p>
                          </div>
                          <div
                            className={`flex items-center justify-between border-t pt-2 font-headline text-[0.62rem] uppercase tracking-[0.16em] ${
                              active ? "border-secondary/30 text-secondary" : "border-white/10 text-on-surface-variant"
                            }`}
                          >
                            <span>{readiness}</span>
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-md">
                    <div className="inline-flex items-center gap-2 font-headline text-[0.7rem] uppercase tracking-[0.2em] text-tertiary">
                      <BrainCircuit className="h-4 w-4" />
                      Engine calibrated for {form.industry}
                    </div>
                    <div className="flex items-center gap-2">
                      <GhostButton onClick={() => setStep(2)}>
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </GhostButton>
                      <PrimaryButton onClick={completeOnboarding}>
                        Launch Dashboard
                        <Rocket className="h-4 w-4" />
                      </PrimaryButton>
                    </div>
                  </div>
                </motion.section>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
