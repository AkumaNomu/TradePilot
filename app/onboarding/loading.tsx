import { LoaderCircle } from "lucide-react";

export default function OnboardingLoading() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center bg-slate-950 text-on-surface">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
        <LoaderCircle className="h-5 w-5 animate-spin text-secondary" />
        <span className="font-body text-label-md uppercase tracking-[0.14em] text-on-surface-variant">Loading Onboarding</span>
      </div>
    </div>
  );
}
