
-- 1. Restrict EXECUTE on has_role SECURITY DEFINER function
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2. Remove broad SELECT (listing) policies on storage.objects for public buckets.
-- Public file URLs continue to work via the public CDN endpoint; only list/search API is blocked.
DROP POLICY IF EXISTS "Anyone can view logos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view testimonial photos" ON storage.objects;

-- 3. Tighten overly-permissive INSERT policies with input validation
DROP POLICY IF EXISTS "Anyone can submit consultation request" ON public.consultation_requests;
CREATE POLICY "Anyone can submit consultation request"
  ON public.consultation_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 120
    AND length(email) BETWEEN 5 AND 254
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(service) BETWEEN 1 AND 120
    AND length(message) BETWEEN 1 AND 5000
    AND (company IS NULL OR length(company) <= 200)
    AND (budget IS NULL OR length(budget) <= 100)
    AND status = 'new'
  );

DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(email) BETWEEN 5 AND 254
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND (name IS NULL OR length(name) <= 120)
    AND status = 'active'
    AND (source IS NULL OR length(source) <= 50)
  );

-- 4. Restrict Realtime channel subscriptions to admin users only.
-- consultation_requests is in the realtime publication; without RLS on realtime.messages,
-- any authenticated user could subscribe and receive PII (name, email, message).
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can receive realtime messages" ON realtime.messages;
CREATE POLICY "Admins can receive realtime messages"
  ON realtime.messages
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can send realtime messages" ON realtime.messages;
CREATE POLICY "Admins can send realtime messages"
  ON realtime.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
