import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Database, Users, FileText, Trash2, AlertCircle, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";

const sections = [
  {
    icon: Shield,
    title: "Prinsip dasar kami",
    body: (
      <>
        <p>
          Kami tim kecil yang jujur soal kapasitas. Halaman ini menjelaskan cara kami menangani data pelanggan
          dengan bahasa yang bisa dipahami — tanpa klaim sertifikasi besar yang tidak kami miliki.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mt-3">
          <li>Kami hanya menyimpan data yang benar-benar dibutuhkan.</li>
          <li>Kami tidak menjual data Anda ke pihak ketiga.</li>
          <li>Kami tidak mengklaim sertifikasi ISO/SOC 2/HIPAA yang tidak kami miliki.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Database,
    title: "Data apa saja yang kami simpan",
    body: (
      <>
        <p>Untuk keperluan operasional dan komunikasi project, kami biasanya menyimpan:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-3">
          <li><strong>Data kontak:</strong> nama, nomor WhatsApp, email — untuk komunikasi project.</li>
          <li><strong>Data project:</strong> brief, aset (logo, foto, teks), kredensial sementara yang Anda kirim.</li>
          <li><strong>Data teknis situs:</strong> log akses standar dari hosting untuk troubleshooting.</li>
        </ul>
        <p className="mt-3">
          Data pengunjung website Anda (jika ada form) disimpan di database milik Anda, bukan milik kami.
        </p>
      </>
    ),
  },
  {
    icon: Lock,
    title: "Bagaimana kami mengamankan data",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Koneksi selalu lewat HTTPS/TLS untuk semua situs yang kami buat.</li>
          <li>Password dan API key disimpan di secret manager, bukan di file kode atau chat.</li>
          <li>Akses ke database dan hosting dibatasi hanya untuk anggota tim yang mengerjakan project Anda.</li>
          <li>Kami mendorong penggunaan Row Level Security (RLS) di database untuk memisahkan data antar pengguna.</li>
        </ul>
        <p className="mt-3 text-xs italic">
          Catatan jujur: tidak ada sistem yang 100% aman. Kami menerapkan praktik standar industri, bukan garansi absolut.
        </p>
      </>
    ),
  },
  {
    icon: Users,
    title: "Siapa yang bisa mengakses data Anda",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Anggota tim Fusionify yang mengerjakan project Anda.</li>
          <li>Penyedia layanan pihak ketiga yang kami gunakan untuk delivery (hosting, email, WhatsApp API, analitik). Mereka punya kebijakan privasi masing-masing.</li>
          <li>Pihak berwenang, hanya jika diwajibkan oleh hukum Indonesia yang berlaku.</li>
        </ul>
        <p className="mt-3">
          Kami <strong>tidak</strong> menjual, menyewakan, atau membagikan data Anda untuk keperluan iklan.
        </p>
      </>
    ),
  },
  {
    icon: FileText,
    title: "Kepemilikan data & aset",
    body: (
      <p>
        Setelah handover project, <strong>semua aset — domain, hosting, source code, database, akun WhatsApp Business, dan kredensial — menjadi milik Anda 100%.</strong>
        Kami tidak mengunci Anda ke platform kami. Anda bebas pindah tim kapan saja.
      </p>
    ),
  },
  {
    icon: Trash2,
    title: "Retensi & penghapusan data",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Data project aktif disimpan selama project berjalan + 6 bulan pasca handover (untuk keperluan garansi bug).</li>
          <li>Setelah itu, aset kerja internal (draft, backup lokal) kami hapus, kecuali Anda meminta disimpan lebih lama.</li>
          <li>Anda bisa meminta penghapusan data kontak kami kapan saja via email.</li>
        </ul>
      </>
    ),
  },
  {
    icon: AlertCircle,
    title: "Kalau terjadi insiden",
    body: (
      <p>
        Jika ada insiden keamanan yang berdampak pada data Anda, kami akan menghubungi Anda melalui WhatsApp/email
        secepat mungkin (target: dalam 72 jam sejak kami mengetahui), menjelaskan apa yang terjadi, data apa yang terdampak,
        dan langkah yang kami ambil. Kami tidak akan menutup-nutupi.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Hubungi kami soal data",
    body: (
      <>
        <p>Untuk pertanyaan, permintaan akses, koreksi, atau penghapusan data:</p>
        <ul className="list-disc pl-5 space-y-1.5 mt-3">
          <li><strong>Email:</strong> fusionifydigital@gmail.com</li>
          <li><strong>WhatsApp:</strong> +62 851-5575-7325</li>
        </ul>
        <p className="mt-3 text-sm">
          Lihat juga <Link to="/privacy-policy" className="text-primary hover:underline">Kebijakan Privasi</Link> untuk versi legal formalnya.
        </p>
      </>
    ),
  },
];

export default function KeamananData() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Keamanan & Data | Fusionify Digital Solutions"
        description="Cara Fusionify menangani data pelanggan secara jujur: data yang kami simpan, cara mengamankannya, siapa yang bisa mengakses, retensi, dan kepemilikan penuh setelah handover."
        path="/keamanan-data"
      />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
          Keamanan & Data
        </h1>
        <p className="text-muted-foreground text-base mb-12 leading-relaxed">
          Cara kami menangani data pelanggan — ditulis dengan bahasa sederhana, tanpa klaim berlebihan.
          Halaman ini adalah ringkasan praktik operasional kami; untuk versi legal, lihat Kebijakan Privasi.
        </p>

        <div className="space-y-5">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <section
                key={i}
                className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur p-6 md:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-semibold text-lg text-foreground mb-3">
                      {s.title}
                    </h2>
                    <div className="text-muted-foreground text-sm leading-relaxed space-y-2">
                      {s.body}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-10 italic">
          Halaman ini dikelola oleh tim Fusionify Digital Solutions dan mencerminkan praktik operasional kami saat ini.
          Ini bukan pernyataan sertifikasi independen. Kami akan memperbarui halaman ini jika praktik kami berubah.
        </p>
      </main>
      <Footer />
    </div>
  );
}
