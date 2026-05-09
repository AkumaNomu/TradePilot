import "@/app/dashboard/dashboard.css";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardAmbient from "@/components/dashboard/DashboardAmbient";
import HideTransition from "@/components/dashboard/HideTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app">
      <HideTransition />
      <DashboardAmbient />
      <Sidebar />
      <main className="main">
        {children}
      </main>
    </div>
  );
}
