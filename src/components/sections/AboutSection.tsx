import { motion } from "framer-motion";
import { CheckCircle2, Users, Award, Rocket } from "lucide-react";

const features = [
  "Tim profesional dan berpengalaman",
  "Teknologi terkini dan best practices",
  "Support 24/7 untuk klien",
  "Harga kompetitif dan transparan",
];

const stats = [
  { icon: Users, value: "50+", label: "Tim Ahli" },
  { icon: Award, value: "15+", label: "Penghargaan" },
  { icon: Rocket, value: "200+", label: "Proyek Sukses" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              About Us
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mt-4 mb-6">
              Partner Terpercaya untuk{" "}
              <span className="text-gradient">Transformasi Digital</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              PT FUSIONIFY DIGITAL STORE adalah perusahaan teknologi yang berfokus 
              pada penyediaan solusi digital inovatif. Dengan tim yang terdiri dari 
              para ahli di bidangnya, kami berkomitmen untuk membantu bisnis Anda 
              mencapai potensi maksimal di era digital.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="rounded-3xl bg-gradient-card border border-border p-8 shadow-elevated">
                <div className="aspect-square rounded-2xl bg-secondary/50 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center animate-float">
                      <span className="text-5xl font-display font-bold text-primary-foreground">F</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                      FUSIONIFY
                    </h3>
                    <p className="text-muted-foreground">
                      Digital Solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-2xl opacity-20 blur-xl animate-pulse-glow" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-2xl opacity-20 blur-xl animate-pulse-glow delay-1000" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
