import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { PainPointSection } from "@/components/sections/PainPointSection";
import { AboutFusionifySection } from "@/components/sections/AboutFusionifySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { UnifiedEcosystemSection } from "@/components/sections/UnifiedEcosystemSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ProductSuiteSection } from "@/components/sections/ProductSuiteSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FutureVisionSection } from "@/components/sections/FutureVisionSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PainPointSection />
        <AboutFusionifySection />
        <ServicesSection />
        <UnifiedEcosystemSection />
        <WhyChooseUsSection />
        <ResultsSection />
        <ProductSuiteSection />
        <FeaturedProjectsSection />
        <TestimonialsSection />
        <FutureVisionSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
