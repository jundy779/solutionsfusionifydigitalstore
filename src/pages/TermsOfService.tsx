import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Terakhir diperbarui: 13 Februari 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Ketentuan Umum</h2>
            <p>
              Dengan mengakses dan menggunakan situs web <strong>solutionsfusionifydigitalstore.lovable.app</strong> ("Situs") yang dikelola oleh PT Fusionify Digital Store ("Fusionify", "kami"), Anda menyetujui untuk terikat dengan Syarat dan Ketentuan ini. Jika Anda tidak menyetujui ketentuan ini, harap tidak menggunakan Situs kami.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Deskripsi Layanan</h2>
            <p>
              Fusionify Digital Solutions menyediakan layanan transformasi digital yang mencakup namun tidak terbatas pada:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Pengembangan web dan aplikasi</li>
              <li>Automation bots dan integrasi sistem</li>
              <li>Sistem digital untuk operasional bisnis</li>
              <li>Cloud & IT Solutions</li>
              <li>Manajemen proyek dan konsultasi digital</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Hak Kekayaan Intelektual</h2>
            <p>
              Seluruh konten di Situs ini, termasuk namun tidak terbatas pada teks, grafis, logo, ikon, gambar, desain, dan perangkat lunak, adalah milik Fusionify atau pemberi lisensi kami dan dilindungi oleh hukum hak cipta dan kekayaan intelektual yang berlaku di Indonesia.
            </p>
            <p className="mt-2">
              Anda tidak diperkenankan untuk menyalin, memodifikasi, mendistribusikan, atau menggunakan konten Situs tanpa izin tertulis dari kami.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Penggunaan yang Diperbolehkan</h2>
            <p>Anda setuju untuk menggunakan Situs ini hanya untuk tujuan yang sah dan tidak akan:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Menggunakan Situs dengan cara yang melanggar hukum atau peraturan yang berlaku.</li>
              <li>Mencoba mengakses sistem, data, atau area Situs yang tidak diizinkan.</li>
              <li>Mengirimkan konten berbahaya, virus, atau kode yang dapat merusak Situs.</li>
              <li>Menggunakan Situs untuk mengirim spam atau komunikasi yang tidak diminta.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Perjanjian Layanan</h2>
            <p>
              Layanan spesifik yang diberikan oleh Fusionify akan diatur dalam perjanjian terpisah antara Fusionify dan klien. Syarat dan Ketentuan ini mengatur penggunaan Situs secara umum dan bukan merupakan perjanjian layanan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Batasan Tanggung Jawab</h2>
            <p>
              Situs dan kontennya disediakan "sebagaimana adanya" tanpa jaminan dalam bentuk apa pun, baik tersurat maupun tersirat. Fusionify tidak bertanggung jawab atas:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Kerugian langsung atau tidak langsung yang timbul dari penggunaan Situs.</li>
              <li>Ketidakakuratan atau ketidaklengkapan informasi di Situs.</li>
              <li>Gangguan atau ketidaktersediaan Situs karena alasan teknis.</li>
              <li>Tindakan pihak ketiga yang terkait dengan penggunaan Situs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Tautan Pihak Ketiga</h2>
            <p>
              Situs kami dapat berisi tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs web pihak ketiga tersebut. Penggunaan situs pihak ketiga sepenuhnya menjadi risiko Anda.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Ganti Rugi</h2>
            <p>
              Anda setuju untuk membebaskan dan melindungi Fusionify, karyawan, direksi, dan afiliasinya dari segala klaim, tuntutan, kerugian, atau biaya yang timbul akibat pelanggaran Anda terhadap Syarat dan Ketentuan ini atau penggunaan Situs yang tidak sah.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Hukum yang Berlaku</h2>
            <p>
              Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan melalui musyawarah terlebih dahulu, dan apabila tidak tercapai kesepakatan, akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Perubahan Ketentuan</h2>
            <p>
              Kami berhak untuk mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di Situs ini. Penggunaan Situs secara berkelanjutan setelah perubahan dianggap sebagai penerimaan Anda terhadap ketentuan yang diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami melalui:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Email:</strong> fusionifydigital@gmail.com</li>
              <li><strong>WhatsApp:</strong> +62 851-5575-7325</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
