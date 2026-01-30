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
    description: "Custom websites and mobile applications built with modern frameworks. From landing pages to complex platforms, we deliver scalable and performant digital products.",
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Intelligent Telegram and WhatsApp bots to automate customer service, notifications, and business workflows. Reduce manual tasks and improve response times.",
  },
  {
    icon: Settings2,
    title: "Digital Systems & Integrations",
    description: "Seamless integration of third-party APIs, payment gateways, CRMs, and internal tools. We connect your systems for unified, efficient operations.",
  },
  {
    icon: Cloud,
    title: "Cloud & IT Support",
    description: "Cloud infrastructure setup, maintenance, and 24/7 IT support. We ensure your systems run smoothly with reliable hosting and proactive monitoring.",
  },
  {
    icon: Briefcase,
    title: "Project-based Services",
    description: "Flexible engagement for specific projects or short-term needs. From MVP development to system audits, we provide expert solutions on your timeline.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
            Layanan Digital Lengkap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Kami menyediakan berbagai layanan digital untuk membantu bisnis Anda 
            tumbuh dan berkembang di era digital.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
