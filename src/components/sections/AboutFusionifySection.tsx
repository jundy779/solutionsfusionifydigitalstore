import { motion } from "framer-motion";
import { CheckCircle2, Users, Code2, Clock, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Professional Experienced Team",
    description: "Skilled developers and consultants with years of industry experience",
  },
  {
    icon: Code2,
    title: "Latest Technologies & Best Practices",
    description: "We use modern tech stacks and follow industry-leading methodologies",
  },
  {
    icon: Clock,
    title: "Fast Response & Transparent Pricing",
    description: "Quick turnaround times with clear, upfront pricing - no hidden costs",
  },
];

export const AboutFusionifySection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center content-width-lg">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-gradient-card border border-border/50 p-8 overflow-hidden">
              {/* Glow effects */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <motion.div 
                      className="w-24 h-24 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-5xl font-bold text-primary">F</span>
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-1">
                      FUSIONIFY
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Digital Solutions
                    </p>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl glass">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">Your Complete Digital Partner</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
              About Fusionify
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Fusionify: Your Complete
              <span className="text-gradient"> Digital Partner</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Fusionify Digital Solutions helps businesses transform digitally with modern, 
              scalable solutions. From automation to cloud infrastructure, we provide 
              end-to-end digital services tailored to your needs.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <span className="font-medium">Learn more about us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
