import { motion } from "framer-motion";
import { Bot, Store, Shield, CreditCard, ArrowUpRight } from "lucide-react";

const products = [
  {
    icon: Bot,
    title: "Fusionify Bot Automation",
    description: "Intelligent automation platform for Telegram & WhatsApp business workflows.",
    status: "Available",
    statusColor: "bg-green-500",
  },
  {
    icon: Store,
    title: "Fusionify Store",
    description: "Digital products marketplace for templates, tools, and resources.",
    status: "Available",
    statusColor: "bg-green-500",
  },
  {
    icon: Shield,
    title: "Fusionify Tempest VPN",
    description: "Secure, high-speed VPN service for business and personal use.",
    status: "Available",
    statusColor: "bg-green-500",
  },
  {
    icon: CreditCard,
    title: "FTVPay Payment Gateway",
    description: "Seamless payment processing solution for Indonesian businesses.",
    status: "Coming Soon",
    statusColor: "bg-amber-500",
  },
];

export const ProductEcosystemSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
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
            Fusionify
            <span className="text-gradient"> Product Suite</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A complete ecosystem of digital products and services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 content-width">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <product.icon className="w-7 h-7 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${product.statusColor}`} />
                    <span className="text-xs text-muted-foreground">
                      {product.status}
                    </span>
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
