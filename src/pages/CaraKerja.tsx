import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, ClipboardList, Hammer, Eye, PackageCheck, LifeBuoy } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const WA_URL = "https://wa.me/6285155757325?text=Halo%20Fusionify%2C%20saya%20ingin%20diskusi%20project";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Kontak via WhatsApp",
    desc: "Ceritakan masalah operasional atau kebutuhan digital Anda dalam bahasa sehari-hari. Tidak perlu tahu istilah teknis. Kami balas dalam 1×24 jam kerja.",
    aligned: "Selaras dengan: Hero & Pain Points di beranda.",
  },
  {
    icon: ClipboardList,
    title: "2. Diskusi scope & estimasi",
    desc: "Kami bantu memetakan kebutuhan menjadi scope yang jelas: apa yang dikerjakan, apa yang tidak, berapa lama, dan estimasi biaya. Tidak ada scope karet.",
    aligned: "Selaras dengan: Layanan berbasis use case & Paket inti.",
  },
  {
    icon: Hammer,
    title: "3. Pengerjaan bertahap",
    desc: "Kami kerjakan sesuai scope yang disepakati. Progres dilaporkan secara berkala lewat WhatsApp. Anda tetap update tanpa perlu tools tambahan.",
    aligned: "Selaras dengan: Portofolio (bukti kerja nyata).",
  },
  {
    icon: Eye,
    title: "4. Review & revisi",
    desc: "Anda cek hasil kerja di staging. Revisi dalam scope sudah termasuk. Kalau ada perubahan besar di luar scope, kami diskusikan dampaknya ke waktu dan biaya secara transparan.",
    aligned: "Selaras dengan: Cara Kerja / Ekosistem.",
  },
  {
    icon: PackageCheck,
    title: "5. Handover kepemilikan",
    desc: "Website, domain, hosting, dan akses WhatsApp 100% milik Anda. Kami serahkan semua kredensial dan panduan penggunaan sederhana.",
    aligned: "Selaras dengan: Alasan Percaya (kepemilikan penuh).",
  },
  {
    icon: LifeBuoy,
    title: "6. Garansi & maintenance",
    desc: "Garansi 30 hari untuk bug dari sisi kami. Maintenance bulanan opsional untuk update, backup, dan monitoring — hanya kalau Anda mau.",
    aligned: "Selaras dengan: FAQ & CTA WhatsApp.",
  },
];

export default function CaraKerja() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cara Kerja Fusionify | Dari WhatsApp Sampai Handover"
        description="Alur kerja Fusionify Digital Solutions: dari kontak WhatsApp, diskusi scope, pengerjaan, review, handover, hingga garansi. Sederhana, transparan, tanpa jargon."
        path="/cara-kerja"
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
          Cara Kerja Kami
        </h1>
        <p className="text-muted-foreground text-base mb-12 leading-relaxed">
          Enam langkah sederhana dari pesan WhatsApp pertama sampai website atau sistem Anda siap dipakai.
          Tidak ada meeting berlapis, tidak ada dokumen 40 halaman. Urutan ini juga mencerminkan alur cerita di beranda.
        </p>

        <div className="space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur p-6 md:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-semibold text-lg text-foreground mb-2">
                      {step.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {step.desc}
                    </p>
                    <p className="text-xs text-muted-foreground/70 italic">
                      {step.aligned}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 text-center">
          <h3 className="font-display font-semibold text-xl text-foreground mb-2">
            Siap mulai dari langkah 1?
          </h3>
          <p className="text-muted-foreground text-sm mb-5">
            Kirim pesan WhatsApp. Cerita masalah Anda, kami bantu petakan.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full px-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat WhatsApp Sekarang
            </Button>
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-10">
          Catatan jujur: kami tim kecil. Kami tidak mengambil project yang butuh kepatuhan berat (ISO, SOC 2), SLA 24/7, atau delivery skala enterprise.
        </p>
      </main>
      <Footer />
    </div>
  );
}
