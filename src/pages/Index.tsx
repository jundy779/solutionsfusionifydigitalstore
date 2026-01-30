import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { EcosystemFlowSection } from "@/components/sections/EcosystemFlowSection";
import { WhyDifferentSection } from "@/components/sections/WhyDifferentSection";
import { WhyFusionifySection } from "@/components/sections/WhyFusionifySection";
import { ProductEcosystemSection } from "@/components/sections/ProductEcosystemSection";
import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <ProblemSolutionSection />
        <ServicesSection />
        <EcosystemFlowSection />
        <WhyDifferentSection />
        <WhyFusionifySection />
        <ProductEcosystemSection />
        <BusinessImpactSection />
        <AboutSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
