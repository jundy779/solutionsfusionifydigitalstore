import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Meteors } from "@/components/ui/meteors";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar_initials: string;
  image_url: string | null;
  display_order: number;
}

export const TestimonialsSection = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Testimonial[];
    },
  });

  if (isLoading || !testimonials || testimonials.length === 0) {
    return null;
  }

  // Transform testimonials data for InfiniteMovingCards
  const cardItems = testimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    title: `${t.role} • ${t.company}`,
    image: t.image_url,
    initials: t.avatar_initials,
  }));

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Meteors Effect */}
      <Meteors number={15} />

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
          className="relative"
        >
          {/* First row - moving left */}
          <InfiniteMovingCards
            items={cardItems}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
          
          {/* Second row - moving right (if enough testimonials) */}
          {testimonials.length > 3 && (
            <div className="mt-4">
              <InfiniteMovingCards
                items={[...cardItems].reverse()}
                direction="right"
                speed="slow"
                pauseOnHover={true}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
