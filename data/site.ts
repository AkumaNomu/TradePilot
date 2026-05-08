import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  BrainCircuit,
  DatabaseZap,
  GitBranch,
  LineChart,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  Zap
} from "lucide-react";

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
];

export const hero = {
  eyebrow: "Live Optimization Engine v2.4",
  title: "Your AI Co-Pilot for Sales Growth",
  subtitle:
    "Identify, score, and convert your best clients through a unified AI-powered platform built for revenue teams that need clarity, speed, and measurable pipeline lift.",
  primaryCta: "View Demo",
  secondaryCta: "Explore Platform",
  stats: [
    { label: "Lead scoring lift", value: "+24.8%" },
    { label: "Signals processed", value: "2.4M" },
    { label: "Revenue forecast", value: "91%" }
  ]
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "blue" | "cyan" | "green";
};

export const platformFeatures: Feature[] = [
  {
    title: "Predictive Modeling",
    description:
      "Analyze historical sales, firmographic data, behavior, and intent signals to predict which accounts are most likely to convert.",
    icon: BrainCircuit,
    tone: "blue"
  },
  {
    title: "Pipeline Intelligence",
    description:
      "Expose pipeline bottlenecks, high-value segments, and conversion risks before they become visible in standard reports.",
    icon: Network,
    tone: "green"
  },
  {
    title: "Decision Dashboard",
    description:
      "Turn raw metrics into live visual insights your team can use without digging through scattered reports.",
    icon: BarChart3,
    tone: "cyan"
  }
];

export const processSteps = [
  {
    number: "01",
    title: "Data Collection",
    description:
      "Connect your CRM, web analytics, and market signals. TradePilot ingests everything automatically.",
    icon: DatabaseZap
  },
  {
    number: "02",
    title: "AI Processing",
    description:
      "Models analyze behavioral patterns, intent signals, and firmographic data in real time.",
    icon: BrainCircuit
  },
  {
    number: "03",
    title: "Scoring",
    description:
      "Each prospect receives a multi-dimensional AI score reflecting conversion probability.",
    icon: Target
  },
  {
    number: "04",
    title: "Visualization",
    description:
      "All insights surface in your Decision Dashboard: clean, actionable, and live.",
    icon: LineChart
  },
  {
    number: "05",
    title: "Decision",
    description:
      "Your team acts on recommendations with confidence and closes more deals, faster.",
    icon: Zap
  }
];

export const intelligenceMetrics = [
  { label: "Conversion probability", value: "87.2%", delta: "+12.4%" },
  { label: "Pipeline velocity", value: "1.8x", delta: "+31%" },
  { label: "Churn risk reduced", value: "19%", delta: "-8.6%" },
  { label: "Forecast confidence", value: "91%", delta: "+6.2%" }
];

export const solutionTags = [
  { label: "Client Acquisition", icon: Radar },
  { label: "Lead Scoring", icon: Sparkles },
  { label: "Churn Prevention", icon: ShieldCheck },
  { label: "Revenue Forecasting", icon: TrendingUp },
  { label: "Custom Dashboards", icon: Activity },
  { label: "Custom AI Workflows", icon: Workflow },
  { label: "Market Signals", icon: GitBranch }
];

export const footerLinks = ["Security", "API Docs", "Privacy Policy", "Terms of Service"];
