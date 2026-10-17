import type { Metadata } from "next";
import { ogImage } from "@/content/site";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

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
      <header className="page-head">
        <div className="wrap">
          <h1 className="display">Portfolio</h1>
          <p className="lead">
            Setiap project ditulis dengan format yang sama: masalah, solusi, dan scope. Project
            client dan produk ekosistem FUSIONIFY kami pisahkan supaya jelas siapa pemiliknya.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <h2 style={{ fontSize: "var(--t-lg)", marginBottom: "1.75rem" }}>Project client</h2>
          {clients.map((p) => (
            <Link key={p.slug} className="case-feature" href={`/portfolio/${p.slug}/`}>
              {p.image && (
                <div className="case-shot">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    sizes="(max-width: 860px) 100vw, 55vw"
                    priority
                  />
                </div>
              )}
              <div>
                <div className="case-meta">
                  <span>{p.category}</span>
                  {p.status && <span className="live">{p.status}</span>}
                </div>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 style={{ fontSize: "var(--t-lg)" }}>Produk dan eksperimen FUSIONIFY</h2>
          <p className="muted" style={{ marginTop: "0.6rem", maxWidth: "38em" }}>
            Dibangun di dalam ekosistem FUSIONIFY. Ini tempat kami menguji pendekatan sebelum
            dipakai di project client.
          </p>
          <ul className="case-grid">
            {internal.map((p) => (
              <li key={p.slug}>
                <Link className="case-tile" href={`/portfolio/${p.slug}/`}>
                  <div className="case-meta">
                    <span>{p.category}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="scope">{p.scope.join(", ")}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
