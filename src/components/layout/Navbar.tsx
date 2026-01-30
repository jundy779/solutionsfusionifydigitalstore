import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import fusionifyLogo from "@/assets/fusionify-logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo - Minimal like Covena */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, "#home")}
            className="flex items-center gap-2 group"
          >
            <motion.img 
              src={fusionifyLogo}
              alt="Fusionify"
              className="w-8 h-8 object-contain"
              whileHover={{ scale: 1.05 }}
            />
            <span className="font-display font-semibold text-lg text-foreground">
              fusionify
            </span>
          </a>

          {/* Desktop Navigation - Hidden on mobile, minimal like Covena */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button - Covena style with arrow */}
          <div className="hidden md:block">
            <Button 
              className="h-10 px-5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group"
            >
              <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              Get started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="block text-foreground hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-muted/50"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="pt-3"
              >
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Get started
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
