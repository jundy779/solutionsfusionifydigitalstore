-- Drop old permissive storage policies that lack authentication checks
DROP POLICY IF EXISTS "Allow upload to logos" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from logos" ON storage.objects;
DROP POLICY IF EXISTS "Allow update logos storage" ON storage.objects;