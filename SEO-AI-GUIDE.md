# Panduan SEO dan AI Search

Ringkasan apa yang sudah dipasang di website, dan langkah di luar kode yang
perlu dilakukan pemilik brand.

## Sudah dipasang di kode

| Jenis | Implementasi |
| --- | --- |
| SEO teknis | Semua halaman dirender statis (HTML lengkap tanpa JavaScript), title dan meta description unik, canonical, `robots` meta dengan `max-snippet:-1` dan `max-image-preview:large`, sitemap dengan `lastmod` dan gambar, header keamanan |
| GEO / LLMO | `/llms.txt` (indeks ringkas format llmstxt.org) dan `/llms-full.txt` (seluruh isi website sebagai teks bersih), robots.txt yang mengizinkan GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, dan lainnya |
| AEO | Kotak jawaban langsung "Apa itu ... di Fusionify Solutions?" di setiap halaman layanan, 36 tanya-jawab dengan schema `FAQPage`, halaman `/faq/` terpusat |
| Entity SEO | Satu entitas `Organization` + `ProfessionalService` dengan `@id` tetap, `foundingDate`, `parentOrganization` (FUSIONIFY), `knowsAbout`, `contactPoint`, katalog layanan. Semua `Service`, `CreativeWork`, dan halaman merujuk ke `@id` yang sama. Blok "Fakta singkat" di `/tentang/` |
| Semantic SEO | Topic cluster: layanan saling tertaut ke halaman audiens, project terkait, dan FAQ. Judul halaman memakai bahasa pencarian Indonesia ("Jasa Pembuatan Website", "Jasa Bot WhatsApp") |
| Programmatic SEO | 5 halaman `/untuk/[audiens]/` dari data di `src/content/answers.ts`. Setiap halaman punya isi unik (masalah, layanan, project, FAQ), bukan sekadar ganti kata |
| Image SEO | Semua gambar punya alt deskriptif, format WebP, ukuran eksplisit, OG image 1200x630 per halaman |
| VSO | Heading berbentuk pertanyaan dan jawaban pendek yang bisa dibacakan asisten suara |
| SXO | Halaman statis yang cepat, satu CTA jelas per section, form yang langsung membuka WhatsApp |

## Yang perlu kamu lakukan (di luar kode)

1. **Google Search Console**: verifikasi domain `solutions.fusionify.id`, kirim `sitemap.xml`.
2. **Bing Webmaster Tools**: verifikasi dan kirim sitemap. Indeks Bing dipakai oleh ChatGPT Search dan Copilot, jadi ini penting untuk GEO.
3. **Isi `sameAs`** di `src/content/site.ts` dengan URL profil resmi (Instagram, LinkedIn, GitHub organisasi, Google Business Profile). Ini sinyal Entity SEO terkuat.
4. **Local SEO**: buat Google Business Profile dengan alamat resmi, lalu kirim alamatnya supaya ditambahkan ke schema. Alamat sengaja belum dipasang karena belum dikonfirmasi.
5. **Sebutan di luar website**: AI lebih percaya brand yang disebut di tempat lain. Minta client (misalnya SMK Pionir) mencantumkan "Website oleh Fusionify Solutions" dengan link, dan tulis profil di direktori bisnis lokal.
6. **Update konten berkala**: tambah case study baru di `src/content/projects.ts` dengan hasil nyata. Konten spesifik dan bisa diverifikasi lebih sering dikutip AI.

## Yang tidak berlaku untuk website ini

- **ASO**: baru relevan kalau ada aplikasi di Play Store atau App Store.
- **Video SEO**: baru relevan kalau ada video. Kalau nanti membuat video demo, unggah ke YouTube lalu tambahkan schema `VideoObject` di halaman terkait.
- **Social SEO**: dikerjakan di akun TikTok, Instagram, dan LinkedIn: nama profil konsisten "Fusionify Solutions", bio menyebut layanan utama, dan link ke website.
