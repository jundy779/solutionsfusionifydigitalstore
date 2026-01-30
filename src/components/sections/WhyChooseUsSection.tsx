import { motion } from "framer-motion";
import { Shield, Layers, Code2, Rocket, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Secure Systems",
    description: "Enterprise-grade security with encryption, access controls, and regular audits",
    gradient: "from-green-500/10 to-emerald-500/5",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Built to grow with your business, from startup to enterprise level",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: Code2,
    title: "Modern Technology Stack",
    description: "Using the latest frameworks and tools for optimal performance",
    gradient: "from-purple-500/10 to-pink-500/5",
  },
  {
    icon: Rocket,
    title: "Fast Implementation",
    description: "Rapid development and deployment without compromising quality",
    gradient: "from-orange-500/10 to-amber-500/5",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 responsive support team that understands your business needs",
    gradient: "from-cyan-500/10 to-blue-500/5",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            The Fusionify
            <span className="text-gradient"> Advantage</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            What sets us apart from other digital solution providers
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 content-width-lg">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${reason.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300`}
            >
              <div className="w-14 h-14 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <reason.icon className="w-7 h-7 text-primary" />
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Trusted by 50+ businesses across Indonesia
          </div>
        </motion.div>
      </div>
    </section>
  );
};
