import type { Metadata } from "next";
import { Clouds } from "@/components/Clouds";
import { Sheet } from "@/components/Sheet";
import { ContactForm } from "@/components/ContactForm";
import { Chat, Mail } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { leaders, ogImage, site, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Ceritakan kebutuhan digital kamu ke Fusionify Solutions lewat WhatsApp atau email.",
  alternates: { canonical: "/kontak/" },
  openGraph: { title: "Kontak | FUSIONIFY SOLUTIONS", url: "/kontak/", images: [ogImage] },
};

export default function ContactPage() {
  return (
    <section className="page-hero">
        <Clouds count={3} />
      <div className="wrap">
        <div className="cta" style={{ background: "transparent", boxShadow: "none", padding: 0 }}>
          <div>
            <Sheet onSky>Kontak</Sheet>
            <h1 className="display">Ceritakan kebutuhannya dulu.</h1>
            <p className="lead">
              Tidak harus punya brief teknis lengkap. Kami pelajari dulu konteksnya, lalu mengirim
              gambaran solusi, timeline, dan estimasi biaya secara tertulis.
            </p>
            <div className="cta-direct">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <span className="ico">
                  <Chat />
                </span>
                <span>
                  <small>WhatsApp admin</small>
                  <b>{site.whatsappDisplay}</b>
                </span>
              </a>
              <a href={`mailto:${site.email}`}>
                <span className="ico">
                  <Mail />
                </span>
                <span>
                  <small>Email admin</small>
                  <b>{site.email}</b>
                </span>
              </a>
            </div>
            <div className="leaders">
              <p className="leaders__label">Kontak pimpinan</p>
              <ul>
                {leaders.map((l) => (
                  <li key={l.email}>
                    <span>
                      <strong>{l.name}</strong>
                      <small>{l.role}</small>
                    </span>
                    <span className="leaders__links">
                      <a href={`mailto:${l.email}`}>
                        <Mail /> {l.email}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="leaders__note">Untuk kerja sama strategis dan project yang sedang berjalan. Pertanyaan umum lebih cepat dijawab lewat admin.</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/kontak/", name: "Kontak Fusionify Solutions", description: "Hubungi Fusionify Solutions lewat WhatsApp atau email.", type: "ContactPage" }),
          breadcrumbSchema([{ name: "Kontak", path: "/kontak/" }]),
        )}
      />
    </section>
  );
}
