import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { SocialProof } from "@/components/sections/SocialProof";
import { InstallSection } from "@/components/sections/InstallSection";
import { OpenSourceCTA } from "@/components/sections/OpenSourceCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DashboardShowcase />
        <MetricsStrip />
        <FeaturesGrid />
        <HowItWorks />
        <SocialProof />
        <InstallSection />
        <OpenSourceCTA />
      </main>
      <Footer />
    </>
  );
}
