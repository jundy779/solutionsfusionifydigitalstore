import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQ { id: string; question: string; answer: string; display_order: number; }

export const FAQSection = () => {
  const { t } = useLanguage();
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("id, question, answer, display_order").eq("is_active", true).order("display_order", { ascending: true });
      if (error) throw error;
      return data as FAQ[];
    },
  });

  const faqJsonLd = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <section className="py-16 md:py-28 bg-background relative overflow-hidden">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.08) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={t("faq.badge")}
          badgeIcon={HelpCircle}
          title={t("faq.title")}
          titleHighlight={t("faq.titleHighlight")}
          subtitle={t("faq.subtitle")}
          subtitleClassName="max-w-xl"
        />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => (<Skeleton key={i} className="h-16 rounded-xl" />))}</div>
          ) : faqs && faqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm px-6 data-[state=open]:border-primary/30 transition-colors">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors py-5 text-base font-medium [&[data-state=open]>svg]:text-primary">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground">{t("faq.empty")}</p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            {t("faq.moreQuestions")}{" "}
            <a href="#contact" className="text-primary hover:underline font-medium">{t("faq.contactUs")}</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
