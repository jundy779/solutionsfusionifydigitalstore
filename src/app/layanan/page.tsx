import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Chat } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ServiceVisual } from "@/components/Mockups";
import { abs, breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { services } from "@/content/services";
import { ogImage, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Web development, automation dan bot, AI solutions, integrasi sistem, cloud dan deployment, project assistance, serta konsultasi dan dokumentasi teknis.",
  alternates: { canonical: "/layanan/" },
  openGraph: { title: "Layanan | FUSIONIFY SOLUTIONS", url: "/layanan/", images: [ogImage] },
};

const tileClass: Record<string, string> = {
  "web-development": "t-web",
  "automation-bots": "t-auto",
  "ai-solutions": "t-ai",
  "digital-systems": "t-sys",
  "cloud-deployment": "t-cloud",
  "project-assistance": "t-assist",
  "consulting-documentation": "t-consult",
};

export default function ServicesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <h1 className="display">Tujuh layanan yang saling bersambung.</h1>
          <p className="lead">
            Website butuh form, form butuh database, database butuh notifikasi. Kami mengerjakan
            rangkaian itu sampai benar-benar jalan.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
              <Chat /> Diskusikan kebutuhan
            </a>
          </div>
        </div>
      </header>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="bento">
            {services.map((s) => (
              <Link key={s.slug} href={`/layanan/${s.slug}/`} className={`tile ${tileClass[s.slug]}`}>
                {s.since && <span className="tile-tag">Sejak {s.since}</span>}
                <div className="tile-body">
                  <h2 style={{ fontSize: "var(--t-lg)", fontStretch: "108%" }}>{s.name}</h2>
                  <p>{s.summary}</p>
                  <span className="tile-more">
                    Lihat cakupan <ArrowRight />
                  </span>
                </div>
                <div className="tile-visual">
                  <ServiceVisual slug={s.slug} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({ path: "/layanan/", name: "Layanan Fusionify Solutions", description: "Tujuh layanan teknologi Fusionify Solutions.", type: "CollectionPage" }),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: abs(`/layanan/${s.slug}/`),
                name: s.name,
              })),
            },
          },
          breadcrumbSchema([{ name: "Layanan", path: "/layanan/" }]),
        )}
      />
    </>
  );
}
