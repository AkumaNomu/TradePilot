import KPIGrid from "@/components/dashboard/KPIGrid";
import SalesChart from "@/components/dashboard/SalesChart";
import MarketChart from "@/components/dashboard/MarketChart";
import PageHeader from "@/components/dashboard/PageHeader";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Welcome back"
        description="A live read on every lead, market and forecast feeding into your workspace."
      />

      <KPIGrid />

      <div className="g21">
        <SalesChart />
        <MarketChart />
      </div>

      <div className="cta">
        <div>
          <div className="cta-title">Discover your next export market</div>
          <div className="cta-sub">
            Upload your sales data and let the model find your best international clients.
          </div>
        </div>
        <button className="btn">Start analysis</button>
      </div>
    </>
  );
}
