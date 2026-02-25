import { motion } from "framer-motion";
import { Bot, Store, CreditCard, Shield, ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const ProductSuiteSection = () => {
  const { t } = useLanguage();

  const products = [
    {
      icon: Bot,
      title: "Fusionify Bot",
      subtitle: "Bot Platform",
      description: t("products.automation.desc"),
      status: t("products.available"),
      statusColor: "bg-green-500",
      url: "https://bot.fusionify.biz.id/",
    },
    {
      icon: Store,
      title: "Premiumify",
      subtitle: "Digital Marketplace",
      description: t("products.store.desc"),
      status: t("products.available"),
      statusColor: "bg-green-500",
      url: "https://www.fusionifydigital.store/",
    },
    {
      icon: Shield,
      title: "FTV Injector & Tempest VPN",
      subtitle: "Network Security",
      description: t("products.vpn.desc"),
      status: t("products.available"),
      statusColor: "bg-green-500",
      url: "https://peserta114-dm.karyakreasi.id/",
    },
    {
      icon: CreditCard,
      title: "FTVPay",
      subtitle: "Payment Gateway",
      description: t("products.pay.desc"),
      status: t("products.comingSoon"),
      statusColor: "bg-amber-500",
      url: null,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/3 right-0 w-[400px] h-[400px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(265 75% 55% / 0.08) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-primary" /></div>
            <span className="text-sm font-medium text-muted-foreground">{t("products.badge")}</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
            {t("products.title")}
            <span className="text-gradient">{t("products.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">{t("products.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {products.map((product, index) => {
            const CardContent = (
              <div className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <motion.div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <product.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs text-primary font-medium uppercase tracking-wider">{product.subtitle}</span>
                        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{product.title}</h3>
                      </div>
                      {product.url ? (
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary" />
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <motion.span className={`w-1.5 h-1.5 rounded-full ${product.statusColor}`} animate={{ scale: product.status === t("products.available") ? [1, 1.3, 1] : 1 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                      <span className="text-xs text-muted-foreground">{product.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div key={product.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }} className="group">
                {product.url ? (
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="flex justify-center mt-8">
          <Link to="/ecosystem" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
            {t("products.viewAll")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
