import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCover } from "@/components/ProjectCover";
import { abs, breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { projects } from "@/content/projects";
import { ogImage } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Project client dan produk yang dibangun Fusionify Solutions: SMK Pionir Bojonggede, FUSIONIFY BOT, StudyDate.id, Lumbung, dan Premiumify.",
  alternates: { canonical: "/portfolio/" },
  openGraph: { title: "Portfolio | FUSIONIFY SOLUTIONS", url: "/portfolio/", images: [ogImage] },
};

export default function PortfolioPage() {
  const clients = projects.filter((p) => p.origin === "client");
  const internal = projects.filter((p) => p.origin === "fusionify");

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <h1 className="display">Project yang sudah berjalan.</h1>
          <p className="lead">
            Setiap project ditulis dengan format yang sama: masalah, solusi, dan scope. Project client
            dan produk ekosistem FUSIONIFY kami pisahkan supaya jelas siapa pemiliknya.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          {clients.map((p, i) => (
            <Link key={p.slug} className="showcase" href={`/portfolio/${p.slug}/`}>
              <ProjectCover project={p} priority={i === 0} />
              <div className="showcase-body">
                <div className="chips">
                  <span className="chip client">Project client</span>
                  {p.status && <span className="chip live">{p.status}</span>}
                </div>
                <h2 style={{ fontSize: "var(--t-xl)", fontStretch: "112%", marginTop: "1rem" }}>{p.name}</h2>
                <p>{p.summary}</p>
                <span className="tile-more">
                  Baca case study <ArrowRight />
                </span>
              </div>
            </Link>
          ))}

          <div className="section-head" style={{ marginTop: "clamp(4rem, 3rem + 4vw, 6rem)", marginBottom: "2rem" }}>
            <h2>Produk dan eksperimen FUSIONIFY</h2>
            <p>Dibangun di dalam ekosistem FUSIONIFY. Di sini kami menguji pendekatan sebelum dipakai di project client.</p>
          </div>
          <ul className="work-grid">
            {internal.map((p) => (
              <li key={p.slug}>
                <Link className="work-card" href={`/portfolio/${p.slug}/`}>
                  <ProjectCover project={p} />
                  <div className="work-card-body">
                    <span className="chip own">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({ path: "/portfolio/", name: "Portfolio Fusionify Solutions", description: "Project client dan produk yang dibangun Fusionify Solutions.", type: "CollectionPage" }),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: abs(`/portfolio/${p.slug}/`),
                name: p.name,
              })),
            },
          },
          breadcrumbSchema([{ name: "Portfolio", path: "/portfolio/" }]),
        )}
      />
    </>
  );
}
