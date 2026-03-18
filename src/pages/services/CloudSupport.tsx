import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Cloud, ArrowLeft, Check, Server, Shield, Activity, Lock,
  Zap, ChevronDown, Star, Clock, ArrowRight, Users, HardDrive,
  Cpu, BarChart3, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceBreadcrumb } from "@/components/services/ServiceBreadcrumb";
import { RelatedServices } from "@/components/services/RelatedServices";

const features = [
  {
    icon: Server,
    title: "Cloud Hosting & VPS",
    description: "Setup hosting di AWS, GCP, DigitalOcean, atau Cloudflare Pages dengan konfigurasi optimal untuk setiap jenis aplikasi.",
    color: "hsl(212 89% 45%)"
  },
  {
    icon: Cpu,
    title: "Server Management",
    description: "Konfigurasi, hardening, update rutin, dan management server Linux/Ubuntu — Anda tidak perlu hands-on ke server.",
    color: "hsl(200 90% 50%)"
  },
  {
    icon: Activity,
    title: "Monitoring 24/7",
    description: "Uptime monitoring, alert CPU/RAM/disk, response time tracking, dan incident report langsung ke WhatsApp Anda.",
    color: "hsl(142 70% 45%)"
  },
  {
    icon: Lock,
    title: "Security Hardening",
    description: "Firewall setup (UFW/iptables), fail2ban, SSL/TLS auto-renew, zero-trust access, dan security audit berkala.",
    color: "hsl(0 84% 60%)"
  },
  {
    icon: RefreshCw,
    title: "Backup & Recovery",
    description: "Automated backup harian/mingguan ke offsite storage, plus disaster recovery plan yang terdokumentasi.",
    color: "hsl(265 75% 55%)"
  },
  {
    icon: BarChart3,
    title: "CI/CD & DevOps",
    description: "Setup pipeline deployment otomatis (GitHub Actions, GitLab CI) sehingga update aplikasi cepat dan aman.",
    color: "hsl(30 90% 55%)"
  },
];

const packages = [
  {
    name: "Basic Care",
    price: "Rp 500rb",
    period: "bulan",
    badge: null,
    description: "Untuk startup dan bisnis kecil dengan 1–2 server.",
    features: [
      "1 server managed",
      "Uptime monitoring",
      "SSL auto-renew",
      "Monthly security patch",
      "Respon tiket < 24 jam",
    ],
    cta: "Pilih Basic",
    highlight: false,
  },
  {
    name: "Pro Care",
    price: "Rp 1.5 Jt",
    period: "bulan",
    badge: "Paling Populer",
    description: "Untuk bisnis aktif yang butuh keandalan dan respon cepat.",
    features: [
      "Hingga 5 server managed",
      "Monitoring real-time + alert WA",
      "Daily backup otomatis",
      "Firewall & security hardening",
      "CI/CD pipeline setup",
      "Respon < 4 jam (jam kerja)",
    ],
    cta: "Pilih Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project-based",
    badge: null,
    description: "Infrastruktur enterprise dengan SLA ketat dan support prioritas.",
    features: [
      "Server unlimited",
      "24/7 NOC monitoring",
      "HA / Load balancing setup",
      "Disaster recovery tested",
      "Dedicated DevOps engineer",
      "SLA 99.9% uptime guarantee",
    ],
    cta: "Diskusi Kebutuhan",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Apakah saya harus punya server sendiri?",
    a: "Tidak harus. Kami bisa bantu sewa VPS/cloud server atas nama Anda di provider terbaik, atau manage server yang sudah Anda miliki."
  },
  {
    q: "Apa yang terjadi jika server down di tengah malam?",
    a: "Monitoring kami aktif 24/7. Jika ada anomali, sistem langsung alert dan tim kami bergerak sesuai SLA yang disepakati — bahkan di luar jam kerja untuk paket Enterprise."
  },
  {
    q: "Apakah data saya aman?",
    a: "Ya. Backup dienkripsi, akses server diproteksi SSH key (bukan password), dan semua aktivitas tercatat di audit log."
  },
  {
    q: "Bisa tidak kalau saya mau setup server dari nol?",
    a: "Tentu. Kami bisa handle mulai dari pemilihan provider, registrasi, konfigurasi OS, install stack aplikasi, hingga deploy pertama."
  },
  {
    q: "Bagaimana cara monitoring server saya sendiri?",
    a: "Kami pasang dashboard monitoring (Grafana/Uptime Kuma) yang bisa Anda akses kapan saja, plus alert otomatis ke WhatsApp jika ada masalah."
  },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Monitoring Aktif" },
  { value: "< 15 min", label: "Incident Response" },
  { value: "100+", label: "Server Dikelola" },
];

const CloudSupport = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Jasa Cloud Hosting & IT Support | Fusionify Digital"
        description="Managed server, VPS management, monitoring 24/7, SSL, CI/CD, dan IT support untuk infrastruktur digital bisnis Anda yang handal."
        path="/services/cloud-support"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px]"
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, hsl(200 90% 50% / 0.18) 0%, transparent 60%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ServiceBreadcrumb currentService="Cloud Support" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
                <Cloud className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Cloud & IT Support</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
                Server Handal, <span className="text-gradient">Bisnis Tenang</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Serahkan urusan server, hosting, dan infrastruktur IT kepada kami. Anda fokus ke bisnis, kami jaga sistem Anda tetap online 24/7.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2 group">
                    <Zap className="w-4 h-4" /> Mulai Sekarang
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline">Lihat Pricing</Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual: Server status mockup */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border/50">
                  <span className="text-sm font-semibold text-foreground">Server Status</span>
                  <span className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" /> All Systems Operational</span>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { name: "Web Server (Nginx)", status: 99.9, uptime: "45 days" },
                    { name: "Database (PostgreSQL)", status: 100, uptime: "45 days" },
                    { name: "API Service", status: 99.7, uptime: "12 days" },
                    { name: "CDN / Edge Cache", status: 100, uptime: "30 days" },
                  ].map((server, i) => (
                    <motion.div key={server.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${server.status >= 99.9 ? "bg-green-400" : "bg-yellow-400"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{server.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 rounded-full bg-border/50">
                            <motion.div className="h-full rounded-full bg-green-400" initial={{ width: 0 }} animate={{ width: `${server.status}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{server.status}%</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{server.uptime}</span>
                    </motion.div>
                  ))}
                </div>
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
              Layanan <span className="text-gradient">Cloud & IT</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Solusi infrastruktur lengkap agar bisnis Anda always-on</p>
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

      {/* Pricing */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Paket <span className="text-gradient">Managed Care</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Langganan bulanan yang lebih hemat dari hire IT staff sendiri.</p>
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
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Server Audit Gratis
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Kami cek kondisi server Anda — keamanan, performa, backup — dan berikan laporan lengkap gratis.
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

      <RelatedServices currentHref="/services/cloud-support" />
      <Footer />
    </div>
  );
};

export default CloudSupport;
