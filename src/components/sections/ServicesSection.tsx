import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Bot, Settings2, Cloud, Briefcase, ArrowUpRight } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import illustrationServices from "@/assets/illustration-services.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "./SectionHeader";

const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description: "Modern, scalable websites and mobile applications built with cutting-edge frameworks.",
    features: ["React/Next.js", "Mobile Apps", "E-commerce", "Landing Pages"],
    href: "/services/web-development",
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Intelligent WhatsApp and Telegram bots for auto order systems and workflow automation.",
    features: ["WhatsApp Bots", "Telegram Bots", "Auto Orders", "Notifications"],
    href: "/services/automation-bots",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Settings2,
    title: "Digital Systems & API",
    description: "Seamless API, CRM, and payment gateway integrations for unified operations.",
    features: ["API Integration", "CRM Systems", "Payment Gateway", "ERP"],
    href: "/services/digital-systems",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Cloud,
    title: "Cloud & IT Support",
    description: "Enterprise hosting, VPS, and infrastructure management with 99.9% uptime.",
    features: ["Cloud Hosting", "VPS Management", "Monitoring", "Security"],
    href: "/services/cloud-support",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Briefcase,
    title: "Project-Based Services",
    description: "Custom IT and software projects tailored to your specific business needs.",
    features: ["MVP Development", "Consulting", "System Audit", "Training"],
    href: "/services/project-services",
    className: "md:col-span-1 lg:col-span-1",
  },
];

export const ServicesSection = () => {
  const { t } = useLanguage();
  return (
    <section id="services" className="py-16 md:py-28 bg-background relative overflow-hidden">
      {/* Animated background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-1/4 w-[500px] h-[500px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px]"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Illustration */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <SectionHeader
            badge={t("services.badge")}
            title={t("services.titlePrefix")}
            titleHighlight={" " + t("services.title")}
            subtitle={t("services.subtitle")}
            align="left"
            maxSubtitleWidth="xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block"
          >
            <img 
              src={illustrationServices} 
              alt="Ilustrasi layanan pengembangan digital Fusionify" 
              className="w-full rounded-2xl opacity-80"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="gap-5">
          {services.map((service, index) => (
            <BentoGridItem
              key={service.title}
              index={index}
              className={service.className}
              icon={<service.icon className="w-6 h-6 text-primary" />}
              title={
                <Link 
                  to={service.href}
                  className="flex items-center justify-between gap-2 hover:text-primary transition-colors"
                >
                  <span>{service.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" />
                </Link>
              }
              description={
                <div>
                  <p className="mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 rounded-full bg-muted/50 border border-border/30 text-xs text-muted-foreground group-hover:border-primary/20 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};
