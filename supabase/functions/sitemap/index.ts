import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch active projects for dynamic URLs
    const { data: projects } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("is_active", true)
      .order("display_order");

    const baseUrl = "https://solutions.fusionifydigital.com";
    const now = new Date().toISOString().split("T")[0];

    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/portfolio", priority: "0.9", changefreq: "weekly" },
      { url: "/services/web-development", priority: "0.8", changefreq: "monthly" },
      { url: "/services/automation-bots", priority: "0.8", changefreq: "monthly" },
      { url: "/services/digital-systems", priority: "0.8", changefreq: "monthly" },
      { url: "/services/cloud-support", priority: "0.8", changefreq: "monthly" },
      { url: "/services/project-services", priority: "0.8", changefreq: "monthly" },
      { url: "/ecosystem", priority: "0.7", changefreq: "monthly" },
      { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
      { url: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
    ];

    const projectUrls = (projects || []).map((p) => ({
      url: `/portfolio/${p.slug}`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: p.updated_at ? p.updated_at.split("T")[0] : now,
    }));

    const allUrls = [...staticPages, ...projectUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${("lastmod" in page ? page.lastmod : now)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    console.error("Sitemap generation error:", e);
    return new Response(JSON.stringify({ error: "Failed to generate sitemap" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
