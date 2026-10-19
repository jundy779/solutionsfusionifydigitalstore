import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ArrowRight, Chat, Check, FileText, Handover, Key, Mail, Target } from "@/components/Icons";
import { AiDemo, HeroStage, ServiceVisual } from "@/components/Mockups";
import { Clouds } from "@/components/Clouds";
import { JsonLd } from "@/components/JsonLd";
import { Sheet } from "@/components/Sheet";
import { HeroScene } from "@/components/motion/HeroScene";
import { SplitWords } from "@/components/motion/SplitWords";
import { Tilt } from "@/components/motion/Tilt";
import { ProjectCover } from "@/components/ProjectCover";
import { StatusChip } from "@/components/StatusChip";
import { faqSchema, graph, webPageSchema } from "@/lib/schema";
import { faqs, process } from "@/content/company";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site, waLink } from "@/content/site";

const tileClass: Record<string, string> = {
  "web-development": "t-web",
  "automation-bots": "t-auto",
  "ai-solutions": "t-ai",
  "digital-systems": "t-sys",
  "cloud-deployment": "t-cloud",
  "project-assistance": "t-assist",
  "consulting-documentation": "t-consult",
};

const pillars = [
  {
    icon: Target,
    title: "Teknologi secukupnya, bukan seheboh-hebohnya",
    body: "Kami pilih pendekatan setelah masalahnya jelas. Tidak semua project butuh microservices, Kubernetes, atau AI.",
  },
  {
    icon: FileText,
    title: "Scope dan biaya jelas sebelum mulai",
    body: "Timeline, jumlah revisi, ownership, dan estimasi biaya dibahas tertulis sebelum development.",
  },
  {
    icon: Key,
    title: "Fleksibilitas source code dan aset",
    body: "Kepemilikan source code, domain, dan akun disepakati sejak awal sesuai model project, lalu diserahkan lengkap dengan dokumentasinya.",
  },
  {
    icon: Handover,
    title: "Dibangun supaya bisa diserahkan",
    body: "Ada dokumentasi dan handover, jadi sistem tidak cuma dimengerti developer-nya.",
  },
];

const homeFaqs = [0, 2, 4, 6, 7, 8].map((i) => faqs[i]);

export default function Home() {
  const [featured, ...rest] = projects;
  return (
    <>
      <section className="hero">
        <Clouds />
        <HeroScene />
        <div className="wrap hero-grid">
          <div>
            <span className="hero-pill enter" style={{ animationDelay: "0.05s" }}>
              <b>Sejak 2025</b> AI workflow kini bagian dari layanan kami
            </span>
            <h1 className="display">
              <SplitWords text="Punya kebutuhan digital? Kita bantu bikin sampai jalan." start={0.15} step={0.055} />
            </h1>
            <p className="lead enter" style={{ animationDelay: "0.65s" }}>
              Website, automation, bot, sistem internal, integrasi API, sampai AI workflow. Kami
              mengubah kebutuhan jadi solusi yang benar-benar dipakai setiap hari.
            </p>
            <div className="actions enter" style={{ animationDelay: "0.8s" }}>
              <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
                <Chat /> Diskusikan kebutuhan
              </a>
              <Link className="btn btn-secondary" href="/portfolio/">
                Lihat project kami
              </Link>
            </div>
            <div className="hero-proof enter" style={{ animationDelay: "0.95s" }}>
              <span>
                <Check /> Tidak perlu brief teknis
              </span>
              <span>
                <Check /> Estimasi tertulis sebelum mulai
              </span>
              <span>
                <Check /> Fleksibilitas source code
              </span>
            </div>
          </div>
          <div className="enter-stage">
            <Tilt>
              <HeroStage />
            </Tilt>
          </div>
        </div>
      </section>

      <section className="strip" aria-label="Project pilihan">
        <div className="wrap">
          <div className="strip-inner">
            <p className="strip-label">Sudah dikerjakan sejak {site.since.split(" ").pop()}</p>
            <div className="marquee">
              <div className="marquee-track">
                {[...projects, ...projects].map((p, i) => (
                  <Link key={`${p.slug}-${i}`} href={`/portfolio/${p.slug}/`} tabIndex={i >= projects.length ? -1 : 0} aria-hidden={i >= projects.length}>
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="layanan" aria-labelledby="h-layanan">
        <div className="wrap">
          <div className="head-row">
            <div className="section-head" data-reveal>
              <Sheet no="01 / 08">Layanan</Sheet>
              <h2 id="h-layanan">Satu tim untuk website, automation, sampai AI.</h2>
              <p>Kebanyakan kebutuhan nyata menyentuh lebih dari satu layanan. Kami kerjakan rangkaiannya sampai tersambung.</p>
            </div>
            <Link className="btn btn-secondary" href="/layanan/">
              Semua layanan
            </Link>
          </div>
          <div className="bento">
            {services.map((s) => (
              <Link key={s.slug} href={`/layanan/${s.slug}/`} className={`tile ${tileClass[s.slug]}`} data-spot data-reveal>
                {s.since && <span className="tile-tag">Sejak {s.since}</span>}
                <div className="tile-body">
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                  <span className="tile-more">
                    Lihat cakupan <ArrowRight />
                  </span>
                </div>
                <div className="tile-visual">
                  <ServiceVisual slug={s.slug} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="h-siapa">
        <div className="wrap switcher">
          <div className="section-head" data-reveal>
            <Sheet no="02 / 08">Untuk siapa</Sheet>
            <h2 id="h-siapa">Datang dari mana pun, alurnya sama: pahami dulu, baru bangun.</h2>
            <p>
              UMKM, sekolah, startup, komunitas, atau developer yang lagi buntu. Pilih yang paling
              mirip situasi kamu dan lihat contoh alurnya.
            </p>
            <div className="actions" style={{ marginTop: "2rem" }}>
              <a className="btn btn-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
                <Chat /> Ceritakan situasi kamu
              </a>
            </div>
          </div>
          <div data-reveal>
            <FlowDiagram />
          </div>
        </div>
      </section>

      <section className="section work-band" aria-labelledby="h-work">
        <div className="wrap">
          <div className="head-row">
            <div className="section-head" data-reveal>
              <Sheet no="03 / 08">Portfolio</Sheet>
              <h2 id="h-work">Project yang sudah berjalan.</h2>
              <p>Project client kami tandai terpisah dari produk yang kami bangun sendiri di ekosistem FUSIONIFY.</p>
            </div>
            <Link className="btn btn-secondary" href="/portfolio/">
              Semua project
            </Link>
          </div>

          <Link className="showcase" href={`/portfolio/${featured.slug}/`} data-spot data-reveal>
            <ProjectCover project={featured} />
            <div className="showcase-body">
              <div className="chips">
                <span className="chip client">Project client</span>
                <StatusChip project={featured} />
              </div>
              <h3>{featured.name}</h3>
              <p>{featured.summary}</p>
              <p className="muted" style={{ marginTop: "0.6rem" }}>
                {featured.category}
                {featured.location ? `, ${featured.location}` : ""}
              </p>
              <span className="tile-more">
                Baca case study <ArrowRight />
              </span>
            </div>
          </Link>

          <ul className="work-grid work-grid--home">
            {rest.map((p) => (
              <li key={p.slug} data-reveal>
                <Link className="work-card" href={`/portfolio/${p.slug}/`} data-spot>
                  <ProjectCover project={p} />
                  <div className="work-card-body">
                    <div className="chips">
                      <span className={p.origin === "client" ? "chip client" : "chip own"}>
                        {p.origin === "client" ? "Project client" : "Produk FUSIONIFY"}
                      </span>
                      <StatusChip project={p} />
                    </div>
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="cara-kerja" aria-labelledby="h-cara">
        <div className="wrap">
          <div className="section-head center" data-reveal>
            <Sheet no="04 / 08">Cara kerja</Sheet>
            <h2 id="h-cara">Dari cerita pertama sampai sistem diserahkan.</h2>
            <p>Tujuh tahap yang sama untuk project kecil maupun besar. Kamu selalu tahu sedang di tahap mana.</p>
          </div>
          <ol className="steps" data-reveal>
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

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="h-why">
        <div className="wrap why">
          <div>
            <div className="section-head" data-reveal>
              <Sheet no="05 / 08">Kenapa kami</Sheet>
              <h2 id="h-why">Tim kecil yang sanggup mengerjakan project serius.</h2>
              <p>
                Tanpa berpura-pura jadi konsultan raksasa. Kalau kebutuhan kamu di luar kapasitas
                kami, kami bilang dari awal.
              </p>
            </div>
            <div className="facts">
              <div className="fact" data-reveal>
                <b>2022</b>
                <span>Mulai berjalan, {site.since}</span>
              </div>
              <div className="fact" data-reveal>
                <b>7</b>
                <span>Kelompok layanan, dari web sampai AI</span>
              </div>
              <div className="fact" data-reveal>
                <b>2025</b>
                <span>Mulai mengerjakan AI workflow</span>
              </div>
              <div className="fact" data-reveal>
                <b>Fleksibel</b>
                <span>Kepemilikan source code dan aset sesuai kesepakatan</span>
              </div>
            </div>
            <p style={{ marginTop: "1.75rem" }}>
              <Link className="link" href="/tentang/">
                Prinsip kerja dan batasan kami
              </Link>
            </p>
          </div>
          <div className="pillars">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div className="pillar" key={title} data-reveal>
                <span className="pillar-icon">
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="h-ai">
        <div className="wrap">
          <div className="ai-card" data-reveal>
            <div className="ai-copy">
              <Sheet no="06 / 08" onSky>
                AI Solutions, sejak 2025
              </Sheet>
              <h2 id="h-ai">AI yang masuk ke workflow, bukan cuma chatbox.</h2>
              <p>
                Assistant internal, chatbot berbasis knowledge, pemrosesan dokumen, klasifikasi
                data, sampai automation yang menggabungkan AI dengan API dan database kamu.
              </p>
              <p>Kalau masalahnya bisa selesai lebih sederhana tanpa AI, kami juga akan bilang begitu.</p>
              <div className="actions">
                <Link className="btn btn-white" href="/layanan/ai-solutions/">
                  Lihat layanan AI
                </Link>
                <a
                  className="btn btn-outline-light"
                  href={waLink("Halo Fusionify Solutions, saya mau diskusi soal implementasi AI.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Diskusi soal AI
                </a>
              </div>
            </div>
            <AiDemo />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="faq" aria-labelledby="h-faq">
        <div className="wrap faq-layout">
          <div className="section-head" data-reveal>
            <Sheet no="07 / 08">FAQ</Sheet>
            <h2 id="h-faq">Pertanyaan yang sering muncul.</h2>
            <p>
              <Link className="link" href="/faq/">
                Lihat semua FAQ
              </Link>{" "}
              atau{" "}
              <a className="link" href={waLink("Halo Fusionify Solutions, saya mau tanya dulu.")} target="_blank" rel="noopener noreferrer">
                tanya langsung lewat WhatsApp
              </a>
            </p>
          </div>
          <div className="faq">
            {homeFaqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }} id="kontak" aria-labelledby="h-kontak">
        <div className="wrap">
          <div className="cta" data-reveal>
            <div>
              <Sheet no="08 / 08">Kontak</Sheet>
              <h2 id="h-kontak">Ada pekerjaan digital yang belum selesai?</h2>
              <p className="lead">
                Ceritakan kebutuhannya. Tidak harus punya brief teknis lengkap, kami bantu menentukan
                pendekatan yang masuk akal lebih dulu.
              </p>
              <div className="cta-direct">
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <span className="ico">
                    <Chat />
                  </span>
                  <span>
                    <small>WhatsApp</small>
                    <b>{site.whatsappDisplay}</b>
                  </span>
                </a>
                <a href={`mailto:${site.email}`}>
                  <span className="ico">
                    <Mail />
                  </span>
                  <span>
                    <small>Email</small>
                    <b>{site.email}</b>
                  </span>
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageSchema({ path: "/", name: site.name, description: site.description }),
          faqSchema(homeFaqs, "/"),
        )}
      />
    </>
  );
}
