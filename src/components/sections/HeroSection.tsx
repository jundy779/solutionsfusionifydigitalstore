import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Bot, Settings2, Cloud, Briefcase } from "lucide-react";
import { ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { TextGenerateEffectLines } from "@/components/ui/text-generate-effect";
import { Suspense, lazy } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import fusionifyLogo from "@/assets/fusionify-logo.png";


// Lazy load full-cinematic NASA Earth (Three.js)
const NasaGlobe = lazy(() =>
  import("@/components/ui/nasa-globe").then((m) => ({ default: m.NasaGlobe }))
);

export const HeroSection = () => {
  const { t } = useLanguage();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      id="home"
      className="group relative min-h-screen flex items-center justify-center pt-28 md:pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-background" aria-hidden="true" />

      {/* Spotlight Effect - follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              hsl(212 89% 45% / 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Globe Background - Cobe (lightweight 2D canvas, no Three.js) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] md:max-w-[700px] md:max-h-[700px] lg:max-w-[800px] lg:max-h-[800px]"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full animate-pulse"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(212 89% 45% / 0.15) 0%, hsl(212 89% 45% / 0.05) 50%, transparent 70%)",
                  }}
                />
              </div>
            }
          >
            <NasaGlobe className="w-full h-full cursor-grab" />
          </Suspense>
        </motion.div>
      </div>

      {/* Gradient overlay to blend globe with content */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge - Staggered Animation */}


          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex max-w-[92vw] items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
              className="w-5 h-5 shrink-0 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5, ease: "backOut" }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className="text-xs sm:text-sm font-medium text-muted-foreground text-center leading-snug"
            >
              {t("hero.badge")}
            </motion.span>

          </motion.div>

          {/* Main Heading - Text Generate Effect */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 tracking-tight">
            <TextGenerateEffectLines
              lines={[
                { text: t("hero.line1"), className: "text-foreground" },
                { text: t("hero.line2"), className: "text-foreground" },
                { text: t("hero.line3"), className: "text-foreground" },
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
              filter={true}
              duration={0.4}
              staggerDelay={0.08}
            />
          </h1>

          {/* Subheadline - Covena style muted */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Single CTA - Moving Border Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <MovingBorderButton
              as="a"
              href="#contact"
              containerClassName="rounded-full"
              className="h-12 px-8 text-sm font-semibold bg-background text-foreground rounded-full"
            >
              <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              <span>{t("hero.cta")}</span>
            </MovingBorderButton>
          </motion.div>

          {/* Service quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {[
              { icon: Code2, label: "Website UMKM", href: "/services/web-development", color: "hsl(212 89% 45%)" },
              { icon: Bot, label: "WhatsApp Automation", href: "/services/automation-bots", color: "hsl(265 75% 55%)" },
              { icon: Settings2, label: "Sistem Sederhana", href: "/services/digital-systems", color: "hsl(142 70% 45%)" },
              { icon: Cloud, label: "Domain & Hosting", href: "/services/cloud-support", color: "hsl(200 90% 50%)" },
              { icon: Briefcase, label: "Website Sekolah", href: "/services/project-services", color: "hsl(30 90% 55%)" },
            ].map((service, i) => (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <service.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: service.color }} />
                  {service.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust badges strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              { icon: ShieldCheck, labelId: "Proses Aman & Terpercaya", labelEn: "Secure & Trusted Process" },
              { icon: Zap, labelId: "Respon < 24 Jam", labelEn: "Response < 24 Hours" },
              { icon: Users, labelId: "50+ Klien Puas", labelEn: "50+ Happy Clients" },
            ].map((badge, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.07 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-sm text-xs text-muted-foreground"
              >
                <badge.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {t(`hero.badge${i}`)}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
