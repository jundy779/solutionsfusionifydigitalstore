import { motion } from "framer-motion";
import { Cog, Clock, DollarSign, Zap } from "lucide-react";
import illustrationPainpoint from "@/assets/illustration-painpoint.png";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useLanguage } from "@/contexts/LanguageContext";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SectionHeader } from "./SectionHeader";

export const PainPointSection = () => {
  const { t } = useLanguage();

  const painPoints = [
    { icon: Cog, title: t("pain.manual.title"), description: t("pain.manual.desc") },
    { icon: Clock, title: t("pain.slow.title"), description: t("pain.slow.desc") },
    { icon: Zap, title: t("pain.inefficient.title"), description: t("pain.inefficient.desc") },
    { icon: DollarSign, title: t("pain.cost.title"), description: t("pain.cost.desc") },
  ];

  return (
    <section className="py-16 md:py-28 bg-card/30 border-y border-border/40 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, hsl(0 84% 60% / 0.08) 0%, transparent 60%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <SectionHeader
            badge={t("pain.badge")}
            badgeDot
            badgeVariant="destructive"
            title={t("pain.title")}
            titleHighlight={t("pain.titleHighlight")}
            subtitle={t("pain.subtitle")}
            align="left"
            subtitleClassName="max-w-xl"
          />

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="hidden lg:flex justify-center">
            <OptimizedImage src={illustrationPainpoint} alt="Ilustrasi tantangan bisnis digital yang dihadapi UMKM dan perusahaan" className="w-72 h-72 object-contain opacity-70 rounded-2xl" sizes="(max-width: 1024px) 0px, 288px" />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto">
          <HoverEffect
            items={painPoints.map((point) => ({
              icon: (
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <point.icon className="w-6 h-6 text-destructive/80" />
                </div>
              ),
              title: point.title,
              description: point.description,
            }))}
          />
        </motion.div>
      </div>
    </section>
  );
};
