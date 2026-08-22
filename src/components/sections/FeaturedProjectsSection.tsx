import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "./SectionHeader";

export const FeaturedProjectsSection = () => {
  const { t } = useLanguage();

  const projects = [
    { title: t("projects.enterprise.title"), category: "Automation", description: t("projects.enterprise.desc"), tags: ["Telegram Bot", "WhatsApp", "API Integration"], metrics: t("projects.enterprise.metrics") },
    { title: t("projects.marketplace.title"), category: "Web Development", description: t("projects.marketplace.desc"), tags: ["React", "Node.js", "Payment Gateway"], metrics: t("projects.marketplace.metrics") },
    { title: t("projects.cloud.title"), category: "Cloud & IT", description: t("projects.cloud.desc"), tags: ["AWS", "Docker", "CI/CD"], metrics: t("projects.cloud.metrics") },
    { title: t("projects.bot.title"), category: "Automation", description: t("projects.bot.desc"), tags: ["Multi-channel", "Real-time", "Analytics"], metrics: t("projects.bot.metrics") },
  ];

  return (
    <section className="py-16 md:py-28 bg-card/30 border-y border-border/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/4 left-1/4 w-[500px] h-[500px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={t("projects.badge")}
          badgeDot
          title={t("projects.title")}
          titleHighlight={t("projects.titleHighlight")}
          subtitle={t("projects.subtitle")}
          subtitleClassName="max-w-2xl"
        />

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}>
              <CardContainer containerClassName="w-full">
                <CardBody className="rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300 overflow-hidden group cursor-pointer w-full">
                  <CardItem translateZ={30} className="h-28 sm:h-36 relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent w-full">
                    <CardItem translateZ={50} className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">{project.category}</span>
                    </CardItem>
                    <CardItem translateZ={60} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><ArrowUpRight className="w-4 h-4 text-primary-foreground" /></div>
                    </CardItem>
                    <CardItem translateZ={40} className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">{project.metrics}</span>
                    </CardItem>
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 blur-sm" style={{ transform: "translateZ(20px) translateX(-10px)" }} />
                  </CardItem>
                  <div className="p-4 sm:p-5">
                    <CardItem translateZ={25} className="w-full">
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    </CardItem>
                    <CardItem translateZ={15} className="w-full">
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                    </CardItem>
                    <CardItem translateZ={20} className="flex flex-wrap gap-1.5 w-full">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-muted/50 border border-border/30 text-xs text-muted-foreground">{tag}</span>
                      ))}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="text-center mt-10">
          <a href="/portfolio" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 bg-card/30 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group text-sm font-medium">
            <span>{t("projects.viewAll")}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
