-- Fix: restrict admin RLS policies to authenticated role so anonymous users don't
-- evaluate has_role() and trigger "permission denied for function has_role".
-- Public SELECT policies (e.g. is_active = true) remain open to anon.

-- ===================== public.faqs =====================
DROP POLICY IF EXISTS "Admins can view all FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can insert FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can update FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can delete FAQs" ON public.faqs;

CREATE POLICY "Admins can view all FAQs"
  ON public.faqs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert FAQs"
  ON public.faqs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update FAQs"
  ON public.faqs
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete FAQs"
  ON public.faqs
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ===================== public.testimonials =====================
DROP POLICY IF EXISTS "Admins can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON public.testimonials;

CREATE POLICY "Admins can view all testimonials"
  ON public.testimonials
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert testimonials"
  ON public.testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
  ON public.testimonials
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ===================== public.projects =====================
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;

CREATE POLICY "Admins can view all projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ===================== public.consultation_requests =====================
-- INSERT policy was already replaced with validation for anon/authenticated.
DROP POLICY IF EXISTS "Admins can view consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Admins can update consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Admins can delete consultation requests" ON public.consultation_requests;

CREATE POLICY "Admins can view consultation requests"
  ON public.consultation_requests
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update consultation requests"
  ON public.consultation_requests
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete consultation requests"
  ON public.consultation_requests
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- ===================== storage.objects admin policies =====================
-- Direct URL access to public buckets remains unaffected; these policies only gate
-- list/upload/update/delete operations for admin users.
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload testimonial photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update testimonial photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete testimonial photos" ON storage.objects;

CREATE POLICY "Admins can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'projects' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'projects' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'projects' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload testimonial photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonial photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonial photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'));
