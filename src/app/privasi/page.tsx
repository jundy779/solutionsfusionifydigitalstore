import type { Metadata } from "next";
import { Clouds } from "@/components/Clouds";
import { Sheet } from "@/components/Sheet";
import { ogImage, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privasi",
  description: "Bagaimana Fusionify Solutions memperlakukan data yang kamu kirimkan.",
  alternates: { canonical: "/privasi/" },
  openGraph: { title: "Privasi | FUSIONIFY SOLUTIONS", url: "/privasi/", images: [ogImage] },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="page-hero">
        <Clouds count={3} />
        <div className="wrap">
          <Sheet onSky>Legal</Sheet>
          <h1 className="display">Privasi</h1>
          <p className="lead">Versi singkat: website ini tidak menyimpan data kamu.</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="panel panel-grid">
            <div>
              <h2>Rinciannya</h2>
            </div>
            <div className="prose">
            <p>
              Website ini dikelola oleh {site.legalName} untuk lini layanan {site.name}.
            </p>
            <p>
              Form di website ini tidak mengirim data ke server kami. Saat kamu menekan tombol kirim,
              isi form dirangkai menjadi pesan lalu dibuka di WhatsApp atau aplikasi email kamu
              sendiri. Kamu yang memutuskan apakah pesan itu dikirim.
            </p>
            <p>
              Website ini tidak memakai cookie pelacak iklan. Jika nanti kami menambahkan analitik,
              halaman ini akan diperbarui lebih dulu.
            </p>
            <p>
              Informasi yang kamu kirim lewat WhatsApp atau email, termasuk credential, file, dan
              data internal project, kami perlakukan sebagai informasi terbatas. Informasi itu hanya
              dipakai untuk mengerjakan kebutuhan kamu dan tidak dipublikasikan tanpa izin.
            </p>
            <p>
              Ingin data kamu dihapus dari percakapan atau arsip project kami? Kirim permintaan ke{" "}
              <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
