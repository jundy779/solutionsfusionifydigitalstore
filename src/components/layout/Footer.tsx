import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

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
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-gradient-section">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 content-width-lg">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="#home" className="flex items-center gap-3 mb-6 group">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:glow-primary transition-shadow">
                  <span className="text-primary-foreground font-bold text-xl">F</span>
                </div>
                <span className="font-display font-bold text-xl text-foreground">
                  Fusionify
                </span>
              </a>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-8">
                Your trusted partner for digital transformation. Building scalable 
                solutions for Indonesian businesses and beyond.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <social.icon className="w-5 h-5" />
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
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <h4 className="font-display font-semibold text-foreground mb-5 text-sm">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border/20 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PT Fusionify Digital Store. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ❤️
            </motion.span>
            <span>in Indonesia</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
