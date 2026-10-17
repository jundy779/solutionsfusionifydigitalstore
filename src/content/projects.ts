export type Project = {
  slug: string;
  name: string;
  category: string;
  origin: "client" | "fusionify";
  status?: string;
  location?: string;
  image?: { src: string; alt: string; width: number; height: number };
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
    category: "Platform Development",
    origin: "fusionify",
    summary: "Platform komunitas dan networking untuk pelajar dengan sistem yang mengutamakan privasi.",
    problem:
      "Pelajar butuh ruang untuk saling terhubung dan membangun jaringan, tanpa harus mengorbankan data pribadi.",
    solution:
      "Platform sosial dengan autentikasi dan pengaturan privasi yang dirancang sejak awal, bukan ditambal belakangan.",
    scope: ["Komunitas pelajar", "Networking", "Authentication", "Privacy-first system", "Social platform"],
  },
  {
    slug: "lumbung",
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
