-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_initials TEXT NOT NULL,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view active testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can view all testimonials" 
ON public.testimonials 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial testimonials data
INSERT INTO public.testimonials (name, role, company, quote, avatar_initials, image_url, display_order) VALUES
('Ahmad Rizki', 'CEO', 'TechVenture Indonesia', 'Fusionify transformed our entire business operations. The automation bots they built saved us 30+ hours per week on repetitive tasks.', 'AR', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 1),
('Sarah Putri', 'Marketing Director', 'Belanja Mudah', 'Professional team with exceptional delivery. Our e-commerce platform saw a 200% increase in conversions after their redesign.', 'SP', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', 2),
('Budi Santoso', 'Operations Manager', 'ServisKu', 'The WhatsApp bot integration was a game-changer for our customer service. Response time dropped from hours to seconds.', 'BS', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 3),
('Diana Wijaya', 'CTO', 'CloudFirst Solutions', 'Fusionify''s cloud solutions gave us the scalability we needed. Their 24/7 support is truly world-class.', 'DW', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 4),
('Hendro Kusuma', 'Founder', 'StartupNusantara', 'From concept to launch in just 6 weeks. The team''s expertise in digital transformation is unmatched.', 'HK', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 5);