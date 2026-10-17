import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { ogImage, waLink } from "@/content/site";

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
    provider: { "@id": "https://solutions.fusionify.id/#org" },
    areaServed: "ID",
  };

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="crumb">
            <Link href="/layanan/">Layanan</Link> / {s.name}
            {s.since ? `, sejak ${s.since}` : ""}
          </p>
          <h1 className="display">{s.headline}</h1>
          <div className="lead prose" style={{ marginTop: "1.5rem" }}>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="actions" style={{ marginTop: "2.25rem" }}>
            <a
              className="btn btn-primary"
              href={waLink(`Halo Fusionify Solutions, saya mau diskusi soal ${s.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Diskusikan {s.name}
            </a>
            <Link className="btn btn-ghost" href="/portfolio/">
              Lihat project kami
            </Link>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>Cakupan</h2>
            <p>Daftar ini titik awal. Kebutuhan di luar daftar tetap bisa didiskusikan.</p>
          </div>
          <div>
            <div className="scope-groups">
              {s.scope.map((g, i) => (
                <div key={g.title ?? i}>
                  {g.title && <h3>{g.title}</h3>}
                  <ul className="scope-list">
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {s.note && (
              <div className="callout">
                <p>{s.note}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>Layanan lain</h2>
          </div>
          <ul className="next-links">
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
