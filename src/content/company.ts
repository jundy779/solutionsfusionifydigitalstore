export type Audience = {
  id: string;
  label: string;
  name: string;
  description: string;
  flow: { title: string; detail: string }[];
};

// Contoh alur di hero. Ilustrasi cara kerja, bukan klaim project tertentu.
export const audiences: Audience[] = [
  {
    id: "umkm",
    label: "UMKM",
    name: "UMKM & bisnis lokal",
    description:
      "Website, katalog digital, automation, sistem order, integrasi pembayaran, atau sistem operasional sederhana.",
    flow: [
      { title: "Katalog online", detail: "Pelanggan pilih produk" },
      { title: "Form order", detail: "Data langsung tersimpan" },
      { title: "WhatsApp", detail: "Admin dapat notifikasi" },
      { title: "Dashboard", detail: "Rekap order harian" },
    ],
  },
  {
    id: "sekolah",
    label: "Sekolah",
    name: "Sekolah & institusi pendidikan",
    description:
      "Website sekolah, PPDB, portal informasi, sistem administrasi ringan, dashboard, atau kebutuhan digital lainnya.",
    flow: [
      { title: "Website sekolah", detail: "Info PPDB terbaru" },
      { title: "Form PPDB", detail: "Berkas masuk rapi" },
      { title: "Notifikasi", detail: "Orang tua dapat konfirmasi" },
      { title: "Dashboard panitia", detail: "Status tiap pendaftar" },
    ],
  },
  {
    id: "startup",
    label: "Startup",
    name: "Startup & product builder",
    description:
      "Prototype, MVP, backend, API, dashboard, proof-of-concept, automation, dan integrasi sistem.",
    flow: [
      { title: "Ide produk", detail: "Scope MVP disepakati" },
      { title: "Backend & API", detail: "Fondasi yang bisa tumbuh" },
      { title: "Web app", detail: "Dipakai user pertama" },
      { title: "Deploy", detail: "Siap diuji di lapangan" },
    ],
  },
  {
    id: "komunitas",
    label: "Komunitas",
    name: "Komunitas & organisasi",
    description:
      "Portal komunitas, membership, event, internal tools, informasi publik, atau workflow administratif.",
    flow: [
      { title: "Portal komunitas", detail: "Info dan agenda" },
      { title: "Pendaftaran", detail: "Member dan event" },
      { title: "Bot Telegram", detail: "Pengingat otomatis" },
      { title: "Data anggota", detail: "Satu sumber yang rapi" },
    ],
  },
  {
    id: "developer",
    label: "Developer",
    name: "Individu & developer",
    description:
      "Technical assistance, debugging, setup server, integrasi API, konsultasi arsitektur, pembelajaran, atau kolaborasi project.",
    flow: [
      { title: "Repo bermasalah", detail: "Error yang belum ketemu" },
      { title: "Debugging bareng", detail: "Akar masalah dicari" },
      { title: "Perbaikan", detail: "Dijelaskan, bukan cuma ditambal" },
      { title: "Deploy ulang", detail: "Jalan lagi di server" },
    ],
  },
];

export const process = [
  {
    title: "Ceritakan kebutuhan",
    body: "Tidak wajib punya spesifikasi teknis. Cukup jelaskan masalah, ide, atau pekerjaan yang ingin diselesaikan.",
  },
  {
    title: "Discovery & scope",
    body: "Kami pelajari kebutuhan, cek feasibility, lalu tentukan scope, requirement, risiko, dan akses yang diperlukan.",
  },
  {
    title: "Proposal",
    body: "Kamu mendapat gambaran solusi, deliverables, timeline, biaya, jumlah revisi, dan maintenance bila ada.",
  },
  {
    title: "Development",
    body: "Pengerjaan bertahap dengan progress update dan review di setiap milestone yang relevan.",
  },
  {
    title: "Testing & review",
    body: "Fitur diuji, lalu kamu melakukan review atau UAT sesuai scope.",
  },
  {
    title: "Deployment & handover",
    body: "Deployment, akses, dokumentasi, dan penyerahan aset dilakukan sesuai kesepakatan.",
  },
  {
    title: "Maintenance",
    body: "Jika dibutuhkan, berlanjut ke maintenance atau pengembangan tahap berikutnya.",
  },
];

export const principles = [
  { title: "Solution first", body: "Teknologi dipilih setelah masalahnya dipahami." },
  {
    title: "Right-sized technology",
    body: "Tidak semua project butuh microservices, Kubernetes, atau AI.",
  },
  {
    title: "Transparent scope",
    body: "Scope, timeline, revisi, ownership, dan biaya dibahas sebelum development.",
  },
  {
    title: "Client ownership",
    body: "Domain, akun, konten, dan aset client tetap milik client sesuai kesepakatan.",
  },
  { title: "Build for handover", body: "Sistem tidak boleh cuma dimengerti oleh developer-nya." },
  {
    title: "Privacy & security",
    body: "Credential dan data sensitif tidak dipublikasikan atau dimasukkan sembarangan ke repository.",
  },
  {
    title: "Human + automation",
    body: "Automation membantu operasional, bukan menghilangkan kontrol manusia.",
  },
  {
    title: "Long-term maintainability",
    body: "Lebih baik solusi yang bisa dirawat daripada teknologi keren yang susah disentuh setelah enam bulan.",
  },
];

export const boundaries = [
  "Project ilegal",
  "Malware, phishing, atau pencurian credential",
  "Spam automation",
  "Sistem yang melanggar ToS platform",
  "Joki tugas, manipulasi akademik, atau impersonation",
  "Project tanpa scope yang bisa didefinisikan sama sekali",
  "Integrasi ke platform yang tidak menyediakan akses atau API yang dibutuhkan",
  "Kebutuhan enterprise compliance berat yang belum mampu kami penuhi",
];

export const engagements = [
  { name: "Fixed project", fit: "Scope dan deliverable sudah jelas sejak awal." },
  { name: "Milestone-based", fit: "Project menengah sampai besar, dibayar per tahap." },
  { name: "Hourly atau per task", fit: "Debugging, setup, konsultasi, atau pekerjaan teknis singkat." },
  { name: "Retainer & maintenance", fit: "Support berkelanjutan setelah sistem berjalan." },
  { name: "Kolaborasi", fit: "Project khusus yang bentuk kompensasinya perlu dibahas terpisah." },
];

export const history = [
  {
    year: "2022",
    date: "22 Desember 2022",
    title: "Fusionify Solutions dimulai",
    body: "Berawal dari kebutuhan project assistance, pekerjaan teknis, learning support, dan kolaborasi.",
  },
  {
    year: "2023–2024",
    title: "Pekerjaan teknis meluas",
    body: "Mulai menangani pengembangan web, automation, setup sistem, project assistance, dan kebutuhan teknis yang makin beragam.",
  },
  {
    year: "2025",
    title: "Integrasi AI",
    body: "Mulai menangani integrasi AI, assistant, automation, dan AI-powered workflow.",
  },
  {
    year: "2026",
    title: "Layanan software yang lebih luas",
    body: "Berkembang sebagai service arm FUSIONIFY yang mendukung pekerjaan client sekaligus kemampuan teknis ekosistem FUSIONIFY.",
  },
];

export const capabilities = [
  { group: "Web", items: ["React", "Next.js", "TypeScript", "Node.js"] },
  { group: "Data", items: ["PostgreSQL", "Supabase"] },
  { group: "Automation", items: ["Bot Telegram", "Bot WhatsApp", "Webhook", "REST API"] },
  { group: "AI", items: ["LLM integration", "Retrieval", "Document processing"] },
  { group: "Infrastruktur", items: ["Vercel", "VPS Linux", "Docker", "Cloudflare"] },
  { group: "Interaktif", items: ["Three.js"] },
];

export const faqs = [
  {
    q: "Apakah Fusionify Solutions hanya menerima pembuatan website?",
    a: "Tidak. Website adalah salah satu layanan. Kami juga menangani automation, bot, integrasi API, sistem internal, AI workflow, cloud dan deployment, project assistance, serta kebutuhan teknis lainnya.",
  },
  {
    q: "Apakah bisa mengerjakan project custom?",
    a: "Bisa. Sebagian besar pekerjaan kami dimulai dari kebutuhan client, bukan dari paket yang sudah ditentukan.",
  },
  {
    q: "Saya tidak paham teknis. Bisa tetap konsultasi?",
    a: "Bisa. Cukup jelaskan masalah, kebutuhan, atau target yang ingin dicapai. Urusan teknisnya kami terjemahkan.",
  },
  {
    q: "Apakah bisa melanjutkan sistem yang sudah ada?",
    a: "Bisa, setelah kami review codebase, teknologi, dokumentasi, dan akses yang tersedia.",
  },
  {
    q: "Apakah menerima project kecil?",
    a: "Ya, selama kebutuhan dan scope-nya bisa didefinisikan dengan jelas.",
  },
  {
    q: "Apakah tersedia maintenance?",
    a: "Ya. Maintenance dibuat terpisah sesuai kebutuhan project.",
  },
  {
    q: "Apakah source code diberikan?",
    a: "Tergantung model project dan perjanjian. Untuk custom development milik client, ownership dan handover dijelaskan sejak awal.",
  },
  {
    q: "Berapa biayanya?",
    a: "Harga ditentukan berdasarkan scope, kompleksitas, integrasi, timeline, dan kebutuhan support. Kamu akan menerima estimasi tertulis sebelum memutuskan apa pun.",
  },
  {
    q: "Apakah menggunakan AI?",
    a: "Ya. Sejak 2025 kami juga mengerjakan AI integration dan AI-assisted workflow. AI hanya dipakai jika memang memberi manfaat nyata.",
  },
  {
    q: "Apakah data client aman?",
    a: "Credential, database, file internal, dan informasi sensitif kami perlakukan sebagai informasi terbatas dan tidak dipublikasikan tanpa izin.",
  },
];
