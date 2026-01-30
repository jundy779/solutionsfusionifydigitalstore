import { motion } from "framer-motion";
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
    description: "Modern scalable websites & mobile apps built with cutting-edge frameworks and best practices.",
    features: ["React/Next.js", "Mobile Apps", "E-commerce"],
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Intelligent Telegram & WhatsApp bots for auto order systems and workflow automation.",
    features: ["Telegram Bots", "WhatsApp API", "Auto Orders"],
  },
  {
    icon: Settings2,
    title: "Digital Systems & Integrations",
    description: "Seamless API, CRM, and payment gateway integrations for unified operations.",
    features: ["API Integration", "CRM Systems", "Payment Gateway"],
  },
  {
    icon: Cloud,
    title: "Cloud & IT Solutions",
    description: "Enterprise hosting, VPS, and infrastructure management with 99.9% uptime.",
    features: ["Cloud Hosting", "VPS Management", "Monitoring"],
  },
  {
    icon: Briefcase,
    title: "Project-Based Services",
    description: "Custom IT & software projects tailored to your specific business needs.",
    features: ["MVP Development", "System Audit", "Consulting"],
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Complete Digital
            <span className="text-gradient"> Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Everything you need to build, automate, and scale your digital presence
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 content-width-lg">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-secondary/50 text-xs text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
