import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.6 }}
    className="flex flex-col items-center gap-1 mt-10"
  >
    <span className="text-xs text-muted-foreground/60 tracking-widest uppercase">Scroll</span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown className="w-5 h-5 text-primary/50" />
    </motion.div>
  </motion.div>
);
