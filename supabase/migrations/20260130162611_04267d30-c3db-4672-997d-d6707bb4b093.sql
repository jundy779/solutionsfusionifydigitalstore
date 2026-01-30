-- Create projects/portfolio table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  full_description TEXT,
  thumbnail_url TEXT,
  images TEXT[] DEFAULT '{}',
  client_name TEXT,
  client_logo_url TEXT,
  service_category TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  results TEXT[] DEFAULT '{}',
  live_url TEXT,
  completion_date DATE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view active projects" 
ON public.projects 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all projects" 
ON public.projects 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects" 
ON public.projects 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects" 
ON public.projects 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true);

-- Create storage policies for project images
CREATE POLICY "Anyone can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'projects' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'projects' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'projects' AND has_role(auth.uid(), 'admin'));

-- Insert sample projects
INSERT INTO public.projects (title, slug, description, full_description, service_category, technologies, results, is_featured, display_order) VALUES
('E-Commerce Platform Belanja Mudah', 'belanja-mudah-ecommerce', 'Platform e-commerce modern dengan fitur lengkap untuk UMKM fashion.', 'Mengembangkan platform e-commerce full-stack untuk brand fashion lokal dengan fitur keranjang belanja, payment gateway terintegrasi, dan dashboard admin untuk manajemen produk.', 'Web & App Development', ARRAY['React', 'Node.js', 'PostgreSQL', 'Midtrans'], ARRAY['200% peningkatan konversi', '50% pengurangan bounce rate', '3x lipat traffic organik'], true, 1),
('WhatsApp Bot Auto Order ServisKu', 'servisku-whatsapp-bot', 'Bot WhatsApp otomatis untuk sistem pemesanan service elektronik.', 'Membangun bot WhatsApp pintar yang menangani pemesanan service, tracking status, dan notifikasi otomatis ke pelanggan dan teknisi.', 'Automation Bots', ARRAY['Node.js', 'WhatsApp API', 'PostgreSQL', 'Redis'], ARRAY['Response time dari jam ke detik', '30+ jam/minggu dihemat', '24/7 availability'], true, 2),
('Integrasi CRM & Payment TechVenture', 'techventure-crm-integration', 'Integrasi sistem CRM dengan multiple payment gateway.', 'Mengintegrasikan Salesforce CRM dengan Xendit dan Midtrans untuk unified payment tracking dan customer management.', 'Digital Systems & API', ARRAY['Salesforce API', 'Xendit', 'Midtrans', 'Node.js'], ARRAY['Single source of truth', 'Eliminasi entry manual', 'Real-time sync'], true, 3),
('Cloud Infrastructure CloudFirst', 'cloudfirst-infrastructure', 'Setup infrastruktur cloud enterprise dengan high availability.', 'Merancang dan mengimplementasikan infrastruktur cloud dengan load balancing, auto-scaling, dan monitoring 24/7.', 'Cloud & IT Support', ARRAY['AWS', 'Docker', 'Kubernetes', 'Terraform'], ARRAY['99.99% uptime', '40% cost reduction', 'Auto-scaling'], false, 4),
('MVP Startup Nusantara', 'startup-nusantara-mvp', 'Pengembangan MVP dalam 6 minggu untuk startup fintech.', 'Membangun Minimum Viable Product untuk validasi ide bisnis startup dengan fokus pada core features dan user experience.', 'Project-Based Services', ARRAY['React Native', 'Firebase', 'Stripe', 'Node.js'], ARRAY['Launch dalam 6 minggu', 'Validasi product-market fit', '1000+ early adopters'], false, 5);