import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HeroSection } from "@/components/sections/HeroSection";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";
import { PartnerLogosSection } from "@/components/sections/PartnerLogosSection";

// Lazy load below-the-fold sections for better initial load performance
const PainPointSection = lazy(() => import("@/components/sections/PainPointSection").then(m => ({ default: m.PainPointSection })));
const AboutFusionifySection = lazy(() => import("@/components/sections/AboutFusionifySection").then(m => ({ default: m.AboutFusionifySection })));
const ServicesSection = lazy(() => import("@/components/sections/ServicesSection").then(m => ({ default: m.ServicesSection })));
const UnifiedEcosystemSection = lazy(() => import("@/components/sections/UnifiedEcosystemSection").then(m => ({ default: m.UnifiedEcosystemSection })));
const WhyChooseUsSection = lazy(() => import("@/components/sections/WhyChooseUsSection").then(m => ({ default: m.WhyChooseUsSection })));
const ResultsSection = lazy(() => import("@/components/sections/ResultsSection").then(m => ({ default: m.ResultsSection })));
const ProductSuiteSection = lazy(() => import("@/components/sections/ProductSuiteSection").then(m => ({ default: m.ProductSuiteSection })));
const FeaturedProjectsSection = lazy(() => import("@/components/sections/FeaturedProjectsSection").then(m => ({ default: m.FeaturedProjectsSection })));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FutureVisionSection = lazy(() => import("@/components/sections/FutureVisionSection").then(m => ({ default: m.FutureVisionSection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/layout/Footer").then(m => ({ default: m.Footer })));

const SectionFallback = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ClientLogosSection />
        <PartnerLogosSection />
        <Suspense fallback={<SectionFallback />}>
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
          <FAQSection />
          <CTASection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <ScrollToTop />
    </div>
  );
};

export default Index;
