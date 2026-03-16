import { Mail, Phone, MapPin, Send, Building2, Briefcase, DollarSign, AlertCircle } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

const consultationSchema = z.object({
  name: z.string().trim().min(2, "min2").max(100),
  email: z.string().trim().email("email").max(255),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  service: z.enum(["web-development", "automation-bots", "digital-systems", "cloud-support", "project-services", "other"], { errorMap: () => ({ message: "required" }) }),
  budget: z.string().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "min10").max(1000),
});

type FormErrors = Partial<Record<keyof z.infer<typeof consultationSchema>, string>>;

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

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 text-xs text-destructive mt-1"
    >
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {msg}
    </motion.p>
  ) : null;

export const ContactSection = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});

  const getErrorMsg = (field: string, code?: string): string => {
    const msgs: Record<string, Record<string, string>> = {
      name: {
        min2: lang === "id" ? "Nama minimal 2 karakter" : "Name must be at least 2 characters",
        required: lang === "id" ? "Nama wajib diisi" : "Name is required",
      },
      email: {
        email: lang === "id" ? "Format email tidak valid" : "Invalid email format",
        required: lang === "id" ? "Email wajib diisi" : "Email is required",
      },
      service: {
        required: lang === "id" ? "Pilih layanan terlebih dahulu" : "Please select a service",
      },
      message: {
        min10: lang === "id" ? "Pesan minimal 10 karakter" : "Message must be at least 10 characters",
        required: lang === "id" ? "Pesan wajib diisi" : "Message is required",
      },
    };
    return msgs[field]?.[code ?? "required"] ?? (lang === "id" ? "Field ini tidak valid" : "This field is invalid");
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    const partial = { ...formData, [field]: value };
    const result = consultationSchema.safeParse(partial);
    if (result.success) {
      setErrors(prev => { const n = { ...prev }; delete n[field as keyof FormErrors]; return n; });
    } else {
      const fieldErr = result.error.issues.find(i => i.path[0] === field);
      if (fieldErr) {
        setErrors(prev => ({ ...prev, [field]: getErrorMsg(field, fieldErr.message) }));
      } else {
        setErrors(prev => { const n = { ...prev }; delete n[field as keyof FormErrors]; return n; });
      }
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) validateField(field, value);
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields to show errors
    const allFields = ["name", "email", "company", "service", "budget", "message"] as const;
    setTouched(Object.fromEntries(allFields.map(f => [f, true])));

    const parsed = consultationSchema.safeParse(formData);
    if (!parsed.success) {
      const newErrors: FormErrors = {};
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof FormErrors;
        if (!newErrors[field]) newErrors[field] = getErrorMsg(String(field), issue.message);
      });
      setErrors(newErrors);
      toast.error(lang === "id" ? "Mohon lengkapi semua field yang wajib diisi." : "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-consultation-email", {
        body: parsed.data,
      });

      if (error) throw error;

      navigate("/thank-you", { state: { name: parsed.data.name } });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(t("contact.errorToast"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors ${
      errors[field as keyof FormErrors] && touched[field] ? "border-destructive/50 focus:border-destructive/70" : ""
    }`;

  const selectClass = (field: string) =>
    `flex h-11 w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors bg-background/50 ${
      errors[field as keyof FormErrors] && touched[field]
        ? "border-destructive/50 focus:border-destructive/70"
        : "border-border/50 focus:border-primary/50"
    }`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <BackgroundBeams className="opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge={t("contact.badge")}
          badgeIcon={Mail}
          title={t("contact.title")}
          titleHighlight={t("contact.titleHighlight")}
          subtitle={t("contact.subtitle")}
          subtitleClassName="max-w-xl"
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50">
            <h3 className="font-display font-semibold text-lg mb-6">{t("contact.consultationTitle")}</h3>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t("contact.name")} <span className="text-destructive">*</span></label>
                  <Input
                    placeholder={t("contact.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={inputClass("name")}
                    maxLength={100}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <FieldError msg={touched.name ? errors.name : undefined} />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">{t("contact.email")} <span className="text-destructive">*</span></label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={inputClass("email")}
                    maxLength={255}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError msg={touched.email ? errors.email : undefined} />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                  <Building2 className="w-3.5 h-3.5" /> {t("contact.company")}
                  <span className="text-muted-foreground/50 text-xs ml-auto">{lang === "id" ? "Opsional" : "Optional"}</span>
                </label>
                <Input
                  placeholder={t("contact.companyPlaceholder")}
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="h-11 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  maxLength={100}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <Briefcase className="w-3.5 h-3.5" /> {t("contact.service")} <span className="text-destructive">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    onBlur={() => handleBlur("service")}
                    className={selectClass("service")}
                    aria-invalid={!!errors.service}
                  >
                    <option value="">{t("contact.selectService")}</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {lang === "id" ? opt.labelId : opt.labelEn}
                      </option>
                    ))}
                  </select>
                  <FieldError msg={touched.service ? errors.service : undefined} />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <DollarSign className="w-3.5 h-3.5" /> {t("contact.budget")}
                    <span className="text-muted-foreground/50 text-xs ml-auto">{lang === "id" ? "Opsional" : "Optional"}</span>
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    className={selectClass("budget")}
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-muted-foreground">{t("contact.message")} <span className="text-destructive">*</span></label>
                  <span className={`text-xs tabular-nums ${formData.message.length > 900 ? "text-destructive" : "text-muted-foreground/60"}`}>
                    {formData.message.length}/1000
                  </span>
                </div>
                <Textarea
                  placeholder={t("contact.messagePlaceholder")}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`bg-background/50 resize-none transition-colors ${
                    errors.message && touched.message
                      ? "border-destructive/50 focus:border-destructive/70"
                      : "border-border/50 focus:border-primary/50"
                  }`}
                  maxLength={1000}
                  aria-invalid={!!errors.message}
                />
                <FieldError msg={touched.message ? errors.message : undefined} />
                {!errors.message && (
                  <p className="text-xs text-muted-foreground/50 mt-1">
                    {lang === "id" ? "Ceritakan detail kebutuhan, timeline, dan ekspektasi Anda." : "Describe your needs, timeline, and expectations in detail."}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 rounded-full group"
              >
                <span>{isSubmitting ? t("contact.sending") : t("contact.sendButton")}</span>
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>

              <p className="text-xs text-muted-foreground/60 text-center">
                {lang === "id"
                  ? "Dengan mengirim form ini, Anda menyetujui "
                  : "By submitting this form, you agree to our "}
                <a href="/privacy-policy" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
                  {lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
                </a>
                {lang === "id" ? " kami." : "."}
              </p>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="space-y-5">
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
              <h3 className="font-display font-semibold text-lg mb-6">{t("contact.getInTouch")}</h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: t("contact.emailLabel"), value: "fusionify_digital@vk.com", href: "mailto:fusionify_digital@vk.com" },
                  { icon: Phone, label: t("contact.phoneLabel"), value: "+62 851-5621-8249", href: "tel:+6285156218249" },
                  { icon: MapPin, label: t("contact.locationLabel"), value: "Bojonggede, Jawa Barat, Indonesia", href: "https://maps.app.goo.gl/fapbqT7gC3PYYpJz8" },
                ].map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Google Maps embed link */}
            <motion.a
              href="https://maps.app.goo.gl/fapbqT7gC3PYYpJz8"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="block p-4 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {lang === "id" ? "Lihat di Google Maps" : "View on Google Maps"}
                  </p>
                  <p className="text-xs text-muted-foreground">Jl. Kincir Air No.12, Bojonggede, Jawa Barat</p>
                </div>
              </div>
            </motion.a>

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
