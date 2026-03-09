import { lazy, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { AIChatbot } from "@/components/layout/AIChatbot";
import { HeroSection } from "@/components/sections/HeroSection";
import { SEOHead } from "@/components/SEOHead";
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
const FreeToolsSection = lazy(() => import("@/components/sections/FreeToolsSection").then(m => ({ default: m.FreeToolsSection })));
const FeaturedProjectsSection = lazy(() => import("@/components/sections/FeaturedProjectsSection").then(m => ({ default: m.FeaturedProjectsSection })));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const FutureVisionSection = lazy(() => import("@/components/sections/FutureVisionSection").then(m => ({ default: m.FutureVisionSection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const NewsletterSection = lazy(() => import("@/components/sections/NewsletterSection").then(m => ({ default: m.NewsletterSection })));
const Footer = lazy(() => import("@/components/layout/Footer").then(m => ({ default: m.Footer })));

const SectionFallback = ({ height = "400px" }: { height?: string }) => (
  <div style={{ minHeight: height }} />
);

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fusionify Digital Solutions",
    alternateName: "PT Fusionify Digital Store",
    url: "https://solutions.fusionifydigital.com",
    logo: "https://solutions.fusionifydigital.com/favicon.png",
    description: "Partner transformasi digital untuk UMKM, startup, dan perusahaan. Web development, automation bots, digital systems, cloud support.",
    sameAs: [
      "https://www.instagram.com/fusionifytempestore/",
      "https://www.linkedin.com/company/fusionify-digital-store/",
      "https://github.com/FUSIONIFY-ID",
      "https://www.facebook.com/FusionTempestVPN",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "fusionify_digital@vk.com",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "English"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fusionify Digital Solutions",
    alternateName: "Fusionify",
    url: "https://solutions.fusionifydigital.com",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Fusionify Digital Solutions | Solusi Transformasi Digital" 
        description="Partner transformasi digital untuk UMKM, startup, dan perusahaan. Web development, automation bots, digital systems, cloud support dengan pendekatan automation-first."
        path="/"
        jsonLd={homepageJsonLd}
      />
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
          <FreeToolsSection />
          <FeaturedProjectsSection />
          <TestimonialsSection />
          <FutureVisionSection />
          <FAQSection />
          <CTASection />
          <NewsletterSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <ScrollToTop />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
};

export default Index;
