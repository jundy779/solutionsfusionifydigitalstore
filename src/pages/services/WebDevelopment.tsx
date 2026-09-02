import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Code2, ArrowLeft, Check, Smartphone, Globe, ShoppingCart, Layers,
  Zap, Shield, ChevronDown, Star, Clock, Rocket, Users, ArrowRight,
  MonitorSmartphone, Server, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceBreadcrumb } from "@/components/services/ServiceBreadcrumb";
import { ScrollIndicator } from "@/components/services/ScrollIndicator";
import { RelatedServices } from "@/components/services/RelatedServices";

const features = [
  {
    icon: Globe,
    title: "Landing Page & Company Profile",
    description: "Desain premium yang convert visitors menjadi leads, dengan animasi smooth dan SEO-optimized.",
    color: "hsl(212 89% 45%)"
  },
  {
    icon: MonitorSmartphone,
    title: "Mobile-First Design",
    description: "Responsive pixel-perfect di semua device — mobile, tablet, hingga 4K monitor.",
    color: "hsl(265 75% 55%)"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Toko online lengkap: payment gateway, manajemen stok, laporan penjualan, dan pengiriman otomatis.",
    color: "hsl(142 70% 45%)"
  },
  {
    icon: Layers,
    title: "Web Applications (SaaS)",
    description: "Dashboard, internal tools, SaaS platform, dan sistem manajemen yang kompleks.",
    color: "hsl(30 90% 55%)"
  },
  {
    icon: Server,
    title: "Backend & API Development",
    description: "REST API, GraphQL, microservices, dan integrasi database yang scalable.",
    color: "hsl(200 90% 50%)"
  },
  {
    icon: Lock,
    title: "Keamanan & Performa",
    description: "HTTPS, rate limiting, SQL injection protection, serta optimasi Core Web Vitals.",
    color: "hsl(0 84% 60%)"
  },
];

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "Vercel / VPS", category: "Deploy" },
];

const packages = [
  {
    name: "Starter",
    price: "Rp 3.5 Jt",
    period: "one-time",
    badge: null,
    description: "Cocok untuk UMKM dan bisnis yang baru go-digital.",
    features: [
      "Landing page 1–5 halaman",
      "Desain mobile-first",
      "Form kontak + WhatsApp CTA",
      "Basic SEO on-page",
      "Hosting setup (1 tahun)",
      "Revisi 3x",
    ],
    cta: "Pilih Starter",
    highlight: false,
  },
  {
    name: "Growth",
    price: "Rp 8 Jt",
    period: "one-time",
    badge: "Paling Populer",
    description: "Untuk bisnis yang butuh website profesional + sistem yang lebih lengkap.",
    features: [
      "Website 5–15 halaman",
      "Admin dashboard CMS",
      "Integrasi payment gateway",
      "Advanced SEO + JSON-LD",
      "Google Analytics 4",
      "Maintenance 3 bulan",
      "Revisi unlimited (30 hari)",
    ],
    cta: "Pilih Growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project-based",
    badge: null,
    description: "SaaS platform, web app kompleks, atau proyek enterprise berskala besar.",
    features: [
      "Semua fitur Growth",
      "Custom backend & API",
      "Multi-role user system",
      "Realtime features (WebSocket)",
      "Dedicated project manager",
      "SLA + priority support",
      "Maintenance & monitoring",
    ],
    cta: "Diskusi Kebutuhan",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Berapa lama waktu pengerjaan website?",
    a: "Tergantung kompleksitas. Landing page sederhana: 5–7 hari kerja. Website company profile: 2–3 minggu. Web app / SaaS: 1–3 bulan. Kami selalu menyepakati timeline di awal project."
  },
  {
    q: "Apakah saya bisa minta revisi setelah website jadi?",
    a: "Tentu! Paket Starter mendapat 3x revisi, paket Growth unlimited revisi selama 30 hari setelah launch. Setelah itu, revisi masuk ke paket maintenance."
  },
  {
    q: "Teknologi apa yang dipakai dan apakah bisa saya kelola sendiri?",
    a: "Kami memakai React/Next.js + Supabase/Node.js. Untuk website dengan CMS, kami buatkan admin dashboard yang user-friendly sehingga Anda bisa update konten sendiri tanpa coding."
  },
  {
    q: "Bagaimana dengan hosting dan domain?",
    a: "Bisa kami bantu setup (termasuk di paket). Kami rekomendasikan Vercel atau VPS untuk performa optimal. Domain didaftarkan atas nama Anda sendiri."
  },
  {
    q: "Apakah ada garansi setelah website selesai?",
    a: "Ya, ada garansi bug-fix 30 hari setelah launch. Jika ada error akibat kode kami, langsung kami perbaiki tanpa biaya tambahan."
  },
];

const stats = [
  { value: "50+", label: "Website Diluncurkan" },
  { value: "< 2s", label: "Load Time Target" },
  { value: "90+", label: "Lighthouse Score" },
  { value: "100%", label: "Mobile Responsive" },
];

const WebDevelopment = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Frontend", "Backend", "Deploy"];
  const filteredStack = activeCategory === "All"
    ? techStack
    : techStack.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Jasa Web Development Profesional | Fusionify Digital"
        description="Jasa pembuatan website & web app profesional: landing page, e-commerce, SaaS. React, Next.js, Supabase. SEO-friendly, mobile-first, cepat."
        path="/services/web-development"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px]"
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.18) 0%, transparent 60%)", filter: "blur(80px)" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ServiceBreadcrumb currentService="Web Development" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Web & App Development</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
                Website yang Menjual,<br />Bukan Hanya Tampil
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Kami bangun produk digital yang convert — dari landing page hingga SaaS platform — dengan teknologi modern, performa tinggi, dan desain yang memukau.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2 group">
                    <Zap className="w-4 h-4" /> Mulai Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/#contact">
                  <Button size="lg" variant="outline">Konsultasi Gratis</Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual: floating code mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/50">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                    <span className="ml-2 text-xs text-muted-foreground font-mono">App.tsx</span>
                  </div>
                  <div className="p-5 font-mono text-sm space-y-1">
                    {[
                      { indent: 0, code: <><span className="text-primary">export</span> <span className="text-accent">const</span> <span className="text-accent">App</span> = () =&gt; {"{"}</> },
                      { indent: 1, code: <><span className="text-primary">return</span> (</> },
                      { indent: 2, code: <><span className="text-primary">&lt;div</span> className=<span className="text-accent">"app"</span><span className="text-primary">&gt;</span></> },
                      { indent: 3, code: <><span className="text-primary">&lt;Hero</span> <span className="text-accent">animated</span> <span className="text-primary">/&gt;</span></> },
                      { indent: 3, code: <><span className="text-primary">&lt;Features</span> <span className="text-primary">/&gt;</span></> },
                      { indent: 3, code: <><span className="text-primary">&lt;CTA</span> <span className="text-accent">variant</span>=<span className="text-accent">"premium"</span> <span className="text-primary">/&gt;</span></> },
                      { indent: 2, code: <><span className="text-primary">&lt;/div&gt;</span></> },
                      { indent: 1, code: <>);</> },
                      { indent: 0, code: <>{"}"}</> },
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className="text-muted-foreground"
                        style={{ paddingLeft: `${line.indent * 16}px` }}
                      >
                        {line.code}
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 bg-card border border-primary/30 rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Rocket className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Ready to Launch</p>
                      <p className="text-xs text-muted-foreground">Production build siap</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <ScrollIndicator />
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
              Apa yang Kami Bangun
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Solusi web development lengkap dari frontend hingga backend</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all cursor-default"
              >
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

      {/* Tech Stack */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Tech Stack
            </h2>
            <p className="text-muted-foreground">Teknologi modern dan battle-tested yang kami gunakan</p>
          </motion.div>

          <div className="flex justify-center gap-2 flex-wrap mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "border-border/50 text-muted-foreground hover:border-primary/30"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="flex flex-wrap justify-center gap-3">
            <AnimatePresence>
              {filteredStack.map(t => (
                <motion.div
                  key={t.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background/80 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <span className="font-medium text-foreground">{t.name}</span>
                  <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full">{t.category}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Paket & Harga
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Harga transparan tanpa biaya tersembunyi. Semua bisa dikustomisasi sesuai kebutuhan.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-7 border transition-all flex flex-col ${pkg.highlight ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border/50 bg-card/50"}`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" /> {pkg.badge}
                    </span>
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
                  <Button className="w-full" variant={pkg.highlight ? "default" : "outline"}>
                    {pkg.cta}
                  </Button>
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
              Pertanyaan Umum
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border/50 bg-card/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-foreground pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border/30 pt-3">
                        {faq.a}
                      </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-10 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Siap Launch Website Impian Anda?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Konsultasi gratis 30 menit. Ceritakan project Anda dan kami bantu cari solusi terbaik.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg" className="gap-2 group">
                  <Zap className="w-4 h-4" /> Mulai Project Sekarang
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

      <RelatedServices currentHref="/services/web-development" />
      <Footer />
    </div>
  );
};

export default WebDevelopment;
