import { motion } from "framer-motion";
import { CheckCircle2, Users, Code2, Clock, ArrowRight } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { useLanguage } from "@/contexts/LanguageContext";

export const AboutFusionifySection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Users, title: t("about.team.title"), description: t("about.team.desc") },
    { icon: Code2, title: t("about.tech.title"), description: t("about.tech.desc") },
    { icon: Clock, title: t("about.fast.title"), description: t("about.fast.desc") },
  ];

  const highlights = [
    t("about.highlight1"),
    t("about.highlight2"),
    t("about.highlight3"),
    t("about.highlight4"),
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 pt-16 pb-10 md:hidden">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-muted-foreground">{t("about.badge")}</span>
          </div>
          <h2 className="font-display font-bold text-3xl leading-tight text-foreground">
            {t("about.titlePrefix")}
            <span className="block text-gradient pt-1">{t("about.title")}</span>
          </h2>
        </motion.div>
      </div>

      <LampContainer className="hidden pt-20 pb-0 md:flex">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-muted-foreground">{t("about.badge")}</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground">
            {t("about.titlePrefix")}
            <span className="text-gradient"> {t("about.title")}</span>
          </h2>
        </motion.div>
      </LampContainer>

      <div className="container mx-auto px-4 relative z-10 pb-16 md:-mt-28 lg:-mt-40 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative">
            <div className="p-5 sm:p-8 rounded-2xl bg-card/50 border border-border/50 overflow-hidden backdrop-blur-sm">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center mb-6 overflow-hidden border border-primary/10">
                <motion.div className="text-center" animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <motion.div className="w-20 h-20 mx-auto mb-3 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20" animate={{ rotate: [0, 2, 0, -2, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                    <span className="text-4xl font-bold text-primary">F</span>
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-1">FUSIONIFY</h3>
                  <p className="text-sm text-muted-foreground">{t("about.digitalSolutions")}</p>
                </motion.div>
              </div>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">{t("about.description")}</p>
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }} className="group flex items-start gap-4 p-4 rounded-xl bg-card/50 hover:bg-card border border-border/50 hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.a href="#contact" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group text-sm font-medium">
              <span>{t("about.learnMore")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
