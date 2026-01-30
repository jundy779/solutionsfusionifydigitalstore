import { motion } from "framer-motion";
import { Building2, Users, Target, Award } from "lucide-react";

const stats = [
  { icon: Building2, value: "2020", label: "Founded" },
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: Target, value: "100+", label: "Projects" },
  { icon: Award, value: "5+", label: "Years Experience" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center content-width-lg">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
              About Fusionify
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Building the Future of
              <span className="text-gradient"> Digital Business</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Fusionify Digital Solutions is part of the PT Fusionify Digital Store ecosystem, 
              focused on building scalable digital assets and services for businesses across Indonesia.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We combine cutting-edge technology with local market understanding to deliver 
              solutions that truly work for Indonesian businesses, from UMKM to enterprise.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-secondary/30 text-center"
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-gradient-card border border-border/50 p-8 overflow-hidden">
              {/* Background effects */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* Company Logo Area */}
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">F</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-1">
                      FUSIONIFY
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Digital Solutions
                    </p>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="p-4 rounded-xl glass">
                  <p className="text-sm text-muted-foreground italic text-center">
                    "Empowering Indonesian businesses with innovative digital solutions 
                    that drive growth and efficiency."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
