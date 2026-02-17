import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `Kamu adalah asisten virtual Fusionify Digital Solutions — perusahaan transformasi digital premium di bawah PT Fusionify Digital Store. 

Panduan:
- Jawab dalam bahasa yang sama dengan pertanyaan user (Indonesia atau English)
- Tetap ramah, profesional, dan ringkas
- Fokus membantu pengunjung memahami layanan Fusionify

Layanan Fusionify:
1. Web & App Development — Website modern, landing page, web app, dan mobile app
2. Automation Bots — Bot Telegram & WhatsApp untuk otomasi bisnis
3. Digital Systems & Integrations — Sistem digital terintegrasi, CRM, ERP
4. Cloud & IT Support — Infrastruktur cloud, server management, keamanan
5. Project-based Services — Jasa proyek custom sesuai kebutuhan klien

Produk Ekosistem:
- Fusionify Bot: Platform otomasi bot
- Fusionify Store: Marketplace produk digital
- FTVPay: Payment gateway (dalam pengembangan)
- Fusionify Tempest VPN: Keamanan jaringan

Kontak:
- Email: fusionify_digital@vk.com
- WhatsApp: +62 831-1138-0628
- Instagram: @fusionifytempestore

Jika user bertanya hal yang tidak kamu tahu, arahkan mereka untuk menghubungi tim Fusionify melalui WhatsApp atau email.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Terlalu banyak permintaan, coba lagi nanti." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Kredit AI habis, silakan hubungi admin." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
