"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Compass,
  LineChart,
  ListOrdered,
  TrendingUp,
  UploadCloud
} from "lucide-react";

const links = [
  { label: "Overview", href: "/dashboard", icon: TrendingUp },
  { label: "Upload data", href: "/dashboard/upload", icon: UploadCloud },
  { label: "Forecast", href: "/dashboard/forecast", icon: LineChart },
  { label: "Markets", href: "/dashboard/markets", icon: Compass },
  { label: "Scoring", href: "/dashboard/scoring", icon: ListOrdered },
  { label: "Playbooks", href: "/dashboard/recommendations", icon: BarChart3 }
] as const;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <span className="logo-mark">
          <BarChart3 size={16} strokeWidth={2.4} />
        </span>
        <div>
          <div className="logo-name">TradePilot</div>
          <div className="logo-tag">Workspace</div>
        </div>
      </div>

      <div className="nav-section">Navigate</div>
      <nav className="nav">
        {links.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className={`nav-btn ${pathname === href ? "active" : ""}`}>
            <span className="flex items-center gap-2.5">
              <Icon size={14} className="opacity-70" />
              {label}
            </span>
            {pathname === href && <div className="nav-dot" />}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
