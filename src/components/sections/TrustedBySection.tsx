import { motion } from "framer-motion";

const logos = [
  "TechCorp",
  "InnovateCo",
  "DigiFlow",
  "CloudSync",
  "AutomateX",
  "ScaleUp",
];

export const TrustedBySection = () => {
  return (
    <section className="py-16 bg-background border-y border-border/30">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by growing businesses & digital innovators
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="px-6 py-3 rounded-lg glass"
            >
              <span className="text-lg font-semibold text-muted-foreground/60">
                {logo}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
