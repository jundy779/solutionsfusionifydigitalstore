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

const highlights = [
  "Digital Solutions End-to-End",
  "Automation Driven Workflows",
  "Cloud Infrastructure Support",
  "Scalable Systems",
];

export const AboutFusionifySection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 right-0 w-[500px] h-[500px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="p-8 rounded-2xl bg-card/50 border border-border/50 overflow-hidden">
              {/* Brand Visual */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center mb-6 overflow-hidden border border-primary/10">
                <motion.div 
                  className="text-center"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-3 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20"
                    animate={{ rotate: [0, 2, 0, -2, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-4xl font-bold text-primary">F</span>
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-1">
                    FUSIONIFY
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Digital Solutions
                  </p>
                </motion.div>
              </div>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-2">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/30"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium text-muted-foreground">About Fusionify</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 leading-tight text-foreground">
              Your Complete
              <span className="text-gradient"> Digital Partner</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Fusionify Digital Solutions helps businesses transform digitally with modern, 
              scalable solutions. From automation to cloud infrastructure, we provide 
              end-to-end digital services tailored to your needs.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-card/50 hover:bg-card border border-border/50 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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
              transition={{ duration: 0.4, delay: 0.5 }}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group text-sm font-medium"
            >
              <span>Learn more about us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
