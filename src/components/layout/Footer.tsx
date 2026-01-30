import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter 
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const footerLinks = {
  Services: [
    { name: "Web & App Development", href: "#services" },
    { name: "Automation Bots", href: "#services" },
    { name: "Digital Systems", href: "#services" },
    { name: "Cloud & IT Support", href: "#services" },
  ],
  Company: [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 content-width-lg">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-primary-foreground font-display font-bold text-xl">
                  F
                </span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Fusionify
              </span>
            </a>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed text-[15px]">
              Solusi digital inovatif untuk pertumbuhan bisnis Anda. 
              Bersama Fusionify, wujudkan transformasi digital yang berkelanjutan.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-muted-foreground"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-5">
                {title}
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-[15px]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-14 lg:mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Fusionify Digital Solutions. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};
