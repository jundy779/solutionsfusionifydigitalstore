import { motion } from "framer-motion";
import { Gauge, Mail, Video, Upload, ExternalLink, Wrench } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const FreeToolsSection = () => {
  const { t } = useLanguage();

  const tools = [
    {
      icon: Gauge,
      title: "SpeedTest",
      description: t("tools.speedtest.desc"),
      url: "https://fusiontempest.speedtestcustom.com/",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "hover:border-blue-500/30",
    },
    {
      icon: Mail,
      title: "TMail Generator",
      description: t("tools.tmail.desc"),
      url: "https://tmail.fusionifydigital.my.id/",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "hover:border-purple-500/30",
    },
    {
      icon: Video,
      title: "FusionTik",
      description: t("tools.fusiontik.desc"),
      url: "https://fusiontik.vercel.app/",
      color: "from-rose-500/20 to-orange-500/20",
      borderColor: "hover:border-rose-500/30",
    },
    {
      icon: Upload,
      title: "Media Uploader",
      description: t("tools.uploader.desc"),
      url: "https://uploader.fusionifydigital.my.id/",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "hover:border-green-500/30",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={t("tools.badge")}
          badgeIcon={Wrench}
          title={t("tools.title")}
          titleHighlight={t("tools.titleHighlight")}
          subtitle={t("tools.subtitle")}
          subtitleClassName="max-w-xl"
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <motion.a
              key={tool.title}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group"
            >
              <div className={`p-6 rounded-2xl bg-card/50 border border-border/50 ${tool.borderColor} transition-all duration-300 text-center h-full`}>
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{tool.title}</h3>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="flex justify-center mt-8">
          <Link to="/ecosystem" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            {t("tools.viewAll")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
