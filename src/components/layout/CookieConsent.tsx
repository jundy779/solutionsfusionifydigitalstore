import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const COOKIE_KEY = "fusionify_cookie_consent";

type ConsentState = "accepted" | "rejected" | null;

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentState;
    if (!stored) {
      // Delay sedikit agar tidak langsung muncul saat halaman load
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

            <div className="p-4 md:p-5">
              {/* Header */}
              <div className="mb-3 flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Preferensi Cookie
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Kami menggunakan cookie untuk meningkatkan pengalaman browsing dan menganalisis trafik situs.{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      Kebijakan Privasi
                    </Link>
                  </p>
                </div>
                <button
                  onClick={handleReject}
                  className="mt-0.5 shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Tutup"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Details toggle */}
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mb-3 space-y-2 overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 rounded-lg bg-muted/50 p-3">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Cookie Esensial</p>
                      <p className="text-xs text-muted-foreground">
                        Diperlukan untuk fungsi dasar situs. Tidak dapat dinonaktifkan.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-lg bg-muted/50 p-3">
                    <BarChart2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Cookie Analitik</p>
                      <p className="text-xs text-muted-foreground">
                        Membantu kami memahami cara pengunjung menggunakan situs untuk peningkatan layanan.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAccept}
                  className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)] sm:flex-none"
                >
                  Terima Semua
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-border/80 hover:bg-muted hover:text-foreground sm:flex-none"
                >
                  Tolak Non-Esensial
                </button>
                <button
                  onClick={() => setShowDetails((v) => !v)}
                  className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  {showDetails ? "Sembunyikan" : "Detail cookie"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
