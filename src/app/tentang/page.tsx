import type { Metadata } from "next";
import Link from "next/link";
import { boundaries, history, principles } from "@/content/company";
import { ogImage, site, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Fusionify Solutions lahir sebagai bagian dari perjalanan FUSIONIFY pada 22 Desember 2022, dan sejak 2025 juga menangani integrasi AI.",
  alternates: { canonical: "/tentang/" },
  openGraph: { title: "Tentang | FUSIONIFY SOLUTIONS", url: "/tentang/", images: [ogImage] },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1 className="display">Dari ide, masalah, sampai solusi yang bisa dipakai.</h1>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>Cerita singkat</h2>
          </div>
          <div className="prose" style={{ fontSize: "var(--t-md)", lineHeight: 1.6 }}>
            <p>
              Fusionify Solutions lahir sebagai bagian dari perjalanan{" "}
              <a href={site.masterBrand} target="_blank" rel="noopener noreferrer">
                FUSIONIFY
              </a>{" "}
              pada {site.since}. Awalnya layanan ini berkembang dari kebutuhan project assistance,
              pembelajaran teknis, pengembangan software, dan berbagai bentuk kolaborasi.
            </p>
            <p>
              Seiring waktu, cakupannya meluas menjadi layanan teknologi yang lebih lengkap: website
              dan web application, automation, bot, sistem digital, integrasi API, cloud dan
              deployment support, hingga konsultasi dan custom development.
            </p>
            <p>
              Sejak 2025, Fusionify Solutions juga menangani kebutuhan berbasis AI seperti AI
              integration, intelligent automation, assistant, chatbot, dan workflow berbasis AI.
            </p>
            <p>
              Kami tidak berusaha menjual teknologi yang paling kompleks. Fokus kami memilih
              pendekatan yang sesuai dengan kebutuhan, skala, budget, dan kondisi nyata setiap
              project.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 style={{ fontSize: "var(--t-xl)", marginBottom: "3rem" }}>Perjalanan</h2>
          <ol className="timeline">
            {history.map((h) => (
              <li key={h.year}>
                <span className="year">{h.year}</span>
                <h3>{h.title}</h3>
                <p>
                  {h.date ? `${h.date}. ` : ""}
                  {h.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>Prinsip kerja</h2>
          </div>
          <dl className="principles">
            {principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>Batasan kami</h2>
          </div>
          <div>
            <ul className="boundaries">
              {boundaries.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="actions" style={{ marginTop: "2.5rem" }}>
              <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
                Diskusikan kebutuhan
              </a>
              <Link className="btn btn-ghost" href="/layanan/">
                Lihat layanan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
