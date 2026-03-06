import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-10">
          Terakhir diperbarui: 13 Februari 2026
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Pendahuluan</h2>
            <p>
              PT Fusionify Digital Store ("Fusionify", "kami") menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda ketika Anda menggunakan situs web dan layanan kami di <strong>solutionsfusionifydigitalstore.lovable.app</strong> ("Situs").
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Informasi yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan informasi berikut:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Informasi kontak:</strong> nama, alamat email, nomor telepon yang Anda berikan melalui formulir kontak.</li>
              <li><strong>Data penggunaan:</strong> alamat IP, jenis browser, halaman yang dikunjungi, waktu akses, dan data analitik situs lainnya.</li>
              <li><strong>Cookies:</strong> data teknis untuk meningkatkan pengalaman browsing Anda.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Penggunaan Informasi</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Menanggapi pertanyaan dan permintaan layanan Anda.</li>
              <li>Meningkatkan kualitas situs dan layanan kami.</li>
              <li>Mengirimkan informasi terkait layanan yang Anda minta.</li>
              <li>Mematuhi kewajiban hukum yang berlaku.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Penyimpanan dan Keamanan Data</h2>
            <p>
              Kami menyimpan data pribadi Anda selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Berbagi Informasi</h2>
            <p>
              Kami <strong>tidak menjual</strong> informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan data Anda dalam situasi berikut:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Kepada penyedia layanan terpercaya yang membantu operasional kami (misalnya hosting, analitik).</li>
              <li>Jika diwajibkan oleh hukum atau peraturan yang berlaku di Indonesia.</li>
              <li>Untuk melindungi hak, keamanan, atau properti Fusionify dan pengguna kami.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Hak Anda</h2>
            <p>Sesuai dengan peraturan perlindungan data yang berlaku, Anda memiliki hak untuk:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Mengakses informasi pribadi yang kami simpan tentang Anda.</li>
              <li>Meminta perbaikan atas data yang tidak akurat.</li>
              <li>Meminta penghapusan data pribadi Anda.</li>
              <li>Menarik persetujuan atas pemrosesan data kapan saja.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Cookies</h2>
            <p>
              Situs kami menggunakan cookies untuk menganalisis lalu lintas dan meningkatkan pengalaman pengguna. Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda. Menonaktifkan cookies dapat mempengaruhi fungsionalitas tertentu pada situs kami.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Layanan Pihak Ketiga</h2>
            <p>
              Situs kami dapat menggunakan layanan pihak ketiga seperti Google Analytics, WhatsApp, dan platform hosting. Layanan-layanan tersebut memiliki kebijakan privasi sendiri yang kami sarankan untuk Anda tinjau.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Perubahan Kebijakan</h2>
            <p>
              Kami berhak memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan terbaru. Kami menyarankan Anda untuk meninjau kebijakan ini secara berkala.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui:
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
