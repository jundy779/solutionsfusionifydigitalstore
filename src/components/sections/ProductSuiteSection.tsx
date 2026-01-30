import { motion } from "framer-motion";
import { Bot, Store, CreditCard, Shield, ArrowUpRight } from "lucide-react";

const products = [
  {
    icon: Bot,
    title: "Fusionify Bot",
    subtitle: "Automation Platform",
    description: "Intelligent automation for Telegram & WhatsApp business workflows",
    status: "Available",
    statusColor: "bg-green-500",
    gradient: "from-blue-500/10 to-cyan-500/5",
  },
  {
    icon: Store,
    title: "Fusionify Store",
    subtitle: "Digital Marketplace",
    description: "Digital products marketplace for templates, tools, and resources",
    status: "Available",
    statusColor: "bg-green-500",
    gradient: "from-purple-500/10 to-pink-500/5",
  },
  {
    icon: CreditCard,
    title: "FTVPay",
    subtitle: "Payment Gateway",
    description: "Seamless payment processing for Indonesian businesses",
    status: "Roadmap",
    statusColor: "bg-amber-500",
    gradient: "from-green-500/10 to-emerald-500/5",
  },
  {
    icon: Shield,
    title: "Fusionify Tempest",
    subtitle: "VPN Service",
    description: "Secure, high-speed VPN for business and personal use",
    status: "Available",
    statusColor: "bg-green-500",
    gradient: "from-orange-500/10 to-amber-500/5",
  },
];

export const ProductSuiteSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
            Product Suite
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Fusionify
            <span className="text-gradient"> Ecosystem</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A complete suite of digital products and services for your business
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
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${product.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-card/80 border border-border/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <product.icon className="w-8 h-8 text-primary" />
                </div>
                
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
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${product.statusColor}`} />
                    <span className="text-xs text-muted-foreground font-medium">
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
