"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const labels: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/upload": "Upload Data",
  "/dashboard/forecast": "Forecast",
  "/dashboard/markets": "Market Explorer",
  "/dashboard/scoring": "Client Scoring",
  "/dashboard/recommendations": "Recommendations"
};

export default function Topbar() {
  const pathname = usePathname();
  const label = labels[pathname] ?? "Dashboard";

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-pulse" />
        <span>Live · {label}</span>
      </div>
      <Link href="/" className="topbar-back">
        <ArrowLeft size={14} />
        Back to Site
      </Link>
    </div>
  );
}
