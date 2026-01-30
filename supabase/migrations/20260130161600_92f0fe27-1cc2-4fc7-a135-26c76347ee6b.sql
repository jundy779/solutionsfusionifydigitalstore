-- Create storage bucket for testimonial photos
INSERT INTO storage.buckets (id, name, public) VALUES ('testimonials', 'testimonials', true);

-- Create storage policies for testimonial photos
CREATE POLICY "Anyone can view testimonial photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonials');

CREATE POLICY "Admins can upload testimonial photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'testimonials' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonial photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'testimonials' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonial photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'testimonials' AND has_role(auth.uid(), 'admin'));