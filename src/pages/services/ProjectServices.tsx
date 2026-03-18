import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Briefcase, ArrowLeft, Check, Lightbulb, Search, GraduationCap, Rocket,
  Zap, ChevronDown, Star, Clock, ArrowRight, Users, Target, TrendingUp,
  FileText, HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceBreadcrumb } from "@/components/services/ServiceBreadcrumb";
import { RelatedServices } from "@/components/services/RelatedServices";

const features = [
  {
    icon: Rocket,
    title: "MVP Development",
    description: "Bangun Minimum Viable Product dalam 4–8 minggu untuk validasi ide bisnis sebelum investasi besar.",
    color: "hsl(30 90% 55%)"
  },
  {
    icon: Search,
    title: "System Audit & Review",
    description: "Analisis mendalam sistem IT existing — performa, keamanan, skalabilitas — dengan laporan rekomendasi detail.",
    color: "hsl(212 89% 45%)"
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "Konsultasi strategi teknologi untuk transformasi digital: pilih stack, vendor, arsitektur, dan roadmap.",
    color: "hsl(265 75% 55%)"
  },
  {
    icon: GraduationCap,
    title: "Training & Workshop",
    description: "Pelatihan teknis hands-on untuk tim Anda: penggunaan sistem baru, best practices, dan knowledge transfer.",
    color: "hsl(142 70% 45%)"
  },
  {
    icon: TrendingUp,
    title: "Digital Transformation",
    description: "Panduan end-to-end untuk go-digital: dari audit proses manual hingga implementasi sistem digital yang efisien.",
    color: "hsl(200 90% 50%)"
  },
  {
    icon: FileText,
    title: "Technical Documentation",
    description: "Pembuatan SRS, arsitektur dokumen, API docs, dan runbook untuk tim internal maupun kebutuhan investor.",
    color: "hsl(0 84% 60%)"
  },
];

const processSteps = [
  {
    step: "01",
    icon: Search,
    title: "Discovery",
    description: "Memahami kebutuhan bisnis, pain points, goals, dan constraint project melalui sesi diskusi mendalam."
  },
  {
    step: "02",
    icon: FileText,
    title: "Planning",
    description: "Merancang solusi teknis, scope of work, timeline detail, dan estimasi biaya yang transparan."
  },
  {
    step: "03",
    icon: Zap,
    title: "Execution",
    description: "Implementasi dengan metodologi agile, sprint mingguan, dan update progress rutin."
  },
  {
    step: "04",
    icon: HeartHandshake,
    title: "Handover",
    description: "Deployment, UAT, dokumentasi lengkap, training tim, dan support post-launch."
  },
];

const packages = [
  {
    name: "Consulting Day",
    price: "Rp 1.5 Jt",
    period: "hari",
    badge: null,
    description: "Sesi konsultasi intensif untuk satu topik spesifik.",
    features: [
      "8 jam sesi konsultasi",
      "Analisis masalah & solusi",
      "Rekomendasi tertulis",
      "Q&A tidak terbatas",
      "Follow-up 1 minggu",
    ],
    cta: "Book Session",
    highlight: false,
  },
  {
    name: "Project-Based",
    price: "Rp 10 Jt",
    period: "mulai dari",
    badge: "Paling Fleksibel",
    description: "Engagement penuh untuk satu project spesifik dengan deliverable jelas.",
    features: [
      "Scope of work detail",
      "Dedicated project manager",
      "Weekly progress report",
      "Unlimited revisi (in-scope)",
      "Dokumentasi lengkap",
      "Training & handover",
      "Support 30 hari post-launch",
    ],
    cta: "Diskusi Project",
    highlight: true,
  },
  {
    name: "Retainer",
    price: "Rp 5 Jt",
    period: "bulan",
    badge: null,
    description: "IT partner tetap untuk bisnis yang butuh bantuan teknis berkelanjutan.",
    features: [
      "40 jam/bulan dedicated",
      "Priority response",
      "Monthly strategy review",
      "Ad-hoc consulting",
      "System monitoring",
      "Rollover jam (maks 20 jam)",
    ],
    cta: "Pilih Retainer",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Bedanya consulting dengan jasa development biasa?",
    a: "Consulting lebih fokus pada strategi, analisis, dan rekomendasi — bukan hanya eksekusi. Kami membantu Anda membuat keputusan teknis yang tepat sebelum investasi besar, sehingga menghindari costly mistakes."
  },
  {
    q: "Apakah ada minimum project size?",
    a: "Tidak. Dari Consulting Day (1 hari) hingga project enterprise yang berlangsung berbulan-bulan — semua kami layani. Yang penting ada kebutuhan nyata yang bisa kami bantu."
  },
  {
    q: "Bagaimana proses pembayaran untuk project besar?",
    a: "Biasanya 30% DP di awal, 40% di tengah milestone, dan 30% setelah selesai. Untuk project dengan SLA, bisa diatur sesuai kesepakatan."
  },
  {
    q: "Apakah ada NDA untuk project rahasia?",
    a: "Ya, kami selalu menandatangani NDA sebelum memulai project. Semua informasi bisnis Anda aman dan tidak dibagikan ke pihak manapun."
  },
  {
    q: "Bisa tidak kalau project urgent dan butuh cepat?",
    a: "Bisa, dengan biaya rush fee. Hubungi kami dan jelaskan deadline Anda — kami akan cari solusi terbaik."
  },
];

const stats = [
  { value: "30+", label: "Project Selesai" },
  { value: "100%", label: "Client Puas" },
  { value: "< 1 hari", label: "Response Proposal" },
  { value: "5 tahun", label: "Pengalaman" },
];

const ProjectServices = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Jasa Konsultasi IT & Project Services | Fusionify Digital"
        description="Konsultasi IT, MVP development, system audit, training teknologi, dan digital transformation. Partner teknis untuk bisnis Indonesia."
        path="/services/project-services"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px]"
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, hsl(30 90% 50% / 0.18) 0%, transparent 60%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ServiceBreadcrumb currentService="Project Services" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Project-Based Services</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
                IT Partner yang <span className="text-gradient">Bicara Bisnis</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Bukan hanya vendor teknologi — kami jadi partner strategis yang memahami bisnis Anda, lalu merancang solusi teknis yang benar-benar impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2 group">
                    <Zap className="w-4 h-4" /> Diskusi Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline">Request Proposal</Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual: Process preview */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="space-y-3">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary">{step.step}</span>
                        <span className="font-semibold text-sm text-foreground">{step.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{step.description}</p>
                    </div>
                    {i < processSteps.length - 1 && (
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-primary/40 flex-shrink-0" />
                    )}
                    {i === processSteps.length - 1 && (
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    )}
                  </motion.div>
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
              Layanan <span className="text-gradient">Project</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Dari konsultasi hingga eksekusi — kami handle semuanya</p>
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

      {/* Process */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                Cara <span className="text-gradient">Kerja</span> Kami
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">Metodologi teruji yang memastikan project selesai tepat waktu dan sesuai ekspektasi</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary/10 absolute -top-2 left-1/2 -translate-x-1/2 select-none">{item.step}</div>
                <h4 className="font-semibold text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(100%-12px)] w-8 h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
                )}
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
              Model <span className="text-gradient">Engagement</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Pilih cara kerja sama yang paling sesuai dengan kebutuhan Anda.</p>
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
              <HeartHandshake className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Ceritakan Project Anda
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Kami dengarkan dulu, baru rekomendasikan solusi. Tidak ada hard-sell — hanya diskusi yang produktif.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg" className="gap-2 group">
                  <Zap className="w-4 h-4" /> Mulai Diskusi
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

      <RelatedServices currentHref="/services/project-services" />
      <Footer />
    </div>
  );
};

export default ProjectServices;
