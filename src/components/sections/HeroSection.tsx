import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: ShieldCheck, label: "Secure Process" },
  { icon: Zap, label: "Fast Response" },
  { icon: Users, label: "Professional Team" },
];

const FloatingShape = ({ 
  className, 
  delay = 0,
  duration = 6 
}: { 
  className: string; 
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: [0.4, 0.6, 0.4],
      scale: [1, 1.05, 1],
      y: [0, -20, 0],
      rotate: [0, 5, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(217 91% 60% / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(199 89% 48% / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, hsl(217 91% 60% / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(217 91% 60% / 0.15) 0%, transparent 50%)",
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating 3D Tech Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orb 1 */}
        <FloatingShape
          className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
          delay={0}
          duration={8}
        />
        
        {/* Gradient Orb 2 */}
        <FloatingShape
          className="absolute top-1/3 right-[15%] w-48 h-48 rounded-full bg-gradient-to-tl from-primary/15 to-accent/10 blur-2xl"
          delay={2}
          duration={7}
        />

        {/* Geometric Shape 1 - Rotating Cube-like */}
        <motion.div
          className="absolute top-[20%] right-[25%] w-16 h-16"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.6,
            rotateX: [0, 360],
            rotateY: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 backdrop-blur-sm border border-primary/20 shadow-lg" />
        </motion.div>

        {/* Geometric Shape 2 - Diamond */}
        <motion.div
          className="absolute bottom-[30%] left-[20%] w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.5,
            rotate: [45, 405],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="w-full h-full rounded-md bg-gradient-to-tr from-primary/25 to-transparent border border-primary/15" />
        </motion.div>

        {/* Geometric Shape 3 - Circle Ring */}
        <motion.div
          className="absolute top-[60%] right-[10%] w-20 h-20"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.4,
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 3
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary/20 bg-transparent" />
        </motion.div>

        {/* Small floating dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 18}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm"
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">
              Your Digital Transformation Partner
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Build Better Digital
            <br />
            <motion.span 
              className="text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Solutions Together
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Kami membantu bisnis Anda berkembang dengan solusi digital yang inovatif, 
            modern, dan terpercaya. Dari website hingga aplikasi mobile.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Button variant="hero" size="xl">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-12 md:gap-16"
          >
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12 pt-8 border-t border-border/50"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-card/80 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <badge.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
