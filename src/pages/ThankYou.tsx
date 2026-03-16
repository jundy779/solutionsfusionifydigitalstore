import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle, Mail, Clock, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ThankYou() {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const submittedName = location.state?.name as string | undefined;

  const copy = {
    title: lang === "id" ? "Terima Kasih!" : "Thank You!",
    subtitle:
      lang === "id"
        ? `Konsultasi Anda telah kami terima${submittedName ? `, ${submittedName}` : ""}. Tim Fusionify akan segera menghubungi Anda.`
        : `We've received your consultation request${submittedName ? `, ${submittedName}` : ""}. The Fusionify team will get back to you shortly.`,
    nextSteps: lang === "id" ? "Apa yang terjadi selanjutnya?" : "What happens next?",
    steps: [
      {
        icon: Mail,
        title: lang === "id" ? "Email Konfirmasi" : "Confirmation Email",
        desc:
          lang === "id"
            ? "Cek inbox Anda — kami sudah mengirim ringkasan permintaan konsultasi."
            : "Check your inbox — we've sent a summary of your consultation request.",
        delay: 0.1,
      },
      {
        icon: Clock,
        title: lang === "id" ? "Respon dalam 24 Jam" : "Response within 24 Hours",
        desc:
          lang === "id"
            ? "Tim kami akan meninjau kebutuhan Anda dan menghubungi via email atau WhatsApp."
            : "Our team will review your needs and reach out via email or WhatsApp.",
        delay: 0.2,
      },
      {
        icon: CheckCircle2,
        title: lang === "id" ? "Sesi Konsultasi Gratis" : "Free Consultation Session",
        desc:
          lang === "id"
            ? "Kami jadwalkan sesi diskusi untuk memahami proyek Anda lebih dalam."
            : "We'll schedule a discussion session to better understand your project.",
        delay: 0.3,
      },
    ],
    whatsapp:
      lang === "id" ? "Hubungi via WhatsApp" : "Contact via WhatsApp",
    backHome: lang === "id" ? "Kembali ke Beranda" : "Back to Home",
    urgentNote:
      lang === "id"
        ? "Butuh respons lebih cepat? Chat langsung via WhatsApp."
        : "Need a faster response? Chat directly via WhatsApp.",
  };

  const phoneNumber = "6283111380628";
  const waMessage = encodeURIComponent(
    lang === "id"
      ? "Halo Fusionify! Saya sudah submit formulir konsultasi dan ingin follow up."
      : "Hello Fusionify! I've submitted the consultation form and would like to follow up."
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={lang === "id" ? "Terima Kasih | Fusionify Digital Solutions" : "Thank You | Fusionify Digital Solutions"}
        description={lang === "id" ? "Konsultasi Anda telah diterima. Tim Fusionify akan segera menghubungi Anda." : "Your consultation has been received. The Fusionify team will contact you shortly."}
        path="/thank-you"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-20 md:py-32 max-w-2xl">
        {/* Success icon + heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-success" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            {copy.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            {copy.subtitle}
          </motion.p>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8 mb-8"
        >
          <h2 className="font-display font-semibold text-lg text-foreground mb-6">{copy.nextSteps}</h2>
          <div className="space-y-5">
            {copy.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.55 + step.delay }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm mb-0.5">{step.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Urgent note + WA CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-5 mb-8"
        >
          <p className="text-sm text-muted-foreground mb-3">{copy.urgentNote}</p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#20BD5A] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {copy.whatsapp}
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.95 }}
          className="text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {copy.backHome}
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
