import type { Metadata } from "next";
import { Clouds } from "@/components/Clouds";
import { Sheet } from "@/components/Sheet";
import Link from "next/link";
import { Chat, XCircle } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { keyFacts } from "@/content/answers";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { boundaries, capabilities, engagements, history, principles } from "@/content/company";
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
      <header className="page-hero">
        <Clouds count={3} />
        <div className="wrap">
          <Sheet onSky>Tentang</Sheet>
          <h1 className="display">Dari ide, masalah, sampai solusi yang bisa dipakai.</h1>
          <p className="lead">
            Fusionify Solutions adalah lini layanan teknologi dari FUSIONIFY, dikelola oleh{" "}
            {site.legalName}. Kami membantu individu,
            UMKM, sekolah, komunitas, organisasi, dan bisnis menyelesaikan kebutuhan digital secara
            praktis.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="panel panel-grid">
            <div>
              <h2>Cerita singkat</h2>
            </div>
            <div className="prose" style={{ fontSize: "1.1rem", color: "var(--ink-2)" }}>
              <p>
                Fusionify Solutions lahir sebagai bagian dari perjalanan{" "}
                <a className="link" href={site.masterBrand} target="_blank" rel="noopener noreferrer">
                  FUSIONIFY
                </a>{" "}
                pada {site.since}. Awalnya layanan ini tumbuh dari kebutuhan project assistance,
                pembelajaran teknis, pengembangan software, dan berbagai bentuk kolaborasi.
              </p>
              <p>
                Seiring waktu, cakupannya meluas: website dan web application, automation, bot, sistem
                digital, integrasi API, cloud dan deployment support, sampai konsultasi dan custom
                development.
              </p>
              <p>
                Sejak 2025 kami juga menangani kebutuhan berbasis AI seperti AI integration,
                intelligent automation, assistant, chatbot, dan workflow berbasis AI.
              </p>
              <p>
                Kami tidak berusaha menjual teknologi yang paling kompleks. Fokus kami memilih
                pendekatan yang sesuai dengan kebutuhan, skala, budget, dan kondisi nyata setiap
                project.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="fakta">
        <div className="wrap">
          <div className="panel panel-grid">
            <div>
              <h2>Fakta singkat</h2>
              <p>Ringkasan resmi tentang Fusionify Solutions.</p>
            </div>
            <dl className="facts-list">
              {keyFacts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Perjalanan sejak 2022</h2>
          </div>
          <ol className="timeline">
            {history.map((h) => (
              <li key={h.year}>
                <span className="year">{h.year}</span>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="prinsip">
        <div className="wrap">
          <div className="section-head">
            <h2>Prinsip kerja</h2>
            <p>Delapan hal yang kami pegang di setiap project, besar atau kecil.</p>
          </div>
          <div className="cols-2">
            {principles.map((p) => (
              <div className="principle" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Model kerja sama</h2>
            <p>
              Harga ditentukan berdasarkan scope, kompleksitas, integrasi, timeline, dan kebutuhan
              support. Estimasi tertulis selalu dikirim sebelum pekerjaan dimulai.
            </p>
          </div>
          <div className="models">
            {engagements.map((m) => (
              <div className="model" key={m.name}>
                <h3>{m.name}</h3>
                <p>{m.fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="batasan">
        <div className="wrap">
          <div className="section-head">
            <h2>Yang tidak kami kerjakan</h2>
            <p>
              Jika kebutuhan berada di luar kemampuan atau kapasitas kami, kami sampaikan sejak awal
              daripada menjanjikan sesuatu yang tidak realistis.
            </p>
          </div>
          <ul className="no-list">
            {boundaries.map((b) => (
              <li key={b}>
                <XCircle />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Teknologi yang kami pakai</h2>
            <p>Dipilih sesuai kebutuhan project, bukan karena sedang ramai.</p>
          </div>
          <div className="caps">
            {capabilities.map((c) => (
              <div className="cap" key={c.group}>
                <h3>{c.group}</h3>
                <div className="chips">
                  {c.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="actions" style={{ marginTop: "3rem" }}>
            <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
              <Chat /> Diskusikan kebutuhan
            </a>
            <Link className="btn btn-secondary" href="/layanan/">
              Lihat layanan
            </Link>
          </div>
        </div>
      </section>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/tentang/", name: "Tentang Fusionify Solutions", description: "Profil, sejarah, prinsip kerja, dan batasan Fusionify Solutions.", type: "AboutPage" }),
          breadcrumbSchema([{ name: "Tentang", path: "/tentang/" }]),
        )}
      />
    </>
  );
}
