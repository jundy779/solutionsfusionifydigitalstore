import { motion } from "framer-motion";
import { Rocket, Sparkles, Globe, Layers, Target, Zap } from "lucide-react";

export const FutureVisionSection = () => {
  return (
    <section className="section-padding bg-gradient-section-alt relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.06) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center content-width-lg">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              Our Vision
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
              Building the Future of
              <span className="text-gradient"> Digital Business</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              At Fusionify, we're not just building software – we're creating the 
              infrastructure for tomorrow's digital economy. Our vision is to empower 
              every business, from local UMKM to global enterprises, with the tools 
              they need to thrive in an increasingly digital world.
            </p>
            <p className="text-muted-foreground mb-10 leading-relaxed">
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
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-transparent hover:border-primary/20 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="cinematic-card p-8 lg:p-10 overflow-hidden">
              {/* Animated glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <div className="relative z-10">
                {/* Roadmap Timeline */}
                <div className="space-y-8">
                  {[
                    { year: "2020", title: "Founded", desc: "Started our journey", active: true },
                    { year: "2022", title: "Ecosystem", desc: "Launched product suite", active: true },
                    { year: "2024", title: "Expansion", desc: "National coverage", active: true },
                    { year: "2025+", title: "Future", desc: "Regional expansion", active: false },
                  ].map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                      className="flex items-start gap-5"
                    >
                      <div className="relative flex flex-col items-center">
                        <motion.div 
                          className={`w-4 h-4 rounded-full ${milestone.active ? 'bg-primary' : 'bg-muted'} border-2 ${milestone.active ? 'border-primary/40' : 'border-muted/40'}`}
                          animate={milestone.active ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {index < 3 && (
                          <div className={`w-0.5 h-14 mt-2 ${milestone.active ? 'bg-gradient-to-b from-primary/60 to-primary/20' : 'bg-muted/30'}`} />
                        )}
                      </div>
                      <div className="pb-2">
                        <span className={`text-xs font-medium uppercase tracking-wider ${milestone.active ? 'text-primary' : 'text-muted-foreground'}`}>
                          {milestone.year}
                        </span>
                        <h4 className="font-display font-semibold text-lg text-foreground">
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
