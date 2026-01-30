import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    quote:
      "Fusionify transformed our entire business operations. The automation bots they built saved us 30+ hours per week on repetitive tasks.",
    name: "Ahmad Rizki",
    role: "CEO",
    company: "TechVenture Indonesia",
    avatar: "AR",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "Professional team with exceptional delivery. Our e-commerce platform saw a 200% increase in conversions after their redesign.",
    name: "Sarah Putri",
    role: "Marketing Director",
    company: "Belanja Mudah",
    avatar: "SP",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "The WhatsApp bot integration was a game-changer for our customer service. Response time dropped from hours to seconds.",
    name: "Budi Santoso",
    role: "Operations Manager",
    company: "ServisKu",
    avatar: "BS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "Fusionify's cloud solutions gave us the scalability we needed. Their 24/7 support is truly world-class.",
    name: "Diana Wijaya",
    role: "CTO",
    company: "CloudFirst Solutions",
    avatar: "DW",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "From concept to launch in just 6 weeks. The team's expertise in digital transformation is unmatched.",
    name: "Hendro Kusuma",
    role: "Founder",
    company: "StartupNusantara",
    avatar: "HK",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Testimonials</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
            Apa Kata <span className="text-gradient">Klien Kami</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Dengarkan langsung dari bisnis yang telah bertransformasi bersama Fusionify
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-3 md:pl-4 md:basis-1/2"
                >
                  <div className="h-full p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Quote className="w-4 h-4 text-primary" />
                      </div>
                    </div>

                    {/* Quote text */}
                    <p className="text-foreground/90 text-sm md:text-base leading-relaxed mb-5">
                      "{testimonial.quote}"
                    </p>

                    {/* Author info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                      <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-10 bg-card/80 border-border/50 hover:bg-primary/10 hover:border-primary/30" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-10 bg-card/80 border-border/50 hover:bg-primary/10 hover:border-primary/30" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};
