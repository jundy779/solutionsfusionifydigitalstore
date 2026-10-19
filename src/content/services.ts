export type ScopeGroup = { title?: string; items: string[] };

export type Service = {
  slug: string;
  name: string;
  summary: string;
  headline: string;
  body: string[];
  scope: ScopeGroup[];
  note?: string;
  since?: string;
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    summary: "Website dan web app yang terhubung dengan proses bisnis.",
    headline: "Website yang tersambung ke cara kerja kamu.",
    body: [
      "Website dan web application kami bangun sesuai kebutuhan, bukan template satu ukuran untuk semua.",
      "Yang kami kejar bukan sekadar halaman yang tampil bagus. Form yang diisi pelanggan bisa masuk ke database, memicu email atau WhatsApp, lalu muncul di dashboard admin. Website jadi bagian dari operasional, bukan brosur digital.",
    ],
    scope: [
      {
        items: [
          "Landing page",
          "Company profile",
          "Website sekolah",
          "Website portfolio",
          "E-commerce",
          "Katalog online",
          "Dashboard",
          "Internal web app",
          "SaaS dan web platform",
          "Admin panel",
          "Backend dan API",
          "Aplikasi Android dan rilis ke Google Play",
          "Maintenance website",
          "Perbaikan website yang sudah ada",
        ],
      },
    ],
  },
  {
    slug: "automation-bots",
    name: "Automation & Bots",
    summary: "Bot Telegram, WhatsApp, dan workflow otomatis untuk pekerjaan berulang.",
    headline: "Kurangi pekerjaan berulang, bukan manusianya.",
    body: [
      "Kami membangun automation untuk pekerjaan repetitif: menerima request, mengirim notifikasi, memproses order, memperbarui status, menghubungkan sistem, dan menjalankan workflow secara otomatis.",
      "Admin tetap memegang kendali. Automation mengambil bagian yang membosankan, keputusan penting tetap di tangan orang.",
    ],
    scope: [
      {
        items: [
          "Telegram bot",
          "WhatsApp bot",
          "Auto order",
          "Automation customer service",
          "Bot notifikasi",
          "Approval workflow",
          "Scheduled task",
          "Broadcast automation",
          "Pemrosesan order",
          "Notifikasi pembayaran",
          "Sinkronisasi data",
          "Dashboard automation",
          "Custom workflow",
        ],
      },
    ],
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    since: "2025",
    summary: "AI yang masuk ke workflow, dari assistant sampai pemrosesan dokumen.",
    headline: "AI yang masuk ke workflow, bukan cuma chatbox.",
    body: [
      "Kami membantu mengintegrasikan AI ke proses kerja nyata. Mulai dari assistant internal, chatbot berbasis knowledge, pemrosesan dokumen, klasifikasi data, hingga automation yang menggabungkan AI dengan API, database, dan sistem bisnis lainnya.",
      "Setiap implementasi dirancang sesuai kebutuhan. Jika masalah bisa diselesaikan lebih sederhana tanpa AI, kami juga akan mengatakan demikian.",
    ],
    scope: [
      {
        title: "Assistant dan chatbot",
        items: [
          "AI assistant",
          "AI chatbot",
          "AI customer support",
          "AI knowledge assistant",
          "Retrieval dan knowledge search",
        ],
      },
      {
        title: "Workflow dan integrasi",
        items: [
          "AI workflow automation",
          "AI-powered internal tools",
          "LLM integration",
          "API-based AI integration",
          "Integrasi AI ke sistem yang sudah ada",
          "Human-in-the-loop workflow",
        ],
      },
      {
        title: "Dokumen dan data",
        items: [
          "AI document processing",
          "AI content assistance",
          "Klasifikasi dan ekstraksi data",
        ],
      },
      {
        title: "Riset",
        items: ["Eksperimen AI agent", "Prompt dan context engineering"],
      },
    ],
  },
  {
    slug: "digital-systems",
    name: "Digital Systems & Integration",
    summary: "API, webhook, pembayaran, database, dan dashboard yang saling terhubung.",
    headline: "Sistem yang berbeda seharusnya bisa saling bicara.",
    body: [
      "Banyak bisnis memakai beberapa aplikasi yang tidak saling kenal. Data diketik ulang, status dicek manual, laporan dirangkum dengan copy-paste. Kami menghubungkan sistem-sistem itu supaya data mengalir sendiri.",
    ],
    scope: [
      {
        items: [
          "REST API integration",
          "Webhook integration",
          "Payment integration",
          "Database integration",
          "Third-party API",
          "Integrasi sistem internal",
          "Sinkronisasi data",
          "Dashboard",
          "Middleware",
          "Custom backend",
          "Perbaikan workflow lama",
        ],
      },
    ],
    note: "Integrasi dilakukan sesuai API, dokumentasi, akses, dan kemampuan platform yang digunakan client.",
  },
  {
    slug: "cloud-deployment",
    name: "Cloud, Deployment & Support",
    summary: "Deployment, server, domain, backup, dan maintenance setelah aplikasi jadi.",
    headline: "Setelah aplikasi selesai dibuat, teknologinya tetap perlu dirawat.",
    body: [
      "Kami membantu deployment, konfigurasi domain dan server, monitoring dasar, backup, maintenance, dan troubleshooting agar sistem tetap dapat digunakan dengan baik.",
    ],
    scope: [
      {
        title: "Cloud dan deployment",
        items: [
          "Deployment Vercel",
          "Cloudflare",
          "Setup VPS",
          "Linux server",
          "Domain dan DNS",
          "SSL",
          "Deployment database",
          "Docker",
          "Konfigurasi backup",
          "Basic monitoring",
          "Setup CI/CD",
          "Migrasi",
          "Konfigurasi environment",
          "Troubleshooting",
        ],
      },
      {
        title: "Maintenance",
        items: [
          "Bug fixing",
          "Update minor",
          "Dependency maintenance",
          "Pengecekan server",
          "Uptime monitoring",
          "Scheduled backup",
          "Technical assistance",
        ],
      },
    ],
  },
  {
    slug: "project-assistance",
    name: "Project Assistance",
    summary: "Bantuan project, troubleshooting, learning support, dan kolaborasi.",
    headline: "Tidak semua kebutuhan cocok dimasukkan ke paket.",
    body: [
      "Untuk kebutuhan custom, project assistance, pembelajaran, troubleshooting, eksperimen, atau kolaborasi, Fusionify Solutions dapat bekerja secara fleksibel berdasarkan scope yang disepakati.",
      "Learning support di sini artinya mendampingi kamu memahami dan menyelesaikan pekerjaan sendiri. Kami tidak menerima joki tugas atau pekerjaan yang diakui sebagai karya orang lain.",
    ],
    scope: [
      {
        title: "Project assistance",
        items: [
          "Membantu menyelesaikan project",
          "Feature development",
          "Debugging",
          "Code review",
          "Prototype",
          "Proof-of-concept",
          "Deployment",
          "Research",
          "Dokumentasi",
          "Testing",
          "Migrasi",
          "Improvement",
        ],
      },
      {
        title: "Technical assistance",
        items: [
          "Setup",
          "Troubleshooting",
          "Server",
          "Database",
          "API",
          "Hosting",
          "Git dan GitHub",
          "Deployment",
          "Konfigurasi software",
        ],
      },
      {
        title: "Learning support",
        items: [
          "Mentoring",
          "Penjelasan teknis",
          "Guided coding",
          "Debugging bersama",
          "Review project",
        ],
      },
      {
        title: "Kolaborasi",
        items: [
          "Kolaborasi produk",
          "Partnership teknis",
          "Project eksperimen",
          "Project komunitas",
          "Prototyping",
          "Riset dan eksplorasi",
        ],
      },
    ],
  },
  {
    slug: "consulting-documentation",
    name: "Consulting & Documentation",
    summary: "Discovery, review arsitektur, audit dasar, dan dokumentasi teknis.",
    headline: "Rencanakan dulu, baru bangun.",
    body: [
      "Kadang yang dibutuhkan belum kode, tapi kejelasan. Apa yang sebenarnya perlu dibangun, teknologi apa yang masuk akal, risiko apa yang perlu diantisipasi, dan bagaimana sistem diserahkan supaya bisa dirawat orang lain.",
    ],
    scope: [
      {
        title: "Konsultasi dan review",
        items: [
          "Requirement discovery",
          "Konsultasi teknis",
          "Architecture review",
          "System review",
          "Audit keamanan dasar",
          "Performance review",
          "Rekomendasi teknologi",
          "Perencanaan teknis produk",
        ],
      },
      {
        title: "Dokumentasi",
        items: [
          "PRD dan SRS",
          "Dokumentasi API",
          "Dokumentasi teknis",
          "Deployment runbook",
          "Dokumen handover",
        ],
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
