import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, TrendingUp, Layers, ShoppingCart, Code2, Wrench } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const formatIDR = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const tiers = [
  {
    icon: Layers,
    name: "Landing Page",
    range: [3_000_000, 12_000_000],
    timeline: "1 – 3 minggu",
    bestFor: "UMKM, kampanye produk, peluncuran startup, profil singkat.",
    includes: [
      "Desain custom 1 – 5 section",
      "Responsif mobile & desktop",
      "Form kontak / WhatsApp integration",
      "SEO on-page dasar",
      "Hosting & domain tahun pertama",
    ],
  },
  {
    icon: ShoppingCart,
    name: "Website E-Commerce",
    range: [15_000_000, 60_000_000],
    timeline: "4 – 10 minggu",
    bestFor: "Toko online, brand fashion, F&B, marketplace produk fisik/digital.",
    includes: [
      "Katalog produk & manajemen stok",
      "Payment gateway (Midtrans / Xendit)",
      "Integrasi ekspedisi & ongkir",
      "Dashboard admin & laporan penjualan",
      "Multi-kategori, kupon, dan promo",
    ],
  },
  {
    icon: Code2,
    name: "Custom Web Application",
    range: [40_000_000, 250_000_000],
    timeline: "8 minggu – 6 bulan",
    bestFor: "SaaS, sistem internal perusahaan, ERP, dashboard data, portal klien.",
    includes: [
      "Arsitektur backend khusus & API",
      "Role-based access control",
      "Integrasi sistem pihak ketiga",
      "Automation & workflow engine",
      "Maintenance, monitoring & SLA",
    ],
  },
];

const costFactors = [
  {
    title: "Kompleksitas Fitur",
    desc: "Semakin banyak modul (booking, pembayaran, multi-bahasa, dashboard), semakin tinggi effort engineering yang dibutuhkan.",
  },
  {
    title: "Kualitas Desain UI/UX",
    desc: "Desain template siap pakai jauh lebih murah dibanding custom design dengan riset user dan motion design premium.",
  },
  {
    title: "Teknologi & Stack",
    desc: "WordPress / no-code biasanya lebih ekonomis di awal, sementara React/Next.js custom memberi performa & skalabilitas jangka panjang.",
  },
  {
    title: "Integrasi Pihak Ketiga",
    desc: "Payment gateway, CRM, ERP, WhatsApp API, atau AI mempengaruhi biaya lisensi & development.",
  },
  {
    title: "Konten & SEO",
    desc: "Copywriting profesional, fotografi produk, dan strategi SEO menjadi investasi terpisah yang sering terlupakan.",
  },
  {
    title: "Maintenance & Hosting",
    desc: "Biaya berulang: hosting, domain, SSL, backup, monitoring keamanan, dan update fitur tahunan.",
  },
];

const faqs = [
  {
    q: "Berapa biaya pembuatan website di Indonesia tahun 2026?",
    a: "Biaya pembuatan website di Indonesia berkisar mulai dari Rp3.000.000 untuk landing page sederhana, Rp15.000.000 – Rp60.000.000 untuk toko online, hingga Rp250.000.000+ untuk aplikasi web custom dengan integrasi kompleks.",
  },
  {
    q: "Apa perbedaan biaya website template vs custom?",
    a: "Website berbasis template (WordPress / Wix) bisa dimulai dari Rp1.500.000 – Rp5.000.000, namun memiliki keterbatasan kustomisasi. Website custom dibangun dari nol sesuai branding & alur bisnis Anda, dengan biaya mulai Rp10.000.000 ke atas.",
  },
  {
    q: "Apakah ada biaya bulanan setelah website jadi?",
    a: "Ya. Anda perlu menganggarkan biaya hosting (Rp200rb – Rp2jt/bulan), domain (Rp150rb – Rp500rb/tahun), maintenance (10 – 20% dari nilai project/tahun), serta SSL dan backup.",
  },
  {
    q: "Berapa lama proses pembuatan website?",
    a: "Landing page: 1 – 3 minggu. E-commerce: 4 – 10 minggu. Aplikasi web custom: 2 – 6 bulan tergantung kompleksitas fitur dan kecepatan approval klien.",
  },
  {
    q: "Bagaimana cara menghemat biaya pembuatan website tanpa mengorbankan kualitas?",
    a: "Tentukan MVP (fitur minimum yang benar-benar dibutuhkan), gunakan komponen design system, manfaatkan integrasi siap pakai, dan pilih partner development yang transparan soal scope dan timeline.",
  },
];

export default function BiayaPembuatanWebsite() {
  const path = "/blog/biaya-pembuatan-website";
  const title = "Biaya Pembuatan Website 2026: Panduan Lengkap Harga Indonesia";
  const description =
    "Panduan biaya pembuatan website di Indonesia 2026: harga landing page, e-commerce, dan aplikasi web custom plus faktor yang mempengaruhi budget.";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      datePublished: "2026-06-15",
      dateModified: "2026-06-15",
      author: { "@type": "Organization", name: "Fusionify Digital Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Fusionify Digital Solutions",
        logo: {
          "@type": "ImageObject",
          url: "https://solutions.fusionifydigital.store/og-image.png",
        },
      },
      mainEntityOfPage: `https://solutions.fusionifydigital.store${path}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: "https://solutions.fusionifydigital.store/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://solutions.fusionifydigital.store/blog" },
        { "@type": "ListItem", position: 3, name: "Biaya Pembuatan Website", item: `https://solutions.fusionifydigital.store${path}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={title} description={description} path={path} jsonLd={jsonLd} />
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            Panduan Biaya · 2026
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4 leading-tight">
            Biaya Pembuatan Website di Indonesia 2026
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Panduan transparan harga pembuatan website mulai dari landing page, toko online, hingga aplikasi web custom — lengkap dengan faktor biaya, timeline, dan tips menghemat budget tanpa mengorbankan kualitas.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Diperbarui 15 Juni 2026 · 8 menit baca
          </p>
        </header>

        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Ringkasan Cepat: Berapa Biaya Pembuatan Website?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Secara umum, biaya pembuatan website di Indonesia tahun 2026 berkisar antara <strong className="text-foreground">Rp3.000.000 hingga Rp250.000.000+</strong>, tergantung jenis website, kompleksitas fitur, dan teknologi yang digunakan. Berikut tiga kategori utama yang paling banyak dicari oleh bisnis di Indonesia.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <article
                  key={tier.name}
                  className="rounded-2xl border border-border bg-card/50 p-6 hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{tier.name}</h3>
                  <p className="text-xl font-bold text-primary mb-1">
                    Rp{formatIDR(tier.range[0])} – Rp{formatIDR(tier.range[1])}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">{tier.timeline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.bestFor}</p>
                </article>
              );
            })}
          </div>
        </section>

        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <section key={`detail-${tier.name}`} className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-6 h-6 text-primary" />
                <h2 className="font-display font-bold text-2xl text-foreground">
                  {tier.name}: Rp{formatIDR(tier.range[0])} – Rp{formatIDR(tier.range[1])}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cocok untuk: {tier.bestFor} Estimasi pengerjaan {tier.timeline}.
              </p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-6 h-6 text-primary" />
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              6 Faktor yang Mempengaruhi Biaya Website
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {costFactors.map((factor) => (
              <div key={factor.title} className="rounded-xl border border-border bg-card/40 p-5">
                <h3 className="font-semibold text-foreground mb-2">{factor.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{factor.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
            Template vs Custom: Mana yang Lebih Hemat?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Website berbasis <strong className="text-foreground">template</strong> (WordPress, Wix, Shopify) bisa dimulai dari Rp1.500.000 – Rp5.000.000. Cocok untuk validasi ide cepat, namun memiliki keterbatasan kustomisasi, performa, dan dependency pada plugin pihak ketiga.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Website <strong className="text-foreground">custom</strong> dibangun dari nol menggunakan stack modern (React, Next.js, Node.js) sesuai kebutuhan bisnis. Investasi awal lebih tinggi (mulai Rp10.000.000), namun memberi performa lebih baik, SEO lebih kuat, dan skalabilitas jangka panjang.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
            Biaya Bulanan & Tahunan yang Sering Terlupakan
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Hosting:</strong> Rp200.000 – Rp2.000.000/bulan tergantung traffic.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Domain:</strong> Rp150.000 – Rp500.000/tahun (.com / .id).</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">SSL & Keamanan:</strong> seringkali gratis via Let's Encrypt, premium mulai Rp500rb/tahun.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Maintenance:</strong> 10 – 20% dari nilai project per tahun untuk update fitur & patch keamanan.</span></li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span><strong className="text-foreground">Payment Gateway:</strong> 0.7% – 2.9% per transaksi.</span></li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card/40 p-5">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-10 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Butuh Estimasi Biaya untuk Project Anda?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Tim Fusionify Digital Solutions siap memberikan penawaran transparan dengan breakdown biaya yang jelas. Konsultasi awal gratis.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/#contact">Konsultasi Gratis</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services/web-development">Lihat Layanan Web Development</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
