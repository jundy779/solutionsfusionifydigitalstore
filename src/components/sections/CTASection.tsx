import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-cta relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
            Ready to Transform Your
            <span className="text-gradient"> Digital Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            Let's discuss how Fusionify can help you build, automate, and scale 
            your digital presence. Start your transformation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-base glow-primary">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-base glass border-border/50">
              Schedule a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
