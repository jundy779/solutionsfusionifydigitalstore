import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chat } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCover } from "@/components/ProjectCover";
import { serviceExtras } from "@/content/answers";
import { services } from "@/content/services";
import { breadcrumbSchema, graph, projectSchema, webPageSchema } from "@/lib/schema";
import { getProject, projects } from "@/content/projects";
import { ogImage, waLink } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/portfolio/${p.slug}/` },
    openGraph: {
      title: p.name,
      description: p.summary,
      url: `/portfolio/${p.slug}/`,
      ...(p.image
        ? { images: [{ url: p.image.src.replace(".webp", "-og.jpg"), width: 1200, height: 630 }] }
        : { images: [ogImage] }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const others = projects.filter((o) => o.slug !== p.slug);
  const relatedServices = services.filter((sv) => serviceExtras[sv.slug].projects.includes(p.slug));
  const path = `/portfolio/${p.slug}/`;

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/portfolio/">Portfolio</Link> / {p.name}
          </nav>
          <h1 className="display">{p.name}</h1>
          <p className="lead">{p.summary}</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "0.5rem" }}>
        <div className="wrap" style={{ display: "grid", gap: "1rem" }}>
          <div className="case-shot">
            <ProjectCover project={p} priority />
          </div>

          <dl className="case-facts">
            <div>
              <dt>Jenis</dt>
              <dd>{p.origin === "client" ? "Project client" : "Produk FUSIONIFY"}</dd>
            </div>
            <div>
              <dt>Kategori</dt>
              <dd>{p.category}</dd>
            </div>
            {p.status && (
              <div>
                <dt>Status</dt>
                <dd>{p.status}</dd>
              </div>
            )}
            {p.location && (
              <div>
                <dt>Lokasi</dt>
                <dd>{p.location}</dd>
              </div>
            )}
          </dl>

          <div className="ps-grid">
            <div className="panel">
              <span className="ps-label">Masalah</span>
              <h2>Yang perlu diselesaikan</h2>
              <p>{p.problem}</p>
            </div>
            <div className="panel" style={{ marginTop: 0 }}>
              <span className="ps-label">Solusi</span>
              <h2>Yang kami bangun</h2>
              <p>{p.solution}</p>
            </div>
          </div>

          <div className="panel panel-grid">
            <div>
              <h2>Scope</h2>
              <p>Bagian yang dikerjakan dalam project ini.</p>
            </div>
            <div>
              <ul className="scope-tags">
                {p.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="actions" style={{ marginTop: "2rem" }}>
                <a
                  className="btn btn-primary"
                  href={waLink(`Halo Fusionify Solutions, saya lihat project ${p.name} dan punya kebutuhan serupa.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Chat /> Punya kebutuhan serupa?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <h2>Layanan yang dipakai</h2>
            </div>
            <ul className="related">
              {relatedServices.map((sv) => (
                <li key={sv.slug}>
                  <Link href={`/layanan/${sv.slug}/`}>
                    {sv.name}
                    <span>{sv.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Project lain</h2>
          </div>
          <ul className="related">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/portfolio/${o.slug}/`}>
                  {o.name}
                  <span>{o.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: p.name, description: p.summary }),
          projectSchema(p),
          breadcrumbSchema([
            { name: "Portfolio", path: "/portfolio/" },
            { name: p.name, path },
          ]),
        )}
      />
    </>
  );
}
