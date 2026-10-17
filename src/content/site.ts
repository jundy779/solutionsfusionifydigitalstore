export const site = {
  name: "FUSIONIFY SOLUTIONS",
  shortName: "Fusionify Solutions",
  url: "https://solutions.fusionify.id",
  tagline: "Solusi teknologi praktis untuk kebutuhan nyata.",
  description:
    "Fusionify Solutions membantu UMKM, sekolah, startup, komunitas, dan individu membangun website, automation, bot, integrasi API, sistem internal, dan AI workflow yang benar-benar bisa dipakai.",
  since: "22 Desember 2022",
  email: "hello@fusionify.id",
  whatsapp: "6283111380628",
  whatsappDisplay: "0831-1138-0628",
  masterBrand: "https://fusionify.id",
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
