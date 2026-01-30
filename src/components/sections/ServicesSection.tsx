import { motion } from "framer-motion";
import { 
  Code2, 
  Bot, 
  Settings2, 
  Cloud, 
  Briefcase 
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description: "Custom websites and mobile applications built with modern frameworks. From landing pages to complex platforms, we deliver scalable digital products.",
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Intelligent Telegram and WhatsApp bots to automate customer service, notifications, and business workflows.",
  },
  {
    icon: Settings2,
    title: "Digital Systems & Integrations",
    description: "Seamless integration of third-party APIs, payment gateways, CRMs, and internal tools for unified operations.",
  },
  {
    icon: Cloud,
    title: "Cloud & IT Support",
    description: "Cloud infrastructure setup, maintenance, and 24/7 IT support with reliable hosting and proactive monitoring.",
  },
  {
    icon: Briefcase,
    title: "Project-based Services",
    description: "Flexible engagement for specific projects. From MVP development to system audits, expert solutions on your timeline.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background relative">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Our Services
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground tracking-tight">
            Layanan Digital Lengkap
          </h2>
          <p className="text-muted-foreground content-width-sm text-lg leading-relaxed">
            Kami menyediakan berbagai layanan digital untuk membantu bisnis Anda 
            tumbuh dan berkembang di era digital.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 content-width-lg"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ 
                y: -6, 
                transition: { duration: 0.25, ease: "easeOut" }
              }}
              className="group relative p-8 lg:p-10 rounded-2xl bg-card border border-border/80 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 cursor-pointer"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
