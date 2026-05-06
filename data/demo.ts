export type MarketOrClient = {
  id: string;
  name: string;
  demand: number; // 0..1
  accessibility: number; // 0..1
  risk: number; // 0..1
  distance: number; // 0..1
  segment?: string;
  region?: string;
  action?: string; // client-specific static recommendation text
};

export function calcScore(d: Pick<MarketOrClient, "demand" | "accessibility" | "risk" | "distance">) {
  return Math.round((0.4 * d.demand + 0.3 * d.accessibility + 0.2 * (1 - d.risk) + 0.1 * d.distance) * 100);
}

export const markets: MarketOrClient[] = [
  { id: "mkt-nyc", name: "New York", demand: 0.86, accessibility: 0.84, risk: 0.22, distance: 0.72, region: "NA" },
  { id: "mkt-lon", name: "London", demand: 0.78, accessibility: 0.79, risk: 0.24, distance: 0.68, region: "EMEA" },
  { id: "mkt-par", name: "Paris", demand: 0.72, accessibility: 0.74, risk: 0.28, distance: 0.63, region: "EMEA" },
  { id: "mkt-ber", name: "Berlin", demand: 0.68, accessibility: 0.71, risk: 0.25, distance: 0.59, region: "EMEA" },
  { id: "mkt-dub", name: "Dubai", demand: 0.74, accessibility: 0.66, risk: 0.34, distance: 0.57, region: "MEA" },
  { id: "mkt-sin", name: "Singapore", demand: 0.77, accessibility: 0.73, risk: 0.21, distance: 0.51, region: "APAC" }
];

export const clients: MarketOrClient[] = [
  { id: "cli-northwind", name: "Northwind", demand: 0.81, accessibility: 0.78, risk: 0.18, distance: 0.62, segment: "Enterprise", action: "Fast-track pricing review and lock a 14-day close plan." },
  { id: "cli-contoso", name: "Contoso", demand: 0.73, accessibility: 0.71, risk: 0.26, distance: 0.58, segment: "Growth", action: "Route to senior AE and schedule a 30-min discovery this week." },
  { id: "cli-fabrikam", name: "Fabrikam", demand: 0.69, accessibility: 0.66, risk: 0.30, distance: 0.55, segment: "Mid-market", action: "Send a tailored ROI pack and confirm stakeholder map." },
  { id: "cli-adventure", name: "Adventure", demand: 0.62, accessibility: 0.59, risk: 0.44, distance: 0.61, segment: "SMB", action: "Hold for re-qualification; budget friction flagged." },
  { id: "cli-tailspin", name: "Tailspin", demand: 0.58, accessibility: 0.63, risk: 0.33, distance: 0.49, segment: "SMB", action: "Reposition around a narrower use-case; ICP mismatch risk." }
];

export function rank<T extends MarketOrClient>(items: T[]) {
  return items
    .map((item) => ({ ...item, score: calcScore(item) }))
    .sort((a, b) => b.score - a.score);
}

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Precomputed time-series; actual stops mid-year and forecast continues.
export const forecastSeries = {
  actual: [5.2, 5.5, 5.8, 6.0, 6.1, 6.3, null, null, null, null, null, null] as (number | null)[],
  forecast: [null, null, null, null, null, 6.3, 6.5, 6.7, 6.9, 7.1, 7.2, 7.35] as (number | null)[]
};

export type ConfidencePoint = { forecast: number; lower: number; upper: number };

// Precomputed intervals aligned to forecast months (null months omitted at render time).
export const confidence: ConfidencePoint[] = [
  { forecast: 6.3, lower: 6.05, upper: 6.55 },
  { forecast: 6.5, lower: 6.18, upper: 6.82 },
  { forecast: 6.7, lower: 6.32, upper: 7.08 },
  { forecast: 6.9, lower: 6.46, upper: 7.34 },
  { forecast: 7.1, lower: 6.62, upper: 7.58 },
  { forecast: 7.2, lower: 6.68, upper: 7.72 },
  { forecast: 7.35, lower: 6.76, upper: 7.94 }
];

export type Recommendation = {
  priority: "HIGH" | "MED" | "LOW";
  title: string;
  insight: string;
  actions: string[];
};

// Hardcoded mapping for top markets (config-driven, rule-based, static).
export const marketRecommendations: Record<string, Recommendation[]> = {
  "mkt-nyc": [
    {
      priority: "HIGH",
      title: "Prioritize enterprise outbound",
      insight: "Demand and accessibility are both elevated while risk remains contained.",
      actions: ["Increase SDR routing to enterprise accounts", "Run pricing-intent outreach sequence", "Schedule 2 executive demos per week"]
    }
  ],
  "mkt-lon": [
    {
      priority: "MED",
      title: "Accelerate partner-led pipeline",
      insight: "Accessibility is strong but distance and risk reduce close velocity.",
      actions: ["Lean on local partners for warm introductions", "Use shorter trial offers", "Pre-qualify stakeholders before demo"]
    }
  ],
  "mkt-sin": [
    {
      priority: "MED",
      title: "Double down on high-fit segments",
      insight: "Risk-adjusted demand is strong; scale selectively for conversion efficiency.",
      actions: ["Target top 2 verticals with highest demand", "Push fast proof-of-value", "Track objections by segment"]
    }
  ]
};

export function radarVector(d: Pick<MarketOrClient, "demand" | "accessibility" | "risk" | "distance"> & { score: number }) {
  return [
    d.demand * 100,
    d.accessibility * 100,
    (1 - d.risk) * 100,
    d.distance * 100,
    d.score
  ];
}

