const kpis = [
  { label: "Total Leads", value: "2,184", delta: "+12.8%", trend: "up" },
  { label: "Scored Clients", value: "1,462", delta: "+7.4%", trend: "up" },
  { label: "Conversion Rate", value: "18.9%", delta: "+2.1%", trend: "up" },
  { label: "Churn Risk", value: "4.7%", delta: "-0.9%", trend: "down" },
] as const;

export default function KPIGrid() {
  return (
    <section className="kpi-grid" aria-label="Key performance indicators">
      {kpis.map((item) => (
        <article key={item.label} className="kpi">
          <div className="kpi-label">{item.label}</div>
          <div className="kpi-val">{item.value}</div>
          <div className={`kpi-delta ${item.trend === "up" ? "up" : "down"}`}>{item.delta} this month</div>
        </article>
      ))}
    </section>
  );
}

