import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import fusionifyLogo from "@/assets/fusionify-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/fusionifytempestore/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/fusionify-digital-store/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/FUSIONIFY-ID", label: "GitHub" },
  { icon: Facebook, href: "https://www.facebook.com/FusionTempestVPN", label: "Facebook" },
  { icon: Mail, href: "mailto:fusionify_digital@vk.com", label: "Email" },
];

export const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    [t("footer.services")]: [
      { name: "Web & App Development", href: "#services" },
      { name: "Automation Bots", href: "#services" },
      { name: "Digital Systems", href: "#services" },
      { name: "Cloud & IT Solutions", href: "#services" },
    ],
    [t("footer.company")]: [
      { name: t("footer.aboutUs"), href: "#about" },
      { name: t("footer.portfolio"), href: "#projects" },
      { name: t("footer.contact"), href: "#contact" },
    ],
    [t("footer.legal")]: [
      { name: t("footer.privacy"), href: "/privacy-policy" },
      { name: t("footer.terms"), href: "/terms-of-service" },
    ],
  };

  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="container mx-auto px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <a href="#home" className="flex items-center gap-2 mb-5 group">
                <img src={fusionifyLogo} alt="Fusionify Digital Solutions logo" loading="lazy" decoding="async" className="w-8 h-8 object-contain" />
                <span className="font-display font-semibold text-lg text-foreground">fusionify</span>
              </a>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">{t("footer.description")}</p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a key={social.label} href={social.href} aria-label={social.label} className="w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}>
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("/") ? (
                      <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">{link.name}</Link>
                    ) : (
                      <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">{link.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="border-t border-border/30 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} PT Fusionify Digital Store. {t("footer.allRights")}</p>
          <p className="text-muted-foreground text-xs flex items-center gap-1.5">
            <span>{t("footer.madeWith")}</span><span className="text-red-500">♥</span><span>{t("footer.inIndonesia")}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
