import Image from "next/image";
import Link from "next/link";
import { audiencePages } from "@/content/answers";
import { services } from "@/content/services";
import { site, waLink } from "@/content/site";
import { BackToTop } from "./BackToTop";
import { Chat, Mail } from "./Icons";
import { Wordmark } from "./Wordmark";

const company = [
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/tentang/", label: "Tentang dan sejarah" },
  { href: "/partnership/", label: "Partnership" },
  { href: "/partnership/#sponsorship", label: "Sponsorship" },
  { href: "/#cara-kerja", label: "Cara kerja" },
  { href: "/faq/", label: "FAQ" },
  { href: "/kontak/", label: "Kontak" },
];

const audienceLabel = (title: string) =>
  title.replace(/^.*untuk /i, "").replace(/^./, (c) => c.toUpperCase());

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cta">
          <div>
            <p className="footer-cta__label">Mulai project</p>
            <h2 className="footer-cta__title">Ada kebutuhan digital yang mau dibereskan?</h2>
          </div>
          <div className="footer-cta__actions">
            <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener noreferrer">
              <Chat /> Chat WhatsApp
            </a>
            <a className="btn btn-outline-light" href={`mailto:${site.email}`}>
              <Mail /> Kirim email
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="brand" aria-label="Fusionify Solutions, ke beranda">
              <Image src="/images/fusionify-mark.png" alt="" width={36} height={36} />
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
              . Membantu website, automation, sistem, dan AI sejak {site.since}.
            </p>
            <ul className="footer-contact">
              <li>
                <a href={`mailto:${site.email}`}>
                  <Mail /> {site.email}
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <Chat /> {site.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Layanan">
            <h2>Layanan</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/layanan/${s.slug}/`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Solusi untuk">
            <h2>Solusi untuk</h2>
            <ul>
              {audiencePages.map((a) => (
                <li key={a.slug}>
                  <Link href={`/untuk/${a.slug}/`}>{audienceLabel(a.title)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Perusahaan">
            <h2>Perusahaan</h2>
            <ul>
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Wordmark />

        <div className="footer-base">
          <p>
            © {year} {site.legalName} ({site.legalForm}), {site.city}
          </p>
          <div className="footer-base__links">
            <Link href="/privasi/">Privasi</Link>
            <a href="/llms.txt">llms.txt</a>
            <a href="/sitemap.xml">Sitemap</a>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
