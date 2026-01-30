-- Allow admins to view ALL logos (including inactive)
CREATE POLICY "Admins can view all logos"
ON public.client_logos
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));