import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ScrollManager } from "@/components/ScrollManager";
import { TransitionProvider } from "@/components/TransitionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"]
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"]
});

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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-background font-body text-on-surface antialiased">
        <ScrollManager />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
