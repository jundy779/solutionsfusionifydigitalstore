import { motion } from "framer-motion";
import { Bot, Store, CreditCard, Shield, ArrowUpRight, Package } from "lucide-react";

const products = [
  {
    icon: Bot,
    title: "Fusionify Automation",
    subtitle: "Bot Platform",
    description: "Intelligent automation for Telegram & WhatsApp business workflows",
    status: "Available",
    statusColor: "bg-green-500",
    gradient: "from-blue-500/20 to-cyan-500/10",
    glowColor: "hsl(217 91% 60% / 0.3)",
  },
  {
    icon: Shield,
    title: "Fusionify VPN",
    subtitle: "Tempest Service",
    description: "Secure, high-speed VPN for business and personal use",
    status: "Available",
    statusColor: "bg-green-500",
    gradient: "from-purple-500/20 to-pink-500/10",
    glowColor: "hsl(265 75% 55% / 0.3)",
  },
  {
    icon: Store,
    title: "Fusionify Store",
    subtitle: "Digital Marketplace",
    description: "Digital products marketplace for templates, tools, and resources",
    status: "Available",
    statusColor: "bg-green-500",
    gradient: "from-cyan-500/20 to-blue-500/10",
    glowColor: "hsl(190 95% 45% / 0.3)",
  },
  {
    icon: CreditCard,
    title: "FTVPay",
    subtitle: "Payment Gateway",
    description: "Seamless payment processing for Indonesian businesses",
    status: "Coming Soon",
    statusColor: "bg-amber-500",
    gradient: "from-amber-500/20 to-orange-500/10",
    glowColor: "hsl(45 90% 50% / 0.3)",
  },
];

export const ProductSuiteSection = () => {
  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.06) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            Product Suite
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Fusionify
            <span className="text-gradient"> Ecosystem</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            A complete suite of digital products and services for your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 content-width">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="group relative"
            >
              {/* Hover glow effect */}
              <motion.div 
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${product.glowColor} 0%, transparent 70%)`,
                }}
              />
              
              <div className={`relative cinematic-card p-6 md:p-8 bg-gradient-to-br ${product.gradient}`}>
                <div className="flex items-start gap-5">
                  <motion.div 
                    className="w-18 h-18 rounded-2xl bg-card/80 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 transition-colors"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <product.icon className="w-9 h-9 text-primary" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs text-primary font-medium uppercase tracking-wider">
                          {product.subtitle}
                        </span>
                        <h3 className="font-display font-semibold text-xl text-foreground group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary" />
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <motion.span 
                        className={`w-2 h-2 rounded-full ${product.statusColor}`}
                        animate={{ scale: product.status === "Available" ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="text-xs text-muted-foreground font-medium">
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
