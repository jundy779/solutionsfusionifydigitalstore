import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FlowDiagram } from "@/components/FlowDiagram";
import {
  audiences,
  boundaries,
  capabilities,
  engagements,
  faqs,
  history,
  principles,
  process,
} from "@/content/company";
import { projects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { site, waLink } from "@/content/site";

export default function Home() {
  const [featured, ...rest] = projects;
  const ai = getService("ai-solutions")!;
  const aiHighlights = [
    "AI assistant internal",
    "Chatbot berbasis knowledge",
    "Pemrosesan dokumen",
    "Klasifikasi dan ekstraksi data",
    "Automation AI + API + database",
    "Human-in-the-loop workflow",
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="display">Punya kebutuhan digital? Kita bantu bikin sampai jalan.</h1>
            <p className="lead">
              Dari website, automation, bot, sistem internal, integrasi API, AI workflow, sampai
              bantuan project dan kebutuhan teknis lainnya. Fusionify Solutions membantu mengubah
              kebutuhan menjadi solusi yang benar-benar bisa digunakan.
            </p>
            <div className="actions">
              <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
                Diskusikan kebutuhan
              </a>
              <Link className="btn btn-ghost" href="/portfolio/">
                Lihat project kami
              </Link>
            </div>
            <p className="hero-since">
              Berjalan sejak {site.since}. Web, automation, sistem, dan AI untuk UMKM, sekolah,
              startup, komunitas, sampai developer.
            </p>
          </div>
          <FlowDiagram />
        </div>
      </section>

      {/* Selected work */}
      <section className="work-strip" aria-label="Project pilihan">
        <div className="wrap work-strip-row">
          <p>Project pilihan</p>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/portfolio/${p.slug}/`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What is */}
      <section className="section" aria-labelledby="h-apa">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-apa">Apa itu Fusionify Solutions?</h2>
          </div>
          <div>
            <p className="intro-text">
              Lini layanan teknologi dari FUSIONIFY yang membantu individu, UMKM, sekolah,
              komunitas, organisasi, dan bisnis menyelesaikan kebutuhan digital secara praktis.
            </p>
            <p className="intro-text muted">
              Mulai dari website, sistem, automation, bot, integrasi API, setup dan maintenance,
              bantuan project, pembelajaran teknis, sampai implementasi AI.
            </p>
            <p className="intro-note">
              Kami tidak berusaha menjual teknologi yang paling kompleks. Fokus kami memilih
              pendekatan yang sesuai dengan kebutuhan, skala, budget, dan kondisi nyata setiap
              project.
            </p>
          </div>
        </div>
      </section>

      {/* Who we help */}
      <section className="section" aria-labelledby="h-siapa">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-siapa">Siapa yang bisa kami bantu?</h2>
            <p>Kebutuhannya beda-beda, cara kerjanya tetap sama: pahami dulu, baru bangun.</p>
          </div>
          <ul className="audience-list">
            {audiences.map((a) => (
              <li key={a.id}>
                <h3>{a.name}</h3>
                <p>{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="layanan" aria-labelledby="h-layanan">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-layanan">Layanan</h2>
            <p>Tujuh kelompok pekerjaan. Kebanyakan project nyata menyentuh lebih dari satu.</p>
          </div>
          <ul className="service-index">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="service-row" href={`/layanan/${s.slug}/`}>
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                  {s.since ? <span className="tag">Sejak {s.since}</span> : <span className="open">Detail</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section" id="cara-kerja" aria-labelledby="h-cara">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-cara">Cara kerja</h2>
            <p>Dari cerita pertama sampai sistem diserahkan. Tidak perlu datang dengan brief teknis.</p>
          </div>
          <ol className="process">
            {process.map((step) => (
              <li key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Case studies */}
      <section className="section" aria-labelledby="h-case">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "2.5rem" }}>
            <div className="split-head" style={{ position: "static" }}>
              <h2 id="h-case">Project yang sudah berjalan</h2>
            </div>
            <p className="lead" style={{ alignSelf: "end" }}>
              Project untuk client kami tandai terpisah dari produk yang dibangun di dalam ekosistem
              FUSIONIFY.
            </p>
          </div>

          <Link className="case-feature" href={`/portfolio/${featured.slug}/`}>
            {featured.image && (
              <div className="case-shot">
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  width={featured.image.width}
                  height={featured.image.height}
                  sizes="(max-width: 860px) 100vw, 55vw"
                />
              </div>
            )}
            <div>
              <div className="case-meta">
                <span className="origin" data-origin={featured.origin}>
                  Project client
                </span>
                <span>{featured.category}</span>
                {featured.status && <span className="live">{featured.status}</span>}
              </div>
              <h3>{featured.name}</h3>
              <p>{featured.summary}</p>
            </div>
          </Link>

          <ul className="case-grid">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link className="case-tile" href={`/portfolio/${p.slug}/`}>
                  <div className="case-meta">
                    <span className="origin" data-origin={p.origin}>
                      {p.origin === "client" ? "Project client" : "Produk FUSIONIFY"}
                    </span>
                    <span>{p.category}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="scope">{p.scope.slice(0, 4).join(", ")}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Principles */}
      <section className="section" aria-labelledby="h-prinsip">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-prinsip">Kenapa Fusionify Solutions</h2>
            <p>Tim kecil yang sanggup mengerjakan custom work serius, tanpa berpura-pura jadi konsultan raksasa.</p>
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

      {/* Capabilities */}
      <section className="section" aria-labelledby="h-tek">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-tek">Teknologi yang kami pakai</h2>
            <p>Dipilih sesuai kebutuhan project, bukan karena sedang ramai.</p>
          </div>
          <dl className="caps">
            {capabilities.map((c) => (
              <div key={c.group}>
                <dt>{c.group}</dt>
                <dd>
                  {c.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* AI since 2025 */}
      <section className="ai-band" aria-labelledby="h-ai">
        <div className="wrap ai-grid">
          <div>
            <span className="ai-since" aria-hidden="true">
              2025
            </span>
            <h2 id="h-ai">{ai.headline}</h2>
          </div>
          <div className="body">
            {ai.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="ai-list">
              {aiHighlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="actions">
              <Link className="btn btn-light" href="/layanan/ai-solutions/">
                Lihat layanan AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="section" style={{ borderTop: 0 }} aria-labelledby="h-model">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-model">Model kerja sama</h2>
            <p>Tidak semua pekerjaan cocok dengan harga paket. Kami pilih model yang paling adil untuk scope-nya.</p>
          </div>
          <div>
            <table className="models">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Cocok untuk</th>
                </tr>
              </thead>
              <tbody>
                {engagements.map((m) => (
                  <tr key={m.name}>
                    <th scope="row">{m.name}</th>
                    <td>{m.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pricing-note muted">
              Harga ditentukan berdasarkan scope, kompleksitas, integrasi, timeline, dan kebutuhan
              support. Estimasi tertulis selalu dikirim sebelum pekerjaan dimulai.
            </p>
          </div>
        </div>
      </section>

      {/* Boundaries */}
      <section className="section" aria-labelledby="h-batas">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-batas">Yang tidak kami kerjakan</h2>
            <p>Batasan ini bagian dari cara kami bekerja dengan jujur.</p>
          </div>
          <div>
            <ul className="boundaries">
              {boundaries.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="boundary-note">
              Jika kebutuhan berada di luar kemampuan atau kapasitas kami, kami sampaikan sejak awal
              daripada menjanjikan sesuatu yang tidak realistis.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section" aria-labelledby="h-sejarah">
        <div className="wrap">
          <div className="split" style={{ marginBottom: "3rem" }}>
            <div className="split-head" style={{ position: "static" }}>
              <h2 id="h-sejarah">Perjalanan sejak 2022</h2>
            </div>
            <p className="lead" style={{ alignSelf: "end" }}>
              Berawal dari bantuan project dan kolaborasi, tumbuh menjadi service arm FUSIONIFY.{" "}
              <Link href="/tentang/">Baca selengkapnya</Link>
            </p>
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

      {/* FAQ */}
      <section className="section" id="faq" aria-labelledby="h-faq">
        <div className="wrap split">
          <div className="split-head">
            <h2 id="h-faq">Pertanyaan yang sering muncul</h2>
            <p>
              Belum terjawab?{" "}
              <a href={waLink("Halo Fusionify Solutions, saya mau tanya dulu.")} target="_blank" rel="noopener noreferrer">
                Tanya langsung lewat WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="kontak" aria-labelledby="h-kontak">
        <div className="wrap contact-grid">
          <div>
            <h2 id="h-kontak" className="display">
              Ada pekerjaan digital yang belum selesai?
            </h2>
            <p className="lead">
              Ceritakan kebutuhan Anda. Tidak harus punya brief teknis lengkap. Kami bantu
              menentukan pendekatan yang masuk akal terlebih dahulu.
            </p>
            <div className="contact-direct">
              <div>
                <span>Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div>
                <span>WhatsApp</span>
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  {site.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
