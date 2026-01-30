import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Tim profesional dan berpengalaman",
  "Teknologi terkini dan best practices",
  "Support responsif untuk klien",
  "Harga kompetitif dan transparan",
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center content-width-lg">
          {/* Left Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="rounded-3xl bg-card border border-border/80 p-6 lg:p-8 shadow-card">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-primary flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-5 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-primary-foreground">F</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-primary-foreground mb-1">
                      FUSIONIFY
                    </h3>
                    <p className="text-primary-foreground/80 text-sm tracking-wide">
                      Digital Solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-card rounded-2xl border border-border/80 p-5 lg:p-6 shadow-elevated"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">5+</span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">Years</div>
                    <div className="text-sm text-muted-foreground">Experience</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About Us
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[42px] mb-6 text-foreground leading-tight tracking-tight">
              Partner Terpercaya untuk Transformasi Digital
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Fusionify Digital Solutions adalah tim profesional yang berfokus 
              pada penyediaan solusi digital inovatif. Kami berkomitmen untuk 
              membantu bisnis Anda mencapai potensi maksimal di era digital.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground text-[15px]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
