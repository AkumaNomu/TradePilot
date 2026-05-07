import type { Metadata } from "next";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  LayoutDashboard,
  LineChart,
  Lightbulb,
  Menu,
  MonitorUp,
  Plus,
  Radar,
  Search,
  Sparkles,
  TrendingUp,
  Upload,
  UserRound
} from "lucide-react";

const navigationItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Upload Data", icon: Upload },
  { label: "Forecast", icon: TrendingUp },
  { label: "Market Explorer", icon: Radar },
  { label: "Client Scoring", icon: Sparkles },
  { label: "Recommendations", icon: Lightbulb }
];

const kpis = [
  {
    label: "Total Volume",
    value: "$4.2B",
    detail: "+12.4% vs last week",
    detailTone: "positive" as const,
    icon: MonitorUp,
    iconColor: "text-secondary",
    glow: "bg-secondary/10 group-hover:bg-secondary/20"
  },
  {
    label: "Active Exposure",
    value: "$845M",
    detail: "-3.2% vs limit",
    detailTone: "negative" as const,
    icon: AlertTriangle,
    iconColor: "text-red-400",
    glow: "bg-red-400/10 group-hover:bg-red-400/20"
  },
  {
    label: "Alpha Gen",
    value: "1.84%",
    detail: "+0.4% alpha",
    detailTone: "positive" as const,
    icon: LineChart,
    iconColor: "text-primary",
    glow: "bg-primary/10 group-hover:bg-primary/20"
  },
  {
    label: "System Health",
    value: "99.9%",
    detail: "All nodes operational",
    detailTone: "neutral" as const,
    icon: Activity,
    iconColor: "text-tertiary",
    glow: "bg-tertiary/10 group-hover:bg-tertiary/20"
  }
];

export const metadata: Metadata = {
  title: "TradePilot Dashboard"
};

function KpiDetail({
  tone,
  text
}: {
  tone: "positive" | "negative" | "neutral";
  text: string;
}) {
  if (tone === "positive") {
    return (
      <div className="flex items-center gap-1 font-body text-label-sm text-tertiary">
        <ArrowUp className="h-3.5 w-3.5" />
        {text}
      </div>
    );
  }

  if (tone === "negative") {
    return (
      <div className="flex items-center gap-1 font-body text-label-sm text-red-400">
        <ArrowDown className="h-3.5 w-3.5" />
        {text}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 font-body text-label-sm text-on-surface-variant">
      <span className="h-2 w-2 rounded-full bg-tertiary shadow-[0_0_5px_rgba(78,222,163,0.8)]" />
      {text}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="relative z-10 min-h-screen bg-transparent text-on-background">
      <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/5 bg-slate-950/60 px-8 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.1)] md:hidden">
        <div className="font-headline text-2xl font-bold uppercase tracking-tight text-white">TradePilot</div>
        <button aria-label="Open menu" className="text-slate-400">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <aside className="glass-panel fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/5 px-4 pb-6 pt-8 md:flex">
        <div className="mb-10 px-4">
          <h1 className="font-headline text-2xl font-bold uppercase tracking-tight text-white [text-shadow:0_0_8px_rgba(77,142,255,0.5)]">
            TradePilot
          </h1>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navigationItems.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                active
                  ? "border-l-2 border-primary bg-primary-container/20 text-primary shadow-[0_0_15px_rgba(77,142,255,0.3)]"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-body text-label-md">{label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/5 pt-6">
          <div className="flex items-center gap-3 px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-[10px] font-bold text-slate-950">
              JD
            </div>
            <div>
              <div className="font-body text-label-md text-on-surface">J. Doe</div>
              <div className="font-body text-label-sm text-on-surface-variant">Analyst Level 4</div>
            </div>
            <UserRound className="ml-auto h-4 w-4 text-on-surface-variant" />
          </div>
        </div>
      </aside>

      <main className="min-h-screen flex-1 px-container-padding pb-section-gap pt-24 md:ml-64 md:pt-8">
        <header className="mb-stack-lg flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-headline text-headline-md text-on-surface md:text-headline-lg">Terminal Overview</h2>
            <p className="font-body text-body-sm text-on-surface-variant">System live. Last sync: 2m ago.</p>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline-variant" />
              <input
                type="text"
                placeholder="Search instruments..."
                className="glass-panel w-full rounded-lg border border-outline-variant bg-surface-container py-2 pl-10 pr-4 font-body text-body-sm text-on-surface outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary sm:w-64"
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-gradient-to-b from-primary to-primary-container px-6 py-2 font-body text-label-md text-slate-950 transition-all hover:shadow-[0_0_15px_rgba(77,142,255,0.4)]">
              <Plus className="h-4 w-4" />
              New Workspace
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
          {kpis.map(({ label, value, detail, detailTone, icon: Icon, iconColor, glow }) => (
            <section key={label} className="glass-panel group relative overflow-hidden rounded-xl p-stack-md">
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-all duration-500 ${glow}`} />
              <div className="relative z-10 mb-4 flex items-start justify-between">
                <span className="font-body text-label-md uppercase tracking-wider text-on-surface-variant">{label}</span>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div className="relative z-10">
                <div className="mb-1 font-headline text-3xl font-semibold text-on-surface">{value}</div>
                <KpiDetail tone={detailTone} text={detail} />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
