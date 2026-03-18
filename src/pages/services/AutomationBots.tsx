import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Bot, ArrowLeft, Check, MessageCircle, Send, ShoppingBag, Bell,
  Zap, ChevronDown, Star, Clock, ArrowRight, Users, Cpu, Workflow,
  TrendingDown, MessageSquare, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceBreadcrumb } from "@/components/services/ServiceBreadcrumb";
import { RelatedServices } from "@/components/services/RelatedServices";

const problems = [
  { icon: MessageSquare, text: "CS kewalahan jawab pertanyaan yang sama berulang-ulang" },
  { icon: Clock, text: "Order masuk tengah malam tapi tidak ada yang proses" },
  { icon: TrendingDown, text: "Pelanggan tidak dapat update status pesanan secara real-time" },
  { icon: Settings, text: "Data pesanan dicatat manual, rawan salah & lambat" },
];

const features = [
  {
    icon: MessageCircle,
    title: "WhatsApp Bot",
    description: "Bot otomatis untuk auto-reply, order processing, broadcast promo, dan customer service 24/7 via WhatsApp API resmi.",
    color: "hsl(142 70% 45%)",
    badge: "Paling Diminati"
  },
  {
    icon: Send,
    title: "Telegram Bot",
    description: "Notifikasi real-time, workflow approval, laporan otomatis, dan integrasi dengan sistem internal lewat Telegram.",
    color: "hsl(212 89% 45%)",
    badge: null
  },
  {
    icon: ShoppingBag,
    title: "Auto Order System",
    description: "Sistem pemesanan terintegrasi: pelanggan order via chat → stok berkurang otomatis → konfirmasi dikirim → laporan diupdate.",
    color: "hsl(30 90% 55%)",
    badge: null
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Blast notifikasi ke ribuan pelanggan sekaligus — promo, reminder, update status — dengan segmentasi canggih.",
    color: "hsl(265 75% 55%)",
    badge: null
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Otomasi proses internal: approval request, task assignment, report generation, dan sinkronisasi data lintas platform.",
    color: "hsl(200 90% 50%)",
    badge: null
  },
  {
    icon: Cpu,
    title: "AI-Powered Chatbot",
    description: "Bot berbasis AI yang bisa menjawab pertanyaan kompleks, memahami konteks percakapan, dan belajar dari interaksi.",
    color: "hsl(0 84% 60%)",
    badge: "AI Powered"
  },
];

const packages = [
  {
    name: "Basic Bot",
    price: "Rp 1.5 Jt",
    period: "one-time",
    badge: null,
    description: "Bot sederhana untuk bisnis kecil dengan kebutuhan dasar.",
    features: [
      "1 platform (WA atau Telegram)",
      "Auto-reply FAQ (hingga 20 flow)",
      "Form order sederhana",
      "Notifikasi order masuk",
      "Setup + training 1 hari",
    ],
    cta: "Pilih Basic",
    highlight: false,
  },
  {
    name: "Business Bot",
    price: "Rp 4.5 Jt",
    period: "one-time",
    badge: "Paling Populer",
    description: "Bot lengkap dengan integrasi database dan sistem order.",
    features: [
      "2 platform (WA + Telegram)",
      "Flow kompleks unlimited",
      "Integrasi database produk",
      "Sistem order + konfirmasi otomatis",
      "Broadcast / blast message",
      "Dashboard admin monitoring",
      "Maintenance 2 bulan",
    ],
    cta: "Pilih Business",
    highlight: true,
  },
  {
    name: "AI Enterprise",
    price: "Custom",
    period: "project-based",
    badge: null,
    description: "Bot AI custom terintegrasi penuh dengan sistem existing.",
    features: [
      "Semua fitur Business",
      "AI / NLP untuk jawaban dinamis",
      "Integrasi ERP/CRM/payment",
      "Multi-agent handoff ke CS",
      "Analytics & reporting",
      "SLA support 24/7",
    ],
    cta: "Diskusi Kebutuhan",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Apakah bot WhatsApp ini resmi dan aman?",
    a: "Ya. Kami menggunakan WhatsApp Business API resmi dari provider terverifikasi. Bot tidak menggunakan cara ilegal yang bisa memblokir nomor Anda."
  },
  {
    q: "Berapa lama waktu pembuatan bot?",
    a: "Bot Basic bisa selesai dalam 3–5 hari kerja. Business Bot 1–2 minggu. Enterprise tergantung kompleksitas integrasi."
  },
  {
    q: "Bisakah bot dihubungkan dengan toko Shopee/Tokopedia saya?",
    a: "Bisa, untuk platform yang menyediakan API terbuka. Kami juga bisa integrasi dengan Google Sheets, WooCommerce, dan sistem custom Anda."
  },
  {
    q: "Bagaimana jika bot salah menjawab?",
    a: "Anda bisa update konten bot kapan saja via dashboard admin yang kami sediakan. Bot juga bisa diset untuk escalate ke CS manusia jika pertanyaan tidak dikenali."
  },
  {
    q: "Apakah ada biaya bulanan setelah selesai?",
    a: "Ada biaya API dari provider WhatsApp (umumnya Rp 200–500rb/bulan tergantung volume pesan). Kami bantu Anda hitung estimasi biaya operasional sebelum mulai."
  },
];

const stats = [
  { value: "24/7", label: "Bot Aktif" },
  { value: "< 1s", label: "Response Time" },
  { value: "80%", label: "Hemat Biaya CS" },
  { value: "∞", label: "Chat Bersamaan" },
];

const AutomationBots = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Jasa Pembuatan Bot WhatsApp & Telegram | Fusionify Digital"
        description="Bot otomatis WhatsApp & Telegram untuk bisnis: auto-reply, order system, broadcast, dan AI chatbot. Hemat biaya CS hingga 80%."
        path="/services/automation-bots"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px]"
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, hsl(265 75% 55% / 0.18) 0%, transparent 60%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ServiceBreadcrumb currentService="Automation Bots" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Automation Bots</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
                CS Tidur, Bot Tetap <span className="text-gradient">Kerja</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Otomasi WhatsApp & Telegram bisnis Anda agar bisa melayani pelanggan, proses order, dan broadcast promo — 24/7 tanpa perlu tambah staff.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2 group">
                    <Zap className="w-4 h-4" /> Buat Bot Sekarang
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline">Lihat Demo Bot</Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual: Chat mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl max-w-sm mx-auto">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-green-600/20 border-b border-border/50">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Fusionify Bot</p>
                    <p className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online</p>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-4 space-y-3 bg-card/50 min-h-[200px]">
                  {[
                    { from: "user", text: "Halo, mau pesan produk A" },
                    { from: "bot", text: "Halo! 👋 Produk A tersedia. Ukuran apa yang kamu mau?" },
                    { from: "user", text: "Size M, 2 pcs" },
                    { from: "bot", text: "✅ Order tercatat!\n• Produk A size M × 2\n• Total: Rp 150.000\n\nKirim bukti transfer ke rekening ini ya 👇" },
                  ].map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.2 }}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs whitespace-pre-line ${msg.from === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border/50 text-foreground rounded-bl-sm"}`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex justify-start">
                    <div className="flex gap-1 px-3 py-2">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0] }} transition={{ delay: d, duration: 0.6, repeat: Infinity }} />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-14 border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <p className="text-muted-foreground font-medium">Masalah yang kami selesaikan</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-destructive/20">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-4 h-4 text-destructive" />
                </div>
                <span className="text-muted-foreground text-sm pt-1">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Solusi <span className="text-gradient">Automation</span> Kami
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Berbagai jenis bot dan automasi untuk setiap kebutuhan bisnis</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all relative">
                {f.badge && <span className="absolute top-4 right-4 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">{f.badge}</span>}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${f.color}20` }}>
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Paket <span className="text-gradient">Bot</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Investasi sekali, bot aktif selamanya.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative rounded-2xl p-7 border flex flex-col ${pkg.highlight ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border/50 bg-card/50"}`}>
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"><Star className="w-3 h-3" /> {pkg.badge}</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display font-bold text-xl text-foreground mb-1">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                    <span className="text-muted-foreground text-sm mb-1">/ {pkg.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/#contact">
                  <Button className="w-full" variant={pkg.highlight ? "default" : "outline"}>{pkg.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Pertanyaan <span className="text-gradient">Umum</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="font-medium text-foreground pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border/30 pt-3">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center p-10 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Bot className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Coba Bot Gratis 7 Hari
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Kami demo-kan bot langsung di nomor WhatsApp bisnis Anda. Tanpa biaya, tanpa komitmen.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg" className="gap-2 group">
                  <Zap className="w-4 h-4" /> Minta Demo Gratis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://wa.me/6285641234567" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <Users className="w-4 h-4" /> WhatsApp Langsung
                </Button>
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" /> Respon dalam 2 jam di jam kerja
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutomationBots;
