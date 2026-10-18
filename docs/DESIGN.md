# FUSIONIFY Design System

Panduan gaya visual FUSIONIFY untuk membangun website lain (produk, landing page, dashboard, halaman event) yang tetap terasa satu keluarga dengan **fusionify.id**.

Dokumen ini bisa dibaca manusia, dan bisa juga langsung diberikan ke AI coding agent (Claude, Cursor, v0, dan sejenisnya) sebagai acuan. Semua nilai di bawah diambil dari kode web fusionify.id (`css/tokens.css`, `css/components.css`, `css/brand.css`).

> **Catatan asal-usul.** Fondasi sistem ini (Blueprint DS: token, komponen, motion) diadaptasi dari portofolio Andika Dwi Saputra ([andikadevs/andikadevs.github.io](https://github.com/andikadevs/andikadevs.github.io)) dengan izin. Sebelum memakainya di web lain di luar fusionify.id, pastikan izin dari Andika juga mencakup pemakaian itu, dan tetap cantumkan kredit di README atau `THIRD_PARTY_NOTICES.md`.

---

## 1. Karakter brand

**Satu kalimat:** langit biru yang cerah, kertas krem yang hangat, dan gambar teknik yang rapi. Teknologi yang serius, tapi tidak kaku.

| Sifat | Artinya di layar |
|---|---|
| **Jujur** | Status produk ditulis apa adanya (Beta, In development, Planned). Tidak ada angka atau testimoni karangan. |
| **Hangat** | Latar krem, bukan putih polos. Sudut membulat. Ada maskot dan awan. |
| **Presisi** | Label mono huruf kapital, nomor "sheet" seperti gambar teknik (`03 / 09`), garis tipis. |
| **Hidup** | Animasi halus dan ber-pegas, tapi tidak pernah menghalangi isi. |

**Metafora visual:** blueprint (cetak biru). Bagian hero dan kontak adalah "langit biru" dengan awan; bagian isi adalah "kertas" krem. Setiap section diberi label seperti lembar gambar teknik.

---

## 2. Warna

### 2.1 Palet inti

| Token | Hex | Peran |
|---|---|---|
| `--sky-500` | `#0D6CD7` | **Biru brand.** Link, blok solid, aksen utama |
| `--brand-strong` | `#0261CD` | **Biru tua.** Tombol utama dan permukaan yang membawa teks putih (kontras 5.8:1) |
| `--sky-300` | `#539DE9` | **Biru muda.** Titik huruf i di logo, aksen kecil |
| `--ink` | `#060606` | Teks utama, tombol gelap |
| `--cream` | `#FFF9F1` | Latar halaman (mode terang) |
| `--white` | `#FFFFFF` | Kartu yang "terangkat" |

### 2.2 Skala biru lengkap

```
--sky-50:  #EEF7FF   latar badge "Planned"
--sky-100: #CDEEFF   gradien kartu langit
--sky-200: #9FD3FA   gradien kartu langit
--sky-300: #539DE9   biru muda (titik i)
--sky-400: #2A82E4   brand di mode gelap, awal gradien hero
--sky-500: #0D6CD7   biru brand
--sky-600: #1667C8   teks biru di atas krem (5.3:1)
--sky-700: #1F3B6D
--sky-800: #111C36   teks di atas kartu biru muda
--sky-900: #031835   latar section kontak
```

### 2.3 Netral dan aksen

```
--cream-2: #F6EFE2   latar "tenggelam" (sunken)
--sand:    #EEE8D2
--ink-2:   #1A1A1A   kartu gelap
--night:   #0A0A0F
--sun:     #FFDA3F   HANYA titik status kecil
--coral:   #FC9073   HANYA aksen langka (peringatan, pesawat kertas)
```

### 2.4 Token semantik (pakai ini di komponen, bukan hex mentah)

| Token | Terang | Gelap |
|---|---|---|
| `--bg` | `#FFF9F1` | `#0B1733` (navy, bukan hitam) |
| `--bg-raised` | `#FFFFFF` | `#142346` |
| `--bg-sunken` | `#F6EFE2` | `#0E1B3A` |
| `--fg` | `#060606` | `#FFF9F1` |
| `--fg-muted` | ink 62% | krem 68% |
| `--fg-subtle` | ink 42% | krem 45% |
| `--border` | ink 12% | krem 12% |
| `--border-strong` | ink 85% | krem 85% |
| `--brand` | `#0D6CD7` | `#2A82E4` |

**Gradien langit (hero, kontak):**
- Terang: `#2A82E4` → `#0D6CD7` (55%) → `#0261CD`
- Gelap: `#1C3868` → `#13264B` → `#0B1733`

### 2.5 Warna status

Dipakai untuk badge status produk. Selalu ada titik bulat kecil di depan teksnya.

| Status | Tone | Teks | Latar | Border |
|---|---|---|---|---|
| Active / Live | `go` | `#157F3B` | `#E3F6E9` | `#B5E4C4` |
| Beta | `beta` | `#9A5B00` | `#FFF2D8` | `#F5D79A` |
| In development | `wip` | `#8A4A00` | `#FFE9D6` | `#F6C79C` |
| Planned / Experimental | `plan` | `#0261CD` | `#EEF7FF` | `#9FD3FA` |
| End of service | `eos` | `#4B5568` | `#EEF0F4` | `#D3D8E1` |

### 2.6 Aturan warna

- Mode gelap memakai **navy**, bukan hitam, supaya langit, awan, dan halaman tetap satu nuansa.
- Teks putih di atas biru hanya di `#0D6CD7` ke bawah (lebih gelap). Di biru yang lebih terang, beri latar transparan gelap di belakang teks kecil: `rgb(10 35 70 / 0.3)`.
- Kuning dan coral itu bumbu, bukan bahan utama. Jangan dipakai untuk blok besar.

---

## 3. Tipografi

### 3.1 Tiga font, tiga peran

| Font | Token | Dipakai untuk | Berat |
|---|---|---|---|
| **Plus Jakarta Sans** | `--font-display` | Judul besar, wordmark, angka besar, judul kartu | 700 sampai 800 |
| **Space Grotesk** | `--font-sans` | Teks isi, UI umum | 400 sampai 600 |
| **JetBrains Mono** | `--font-mono` | Label, tombol, chip, nomor sheet, toast | 500 |

Semua tersedia gratis di Google Fonts (lisensi OFL). Lebih baik di-host sendiri (`.woff2`) dan sertakan file lisensinya.

```css
--font-display: "Plus Jakarta Sans", "Arial Black", system-ui, sans-serif;
--font-sans:    "Space Grotesk", system-ui, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, monospace;
```

### 3.2 Skala ukuran

```
--text-xs:   0.75rem    (12px)  label, tombol
--text-sm:   0.875rem   (14px)  teks kecil, meta
--text-base: 1rem       (16px)  teks isi
--text-lg:   1.125rem   (18px)  lead kecil
--text-xl:   1.375rem   (22px)  lead, judul kartu
--text-2xl:  clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)
--text-3xl:  clamp(2rem, 1.3rem + 2.8vw, 3.5rem)     judul section
--text-4xl:  clamp(2.6rem, 1.4rem + 5vw, 5.5rem)
--text-5xl:  clamp(3.2rem, 1.2rem + 8vw, 8.5rem)     judul hero
```

### 3.3 Spasi baris dan huruf

```
--leading-tight: 0.95    judul hero
--leading-snug:  1.2
--leading-body:  1.6     teks isi
--tracking-tight: -0.035em   semua judul display (huruf dirapatkan)
--tracking-label:  0.14em    semua label mono (huruf direnggangkan)
```

### 3.4 Pola tipografi khas

- **Judul:** Plus Jakarta Sans 800, rapat (`-0.035em`), line-height sekitar 1. Terasa tebal dan padat.
- **Label:** JetBrains Mono 500, 12px, HURUF KAPITAL, renggang `0.14em`. Dipakai di tombol, chip, tanggal, dan nomor sheet.
- **Lead:** Space Grotesk, 22px, warna `--fg-muted`, lebar maksimal sekitar 38 karakter.
- **Teks isi:** lebar maksimal 60 sampai 72 karakter per baris.
- Nama perusahaan selalu ditulis **FUSIONIFY** (kapital semua). Wordmark logonya sendiri huruf kecil: "fusionify".

---

## 4. Spasi, layout, dan bentuk

### 4.1 Spasi (dasar 4px)

```
--space-1: 4px     --space-6: 32px
--space-2: 8px     --space-7: 48px
--space-3: 12px    --space-8: 64px
--space-4: 16px    --space-9: 96px
--space-5: 24px    --space-10: 144px
```

### 4.2 Layout

```
--container: 1320px                     lebar maksimal konten
--gutter:    clamp(16px, 4vw, 60px)     padding kiri-kanan (16px di HP)
--section-y: clamp(72px, 10vw, 160px)   jarak atas-bawah tiap section
```

Primitif layout:
- `.container`: lebar maksimal + gutter.
- `.section`: padding vertikal `--section-y`.
- `.cluster`: flex wrap dengan gap (untuk deretan tombol atau chip).
- `.split`: 2 kolom mulai lebar 900px, 1 kolom di HP.
- `.bento`: grid 1 kolom, 2 kolom mulai 720px, 6 kolom mulai 1100px (item span 2, `--wide` span 3, `--hero` span 4).

Kepala section memakai pola **4 : 8** di desktop: judul dan lead di kolom kiri (4 bagian), isi di kanan (8 bagian).

### 4.3 Radius

```
--radius-sm:   8px
--radius-md:   16px    tile kecil
--radius-lg:   24px    kartu, kartu fitur
--radius-xl:   36px    dialog
--radius-pill: 999px   tombol, chip, nav, toast
```

Tombol dan chip **selalu berbentuk pil**. Kartu selalu `24px`. Hindari sudut tajam.

### 4.4 Bayangan

```
--shadow-sm:    0 1px 2px rgb(17 28 54 / 0.08)
--shadow-md:    0 10px 30px -12px rgb(17 28 54 / 0.28)
--shadow-lg:    0 30px 60px -24px rgb(17 28 54 / 0.4)
--shadow-brand: 0 6px 16px -6px rgb(2 60 140 / 0.45)   hover tombol
--shadow-glass: inset 0 4px 6px rgb(255 255 255 / 0.25)
```

Bayangan selalu bernuansa **biru navy**, tidak pernah abu-abu atau hitam murni. Kartu diam pakai border tipis, dan bayangan baru muncul saat hover.

---

## 5. Motion

### 5.1 Easing dan durasi

```
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1)     reveal, slide masuk
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)  hover dan tekan (sedikit memantul)
--ease-bounce: cubic-bezier(0.3, 1.25, 0.4, 1)    toggle, ganti ikon
--ease-std:    cubic-bezier(0.4, 0, 0.2, 1)       perubahan layout

--dur-fast:   180ms    hover, tekan
--dur-base:   320ms    toggle, warna
--dur-slow:   600ms    dialog, nav menyusut
--dur-reveal: 900ms    elemen muncul saat scroll

--hover-scale: 1.03
--press-scale: 0.97
```

### 5.2 Pola gerak khas

| Pola | Cara kerja |
|---|---|
| **Reveal saat scroll** | Elemen naik 28px dan fade in, `--dur-reveal`, `--ease-out`. Elemen dalam satu grup bertahap 70ms per item. |
| **Judul kata per kata** | Tiap kata naik dari balik "masker" sambil sedikit miring (4°), jeda 45ms antar kata. |
| **Kartu terbuka** | Kartu "membuka" dari bawah (clip-path) sambil naik 60px. |
| **Hover tombol** | Membesar ke 1.03 dengan pegas, muncul bayangan biru. Ikon panah bergeser 3px. |
| **Tekan** | Mengecil ke 0.97. |
| **Hover kartu** | Naik 4 sampai 6px, kartu fitur sedikit miring (-0.6°). |
| **Toggle tema** | Matahari terbenam, bulan terbit (ikon bergeser vertikal dengan easing bounce). |
| **Awan** | Melayang sangat pelan (60 sampai 90 detik), hanya pakai `transform` supaya ringan. |

### 5.3 Aturan motion

- **Wajib hormati `prefers-reduced-motion`.** Semua durasi jadi 1ms, scale hover dan tekan jadi 1, awan berhenti.
- Animasi yang tidak terlihat di layar dijeda (`animation-play-state: paused`).
- Animasi hanya pakai `transform` dan `opacity`. Jangan animasikan `width`, `top`, atau `box-shadow` besar di elemen yang banyak.
- Gerakan tidak boleh menahan konten. Teks harus bisa dibaca walau JavaScript mati.

---

## 6. Komponen

### 6.1 Tombol

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 44px; padding: 0 24px;
  border-radius: 999px; border: 1px solid transparent;
  background: var(--btn-bg, var(--ink)); color: var(--btn-fg, var(--cream));
  font: 500 12px / 1 var(--font-mono);
  letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap;
  transition: transform 180ms var(--ease-spring), box-shadow 320ms ease;
}
.btn:hover  { transform: scale(1.03); box-shadow: var(--shadow-brand); }
.btn:active { transform: scale(0.97); }
```

| Varian | Latar | Teks | Kapan dipakai |
|---|---|---|---|
| default | ink | krem | aksi sekunder di atas krem |
| `--brand` | `#0261CD` | putih | **aksi utama** (satu per layar) |
| `--light` | putih | ink | di atas langit biru |
| `--ghost` | transparan, border tegas | `--fg` | aksi ketiga, "Kembali" |
| `--glass` | putih 22% + blur | putih | di atas foto atau langit |
| `--sm` | tinggi 34px | | baris padat |

Tinggi minimum **44px** (target sentuh yang nyaman).

### 6.2 Chip dan badge status

```css
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  height: 26px; padding: 0 10px; border-radius: 999px;
  border: 1px solid var(--border);
  font: 500 11px / 1 var(--font-mono); letter-spacing: 0.06em;
  color: var(--fg-muted);
}
.chip--status { font-weight: 600; }
.chip--status::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
```

Chip filter (`.chip--filter`): tinggi 34px, huruf kapital. Saat aktif (`aria-pressed="true"`), warnanya terbalik: latar `--fg`, teks `--bg`.

### 6.3 Kartu

- Latar `--bg-raised`, border 1px `--border`, radius 24px, `overflow: hidden`.
- Hover: naik 4px dan muncul `--shadow-lg`.
- Isi: padding 24px, gap 12px. Judul Plus Jakarta Sans 700 22px, teks `--fg-muted` 14px.
- **Screenshot produk** ditampilkan di dalam "jendela browser" mini (bar krem dengan tiga titik merah, kuning, hijau) di atas latar gradien langit. Gambar tidak pernah dipotong.
- Seluruh kartu bisa diklik lewat satu link utama (`::after` menutup kartu).

### 6.4 Kartu fitur

Kotak berwarna untuk layanan, harga, atau angka. Padding 32px, radius 24px. Hover: naik 6px dan miring -0.6°.

| Varian | Latar | Teks |
|---|---|---|
| `--sky` | gradien `#CDEEFF` → `#9FD3FA` | `#111C36` |
| `--white` | putih + border | ink |
| `--ink` | `#1A1A1A` | krem |
| `--brand` | `#0261CD` | putih |

Tiga kartu berdampingan sebaiknya pakai tiga varian berbeda (misalnya sky, white, ink) supaya ada ritme.

### 6.5 Label sheet (ciri khas)

Label kecil di atas setiap judul section, seperti kop lembar gambar teknik:

```html
<p class="sheet"><span class="sheet__no">03 / 09</span><span>The ecosystem</span></p>
```

- Font mono 12px, kapital, renggang.
- Ada tanda silang registrasi kecil (11px) di depannya, dibuat dengan dua `linear-gradient`.
- Di atas latar biru: teks putih di dalam pil `rgb(10 35 70 / 0.3)`.
- Halaman tanpa urutan boleh pakai kata, misalnya `PRESS`, `LEGAL`.

### 6.6 Navigasi

- **Nav pil kaca** melayang 16px dari atas: radius pil, tinggi 56px, latar transparan + `backdrop-filter: blur(14px) saturate(1.3)`.
- Setelah halaman di-scroll, latarnya menjadi `--bg` 78% dan muncul **garis progres biru** 2px di tepi bawah pil.
- Link aktif ditandai bentuk "awan" lembut di belakang teks.
- Kanan atas: switch bahasa EN/ID (segmented control dengan "jempol" yang bergeser) dan tombol tema bulat 36px.
- Di HP (di bawah 760px), link disembunyikan dan nav dipadatkan.

### 6.7 Komponen lain

| Komponen | Spesifikasi singkat |
|---|---|
| **Accordion** | Pakai `<details>` bawaan. Garis tipis antar item. Tombol plus bulat 28px yang berputar 45° jadi silang saat dibuka. |
| **Dialog** | Lebar maksimal 920px, radius 36px. Backdrop navy 55% dengan blur 6px. Masuk dengan naik 24px dan sedikit membesar. |
| **Toast** | Pil ink di tengah bawah, teks mono kapital, muncul memantul dari bawah, hilang setelah 2,2 detik. |
| **Stat** | Angka Plus Jakarta Sans 800 besar, label kecil `--fg-muted` di bawahnya. Boleh dihitung naik (count-up) saat terlihat. |
| **Tile** | Kotak persegi 96px+ untuk logo atau tech stack. Hover: naik 6px dan miring -2°. |
| **Marquee** | Teks display kapital berjalan, ujung kiri-kanan memudar (mask). Berhenti saat di-hover. |
| **Pulse dot** | Titik kuning 9px dengan cincin berdenyut, untuk status "tersedia" atau "live". |

---

## 7. Permukaan dan dekorasi khas

1. **Langit (`.blueprint`):** gradien biru vertikal untuk hero dan kontak. Teks putih.
2. **Awan:** dibuat murni dari CSS (beberapa `radial-gradient` bertumpuk + blur), melayang pelan. Di mode gelap, awan jadi kebiruan transparan.
3. **Cloud bank:** deretan awan di tepi bawah section biru yang "meleleh" ke warna section berikutnya, jadi tidak ada garis potong yang kaku antar section.
4. **Laut di footer:** footer gelap dengan wordmark besar "fusionify" yang hurufnya muncul satu per satu.
5. **Maskot (Fi):** emblem 3D yang menyapa di hero, lalu "terbang" ke pojok nav saat scroll. Opsional untuk web lain; kalau dipakai, pertahankan sifatnya yang sopan dan membantu.

Untuk web yang lebih sederhana (dashboard, halaman produk), cukup ambil **langit + krem + label sheet**. Itu sudah langsung terasa "FUSIONIFY".

---

## 8. Ikon dan gambar

- **Ikon:** garis (stroke) 2px, ujung bulat (`stroke-linecap="round"`, `stroke-linejoin="round"`), viewBox 24, ukuran 18 sampai 22px, warna `currentColor`. Gaya seperti Lucide atau Feather.
- **Logo:** pakai file resmi dari `fusionify.id/media-kit/`. Jangan digambar ulang.
- **Foto tim:** crop persegi fokus wajah, ditampilkan bulat dengan cincin biru tipis. Tanpa foto, tampilkan inisial di lingkaran gradien biru.
- **Format gambar:** WebP, dua ukuran (`-800` dan penuh) dengan `srcset`, `loading="lazy"`, dan `width`/`height` eksplisit supaya layout tidak lompat.

---

## 9. Aksesibilitas (wajib)

- Kontras teks isi minimal **4.5:1**, teks besar minimal 3:1. Semua kombinasi di dokumen ini sudah memenuhi.
- Fokus keyboard terlihat jelas: outline 2px `--focus` dengan jarak 3px.
- Ada link "Skip to content" di paling atas.
- Target sentuh minimal 44px.
- Semua animasi mati dengan `prefers-reduced-motion`.
- Gambar dekoratif: `alt=""` dan `aria-hidden="true"`. Gambar bermakna: alt yang menjelaskan.
- Konten penting tetap ada di HTML (bukan hanya dirender JavaScript), supaya bisa dibaca mesin pencari dan AI.

---

## 10. Bahasa dan suara

- **Dua bahasa:** EN dan ID, dengan switch di nav. Kunci teks yang sama untuk kedua bahasa.
- **Nada:** ramah, jelas, percaya diri tapi tidak sombong. Kalimat pendek. Boleh sedikit jenaka.
- **Sapaan:** "kamu" dan "kami" di versi Indonesia.
- **Jujur soal status:** tulis "Beta", "Dalam pengembangan", "Direncanakan", atau "Layanan berakhir" apa adanya.
- **Hindari:** klaim berlebihan ("terbaik di Indonesia"), angka yang tidak bisa dibuktikan, testimoni tanpa izin, dan tanda pisah panjang (em dash) dalam copy.

**Fakta yang tidak boleh salah:**
- Badan hukum: **PT FUSIONIFY DIGITAL STORE** (Perseroan Perorangan), Bogor. Bukan "PT FUSIONIFY DIGITAL GROUP".
- Kontak publik: `hello@fusionify.id`, WhatsApp +62 831-1138-0628.

---

## 11. Boleh dan jangan

| Boleh | Jangan |
|---|---|
| Latar krem untuk area isi, biru untuk hero dan CTA | Latar putih polos di seluruh halaman |
| Satu tombol `--brand` per layar sebagai aksi utama | Banyak tombol biru bersaing |
| Label mono kapital untuk metadata | Label mono untuk paragraf panjang |
| Judul tebal dan rapat | Judul tipis atau huruf direnggangkan |
| Radius 24px di kartu, pil di tombol | Sudut tajam 0px atau radius acak |
| Bayangan navy lembut saat hover | Bayangan hitam pekat yang selalu tampil |
| Mode gelap navy | Mode gelap hitam murni |
| Animasi pegas yang singkat | Animasi panjang yang menahan konten |

---

## 12. Starter CSS (salin ke proyek baru)

```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap");

:root {
  /* palette */
  --sky-50:#eef7ff; --sky-100:#cdeeff; --sky-200:#9fd3fa; --sky-300:#539de9; --sky-400:#2a82e4;
  --sky-500:#0d6cd7; --sky-600:#1667c8; --sky-700:#1f3b6d; --sky-800:#111c36; --sky-900:#031835;
  --white:#fff; --cream:#fff9f1; --cream-2:#f6efe2; --ink:#060606; --ink-2:#1a1a1a;
  --sun:#ffda3f; --coral:#fc9073;

  /* semantic, light */
  --bg:var(--cream); --bg-raised:var(--white); --bg-sunken:var(--cream-2);
  --fg:var(--ink); --fg-muted:rgb(6 6 6 / .62); --fg-subtle:rgb(6 6 6 / .42);
  --border:rgb(6 6 6 / .12); --border-strong:rgb(6 6 6 / .85);
  --brand:var(--sky-500); --brand-strong:#0261cd; --focus:var(--ink);
  --hero-from:#2a82e4; --hero-mid:#0d6cd7; --hero-to:#0261cd;

  /* type */
  --font-display:"Plus Jakarta Sans","Arial Black",system-ui,sans-serif;
  --font-sans:"Space Grotesk",system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;
  --text-xs:.75rem; --text-sm:.875rem; --text-base:1rem; --text-lg:1.125rem; --text-xl:1.375rem;
  --text-2xl:clamp(1.6rem,1.2rem + 1.6vw,2.25rem); --text-3xl:clamp(2rem,1.3rem + 2.8vw,3.5rem);
  --text-4xl:clamp(2.6rem,1.4rem + 5vw,5.5rem); --text-5xl:clamp(3.2rem,1.2rem + 8vw,8.5rem);
  --leading-body:1.6; --tracking-tight:-.035em; --tracking-label:.14em;

  /* space, layout, shape */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:24px;
  --space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px; --space-10:144px;
  --gutter:clamp(16px,4vw,60px); --container:1320px; --section-y:clamp(72px,10vw,160px);
  --radius-sm:8px; --radius-md:16px; --radius-lg:24px; --radius-xl:36px; --radius-pill:999px;
  --shadow-sm:0 1px 2px rgb(17 28 54 / .08); --shadow-md:0 10px 30px -12px rgb(17 28 54 / .28);
  --shadow-lg:0 30px 60px -24px rgb(17 28 54 / .4); --shadow-brand:0 6px 16px -6px rgb(2 60 140 / .45);

  /* motion */
  --ease-out:cubic-bezier(.22,1,.36,1); --ease-spring:cubic-bezier(.34,1.56,.64,1);
  --ease-bounce:cubic-bezier(.3,1.25,.4,1); --ease-std:cubic-bezier(.4,0,.2,1);
  --dur-fast:180ms; --dur-base:320ms; --dur-slow:600ms; --dur-reveal:900ms;
  --hover-scale:1.03; --press-scale:.97;
  color-scheme:light;
}

:root[data-theme="dark"] {
  --bg:#0b1733; --bg-raised:#142346; --bg-sunken:#0e1b3a;
  --fg:var(--cream); --fg-muted:rgb(255 249 241 / .68); --fg-subtle:rgb(255 249 241 / .45);
  --border:rgb(255 249 241 / .12); --border-strong:rgb(255 249 241 / .85);
  --brand:var(--sky-400); --focus:var(--cream);
  --hero-from:#1c3868; --hero-mid:#13264b; --hero-to:#0b1733;
  color-scheme:dark;
}

@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast:1ms; --dur-base:1ms; --dur-slow:1ms; --dur-reveal:1ms; --hover-scale:1; --press-scale:1; }
}

body { margin:0; background:var(--bg); color:var(--fg); font:400 var(--text-base)/var(--leading-body) var(--font-sans); -webkit-font-smoothing:antialiased; }
.container { width:100%; max-width:var(--container); margin-inline:auto; padding-inline:var(--gutter); }
.section { padding-block:var(--section-y); }
.heading { font:800 var(--text-3xl)/1.02 var(--font-display); letter-spacing:var(--tracking-tight); margin:0; }
.label { font:500 var(--text-xs)/1 var(--font-mono); letter-spacing:var(--tracking-label); text-transform:uppercase; }
.blueprint { color:var(--white); background:linear-gradient(180deg,var(--hero-from),var(--hero-mid) 55%,var(--hero-to)); }
:focus-visible { outline:2px solid var(--focus); outline-offset:3px; }
```

### Tailwind (opsional)

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: { DEFAULT: "#0D6CD7", strong: "#0261CD", light: "#539DE9" },
      sky: { 50:"#EEF7FF",100:"#CDEEFF",200:"#9FD3FA",300:"#539DE9",400:"#2A82E4",500:"#0D6CD7",600:"#1667C8",700:"#1F3B6D",800:"#111C36",900:"#031835" },
      cream: { DEFAULT: "#FFF9F1", 2: "#F6EFE2" },
      ink: { DEFAULT: "#060606", 2: "#1A1A1A" },
      night: "#0B1733",
    },
    fontFamily: {
      display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
      mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
    },
    borderRadius: { card: "24px", dialog: "36px" },
    letterSpacing: { tightest: "-0.035em", label: "0.14em" },
    transitionTimingFunction: {
      out: "cubic-bezier(0.22, 1, 0.36, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
},
```

---

## 13. Prompt singkat untuk AI agent

Tempel ini bersama file `DESIGN.md` saat meminta AI membuat halaman baru:

> Bangun halaman ini mengikuti `DESIGN.md` FUSIONIFY. Pakai token CSS di bagian 12, bukan warna hex mentah di komponen. Latar isi krem, hero dan CTA di atas gradien langit biru. Judul Plus Jakarta Sans 800 dengan tracking rapat, teks isi Space Grotesk, label dan tombol JetBrains Mono kapital. Tombol berbentuk pil, kartu radius 24px. Beri label sheet (`01 / 05`) di atas setiap judul section. Dukung mode gelap navy, bahasa EN/ID, dan `prefers-reduced-motion`. Tulis copy yang jujur dan singkat, tanpa em dash.

---

## 14. Checklist sebelum rilis

- [ ] Semua warna lewat token, tidak ada hex acak di komponen
- [ ] Mode terang dan gelap sama-sama dicek
- [ ] Dicek di lebar 390px (HP) tanpa scroll horizontal
- [ ] Kontras teks lolos 4.5:1
- [ ] Bisa dipakai pakai keyboard saja, fokus terlihat
- [ ] Animasi mati dengan reduced motion
- [ ] Teks EN dan ID lengkap
- [ ] Nama badan hukum dan kontak sesuai bagian 10
- [ ] Kredit Blueprint DS dan lisensi font disertakan
