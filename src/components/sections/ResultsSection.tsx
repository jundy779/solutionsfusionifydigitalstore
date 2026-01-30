import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Shield, TrendingUp, Heart, Clock } from "lucide-react";

const results = [
  {
    icon: Zap,
    value: 10000,
    suffix: "+",
    label: "Automated Transactions",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: Shield,
    value: 99.9,
    suffix: "%",
    label: "System Reliability",
    gradient: "from-green-500/10 to-emerald-500/5",
  },
  {
    icon: TrendingUp,
    value: 80,
    suffix: "%",
    label: "Efficiency Increase",
    gradient: "from-purple-500/10 to-pink-500/5",
  },
  {
    icon: Heart,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    gradient: "from-orange-500/10 to-amber-500/5",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Monitoring",
    gradient: "from-cyan-500/10 to-blue-500/5",
  },
];

const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
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
    <section ref={ref} className="section-padding bg-gradient-cta relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Real Results
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Proven
            <span className="text-gradient"> Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Numbers that demonstrate our commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 content-width-lg">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${result.gradient} border border-border/50 text-center hover:border-primary/30 transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                <result.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
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
