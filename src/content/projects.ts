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
    name: "FUSIONIFY BOT",
    category: "Automation, Commerce",
    origin: "fusionify",
    status: "Beroperasi",
    statusTone: "go",
    url: "https://bot.fusionifydigital.com",
    domain: "bot.fusionifydigital.com",
    image: {
      src: "/images/fusionify-bot.webp",
      alt: "Halaman depan FUSIONIFY Bot dengan judul Punya Bot Jualan Otomatis di Telegram dan contoh percakapan bot memilih produk",
      width: 1440,
      height: 810,
    },
    summary:
      "Layanan sewa bot auto order Telegram untuk penjual produk digital: katalog dengan tombol, pembayaran QRIS otomatis, dan pengiriman produk tanpa admin standby.",
    problem:
      "Penjual produk digital kecil menghabiskan waktu di chat: mengirim daftar produk, menunggu bukti transfer, mengecek mutasi, lalu mengirim akun atau kode satu per satu. Kalau admin tidur, toko ikut tutup.",
    solution:
      "Bot Telegram dengan menu tombol penuh. Pembeli memilih produk, membayar lewat QRIS, dan pembayaran dicek otomatis lewat payment gateway, lalu produk terkirim tanpa campur tangan admin. Penjual cukup mengatur produk dan stok dari panel. Ekosistemnya juga mencakup bot daftar produk untuk WhatsApp dan sewa panel Pterodactyl.",
    scope: [
      "Bot auto order Telegram",
      "Menu tombol interaktif",
      "Pembayaran QRIS otomatis",
      "Pengiriman produk digital",
      "Manajemen produk dan stok",
      "Bot daftar produk WhatsApp",
      "Sewa panel Pterodactyl",
    ],
    technology: ["Telegram Bot API", "QRIS payment gateway"],
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
    name: "Lumbung",
    category: "Interactive System, Logistik",
    origin: "fusionify",
    status: "Demo interaktif",
    statusTone: "beta",
    url: "https://lumbung.fusionify.id",
    domain: "lumbung.fusionify.id",
    image: {
      src: "/images/lumbung.webp",
      alt: "Dashboard Lumbung menampilkan gudang 3D Hub Cibinong dengan truk di dock, forklift, kartu stok, dan pelacakan pengiriman",
      width: 1440,
      height: 810,
    },
    summary:
      "Pusat kendali gudang dalam tampilan 3D: dock, truk, forklift, stok, dan pengiriman di lima gudang terlihat dalam satu layar.",
    problem:
      "Manajer operasional gudang biasanya membaca kondisi lapangan dari tabel stok dan laporan terpisah. Untuk tahu dock mana yang penuh atau truk mana yang tertahan, mereka harus menyusun gambarnya sendiri di kepala.",
    solution:
      "Dashboard yang menampilkan gudang sebagai ruang 3D yang bisa diputar dan diperbesar. Truk, forklift, dan palet bergerak mengikuti data operasional, lengkap dengan kartu KPI, panel detail tiap gudang, inventaris, dan pelacakan pengiriman per tahap. Semua data juga bisa dibuka sebagai tabel biasa tanpa 3D. Saat ini datanya berasal dari simulator demo dan dirancang supaya nantinya bisa diganti data WMS atau GPS asli tanpa mengubah tampilan.",
    scope: [
      "Visualisasi 3D lima gudang",
      "Status dock dan antrean truk",
      "Pergerakan forklift dan palet",
      "KPI stok dan ketepatan pengiriman",
      "Pelacakan pengiriman per tahap",
      "Tampilan tabel tanpa 3D",
      "Mode sinematik",
      "Simulator operasional",
    ],
    technology: ["Three.js", "JavaScript"],
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
