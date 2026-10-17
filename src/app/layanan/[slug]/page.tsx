import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chat, Info } from "@/components/Icons";
import { ServiceVisual } from "@/components/Mockups";
import { getService, services } from "@/content/services";
import { ogImage, site, waLink } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.headline} ${s.body[0]}`.slice(0, 158),
    alternates: { canonical: `/layanan/${s.slug}/` },
    openGraph: { title: s.name, description: s.summary, url: `/layanan/${s.slug}/`, images: [ogImage] },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.summary,
    provider: { "@id": `${site.url}/#org` },
    areaServed: "ID",
  };

  return (
    <>
      <header className="page-hero">
        <div className="wrap page-hero-grid">
          <div>
            <p className="crumb">
              <Link href="/layanan/">Layanan</Link> / {s.name}
              {s.since ? `, sejak ${s.since}` : ""}
            </p>
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
        <div className="wrap">
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
        </div>
      </section>

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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
