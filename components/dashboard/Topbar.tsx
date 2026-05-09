"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const labels: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/upload": "Upload data",
  "/dashboard/forecast": "Forecast",
  "/dashboard/markets": "Markets",
  "/dashboard/scoring": "Scoring",
  "/dashboard/recommendations": "Playbooks"
};

export default function Topbar() {
  const pathname = usePathname();
  const label = labels[pathname] ?? "Dashboard";

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-pulse" />
        <span>{label}</span>
      </div>
      <Link href="/" className="topbar-back">
        <ArrowLeft size={12} />
        Home
      </Link>
    </div>
  );
}
