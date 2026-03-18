import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Bot, Settings2, Cloud, Briefcase, ArrowRight } from "lucide-react";

const ALL_SERVICES = [
  {
    icon: Code2,
    label: "Web Development",
    description: "Landing page, e-commerce, SaaS & web app",
    href: "/services/web-development",
    color: "hsl(212 89% 45%)",
  },
  {
    icon: Bot,
    label: "Automation Bots",
    description: "Bot WhatsApp & Telegram 24/7",
    href: "/services/automation-bots",
    color: "hsl(265 75% 55%)",
  },
  {
    icon: Settings2,
    label: "Digital Systems",
    description: "Integrasi API, CRM, ERP & payment",
    href: "/services/digital-systems",
    color: "hsl(142 70% 45%)",
  },
  {
    icon: Cloud,
    label: "Cloud Support",
    description: "Managed server & monitoring 24/7",
    href: "/services/cloud-support",
    color: "hsl(200 90% 50%)",
  },
  {
    icon: Briefcase,
    label: "Project Services",
    description: "Konsultasi IT & MVP development",
    href: "/services/project-services",
    color: "hsl(30 90% 55%)",
  },
];

interface RelatedServicesProps {
  currentHref: string;
}

export const RelatedServices = ({ currentHref }: RelatedServicesProps) => {
  const related = ALL_SERVICES.filter((s) => s.href !== currentHref);

  return (
    <section className="py-20 border-t border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Layanan Lainnya</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
            Jelajahi <span className="text-gradient">Layanan Kami</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {related.map((service, i) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                to={service.href}
                className="group flex flex-col gap-3 p-5 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 h-full"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon className="w-5 h-5" style={{ color: service.color }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground mb-1">{service.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Lihat Detail <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
