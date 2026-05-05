import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MouseReactiveBackground } from "@/components/MouseReactiveBackground";
import { ScrollManager } from "@/components/ScrollManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background font-body text-on-surface antialiased`}>
        <MouseReactiveBackground />
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
