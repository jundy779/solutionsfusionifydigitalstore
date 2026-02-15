import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "id" | "en";

type Translations = {
  [key: string]: { id: string; en: string };
};

const translations: Translations = {
  // Navbar
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.services": { id: "Layanan", en: "Services" },
  "nav.portfolio": { id: "Portofolio", en: "Portfolio" },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.contact": { id: "Kontak", en: "Contact" },
  "nav.getStarted": { id: "Mulai Sekarang", en: "Get started" },

  // Hero
  "hero.badge": { id: "Penyedia Solusi Digital", en: "Digital Solutions Provider" },
  "hero.line1": { id: "Transformasi bisnis Anda dengan", en: "Transform your business with" },
  "hero.line2": { id: "otomasi cerdas dan", en: "smart automation and" },
  "hero.line3": { id: "solusi digital modern.", en: "modern digital solutions." },
  "hero.subtitle": {
    id: "Dipercaya oleh UMKM, startup, dan perusahaan yang mengandalkan solusi digital modern untuk pertumbuhan bisnis.",
    en: "Trusted by SMEs, startups, and enterprises relying on modern digital solutions for business growth.",
  },
  "hero.cta": { id: "Konsultasi Gratis", en: "Book a consultation" },

  // Services
  "services.badge": { id: "Layanan Kami", en: "Our Services" },
  "services.title": { id: "Solusi Digital", en: "Solutions" },
  "services.titlePrefix": { id: "Digital", en: "Complete Digital" },
  "services.subtitle": {
    id: "Semua yang Anda butuhkan untuk membangun, mengotomasi, dan mengembangkan kehadiran digital Anda",
    en: "Everything you need to build, automate, and scale your digital presence",
  },

  // Footer
  "footer.description": {
    id: "Mitra terpercaya Anda untuk transformasi digital. Membangun solusi skalabel untuk bisnis Indonesia dan mancanegara.",
    en: "Your trusted partner for digital transformation. Building scalable solutions for Indonesian businesses and beyond.",
  },
  "footer.madeWith": { id: "Dibuat dengan", en: "Made with" },
  "footer.inIndonesia": { id: "di Indonesia", en: "in Indonesia" },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Lang) || "id";
    }
    return "id";
  });

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
