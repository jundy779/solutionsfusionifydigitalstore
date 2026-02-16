import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("contact.successToast"));
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/3 right-1/4 w-[400px] h-[400px]" animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} style={{ background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

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
            <h3 className="font-display font-semibold text-lg mb-6">{t("contact.sendMessage")}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">{t("contact.name")}</label>
                <Input placeholder={t("contact.namePlaceholder")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">{t("contact.email")}</label>
                <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">{t("contact.message")}</label>
                <Textarea placeholder={t("contact.messagePlaceholder")} rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="bg-background/50 border-border/50 focus:border-primary/50 resize-none transition-colors" />
              </div>
              <Button type="submit" className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                <span>{t("contact.sendButton")}</span>
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
                <motion.span className="w-2 h-2 rounded-full bg-green-500" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
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
