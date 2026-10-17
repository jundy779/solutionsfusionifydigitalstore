import type { Metadata } from "next";
import { ogImage, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privasi",
  description: "Bagaimana Fusionify Solutions memperlakukan data yang Anda kirimkan.",
  alternates: { canonical: "/privasi/" },
  openGraph: { title: "Privasi | FUSIONIFY SOLUTIONS", url: "/privasi/", images: [ogImage] },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <h1 className="display">Privasi</h1>
          <p className="lead">Versi singkat: website ini tidak menyimpan data Anda.</p>
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
              Form di website ini tidak mengirim data ke server kami. Saat Anda menekan tombol kirim,
              isi form dirangkai menjadi pesan lalu dibuka di WhatsApp atau aplikasi email Anda
              sendiri. Anda yang memutuskan apakah pesan itu dikirim.
            </p>
            <p>
              Website ini tidak memakai cookie pelacak iklan. Jika nanti kami menambahkan analitik,
              halaman ini akan diperbarui lebih dulu.
            </p>
            <p>
              Informasi yang Anda kirim lewat WhatsApp atau email, termasuk credential, file, dan
              data internal project, kami perlakukan sebagai informasi terbatas. Informasi itu hanya
              dipakai untuk mengerjakan kebutuhan Anda dan tidak dipublikasikan tanpa izin.
            </p>
            <p>
              Ingin data Anda dihapus dari percakapan atau arsip project kami? Kirim permintaan ke{" "}
              <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
