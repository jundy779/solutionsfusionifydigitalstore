import { motion } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  TrendingUp, 
  Palette, 
  ShieldCheck, 
  Headphones 
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Website modern dan responsif dengan teknologi terkini untuk meningkatkan presence online bisnis Anda.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Aplikasi mobile yang intuitif untuk iOS dan Android dengan pengalaman pengguna terbaik.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategi pemasaran digital yang efektif untuk meningkatkan visibilitas dan konversi.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Desain antarmuka yang menarik dan user experience yang optimal untuk produk Anda.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    description: "Solusi keamanan siber untuk melindungi data dan infrastruktur digital bisnis.",
  },
  {
    icon: Headphones,
    title: "IT Consulting",
    description: "Konsultasi IT profesional untuk membantu transformasi digital dan optimalisasi sistem.",
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
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
