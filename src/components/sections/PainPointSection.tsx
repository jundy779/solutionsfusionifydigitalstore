import { motion } from "framer-motion";
import { Cog, Clock, DollarSign, Zap } from "lucide-react";

const painPoints = [
  {
    icon: Cog,
    title: "Manual Processes",
    description: "Wasting countless hours on repetitive tasks that drain productivity and resources",
    gradient: "from-red-500/10 to-orange-500/5",
  },
  {
    icon: Clock,
    title: "Slow Response",
    description: "Missing opportunities because of delayed responses and outdated communication",
    gradient: "from-orange-500/10 to-amber-500/5",
  },
  {
    icon: Zap,
    title: "Inefficient Systems",
    description: "Still relying on manual workflows that competitors have already automated",
    gradient: "from-amber-500/10 to-yellow-500/5",
  },
  {
    icon: DollarSign,
    title: "High Costs",
    description: "Operational expenses eating into profits due to lack of optimization",
    gradient: "from-yellow-500/10 to-lime-500/5",
  },
];

export const PainPointSection = () => {
  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(0 84% 60% / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
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
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-destructive text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            The Challenge
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Is Your Business
            <span className="text-gradient"> Struggling With?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            These challenges are holding back thousands of businesses from reaching their potential
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 content-width-lg">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`group cinematic-card p-6 md:p-8`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${point.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <point.icon className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-foreground group-hover:text-destructive transition-colors">
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
