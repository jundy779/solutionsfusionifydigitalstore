const footerLinks = {
  Services: [
    { name: "Web & App Development", href: "#services" },
    { name: "Automation Bots", href: "#services" },
    { name: "Digital Systems", href: "#services" },
    { name: "Cloud & IT Support", href: "#services" },
  ],
  Company: [
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 content-width-lg">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-lg text-foreground">
                Fusionify
              </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Solusi digital inovatif untuk pertumbuhan bisnis Anda. 
              Bersama Fusionify, wujudkan transformasi digital yang berkelanjutan.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
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
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
