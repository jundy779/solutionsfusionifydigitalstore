import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      ...(p.image ? { images: [{ url: p.image.src.replace(".webp", "-og.jpg"), width: 1200, height: 630 }] } : { images: [ogImage] }),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const others = projects.filter((o) => o.slug !== p.slug);

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="crumb">
            <Link href="/portfolio/">Portfolio</Link> / {p.name}
          </p>
          <h1 className="display">{p.name}</h1>
          <p className="lead">{p.summary}</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "clamp(2rem, 1rem + 3vw, 3.5rem)" }}>
        <div className="wrap">
          {p.image && (
            <div className="case-shot case-hero-shot">
              <Image
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.width}
                height={p.image.height}
                sizes="100vw"
                priority
              />
            </div>
          )}

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

          <div className="split">
            <div className="split-head">
              <h2 style={{ fontSize: "var(--t-lg)" }}>Ringkasan project</h2>
            </div>
            <div className="case-body">
              <div>
                <h2>Masalah</h2>
                <p className="prose">{p.problem}</p>
              </div>
              <div>
                <h2>Solusi</h2>
                <p className="prose">{p.solution}</p>
              </div>
              <div>
                <h2>Scope</h2>
                <ul className="scope-list">
                  {p.scope.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="actions">
                <a
                  className="btn btn-primary"
                  href={waLink(`Halo Fusionify Solutions, saya lihat project ${p.name} dan punya kebutuhan serupa.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Punya kebutuhan serupa?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>Project lain</h2>
          </div>
          <ul className="next-links">
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
    </>
  );
}
