import { ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: ShieldCheck, label: "Secure Process" },
  { icon: Zap, label: "Fast Response" },
  { icon: Users, label: "Professional Team" },
];

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-20 bg-gradient-to-b from-secondary/50 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Your Digital Transformation Partner
          </div>

          {/* Main Heading */}
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 text-foreground tracking-tight">
            Build Better Digital
            <br />
            <span className="text-primary">Solutions Together</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Kami membantu bisnis Anda berkembang dengan solusi digital yang inovatif, 
            modern, dan terpercaya. Dari website hingga aplikasi mobile.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="h-12 px-8">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-12">
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "50+", label: "Happy Clients" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-8 border-t border-border">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
