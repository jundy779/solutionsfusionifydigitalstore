import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

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
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="section-padding bg-gradient-section-alt relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute top-20 left-10 w-64 h-64 orb-3d opacity-20 animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 orb-dark opacity-15 animate-float" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Apa Kata <span className="text-gradient">Klien Kami</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dengarkan langsung dari bisnis yang telah bertransformasi bersama Fusionify
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[autoplayPlugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2"
                >
                  <Card className="cinematic-card h-full border-0">
                    <CardContent className="p-6 md:p-8 h-full flex flex-col">
                      {/* Quote icon */}
                      <div className="mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Quote className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      {/* Quote text */}
                      <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-6 flex-grow">
                        "{testimonial.quote}"
                      </p>

                      {/* Author info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role} • {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-card/80 border-primary/20 hover:bg-primary/20 hover:border-primary/40" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-card/80 border-primary/20 hover:bg-primary/20 hover:border-primary/40" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};
