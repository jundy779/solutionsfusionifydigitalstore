import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { themeInitScript } from "@/components/ThemeToggle";
import { graph, orgSchema, websiteSchema } from "@/lib/schema";
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d6cd7" },
    { media: "(prefers-color-scheme: dark)", color: "#13264b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#isi" className="skip">
          Langsung ke isi
        </a>
        <Header />
        <main id="isi" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MotionRoot />
        <JsonLd data={graph(orgSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
