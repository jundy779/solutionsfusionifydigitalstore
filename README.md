# FUSIONIFY SOLUTIONS

Website resmi Fusionify Solutions, lini layanan teknologi dari FUSIONIFY.
Target domain: **https://solutions.fusionify.id**

Dibangun dengan Next.js (App Router), semua halaman dirender statis saat build.
Tidak ada backend, database, atau API key. Form kontak merangkai pesan lalu
membukanya di WhatsApp atau aplikasi email pengunjung.

## Menjalankan di lokal

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi
npm run typecheck
```

Butuh Node.js 20 atau lebih baru.

## Deploy ke Vercel

1. Push folder ini ke repo GitHub.
2. Di Vercel: **Add New > Project**, pilih repo tersebut. Framework terdeteksi
   otomatis sebagai Next.js. Tidak perlu environment variable apa pun.
3. Setelah deploy, buka **Settings > Domains**, tambahkan `solutions.fusionify.id`.
4. Di pengelola DNS fusionify.id, buat record `CNAME` dengan nama `solutions`
   yang mengarah ke nilai yang ditampilkan Vercel (biasanya `cname.vercel-dns.com`).
5. Kalau domain lama (`solutions.fusionifydigital.store`) masih aktif, tambahkan
   juga ke project yang sama lalu set sebagai redirect 308 ke domain baru supaya
   link lama dan peringkat Google tidak hilang.

## Mengubah konten

Semua teks ada di `src/content/`, tidak perlu menyentuh komponen:

| File | Isi |
| --- | --- |
| `site.ts` | Nama, domain, email, nomor WhatsApp |
| `services.ts` | Tujuh layanan beserta cakupannya |
| `projects.ts` | Portfolio dan case study |
| `answers.ts` | Jawaban langsung per layanan, FAQ per layanan, halaman per audiens, fakta singkat |
| `company.ts` | Audiens, cara kerja, prinsip, batasan, model kerja sama, sejarah, teknologi, FAQ |

Menambah project baru cukup tambahkan objek di `projects.ts`. Halaman detail,
sitemap, dan daftar portfolio ikut terbuat otomatis. Gambar taruh di
`public/images/` dalam format `.webp`.

## SEO dan AI search

SEO teknis, structured data, `llms.txt`, dan halaman untuk AI search sudah
terpasang. Detail dan langkah lanjutan di luar kode ada di `SEO-AI-GUIDE.md`.

## Struktur

```
src/
  app/            halaman (beranda, layanan, portfolio, tentang, kontak, privasi)
  components/     header, footer, diagram alur hero, form kontak
  content/        semua teks website
public/images/    logo dan screenshot project
```

## Sistem desain

- Font: Archivo (variabel, self-hosted). Judul memakai lebar 118% supaya senada
  dengan wordmark FUSIONIFY.
- Warna: Paper `#f6f7f5`, Ink `#14202e`, Muted `#5b6573`, Rule `#d9dde2`,
  Fusion Blue `#0b63ce`, Sky `#dce9f9`.
- Semua token ada di bagian atas `src/app/globals.css`.
