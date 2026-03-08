import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

export const NewsletterSection = () => {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg(lang === "id" ? "Format email tidak valid." : "Invalid email format.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase(), name: name.trim() || null, source: "website" });

    if (error) {
      if (error.code === "23505") {
        // Duplicate email
        setErrorMsg(
          lang === "id"
            ? "Email ini sudah terdaftar sebelumnya."
            : "This email is already subscribed."
        );
        setStatus("error");
      } else {
        setErrorMsg(
          lang === "id"
            ? "Terjadi kesalahan. Coba lagi."
            : "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    } else {
      setStatus("success");
      setEmail("");
      setName("");
    }
  };

  return (
    <section className="relative overflow-hidden py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/2 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-primary/8 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Mail className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">
              {lang === "id" ? "Newsletter Fusionify" : "Fusionify Newsletter"}
            </span>
          </div>

          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            {lang === "id"
              ? "Dapatkan Tips Digital & Update Terbaru"
              : "Get Digital Tips & Latest Updates"}
          </h2>
          <p className="mb-8 text-muted-foreground">
            {lang === "id"
              ? "Tips transformasi digital, case study, dan promo eksklusif langsung ke inbox kamu. Tanpa spam."
              : "Digital transformation tips, case studies, and exclusive offers straight to your inbox. No spam."}
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-6"
            >
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-semibold text-foreground">
                {lang === "id" ? "Berhasil subscribe!" : "Successfully subscribed!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {lang === "id"
                  ? "Terima kasih! Kamu akan mendapat update terbaru dari Fusionify."
                  : "Thank you! You'll receive the latest updates from Fusionify."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "id" ? "Nama kamu (opsional)" : "Your name (optional)"}
                  maxLength={100}
                  className="flex-1 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 backdrop-blur-sm"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder={lang === "id" ? "Masukkan email kamu" : "Enter your email"}
                  required
                  maxLength={255}
                  className="flex-1 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)] disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {lang === "id" ? "Subscribe" : "Subscribe"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
              {status === "error" && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}
              <p className="text-xs text-muted-foreground/60">
                {lang === "id"
                  ? "Dengan subscribe, kamu menyetujui kebijakan privasi kami. Bisa unsubscribe kapan saja."
                  : "By subscribing, you agree to our privacy policy. Unsubscribe anytime."}
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
