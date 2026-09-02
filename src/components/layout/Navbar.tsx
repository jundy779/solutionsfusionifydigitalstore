import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fusionifyLogo from "@/assets/fusionify-logo.png";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [newConsultationCount, setNewConsultationCount] = useState(0);

  // Fetch new consultation count for admin
  useEffect(() => {
    if (!isAdmin) return;

    const fetchCount = async () => {
      const { count } = await supabase
        .from("consultation_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      setNewConsultationCount(count || 0);
    };

    fetchCount();

    const channel = supabase
      .channel('navbar-consultation-count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'consultation_requests' }, () => {
        fetchCount();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  const navLinks = [
    { name: t("nav.home"), href: "/#home" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.portfolio"), href: "/portfolio" },
    { name: t("nav.ecosystem"), href: "/ecosystem" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Check if it's a hash link (section on homepage)
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");

      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (!element) return false;
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        return true;
      };

      const attemptScroll = (retries = 30) => {
        if (scrollToTarget()) return;
        if (retries <= 0) return;
        requestAnimationFrame(() => attemptScroll(retries - 1));
      };

      if (location.pathname !== "/") {
        // Navigate to homepage first, then retry scrolling until the lazy
        // section chunk has mounted.
        navigate("/", { state: { scrollTo: targetId } });
        setTimeout(() => attemptScroll(40), 50);
      } else {
        attemptScroll();
      }
    } else {
      // Regular link navigation
      navigate(href);
    }
  }, [location.pathname, navigate]);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "top-4 mx-4 md:mx-auto md:max-w-4xl lg:max-w-5xl rounded-2xl bg-background/70 backdrop-blur-2xl border border-border/30 shadow-lg shadow-black/5" 
          : "top-0 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo - Minimal like Covena */}
          <Link 
            to="/"
            className="flex items-center gap-2 group"
          >
            <motion.img 
              src={fusionifyLogo}
              alt="Fusionify Digital Solutions logo"
              className="w-8 h-8 object-contain"
              whileHover={{ scale: 1.05 }}
            />
            <span className="font-display font-semibold text-lg text-foreground">
              fusionify
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile, minimal like Covena */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Language Toggle + Admin Bell + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            {isAdmin && (
              <Link to="/admin/consultations" className="relative">
                <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Notification konsultasi baru">
                  <Bell className="w-4 h-4" />
                  {newConsultationCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-[10px]">
                      {newConsultationCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
            <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
              <Button 
                className="h-10 px-5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group"
              >
                <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                {t("nav.getStarted")}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            whileTap={{ scale: 0.95 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
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
                  onClick={(e) => handleNavClick(e, link.href)}
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
                transition={{ duration: 0.2, delay: 0.25 }}
                className="pt-3 flex flex-col gap-3"
              >
                <div className="flex items-center justify-center gap-3">
                  <LanguageToggle />
                  {isAdmin && (
                    <Link to="/admin/consultations" className="relative">
                      <Button variant="ghost" size="icon" className="relative h-9 w-9">
                        <Bell className="w-4 h-4" />
                        {newConsultationCount > 0 && (
                          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-[10px]">
                            {newConsultationCount}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  )}
                </div>
                <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {t("nav.getStarted")}
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
