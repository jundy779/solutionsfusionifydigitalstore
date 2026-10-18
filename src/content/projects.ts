export type Project = {
  slug: string;
  name: string;
  category: string;
  origin: "client" | "fusionify";
  status?: string;
  statusTone?: "go" | "beta" | "wip" | "plan";
  url?: string;
  location?: string;
  image?: { src: string; alt: string; width: number; height: number };
  domain?: string;
  cover?: "chat" | "people" | "warehouse" | "store";
  summary: string;
  problem: string;
  solution: string;
  scope: string[];
  technology?: string[];
};

// Catatan: problem dan solution ditulis dari fokus project di brief.
// Lengkapi dengan data asli (hasil, angka, tautan) sebelum dipakai untuk klaim apa pun.
export const projects: Project[] = [
  {
    slug: "smk-pionir",
    name: "SMK Pionir Bojonggede",
    category: "Pendidikan, Web Development",
    origin: "client",
    status: "Production",
    statusTone: "go",
    location: "Bojonggede, Bogor",
    image: {
      src: "/images/smk-pionir.webp",
      alt: "Halaman depan website SMK Pionir Bojonggede dengan menu PPDB 2026 dan foto siswa",
      width: 1600,
      height: 900,
    },
    summary: "Website resmi sekolah untuk informasi publik, profil, dan kebutuhan PPDB.",
    problem:
      "Sekolah butuh satu tempat resmi untuk informasi yang dicari calon siswa, orang tua, dan alumni, termasuk informasi PPDB yang berubah setiap tahun.",
    solution:
      "Platform web sekolah dengan profil, konsentrasi keahlian, direktori, galeri, pendaftaran alumni, dan halaman PPDB yang bisa diperbarui pihak sekolah.",
    scope: ["Digital presence", "Informasi sekolah", "Web platform", "Informasi PPDB"],
  },
  {
    slug: "fusionify-bot",
    cover: "chat",
    name: "FUSIONIFY BOT",
    category: "Automation, Commerce",
    origin: "fusionify",
    summary: "Bot Telegram dan WhatsApp untuk order, pembayaran, dan pengiriman produk digital.",
    problem:
      "Penjualan produk digital lewat chat menghabiskan waktu admin: menjawab pertanyaan yang sama, mengecek pembayaran, lalu mengirim produk satu per satu.",
    solution:
      "Bot yang menjalankan alur order dari awal sampai produk terkirim, dengan panel admin untuk operasional harian.",
    scope: ["Telegram", "WhatsApp", "Order workflow", "Payment", "Digital delivery", "Admin operation"],
  },
  {
    slug: "studydate",
    name: "StudyDate.id",
    category: "Platform Development, Komunitas Kampus",
    origin: "fusionify",
    status: "Akses awal",
    statusTone: "beta",
    url: "https://studydate.id",
    domain: "studydate.id",
    image: {
      src: "/images/studydate.webp",
      alt: "Halaman depan StudyDate.id dengan judul Temukan teman baru lewat hal yang kamu suka dan contoh profil mahasiswa tanpa nama asli",
      width: 1440,
      height: 810,
    },
    summary:
      "Platform untuk mahasiswa dan alumni Indonesia mencari teman belajar, gabung circle, dan menemukan acara kampus tanpa langsung membuka nama atau kontak.",
    problem:
      "Mahasiswa butuh cara berkenalan lewat minat yang sama, tapi platform sosial biasa memaksa membuka nama, foto, dan kontak sejak awal. Itu membuat banyak orang ragu untuk mulai.",
    solution:
      "Alur kenalan bertahap: lihat profil tanpa nama asli, kirim perkenalan singkat, ngobrol setelah diterima, lalu identitas dibuka pelan-pelan kalau kedua pihak setuju. Dilengkapi circle belajar 3 sampai 30 orang dan daftar acara kampus.",
    scope: [
      "Cari teman berdasarkan minat dan kampus",
      "Circle belajar",
      "Acara kampus dan tiket",
      "Profil tanpa nama asli",
      "Persetujuan dua arah sebelum kontak dibagikan",
      "Block, report, dan akhiri ruang",
      "Pendaftaran akses awal",
    ],
    technology: ["Next.js"],
  },
  {
    slug: "lumbung",
    cover: "warehouse",
    name: "Lumbung",
    category: "Eksperimen, Interactive System",
    origin: "fusionify",
    summary: "Visualisasi gudang 3D dengan simulasi real-time dan dashboard operasional.",
    problem:
      "Kondisi gudang sulit dibayangkan hanya dari tabel stok. Eksperimen ini menguji apakah visualisasi ruang membantu membaca operasional lebih cepat.",
    solution:
      "Sistem interaktif berbasis Three.js yang menggabungkan simulasi real-time dengan dashboard operasional.",
    scope: ["Three.js", "Real-time simulation", "Operational dashboard", "Warehouse visualization"],
    technology: ["Three.js"],
  },
  {
    slug: "premiumify",
    cover: "store",
    name: "Premiumify",
    category: "Digital Commerce",
    origin: "fusionify",
    summary: "Storefront produk digital dengan ekosistem seller, membership, dan PWA.",
    problem:
      "Toko produk digital kecil butuh etalase yang rapi, bisa dipasang di HP seperti aplikasi, dan mudah dikelola.",
    solution:
      "Storefront dengan ekosistem seller, membership, serta manajemen konten dan produk, dikemas sebagai PWA.",
    scope: ["Storefront", "Seller ecosystem", "PWA", "Membership", "Content dan product management"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
