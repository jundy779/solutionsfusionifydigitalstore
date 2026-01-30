import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Database, Workflow, Zap, MessageCircle, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

// Cinematic 3D Floating Orb
const FloatingOrb = ({ 
  className, 
  delay = 0, 
  size = "w-32 h-32",
  variant = "blue" 
}: { 
  className?: string; 
  delay?: number; 
  size?: string;
  variant?: "blue" | "purple" | "cyan";
}) => {
  const variants = {
    blue: "orb-3d",
    purple: "orb-purple",
    cyan: "bg-gradient-to-br from-cyan-500/30 via-cyan-500/10 to-transparent",
  };

  return (
    <motion.div
      className={`absolute ${size} rounded-full ${variants[variant]} ${className}`}
      animate={{
        y: [0, -25, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Abstract 3D Tech Shape
const TechShape = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <div className="w-full h-full border border-primary/20 rounded-lg transform rotate-45" />
  </motion.div>
);

// Animated mesh/wave background
const MeshWave = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.svg
    className={`absolute ${className}`}
    viewBox="0 0 400 200"
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.1, 0.3, 0.1] }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.path
      d="M0 100 Q 100 50, 200 100 T 400 100"
      stroke="url(#meshGradient)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 0] }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <defs>
      <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0" />
        <stop offset="50%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(265, 75%, 55%)" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

// Floating tech card with glow
const Tech3DCard = ({ 
  icon: Icon, 
  label, 
  className, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  label: string; 
  className?: string; 
  delay?: number 
}) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -12, 0],
    }}
    transition={{
      opacity: { duration: 0.8, delay },
      scale: { duration: 0.8, delay },
      y: { duration: 5, delay: delay + 0.5, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    <div className="glass-premium p-4 rounded-2xl group hover:glow-border transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground/90">{label}</span>
      </div>
    </div>
  </motion.div>
);

// Data flow particles
const DataParticle = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute w-1.5 h-1.5 rounded-full bg-primary ${className}`}
    animate={{
      y: [0, -100, -200],
      x: [0, 20, -10, 30],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-hero">
      {/* Cinematic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <FloatingOrb 
          className="-top-20 -left-20 opacity-60" 
          size="w-[400px] h-[400px]" 
          variant="blue" 
          delay={0} 
        />
        <FloatingOrb 
          className="top-1/4 -right-32 opacity-50" 
          size="w-[350px] h-[350px]" 
          variant="purple" 
          delay={1.5} 
        />
        <FloatingOrb 
          className="bottom-10 left-1/4 opacity-40" 
          size="w-[250px] h-[250px]" 
          variant="cyan" 
          delay={3} 
        />

        {/* Abstract tech shapes */}
        <TechShape className="w-20 h-20 top-40 right-1/4 opacity-20" delay={0} />
        <TechShape className="w-16 h-16 bottom-1/3 left-20 opacity-15" delay={2} />
        <TechShape className="w-24 h-24 top-1/3 left-1/3 opacity-10" delay={4} />

        {/* Mesh waves */}
        <MeshWave className="w-[600px] h-[300px] top-1/3 left-0" delay={0} />
        <MeshWave className="w-[500px] h-[250px] bottom-1/4 right-0 rotate-180" delay={2} />

        {/* Data particles */}
        {[...Array(8)].map((_, i) => (
          <DataParticle 
            key={i} 
            className={`bottom-20`}
            delay={i * 0.5}
          />
        ))}

        {/* Floating 3D Tech Cards - Desktop only */}
        <div className="hidden lg:block">
          <Tech3DCard icon={Cpu} label="Automation" className="top-36 right-[12%]" delay={0.3} />
          <Tech3DCard icon={Database} label="Cloud" className="top-[45%] left-[6%]" delay={0.5} />
          <Tech3DCard icon={Workflow} label="Integration" className="bottom-36 right-[8%]" delay={0.7} />
          <Tech3DCard icon={Globe} label="Digital" className="bottom-[30%] left-[10%]" delay={0.9} />
          <Tech3DCard icon={Shield} label="Security" className="top-[60%] right-[15%]" delay={1.1} />
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Radial spotlight effect */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse at center, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium mb-10"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">
              Your Digital Transformation Partner
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-8 tracking-tight"
          >
            Powering Your Digital
            <br />
            <span className="text-gradient glow-text">Transformation</span> with
            <br />
            Smart Automation
          </motion.h1>

          {/* Indonesian Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Fusionify membantu bisnis, UMKM, dan perusahaan berkembang melalui solusi digital modern, 
            otomasi cerdas, dan infrastruktur teknologi terpercaya.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Button size="lg" className="h-14 px-10 text-base glow-primary group">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 text-base glass-premium border-primary/20 hover:border-primary/40">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Contact Us</span>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="pt-10 border-t border-border/30"
          >
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-20">
              {[
                { value: "100+", label: "Projects" },
                { value: "50+", label: "Clients" },
                { value: "99%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-blue group-hover:glow-text transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};
