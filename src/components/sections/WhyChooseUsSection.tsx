import { motion } from "framer-motion";
import { Shield, Layers, Code2, Rocket, Headphones, CheckCircle } from "lucide-react";
import illustrationWhychooseus from "@/assets/illustration-whychooseus.png";

const reasons = [
  {
    icon: Shield,
    title: "Secure Systems",
    description: "Enterprise-grade security with encryption, access controls, and regular audits",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Built to grow with your business, from startup to enterprise level",
  },
  {
    icon: Code2,
    title: "Modern Technology",
    description: "Using the latest frameworks and tools for optimal performance",
  },
  {
    icon: Rocket,
    title: "Fast Implementation",
    description: "Rapid development and deployment without compromising quality",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 responsive support team that understands your business needs",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Why Choose Us</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
              The Fusionify
              <span className="text-gradient"> Advantage</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
              What sets us apart from other digital solution providers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <img 
              src={illustrationWhychooseus} 
              alt="Why choose Fusionify illustration" 
              className="w-80 h-auto object-contain opacity-80 rounded-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/50 bg-card/30">
            <motion.span 
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-sm text-muted-foreground">
              Trusted by 50+ businesses across Indonesia
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
