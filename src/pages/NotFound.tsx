import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/SEOHead";
import { Home, ArrowRight, MessageCircle, Search } from "lucide-react";

const quickLinks = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Layanan Web", href: "/services/web-development" },
  { label: "Automation Bots", href: "/services/automation-bots" },
  { label: "Hubungi Kami", href: "/#contact", icon: MessageCircle },
];

const NotFound = () => {
  const location = useLocation();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    // Trigger glitch effect periodically
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <SEOHead
        title="404 — Halaman Tidak Ditemukan | Fusionify Digital Solutions"
        description="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Fusionify Digital Solutions."
      />

      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent/8 blur-[100px]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-4 select-none"
        >
          <span
            className={`text-[10rem] font-bold leading-none tracking-tighter transition-all duration-100 md:text-[14rem] ${
              glitchActive ? "text-accent" : "text-primary/20"
            }`}
            style={{
              textShadow: glitchActive
                ? "4px 0 hsl(var(--primary)), -4px 0 hsl(var(--accent))"
                : "none",
            }}
          >
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] font-bold leading-none tracking-tighter text-foreground/10 md:text-[14rem]">
            404
          </span>
        </motion.div>

        {/* Error badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
          <span className="text-sm font-medium text-destructive">
            Error 404 — Route tidak ditemukan
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-3 text-3xl font-bold text-foreground md:text-4xl"
        >
          Halaman Tidak Ditemukan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-2 max-w-md text-muted-foreground"
        >
          Oops! Halaman{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-primary">
            {location.pathname}
          </code>{" "}
          tidak dapat ditemukan.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10 text-sm text-muted-foreground/70"
        >
          Mungkin URL sudah berubah atau halaman telah dihapus.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            Hubungi Kami
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-3.5 w-3.5" />
            Atau langsung ke halaman populer:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group flex items-center justify-between rounded-lg border border-border bg-card/40 px-3 py-2.5 text-sm text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:text-foreground"
              >
                <span>{link.label}</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-xs text-muted-foreground/50"
        >
          © Fusionify Digital Solutions — PT Fusionify Digital Store
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
