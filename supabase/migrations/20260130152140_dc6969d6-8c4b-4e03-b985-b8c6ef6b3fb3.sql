-- Create FAQs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Public can view active FAQs
CREATE POLICY "Anyone can view active FAQs"
ON public.faqs
FOR SELECT
USING (is_active = true);

-- Admins can view all FAQs
CREATE POLICY "Admins can view all FAQs"
ON public.faqs
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can insert FAQs
CREATE POLICY "Admins can insert FAQs"
ON public.faqs
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can update FAQs
CREATE POLICY "Admins can update FAQs"
ON public.faqs
FOR UPDATE
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Admins can delete FAQs
CREATE POLICY "Admins can delete FAQs"
ON public.faqs
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default FAQ data
INSERT INTO public.faqs (question, answer, display_order) VALUES
('Apa saja layanan yang ditawarkan Fusionify?', 'Fusionify menyediakan layanan lengkap transformasi digital termasuk Web & App Development, Automation Bots (WhatsApp & Telegram), Digital Systems & API Integration, Cloud & IT Support, serta Project-Based Services seperti MVP Development dan System Audit.', 1),
('Berapa lama waktu pengerjaan project?', 'Waktu pengerjaan bervariasi tergantung kompleksitas project. Website landing page biasanya 1-2 minggu, aplikasi web custom 4-8 minggu, dan sistem enterprise 2-4 bulan. Kami akan memberikan timeline detail setelah konsultasi awal.', 2),
('Apakah ada garansi untuk layanan yang diberikan?', 'Ya, kami memberikan garansi maintenance selama 30 hari setelah project selesai. Selama periode ini, kami akan memperbaiki bug atau issue tanpa biaya tambahan. Untuk support jangka panjang, tersedia paket maintenance bulanan.', 3),
('Bagaimana proses kerja sama dengan Fusionify?', 'Proses dimulai dengan konsultasi gratis untuk memahami kebutuhan Anda. Kemudian kami menyiapkan proposal dan timeline. Setelah deal, kami mulai development dengan update progress berkala. Project diserahkan setelah testing dan approval Anda.', 4),
('Apakah Fusionify menerima project dari luar Indonesia?', 'Tentu! Kami melayani klien dari berbagai negara. Komunikasi bisa dilakukan dalam Bahasa Indonesia atau English melalui video call, WhatsApp, atau email sesuai preferensi Anda.', 5),
('Berapa biaya untuk membuat aplikasi atau website?', 'Biaya tergantung pada scope dan fitur yang dibutuhkan. Kami menawarkan berbagai paket mulai dari landing page hingga sistem enterprise. Hubungi kami untuk konsultasi gratis dan dapatkan penawaran yang sesuai dengan budget Anda.', 6),
('Apakah saya bisa request revisi selama pengerjaan?', 'Ya, revisi adalah bagian dari proses development kami. Setiap milestone akan di-review bersama dan Anda bisa memberikan feedback. Jumlah revisi yang termasuk dalam paket akan dijelaskan di proposal.', 7),
('Teknologi apa yang digunakan Fusionify?', 'Kami menggunakan teknologi modern seperti React, Next.js, Node.js, Python, dan berbagai cloud platform (AWS, Google Cloud, Supabase). Pemilihan tech stack disesuaikan dengan kebutuhan project untuk hasil optimal.', 8);