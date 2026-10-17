import type { Metadata } from "next";
import Link from "next/link";
import { Chat } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { serviceExtras } from "@/content/answers";
import { faqs } from "@/content/company";
import { services } from "@/content/services";
import { ogImage, waLink } from "@/content/site";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Jawaban lengkap tentang layanan Fusionify Solutions: website, bot WhatsApp, AI, integrasi sistem, biaya, maintenance, kepemilikan source code, dan keamanan data.",
  alternates: { canonical: "/faq/" },
  openGraph: { title: "FAQ | FUSIONIFY SOLUTIONS", url: "/faq/", images: [ogImage] },
};

export default function FaqPage() {
  const groups = [
    { id: "umum", title: "Umum", items: faqs },
    ...services.map((s) => ({ id: s.slug, title: s.name, items: serviceExtras[s.slug].faqs })),
  ];
  const all = groups.flatMap((g) => g.items);

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <h1 className="display">Pertanyaan yang sering ditanyakan.</h1>
          <p className="lead">
            {all.length} jawaban tentang cara kerja, biaya, layanan, dan batasan Fusionify Solutions.
            Tidak menemukan yang Anda cari? Tanya langsung saja.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href={waLink("Halo Fusionify Solutions, saya mau tanya dulu.")} target="_blank" rel="noopener noreferrer">
              <Chat /> Tanya lewat WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap" style={{ display: "grid", gap: "1rem" }}>
          <nav className="toc" aria-label="Kategori FAQ">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`}>
                {g.title}
              </a>
            ))}
          </nav>
          {groups.map((g) => (
            <div className="panel panel-grid" id={g.id} key={g.id}>
              <div>
                <h2>{g.title}</h2>
                {g.id !== "umum" && (
                  <p>
                    <Link className="link" href={`/layanan/${g.id}/`}>
                      Detail layanan
                    </Link>
                  </p>
                )}
              </div>
              <div className="faq">
                {g.items.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageSchema({ path: "/faq/", name: "FAQ Fusionify Solutions", description: "Pertanyaan yang sering ditanyakan tentang Fusionify Solutions." }),
          faqSchema(all, "/faq/"),
          breadcrumbSchema([{ name: "FAQ", path: "/faq/" }]),
        )}
      />
    </>
  );
}
