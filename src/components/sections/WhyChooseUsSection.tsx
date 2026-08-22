import { motion } from "framer-motion";
import { Shield, Layers, Code2, Rocket, Headphones, CheckCircle } from "lucide-react";
import illustrationWhychooseus from "@/assets/illustration-whychooseus.png";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useLanguage } from "@/contexts/LanguageContext";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SectionHeader } from "./SectionHeader";

export const WhyChooseUsSection = () => {
  const { t } = useLanguage();

  const reasons = [
    { icon: Shield, title: t("why.secure.title"), description: t("why.secure.desc") },
    { icon: Layers, title: t("why.scalable.title"), description: t("why.scalable.desc") },
    { icon: Code2, title: t("why.modern.title"), description: t("why.modern.desc") },
    { icon: Rocket, title: t("why.fast.title"), description: t("why.fast.desc") },
    { icon: Headphones, title: t("why.support.title"), description: t("why.support.desc") },
  ];

  return (
    <section className="py-16 md:py-28 bg-card/30 border-y border-border/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/3 left-1/4 w-[400px] h-[400px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(265 75% 55% / 0.08) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <SectionHeader
            badge={t("why.badge")}
            badgeIcon={CheckCircle}
            title={t("why.title")}
            titleHighlight={t("why.titleHighlight")}
            subtitle={t("why.subtitle")}
            align="left"
            subtitleClassName="max-w-xl"
          />

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="hidden lg:flex justify-center">
            <OptimizedImage src={illustrationWhychooseus} alt="Ilustrasi keunggulan Fusionify Digital sebagai partner transformasi digital" className="w-80 h-auto object-contain opacity-80 rounded-2xl" sizes="(max-width: 1024px) 0px, 320px" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto">
          <HoverEffect
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            items={reasons.map((reason) => ({
              icon: (
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
              ),
              title: reason.title,
              description: reason.description,
            }))}
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/50 bg-card/30">
            <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            <span className="text-sm text-muted-foreground">{t("why.trust")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
