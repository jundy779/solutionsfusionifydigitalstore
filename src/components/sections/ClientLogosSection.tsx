import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
}

const fallbackLogos = [
  { id: "1", name: "TechCorp", logo_url: "", initials: "TC" },
  { id: "2", name: "InnovateLab", logo_url: "", initials: "IL" },
  { id: "3", name: "DigitalFirst", logo_url: "", initials: "DF" },
  { id: "4", name: "CloudScale", logo_url: "", initials: "CS" },
];

const getInitials = (name: string): string => {
  const words = name.split(" ");
  if (words.length >= 2) {
    return words[0][0] + words[1][0];
  }
  return name.substring(0, 2).toUpperCase();
};

export const ClientLogosSection = () => {
  const { data: logos } = useQuery({
    queryKey: ["client-logos-only"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("id, name, logo_url, website_url")
        .eq("is_partner", false)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as ClientLogo[];
    },
  });

  const displayLogos = logos && logos.length > 0 
    ? logos.map(logo => ({
        ...logo,
        initials: getInitials(logo.name),
      }))
    : fallbackLogos;

  const duplicatedLogos = [...displayLogos, ...displayLogos];

  return (
    <section className="py-12 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-sm text-muted-foreground text-center">Dipercaya oleh Klien Kami</p>
      </div>
      
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex">
        <motion.div
          className="flex gap-12 md:gap-16 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 flex items-center gap-3 opacity-40 hover:opacity-80 transition-all duration-300 group"
            >
              {logo.logo_url ? (
                <img 
                  src={logo.logo_url} 
                  alt={`${logo.name} logo`}
                  className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground/60">
                    {logo.initials}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-foreground/60 whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
