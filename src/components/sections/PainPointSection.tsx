import { motion } from "framer-motion";
import { Cog, Clock, DollarSign, Zap } from "lucide-react";

const painPoints = [
  {
    icon: Cog,
    title: "Manual Processes",
    description: "Wasting countless hours on repetitive tasks that drain productivity and resources",
  },
  {
    icon: Clock,
    title: "Slow Response",
    description: "Missing opportunities because of delayed responses and outdated communication",
  },
  {
    icon: Zap,
    title: "Inefficient Systems",
    description: "Still relying on manual workflows that competitors have already automated",
  },
  {
    icon: DollarSign,
    title: "High Costs",
    description: "Operational expenses eating into profits due to lack of optimization",
  },
];

export const PainPointSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(0 84% 60% / 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/20 bg-destructive/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-sm font-medium text-destructive/80">The Challenge</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
            Is Your Business
            <span className="text-gradient"> Struggling With?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            These challenges are holding back thousands of businesses from reaching their potential
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-destructive/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <point.icon className="w-6 h-6 text-destructive/80" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground group-hover:text-destructive/90 transition-colors">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
