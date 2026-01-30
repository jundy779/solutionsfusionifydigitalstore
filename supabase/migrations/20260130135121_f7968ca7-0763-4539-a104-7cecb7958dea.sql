-- =============================================
-- STORAGE POLICIES for logos bucket
-- =============================================

-- Only admins can upload logos
CREATE POLICY "Admins can upload logos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'logos' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can update logos
CREATE POLICY "Admins can update logos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'logos' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Only admins can delete logos
CREATE POLICY "Admins can delete logos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'logos' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);