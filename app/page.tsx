import { Footer } from "@/components/Footer";
import { DemoSection } from "@/components/DemoSection";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { IntelligenceSection } from "@/components/IntelligenceSection";
import { Navbar } from "@/components/Navbar";
import { PlatformSection } from "@/components/PlatformSection";
import { StatsSection } from "@/components/StatsSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { TrustedBySection } from "@/components/TrustedBySection";
import { WaitlistSection } from "@/components/WaitlistSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden pt-20">
        <HeroSection />
        <TrustedBySection />
        <PlatformSection />
        <StatsSection />
        <HowItWorksSection />
        <IntelligenceSection />
        <SolutionsSection />
        <DemoSection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
