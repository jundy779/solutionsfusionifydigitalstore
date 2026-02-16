import { motion } from "framer-motion";
import { Rocket, Globe, Layers, Target } from "lucide-react";
import { SparklesText } from "@/components/ui/sparkles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useLanguage } from "@/contexts/LanguageContext";

export const FutureVisionSection = () => {
  const { t } = useLanguage();

  const pillItems = [
    { icon: Rocket, label: t("vision.innovation") },
    { icon: Globe, label: t("vision.global") },
    { icon: Layers, label: t("vision.scalable") },
    { icon: Target, label: t("vision.future") },
  ];

  const milestones = [
    { year: "2020", title: t("vision.founded"), desc: t("vision.foundedDesc"), active: true },
    { year: "2022", title: t("vision.ecosystem"), desc: t("vision.ecosystemDesc"), active: true },
    { year: "2024", title: t("vision.expansion"), desc: t("vision.expansionDesc"), active: true },
    { year: "2025+", title: t("vision.futureLabel"), desc: t("vision.futureDesc"), active: false },
  ];

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/3 right-0 w-[400px] h-[400px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{t("vision.badge")}</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight text-foreground">
              {t("vision.title")}
              <SparklesText className="text-gradient" sparklesCount={8}>{" " + t("vision.titleHighlight").trim()}</SparklesText>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-5 leading-relaxed">{t("vision.desc1")}</p>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">{t("vision.desc2")}</p>

            <div className="grid grid-cols-2 gap-3">
              {pillItems.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }} className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-colors group">
                  <item.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 pl-10 md:pl-12">
              <TracingBeam className="px-0">
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div key={milestone.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }} className="flex items-start gap-4">
                      <div className="pb-1">
                        <span className={`text-xs font-medium uppercase tracking-wider ${milestone.active ? 'text-primary' : 'text-muted-foreground'}`}>{milestone.year}</span>
                        <h4 className="font-display font-semibold text-foreground text-sm">{milestone.title}</h4>
                        <p className="text-xs text-muted-foreground">{milestone.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TracingBeam>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
