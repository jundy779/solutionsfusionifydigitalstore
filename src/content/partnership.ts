import type { QA } from "./answers";

export type PartnerType = {
  id: string;
  title: string;
  who: string;
  offer: string[];
  example?: string;
};

export const partnerTypes: PartnerType[] = [
  {
    id: "agency",
    title: "Agency dan white-label",
    who: "Untuk agency kreatif, software house, konsultan, atau freelancer yang punya client tapi butuh tim teknis tambahan.",
    offer: [
      "Pengerjaan backend, bot, automation, integrasi API, dan deployment",
      "Bisa dikerjakan di bawah nama brand kamu ke client",
      "Perjanjian kerahasiaan (NDA) bila dibutuhkan",
      "Dokumentasi dan handover supaya tim kamu tetap pegang kendali",
    ],
  },
  {
    id: "kampus",
    title: "Kampus dan komunitas",
    who: "Untuk himpunan mahasiswa, UKM, komunitas teknologi, dan lembaga pendidikan yang ingin program teknisnya lebih dekat ke kebutuhan nyata.",
    offer: [
      "Workshop dan kelas teknis dengan studi kasus dari project sungguhan",
      "Mentoring project mahasiswa atau komunitas",
      "Dukungan teknis untuk program dan acara",
      "Kolaborasi program yang dibahas bersama sejak awal",
    ],
  },
  {
    id: "teknologi",
    title: "Teknologi dan integrasi",
    who: "Untuk penyedia payment gateway, hosting dan cloud, SaaS, atau API yang ingin layanannya dipakai di project nyata.",
    offer: [
      "Integrasi layanan kamu ke project client yang relevan",
      "Uji coba di produk ekosistem FUSIONIFY",
      "Masukan teknis dari sisi developer yang benar-benar memakai",
      "Dokumentasi integrasi yang bisa dipakai ulang",
    ],
    example: "FUSIONIFY BOT dan Premiumify, misalnya, sudah berjalan dengan pembayaran QRIS lewat payment gateway.",
  },
];

export const partnerSteps = [
  { title: "Kenalan", body: "Kirim profil singkat: siapa kamu, apa yang dikerjakan, dan bentuk kerja sama yang dibayangkan." },
  { title: "Diskusi awal", body: "Kami cek kecocokan kebutuhan, kapasitas, dan cara kerja kedua pihak." },
  { title: "Uji coba", body: "Kalau cocok, mulai dari satu project atau program kecil dulu supaya sama-sama bisa menilai." },
  { title: "Kesepakatan tertulis", body: "Peran, scope, kerahasiaan, dan skema komersial dicatat sebelum kerja sama berjalan rutin." },
];

export type SponsorTrack = {
  id: string;
  label: string;
  title: string;
  body: string;
  forms: string[];
  send: string[];
  note: string;
};

export const sponsorTracks: SponsorTrack[] = [
  {
    id: "kami-sponsori",
    label: "FUSIONIFY sebagai sponsor",
    title: "Punya acara? Ajukan dukungan dari kami.",
    body: "Kami mendukung acara kampus, hackathon, lomba, dan kegiatan komunitas yang bersinggungan dengan teknologi, pendidikan, atau UMKM.",
    forms: [
      "Dukungan teknis: website acara, form pendaftaran, atau bot pengingat peserta",
      "Mentor, pembicara, atau juri",
      "Produk dan layanan ekosistem FUSIONIFY sebagai fasilitas atau hadiah",
      "Dukungan dana untuk acara tertentu, dibahas per proposal",
    ],
    send: [
      "Nama acara, penyelenggara, dan tanggal",
      "Siapa pesertanya dan perkiraan jumlahnya",
      "Bentuk dukungan yang diminta",
      "Benefit yang ditawarkan untuk sponsor",
    ],
    note: "Sebaiknya proposal dikirim paling lambat tiga minggu sebelum acara, supaya ada waktu menyiapkan dukungan teknisnya.",
  },
  {
    id: "sponsori-kami",
    label: "Mensponsori FUSIONIFY",
    title: "Ingin menjangkau UMKM, sekolah, dan developer?",
    body: "Brand yang sejalan bisa mendukung program edukasi, workshop, dan produk ekosistem FUSIONIFY.",
    forms: [
      "Mendukung workshop dan program edukasi teknologi",
      "Mendukung pengembangan produk ekosistem FUSIONIFY",
      "Kolaborasi konten dan materi belajar",
      "Fasilitas atau layanan untuk peserta program",
    ],
    send: [
      "Profil brand dan produk yang ingin diperkenalkan",
      "Program atau audiens yang ingin didukung",
      "Bentuk dukungan dan periode kerja sama",
      "Harapan atau target dari kerja sama ini",
    ],
    note: "Benefit untuk sponsor dibahas sesuai bentuk dukungan. Satu hal yang tidak masuk paket apa pun: data pengguna kami tidak dijual atau dibagikan.",
  },
];

export const partnerFaqs: QA[] = [
  {
    q: "Apakah ada biaya untuk menjadi partner?",
    a: "Tidak ada biaya untuk mengajukan partnership. Skema komersial baru dibahas setelah kedua pihak merasa cocok, dan dicatat secara tertulis.",
  },
  {
    q: "Apakah agency bisa memakai nama brand sendiri ke client?",
    a: "Bisa. Untuk kerja sama white-label, pekerjaan teknis kami kerjakan di bawah nama brand partner. Kerahasiaan dan pembagian peran dicatat di perjanjian.",
  },
  {
    q: "Acara seperti apa yang bisa disponsori FUSIONIFY?",
    a: "Prioritas kami acara teknologi, pendidikan, dan UMKM, misalnya hackathon, lomba, seminar, atau kegiatan komunitas. Di luar itu tetap bisa diajukan dan kami pertimbangkan satu per satu.",
  },
  {
    q: "Apakah setiap proposal sponsorship pasti diterima?",
    a: "Tidak. Kami menyesuaikan dengan relevansi acara dan kapasitas saat itu. Kalau belum bisa membantu, kami sampaikan dengan jelas supaya penyelenggara bisa mencari dukungan lain.",
  },
  {
    q: "Bagaimana cara memulai?",
    a: "Kirim email atau WhatsApp dengan profil singkat dan bentuk kerja sama yang diinginkan. Untuk sponsorship, lampirkan proposal acara atau program.",
  },
];

export type Partner = {
  name: string;
  type: string;
  url: string;
  body: string;
  logo: { src: string; width: number; height: number };
  // Where the partner lists FUSIONIFY back, so visitors can verify it.
  mutual?: { label: string; url: string };
};

export const partners: Partner[] = [
  {
    name: "AutoGoPay",
    type: "Teknologi dan integrasi",
    url: "https://autogopay.site",
    body: "Payment gateway untuk menerima QRIS GoPay, ShopeePay, dan OVO lewat satu API, dengan webhook otomatis saat pembayaran lunas.",
    logo: { src: "/images/logos/autogopay.png", width: 640, height: 197 },
  },
  {
    name: "Gretongers Team",
    type: "Partner komunitas",
    url: "https://t.me/gretongersteamofficial",
    body: "Komunitas Telegram yang ikut menguji dan memberi masukan untuk aplikasi Fusion Tempest VPN, serta membantu mengenalkan produk FUSIONIFY ke anggotanya.",
    logo: { src: "/images/logos/gretongers.png", width: 400, height: 400 },
  },
];
