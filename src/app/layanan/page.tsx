import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { ogImage, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Web development, automation dan bot, AI solutions, integrasi sistem, cloud dan deployment, project assistance, serta konsultasi dan dokumentasi teknis.",
  alternates: { canonical: "/layanan/" },
  openGraph: { title: "Layanan | FUSIONIFY SOLUTIONS", url: "/layanan/", images: [ogImage] },
};

export default function ServicesPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1 className="display">Layanan</h1>
          <p className="lead">
            Tujuh kelompok pekerjaan yang sering saling bersambung. Website butuh form, form butuh
            database, database butuh notifikasi. Kami mengerjakan rangkaian itu sampai jalan.
          </p>
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <ul className="service-index">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="service-row" href={`/layanan/${s.slug}/`}>
                  <h2 style={{ fontStretch: "112%", fontSize: "var(--t-md)" }}>{s.name}</h2>
                  <p>{s.summary}</p>
                  {s.since ? <span className="tag">Sejak {s.since}</span> : <span className="open">Detail</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="callout">
            <p>
              Kebutuhan Anda tidak cocok dengan satu kategori pun? Itu wajar.{" "}
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                Ceritakan saja dulu
              </a>
              , nanti kami bantu petakan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
