import Image from "next/image";
import Link from "next/link";
import { audiencePages } from "@/content/answers";
import { services } from "@/content/services";
import { site, waLink } from "@/content/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="brand">
              <Image src="/images/fusionify-mark.png" alt="" width={34} height={34} />
              <span className="brand-word">
                <strong>FUSIONIFY</strong>
                <span>SOLUTIONS</span>
              </span>
            </Link>
            <p>
              Lini layanan teknologi dari{" "}
              <a href={site.masterBrand} target="_blank" rel="noopener noreferrer">
                FUSIONIFY
              </a>
              , dikelola oleh {site.legalName}. Membantu kebutuhan digital sejak {site.since}.
            </p>
          </div>

          <div>
            <h2>Layanan</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/layanan/${s.slug}/`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Solusi untuk</h2>
            <ul>
              {audiencePages.map((a) => (
                <li key={a.slug}>
                  <Link href={`/untuk/${a.slug}/`}>{a.title.replace(/^.*untuk /i, "").replace(/^./, (c) => c.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Fusionify Solutions</h2>
            <ul>
              <li>
                <Link href="/portfolio/">Portfolio</Link>
              </li>
              <li>
                <Link href="/tentang/">Tentang dan sejarah</Link>
              </li>
              <li>
                <Link href="/#cara-kerja">Cara kerja</Link>
              </li>
              <li>
                <Link href="/faq/">FAQ</Link>
              </li>
              <li>
                <Link href="/privasi/">Privasi</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>Kontak</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <Link href="/kontak/">Form kebutuhan</Link>
              </li>
            </ul>
          </div>
        </div>

        <Wordmark />

        <div className="footer-base">
          <span>
            © {year} {site.legalName} ({site.legalForm}), {site.city}
          </span>
          <span>{site.name} adalah lini layanan teknologi dari FUSIONIFY</span>
        </div>
      </div>
    </footer>
  );
}
