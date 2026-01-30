import { motion } from "framer-motion";
import { AlertTriangle, Clock, Cog, ArrowRight, CheckCircle2 } from "lucide-react";

const problems = [
  {
    icon: Cog,
    title: "Manual Processes",
    description: "Wasting time on repetitive tasks that could be automated",
  },
  {
    icon: Clock,
    title: "Slow Digital Systems",
    description: "Outdated infrastructure holding back your growth",
  },
  {
    icon: AlertTriangle,
    title: "Lack of Automation",
    description: "Missing opportunities due to manual workflows",
  },
];

const solutions = [
  "End-to-end digital transformation",
  "Custom automation solutions",
  "Scalable cloud infrastructure",
  "Professional development workflow",
  "24/7 responsive support",
];

export const ProblemSolutionSection = () => {
  return (
    <section className="section-padding bg-gradient-section overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="content-width-lg">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
              The Challenge
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              Is Your Business Struggling With?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-2xl glass group hover:border-destructive/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Transition Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-20"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary rotate-90" />
            </div>
          </motion.div>

          {/* Solution */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
                The Solution
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
                Fusionify: Your Complete
                <span className="text-gradient"> Digital Partner</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We provide end-to-end digital solutions that transform how you do business. 
                From automation to cloud infrastructure, we've got you covered.
              </p>
              
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{solution}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-card border border-border/50 p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold text-primary">F</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2">
                    FUSIONIFY
                  </h3>
                  <p className="text-muted-foreground">
                    Digital Solutions
                  </p>
                  <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full glass">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-muted-foreground">Ready to transform</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
