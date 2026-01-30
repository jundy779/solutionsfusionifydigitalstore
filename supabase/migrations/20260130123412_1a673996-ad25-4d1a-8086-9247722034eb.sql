-- Create the update_updated_at_column function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table for client/partner logos
CREATE TABLE public.client_logos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  is_partner BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

-- Create public read policy (logos are public content)
CREATE POLICY "Anyone can view active logos"
ON public.client_logos
FOR SELECT
USING (is_active = true);

-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true);

-- Create storage policy for public access to logos
CREATE POLICY "Anyone can view logos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'logos');

-- Create trigger for updated_at
CREATE TRIGGER update_client_logos_updated_at
BEFORE UPDATE ON public.client_logos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();