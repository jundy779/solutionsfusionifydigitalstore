import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { getQualityProfile } from "@/lib/device-quality";
import { scrollState } from "@/components/experience/NetworkGlobeScene";

const NetworkGlobeScene = lazy(() =>
  import("@/components/experience/NetworkGlobeScene").then((m) => ({ default: m.NetworkGlobeScene })),
);

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  index: string;
  title: string;
  body: string;
  stats?: { value: string; label: string }[];
  align: "left" | "right" | "center";
}

const CHAPTERS: Chapter[] = [
  {
    index: "01",
    title: "Satu jaringan, banyak titik",
    body: "Setiap kiriman dimulai dari satu titik dan berakhir di titik lain. Yang membuatnya sampai bukan keberuntungan, tapi jaringan yang tahu jalur mana yang sedang terbuka.",
    align: "left",
  },
  {
    index: "02",
    title: "Rute yang selalu dihitung ulang",
    body: "Pelabuhan padat, cuaca berubah, bea cukai menahan satu kontainer. Sistem yang baik menghitung ulang rute sebelum manusia sadar ada masalah.",
    stats: [
      { value: "21", label: "Hub utama" },
      { value: "23", label: "Jalur aktif" },
      { value: "< 60s", label: "Rekalkulasi rute" },
    ],
    align: "right",
  },
  {
    index: "03",
    title: "Data bergerak lebih cepat dari barang",
    body: "Sebelum truk keluar gudang, statusnya sudah ada di dashboard. Visibilitas real-time adalah bedanya antara menebak dan mengetahui.",
    align: "left",
  },
  {
    index: "04",
    title: "Presisi di setimeter terakhir",
    body: "Kilometer pertama mudah. Yang menentukan pengalaman pelanggan adalah seratus meter terakhir menuju pintu.",
    stats: [
      { value: "99.2%", label: "On-time delivery" },
      { value: "6", label: "Benua terhubung" },
    ],
    align: "right",
  },
  {
    index: "05",
    title: "Dibangun untuk skala berikutnya",
    body: "Jaringan ini bukan tujuan akhir — ini fondasi. Tiap node baru menambah pilihan rute, bukan menambah kerumitan.",
    align: "center",
  },
];

const Experience = () => {
  const quality = useMemo(() => getQualityProfile(), []);
  const wrapper = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Master scroll progress feeding the 3D scene
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          setProgress(self.progress);
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

  return (
    <div className="relative bg-[#03060d] text-foreground">
      <SEOHead
        title="Global Network Experience | Fusionify Solutions"
        description="Pengalaman 3D interaktif: jaringan logistik global yang digerakkan scroll, dibangun dengan Three.js, WebGL, dan GSAP oleh Fusionify."
        path="/experience"
      />

      {/* Fixed 3D stage */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Suspense fallback={<div className="w-full h-full bg-[#03060d]" />}>
          <NetworkGlobeScene quality={quality} />
        </Suspense>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_35%,#03060d_95%)]" />
      </div>

      {/* Chrome */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-10 py-5 mix-blend-difference">
        <Link to="/" className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Fusionify
        </Link>
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/60">
          Global Network / WebGL
        </span>
      </header>

      <div className="fixed left-5 md:left-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-3">
        <span className="text-[10px] tracking-[0.3em] text-white/50 rotate-180 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <div className="w-px h-32 bg-white/15 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-px bg-primary transition-[height] duration-150"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Scroll content */}
      <div ref={wrapper} className="relative z-10">
        {/* Hero */}
        <section className="min-h-[100svh] flex flex-col justify-end px-5 md:px-10 pb-20 md:pb-28" data-chapter>
          <p data-reveal className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-6">
            Interactive Case Study
          </p>
          <h1
            data-reveal
            className="font-display font-bold text-4xl sm:text-6xl lg:text-8xl leading-[0.95] max-w-4xl text-white"
          >
            Jaringan global,
            <span className="block text-white/50">dirender real-time.</span>
          </h1>
          <p data-reveal className="mt-7 max-w-xl text-sm md:text-base text-white/60 leading-relaxed">
            Studi immersive tentang bagaimana rute, hub, dan aliran data logistik bisa diceritakan lewat
            scroll — Three.js, WebGL, dan GSAP dalam satu scene berkelanjutan.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-2">
            {["Three.js", "WebGL", "GSAP ScrollTrigger", "Scroll-Driven Storytelling", "Performance Tuned"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-white/15 text-[11px] tracking-wide text-white/65"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
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
              <span data-reveal className="block text-[11px] tracking-[0.4em] text-primary mb-5">
                {chapter.index}
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
          <h2 data-reveal className="font-display font-bold text-3xl sm:text-5xl text-white max-w-2xl leading-tight">
            Mau pengalaman seperti ini untuk brand Anda?
          </h2>
          <p data-reveal className="mt-5 max-w-lg text-sm md:text-base text-white/60">
            Kami membangun scene 3D, scroll storytelling, dan micro-interaction yang tetap ringan di perangkat asli.
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
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Lihat portofolio
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Experience;
