import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Shield, TrendingUp, Heart, Clock, Activity } from "lucide-react";

const results = [
  {
    icon: Zap,
    value: 10000,
    suffix: "+",
    label: "Users Impacted",
    gradient: "from-blue-500/15 to-cyan-500/5",
  },
  {
    icon: Shield,
    value: 99.9,
    suffix: "%",
    label: "System Uptime",
    gradient: "from-green-500/15 to-emerald-500/5",
  },
  {
    icon: TrendingUp,
    value: 80,
    suffix: "%",
    label: "Efficiency Increase",
    gradient: "from-purple-500/15 to-pink-500/5",
  },
  {
    icon: Heart,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    gradient: "from-orange-500/15 to-amber-500/5",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Support Available",
    gradient: "from-cyan-500/15 to-blue-500/5",
  },
];

const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2500;
    const steps = 80;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, isInView]);
  
  const displayValue = value >= 1000 
    ? `${(count / 1000).toFixed(count >= value ? 0 : 1)}K`
    : Number.isInteger(value) 
      ? Math.floor(count)
      : count.toFixed(1);
  
  return (
    <span className="text-gradient-blue">
      {displayValue}{suffix}
    </span>
  );
};

export const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-section-alt relative overflow-hidden">
      {/* Cinematic background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.1) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            Real Results
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Proven
            <span className="text-gradient"> Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Numbers that demonstrate our commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 content-width-lg">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group cinematic-card p-6 text-center"
            >
              <motion.div 
                className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${result.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <result.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:glow-text transition-all duration-300">
                <AnimatedCounter value={result.value} suffix={result.suffix} isInView={isInView} />
              </div>
              <p className="text-sm text-muted-foreground">
                {result.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
