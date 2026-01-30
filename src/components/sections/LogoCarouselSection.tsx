import { motion } from "framer-motion";

// Placeholder client logos - grayscale style like Covena
const clients = [
  { name: "TechCorp", initials: "TC" },
  { name: "InnovateLab", initials: "IL" },
  { name: "DigitalFirst", initials: "DF" },
  { name: "CloudScale", initials: "CS" },
  { name: "DataFlow", initials: "DFL" },
  { name: "SmartBiz", initials: "SB" },
  { name: "NextGen", initials: "NG" },
  { name: "FutureTech", initials: "FT" },
];

// Double the array for seamless infinite scroll
const duplicatedClients = [...clients, ...clients];

export const LogoCarouselSection = () => {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <div className="flex">
        <motion.div
          className="flex gap-12 md:gap-16 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 flex items-center gap-3 opacity-30 hover:opacity-60 transition-opacity duration-300"
            >
              {/* Placeholder logo as text */}
              <div className="w-9 h-9 rounded-lg bg-foreground/10 flex items-center justify-center">
                <span className="text-xs font-bold text-foreground/60">{client.initials}</span>
              </div>
              <span className="text-sm font-medium text-foreground/60 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
