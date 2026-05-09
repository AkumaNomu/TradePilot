"use client";

const items = [
  { sym: "DZA → DEU", val: "+18.4%", up: true },
  { sym: "OPEC SPOT", val: "82.4 bbl", up: true },
  { sym: "EUR/USD", val: "1.0842", up: false },
  { sym: "MENA INDEX", val: "+2.31%", up: true },
  { sym: "PIPELINE", val: "$8.42M", up: true },
  { sym: "INTENT", val: "92 / 100", up: true },
  { sym: "DZA → FRA", val: "+11.2%", up: true },
  { sym: "BRENT", val: "85.10", up: false },
  { sym: "DZA → ITA", val: "+7.6%", up: true },
  { sym: "AGRI EXPORT", val: "+4.8%", up: true }
];

export function LiveTicker() {
  const seq = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-3 backdrop-blur-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0a0f1e] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0a0f1e] to-transparent"
      />
      <div className="ticker-track">
        {seq.map((it, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2.5 font-mono text-mono-sm"
          >
            <span className="text-on-surface-variant/80">{it.sym}</span>
            <span className={it.up ? "text-tertiary" : "text-primary"}>
              {it.up ? "▲" : "▼"} {it.val}
            </span>
            <span className="ml-2 h-1 w-1 rounded-full bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
