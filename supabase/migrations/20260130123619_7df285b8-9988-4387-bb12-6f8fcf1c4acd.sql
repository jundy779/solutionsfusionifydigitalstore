-- Add policies for managing logos (admin operations)
-- For now, allow all authenticated operations - can add proper admin auth later

CREATE POLICY "Allow insert logos"
ON public.client_logos
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow update logos"
ON public.client_logos
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow delete logos"
ON public.client_logos
FOR DELETE
USING (true);

-- Allow uploading to logos bucket
CREATE POLICY "Allow upload to logos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'logos');

-- Allow delete from logos bucket
CREATE POLICY "Allow delete from logos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'logos');

-- Allow update in logos bucket
CREATE POLICY "Allow update logos storage"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'logos')
WITH CHECK (bucket_id = 'logos');