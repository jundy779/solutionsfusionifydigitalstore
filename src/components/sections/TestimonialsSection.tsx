import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Meteors } from "@/components/ui/meteors";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial { id: string; name: string; role: string; company: string; quote: string; avatar_initials: string; image_url: string | null; display_order: number; }

export const TestimonialsSection = () => {
  const { t } = useLanguage();
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").eq("is_active", true).order("display_order", { ascending: true });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  if (isLoading || !testimonials || testimonials.length === 0) return null;

  const cardItems = testimonials.map((ti) => ({ quote: ti.quote, name: ti.name, title: `${ti.role} • ${ti.company}`, image: ti.image_url, initials: ti.avatar_initials }));

  return (
    <section className="py-16 md:py-28 bg-background relative overflow-hidden">
      <Meteors number={15} />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(265 75% 55% / 0.08) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={t("testimonials.badge")}
          badgeIcon={Quote}
          title={t("testimonials.title") + " "}
          titleHighlight={t("testimonials.titleHighlight")}
          subtitle={t("testimonials.subtitle")}
          subtitleClassName="max-w-2xl"
        />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="relative">
          <InfiniteMovingCards items={cardItems} direction="left" speed="slow" pauseOnHover={true} />
          {testimonials.length > 3 && (
            <div className="mt-4">
              <InfiniteMovingCards items={[...cardItems].reverse()} direction="right" speed="slow" pauseOnHover={true} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
