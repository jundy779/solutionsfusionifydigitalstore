import { motion } from "framer-motion";
import { CheckCircle2, Users, Code2, Clock, ArrowRight, Zap, Target, Layers } from "lucide-react";

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

const highlights = [
  { icon: Target, label: "Digital Solutions End-to-End" },
  { icon: Zap, label: "Automation Driven Workflows" },
  { icon: Layers, label: "Cloud Infrastructure Support" },
  { icon: CheckCircle2, label: "Scalable Systems" },
];

export const AboutFusionifySection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.06) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center content-width-lg">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="cinematic-card p-8 lg:p-10 overflow-hidden">
              {/* Animated glow effects */}
              <motion.div 
                className="absolute top-0 right-0 w-60 h-60 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(217 91% 60% / 0.2) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                {/* Brand Visual */}
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent flex items-center justify-center mb-8 overflow-hidden">
                  <motion.div 
                    className="text-center"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className="w-28 h-28 mx-auto mb-4 bg-primary/20 rounded-3xl flex items-center justify-center border border-primary/30 glow-border"
                      animate={{ rotate: [0, 3, 0, -3, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-6xl font-bold text-primary">F</span>
                    </motion.div>
                    <h3 className="font-display font-bold text-3xl text-foreground mb-2">
                      FUSIONIFY
                    </h3>
                    <p className="text-muted-foreground">
                      Digital Solutions
                    </p>
                  </motion.div>
                </div>

                {/* Highlight pills */}
                <div className="grid grid-cols-2 gap-3">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/30"
                    >
                      <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
              transition={{ duration: 0.5, delay: 0.5 }}
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
