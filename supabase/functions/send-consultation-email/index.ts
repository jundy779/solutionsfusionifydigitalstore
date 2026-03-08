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

    // Send notification email to admin
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
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

    const adminEmailData = await adminEmailRes.text();
    console.log('Admin email response:', adminEmailRes.status, adminEmailData);

    // Send auto-reply confirmation email to client
    const clientEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Fusionify <onboarding@resend.dev>',
        to: [email],
        subject: `Terima Kasih, ${name}! Permintaan Konsultasi Anda Telah Diterima`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #1a73e8, #0d47a1); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Permintaan Diterima!</h1>
            </div>
            <div style="padding: 32px 24px;">
              <p style="color: #333; font-size: 16px; line-height: 1.6;">Halo <strong>${name}</strong>,</p>
              <p style="color: #555; font-size: 15px; line-height: 1.7;">Terima kasih telah menghubungi <strong>Fusionify Digital Solutions</strong>! Kami telah menerima permintaan konsultasi Anda dan tim kami akan segera meninjau detail yang Anda kirimkan.</p>
              
              <div style="background: #f8f9fa; border-left: 4px solid #1a73e8; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
                <p style="margin: 0 0 8px 0; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Ringkasan Permintaan</p>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 6px 0; color: #888; font-size: 14px; width: 100px;">Layanan</td><td style="padding: 6px 0; color: #333; font-size: 14px; font-weight: 600;">${service}</td></tr>
                  ${budget ? `<tr><td style="padding: 6px 0; color: #888; font-size: 14px;">Budget</td><td style="padding: 6px 0; color: #333; font-size: 14px;">${budget}</td></tr>` : ''}
                  ${company ? `<tr><td style="padding: 6px 0; color: #888; font-size: 14px;">Perusahaan</td><td style="padding: 6px 0; color: #333; font-size: 14px;">${company}</td></tr>` : ''}
                </table>
              </div>

              <p style="color: #555; font-size: 15px; line-height: 1.7;">Kami biasanya merespons dalam <strong>1×24 jam</strong> di hari kerja. Jika ada hal mendesak, silakan hubungi kami langsung melalui WhatsApp.</p>
              
              <div style="text-align: center; margin: 32px 0 16px;">
                <a href="https://wa.me/6281234567890" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Hubungi via WhatsApp</a>
              </div>
            </div>
            <div style="background: #f8f9fa; padding: 20px 24px; border-radius: 0 0 12px 12px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 13px; margin: 0;">© ${new Date().getFullYear()} Fusionify Digital Solutions</p>
              <p style="color: #bbb; font-size: 12px; margin: 4px 0 0;">Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
            </div>
          </div>
        `,
      }),
    });

    const clientEmailData = await clientEmailRes.text();
    console.log('Client auto-reply response:', clientEmailRes.status, clientEmailData);

    return new Response(JSON.stringify({ 
      success: true, 
      admin_email_sent: adminEmailRes.ok,
      client_email_sent: clientEmailRes.ok 
    }), {
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
