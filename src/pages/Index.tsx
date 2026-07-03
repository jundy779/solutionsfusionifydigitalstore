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
    url: "https://solutions.fusionifydigital.store",
    logo: "https://solutions.fusionifydigital.store/favicon.png",
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
    url: "https://solutions.fusionifydigital.store",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-medium">
        Skip to main content
      </a>
      <SEOHead
        title="Fusionify Digital Solutions | Solusi Transformasi Digital"
        description="Partner transformasi digital untuk UMKM, startup & enterprise. Web development, automation bots, digital systems, cloud support — automation-first."
        path="/"
        jsonLd={homepageJsonLd}
      />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ClientLogosSection />
        <PartnerLogosSection />
        <Suspense fallback={<SectionFallback height="600px" />}>
          <PainPointSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="500px" />}>
          <AboutFusionifySection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="700px" />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="500px" />}>
          <UnifiedEcosystemSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="600px" />}>
          <WhyChooseUsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="500px" />}>
          <ResultsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="600px" />}>
          <ProductSuiteSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="400px" />}>
          <FreeToolsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="700px" />}>
          <FeaturedProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="500px" />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="500px" />}>
          <FutureVisionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="600px" />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="400px" />}>
          <CTASection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="300px" />}>
          <NewsletterSection />
        </Suspense>
        <Suspense fallback={<SectionFallback height="600px" />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback height="300px" />}>
        <Footer />
      </Suspense>
      <ScrollToTop />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
};

export default Index;
