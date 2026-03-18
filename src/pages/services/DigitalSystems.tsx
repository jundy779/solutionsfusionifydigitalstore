import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Settings2, ArrowLeft, Check, Plug, CreditCard, Database, GitBranch,
  Zap, ChevronDown, Star, Clock, ArrowRight, Users, Link2, RefreshCw,
  BarChart3, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceBreadcrumb } from "@/components/services/ServiceBreadcrumb";
import { RelatedServices } from "@/components/services/RelatedServices";

const features = [
  {
    icon: Plug,
    title: "API Integration",
    description: "Hubungkan sistem bisnis Anda dengan third-party APIs: marketplace, logistik, akuntansi, CRM, dan ratusan platform lainnya.",
    color: "hsl(212 89% 45%)"
  },
  {
    icon: CreditCard,
    title: "Payment Gateway",
    description: "Integrasi Midtrans, Xendit, DOKU, Stripe — termasuk VA, QRIS, kartu kredit, dan cicilan tanpa kartu.",
    color: "hsl(142 70% 45%)"
  },
  {
    icon: Database,
    title: "CRM Systems",
    description: "Setup & custom HubSpot, Salesforce, Zoho, atau bangun CRM internal sesuai alur bisnis spesifik Anda.",
    color: "hsl(265 75% 55%)"
  },
  {
    icon: GitBranch,
    title: "ERP Integration",
    description: "Integrasikan Odoo, ERPNext, SAP, atau Microsoft 365 dengan sistem yang sudah berjalan.",
    color: "hsl(30 90% 55%)"
  },
  {
    icon: RefreshCw,
    title: "Data Synchronization",
    description: "Sinkronisasi data real-time antar platform — stok, order, customer data — tanpa input manual.",
    color: "hsl(200 90% 50%)"
  },
  {
    icon: BarChart3,
    title: "Unified Dashboard",
    description: "Dashboard terpusat yang menampilkan data dari semua sistem dalam satu tampilan — untuk keputusan bisnis yang lebih cepat.",
    color: "hsl(0 84% 60%)"
  },
];

const integrationCategories = [
  {
    title: "Payment",
    items: ["Midtrans", "Xendit", "DOKU", "Stripe", "PayPal"]
  },
  {
    title: "CRM",
    items: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive"]
  },
  {
    title: "ERP",
    items: ["SAP", "Odoo", "ERPNext", "QuickBooks"]
  },
  {
    title: "Productivity",
    items: ["Google Workspace", "Microsoft 365", "Slack", "Notion"]
  },
  {
    title: "Marketplace",
    items: ["Tokopedia", "Shopee", "Lazada", "WooCommerce"]
  },
  {
    title: "Logistik",
    items: ["JNE", "J&T", "SiCepat", "Shipper API"]
  },
];

const packages = [
  {
    name: "Single Integration",
    price: "Rp 2 Jt",
    period: "per integrasi",
    badge: null,
    description: "Menghubungkan dua sistem spesifik yang Anda butuhkan.",
    features: [
      "1 integrasi API dua arah",
      "Data mapping & transform",
      "Error handling & logging",
      "Dokumentasi teknis",
      "Testing & QA",
    ],
    cta: "Pilih Paket Ini",
    highlight: false,
  },
  {
    name: "System Bundle",
    price: "Rp 7.5 Jt",
    period: "one-time",
    badge: "Best Value",
    description: "Paket lengkap untuk bisnis yang butuh beberapa integrasi sekaligus.",
    features: [
      "Hingga 5 integrasi",
      "Webhook & realtime sync",
      "Dashboard monitoring",
      "Error alert + auto-retry",
      "Admin panel management",
      "Maintenance 3 bulan",
    ],
    cta: "Pilih Bundle",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project-based",
    badge: null,
    description: "Integrasi kompleks skala enterprise dengan SLA dan dedicated support.",
    features: [
      "Integrasi unlimited",
      "Custom middleware/ESB",
      "Audit trail lengkap",
      "High availability setup",
      "Dedicated DevOps",
      "SLA + priority support 24/7",
    ],
    cta: "Diskusi Kebutuhan",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Apa bedanya API integration dengan integrasi manual?",
    a: "Integrasi manual artinya Anda atau tim input data berulang di beberapa sistem secara manual — rawan error dan lambat. API integration menghubungkan sistem secara otomatis sehingga data mengalir real-time tanpa campur tangan manusia."
  },
  {
    q: "Apakah bisa integrasi dengan sistem lama (legacy)?",
    a: "Bisa. Bahkan untuk sistem yang tidak punya API, kami bisa menggunakan teknik seperti RPA (Robotic Process Automation) atau custom connector untuk menghubungkannya."
  },
  {
    q: "Berapa lama proses integrasi?",
    a: "Single API sederhana bisa 3–5 hari. Integrasi kompleks dengan multiple sistem bisa 2–6 minggu. Kami selalu estimate di awal setelah requirement gathering."
  },
  {
    q: "Bagaimana keamanan data selama integrasi?",
    a: "Kami menerapkan OAuth 2.0, enkripsi data in-transit (HTTPS/TLS), API key management yang aman, dan audit log untuk semua aktivitas integrasi."
  },
  {
    q: "Apakah bisa saya monitor integrasi sendiri?",
    a: "Ya! Kami sediakan dashboard monitoring yang mudah digunakan — Anda bisa lihat status sinkronisasi, jumlah transaksi, dan error log kapan saja."
  },
];

const stats = [
  { value: "100+", label: "Integrasi Selesai" },
  { value: "Real-time", label: "Sync Data" },
  { value: "99.9%", label: "Uptime" },
  { value: "0", label: "Input Manual" },
];

const DigitalSystems = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Jasa Integrasi Sistem Digital & API | Fusionify Digital"
        description="Integrasi API, payment gateway (Midtrans/Xendit), CRM, ERP, dan sinkronisasi data real-time. Eliminasi input manual dalam bisnis Anda."
        path="/services/digital-systems"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px]"
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, hsl(142 70% 45% / 0.18) 0%, transparent 60%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ServiceBreadcrumb currentService="Digital Systems" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
                <Settings2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Digital Systems & API</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
                Semua Sistem <span className="text-gradient">Terhubung</span>,<br />Zero Input Manual
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Kami integrasikan semua tools bisnis Anda — marketplace, payment, CRM, ERP — sehingga data mengalir otomatis dan tim Anda fokus pada hal yang bernilai.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2 group">
                    <Zap className="w-4 h-4" /> Mulai Integrasi
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline">Konsultasi Gratis</Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual: Connection diagram */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="relative flex items-center justify-center h-64">
                {/* Center node */}
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute z-10 w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Link2 className="w-7 h-7 text-primary" />
                </motion.div>
                {/* Orbiting nodes */}
                {[
                  { label: "Tokopedia", angle: 0, color: "hsl(142 70% 45%)" },
                  { label: "Midtrans", angle: 60, color: "hsl(212 89% 45%)" },
                  { label: "HubSpot", angle: 120, color: "hsl(30 90% 55%)" },
                  { label: "Odoo ERP", angle: 180, color: "hsl(265 75% 55%)" },
                  { label: "Google WS", angle: 240, color: "hsl(200 90% 50%)" },
                  { label: "WhatsApp", angle: 300, color: "hsl(142 70% 55%)" },
                ].map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 110;
                  const y = Math.sin(rad) * 90;
                  return (
                    <motion.div
                      key={node.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                      style={{ position: "absolute", left: `calc(50% + ${x}px - 36px)`, top: `calc(50% + ${y}px - 18px)` }}
                    >
                      <div className="px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: `${node.color}40`, backgroundColor: `${node.color}15`, color: node.color }}>
                        {node.label}
                      </div>
                    </motion.div>
                  );
                })}
                {/* Animated rings */}
                {[1, 1.5].map((scale, i) => (
                  <motion.div key={i} className="absolute rounded-full border border-primary/10" style={{ width: 220 * scale, height: 180 * scale }} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, delay: i * 1, repeat: Infinity }} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/50">
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
              Layanan <span className="text-gradient">Integrasi</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Semua yang Anda butuhkan untuk sistem bisnis yang terhubung sempurna</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all">
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

      {/* Integration Grid */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Platform yang <span className="text-gradient">Didukung</span>
            </h2>
            <p className="text-muted-foreground">Berpengalaman mengintegrasikan 30+ platform populer di Indonesia dan global</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {integrationCategories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="p-4 rounded-xl bg-background/50 border border-border/50">
                <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">{cat.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map(item => (
                    <span key={item} className="text-xs px-2 py-1 rounded-md bg-card border border-border/50 text-muted-foreground">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Paket & <span className="text-gradient">Harga</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Pilih paket yang sesuai dengan jumlah integrasi yang Anda butuhkan.</p>
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
      <section className="py-20 bg-card/30">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center p-10 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Audit Sistem Gratis
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Kami analisis sistem Anda yang sekarang, identifikasi bottleneck, dan rekomendasikan integrasi yang paling berdampak.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg" className="gap-2 group">
                  <Zap className="w-4 h-4" /> Minta Audit Gratis
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

      <RelatedServices currentHref="/services/digital-systems" />
      <Footer />
    </div>
  );
};

export default DigitalSystems;
