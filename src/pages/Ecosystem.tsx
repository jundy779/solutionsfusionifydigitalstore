import { motion } from "framer-motion";
import { Bot, Store, CreditCard, Shield, Gauge, Mail, Video, Upload, BookOpen, ExternalLink, Github, ArrowLeft, Sparkles, Wrench, Newspaper, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Ecosystem = () => {
  const { t } = useLanguage();

  const products = [
    {
      icon: Bot,
      title: "Fusionify Bot",
      subtitle: "Bot Platform",
      description: t("eco.bot.desc"),
      url: "https://bot.fusionify.biz.id/",
      status: t("products.available"),
      statusColor: "bg-green-500",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Store,
      title: "Premiumify",
      subtitle: "Digital Marketplace",
      description: t("eco.premiumify.desc"),
      url: "https://www.fusionifydigital.store/",
      status: t("products.available"),
      statusColor: "bg-green-500",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Shield,
      title: "FTV Injector & Tempest VPN",
      subtitle: "Network Security",
      description: t("eco.vpn.desc"),
      url: "https://peserta114-dm.karyakreasi.id/",
      status: t("products.available"),
      statusColor: "bg-green-500",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: CreditCard,
      title: "FTVPay",
      subtitle: "Payment Gateway",
      description: t("eco.ftvpay.desc"),
      url: null,
      status: t("products.comingSoon"),
      statusColor: "bg-amber-500",
      gradient: "from-amber-500/10 to-orange-500/10",
    },
  ];

  const tools = [
    {
      icon: Gauge,
      title: "SpeedTest",
      description: t("eco.speedtest.desc"),
      url: "https://fusiontempest.speedtestcustom.com/",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: Mail,
      title: "TMail Generator",
      description: t("eco.tmail.desc"),
      url: "https://tmail.fusionifydigital.my.id/",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Video,
      title: "FusionTik Downloader",
      description: t("eco.fusiontik.desc"),
      url: "https://fusiontik.vercel.app/",
      gradient: "from-rose-500/10 to-orange-500/10",
    },
    {
      icon: Upload,
      title: "Media Uploader",
      description: t("eco.uploader.desc"),
      url: "https://uploader.fusionifydigital.my.id/",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
  ];

  const projects = [
    {
      icon: Globe,
      title: "Cessa Snack",
      description: t("eco.cessasnack.desc"),
      url: "https://cessasnack.vercel.app/",
      gradient: "from-amber-500/10 to-yellow-500/10",
    },
    {
      icon: Globe,
      title: "Fahmi Collection",
      description: t("eco.fahmicollection.desc"),
      url: "https://fahmicollection.id/",
      gradient: "from-rose-500/10 to-pink-500/10",
    },
    {
      icon: Globe,
      title: "TokyoShop ID",
      description: t("eco.tokyoshop.desc"),
      url: "https://tokyoshop.id/",
      gradient: "from-blue-500/10 to-indigo-500/10",
    },
    {
      icon: Globe,
      title: "PT Quipanel",
      description: t("eco.quipanel.desc"),
      url: "https://precastquipanel.co.id/",
      gradient: "from-cyan-500/10 to-teal-500/10",
    },
    {
      icon: Globe,
      title: "SMK Pionir",
      description: t("eco.smkpionir.desc"),
      url: "https://smkpionir.sch.id/",
      gradient: "from-green-500/10 to-lime-500/10",
    },
  ];

  const media = [
    {
      icon: BookOpen,
      title: "Fusionify Blog",
      description: t("eco.blog.desc"),
      url: "https://fusionifydigital.blogspot.com/",
      gradient: "from-teal-500/10 to-green-500/10",
    },
    {
      icon: Github,
      title: "GitHub Organization",
      description: t("eco.github.desc"),
      url: "https://github.com/FUSIONIFY-ID",
      gradient: "from-gray-500/10 to-slate-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)", filter: "blur(80px)" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              {t("eco.backHome")}
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{t("eco.badge")}</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-5 text-foreground">
                {t("eco.title")}
                <span className="text-gradient">{t("eco.titleHighlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">{t("eco.subtitle")}</p>
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeader icon={Store} label={t("eco.productsLabel")} title={t("eco.productsTitle")} />
            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {products.map((product, index) => (
                <motion.div key={product.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeader icon={Wrench} label={t("eco.toolsLabel")} title={t("eco.toolsTitle")} />
            <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {tools.map((tool, index) => (
                <motion.a key={tool.title} href={tool.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${tool.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300 text-center h-full`}>
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
          </div>
        </section>

        {/* Project Solutions */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeader icon={Briefcase} label={t("eco.projectsLabel")} title={t("eco.projectsTitle")} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {projects.map((item, index) => (
                <motion.a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300 h-full`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Media & Community */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeader icon={Newspaper} label={t("eco.mediaLabel")} title={t("eco.mediaTitle")} />
            <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {media.map((item, index) => (
                <motion.a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300 h-full`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-4 text-foreground">{t("eco.ctaTitle")}</h2>
              <p className="text-muted-foreground mb-8">{t("eco.ctaSubtitle")}</p>
              <Link to="/#contact">
                <Button className="h-12 px-8 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  {t("eco.ctaButton")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
};

const SectionHeader = ({ icon: Icon, label, title }: { icon: any; label: string; title: string }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 max-w-5xl mx-auto">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="text-sm font-medium text-primary uppercase tracking-wider">{label}</span>
    </div>
    <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">{title}</h2>
  </motion.div>
);

const ProductCard = ({ icon: Icon, title, subtitle, description, url, status, statusColor, gradient }: any) => {
  const { t } = useLanguage();
  const content = (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${gradient} border border-border/50 hover:border-primary/30 transition-all duration-300 h-full`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs text-primary font-medium uppercase tracking-wider">{subtitle}</span>
              <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{title}</h3>
            </div>
            {url && <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary" />}
          </div>
          <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{description}</p>
          <div className="flex items-center gap-2">
            <motion.span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} animate={{ scale: status === t("products.available") ? [1, 1.3, 1] : 1 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            <span className="text-xs text-muted-foreground">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">{content}</a>
  ) : content;
};

export default Ecosystem;
