import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { AgentSupport } from "@/components/sections/AgentSupport";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { CliShowcase } from "@/components/sections/CliShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { SocialProof } from "@/components/sections/SocialProof";
import { InstallSection } from "@/components/sections/InstallSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { OpenSourceCTA } from "@/components/sections/OpenSourceCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DashboardShowcase />
        <MetricsStrip />
        <AgentSupport />
        <FeaturesGrid />
        <CliShowcase />
        <HowItWorks />
        <RoiCalculator />
        <SocialProof />
        <InstallSection />
        <FaqSection />
        <OpenSourceCTA />
      </main>
      <Footer />
    </>
  );
}
