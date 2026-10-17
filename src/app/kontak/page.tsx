import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ogImage, site, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Ceritakan kebutuhan digital Anda ke Fusionify Solutions lewat WhatsApp atau email.",
  alternates: { canonical: "/kontak/" },
  openGraph: { title: "Kontak | FUSIONIFY SOLUTIONS", url: "/kontak/", images: [ogImage] },
};

export default function ContactPage() {
  return (
    <section className="contact" style={{ borderTop: 0 }}>
      <div className="wrap contact-grid">
        <div>
          <h1 className="display" style={{ fontSize: "var(--t-2xl)", maxWidth: "10em" }}>
            Ceritakan kebutuhannya dulu.
          </h1>
          <p className="lead">
            Tidak harus punya brief teknis lengkap. Biasanya kami membalas di hari yang sama pada
            jam kerja, lalu mengajak ngobrol singkat untuk memahami konteksnya.
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
  );
}
