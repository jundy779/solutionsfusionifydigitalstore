import { motion } from "framer-motion";
import { Shield, Layers, Code2, Rocket, Headphones, CheckCircle } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Secure Systems",
    description: "Enterprise-grade security with encryption, access controls, and regular audits",
    gradient: "from-green-500/15 to-emerald-500/5",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Built to grow with your business, from startup to enterprise level",
    gradient: "from-blue-500/15 to-cyan-500/5",
  },
  {
    icon: Code2,
    title: "Modern Technology",
    description: "Using the latest frameworks and tools for optimal performance",
    gradient: "from-purple-500/15 to-pink-500/5",
  },
  {
    icon: Rocket,
    title: "Fast Implementation",
    description: "Rapid development and deployment without compromising quality",
    gradient: "from-orange-500/15 to-amber-500/5",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 responsive support team that understands your business needs",
    gradient: "from-cyan-500/15 to-blue-500/5",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.08) 0%, transparent 70%)",
          }}
          animate={{ x: [-50, 0, -50] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-0 w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          }}
          animate={{ x: [50, 0, 50] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Why Choose Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            The Fusionify
            <span className="text-gradient"> Advantage</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            What sets us apart from other digital solution providers
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 content-width-lg">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group cinematic-card p-6 md:p-8"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-premium">
            <motion.span 
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.3, 1] }}
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
