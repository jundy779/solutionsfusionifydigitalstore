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
  "nav.ecosystem": { id: "Ekosistem", en: "Ecosystem" },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.contact": { id: "Kontak", en: "Contact" },
  "nav.getStarted": { id: "Diskusi Kebutuhan", en: "Discuss your needs" },

  // Hero — repositioned: honest, small-business focused
  "hero.badge": { id: "Bengkel Digital untuk Bisnis Kecil", en: "A Digital Workshop for Small Business" },
  "hero.badge0": { id: "Domain & Konten Milik Anda", en: "Your Domain & Content Stay Yours" },
  "hero.badge1": { id: "Respon < 24 Jam via WhatsApp", en: "WhatsApp Response < 24 Hours" },
  "hero.badge2": { id: "Cocok untuk UMKM & Sekolah", en: "Built for SMEs & Schools" },
  "hero.line1": { id: "Sistem digital yang", en: "Digital systems that" },
  "hero.line2": { id: "benar-benar jalan", en: "actually work" },
  "hero.line3": { id: "untuk bisnis kecil Anda.", en: "for small businesses." },
  "hero.subtitle": {
    id: "Fusionify membantu UMKM, sekolah, komunitas, dan bisnis lokal punya website, landing page, katalog online, automasi WhatsApp, hosting, dan sistem digital ringan yang langsung bisa dipakai. Tanpa jargon, tanpa janji besar.",
    en: "Fusionify helps SMEs, schools, communities, and local businesses set up websites, landing pages, online catalogs, WhatsApp automation, hosting, and lightweight digital systems that just work. No jargon, no oversized promises.",
  },
  "hero.cta": { id: "Diskusi Kebutuhan Anda", en: "Discuss your needs" },

  // Client Logos
  "clients.title": { id: "Sudah membantu", en: "We've helped" },
  "clients.suffix": { id: "Bisnis & Sekolah", en: "Businesses & Schools" },
  "clients.visitWebsite": { id: "Klik untuk kunjungi website", en: "Click to visit website" },

  // Partner Logos
  "partners.title": { id: "Partner Kami", en: "Our Partners" },
  "partners.visitWebsite": { id: "Klik untuk kunjungi website", en: "Click to visit website" },

  // Pain Point — UMKM real problems
  "pain.badge": { id: "Yang Sering Dialami", en: "Sound Familiar?" },
  "pain.title": { id: "Apakah Pekerjaan Digital Anda", en: "Are Your Digital Tasks" },
  "pain.titleHighlight": { id: " Sering Tertunda?", en: " Always on Hold?" },
  "pain.subtitle": {
    id: "Ini bukan tentang transformasi digital besar. Ini tentang urusan kecil yang bikin bisnis Anda kelihatan berantakan.",
    en: "This isn't about grand digital transformation. It's about the small stuff that makes your business look messy.",
  },
  "pain.manual.title": { id: "Pelanggan Bingung Cari Info", en: "Customers Can't Find Info" },
  "pain.manual.desc": {
    id: "Katalog, harga, dan info bisnis tersebar di banyak chat. Setiap kali dibagikan, harus ketik ulang.",
    en: "Your catalog, pricing, and info are scattered across chats. Every time you share it, you retype the same thing.",
  },
  "pain.slow.title": { id: "Admin Kewalahan", en: "Admin Overload" },
  "pain.slow.desc": {
    id: "Pertanyaan yang sama diulang terus. Jam istirahat pun harus balas WhatsApp satu-satu.",
    en: "The same questions come in over and over. Even on breaks you're replying to WhatsApp one by one.",
  },
  "pain.inefficient.title": { id: "Terlihat Kurang Profesional", en: "Doesn't Look Professional" },
  "pain.inefficient.desc": {
    id: "Belum punya website atau link resmi yang bisa dibagikan dengan yakin ke calon pelanggan.",
    en: "You don't have a proper website or link you can confidently share with new customers.",
  },
  "pain.cost.title": { id: "Urusan Teknis Bikin Pusing", en: "Tech Stuff Is Confusing" },
  "pain.cost.desc": {
    id: "Bingung soal domain, hosting, SSL, email, dan tidak tahu harus hubungi siapa kalau ada masalah.",
    en: "Domain, hosting, SSL, email — it's all confusing, and there's no one to call when something breaks.",
  },

  // About — honest positioning
  "about.badge": { id: "Tentang Fusionify", en: "About Fusionify" },
  "about.title": { id: "untuk Bisnis Kecil", en: "for Small Businesses" },
  "about.titlePrefix": { id: "Bengkel Digital", en: "A Digital Workshop" },
  "about.description": {
    id: "Kami bukan konsultan transformasi digital enterprise. Kami tim kecil yang membantu UMKM, sekolah, dan komunitas punya sistem digital sederhana yang benar-benar jalan — dari website, katalog, automasi WhatsApp, sampai hosting. Cocok untuk bisnis yang butuh solusi praktis, bukan proyek penuh jargon.",
    en: "We're not an enterprise digital transformation consultancy. We're a small team helping SMEs, schools, and communities set up simple digital systems that actually work — websites, catalogs, WhatsApp automation, hosting. Built for businesses that need practical solutions, not jargon-heavy projects.",
  },
  "about.team.title": { id: "Tim Kecil, Bisa Dihubungi", en: "Small Team, Actually Reachable" },
  "about.team.desc": {
    id: "Bukan agency raksasa. Kami tim kecil yang bisa langsung di-WhatsApp saat website atau sistem butuh perbaikan.",
    en: "Not a giant agency. A small team you can WhatsApp directly when the site or system needs a fix.",
  },
  "about.tech.title": { id: "Solusi Sederhana yang Cukup", en: "Simple Solutions That Are Enough" },
  "about.tech.desc": {
    id: "Kami tidak memaksa teknologi kompleks. Kami pilih yang paling sederhana dan cukup untuk kebutuhan Anda.",
    en: "We don't push complex tech. We pick the simplest thing that's enough for your actual needs.",
  },
  "about.fast.title": { id: "Batas Kerja yang Jelas", en: "Clear Scope, No Surprises" },
  "about.fast.desc": {
    id: "Scope, waktu, revisi, dan maintenance dijelaskan di awal. Tidak ada kejutan biaya di tengah jalan.",
    en: "Scope, timeline, revisions, and maintenance are spelled out upfront. No mid-project cost surprises.",
  },
  "about.learnMore": { id: "Kenali kami lebih dekat", en: "Learn more about us" },
  "about.highlight1": { id: "Fokus UMKM & Sekolah", en: "Focus on SMEs & Schools" },
  "about.highlight2": { id: "Bahasa yang Mudah Dimengerti", en: "Plain, Human Language" },
  "about.highlight3": { id: "Ada Orang yang Bisa Dihubungi", en: "Real Humans on WhatsApp" },
  "about.highlight4": { id: "Cocok untuk Skala Kecil-Menengah", en: "Built for Small-to-Mid Scale" },
  "about.digitalSolutions": { id: "Bengkel Digital", en: "Digital Workshop" },

  // Services — by use case, not by tech
  "services.badge": { id: "Layanan Kami", en: "Our Services" },
  "services.title": { id: "Masalah Anda", en: "Your Problem" },
  "services.titlePrefix": { id: "Layanan Berdasarkan", en: "Services Based on" },
  "services.subtitle": {
    id: "Kami tidak menjual komponen teknis. Kami membantu menyelesaikan pekerjaan digital yang selama ini tertunda — dikelompokkan berdasarkan masalah, bukan berdasarkan nama teknologi.",
    en: "We don't sell tech components. We help finish the digital work that's been sitting on hold — grouped by problem, not by technology name.",
  },

  // Unified Ecosystem — humble
  "ecosystem.badge": { id: "Semua dari Satu Tim", en: "One Team, End-to-End" },
  "ecosystem.title": { id: "Rapi dari", en: "Tidy from" },
  "ecosystem.titleHighlight": { id: " Domain sampai Maintenance", en: " Domain to Maintenance" },
  "ecosystem.subtitle": {
    id: "Website, automasi WhatsApp, hosting, dan sistem digital ringan — dikerjakan dan dirawat oleh tim yang sama. Anda tidak perlu mencari vendor berbeda untuk tiap potongan.",
    en: "Website, WhatsApp automation, hosting, and lightweight digital systems — built and maintained by the same team. No hunting for a different vendor for each piece.",
  },
  "ecosystem.status": { id: "Satu tim menangani semua tahap", en: "One team handles every stage" },
  "ecosystem.automation": { id: "Automasi", en: "Automation" },
  "ecosystem.automationDesc": { id: "WhatsApp & bot sederhana", en: "WhatsApp & simple bots" },
  "ecosystem.systems": { id: "Website", en: "Websites" },
  "ecosystem.systemsDesc": { id: "Landing page & katalog", en: "Landing pages & catalogs" },
  "ecosystem.cloud": { id: "Hosting", en: "Hosting" },
  "ecosystem.cloudDesc": { id: "Domain, hosting, email", en: "Domain, hosting, email" },
  "ecosystem.payments": { id: "Maintenance", en: "Maintenance" },
  "ecosystem.paymentsDesc": { id: "Perawatan bulanan ringan", en: "Light monthly upkeep" },

  // Why Choose Us — honest limits = trust
  "why.badge": { id: "Kenapa Kami", en: "Why Us" },
  "why.title": { id: "Cara Kerja", en: "How We Work" },
  "why.titleHighlight": { id: " yang Jujur", en: " Honestly" },
  "why.subtitle": {
    id: "Kami memilih membatasi diri supaya bisa fokus mengerjakan dengan benar. Batasan adalah tanda kompetensi, bukan kelemahan.",
    en: "We choose to stay narrow so we can do the work properly. Setting limits is a sign of competence, not weakness.",
  },
  "why.secure.title": { id: "Ownership Jelas Sejak Awal", en: "Clear Ownership from Day One" },
  "why.secure.desc": {
    id: "Domain, konten, dan akun tetap milik Anda. Akses klien tidak dibagikan sembarangan. Setelah proyek selesai, Anda dapat semua yang menjadi hak Anda.",
    en: "Domain, content, and accounts stay yours. Client access isn't shared around. When the project ends, you get everything you're entitled to.",
  },
  "why.scalable.title": { id: "Cocok untuk Skala Kecil-Menengah", en: "Built for Small-to-Mid Scale" },
  "why.scalable.desc": {
    id: "Fokus pada UMKM, sekolah, komunitas, dan bisnis lokal. Tidak cocok untuk proyek enterprise yang butuh compliance kompleks — dan kami jujur soal itu.",
    en: "Focused on SMEs, schools, communities, and local businesses. Not suited for enterprise projects with heavy compliance — and we're honest about that.",
  },
  "why.modern.title": { id: "Solusi Sederhana yang Cukup", en: "Simple Enough to Actually Ship" },
  "why.modern.desc": {
    id: "Kami pilih teknologi yang paling sederhana dan cukup untuk kebutuhan Anda — bukan yang paling ramai jargon.",
    en: "We pick the simplest tech that's enough for the job — not the one with the loudest buzzwords.",
  },
  "why.fast.title": { id: "Scope & Revisi Disebut di Awal", en: "Scope & Revisions Set Upfront" },
  "why.fast.desc": {
    id: "Batas pekerjaan, jumlah revisi, waktu pengerjaan, dan biaya maintenance disebut sebelum mulai — bukan di tengah jalan.",
    en: "Work boundaries, revision count, timeline, and maintenance cost are stated before we start — not halfway through.",
  },
  "why.support.title": { id: "Ada Manusia yang Bisa Dihubungi", en: "A Human You Can Actually Reach" },
  "why.support.desc": {
    id: "Bisa langsung WhatsApp saat website error atau butuh perubahan kecil. Bukan sistem tiket dingin.",
    en: "Just WhatsApp us when the site breaks or needs a small tweak. No cold ticketing system.",
  },
  "why.trust": {
    id: "Cocok untuk UMKM, sekolah, komunitas & bisnis lokal — bukan untuk proyek enterprise berat",
    en: "For SMEs, schools, communities & local businesses — not for heavy enterprise projects",
  },

  // Results — humble, evidence-based
  "results.badge": { id: "Rekam Jejak", en: "Track Record" },
  "results.title": { id: "Pekerjaan yang", en: "Work That's" },
  "results.titleHighlight": { id: " Sudah Selesai", en: " Actually Done" },
  "results.subtitle": {
    id: "Bukti kecil tapi nyata — bukan klaim megah.",
    en: "Small but real evidence — not grand claims.",
  },
  "results.users": { id: "Pengguna Terlayani", en: "Users Served" },
  "results.uptime": { id: "Uptime Hosting", en: "Hosting Uptime" },
  "results.efficiency": { id: "Pengerjaan Tepat Waktu", en: "On-Time Delivery" },
  "results.satisfaction": { id: "Klien Puas", en: "Satisfied Clients" },
  "results.support": { id: "Bisa Dihubungi", en: "Reachable" },

  // Product Suite — product names stay, framing changes
  "products.badge": { id: "Produk Kami", en: "Our Products" },
  "products.title": { id: "Alat Bantu", en: "Tools from" },
  "products.titleHighlight": { id: " Buatan Fusionify", en: " the Fusionify Team" },
  "products.subtitle": {
    id: "Produk-produk kecil yang kami buat sendiri untuk membantu pekerjaan digital harian.",
    en: "Small tools we built ourselves to help with everyday digital work.",
  },
  "products.available": { id: "Tersedia", en: "Available" },
  "products.comingSoon": { id: "Segera Hadir", en: "Coming Soon" },
  "products.automation.desc": {
    id: "Bot Telegram & WhatsApp sederhana untuk alur kerja bisnis kecil",
    en: "Simple Telegram & WhatsApp bots for small business workflows",
  },
  "products.vpn.desc": {
    id: "Layanan VPN pribadi — produk sampingan, bukan solusi enterprise",
    en: "Personal VPN service — a side product, not an enterprise solution",
  },
  "products.store.desc": {
    id: "Toko kecil untuk template, tools, dan resource digital",
    en: "A small shop for templates, tools, and digital resources",
  },
  "products.pay.desc": {
    id: "Eksperimen payment untuk bisnis kecil Indonesia",
    en: "A payment experiment for small Indonesian businesses",
  },
  "products.viewAll": { id: "Lihat Semua Produk", en: "See All Products" },

  // Free Tools
  "tools.badge": { id: "Tools Gratis", en: "Free Tools" },
  "tools.title": { id: "Tools", en: "Free" },
  "tools.titleHighlight": { id: " Gratis untuk Semua", en: " Tools for Anyone" },
  "tools.subtitle": {
    id: "Kumpulan tools kecil yang bisa dipakai siapa saja — tanpa daftar, tanpa biaya.",
    en: "Small tools anyone can use — no sign-up, no cost.",
  },
  "tools.speedtest.desc": { id: "Tes kecepatan internet Anda", en: "Test your internet speed" },
  "tools.tmail.desc": { id: "Email sementara untuk lindungi privasi", en: "Temporary email to protect privacy" },
  "tools.fusiontik.desc": { id: "Download video TikTok tanpa watermark", en: "Download TikTok videos without watermark" },
  "tools.uploader.desc": { id: "Upload & bagikan file media", en: "Upload and share media files" },
  "tools.viewAll": { id: "Lihat Semua Tools", en: "See All Tools" },

  // Ecosystem Page
  "eco.badge": { id: "Ekosistem Fusionify", en: "Fusionify Ecosystem" },
  "eco.title": { id: "Semua yang Kami", en: "Everything We" },
  "eco.titleHighlight": { id: " Buat & Layani", en: " Build & Support" },
  "eco.subtitle": {
    id: "Produk kecil, tools gratis, dan jasa pengerjaan — semua dari satu tim, dijelaskan apa adanya.",
    en: "Small products, free tools, and delivery services — all from one team, explained plainly.",
  },
  "eco.backHome": { id: "Kembali ke Beranda", en: "Back to Home" },
  "eco.productsLabel": { id: "Produk Kami", en: "Our Products" },
  "eco.productsTitle": { id: "Produk Buatan Fusionify", en: "Products by Fusionify" },
  "eco.toolsLabel": { id: "Tools & Utilities", en: "Tools & Utilities" },
  "eco.toolsTitle": { id: "Tools Gratis untuk Semua", en: "Free Tools for Everyone" },
  "eco.projectsLabel": { id: "Jasa Pengerjaan", en: "Delivery Services" },
  "eco.projectsTitle": { id: "Website & Sistem Digital untuk UMKM/Sekolah", en: "Websites & Digital Systems for SMEs/Schools" },
  "eco.mediaLabel": { id: "Media & Komunitas", en: "Media & Community" },
  "eco.mediaTitle": { id: "Konten & Open Source", en: "Content & Open Source" },
  "eco.bot.desc": { id: "Bot Telegram & WhatsApp untuk kebutuhan bisnis kecil", en: "Telegram & WhatsApp bots for small business needs" },
  "eco.premiumify.desc": { id: "Toko kecil untuk template, akun premium, dan tools", en: "A small shop for templates, premium accounts, and tools" },
  "eco.vpn.desc": { id: "Layanan VPN pribadi — produk sampingan Fusionify", en: "Personal VPN service — a Fusionify side product" },
  "eco.ftvpay.desc": { id: "Eksperimen payment untuk bisnis kecil (dalam pengembangan)", en: "Payment experiment for small business (in development)" },
  "eco.speedtest.desc": { id: "Uji kecepatan internet Anda secara real-time", en: "Test your internet speed in real-time" },
  "eco.tmail.desc": { id: "Buat email sementara untuk lindungi privasi dari spam", en: "Create temporary emails to protect privacy from spam" },
  "eco.fusiontik.desc": { id: "Download video TikTok tanpa watermark", en: "Download TikTok videos without watermark" },
  "eco.uploader.desc": { id: "Upload dan bagikan file media via link langsung", en: "Upload and share media files via direct link" },
  "eco.blog.desc": { id: "Tulisan jujur soal kerja digital sehari-hari untuk bisnis kecil", en: "Honest writing about everyday digital work for small businesses" },
  "eco.github.desc": { id: "Kontribusi open source dan repositori proyek Fusionify", en: "Open source contributions and Fusionify project repos" },
  "eco.cessasnack.desc": { id: "Website UMKM snack — dibuat oleh tim Fusionify", en: "SME snack website — built by the Fusionify team" },
  "eco.fahmicollection.desc": { id: "Website UMKM Fahmi Collection — dibuat oleh tim Fusionify", en: "Fahmi Collection SME website — built by the Fusionify team" },
  "eco.tokyoshop.desc": { id: "Toko online TokyoShop — dibuat oleh tim Fusionify", en: "TokyoShop online store — built by the Fusionify team" },
  "eco.quipanel.desc": { id: "Website perusahaan PT Quipanel — dibuat oleh tim Fusionify", en: "PT Quipanel corporate site — built by the Fusionify team" },
  "eco.smkpionir.desc": { id: "Website sekolah SMK Pionir — dibuat oleh tim Fusionify", en: "SMK Pionir school site — built by the Fusionify team" },
  "eco.ctaTitle": { id: "Ada Pekerjaan Digital yang Tertunda?", en: "Got Digital Work Stuck on Hold?" },
  "eco.ctaSubtitle": {
    id: "Ceritakan kebutuhan Anda. Kami bantu pilih solusi paling sederhana yang cukup.",
    en: "Tell us what you need. We'll help pick the simplest solution that's enough.",
  },
  "eco.ctaButton": { id: "Diskusi via WhatsApp", en: "Chat via WhatsApp" },

  // Featured Projects — honest portfolio
  "projects.badge": { id: "Portofolio", en: "Portfolio" },
  "projects.title": { id: "Contoh Pekerjaan", en: "Real" },
  "projects.titleHighlight": { id: " Nyata", en: " Work Examples" },
  "projects.subtitle": {
    id: "Website dan sistem sederhana yang sudah kami buat untuk UMKM, sekolah, dan bisnis lokal. Satu contoh nyata lebih kuat daripada sepuluh klaim abstrak.",
    en: "Websites and simple systems we've built for SMEs, schools, and local businesses. One real example beats ten abstract claims.",
  },
  "projects.viewAll": { id: "Lihat Semua Proyek", en: "View All Projects" },
  "projects.enterprise.title": { id: "Sistem Order Otomatis", en: "Automated Order System" },
  "projects.enterprise.desc": { id: "Automasi order sederhana lewat WhatsApp untuk UMKM", en: "Simple WhatsApp order automation for an SME" },
  "projects.enterprise.metrics": { id: "Admin tidak lagi kewalahan", en: "Admin no longer overloaded" },
  "projects.marketplace.title": { id: "Katalog Online UMKM", en: "SME Online Catalog" },
  "projects.marketplace.desc": { id: "Katalog produk yang bisa dibagikan lewat satu link", en: "Product catalog shareable through one link" },
  "projects.marketplace.metrics": { id: "Pelanggan tidak lagi bingung", en: "Customers stop getting lost" },
  "projects.cloud.title": { id: "Setup Domain & Hosting", en: "Domain & Hosting Setup" },
  "projects.cloud.desc": { id: "Hosting stabil dan email bisnis untuk toko kecil", en: "Stable hosting and business email for a small shop" },
  "projects.cloud.metrics": { id: "Website tidak sering down", en: "Site rarely goes down" },
  "projects.bot.title": { id: "Bot WhatsApp FAQ Otomatis", en: "WhatsApp FAQ Bot" },
  "projects.bot.desc": { id: "Balas pertanyaan berulang otomatis 24 jam", en: "Auto-replies to repeat questions 24/7" },
  "projects.bot.metrics": { id: "Admin bisa istirahat", en: "Admins finally rest" },

  // Testimonials
  "testimonials.badge": { id: "Kata Klien", en: "Client Voices" },
  "testimonials.title": { id: "Cerita dari", en: "Stories from" },
  "testimonials.titleHighlight": { id: " Bisnis Kecil", en: " Small Businesses" },
  "testimonials.subtitle": {
    id: "Feedback jujur dari UMKM, sekolah, dan komunitas yang sudah kami bantu.",
    en: "Honest feedback from SMEs, schools, and communities we've helped.",
  },

  // Future Vision — humble
  "vision.badge": { id: "Ke Depan", en: "Where We're Heading" },
  "vision.title": { id: "Terus Jadi Tempat", en: "Staying a Place Where" },
  "vision.titleHighlight": { id: " Bisnis Kecil Dibantu", en: " Small Business Gets Help" },
  "vision.desc1": {
    id: "Fusionify percaya bisnis kecil tidak butuh 'transformasi digital' yang megah. Mereka butuh sistem sederhana yang benar-benar jalan — website yang bisa dibagikan, admin yang tidak overload, dan pelanggan yang mudah menghubungi.",
    en: "Fusionify believes small businesses don't need grand 'digital transformation'. They need simple systems that actually work — a site they can share, an admin who isn't overloaded, and customers who can reach them easily.",
  },
  "vision.desc2": {
    id: "Ke depan, kami ingin terus menjadi tempat UMKM, sekolah, dan komunitas dapat bantuan digital yang jujur, terjangkau, dan bisa diajak bicara — bukan berubah menjadi konsultan enterprise.",
    en: "Going forward, we want to keep being the place where SMEs, schools, and communities get honest, affordable digital help they can actually talk to — not turn into an enterprise consultancy.",
  },
  "vision.innovation": { id: "Praktis di Lapangan", en: "Practical on the Ground" },
  "vision.global": { id: "Fokus Lokal Indonesia", en: "Focused on Indonesia" },
  "vision.scalable": { id: "Sederhana yang Cukup", en: "Simple Enough" },
  "vision.future": { id: "Bisa Diajak Bicara", en: "Actually Reachable" },
  "vision.founded": { id: "Mulai", en: "Started" },
  "vision.foundedDesc": { id: "Membantu UMKM pertama", en: "Helped our first SME" },
  "vision.ecosystem": { id: "Berkembang", en: "Growing" },
  "vision.ecosystemDesc": { id: "Menambah layanan & tools", en: "Added services & tools" },
  "vision.expansion": { id: "Sekarang", en: "Today" },
  "vision.expansionDesc": { id: "Melayani lintas kota", en: "Serving across cities" },
  "vision.futureLabel": { id: "Ke Depan", en: "Ahead" },
  "vision.futureDesc": { id: "Tetap kecil, tetap dekat", en: "Staying small, staying close" },

  // FAQ
  "faq.badge": { id: "FAQ", en: "FAQ" },
  "faq.title": { id: "Jawaban", en: "Honest" },
  "faq.titleHighlight": { id: " Jujur", en: " Answers" },
  "faq.subtitle": {
    id: "Jawaban apa adanya untuk pertanyaan yang paling sering diajukan calon klien.",
    en: "Plain answers to the questions we get asked most often.",
  },
  "faq.empty": { id: "Belum ada FAQ tersedia.", en: "No FAQs available yet." },
  "faq.moreQuestions": { id: "Masih ada pertanyaan?", en: "Still have questions?" },
  "faq.contactUs": { id: "Hubungi kami via WhatsApp", en: "Message us on WhatsApp" },

  // CTA
  "cta.badge": { id: "Siap Mulai?", en: "Ready to Start?" },
  "cta.title": { id: "Diskusi Kebutuhan", en: "Discuss Your" },
  "cta.titleHighlight": { id: "Digital Anda", en: "Digital Needs" },
  "cta.subtitle": {
    id: "Ceritakan pekerjaan digital yang selama ini tertunda. Kami bantu pilih solusi paling sederhana yang cukup — tanpa jargon, tanpa janji besar.",
    en: "Tell us about the digital work that's been on hold. We'll help pick the simplest solution that's enough — no jargon, no oversized promises.",
  },
  "cta.button": { id: "Diskusi via WhatsApp", en: "Chat via WhatsApp" },
  "cta.noCommitment": { id: "Tanpa komitmen", en: "No commitment" },
  "cta.freeConsultation": { id: "Diskusi awal gratis", en: "First chat is free" },
  "cta.fastResponse": { id: "Respon < 24 jam", en: "Response < 24 hours" },

  // Contact
  "contact.badge": { id: "Hubungi Kami", en: "Contact Us" },
  "contact.title": { id: "Ceritakan", en: "Tell Us" },
  "contact.titleHighlight": { id: " Kebutuhan Anda", en: " What You Need" },
  "contact.subtitle": {
    id: "Kami bantu pilih solusi digital paling sederhana yang cukup untuk bisnis Anda.",
    en: "We'll help pick the simplest digital solution that's enough for your business.",
  },
  "contact.sendMessage": { id: "Kirim pesan kepada kami", en: "Send us a message" },
  "contact.name": { id: "Nama", en: "Name" },
  "contact.namePlaceholder": { id: "Nama Anda", en: "Your name" },
  "contact.email": { id: "Email", en: "Email" },
  "contact.message": { id: "Pesan", en: "Message" },
  "contact.messagePlaceholder": { id: "Ceritakan pekerjaan digital yang tertunda...", en: "Tell us about the digital work you need help with..." },
  "contact.sendButton": { id: "Kirim Pesan", en: "Send Message" },
  "contact.sending": { id: "Mengirim...", en: "Sending..." },
  "contact.successToast": { id: "Pesan Anda terkirim. Kami akan hubungi via WhatsApp / email.", en: "Message sent. We'll get back to you via WhatsApp / email." },
  "contact.errorToast": { id: "Gagal mengirim. Silakan coba lagi.", en: "Failed to send. Please try again." },
  "contact.consultationTitle": { id: "Form Kebutuhan Anda", en: "Your Needs Form" },
  "contact.company": { id: "Bisnis / Sekolah", en: "Business / School" },
  "contact.companyPlaceholder": { id: "Nama bisnis, sekolah, atau komunitas Anda", en: "Your business, school, or community name" },
  "contact.service": { id: "Kebutuhan", en: "What You Need" },
  "contact.selectService": { id: "Pilih jenis pekerjaan", en: "Pick the type of work" },
  "contact.budget": { id: "Perkiraan Budget", en: "Rough Budget" },
  "contact.selectBudget": { id: "Pilih perkiraan budget", en: "Pick a rough range" },
  "contact.getInTouch": { id: "Hubungi kami", en: "Get in touch" },
  "contact.emailLabel": { id: "Email", en: "Email" },
  "contact.phoneLabel": { id: "WhatsApp", en: "WhatsApp" },
  "contact.locationLabel": { id: "Lokasi", en: "Location" },
  "contact.location": { id: "Indonesia", en: "Indonesia" },
  "contact.quickResponse": { id: "Respon Cepat", en: "Quick Response" },
  "contact.quickResponseDesc": {
    id: "Biasanya kami balas dalam 24 jam. Kalau mendesak, langsung WhatsApp saja.",
    en: "We usually reply within 24 hours. For urgent stuff, just WhatsApp us directly.",
  },
  "contact.satisfiedClients": { id: "UMKM & sekolah yang sudah dibantu", en: "SMEs & schools we've helped" },

  // Footer
  "footer.description": {
    id: "Bengkel digital untuk UMKM, sekolah, dan komunitas. Kami bantu website, automasi WhatsApp, hosting, dan sistem digital sederhana yang benar-benar jalan.",
    en: "A digital workshop for SMEs, schools, and communities. We help with websites, WhatsApp automation, hosting, and simple digital systems that actually work.",
  },
  "footer.madeWith": { id: "Dibuat dengan", en: "Made with" },
  "footer.inIndonesia": { id: "di Indonesia", en: "in Indonesia" },
  "footer.services": { id: "Layanan", en: "Services" },
  "footer.company": { id: "Fusionify", en: "Fusionify" },
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
