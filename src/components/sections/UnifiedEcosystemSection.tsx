import { useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Store, CreditCard, Shield, Network } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import illustrationEcosystem from "@/assets/illustration-ecosystem.png";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useLanguage } from "@/contexts/LanguageContext";

export const UnifiedEcosystemSection = () => {
  const { t } = useLanguage();

  const ecosystemSteps = [
    { icon: Bot, title: t("ecosystem.automation"), subtitle: "Fusionify Bot", description: t("ecosystem.automationDesc") },
    { icon: Store, title: t("ecosystem.systems"), subtitle: "Fusionify Store", description: t("ecosystem.systemsDesc") },
    { icon: Shield, title: t("ecosystem.cloud"), subtitle: "Infrastructure", description: t("ecosystem.cloudDesc") },
    { icon: CreditCard, title: t("ecosystem.payments"), subtitle: "FTVPay", description: t("ecosystem.paymentsDesc") },
  ];

  return (
    <section className="py-16 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <OptimizedImage src={illustrationEcosystem} alt="" className="w-full max-w-4xl opacity-[0.07] object-cover" aria-hidden="true" sizes="100vw" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]" animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.12) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={t("ecosystem.badge")}
          badgeIcon={Network}
          title={t("ecosystem.title")}
          titleHighlight={t("ecosystem.titleHighlight")}
          subtitle={t("ecosystem.subtitle")}
          subtitleClassName="max-w-2xl"
        />

        <EcosystemDesktop steps={ecosystemSteps} />

        <div className="lg:hidden space-y-3 max-w-sm mx-auto">
          {ecosystemSteps.map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}>
              <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-primary font-medium uppercase tracking-wider">{step.subtitle}</div>
                    <h3 className="font-display font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-xs">{step.description}</p>
                  </div>
                </div>
              </div>
              {index < ecosystemSteps.length - 1 && (
                <div className="flex justify-center py-1"><div className="w-px h-4 bg-gradient-to-b from-primary/30 to-primary/10" /></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="flex justify-center mt-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/50 bg-card/30">
            <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            <span className="text-sm text-muted-foreground">{t("ecosystem.status")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const EcosystemDesktop = ({ steps }: { steps: { icon: any; title: string; subtitle: string; description: string }[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const refs = [ref1, ref2, ref3, ref4];

  return (
    <div ref={containerRef} className="hidden lg:flex items-center justify-center gap-6 max-w-5xl mx-auto relative">
      {steps.map((step, index) => (
        <motion.div key={index} ref={refs[index]} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }} className="group">
          <div className="w-44 p-5 rounded-2xl bg-card/50 border border-border/50 text-center hover:border-primary/30 transition-all duration-300">
            <motion.div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3 border border-primary/20 group-hover:scale-105 transition-transform">
              <step.icon className="w-6 h-6 text-primary" />
            </motion.div>
            <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">{step.subtitle}</div>
            <h3 className="font-display font-semibold text-base text-foreground mb-1">{step.title}</h3>
            <p className="text-muted-foreground text-xs">{step.description}</p>
          </div>
        </motion.div>
      ))}
      <AnimatedBeam containerRef={containerRef} fromRef={ref1} toRef={ref2} curvature={-30} duration={5} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref2} toRef={ref3} curvature={-30} delay={0.5} duration={5} />
      <AnimatedBeam containerRef={containerRef} fromRef={ref3} toRef={ref4} curvature={-30} delay={1} duration={5} />
    </div>
  );
};
