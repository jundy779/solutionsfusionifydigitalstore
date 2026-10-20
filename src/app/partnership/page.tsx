import type { Metadata } from "next";
import Link from "next/link";
import { Clouds } from "@/components/Clouds";
import { Sheet } from "@/components/Sheet";
import { TrustedBy } from "@/components/TrustedBy";
import { JsonLd } from "@/components/JsonLd";
import { Chat, Check, Mail } from "@/components/Icons";
import { partnerFaqs, partners, partnerSteps, partnerTypes, sponsorTracks } from "@/content/partnership";
import { PartnerGrid } from "@/components/PartnerGrid";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { ogImage, site, waLink } from "@/content/site";

const description =
  "Partnership untuk agency, kampus, komunitas, dan penyedia teknologi. Plus sponsorship dua arah: kami mensponsori acara, brand bisa mendukung program kami.";

export const metadata: Metadata = {
  title: "Partnership dan sponsorship",
  description,
  alternates: { canonical: "/partnership/" },
  openGraph: { title: "Partnership dan sponsorship | FUSIONIFY SOLUTIONS", url: "/partnership/", images: [ogImage] },
};

const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export default function PartnershipPage() {
  return (
    <>
      <header className="page-hero">
        <Clouds count={3} />
        <div className="wrap">
          <Sheet onSky>Partnership</Sheet>
          <h1 className="display">Kerja bareng, bukan cuma kerja sama di atas kertas.</h1>
          <p className="lead">
            Kami terbuka untuk agency, kampus, komunitas, dan penyedia teknologi yang ingin membangun
            sesuatu bersama. Kami juga mendukung acara lewat sponsorship, dan menerima dukungan dari
            brand yang sejalan.
          </p>
          <div className="actions">
            <a className="btn btn-wa" href={waLink("Halo Fusionify Solutions, saya mau diskusi partnership.")} target="_blank" rel="noopener noreferrer">
              <Chat /> Diskusi partnership
            </a>
            <a className="btn btn-outline-light" href="#sponsorship">
              Lihat sponsorship
            </a>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <TrustedBy />
          <PartnerGrid partners={partners} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="jenis">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <Sheet no="01 / 03">Jenis partnership</Sheet>
            <h2>Tiga bentuk kerja sama yang kami buka.</h2>
            <p>Masing-masing punya cara kerja sendiri, tapi prinsipnya sama: peran jelas dan dicatat sejak awal.</p>
          </div>
          <div className="partner-grid">
            {partnerTypes.map((t, i) => (
              <article className="partner-card" key={t.id} id={t.id} data-reveal data-spot>
                <span className="partner-card__no">0{i + 1}</span>
                <h3>{t.title}</h3>
                <p className="partner-card__who">{t.who}</p>
                <ul className="partner-card__list">
                  {t.offer.map((o) => (
                    <li key={o}>
                      <Check /> {o}
                    </li>
                  ))}
                </ul>
                {t.example && <p className="partner-card__example">{t.example}</p>}
              </article>
            ))}
          </div>

          <ol className="partner-steps" aria-label="Alur partnership">
            {partnerSteps.map((s, i) => (
              <li key={s.title} data-reveal>
                <span>{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sponsor-band" id="sponsorship" aria-labelledby="h-sponsor">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <Sheet no="02 / 03">Sponsorship</Sheet>
            <h2 id="h-sponsor">Sponsorship dua arah.</h2>
            <p>Kami bisa jadi sponsor acara kamu, dan brand kamu bisa mendukung program kami.</p>
          </div>
          <div className="sponsor-grid">
            {sponsorTracks.map((t) => (
              <article className={`sponsor-card sponsor-card--${t.id}`} key={t.id} id={t.id} data-reveal>
                <p className="sponsor-card__label">{t.label}</p>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                <div className="sponsor-card__cols">
                  <div>
                    <h4>Bentuk dukungan</h4>
                    <ul>
                      {t.forms.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Yang perlu dikirim</h4>
                    <ul>
                      {t.send.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="sponsor-card__note">{t.note}</p>
                <a className="btn btn-primary" href={mail(t.id === "kami-sponsori" ? "Pengajuan sponsorship acara" : "Penawaran sponsorship untuk FUSIONIFY")}>
                  <Mail /> {t.id === "kami-sponsori" ? "Kirim proposal acara" : "Ajukan kerja sama sponsor"}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap">
          <div className="panel panel-grid">
            <div>
              <Sheet no="03 / 03">FAQ</Sheet>
              <h2>Pertanyaan soal partnership</h2>
              <p>
                Belum terjawab?{" "}
                <Link className="link" href="/kontak/">
                  Hubungi kami
                </Link>
                .
              </p>
            </div>
            <div className="faq">
              {partnerFaqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="actions" style={{ marginTop: "2.5rem" }}>
            <a className="btn btn-wa" href={waLink("Halo Fusionify Solutions, saya mau diskusi partnership.")} target="_blank" rel="noopener noreferrer">
              <Chat /> Chat WhatsApp
            </a>
            <a className="btn btn-secondary" href={mail("Partnership")}>
              <Mail /> {site.email}
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={graph(
          webPageSchema({ path: "/partnership/", name: "Partnership dan sponsorship Fusionify Solutions", description }),
          breadcrumbSchema([{ name: "Partnership", path: "/partnership/" }]),
          faqSchema(partnerFaqs, "/partnership/"),
        )}
      />
    </>
  );
}
