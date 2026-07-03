import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClientLogo { id: string; name: string; logo_url: string; website_url: string | null; }

const getInitials = (name: string): string => {
  const words = name.split(" ");
  if (words.length >= 2) return words[0][0] + words[1][0];
  return name.substring(0, 2).toUpperCase();
};

export const ClientLogosSection = () => {
  const { t } = useLanguage();
  const { data: logos, isLoading, error } = useQuery({
    queryKey: ["client-logos-only"],
    queryFn: async () => {
      const { data, error } = await supabase.from("client_logos").select("id, name, logo_url, website_url").eq("is_partner", false).eq("is_active", true).order("display_order", { ascending: true });
      if (error) throw error;
      return data as ClientLogo[];
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-transparent relative overflow-hidden">
        <div className="container mx-auto px-4 mb-6">
          <p className="text-sm text-muted-foreground text-center">{t("clients.title")} {t("clients.suffix")}</p>
        </div>
        <div className="flex justify-center gap-8">{[1, 2, 3, 4].map((i) => (<Skeleton key={i} className="h-10 w-32" />))}</div>
      </section>
    );
  }

  if (error || !logos || logos.length === 0) return null;

  const displayLogos = logos.map(logo => ({ ...logo, initials: getInitials(logo.name) }));
  const duplicatedLogos = [...displayLogos, ...displayLogos];

  const LogoItem = ({ logo }: { logo: typeof displayLogos[0] }) => {
    const content = (
      <div className="flex items-center gap-3">
        {logo.logo_url ? (
          <img src={logo.logo_url} alt={`${logo.name} logo`} loading="lazy" decoding="async" className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
        ) : (
          <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center"><span className="text-xs font-bold text-foreground/60">{logo.initials}</span></div>
        )}
        <span className="text-sm font-medium text-foreground/60 whitespace-nowrap">{logo.name}</span>
      </div>
    );

    if (logo.website_url) {
      return <a href={logo.website_url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 opacity-40 hover:opacity-80 transition-all duration-300 group hover:scale-105">{content}</a>;
    }
    return <div className="flex-shrink-0 opacity-40 hover:opacity-80 transition-all duration-300 group hover:scale-105">{content}</div>;
  };

  return (
    <TooltipProvider delayDuration={200}>
      <motion.section className="py-12 bg-transparent relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <div className="container mx-auto px-4 mb-6">
          <p className="text-sm text-muted-foreground text-center">
            {t("clients.title")} <span className="text-foreground font-semibold">{logos.length}+</span> {t("clients.suffix")}
          </p>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex">
          <motion.div className="flex gap-12 md:gap-16 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" } }}>
            {duplicatedLogos.map((logo, index) => (
              <Tooltip key={`${logo.id}-${index}`}>
                <TooltipTrigger asChild><div><LogoItem logo={logo} /></div></TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{logo.name}</p>
                  {logo.website_url && <p className="text-xs text-muted-foreground">{t("clients.visitWebsite")}</p>}
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-10"><div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" /></div>
      </motion.section>
    </TooltipProvider>
  );
};
