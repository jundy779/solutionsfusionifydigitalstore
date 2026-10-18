/** @type {import('next').NextConfig} */
const isExport = process.env.STATIC_EXPORT === "1";
const origin = "https://solutions.fusionify.id";

/*
  Content-Security-Policy
  The site is fully static and loads nothing from other origins, so every
  fetch directive is locked to 'self'. script-src keeps 'unsafe-inline'
  because Next.js streams page data through small inline scripts, and a
  nonce would force every page to render on the server instead of being
  served from Vercel's cache. External scripts are still blocked, and
  there is no user content rendered as HTML anywhere on the site.
*/
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Access-Control-Allow-Origin", value: origin },
];

// Files other sites and apps are meant to load: link previews, icons,
// and the plain-text files for AI crawlers.
const shareable = ["/og.png", "/images/:path*", "/icon.png", "/apple-icon.png", "/llms.txt", "/llms-full.txt"];

const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  ...(isExport
    ? { output: "export", images: { unoptimized: true } }
    : {
        async headers() {
          return [
            { source: "/:path*", headers: securityHeaders },
            ...shareable.map((source) => ({
              source,
              headers: [
                { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
                { key: "Access-Control-Allow-Origin", value: "*" },
              ],
            })),
          ];
        },
      }),
};

export default nextConfig;
