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
  logo?: { src: string; width: number; height: number };
  links?: { label: string; url: string }[];
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
    logo: { src: "/images/logos/smk-pionir.png", width: 400, height: 399 },
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
    slug: "hadyva-interior",
    name: "HADYVA INTERIOR",
    category: "Interior, Web Development",
    origin: "client",
    status: "Production",
    statusTone: "go",
    url: "https://hadyvainterior.com",
    domain: "hadyvainterior.com",
    location: "Bojonggede, Bogor",
    logo: { src: "/images/logos/hadyva-interior.png", width: 600, height: 168 },
    image: {
      src: "/images/hadyva-interior.webp",
      alt: "Halaman depan website HADYVA INTERIOR dengan judul Custom Kitchen Set Specialist di atas foto dapur bernuansa gelap dan lampu hangat",
      width: 1440,
      height: 810,
    },
    summary:
      "Website company profile dan katalog untuk spesialis kitchen set dan interior custom yang melayani Bogor dan Jabodetabek.",
    problem:
      "Bisnis interior custom dijual lewat kepercayaan: calon pembeli ingin melihat hasil kerja nyata, pilihan material, dan kisaran harga sebelum berani minta survei. Tanpa website sendiri, semua itu tercecer di chat dan media sosial.",
    solution:
      "Website dengan nuansa premium yang menampilkan layanan, katalog kitchen set per kelas lengkap dengan harga per meter, portfolio proyek, testimoni, alur kerja dari konsultasi sampai serah terima, dan tombol konsultasi langsung ke WhatsApp. Ditambah blog artikel dan FAQ supaya mudah ditemukan lewat pencarian lokal.",
    scope: [
      "Company profile",
      "Katalog produk dan harga",
      "Portfolio proyek",
      "Testimoni klien",
      "Blog dan artikel SEO",
      "FAQ",
      "Konsultasi via WhatsApp",
      "Mode gelap",
    ],
  },
  {
    slug: "fusionify-bot",
    name: "FUSIONIFY BOT",
    category: "Automation, Commerce",
    origin: "fusionify",
    status: "Beroperasi",
    statusTone: "go",
    url: "https://bot.fusionify.id",
    domain: "bot.fusionify.id",
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
    slug: "fusion-tempest",
    name: "Fusion Tempest VPN",
    category: "Aplikasi Android, Networking",
    origin: "fusionify",
    status: "Google Play",
    statusTone: "go",
    url: "https://play.google.com/store/apps/details?id=fusion.tempest",
    domain: "Google Play",
    image: {
      src: "/images/fusion-tempest.webp",
      alt: "Ikon tiga aplikasi Fusion Tempest, FTV Injector, dan Fusionify Injector bersama tampilan layar aplikasinya di Android",
      width: 1440,
      height: 810,
    },
    summary:
      "Rangkaian aplikasi VPN Android yang dirilis di Google Play: Fusion Tempest, FTV Injector, dan Fusionify Injector, dengan total lebih dari 11 ribu unduhan.",
    problem:
      "Pengguna Android butuh koneksi yang terenkripsi dan stabil, tapi banyak aplikasi VPN menuntut pengaturan teknis yang rumit sebelum bisa dipakai. Di sisi lain, pengguna yang lebih paham teknis justru butuh kontrol penuh atas protokol dan konfigurasinya.",
    solution:
      "Tiga aplikasi untuk dua jenis pengguna. Fusion Tempest dibuat sesederhana mungkin: pilih konfigurasi, tekan satu tombol, lalu tersambung lewat SSH. FTV Injector menambahkan pilihan SSH, UDP, dan V2Ray dengan log koneksi yang bisa dipantau. Fusionify Injector ditujukan untuk pengguna teknis, dengan dukungan HTTP Proxy dan SSH, SSL/TLS, DNS tunnel, payload generator, serta ekspor dan impor konfigurasi, semuanya tanpa root. Ketiganya dirilis dan dikelola langsung di Google Play, termasuk pembaruan dan formulir keamanan data.",
    scope: [
      "Aplikasi Android",
      "Klien VPN multi-protokol",
      "SSH, SSL/TLS, DNS tunnel, V2Ray, UDP",
      "Koneksi satu ketukan",
      "Log koneksi",
      "Ekspor dan impor konfigurasi",
      "Tanpa root",
      "Rilis dan pembaruan di Google Play",
    ],
    technology: ["Android", "SSH", "SSL/TLS", "V2Ray"],
    links: [
      { label: "Fusion Tempest · 10 rb+ unduhan", url: "https://play.google.com/store/apps/details?id=fusion.tempest" },
      { label: "FTV Injector · 1 rb+ unduhan", url: "https://play.google.com/store/apps/details?id=com.ftv.injector" },
      { label: "Fusionify Injector · 500+ unduhan", url: "https://play.google.com/store/apps/details?id=com.fusionify.injector" },
    ],
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
    name: "Premiumify",
    category: "Digital Commerce",
    origin: "fusionify",
    status: "Beroperasi",
    statusTone: "go",
    url: "https://premiumify.my.id",
    domain: "premiumify.my.id",
    image: {
      src: "/images/premiumify.webp",
      alt: "Halaman depan Premiumify dengan judul Berhenti bayar empat langganan cukup satu harga dan perbandingan harga langganan",
      width: 1440,
      height: 810,
    },
    summary:
      "Toko produk digital premium dengan pembayaran QRIS dan pengiriman akun otomatis ke email, ditambah fitur member, referral, dan lacak pesanan.",
    problem:
      "Toko produk digital yang melayani pesanan lewat chat cepat kewalahan: setiap order harus dicek pembayarannya, lalu akunnya dikirim manual. Pembeli juga sulit memastikan pesanan mereka sudah sampai di tahap mana.",
    solution:
      "Storefront dengan katalog yang bisa dicari dan difilter, bundle produk, pembayaran QRIS tanpa kartu kredit, dan pengiriman akun otomatis ke email begitu pembayaran masuk. Pembeli bisa melacak pesanan sendiri, sementara fitur member dan referral membantu pelanggan kembali belanja. Bisa dipasang di layar HP seperti aplikasi, dan terhubung dengan FUSIONIFY BOT.",
    scope: [
      "Katalog, pencarian, dan filter harga",
      "Bundle produk",
      "Pembayaran QRIS",
      "Pengiriman otomatis ke email",
      "Lacak pesanan",
      "Member dan referral",
      "Mode gelap",
      "Web app untuk HP",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
