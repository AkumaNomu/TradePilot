const monthlySeries = [56, 64, 58, 74, 82, 77, 88, 79, 92, 85, 96, 90];

export default function SalesChart() {
  return (
    <section className="panel" aria-label="Sales momentum chart">
      <h2 className="panel-title">Sales Momentum</h2>
      <p className="panel-sub">12-month export pipeline performance</p>
      <div className="bars">
        {monthlySeries.map((point, index) => (
          <div key={index} className="bar" style={{ height: `${point}%` }} />
        ))}
      </div>
    </section>
  );
}

