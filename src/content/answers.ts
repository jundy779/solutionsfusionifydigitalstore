// Content written for answer engines and LLMs: a direct one-paragraph
// answer per service, question-form FAQs, and explicit links between
// services, audiences, and projects. Keep every claim verifiable.

export type QA = { q: string; a: string };

export type ServiceExtra = {
  seoTitle: string;
  answer: string;
  faqs: QA[];
  audiences: string[];
  projects: string[];
};

export const serviceExtras: Record<string, ServiceExtra> = {
  "web-development": {
    seoTitle: "Jasa Pembuatan Website dan Web App",
    answer:
      "Web Development di Fusionify Solutions adalah pembuatan website dan web application yang terhubung dengan proses bisnis, mulai dari landing page, company profile, website sekolah, e-commerce, dan katalog online sampai dashboard, admin panel, backend, dan API. Website dirancang supaya form, database, email, WhatsApp, dan dashboard admin saling tersambung.",
    faqs: [
      {
        q: "Apakah Fusionify Solutions bisa membuat website sekolah?",
        a: "Bisa. Website sekolah termasuk cakupan Web Development, termasuk halaman profil, informasi PPDB, galeri, dan portal informasi. Salah satu project yang sudah berjalan adalah website SMK Pionir Bojonggede.",
      },
      {
        q: "Apakah website yang sudah ada bisa diperbaiki, bukan dibuat ulang?",
        a: "Bisa. Perbaikan website yang sudah ada dan maintenance website termasuk dalam layanan ini, setelah kami meninjau kode, teknologi, dan akses yang tersedia.",
      },
      {
        q: "Teknologi apa yang dipakai untuk membuat website?",
        a: "Umumnya React, Next.js, TypeScript, dan Node.js, dengan PostgreSQL atau Supabase untuk data, lalu di-deploy ke Vercel atau VPS. Pilihan akhirnya disesuaikan dengan kebutuhan dan skala project.",
      },
    ],
    audiences: ["umkm", "sekolah", "startup", "komunitas"],
    projects: ["smk-pionir", "premiumify", "studydate"],
  },
  "automation-bots": {
    seoTitle: "Jasa Bot WhatsApp, Telegram, dan Automation",
    answer:
      "Automation & Bots di Fusionify Solutions adalah pembuatan bot Telegram, bot WhatsApp, dan workflow otomatis untuk pekerjaan berulang seperti menerima order, membalas pertanyaan pelanggan, mengirim notifikasi dan pengingat pembayaran, memperbarui status, serta menyinkronkan data antar sistem. Admin tetap memegang kendali atas keputusan penting.",
    faqs: [
      {
        q: "Apakah Fusionify Solutions bisa membuat bot WhatsApp untuk order?",
        a: "Bisa. Bot WhatsApp dan bot Telegram untuk auto order, notifikasi pembayaran, dan customer service termasuk cakupan layanan ini. Contoh produk yang sudah dibangun adalah FUSIONIFY BOT.",
      },
      {
        q: "Apakah automation menggantikan admin?",
        a: "Tidak. Automation mengambil pekerjaan berulang, sementara keputusan penting tetap di tangan admin. Prinsip ini kami sebut human plus automation.",
      },
      {
        q: "Apakah bisa membuat bot yang melanggar aturan platform?",
        a: "Tidak. Kami tidak mengerjakan spam automation atau sistem yang melanggar ketentuan layanan platform seperti WhatsApp atau Telegram.",
      },
    ],
    audiences: ["umkm", "komunitas", "startup"],
    projects: ["fusionify-bot"],
  },
  "ai-solutions": {
    seoTitle: "Jasa Integrasi AI dan Chatbot",
    answer:
      "AI Solutions di Fusionify Solutions adalah integrasi AI ke proses kerja nyata, dikerjakan sejak 2025. Cakupannya meliputi AI assistant, chatbot berbasis knowledge, AI customer support, pemrosesan dokumen, klasifikasi dan ekstraksi data, LLM integration, serta automation yang menggabungkan AI dengan API, database, dan sistem yang sudah ada. Jika masalah bisa diselesaikan lebih sederhana tanpa AI, kami menyampaikannya.",
    faqs: [
      {
        q: "Sejak kapan Fusionify Solutions mengerjakan AI?",
        a: "Sejak 2025, Fusionify Solutions menangani AI integration, assistant, chatbot, intelligent automation, dan workflow berbasis AI.",
      },
      {
        q: "Apakah AI bisa membaca dokumen dan mengisi data otomatis?",
        a: "Bisa. AI document processing dan ekstraksi data termasuk cakupan layanan ini, biasanya dengan langkah review oleh manusia sebelum data disimpan.",
      },
      {
        q: "Apakah setiap project harus memakai AI?",
        a: "Tidak. AI hanya dipakai jika memberi manfaat nyata. Banyak masalah lebih tepat diselesaikan dengan automation atau sistem biasa.",
      },
    ],
    audiences: ["umkm", "sekolah", "startup", "komunitas"],
    projects: [],
  },
  "digital-systems": {
    seoTitle: "Jasa Integrasi API dan Sistem Digital",
    answer:
      "Digital Systems & Integration di Fusionify Solutions adalah pekerjaan menghubungkan sistem yang berbeda melalui REST API, webhook, integrasi pembayaran, integrasi database, middleware, dan custom backend, supaya data tidak perlu diketik ulang dan status tidak perlu dicek manual. Integrasi dilakukan sesuai API, dokumentasi, akses, dan kemampuan platform yang digunakan client.",
    faqs: [
      {
        q: "Apakah Fusionify Solutions bisa mengintegrasikan payment gateway?",
        a: "Bisa. Payment integration termasuk cakupan layanan ini, sesuai API dan dokumentasi yang disediakan penyedia pembayaran yang dipakai client.",
      },
      {
        q: "Bagaimana jika aplikasi yang ingin dihubungkan tidak punya API?",
        a: "Integrasi ke platform yang tidak menyediakan akses atau API yang dibutuhkan termasuk hal yang tidak kami kerjakan. Kami akan menyampaikannya sejak awal dan mencari alternatif bila ada.",
      },
    ],
    audiences: ["umkm", "startup", "sekolah"],
    projects: ["fusionify-bot", "lumbung"],
  },
  "cloud-deployment": {
    seoTitle: "Jasa Deployment, Server, dan Maintenance",
    answer:
      "Cloud, Deployment & Support di Fusionify Solutions adalah layanan deployment dan perawatan teknologi setelah aplikasi selesai dibuat: deployment ke Vercel atau VPS Linux, Cloudflare, konfigurasi domain, DNS, dan SSL, Docker, CI/CD, migrasi, backup terjadwal, monitoring dasar, bug fixing, dan troubleshooting.",
    faqs: [
      {
        q: "Apakah Fusionify Solutions menyediakan maintenance website?",
        a: "Ya. Maintenance dibuat terpisah sesuai kebutuhan project, mencakup bug fixing, update minor, dependency maintenance, pengecekan server, uptime monitoring, dan backup terjadwal.",
      },
      {
        q: "Apakah domain dan hosting didaftarkan atas nama client?",
        a: "Ya. Domain, akun, konten, dan aset client tetap milik client sesuai kesepakatan, sehingga client bisa pindah vendor kapan saja.",
      },
    ],
    audiences: ["umkm", "sekolah", "startup", "developer"],
    projects: [],
  },
  "project-assistance": {
    seoTitle: "Bantuan Project, Debugging, dan Mentoring",
    answer:
      "Project Assistance di Fusionify Solutions adalah bantuan teknis yang fleksibel berdasarkan scope yang disepakati: membantu menyelesaikan project, feature development, debugging, code review, prototype, proof-of-concept, deployment, testing, migrasi, setup server, Git dan GitHub, serta learning support berupa mentoring dan debugging bersama. Learning support tidak mencakup joki tugas.",
    faqs: [
      {
        q: "Apakah Fusionify Solutions menerima joki tugas kuliah?",
        a: "Tidak. Yang kami tawarkan adalah learning support: mentoring, penjelasan teknis, guided coding, dan debugging bersama supaya kamu memahami dan menyelesaikan pekerjaan sendiri.",
      },
      {
        q: "Apakah bisa minta bantuan debugging untuk satu masalah saja?",
        a: "Bisa. Pekerjaan teknis singkat seperti debugging, setup, atau konsultasi bisa dikerjakan dengan model hourly atau per task.",
      },
    ],
    audiences: ["developer", "startup", "komunitas"],
    projects: ["lumbung"],
  },
  "consulting-documentation": {
    seoTitle: "Konsultasi IT dan Dokumentasi Teknis",
    answer:
      "Consulting & Documentation di Fusionify Solutions adalah layanan perencanaan dan dokumentasi teknis: requirement discovery, konsultasi teknis, architecture review, system review, audit keamanan dasar, performance review, rekomendasi teknologi, PRD dan SRS, dokumentasi API, deployment runbook, dan dokumen handover.",
    faqs: [
      {
        q: "Apakah bisa konsultasi dulu sebelum memutuskan membuat sistem?",
        a: "Bisa. Requirement discovery dan konsultasi teknis membantu menentukan apa yang perlu dibangun, teknologi yang masuk akal, dan risikonya sebelum development dimulai.",
      },
      {
        q: "Apakah Fusionify Solutions bisa membuat dokumentasi untuk sistem yang sudah ada?",
        a: "Bisa, setelah meninjau codebase dan akses yang tersedia. Dokumentasi API, runbook deployment, dan dokumen handover termasuk cakupan layanan ini.",
      },
    ],
    audiences: ["startup", "sekolah", "developer"],
    projects: [],
  },
};

// Audience landing pages (/untuk/[slug]). Each one is written for a
// distinct reader, not generated from a single template sentence.
export type AudiencePage = {
  slug: string;
  audienceId: string;
  title: string;
  headline: string;
  intro: string;
  needs: string[];
  services: string[];
  projects: string[];
  faqs: QA[];
};

export const audiencePages: AudiencePage[] = [
  {
    slug: "umkm",
    audienceId: "umkm",
    title: "Solusi digital untuk UMKM",
    headline: "Order rapi, admin tidak kewalahan, pelanggan mudah menemukan kamu.",
    intro:
      "Fusionify Solutions membantu UMKM dan bisnis lokal membangun website, katalog digital, sistem order, bot WhatsApp, integrasi pembayaran, dan sistem operasional sederhana. Fokusnya pada solusi yang sesuai skala dan budget, bukan teknologi yang dibuat rumit.",
    needs: [
      "Order masih dicatat manual dari chat WhatsApp",
      "Pertanyaan pelanggan yang sama dijawab berulang kali",
      "Belum punya website atau katalog yang bisa dibagikan",
      "Pembayaran dicek satu per satu",
      "Rekap penjualan masih pakai catatan terpisah",
    ],
    services: ["web-development", "automation-bots", "digital-systems", "cloud-deployment"],
    projects: ["fusionify-bot", "premiumify"],
    faqs: [
      {
        q: "Apakah Fusionify Solutions menerima project UMKM yang kecil?",
        a: "Ya, selama kebutuhan dan scope-nya bisa didefinisikan dengan jelas. Project kecil seperti landing page, katalog online, atau bot order sederhana tetap dikerjakan.",
      },
      {
        q: "Berapa biaya membuat website atau bot untuk UMKM?",
        a: "Biaya ditentukan berdasarkan scope, kompleksitas, integrasi, timeline, dan kebutuhan support. Estimasi tertulis dikirim sebelum pekerjaan dimulai.",
      },
    ],
  },
  {
    slug: "sekolah",
    audienceId: "sekolah",
    title: "Solusi digital untuk sekolah",
    headline: "Website resmi, PPDB yang tertata, dan administrasi yang lebih ringan.",
    intro:
      "Fusionify Solutions membantu sekolah dan institusi pendidikan membangun website sekolah, halaman dan form PPDB, portal informasi, sistem administrasi ringan, dan dashboard. Salah satu project yang sudah berjalan adalah website SMK Pionir Bojonggede.",
    needs: [
      "Informasi PPDB tersebar di banyak grup chat",
      "Website sekolah lama sulit diperbarui",
      "Berkas pendaftaran dikumpulkan manual",
      "Orang tua sering menanyakan hal yang sama",
      "Data siswa dan alumni belum terpusat",
    ],
    services: ["web-development", "ai-solutions", "cloud-deployment", "consulting-documentation"],
    projects: ["smk-pionir"],
    faqs: [
      {
        q: "Apakah Fusionify Solutions pernah membuat website sekolah?",
        a: "Ya. Website SMK Pionir Bojonggede adalah project client yang sudah berjalan di production, mencakup profil, konsentrasi keahlian, galeri, pendaftaran alumni, dan informasi PPDB.",
      },
      {
        q: "Apakah pihak sekolah bisa memperbarui isi website sendiri?",
        a: "Bisa. Website dirancang supaya konten seperti informasi PPDB dapat diperbarui pihak sekolah, dan disertai dokumentasi saat handover.",
      },
    ],
  },
  {
    slug: "startup",
    audienceId: "startup",
    title: "Pengembangan MVP untuk startup",
    headline: "Dari ide produk ke MVP yang bisa diuji user pertama.",
    intro:
      "Fusionify Solutions membantu startup dan product builder membangun prototype, MVP, backend, API, dashboard, proof-of-concept, automation, dan integrasi sistem, dengan scope yang dikunci di awal supaya produk bisa diuji secepatnya.",
    needs: [
      "Ide sudah jelas, tim teknis belum ada",
      "Butuh MVP untuk validasi atau presentasi",
      "Backend dan API perlu fondasi yang bisa tumbuh",
      "Prototype perlu dideploy dan diuji di lapangan",
      "Butuh review arsitektur sebelum scale up",
    ],
    services: ["web-development", "digital-systems", "ai-solutions", "consulting-documentation"],
    projects: ["studydate", "lumbung"],
    faqs: [
      {
        q: "Apakah source code MVP diserahkan ke startup?",
        a: "Untuk custom development milik client, ownership dan handover dijelaskan sejak awal dalam perjanjian, termasuk source code dan dokumentasi.",
      },
      {
        q: "Model kerja sama apa yang cocok untuk MVP?",
        a: "Biasanya milestone-based untuk project menengah sampai besar, atau fixed project jika scope sudah jelas.",
      },
    ],
  },
  {
    slug: "komunitas",
    audienceId: "komunitas",
    title: "Solusi digital untuk komunitas dan organisasi",
    headline: "Portal, membership, dan event tanpa spreadsheet yang berantakan.",
    intro:
      "Fusionify Solutions membantu komunitas dan organisasi membangun portal komunitas, sistem membership, pendaftaran event, internal tools, informasi publik, dan workflow administratif, termasuk bot pengingat lewat Telegram atau WhatsApp.",
    needs: [
      "Data anggota tersebar di banyak file",
      "Pendaftaran event masih manual",
      "Pengumuman sering terlewat anggota",
      "Butuh halaman informasi publik yang resmi",
      "Alur persetujuan internal lambat",
    ],
    services: ["web-development", "automation-bots", "digital-systems", "project-assistance"],
    projects: ["studydate", "fusionify-bot"],
    faqs: [
      {
        q: "Apakah Fusionify Solutions menerima project komunitas atau kolaborasi?",
        a: "Ya. Selain project berbayar biasa, tersedia model kolaborasi untuk project khusus yang bentuk kompensasinya perlu dibahas terpisah.",
      },
    ],
  },
  {
    slug: "developer",
    audienceId: "developer",
    title: "Technical assistance untuk developer",
    headline: "Lagi buntu di bug, deploy, atau arsitektur? Kita bereskan bareng.",
    intro:
      "Fusionify Solutions membantu individu dan developer lewat technical assistance: debugging, code review, setup server, deployment, integrasi API, konsultasi arsitektur, Git dan GitHub, serta learning support berupa mentoring dan guided coding.",
    needs: [
      "Error yang belum ketemu penyebabnya",
      "Aplikasi jalan di lokal tapi gagal saat deploy",
      "Butuh second opinion untuk arsitektur",
      "Ingin belajar dengan didampingi, bukan dikerjakan",
      "Setup server, domain, atau SSL yang membingungkan",
    ],
    services: ["project-assistance", "cloud-deployment", "consulting-documentation"],
    projects: ["lumbung"],
    faqs: [
      {
        q: "Apakah bisa dibayar per jam atau per masalah?",
        a: "Bisa. Debugging, setup, konsultasi, atau pekerjaan teknis singkat cocok dengan model hourly atau per task.",
      },
      {
        q: "Apakah Fusionify Solutions mengerjakan tugas kuliah?",
        a: "Tidak. Kami menawarkan learning support seperti mentoring dan debugging bersama, bukan joki tugas atau pekerjaan yang diakui sebagai karya orang lain.",
      },
    ],
  },
];

export const getAudiencePage = (slug: string) => audiencePages.find((a) => a.slug === slug);

// Short, quotable facts for the About page and llms.txt.
export const keyFacts: { label: string; value: string }[] = [
  { label: "Nama", value: "FUSIONIFY SOLUTIONS (Fusionify Solutions)" },
  { label: "Badan hukum", value: "PT FUSIONIFY DIGITAL STORE (Perseroan Perorangan), Bogor" },
  { label: "Induk", value: "FUSIONIFY, lini layanan teknologi" },
  { label: "Mulai berjalan", value: "22 Desember 2022" },
  { label: "Layanan AI", value: "Sejak 2025" },
  {
    label: "Layanan",
    value:
      "Web Development, Automation & Bots, AI Solutions, Digital Systems & Integration, Cloud & Deployment, Project Assistance, Consulting & Documentation",
  },
  { label: "Melayani", value: "UMKM, sekolah, startup, komunitas, organisasi, individu dan developer" },
  { label: "Wilayah", value: "Indonesia" },
  { label: "Harga", value: "Berdasarkan scope, dengan estimasi tertulis sebelum mulai" },
  { label: "Kontak", value: "hello@fusionify.id, WhatsApp 0831-1138-0628" },
];
