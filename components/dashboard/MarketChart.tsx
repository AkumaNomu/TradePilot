const markets = [
  { name: "Europe", value: "43%", color: "#4cd7f6" },
  { name: "MENA", value: "31%", color: "#4edea3" },
  { name: "Americas", value: "26%", color: "#6e82ff" },
] as const;

export default function MarketChart() {
  return (
    <section className="panel" aria-label="Top market mix chart">
      <h2 className="panel-title">Market Mix</h2>
      <p className="panel-sub">Regional share of qualified opportunities</p>

      <div className="mk-row">
        <div className="mk-ring" />
        <div className="mk-list">
          {markets.map((market) => (
            <div key={market.name} className="mk-item">
              <span>
                <span className="mk-dot" style={{ background: market.color }} />
                {market.name}
              </span>
              <strong>{market.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

