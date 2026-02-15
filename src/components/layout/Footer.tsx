import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import fusionifyLogo from "@/assets/fusionify-logo.png";

const footerLinks = {
  Services: [
    { name: "Web & App Development", href: "#services" },
    { name: "Automation Bots", href: "#services" },
    { name: "Digital Systems", href: "#services" },
    { name: "Cloud & IT Solutions", href: "#services" },
  ],
  Company: [
    { name: "About Us", href: "#about" },
    { name: "Portfolio", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/fusionifytempestore/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/fusionify-digital-store/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/FUSIONIFY-ID", label: "GitHub" },
  { icon: Facebook, href: "https://www.facebook.com/FusionTempestVPN", label: "Facebook" },
  { icon: Mail, href: "mailto:fusionify_digital@vk.com", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-background">
      <div className="container mx-auto px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 max-w-6xl mx-auto">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <a href="#home" className="flex items-center gap-2 mb-5 group">
                <img 
                  src={fusionifyLogo}
                  alt="Fusionify"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-display font-semibold text-lg text-foreground">
                  fusionify
                </span>
              </a>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
                Your trusted partner for digital transformation. Building scalable 
                solutions for Indonesian businesses and beyond.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <h4 className="font-display font-semibold text-foreground mb-4 text-sm">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-border/30 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} PT Fusionify Digital Store. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs flex items-center gap-1.5">
            <span>Made with</span>
            <span>❤️</span>
            <span>in Indonesia</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
