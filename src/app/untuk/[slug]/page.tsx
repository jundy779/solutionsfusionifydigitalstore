import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Chat, Circle } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCover } from "@/components/ProjectCover";
import { audiencePages, getAudiencePage } from "@/content/answers";
import { audiences } from "@/content/company";
import { getProject } from "@/content/projects";
import { getService } from "@/content/services";
import { ogImage, waLink } from "@/content/site";
import { breadcrumbSchema, faqSchema, graph, ids, webPageSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return audiencePages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getAudiencePage(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.intro.slice(0, 158).replace(/\s+\S*$/, "") + "...",
    alternates: { canonical: `/untuk/${a.slug}/` },
    openGraph: { title: a.title, description: a.headline, url: `/untuk/${a.slug}/`, images: [ogImage] },
  };
}

export default async function AudiencePage({ params }: Props) {
  const { slug } = await params;
  const a = getAudiencePage(slug);
  if (!a) notFound();
  const path = `/untuk/${a.slug}/`;
  const flow = audiences.find((x) => x.id === a.audienceId)?.flow ?? [];
  const svc = a.services.map(getService).filter((s) => s !== undefined);
  const work = a.projects.map(getProject).filter((p) => p !== undefined);
  const others = audiencePages.filter((x) => x.slug !== a.slug);

  return (
    <>
      <header className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Beranda</Link> / {a.title}
            </nav>
            <h1 className="display">{a.headline}</h1>
            <p className="lead">{a.intro}</p>
            <div className="actions">
              <a
                className="btn btn-primary"
                href={waLink(`Halo Fusionify Solutions, saya dari ${a.title.replace(/^.*untuk /i, "")} dan mau diskusi kebutuhan.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Chat /> Diskusikan kebutuhan
              </a>
            </div>
          </div>
          <div className="flow" aria-label="Contoh alur">
            <p className="flow-question">Contoh alur yang sering kami bangun</p>
            <div className="flow-track">
              <ol className="flow-steps">
                {flow.map((step, i) => (
                  <li className="flow-step" key={step.title}>
                    <span className="flow-dot" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="flow-node">
                      <strong>{step.title}</strong>
                      <span>{step.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap" style={{ display: "grid", gap: "1rem" }}>
          <div className="panel panel-grid">
            <div>
              <h2>Masalah yang sering kami temui</h2>
              <p>Kalau salah satunya terdengar familiar, kita sudah punya titik awal.</p>
            </div>
            <ul className="need-list">
              {a.needs.map((n) => (
                <li key={n}>
                  <Circle />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h2 style={{ fontSize: "var(--t-lg)" }}>Layanan yang paling relevan</h2>
            <ul className="related" style={{ marginTop: "1.5rem" }}>
              {svc.map((s) => (
                <li key={s.slug}>
                  <Link href={`/layanan/${s.slug}/`}>
                    {s.name}
                    <span>{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {work.length > 0 && (
            <div className="panel">
              <h2 style={{ fontSize: "var(--t-lg)" }}>Project terkait</h2>
              <ul className="work-grid" style={{ marginTop: "1.5rem" }}>
                {work.map((p) => (
                  <li key={p.slug}>
                    <Link className="work-card" href={`/portfolio/${p.slug}/`}>
                      <ProjectCover project={p} />
                      <div className="work-card-body">
                        <span className={p.origin === "client" ? "chip client" : "chip own"}>
                          {p.origin === "client" ? "Project client" : "Produk FUSIONIFY"}
                        </span>
                        <h3>{p.name}</h3>
                        <p>{p.summary}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="panel panel-grid">
            <div>
              <h2>Pertanyaan yang sering muncul</h2>
              <p>
                Lihat juga <Link className="link" href="/faq/">semua FAQ</Link>.
              </p>
            </div>
            <div className="faq">
              {a.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Solusi untuk yang lain</h2>
          </div>
          <ul className="related">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/untuk/${o.slug}/`}>
                  {o.title}
                  <span className="tile-more" style={{ marginTop: "0.4rem" }}>
                    Lihat <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={graph(
          {
            ...webPageSchema({ path, name: a.title, description: a.intro }),
            audience: { "@type": "Audience", audienceType: a.title.replace(/^.*untuk /i, "") },
            mentions: svc.map((s) => ({ "@id": `https://solutions.fusionify.id/layanan/${s.slug}/#service` })),
            provider: { "@id": ids.org },
          },
          faqSchema(a.faqs, path),
          breadcrumbSchema([{ name: a.title, path }]),
        )}
      />
    </>
  );
}
