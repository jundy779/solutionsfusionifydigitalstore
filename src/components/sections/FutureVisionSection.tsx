import { motion } from "framer-motion";
import { Rocket, Globe, Layers, Target } from "lucide-react";
import { SparklesText } from "@/components/ui/sparkles";
 import { TracingBeam } from "@/components/ui/tracing-beam";

export const FutureVisionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 right-0 w-[400px] h-[400px]"
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
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Our Vision</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight text-foreground">
              Building the Future of
              <SparklesText className="text-gradient" sparklesCount={8}>
                {" Digital Business"}
              </SparklesText>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-5 leading-relaxed">
              At Fusionify, we're not just building software – we're creating the 
              infrastructure for tomorrow's digital economy. Our vision is to empower 
              every business, from local UMKM to global enterprises.
            </p>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              We believe in a future where automation handles the mundane, where 
              systems scale seamlessly with growth, and where technology becomes an 
              invisible but powerful enabler of human potential.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Rocket, label: "Innovation-Driven" },
                { icon: Globe, label: "Global Reach" },
                { icon: Layers, label: "Scalable Solutions" },
                { icon: Target, label: "Future-Ready" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 transition-colors group"
                >
                  <item.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 pl-10 md:pl-12">
              {/* Roadmap Timeline */}
              <TracingBeam className="px-0">
              <div className="space-y-8">
                {[
                  { year: "2020", title: "Founded", desc: "Started our journey", active: true },
                  { year: "2022", title: "Ecosystem", desc: "Launched product suite", active: true },
                  { year: "2024", title: "Expansion", desc: "National coverage", active: true },
                  { year: "2025+", title: "Future", desc: "Regional expansion", active: false },
                ].map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="pb-1">
                      <span className={`text-xs font-medium uppercase tracking-wider ${milestone.active ? 'text-primary' : 'text-muted-foreground'}`}>
                        {milestone.year}
                      </span>
                      <h4 className="font-display font-semibold text-foreground text-sm">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              </TracingBeam>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
