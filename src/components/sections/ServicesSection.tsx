import { motion } from "framer-motion";
import { 
  Code2, 
  Bot, 
  Settings2, 
  Cloud, 
  Briefcase,
  ArrowUpRight,
  Sparkles
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description: "Modern, scalable websites and mobile applications built with cutting-edge frameworks.",
    features: ["React/Next.js", "Mobile Apps", "E-commerce", "Landing Pages"],
    gradient: "from-blue-500/15 to-cyan-500/5",
    iconBg: "bg-blue-500/20",
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Intelligent WhatsApp and Telegram bots for auto order systems and workflow automation.",
    features: ["WhatsApp Bots", "Telegram Bots", "Auto Orders", "Notifications"],
    gradient: "from-purple-500/15 to-pink-500/5",
    iconBg: "bg-purple-500/20",
  },
  {
    icon: Settings2,
    title: "Digital Systems & API",
    description: "Seamless API, CRM, and payment gateway integrations for unified operations.",
    features: ["API Integration", "CRM Systems", "Payment Gateway", "ERP"],
    gradient: "from-green-500/15 to-emerald-500/5",
    iconBg: "bg-green-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud & IT Support",
    description: "Enterprise hosting, VPS, and infrastructure management with 99.9% uptime.",
    features: ["Cloud Hosting", "VPS Management", "Monitoring", "Security"],
    gradient: "from-orange-500/15 to-amber-500/5",
    iconBg: "bg-orange-500/20",
  },
  {
    icon: Briefcase,
    title: "Project-Based Services",
    description: "Custom IT and software projects tailored to your specific business needs.",
    features: ["MVP Development", "Consulting", "System Audit", "Training"],
    gradient: "from-cyan-500/15 to-blue-500/5",
    iconBg: "bg-cyan-500/20",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-gradient-section-alt relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Our Services
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Complete Digital
            <span className="text-gradient"> Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Everything you need to build, automate, and scale your digital presence
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 content-width-lg">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group cinematic-card p-6 md:p-8"
            >
              <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary" />
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full bg-secondary/50 border border-border/30 text-xs text-muted-foreground group-hover:border-primary/20 transition-colors"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
