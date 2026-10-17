import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ogImage, site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Solusi teknologi praktis untuk kebutuhan nyata`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title: `${site.name} | Solusi teknologi praktis untuk kebutuhan nyata`,
    description: site.description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f5",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#org`,
  name: site.name,
  alternateName: "Fusionify Solutions",
  url: site.url,
  logo: `${site.url}/images/fusionify-mark.png`,
  description: site.description,
  email: site.email,
  telephone: "+62 831-1138-0628",
  foundingDate: "2022-12-22",
  areaServed: { "@type": "Country", name: "Indonesia" },
  parentOrganization: { "@type": "Organization", name: "FUSIONIFY", url: site.masterBrand },
  knowsAbout: [
    "Web development",
    "Automation",
    "Telegram bot",
    "WhatsApp bot",
    "API integration",
    "AI integration",
    "Cloud deployment",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <a href="#isi" className="skip">
          Langsung ke isi
        </a>
        <Header />
        <main id="isi">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
