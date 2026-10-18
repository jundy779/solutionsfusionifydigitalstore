import type { QA, ServiceExtra } from "@/content/answers";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";
import { site } from "@/content/site";
import { services } from "@/content/services";

// Stable @id values let Google and LLMs resolve every page back to one entity.
export const ids = {
  org: `${site.url}/#org`,
  website: `${site.url}/#website`,
  parent: `${site.masterBrand}/#org`,
};

export const abs = (path: string) => `${site.url}${path}`;

export function orgSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ids.org,
    name: site.name,
    legalName: site.legalName,
    alternateName: ["Fusionify Solutions", "Fusionify"],
    url: site.url,
    logo: { "@type": "ImageObject", url: abs("/images/fusionify-mark.png"), width: 256, height: 256 },
    image: abs("/og.png"),
    description: site.description,
    slogan: "Solusi teknologi praktis untuk kebutuhan nyata",
    foundingDate: "2022-12-22",
    email: site.email,
    telephone: "+62-831-1138-0628",
    areaServed: { "@type": "Country", name: "Indonesia" },
    address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "Jawa Barat", addressCountry: "ID" },
    knowsLanguage: ["id", "en"],
    parentOrganization: {
      "@type": "Organization",
      "@id": ids.parent,
      name: "FUSIONIFY",
      legalName: site.legalName,
      url: site.masterBrand,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.email,
        telephone: "+62-831-1138-0628",
        availableLanguage: ["Indonesian", "English"],
        areaServed: "ID",
      },
    ],
    knowsAbout: [
      "Web development",
      "Next.js",
      "WhatsApp bot",
      "Telegram bot",
      "Business process automation",
      "API integration",
      "Payment gateway integration",
      "AI integration",
      "Large language models",
      "Document processing",
      "Cloud deployment",
      "School website",
      "PPDB system",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Fusionify Solutions",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", "@id": abs(`/layanan/${s.slug}/#service`), name: s.name },
      })),
    },
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    inLanguage: "id-ID",
    publisher: { "@id": ids.org },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Beranda", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(qas: QA[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": abs(`${path}#faq`),
    inLanguage: "id-ID",
    mainEntity: qas.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(s: Service, extra: ServiceExtra) {
  return {
    "@type": "Service",
    "@id": abs(`/layanan/${s.slug}/#service`),
    name: s.name,
    serviceType: s.name,
    description: extra.answer,
    url: abs(`/layanan/${s.slug}/`),
    provider: { "@id": ids.org },
    areaServed: { "@type": "Country", name: "Indonesia" },
    availableLanguage: ["id", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Cakupan ${s.name}`,
      itemListElement: s.scope.flatMap((g) => g.items).map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}

export function projectSchema(p: Project) {
  return {
    "@type": "CreativeWork",
    "@id": abs(`/portfolio/${p.slug}/#work`),
    name: p.name,
    headline: p.name,
    description: p.summary,
    abstract: `${p.problem} ${p.solution}`,
    url: abs(`/portfolio/${p.slug}/`),
    inLanguage: "id-ID",
    genre: p.category,
    keywords: p.scope.join(", "),
    creator: { "@id": ids.org },
    ...(p.image ? { image: abs(p.image.src) } : {}),
    ...(p.origin === "client" ? {} : { publisher: { "@id": ids.parent } }),
  };
}

export function webPageSchema(opts: { path: string; name: string; description: string; type?: string }) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": abs(`${opts.path}#webpage`),
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "id-ID",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.org },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
