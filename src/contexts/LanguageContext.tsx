import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "id" | "en";

type Translations = {
  [key: string]: { id: string; en: string };
};

const translations: Translations = {
  // Navbar
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.services": { id: "Layanan", en: "Services" },
  "nav.portfolio": { id: "Portofolio", en: "Portfolio" },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.contact": { id: "Kontak", en: "Contact" },
  "nav.getStarted": { id: "Mulai Sekarang", en: "Get started" },

  // Hero
  "hero.badge": { id: "Penyedia Solusi Digital", en: "Digital Solutions Provider" },
  "hero.line1": { id: "Transformasi bisnis Anda dengan", en: "Transform your business with" },
  "hero.line2": { id: "otomasi cerdas dan", en: "smart automation and" },
  "hero.line3": { id: "solusi digital modern.", en: "modern digital solutions." },
  "hero.subtitle": {
    id: "Dipercaya oleh UMKM, startup, dan perusahaan yang mengandalkan solusi digital modern untuk pertumbuhan bisnis.",
    en: "Trusted by SMEs, startups, and enterprises relying on modern digital solutions for business growth.",
  },
  "hero.cta": { id: "Konsultasi Gratis", en: "Book a consultation" },

  // Client Logos
  "clients.title": { id: "Dipercaya oleh", en: "Trusted by" },
  "clients.suffix": { id: "Klien Kami", en: "Clients" },
  "clients.visitWebsite": { id: "Klik untuk kunjungi website", en: "Click to visit website" },

  // Partner Logos
  "partners.title": { id: "Partner Strategis Kami", en: "Our Strategic Partners" },
  "partners.visitWebsite": { id: "Klik untuk kunjungi website", en: "Click to visit website" },

  // Pain Point
  "pain.badge": { id: "Tantangan", en: "The Challenge" },
  "pain.title": { id: "Apakah Bisnis Anda", en: "Is Your Business" },
  "pain.titleHighlight": { id: " Mengalami Ini?", en: " Struggling With?" },
  "pain.subtitle": { id: "Tantangan ini menghambat ribuan bisnis dari potensi terbaiknya", en: "These challenges are holding back thousands of businesses from reaching their potential" },
  "pain.manual.title": { id: "Proses Manual", en: "Manual Processes" },
  "pain.manual.desc": { id: "Menghabiskan waktu berjam-jam untuk tugas repetitif yang menguras produktivitas dan sumber daya", en: "Wasting countless hours on repetitive tasks that drain productivity and resources" },
  "pain.slow.title": { id: "Respon Lambat", en: "Slow Response" },
  "pain.slow.desc": { id: "Kehilangan peluang karena respon yang lambat dan komunikasi yang ketinggalan zaman", en: "Missing opportunities because of delayed responses and outdated communication" },
  "pain.inefficient.title": { id: "Sistem Tidak Efisien", en: "Inefficient Systems" },
  "pain.inefficient.desc": { id: "Masih mengandalkan alur kerja manual yang sudah diotomasi oleh kompetitor", en: "Still relying on manual workflows that competitors have already automated" },
  "pain.cost.title": { id: "Biaya Tinggi", en: "High Costs" },
  "pain.cost.desc": { id: "Biaya operasional menggerus keuntungan karena kurangnya optimasi", en: "Operational expenses eating into profits due to lack of optimization" },

  // About
  "about.badge": { id: "Tentang Fusionify", en: "About Fusionify" },
  "about.title": { id: "Partner Digital", en: "Digital Partner" },
  "about.titlePrefix": { id: "Solusi Lengkap", en: "Your Complete" },
  "about.description": {
    id: "Fusionify Digital Solutions membantu bisnis bertransformasi digital dengan solusi modern dan skalabel. Dari otomasi hingga infrastruktur cloud, kami menyediakan layanan digital end-to-end yang disesuaikan dengan kebutuhan Anda.",
    en: "Fusionify Digital Solutions helps businesses transform digitally with modern, scalable solutions. From automation to cloud infrastructure, we provide end-to-end digital services tailored to your needs.",
  },
  "about.team.title": { id: "Tim Profesional Berpengalaman", en: "Professional Experienced Team" },
  "about.team.desc": { id: "Developer dan konsultan terampil dengan pengalaman bertahun-tahun", en: "Skilled developers and consultants with years of industry experience" },
  "about.tech.title": { id: "Teknologi & Praktik Terbaik", en: "Latest Technologies & Best Practices" },
  "about.tech.desc": { id: "Kami menggunakan tech stack modern dan mengikuti metodologi terdepan", en: "We use modern tech stacks and follow industry-leading methodologies" },
  "about.fast.title": { id: "Respon Cepat & Harga Transparan", en: "Fast Response & Transparent Pricing" },
  "about.fast.desc": { id: "Pengerjaan cepat dengan harga yang jelas dan transparan - tanpa biaya tersembunyi", en: "Quick turnaround times with clear, upfront pricing - no hidden costs" },
  "about.learnMore": { id: "Pelajari lebih lanjut", en: "Learn more about us" },
  "about.highlight1": { id: "Solusi Digital End-to-End", en: "Digital Solutions End-to-End" },
  "about.highlight2": { id: "Alur Kerja Berbasis Otomasi", en: "Automation Driven Workflows" },
  "about.highlight3": { id: "Dukungan Infrastruktur Cloud", en: "Cloud Infrastructure Support" },
  "about.highlight4": { id: "Sistem Skalabel", en: "Scalable Systems" },
  "about.digitalSolutions": { id: "Solusi Digital", en: "Digital Solutions" },

  // Services
  "services.badge": { id: "Layanan Kami", en: "Our Services" },
  "services.title": { id: "Solusi Digital", en: "Solutions" },
  "services.titlePrefix": { id: "Digital", en: "Complete Digital" },
  "services.subtitle": {
    id: "Semua yang Anda butuhkan untuk membangun, mengotomasi, dan mengembangkan kehadiran digital Anda",
    en: "Everything you need to build, automate, and scale your digital presence",
  },

  // Unified Ecosystem
  "ecosystem.badge": { id: "Ekosistem Terhubung", en: "Connected Ecosystem" },
  "ecosystem.title": { id: "Satu Alur", en: "One Unified" },
  "ecosystem.titleHighlight": { id: " Digital Terpadu", en: " Digital Flow" },
  "ecosystem.subtitle": {
    id: "Fusionify menghubungkan otomasi, sistem, pembayaran, dan layanan digital menjadi satu ekosistem yang mulus untuk bisnis Anda",
    en: "Fusionify connects automation, systems, payments, and digital services into one seamless ecosystem for your business",
  },
  "ecosystem.status": { id: "Semua sistem bekerja bersama secara real-time", en: "All systems working together in real-time" },
  "ecosystem.automation": { id: "Otomasi", en: "Automation" },
  "ecosystem.automationDesc": { id: "Platform otomasi cerdas", en: "Intelligent automation platform" },
  "ecosystem.systems": { id: "Sistem", en: "Systems" },
  "ecosystem.systemsDesc": { id: "Marketplace produk digital", en: "Digital products marketplace" },
  "ecosystem.cloud": { id: "Cloud", en: "Cloud" },
  "ecosystem.cloudDesc": { id: "Solusi hosting skalabel", en: "Scalable hosting solutions" },
  "ecosystem.payments": { id: "Pembayaran", en: "Payments" },
  "ecosystem.paymentsDesc": { id: "Transaksi yang mulus", en: "Seamless transactions" },

  // Why Choose Us
  "why.badge": { id: "Mengapa Memilih Kami", en: "Why Choose Us" },
  "why.title": { id: "Keunggulan", en: "The Fusionify" },
  "why.titleHighlight": { id: " Fusionify", en: " Advantage" },
  "why.subtitle": { id: "Apa yang membedakan kami dari penyedia solusi digital lainnya", en: "What sets us apart from other digital solution providers" },
  "why.secure.title": { id: "Sistem Aman", en: "Secure Systems" },
  "why.secure.desc": { id: "Keamanan tingkat enterprise dengan enkripsi, kontrol akses, dan audit rutin", en: "Enterprise-grade security with encryption, access controls, and regular audits" },
  "why.scalable.title": { id: "Arsitektur Skalabel", en: "Scalable Architecture" },
  "why.scalable.desc": { id: "Dibangun untuk tumbuh bersama bisnis Anda, dari startup hingga enterprise", en: "Built to grow with your business, from startup to enterprise level" },
  "why.modern.title": { id: "Teknologi Modern", en: "Modern Technology" },
  "why.modern.desc": { id: "Menggunakan framework dan tools terbaru untuk performa optimal", en: "Using the latest frameworks and tools for optimal performance" },
  "why.fast.title": { id: "Implementasi Cepat", en: "Fast Implementation" },
  "why.fast.desc": { id: "Pengembangan dan deployment cepat tanpa mengorbankan kualitas", en: "Rapid development and deployment without compromising quality" },
  "why.support.title": { id: "Dukungan Dedikasi", en: "Dedicated Support" },
  "why.support.desc": { id: "Tim support 24/7 yang responsif dan memahami kebutuhan bisnis Anda", en: "24/7 responsive support team that understands your business needs" },
  "why.trust": { id: "Dipercaya oleh 50+ bisnis di seluruh Indonesia", en: "Trusted by 50+ businesses across Indonesia" },

  // Results
  "results.badge": { id: "Hasil Nyata", en: "Real Results" },
  "results.title": { id: "Dampak", en: "Proven" },
  "results.titleHighlight": { id: " Terbukti", en: " Impact" },
  "results.subtitle": { id: "Angka-angka yang menunjukkan komitmen kami terhadap keunggulan", en: "Numbers that demonstrate our commitment to excellence" },
  "results.users": { id: "Pengguna Terdampak", en: "Users Impacted" },
  "results.uptime": { id: "Uptime Sistem", en: "System Uptime" },
  "results.efficiency": { id: "Peningkatan Efisiensi", en: "Efficiency Increase" },
  "results.satisfaction": { id: "Kepuasan Klien", en: "Client Satisfaction" },
  "results.support": { id: "Dukungan Tersedia", en: "Support Available" },

  // Product Suite
  "products.badge": { id: "Rangkaian Produk", en: "Product Suite" },
  "products.title": { id: "Ekosistem", en: "Fusionify" },
  "products.titleHighlight": { id: " Fusionify", en: " Ecosystem" },
  "products.subtitle": { id: "Rangkaian lengkap produk dan layanan digital untuk bisnis Anda", en: "A complete suite of digital products and services for your business" },
  "products.available": { id: "Tersedia", en: "Available" },
  "products.comingSoon": { id: "Segera Hadir", en: "Coming Soon" },
  "products.automation.desc": { id: "Otomasi cerdas untuk alur kerja bisnis Telegram & WhatsApp", en: "Intelligent automation for Telegram & WhatsApp business workflows" },
  "products.vpn.desc": { id: "VPN aman dan berkecepatan tinggi untuk bisnis dan pribadi", en: "Secure, high-speed VPN for business and personal use" },
  "products.store.desc": { id: "Marketplace produk digital untuk template, tools, dan sumber daya", en: "Digital products marketplace for templates, tools, and resources" },
  "products.pay.desc": { id: "Pemrosesan pembayaran yang mulus untuk bisnis Indonesia", en: "Seamless payment processing for Indonesian businesses" },
  "products.viewAll": { id: "Lihat Seluruh Ekosistem", en: "View Full Ecosystem" },

  // Free Tools
  "tools.badge": { id: "Tools Gratis", en: "Free Tools" },
  "tools.title": { id: "Tools", en: "Free" },
  "tools.titleHighlight": { id: " Gratis", en: " Tools" },
  "tools.subtitle": { id: "Kumpulan tools gratis dari Fusionify untuk kebutuhan digital harian Anda", en: "Free utilities from Fusionify for your daily digital needs" },
  "tools.speedtest.desc": { id: "Tes kecepatan internet Anda secara real-time", en: "Test your internet speed in real-time" },
  "tools.tmail.desc": { id: "Generate email sementara untuk keamanan privasi", en: "Generate temporary email for privacy protection" },
  "tools.fusiontik.desc": { id: "Download video TikTok tanpa watermark", en: "Download TikTok videos without watermark" },
  "tools.uploader.desc": { id: "Upload dan share file media dengan mudah", en: "Upload and share media files easily" },
  "tools.viewAll": { id: "Lihat Seluruh Ekosistem", en: "View Full Ecosystem" },

  // Ecosystem Page
  "eco.badge": { id: "Ekosistem Fusionify", en: "Fusionify Ecosystem" },
  "eco.title": { id: "Seluruh Ekosistem", en: "The Complete" },
  "eco.titleHighlight": { id: " Digital Kami", en: " Fusionify Ecosystem" },
  "eco.subtitle": { id: "Jelajahi semua produk digital, tools gratis, dan media dari Fusionify — semua dalam satu ekosistem yang terintegrasi.", en: "Explore all digital products, free tools, and media from Fusionify — all in one integrated ecosystem." },
  "eco.backHome": { id: "Kembali ke Beranda", en: "Back to Home" },
  "eco.productsLabel": { id: "Brand & Produk", en: "Brand & Products" },
  "eco.productsTitle": { id: "Produk Digital Fusionify", en: "Fusionify Digital Products" },
  "eco.toolsLabel": { id: "Tools & Utilities", en: "Tools & Utilities" },
  "eco.toolsTitle": { id: "Tools Gratis untuk Semua", en: "Free Tools for Everyone" },
  "eco.mediaLabel": { id: "Media, Proyek & Komunitas", en: "Media, Projects & Community" },
  "eco.mediaTitle": { id: "Konten, Proyek & Open Source", en: "Content, Projects & Open Source" },
  "eco.bot.desc": { id: "Platform otomasi bot Telegram & WhatsApp untuk kebutuhan bisnis Anda", en: "Telegram & WhatsApp bot automation platform for your business needs" },
  "eco.premiumify.desc": { id: "Marketplace produk digital, lisensi akun premium, dan tools eksklusif", en: "Digital products marketplace, premium account licenses, and exclusive tools" },
  "eco.vpn.desc": { id: "Layanan VPN aman dan berkecepatan tinggi untuk bisnis dan pribadi", en: "Secure, high-speed VPN service for business and personal use" },
  "eco.ftvpay.desc": { id: "Payment gateway terintegrasi untuk bisnis Indonesia (dalam pengembangan)", en: "Integrated payment gateway for Indonesian businesses (in development)" },
  "eco.speedtest.desc": { id: "Uji kecepatan internet Anda secara real-time dengan server terpercaya", en: "Test your internet speed in real-time with trusted servers" },
  "eco.tmail.desc": { id: "Buat email sementara untuk melindungi privasi Anda dari spam", en: "Create temporary emails to protect your privacy from spam" },
  "eco.fusiontik.desc": { id: "Download video TikTok tanpa watermark dengan mudah dan cepat", en: "Download TikTok videos without watermark easily and quickly" },
  "eco.uploader.desc": { id: "Upload dan bagikan file media dengan mudah melalui link langsung", en: "Upload and share media files easily via direct link" },
  "eco.blog.desc": { id: "Artikel, tips, dan insight seputar transformasi digital dan teknologi", en: "Articles, tips, and insights about digital transformation and technology" },
  "eco.github.desc": { id: "Kontribusi open source dan repositori proyek Fusionify", en: "Open source contributions and Fusionify project repositories" },
  "eco.cessasnack.desc": { id: "Project website Solutions — dikelola oleh tim Fusionify", en: "Solutions website project — managed by the Fusionify team" },
  "eco.ctaTitle": { id: "Butuh Solusi Digital Kustom?", en: "Need a Custom Digital Solution?" },
  "eco.ctaSubtitle": { id: "Konsultasi gratis dengan tim Fusionify untuk kebutuhan bisnis digital Anda.", en: "Free consultation with the Fusionify team for your digital business needs." },
  "eco.ctaButton": { id: "Mulai Konsultasi", en: "Start Consultation" },

  // Featured Projects
  "projects.badge": { id: "Proyek Unggulan", en: "Featured Projects" },
  "projects.title": { id: "Mengubah Ide Menjadi", en: "Transforming Ideas Into" },
  "projects.titleHighlight": { id: " Realitas Digital", en: " Digital Reality" },
  "projects.subtitle": {
    id: "Jelajahi portofolio proyek transformasi digital kami yang sukses dan telah membantu bisnis mencapai hasil terukur",
    en: "Explore our portfolio of successful digital transformation projects that have helped businesses achieve measurable results",
  },
  "projects.viewAll": { id: "Lihat Semua Proyek", en: "View All Projects" },
  "projects.enterprise.title": { id: "Sistem Otomasi Enterprise", en: "Enterprise Automation System" },
  "projects.enterprise.desc": { id: "Otomasi alur kerja end-to-end untuk perusahaan manufaktur terkemuka", en: "End-to-end workflow automation for a leading manufacturing company" },
  "projects.enterprise.metrics": { id: "80% peningkatan efisiensi", en: "80% efficiency increase" },
  "projects.marketplace.title": { id: "Platform Marketplace Digital", en: "Digital Marketplace Platform" },
  "projects.marketplace.desc": { id: "Platform e-commerce full-stack dengan sistem pembayaran terintegrasi", en: "Full-stack e-commerce platform with integrated payment systems" },
  "projects.marketplace.metrics": { id: "50K+ transaksi", en: "50K+ transactions" },
  "projects.cloud.title": { id: "Setup Infrastruktur Cloud", en: "Cloud Infrastructure Setup" },
  "projects.cloud.desc": { id: "Arsitektur cloud skalabel untuk startup fintech yang berkembang", en: "Scalable cloud architecture for a growing fintech startup" },
  "projects.cloud.metrics": { id: "99.9% uptime", en: "99.9% uptime" },
  "projects.bot.title": { id: "Sistem Bot Order Cerdas", en: "Smart Order Bot System" },
  "projects.bot.desc": { id: "Manajemen order otomatis di berbagai channel", en: "Automated order management across multiple channels" },
  "projects.bot.metrics": { id: "10K+ order/bulan", en: "10K+ orders/month" },

  // Testimonials
  "testimonials.badge": { id: "Testimoni", en: "Testimonials" },
  "testimonials.title": { id: "Apa Kata", en: "What Our" },
  "testimonials.titleHighlight": { id: " Klien Kami", en: " Clients Say" },
  "testimonials.subtitle": { id: "Dengarkan langsung dari bisnis yang telah bertransformasi bersama Fusionify", en: "Hear directly from businesses that have transformed with Fusionify" },

  // Future Vision
  "vision.badge": { id: "Visi Kami", en: "Our Vision" },
  "vision.title": { id: "Membangun Masa Depan", en: "Building the Future of" },
  "vision.titleHighlight": { id: " Bisnis Digital", en: " Digital Business" },
  "vision.desc1": {
    id: "Di Fusionify, kami tidak hanya membangun software – kami menciptakan infrastruktur untuk ekonomi digital masa depan. Visi kami adalah memberdayakan setiap bisnis, dari UMKM lokal hingga perusahaan global.",
    en: "At Fusionify, we're not just building software – we're creating the infrastructure for tomorrow's digital economy. Our vision is to empower every business, from local UMKM to global enterprises.",
  },
  "vision.desc2": {
    id: "Kami percaya pada masa depan di mana otomasi menangani hal-hal monoton, di mana sistem berkembang secara mulus dengan pertumbuhan, dan di mana teknologi menjadi pendorong potensi manusia yang tidak terlihat namun kuat.",
    en: "We believe in a future where automation handles the mundane, where systems scale seamlessly with growth, and where technology becomes an invisible but powerful enabler of human potential.",
  },
  "vision.innovation": { id: "Berbasis Inovasi", en: "Innovation-Driven" },
  "vision.global": { id: "Jangkauan Global", en: "Global Reach" },
  "vision.scalable": { id: "Solusi Skalabel", en: "Scalable Solutions" },
  "vision.future": { id: "Siap Masa Depan", en: "Future-Ready" },
  "vision.founded": { id: "Didirikan", en: "Founded" },
  "vision.foundedDesc": { id: "Memulai perjalanan kami", en: "Started our journey" },
  "vision.ecosystem": { id: "Ekosistem", en: "Ecosystem" },
  "vision.ecosystemDesc": { id: "Meluncurkan rangkaian produk", en: "Launched product suite" },
  "vision.expansion": { id: "Ekspansi", en: "Expansion" },
  "vision.expansionDesc": { id: "Cakupan nasional", en: "National coverage" },
  "vision.futureLabel": { id: "Masa Depan", en: "Future" },
  "vision.futureDesc": { id: "Ekspansi regional", en: "Regional expansion" },

  // FAQ
  "faq.badge": { id: "FAQ", en: "FAQ" },
  "faq.title": { id: "Pertanyaan", en: "Frequently Asked" },
  "faq.titleHighlight": { id: " Umum", en: " Questions" },
  "faq.subtitle": { id: "Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan kami", en: "Find answers to frequently asked questions about our services" },
  "faq.empty": { id: "Belum ada FAQ tersedia.", en: "No FAQs available yet." },
  "faq.moreQuestions": { id: "Masih punya pertanyaan?", en: "Still have questions?" },
  "faq.contactUs": { id: "Hubungi kami langsung", en: "Contact us directly" },

  // CTA
  "cta.badge": { id: "Siap untuk Memulai?", en: "Ready to Get Started?" },
  "cta.title": { id: "Siap Mentransformasi", en: "Ready to Transform Your" },
  "cta.titleHighlight": { id: "Bisnis Digital Anda?", en: "Digital Business?" },
  "cta.subtitle": {
    id: "Bergabung dengan 50+ bisnis yang telah mengotomasi operasional, menskalakan sistem, dan mempercepat pertumbuhan bersama Fusionify.",
    en: "Join 50+ businesses that have automated their operations, scaled their systems, and accelerated growth with Fusionify.",
  },
  "cta.button": { id: "Mulai Proyek Anda", en: "Start Your Project" },
  "cta.noCommitment": { id: "Tanpa komitmen", en: "No commitment required" },
  "cta.freeConsultation": { id: "Konsultasi gratis", en: "Free consultation" },
  "cta.fastResponse": { id: "Respon 24 jam", en: "24-hour response" },

  // Contact
  "contact.badge": { id: "Hubungi Kami", en: "Contact Us" },
  "contact.title": { id: "Mari Bangun", en: "Let's Build" },
  "contact.titleHighlight": { id: " Sesuatu yang Hebat", en: " Something Great" },
  "contact.subtitle": { id: "Siap memulai transformasi digital Anda? Hubungi kami hari ini.", en: "Ready to start your digital transformation? Get in touch today." },
  "contact.sendMessage": { id: "Kirim pesan kepada kami", en: "Send us a message" },
  "contact.name": { id: "Nama", en: "Name" },
  "contact.namePlaceholder": { id: "Nama Anda", en: "Your name" },
  "contact.email": { id: "Email", en: "Email" },
  "contact.message": { id: "Pesan", en: "Message" },
  "contact.messagePlaceholder": { id: "Ceritakan tentang proyek Anda...", en: "Tell us about your project..." },
  "contact.sendButton": { id: "Kirim Konsultasi", en: "Submit Consultation" },
  "contact.sending": { id: "Mengirim...", en: "Sending..." },
  "contact.successToast": { id: "Permintaan konsultasi Anda telah terkirim! Kami akan segera menghubungi Anda.", en: "Your consultation request has been sent! We'll get back to you soon." },
  "contact.errorToast": { id: "Gagal mengirim. Silakan coba lagi.", en: "Failed to send. Please try again." },
  "contact.consultationTitle": { id: "Formulir Konsultasi", en: "Consultation Form" },
  "contact.company": { id: "Perusahaan", en: "Company" },
  "contact.companyPlaceholder": { id: "Nama perusahaan Anda", en: "Your company name" },
  "contact.service": { id: "Layanan", en: "Service" },
  "contact.selectService": { id: "Pilih layanan", en: "Select a service" },
  "contact.budget": { id: "Budget", en: "Budget" },
  "contact.selectBudget": { id: "Pilih range budget", en: "Select budget range" },
  "contact.getInTouch": { id: "Hubungi kami", en: "Get in touch" },
  "contact.emailLabel": { id: "Email", en: "Email" },
  "contact.phoneLabel": { id: "Telepon", en: "Phone" },
  "contact.locationLabel": { id: "Lokasi", en: "Location" },
  "contact.location": { id: "Indonesia", en: "Indonesia" },
  "contact.quickResponse": { id: "Respon Cepat", en: "Quick Response" },
  "contact.quickResponseDesc": { id: "Kami biasanya merespon dalam 24 jam. Untuk pertanyaan mendesak, silakan hubungi melalui WhatsApp.", en: "We typically respond within 24 hours. For urgent inquiries, please reach out via WhatsApp." },
  "contact.satisfiedClients": { id: "Klien puas di seluruh Indonesia", en: "Satisfied clients across Indonesia" },

  // Footer
  "footer.description": {
    id: "Mitra terpercaya Anda untuk transformasi digital. Membangun solusi skalabel untuk bisnis Indonesia dan mancanegara.",
    en: "Your trusted partner for digital transformation. Building scalable solutions for Indonesian businesses and beyond.",
  },
  "footer.madeWith": { id: "Dibuat dengan", en: "Made with" },
  "footer.inIndonesia": { id: "di Indonesia", en: "in Indonesia" },
  "footer.services": { id: "Layanan", en: "Services" },
  "footer.company": { id: "Perusahaan", en: "Company" },
  "footer.legal": { id: "Legal", en: "Legal" },
  "footer.aboutUs": { id: "Tentang Kami", en: "About Us" },
  "footer.portfolio": { id: "Portofolio", en: "Portfolio" },
  "footer.contact": { id: "Kontak", en: "Contact" },
  "footer.privacy": { id: "Kebijakan Privasi", en: "Privacy Policy" },
  "footer.terms": { id: "Syarat Layanan", en: "Terms of Service" },
  "footer.allRights": { id: "Hak cipta dilindungi.", en: "All rights reserved." },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) || "id";
    }
    return "id";
  });

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
