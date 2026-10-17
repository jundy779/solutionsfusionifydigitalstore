import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chat, Info } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ServiceVisual } from "@/components/Mockups";
import { audiencePages, serviceExtras } from "@/content/answers";
import { getProject } from "@/content/projects";
import { getService, services } from "@/content/services";
import { ogImage, waLink } from "@/content/site";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const extra = serviceExtras[s.slug];
  const description = extra.answer.length > 158 ? `${extra.answer.slice(0, 155).replace(/\s+\S*$/, "")}...` : extra.answer;
  return {
    title: extra.seoTitle,
    description,
    alternates: { canonical: `/layanan/${s.slug}/` },
    openGraph: { title: s.name, description: s.summary, url: `/layanan/${s.slug}/`, images: [ogImage] },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const extra = serviceExtras[s.slug];
  const path = `/layanan/${s.slug}/`;
  const others = services.filter((o) => o.slug !== s.slug);
  const relatedProjects = extra.projects.map(getProject).filter((p) => p !== undefined);
  const relatedAudiences = audiencePages.filter((a) => extra.audiences.includes(a.slug));

  return (
    <>
      <header className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/layanan/">Layanan</Link> / {s.name}
              {s.since ? `, sejak ${s.since}` : ""}
            </nav>
            <h1 className="display">{s.headline}</h1>
            <div className="lead prose" style={{ marginTop: "1.4rem" }}>
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="actions">
              <a
                className="btn btn-primary"
                href={waLink(`Halo Fusionify Solutions, saya mau diskusi soal ${s.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Chat /> Diskusikan {s.name}
              </a>
              <Link className="btn btn-secondary" href="/portfolio/">
                Lihat project kami
              </Link>
            </div>
          </div>
          <div className={`hero-visual-card${s.slug === "ai-solutions" ? " ai" : ""}`}>
            <ServiceVisual slug={s.slug} />
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap" style={{ display: "grid", gap: "1rem" }}>
          <div className="answer-box">
            <h2>Apa itu {s.name} di Fusionify Solutions?</h2>
            <p>{extra.answer}</p>
            {relatedAudiences.length > 0 && (
              <p className="answer-for">
                Cocok untuk:{" "}
                {relatedAudiences.map((a, i) => (
                  <span key={a.slug}>
                    <Link className="link" href={`/untuk/${a.slug}/`}>
                      {a.title.replace(/^.*untuk /i, "")}
                    </Link>
                    {i < relatedAudiences.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
          </div>

          <div className="panel panel-grid">
            <div>
              <h2>Cakupan pekerjaan</h2>
              <p>Daftar ini titik awal. Kebutuhan di luar daftar tetap bisa didiskusikan.</p>
            </div>
            <div>
              <div className="scope-groups">
                {s.scope.map((g, i) => (
                  <div key={g.title ?? i}>
                    {g.title && <h3>{g.title}</h3>}
                    <ul className="scope-tags">
                      {g.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {s.note && (
                <p className="callout">
                  <Info />
                  {s.note}
                </p>
              )}
            </div>
          </div>

          <div className="panel panel-grid">
            <div>
              <h2>Pertanyaan tentang {s.name}</h2>
              <p>
                Pertanyaan lain? Lihat <Link className="link" href="/faq/">semua FAQ</Link>.
              </p>
            </div>
            <div className="faq">
              {extra.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <h2>Project terkait</h2>
            </div>
            <ul className="related">
              {relatedProjects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/portfolio/${p.slug}/`}>
                    {p.name}
                    <span>{p.summary}</span>
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
            <h2>Layanan lain yang sering dipasangkan</h2>
          </div>
          <ul className="related">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/layanan/${o.slug}/`}>
                  {o.name}
                  <span>{o.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageSchema({ path, name: s.name, description: extra.answer }),
          serviceSchema(s, extra),
          faqSchema(extra.faqs, path),
          breadcrumbSchema([
            { name: "Layanan", path: "/layanan/" },
            { name: s.name, path },
          ]),
        )}
      />
    </>
  );
}
