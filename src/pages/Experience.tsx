import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { getQualityProfile } from "@/lib/device-quality";
import { scrollState } from "@/components/experience/NetworkGlobeScene";
import { useAmbientAudio } from "@/components/experience/useAmbientAudio";

const NetworkGlobeScene = lazy(() =>
  import("@/components/experience/NetworkGlobeScene").then((m) => ({ default: m.NetworkGlobeScene })),
);

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  index: string;
  kicker: string;
  title: string;
  body: string;
  stats?: { value: string; label: string }[];
  align: "left" | "right" | "center";
}

const CHAPTERS: Chapter[] = [
  {
    index: "01",
    kicker: "Kondisi awal",
    title: "Operasional yang tersebar di banyak tempat",
    body:
      "Order masuk lewat WhatsApp, stok dicatat di buku, laporan dirapikan di Excel tiap malam. Bukan karena pemiliknya tidak rapi — karena tidak ada satu sistem yang menyatukannya.",
    align: "left",
  },
  {
    index: "02",
    kicker: "Cara kami masuk",
    title: "Fusionify memetakan alur kerja dulu, bukan menjual fitur",
    body:
      "Kami duduk melihat proses harian: dari pesan pertama pelanggan sampai barang diantar. Titik yang bocor dipetakan, lalu dijahit satu per satu jadi satu jalur yang bisa diikuti.",
    stats: [
      { value: "1x", label: "Sesi pemetaan alur" },
      { value: "3", label: "Titik bocor rata-rata" },
      { value: "7 hari", label: "Rilis versi pertama" },
    ],
    align: "right",
  },
  {
    index: "03",
    kicker: "Otomasi",
    title: "Pekerjaan berulang dipindahkan ke sistem",
    body:
      "Balas pertanyaan yang selalu sama, kirim invoice, catat pesanan, ingatkan follow-up. Bot dan integrasi mengerjakannya sementara pemilik kembali ke hal yang butuh manusia.",
    align: "left",
  },
  {
    index: "04",
    kicker: "Visibilitas",
    title: "Angka yang bisa dilihat kapan saja, bukan diingat-ingat",
    body:
      "Satu dashboard: penjualan hari ini, pesanan tertahan, pelanggan yang belum dibalas. Keputusan berhenti jadi tebakan begitu datanya muncul di satu layar.",
    stats: [
      { value: "Real-time", label: "Status pesanan" },
      { value: "1 layar", label: "Semua metrik inti" },
    ],
    align: "right",
  },
  {
    index: "05",
    kicker: "Kepemilikan",
    title: "Sistemnya milik klien, bukan disandera vendor",
    body:
      "Domain, database, dan akses admin ada di tangan pemilik bisnis. Kami menyerahkan dokumentasi dan pelatihan singkat, supaya tim internal bisa jalan sendiri.",
    align: "left",
  },
  {
    index: "06",
    kicker: "Skala",
    title: "Satu jaringan yang tumbuh bersama bisnisnya",
    body:
      "Cabang baru, kanal jualan baru, tim baru — ditambahkan sebagai node, bukan sebagai sistem terpisah. Itu sebabnya halaman ini berbentuk jaringan: tiap titik menambah jalur, bukan menambah kerumitan.",
    align: "center",
  },
];

const STACK = [
  "Three.js",
  "WebGL",
  "GLSL Shader",
  "GSAP ScrollTrigger",
  "Web Audio API",
  "Scroll-Driven Storytelling",
  "Adaptive Quality",
];

const Experience = () => {
  const quality = useMemo(() => getQualityProfile(), []);
  const wrapper = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const audio = useAmbientAudio();

  const audioRef = useRef(audio);
  audioRef.current = audio;
  const activeRef = useRef(0);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          scrollState.energy = Math.min(Math.abs(self.getVelocity()) / 4000, 1);
          setProgress(self.progress);
          audioRef.current.setIntensity(self.progress);

          const idx = Math.min(
            CHAPTERS.length - 1,
            Math.floor(self.progress * (CHAPTERS.length + 0.6)),
          );
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
            audioRef.current.chime([0, 3, 7, 5, 10, 12][idx] ?? 0);
          }
        },
      });

      // Chapter reveals
      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
        const items = chapter.querySelectorAll("[data-reveal]");
        gsap.fromTo(
          items,
          { y: 34, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: chapter,
              start: "top 78%",
              end: "bottom 35%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Hero headline: per-character rise
      const chars = gsap.utils.toArray<HTMLElement>("[data-char]");
      if (chars.length) {
        gsap.fromTo(
          chars,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.022, delay: 0.25 },
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (quality.prefersReduced || quality.isMobile) return;
    const onMove = (e: PointerEvent) => {
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [quality.isMobile, quality.prefersReduced]);

  const headline = "Bengkel digital,";
  const headlineTwo = "dirender real-time.";

  return (
    <div className="relative bg-[#03060d] text-foreground">
      <SEOHead
        title="Fusionify Experience: Jaringan Operasional 3D | Fusionify Solutions"
        description="Pengalaman WebGL interaktif: cara Fusionify menyatukan operasional bisnis kecil jadi satu jaringan, diceritakan lewat scene 3D real-time, shader GLSL, dan audio dinamis."
        path="/experience"
      />

      {/* Fixed 3D stage */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Suspense fallback={<div className="w-full h-full bg-[#03060d]" />}>
          <NetworkGlobeScene quality={quality} />
        </Suspense>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_35%,#03060d_95%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] [background-image:repeating-linear-gradient(0deg,#ffffff_0px,#ffffff_1px,transparent_1px,transparent_3px)]" />
      </div>

      {/* Chrome */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-10 py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/75 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Fusionify
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">
            Operational Network / WebGL
          </span>
          <button
            type="button"
            onClick={audio.toggle}
            aria-label={audio.enabled ? "Matikan suara" : "Nyalakan suara"}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-full border border-white/15 text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white hover:border-white/35 transition-colors"
          >
            {audio.enabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            {audio.enabled ? "Sound on" : "Sound off"}
          </button>
        </div>
      </header>

      {/* Scroll rail + chapter counter */}
      <div className="fixed left-5 md:left-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.3em] text-white/45 rotate-180 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <div className="w-px h-32 bg-white/15 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-px bg-primary transition-[height] duration-150"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <span className="font-display text-[11px] tabular-nums text-white/60">
          {String(Math.min(active + 1, CHAPTERS.length)).padStart(2, "0")}
          <span className="text-white/25">/{String(CHAPTERS.length).padStart(2, "0")}</span>
        </span>
      </div>

      {/* Scroll content */}
      <div ref={wrapper} className="relative z-10">
        {/* Hero */}
        <section className="min-h-[100svh] flex flex-col justify-start px-5 md:px-10 pt-28 md:pt-36 pb-20 md:pb-28" data-chapter>
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-5">
            Fusionify Interactive Case Study
          </p>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-7xl leading-[0.95] max-w-4xl text-white">

            <span className="block overflow-hidden pb-1">
              {headline.split("").map((c, i) => (
                <span key={`a${i}`} data-char className="inline-block whitespace-pre">
                  {c}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-1 text-white/45">
              {headlineTwo.split("").map((c, i) => (
                <span key={`b${i}`} data-char className="inline-block whitespace-pre">
                  {c}
                </span>
              ))}
            </span>
          </h1>
          <p data-reveal className="mt-7 max-w-xl text-sm md:text-base text-white/60 leading-relaxed">
            Cara kami bekerja, diceritakan sebagai satu jaringan hidup: operasional yang tadinya
            terpencar disambungkan jadi jalur yang bisa dipantau. Dirender real-time dengan Three.js,
            shader GLSL, GSAP, dan audio yang ikut bergerak bersama scroll.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-2">
            {STACK.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full border border-white/15 text-[11px] tracking-wide text-white/65"
              >
                {tag}
              </span>
            ))}
          </div>
          <p data-reveal className="mt-6 text-[11px] tracking-[0.2em] uppercase text-white/35">
            Nyalakan suara untuk pengalaman penuh
          </p>
        </section>

        {/* Chapters */}
        {CHAPTERS.map((chapter) => (
          <section
            key={chapter.index}
            data-chapter
            className="min-h-[100svh] flex items-center px-5 md:px-10 py-24"
          >
            <div
              className={
                chapter.align === "right"
                  ? "ml-auto max-w-xl text-left"
                  : chapter.align === "center"
                    ? "mx-auto max-w-2xl text-center"
                    : "max-w-xl"
              }
            >
              <span
                data-reveal
                className={`flex items-center gap-3 text-[11px] tracking-[0.4em] text-primary mb-5 ${
                  chapter.align === "center" ? "justify-center" : ""
                }`}
              >
                {chapter.index}
                <span className="h-px w-8 bg-primary/40" />
                <span className="text-white/45 tracking-[0.25em] uppercase">{chapter.kicker}</span>
              </span>
              <h2
                data-reveal
                className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl leading-tight text-white mb-5"
              >
                {chapter.title}
              </h2>
              <p data-reveal className="text-sm md:text-base text-white/60 leading-relaxed">
                {chapter.body}
              </p>
              {chapter.stats && (
                <div
                  data-reveal
                  className={`mt-9 grid gap-6 ${chapter.stats.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}
                >
                  {chapter.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-bold text-2xl md:text-3xl text-white">{s.value}</div>
                      <div className="text-[11px] tracking-wide uppercase text-white/45 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Outro */}
        <section data-chapter className="min-h-[90svh] flex flex-col items-center justify-center text-center px-5">
          <p data-reveal className="text-[11px] tracking-[0.35em] uppercase text-primary mb-6">
            Fusionify Solutions
          </p>
          <h2 data-reveal className="font-display font-bold text-3xl sm:text-5xl text-white max-w-2xl leading-tight">
            Operasional bisnis Anda juga bisa jadi satu jaringan
          </h2>
          <p data-reveal className="mt-5 max-w-lg text-sm md:text-base text-white/60">
            Mulai dari memetakan alur kerja harian, lalu dijahit jadi website, otomasi, dan dashboard
            yang benar-benar dipakai tiap hari — dan tetap ringan di perangkat pelanggan Anda.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-3 justify-center">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Diskusikan proyek
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cara-kerja"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Lihat cara kerja kami
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Experience;
