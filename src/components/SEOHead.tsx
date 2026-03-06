import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://solutions.fusionifydigital.com";

export const SEOHead = ({ 
  title, 
  description, 
  path = "", 
  ogImage = "/og-image.png",
  jsonLd,
}: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    const canonicalUrl = `${BASE_URL}${path}`;
    const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

    // Helper to set or create meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImageUrl);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImageUrl);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // JSON-LD structured data
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
    existingScripts.forEach(s => s.remove());

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach(item => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    return () => {
      document.title = "Fusionify Digital Solutions | Solusi Transformasi Digital";
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach(s => s.remove());
    };
  }, [title, description, path, ogImage, jsonLd]);

  return null;
};
