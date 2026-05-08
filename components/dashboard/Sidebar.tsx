"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";

const links = [
  ["Dashboard", "/dashboard"],
  ["Upload Data", "/dashboard/upload"],
  ["Forecast", "/dashboard/forecast"],
  ["Market Explorer", "/dashboard/markets"],
  ["Client Scoring", "/dashboard/scoring"],
  ["Recommendations", "/dashboard/recommendations"],
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <span className="logo-mark">
          <BarChart3 size={18} strokeWidth={2.4} />
        </span>
        <div>
          <div className="logo-name">TradePilot</div>
          <div className="logo-tag">Intelligence Suite</div>
        </div>
      </div>

      <div className="nav-section">Workspace</div>
      <nav className="nav">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className={`nav-btn ${pathname === href ? "active" : ""}`}>
            <span>{label}</span>
            {pathname === href && <div className="nav-dot" />}
          </Link>
        ))}
      </nav>

      <div className="s-footer">
        <div className="s-footer-txt">
          <div className="s-footer-eyebrow">Build · v1.0</div>
          <div>Algeria Export Intelligence</div>
          <div>© 2025 TradePilot</div>
        </div>
      </div>
    </aside>
  );
}
