import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, service, budget, message } = await req.json();

    // Validate inputs
    if (!name || !email || !service || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Save to database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error: dbError } = await supabase
      .from('consultation_requests')
      .insert({ name, email, company, service, budget, message });

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to save request' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ success: true, email_sent: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Fusionify <onboarding@resend.dev>',
        to: ['fusionifydigital@gmail.com'],
        subject: `[Konsultasi Baru] ${service} - ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a73e8;">📩 Permintaan Konsultasi Baru</h2>
            <hr style="border: 1px solid #eee;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px;">Nama</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Perusahaan</td><td style="padding: 8px 0;">${company || '-'}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Layanan</td><td style="padding: 8px 0; font-weight: bold;">${service}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Budget</td><td style="padding: 8px 0;">${budget || '-'}</td></tr>
            </table>
            <hr style="border: 1px solid #eee;" />
            <h3 style="color: #333;">Pesan:</h3>
            <p style="color: #444; line-height: 1.6; background: #f9f9f9; padding: 16px; border-radius: 8px;">${message}</p>
          </div>
        `,
      }),
    });

    const emailData = await emailRes.text();
    console.log('Resend response:', emailRes.status, emailData);

    return new Response(JSON.stringify({ success: true, email_sent: emailRes.ok }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
