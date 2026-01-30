import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Database, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingShape = ({ className, delay = 0, children }: { className?: string; delay?: number; children?: React.ReactNode }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 3, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const GlowOrb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.15, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const DataFlowLine = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, pathLength: 0 }}
    animate={{ opacity: [0.2, 0.5, 0.2] }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
      <motion.path
        d="M0 50 Q 50 20, 100 50 T 200 50"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0] }}
        transition={{
          duration: 4,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(270, 70%, 60%)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

const Tech3DCard = ({ icon: Icon, label, className, delay = 0 }: { icon: any; label: string; className?: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -8, 0],
    }}
    transition={{
      opacity: { duration: 0.6, delay },
      scale: { duration: 0.6, delay },
      y: { duration: 4, delay: delay + 0.5, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    <div className="p-4 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground/80">{label}</span>
      </div>
    </div>
  </motion.div>
);

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glow orbs */}
        <GlowOrb className="w-[500px] h-[500px] bg-primary/20 -top-32 -left-32" delay={0} />
        <GlowOrb className="w-[400px] h-[400px] bg-accent/15 top-1/4 -right-20" delay={1} />
        <GlowOrb className="w-[300px] h-[300px] bg-primary/15 bottom-10 left-1/4" delay={2} />

        {/* Data flow lines */}
        <DataFlowLine className="w-[400px] h-[100px] top-1/3 left-10 opacity-30" delay={0} />
        <DataFlowLine className="w-[300px] h-[80px] bottom-1/3 right-20 rotate-12 opacity-20" delay={1.5} />

        {/* Floating 3D Tech Cards - Desktop only */}
        <div className="hidden lg:block">
          <Tech3DCard icon={Cpu} label="Automation" className="top-32 right-[15%]" delay={0.2} />
          <Tech3DCard icon={Database} label="Cloud" className="top-1/2 left-[8%]" delay={0.4} />
          <Tech3DCard icon={Workflow} label="Integration" className="bottom-40 right-[10%]" delay={0.6} />
          <Tech3DCard icon={Zap} label="Performance" className="bottom-1/4 left-[12%]" delay={0.8} />
        </div>

        {/* Floating abstract shapes */}
        <FloatingShape className="top-40 right-1/3" delay={0}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 blur-sm rotate-12" />
        </FloatingShape>
        <FloatingShape className="bottom-32 left-1/4" delay={1.5}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/40 to-primary/20 blur-sm -rotate-12" />
        </FloatingShape>
        <FloatingShape className="top-1/3 left-1/3" delay={2}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-transparent blur-sm rotate-45" />
        </FloatingShape>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">
              Your Digital Transformation Partner
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 tracking-tight"
          >
            Powering Your Digital
            <br />
            <span className="text-gradient">Transformation</span> with
            <br />
            Smart Automation
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Fusionify Digital Solutions helps businesses, UMKM, and individuals build 
            modern websites, automation systems, digital platforms, and cloud infrastructure 
            that grow with you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="h-14 px-8 text-base glow-primary">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-base glass border-border/50">
              Explore Solutions
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-border/30"
          >
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "99%", label: "Satisfaction Rate" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-blue">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
