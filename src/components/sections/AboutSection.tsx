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
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="rounded-3xl bg-card border border-border p-8 shadow-card">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-primary flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-primary-foreground/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-primary-foreground">F</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-primary-foreground mb-1">
                      FUSIONIFY
                    </h3>
                    <p className="text-primary-foreground/80">
                      Digital Solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl border border-border p-6 shadow-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">5+</span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">Years</div>
                    <div className="text-sm text-muted-foreground">Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground">
              Partner Terpercaya untuk Transformasi Digital
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Fusionify Digital Solutions adalah tim profesional yang berfokus 
              pada penyediaan solusi digital inovatif. Kami berkomitmen untuk 
              membantu bisnis Anda mencapai potensi maksimal di era digital.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
