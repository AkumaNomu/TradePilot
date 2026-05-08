"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <div>
          <div className="logo-name">TRADEPILOT</div>
          <div className="logo-tag">NAVIGATE YOUR MARKET</div>
        </div>
      </div>

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
          <div>Algeria Export Intelligence</div>
          <div>MVP v1.0 · 2025</div>
        </div>
      </div>
    </aside>
  );
}

