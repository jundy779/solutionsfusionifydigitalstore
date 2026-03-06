import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import fusionifyLogo from "@/assets/fusionify-logo.png";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 600);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(onComplete, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={() => { if (phase === "exit") onComplete(); }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(212 89% 45% / 0.2) 0%, transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.4] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Logo */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-5"
        >
          <motion.img
            src={fusionifyLogo}
            alt="Fusionify Digital Solutions logo"
            className="w-20 h-20 object-contain"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          />

          {/* Brand name */}
          <motion.div
            className="flex items-center gap-1 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "text" || phase === "exit" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="font-display text-3xl font-bold text-foreground tracking-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              fusionify
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-sm text-muted-foreground tracking-widest uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === "text" || phase === "exit" ? 0.7 : 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Digital Solutions
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="w-48 h-0.5 rounded-full overflow-hidden mt-4"
            style={{ background: "hsl(212 40% 16%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(212 89% 45%), hsl(212 89% 60%))" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
