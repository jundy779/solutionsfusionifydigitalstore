import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { useLanguage } from "@/contexts/LanguageContext";
import { AuroraBackground } from "@/components/ui/aurora-background";

export const CTASection = () => {
  const { t } = useLanguage();

  return (
    <AuroraBackground className="py-16 md:py-28">
      <div className="container mx-auto px-4 relative z-10 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary" /></div>
            <span className="text-sm font-medium text-muted-foreground">{t("cta.badge")}</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight text-foreground">
            {t("cta.title")}
            <br />
            <span className="text-gradient">{t("cta.titleHighlight")}</span>
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-10">
            <MovingBorderButton as="a" href="#contact" containerClassName="rounded-full" className="h-12 px-8 text-sm font-semibold bg-background text-foreground rounded-full">
              <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              <span>{t("cta.button")}</span>
            </MovingBorderButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-5 md:gap-8">
            {[t("cta.noCommitment"), t("cta.freeConsultation"), t("cta.fastResponse")].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
