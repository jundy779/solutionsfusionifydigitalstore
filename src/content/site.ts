export const site = {
  name: "FUSIONIFY SOLUTIONS",
  shortName: "Fusionify Solutions",
  legalName: "PT Fusionify Digital Store",
  url: "https://solutions.fusionify.id",
  tagline: "Solusi teknologi praktis untuk kebutuhan nyata.",
  description:
    "Website, automation, bot, integrasi API, sistem internal, dan AI workflow untuk UMKM, sekolah, startup, dan komunitas. Dibangun sampai benar-benar dipakai.",
  since: "22 Desember 2022",
  email: "hello@fusionify.id",
  whatsapp: "6283111380628",
  whatsappDisplay: "0831-1138-0628",
  masterBrand: "https://fusionify.id",
  // Profil resmi yang mewakili Fusionify Solutions (Instagram, LinkedIn,
  // Google Business Profile, GitHub organisasi, dll). Diisi URL lengkap.
  // Ini sinyal penting untuk Entity SEO: Google dan AI mencocokkan
  // website dengan profil-profil ini sebagai satu entitas.
  sameAs: [] as string[],
};

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "FUSIONIFY SOLUTIONS, solusi teknologi praktis untuk kebutuhan nyata",
};

export function waLink(text = "Halo Fusionify Solutions, saya mau diskusi kebutuhan.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/layanan/", label: "Layanan" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/#cara-kerja", label: "Cara kerja" },
  { href: "/tentang/", label: "Tentang" },
];
