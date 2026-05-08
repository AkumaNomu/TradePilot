import { FloatingDemoCTA } from "@/components/FloatingDemoCTA";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { Navbar } from "@/components/Navbar";
import { PlatformSection } from "@/components/PlatformSection";
import { StatsSection } from "@/components/StatsSection";
import { SolutionsSection } from "@/components/SolutionsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden pt-20">
        <HeroSection />
        <PlatformSection />
        <StatsSection />
        <HowItWorksSection />
        <SolutionsSection />
      </main>
      <Footer />
      <FloatingDemoCTA />
    </>
  );
}
