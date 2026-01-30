import { motion } from "framer-motion";
import { Rocket, Sparkles, Globe, Layers } from "lucide-react";

export const FutureVisionSection = () => {
  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
              Our Vision
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Building the Future of
              <span className="text-gradient"> Digital Business</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              At Fusionify, we're not just building software – we're creating the 
              infrastructure for tomorrow's digital economy. Our vision is to empower 
              every business, from local UMKM to global enterprises, with the tools 
              they need to thrive in an increasingly digital world.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We believe in a future where automation handles the mundane, where 
              systems scale seamlessly with growth, and where technology becomes an 
              invisible but powerful enabler of human potential.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Rocket, label: "Innovation-Driven" },
                { icon: Globe, label: "Global Reach" },
                { icon: Layers, label: "Scalable Solutions" },
                { icon: Sparkles, label: "Future-Ready" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-gradient-card border border-border/50 p-8 overflow-hidden">
              {/* Animated glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="relative z-10">
                {/* Roadmap Timeline */}
                <div className="space-y-6">
                  {[
                    { year: "2020", title: "Founded", desc: "Started our journey" },
                    { year: "2022", title: "Ecosystem", desc: "Launched product suite" },
                    { year: "2024", title: "Expansion", desc: "National coverage" },
                    { year: "2025+", title: "Future", desc: "Regional expansion" },
                  ].map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      className="flex items-start gap-4"
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary/30" />
                        {index < 3 && (
                          <div className="w-0.5 h-12 bg-gradient-to-b from-primary/50 to-primary/10 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          {milestone.year}
                        </span>
                        <h4 className="font-display font-semibold text-foreground">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {milestone.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
