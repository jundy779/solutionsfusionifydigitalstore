import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Chat, Mail } from "@/components/Icons";
import { ogImage, site, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Ceritakan kebutuhan digital Anda ke Fusionify Solutions lewat WhatsApp atau email.",
  alternates: { canonical: "/kontak/" },
  openGraph: { title: "Kontak | FUSIONIFY SOLUTIONS", url: "/kontak/", images: [ogImage] },
};

export default function ContactPage() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="cta" style={{ background: "transparent", boxShadow: "none", padding: 0 }}>
          <div>
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
  );
}
