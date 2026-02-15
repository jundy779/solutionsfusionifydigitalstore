import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/50 bg-muted/30 p-0.5 text-xs font-medium">
      <motion.button
        onClick={() => setLang("id")}
        className={`relative px-2.5 py-1 rounded-full transition-colors ${
          lang === "id" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {lang === "id" && (
          <motion.div
            layoutId="lang-pill"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
          />
        )}
        <span className="relative z-10">ID</span>
      </motion.button>
      <motion.button
        onClick={() => setLang("en")}
        className={`relative px-2.5 py-1 rounded-full transition-colors ${
          lang === "en" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {lang === "en" && (
          <motion.div
            layoutId="lang-pill"
            className="absolute inset-0 bg-primary rounded-full"
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </motion.button>
    </div>
  );
};
