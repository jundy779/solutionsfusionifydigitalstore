import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Shield, TrendingUp, Heart, Clock } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

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
      if (current >= value) { setCount(value); clearInterval(timer); }
      else { setCount(Math.floor(current * 10) / 10); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value, isInView]);
  
  const displayValue = value >= 1000 
    ? `${(count / 1000).toFixed(count >= value ? 0 : 1)}K`
    : Number.isInteger(value) ? Math.floor(count) : count.toFixed(1);
  
  return {displayValue}{suffix};
};

export const ResultsSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const results = [
    { icon: Zap, value: 10000, suffix: "+", label: t("results.users") },
    { icon: Shield, value: 99.9, suffix: "%", label: t("results.uptime") },
    { icon: TrendingUp, value: 80, suffix: "%", label: t("results.efficiency") },
    { icon: Heart, value: 100, suffix: "%", label: t("results.satisfaction") },
    { icon: Clock, value: 24, suffix: "/7", label: t("results.support") },
  ];

  return (
    <section ref={ref} className="py-16 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={t("results.badge")}
          title={t("results.title")}
          titleHighlight={t("results.titleHighlight")}
          subtitle={t("results.subtitle")}
          subtitleClassName="max-w-xl"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {results.map((result, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }} className={`group p-4 sm:p-5 rounded-2xl bg-card/50 border border-border/50 text-center hover:border-primary/30 transition-all duration-300 ${index === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <motion.div className="w-11 h-11 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                <result.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-bold mb-1">
                <AnimatedCounter value={result.value} suffix={result.suffix} isInView={isInView} />
              </div>
              <p className="text-xs text-muted-foreground">{result.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
