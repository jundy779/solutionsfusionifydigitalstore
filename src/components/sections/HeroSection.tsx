import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Pure dark background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Central glow effect - Covena style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main center glow */}
        <motion.div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(ellipse at center, hsl(212 89% 45% / 0.25) 0%, hsl(265 75% 55% / 0.1) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        
        {/* Subtle secondary glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[500px]"
          animate={{
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{
            background: "radial-gradient(ellipse at center, hsl(265 75% 55% / 0.15) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge - Covena style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Digital Solutions Provider
            </span>
          </motion.div>

          {/* Main Heading - Covena typography style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 tracking-tight text-foreground"
          >
            Transform your business with
            <br />
            <span className="text-foreground">smart </span>
            <span className="text-gradient">automation</span>
            <span className="text-foreground"> and</span>
            <br />
            <span className="text-foreground">modern digital solutions.</span>
          </motion.h1>

          {/* Subheadline - Covena style muted */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Dipercaya oleh UMKM, startup, dan perusahaan yang mengandalkan solusi digital modern untuk pertumbuhan bisnis.
          </motion.p>

          {/* Single CTA - Covena style with arrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <Button 
              size="lg" 
              className="h-12 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 group rounded-full"
            >
              <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              <span>Book a consultation</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
