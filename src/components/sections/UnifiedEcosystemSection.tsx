import { motion } from "framer-motion";
import { Bot, Store, CreditCard, Shield, ArrowRight, Zap } from "lucide-react";

const ecosystemSteps = [
  {
    icon: Bot,
    title: "Automation Systems",
    subtitle: "Fusionify Bot",
    description: "Intelligent automation platform for business workflows",
    color: "from-blue-500/20 to-cyan-500/10",
    glowColor: "bg-blue-500/30",
  },
  {
    icon: Store,
    title: "Digital Marketplace",
    subtitle: "Fusionify Store",
    description: "Digital products and services marketplace",
    color: "from-purple-500/20 to-pink-500/10",
    glowColor: "bg-purple-500/30",
  },
  {
    icon: CreditCard,
    title: "Payment Gateway",
    subtitle: "FTVPay",
    description: "Seamless payment processing (coming soon)",
    color: "from-green-500/20 to-emerald-500/10",
    glowColor: "bg-green-500/30",
    comingSoon: true,
  },
  {
    icon: Shield,
    title: "VPN Infrastructure",
    subtitle: "Fusionify Tempest",
    description: "Secure, high-speed VPN services",
    color: "from-orange-500/20 to-amber-500/10",
    glowColor: "bg-orange-500/30",
  },
];

export const UnifiedEcosystemSection = () => {
  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
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
            Our Ecosystem
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            One Unified
            <span className="text-gradient"> Digital Flow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Fusionify connects automation, systems, payments, and digital services 
            into one seamless ecosystem for your business
          </p>
        </motion.div>

        {/* Ecosystem Flow - Desktop */}
        <div className="hidden lg:block content-width-lg">
          <div className="relative flex items-center justify-between">
            {ecosystemSteps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl ${step.glowColor} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className={`relative w-56 p-6 rounded-3xl bg-gradient-to-br ${step.color} border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300`}>
                    {step.comingSoon && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        Soon
                      </span>
                    )}
                    <div className="w-14 h-14 rounded-2xl bg-card/80 flex items-center justify-center mb-4 border border-border/50">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                      {step.subtitle}
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Connector Arrow */}
                {index < ecosystemSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                    className="mx-4 flex items-center"
                  >
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
                    <ArrowRight className="w-5 h-5 text-primary/60" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Central connection indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full glass">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                All systems working together in real-time
              </span>
            </div>
          </motion.div>
        </div>

        {/* Ecosystem Flow - Mobile */}
        <div className="lg:hidden space-y-4">
          {ecosystemSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className={`p-5 rounded-2xl bg-gradient-to-br ${step.color} border border-border/50`}>
                {step.comingSoon && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    Soon
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card/80 flex items-center justify-center flex-shrink-0 border border-border/50">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                      {step.subtitle}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Connector line */}
              {index < ecosystemSteps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-primary/40 to-primary/10" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
