import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, Wallet, ArrowUpRight } from "lucide-react";

const impactCases = [
  {
    icon: Clock,
    metric: "10x",
    title: "Faster Operations",
    description: "E-commerce client automated order processing, reducing manual work from hours to minutes",
    industry: "E-commerce",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: TrendingUp,
    metric: "300%",
    title: "Revenue Growth",
    description: "Digital store integrated with payment gateway and automation, tripling monthly sales",
    industry: "Digital Products",
    gradient: "from-green-500/10 to-emerald-500/5",
  },
  {
    icon: Shield,
    metric: "99.9%",
    title: "System Uptime",
    description: "Enterprise infrastructure migration to cloud with zero downtime guarantee",
    industry: "Enterprise",
    gradient: "from-purple-500/10 to-pink-500/5",
  },
  {
    icon: Wallet,
    metric: "80%",
    title: "Cost Reduction",
    description: "SME automated repetitive tasks, dramatically reducing operational overhead",
    industry: "SME",
    gradient: "from-orange-500/10 to-amber-500/5",
  },
];

export const BusinessImpactSection = () => {
  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
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
            Business
            <span className="text-gradient"> Impact Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Real transformations delivered to businesses across Indonesia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 content-width-lg">
          {impactCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-primary font-medium uppercase tracking-wider">
                        {item.industry}
                      </span>
                      <div className="text-3xl font-bold text-gradient-blue">
                        {item.metric}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Join 50+ businesses already transformed
          </div>
        </motion.div>
      </div>
    </section>
  );
};
