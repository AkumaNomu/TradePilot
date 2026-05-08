import type { Metadata } from "next";
import "./globals.css";
import { MouseReactiveBackground } from "@/components/MouseReactiveBackground";
import { ScrollManager } from "@/components/ScrollManager";
import { TransitionProvider } from "@/components/TransitionProvider";

export const metadata: Metadata = {
  title: "TradePilot - Revenue Intelligence",
  description: "AI-powered revenue intelligence for sales growth, lead scoring, churn prevention, forecasting, and custom AI dashboards."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background font-body text-on-surface antialiased">
        <MouseReactiveBackground />
        <ScrollManager />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
