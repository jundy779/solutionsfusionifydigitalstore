import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/layanan/", "/portfolio/", "/tentang/", "/kontak/", "/privasi/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/layanan/${s.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/portfolio/${p.slug}/`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
