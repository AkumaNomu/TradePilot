import KPIGrid from "@/components/dashboard/KPIGrid";
import SalesChart from "@/components/dashboard/SalesChart";
import MarketChart from "@/components/dashboard/MarketChart";

export default function DashboardPage() {
  return (
    <>

      <KPIGrid />

      <div className="g21">
        <SalesChart />
        <MarketChart />
      </div>

      <div className="cta">
        <div>
          <div className="cta-title">Ready to discover your next export market?</div>
          <div className="cta-sub">
            Upload your sales data and let the AI find your best international clients.
          </div>
        </div>

        <button className="btn">Start Export Analysis</button>
      </div>
    </>
  );
}

