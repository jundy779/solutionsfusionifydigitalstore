import { motion } from "framer-motion";
import { Bot, Store, CreditCard, Shield, ArrowRight, Zap, Network } from "lucide-react";

const ecosystemSteps = [
  {
    icon: Bot,
    title: "Automation",
    subtitle: "Fusionify Bot",
    description: "Intelligent automation platform",
    glowColor: "hsl(217 91% 60% / 0.4)",
  },
  {
    icon: Store,
    title: "Systems",
    subtitle: "Fusionify Store",
    description: "Digital products marketplace",
    glowColor: "hsl(265 75% 55% / 0.4)",
  },
  {
    icon: CreditCard,
    title: "Cloud",
    subtitle: "Infrastructure",
    description: "Scalable hosting solutions",
    glowColor: "hsl(190 95% 45% / 0.4)",
  },
  {
    icon: Shield,
    title: "Payments",
    subtitle: "FTVPay",
    description: "Seamless transactions",
    glowColor: "hsl(150 80% 45% / 0.4)",
  },
];

export const UnifiedEcosystemSection = () => {
  return (
    <section className="section-padding bg-gradient-cta relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.12) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Connection lines background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M10,50 Q30,20 50,50 T90,50"
            stroke="url(#lineGrad1)"
            strokeWidth="0.2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(217, 91%, 60%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(265, 75%, 55%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
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
            <Network className="w-4 h-4" />
            Connected Ecosystem
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            One Unified
            <span className="text-gradient"> Digital Flow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Fusionify connects automation, systems, payments, and digital services 
            into one seamless ecosystem for your business
          </p>
        </motion.div>

        {/* Ecosystem Flow - Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-4 content-width-lg">
          {ecosystemSteps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${step.glowColor} 0%, transparent 70%)`,
                  }}
                />
                
                <div className="relative w-48 p-6 rounded-2xl cinematic-card text-center">
                  <motion.div 
                    className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                    {step.subtitle}
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
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
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  className="mx-4 flex items-center"
                >
                  <motion.div 
                    className="w-12 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <ArrowRight className="w-5 h-5 text-primary/60" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Ecosystem Flow - Mobile */}
        <div className="lg:hidden space-y-4">
          {ecosystemSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative"
            >
              <div className="cinematic-card p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                      {step.subtitle}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
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
                  <motion.div 
                    className="w-0.5 h-6 bg-gradient-to-b from-primary/50 to-primary/10"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              )}
            </motion.div>
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
          <div className="flex items-center gap-3 px-6 py-3 rounded-full glass-premium">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground">
              All systems working together in real-time
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
