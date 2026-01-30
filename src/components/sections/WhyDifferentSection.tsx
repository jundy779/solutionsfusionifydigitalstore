import { motion } from "framer-motion";
import { Cpu, Layers, Lock, Workflow, Headphones, Rocket } from "lucide-react";

const differentiators = [
  {
    icon: Cpu,
    title: "Automation-First Approach",
    description: "We build automation into everything from day one, not as an afterthought",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Solutions designed to grow from startup to enterprise without rebuilding",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security standards applied to every project we deliver",
  },
  {
    icon: Workflow,
    title: "Ecosystem Integration",
    description: "All products work together seamlessly in one connected digital flow",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 responsive support team that actually understands your business",
  },
  {
    icon: Rocket,
    title: "Rapid Deployment",
    description: "From concept to launch in weeks, not months, without compromising quality",
  },
];

export const WhyDifferentSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center content-width-lg">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
              Why Fusionify
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              What Makes Us
              <span className="text-gradient"> Different</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We're not just another digital agency. We're your long-term technology partner, 
              building solutions that scale with your ambitions and integrate seamlessly into 
              your business ecosystem.
            </p>

            {/* Key highlight */}
            <div className="p-6 rounded-2xl bg-gradient-card border border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">F</span>
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    The Fusionify Difference
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Automation + Scale + Security
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Automation-First", "Scalable", "Secure", "Integrated"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group p-5 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
