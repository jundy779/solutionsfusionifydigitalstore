import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp, Headphones, Code } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Faster Digital Processes",
    value: "10x",
    description: "Speed up your operations with automation",
  },
  {
    icon: Shield,
    title: "Secure Systems",
    value: "99.9%",
    description: "Enterprise-grade security standards",
  },
  {
    icon: TrendingUp,
    title: "Automated Operations",
    value: "80%",
    description: "Tasks automated saving hours daily",
  },
  {
    icon: Code,
    title: "Professional Workflow",
    value: "100%",
    description: "Industry best practices implemented",
  },
  {
    icon: Headphones,
    title: "Responsive Support",
    value: "24/7",
    description: "Always here when you need us",
  },
];

export const WhyFusionifySection = () => {
  return (
    <section className="section-padding bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Why Fusionify
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Built for
            <span className="text-gradient"> Results</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            We deliver measurable improvements to your business operations
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 content-width-lg">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gradient-card border border-border/50 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gradient-blue mb-2">
                {feature.value}
              </div>
              <h3 className="font-display font-semibold text-sm mb-1 text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
