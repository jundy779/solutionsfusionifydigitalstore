import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Code2, 
  Bot, 
  Settings2, 
  Cloud, 
  Briefcase,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description: "Modern, scalable websites and mobile applications built with cutting-edge frameworks.",
    features: ["React/Next.js", "Mobile Apps", "E-commerce", "Landing Pages"],
    href: "/services/web-development",
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Intelligent WhatsApp and Telegram bots for auto order systems and workflow automation.",
    features: ["WhatsApp Bots", "Telegram Bots", "Auto Orders", "Notifications"],
    href: "/services/automation-bots",
  },
  {
    icon: Settings2,
    title: "Digital Systems & API",
    description: "Seamless API, CRM, and payment gateway integrations for unified operations.",
    features: ["API Integration", "CRM Systems", "Payment Gateway", "ERP"],
    href: "/services/digital-systems",
  },
  {
    icon: Cloud,
    title: "Cloud & IT Support",
    description: "Enterprise hosting, VPS, and infrastructure management with 99.9% uptime.",
    features: ["Cloud Hosting", "VPS Management", "Monitoring", "Security"],
    href: "/services/cloud-support",
  },
  {
    icon: Briefcase,
    title: "Project-Based Services",
    description: "Custom IT and software projects tailored to your specific business needs.",
    features: ["MVP Development", "Consulting", "System Audit", "Training"],
    href: "/services/project-services",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-1/4 w-[400px] h-[400px]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Our Services</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
            Complete Digital
            <span className="text-gradient"> Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Everything you need to build, automate, and scale your digital presence
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link 
                to={service.href}
                className="group block h-full p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary" />
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
