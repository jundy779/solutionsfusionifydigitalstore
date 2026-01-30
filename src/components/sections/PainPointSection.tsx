import { motion } from "framer-motion";
import { Cog, Clock, Zap, TrendingDown } from "lucide-react";

const painPoints = [
  {
    icon: Cog,
    title: "Manual Processes & Inefficiency",
    description: "Wasting countless hours on repetitive tasks that drain productivity and resources",
  },
  {
    icon: Clock,
    title: "Slow Customer Response",
    description: "Missing opportunities because of delayed responses and outdated communication systems",
  },
  {
    icon: Zap,
    title: "Lack of Digital Automation",
    description: "Still relying on manual workflows that competitors have already automated",
  },
  {
    icon: TrendingDown,
    title: "Unscalable Systems",
    description: "Current infrastructure can't keep up with business growth and market demands",
  },
];

export const PainPointSection = () => {
  return (
    <section className="section-padding bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-destructive text-sm font-medium mb-4">
            The Challenge
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Is Your Business
            <span className="text-gradient"> Struggling With?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            These challenges are holding back thousands of businesses from reaching their potential
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 content-width-lg">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl glass hover:border-destructive/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-5 group-hover:bg-destructive/20 transition-colors">
                <point.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-3 text-foreground group-hover:text-destructive transition-colors">
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
