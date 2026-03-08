import { Mail, Phone, MapPin, Send, Building2, Briefcase, DollarSign } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { BackgroundBeams } from "@/components/ui/background-beams";

const consultationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  service: z.enum(["web-development", "automation-bots", "digital-systems", "cloud-support", "project-services", "other"]),
  budget: z.string().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(1000),
});

const SERVICE_OPTIONS = [
  { value: "web-development", labelId: "Web Development", labelEn: "Web Development" },
  { value: "automation-bots", labelId: "Otomasi & Bot", labelEn: "Automation & Bots" },
  { value: "digital-systems", labelId: "Sistem Digital", labelEn: "Digital Systems" },
  { value: "cloud-support", labelId: "Dukungan Cloud", labelEn: "Cloud Support" },
  { value: "project-services", labelId: "Layanan Proyek", labelEn: "Project Services" },
  { value: "other", labelId: "Lainnya", labelEn: "Other" },
];

const BUDGET_OPTIONS = [
  { value: "< 5jt", labelId: "< Rp 5 Juta", labelEn: "< $300" },
  { value: "5-15jt", labelId: "Rp 5 - 15 Juta", labelEn: "$300 - $1,000" },
  { value: "15-50jt", labelId: "Rp 15 - 50 Juta", labelEn: "$1,000 - $3,500" },
  { value: "> 50jt", labelId: "> Rp 50 Juta", labelEn: "> $3,500" },
];

export const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = consultationSchema.safeParse(formData);
    if (!parsed.success) {
      toast.error(t("contact.errorToast"));
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-consultation-email", {
        body: parsed.data,
      });

      if (error) throw error;

      toast.success(t("contact.successToast"));
      setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(t("contact.errorToast"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <BackgroundBeams className="opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">{t("contact.badge")}</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
            {t("contact.title")}
            <span className="text-gradient">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50">
            <h3 className="font-display font-semibold text-lg mb-6">{t("contact.consultationTitle")}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t("contact.name")} *</label>
                  <Input placeholder={t("contact.namePlaceholder")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors" maxLength={100} />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t("contact.email")} *</label>
                  <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors" maxLength={255} />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                  <Building2 className="w-3.5 h-3.5" /> {t("contact.company")}
                </label>
                <Input placeholder={t("contact.companyPlaceholder")} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors" maxLength={100} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <Briefcase className="w-3.5 h-3.5" /> {t("contact.service")} *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                    className="flex h-11 w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm ring-offset-background focus:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                  >
                    <option value="">{t("contact.selectService")}</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {lang === "id" ? opt.labelId : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <DollarSign className="w-3.5 h-3.5" /> {t("contact.budget")}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="flex h-11 w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm ring-offset-background focus:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                  >
                    <option value="">{t("contact.selectBudget")}</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {lang === "id" ? opt.labelId : opt.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">{t("contact.message")} *</label>
                <Textarea placeholder={t("contact.messagePlaceholder")} rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="bg-background/50 border-border/50 focus:border-primary/50 resize-none transition-colors" maxLength={1000} />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                <span>{isSubmitting ? t("contact.sending") : t("contact.sendButton")}</span>
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-5">
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
              <h3 className="font-display font-semibold text-lg mb-6">{t("contact.getInTouch")}</h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: t("contact.emailLabel"), value: "hello@fusionify.id" },
                  { icon: Phone, label: t("contact.phoneLabel"), value: "+62 812 3456 7890" },
                  { icon: MapPin, label: t("contact.locationLabel"), value: t("contact.location") },
                ].map((item, index) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-foreground font-medium text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 }} className="p-5 rounded-2xl bg-card/50 border border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <motion.span className="w-2 h-2 rounded-full bg-success" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                <span className="text-sm font-medium text-foreground">{t("contact.quickResponse")}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t("contact.quickResponseDesc")}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }} className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
              <div className="text-center">
                <motion.div className="text-3xl font-bold text-gradient mb-1">50+</motion.div>
                <p className="text-xs text-muted-foreground">{t("contact.satisfiedClients")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
