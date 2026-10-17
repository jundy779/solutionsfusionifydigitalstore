import type { MetadataRoute } from "next";
import { audiencePages } from "@/content/answers";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: u("/"), lastModified: now, changeFrequency: "weekly", priority: 1, images: [u("/og.png")] },
    { url: u("/layanan/"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: u(`/layanan/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...audiencePages.map((a) => ({
      url: u(`/untuk/${a.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: u("/portfolio/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: u(`/portfolio/${p.slug}/`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      ...(p.image ? { images: [u(p.image.src)] } : {}),
    })),
    { url: u("/faq/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: u("/tentang/"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: u("/kontak/"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: u("/privasi/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
