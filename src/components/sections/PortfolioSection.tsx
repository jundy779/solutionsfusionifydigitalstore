import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-featured online store with payment integration",
  },
  {
    title: "WhatsApp Order Bot",
    category: "Automation",
    description: "Automated ordering system for F&B business",
  },
  {
    title: "Company Dashboard",
    category: "Digital Systems",
    description: "Real-time analytics and management platform",
  },
  {
    title: "Cloud Migration",
    category: "Cloud Solutions",
    description: "Enterprise infrastructure modernization",
  },
];

export const PortfolioSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Featured
            <span className="text-gradient"> Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Real solutions we've built for real businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 content-width">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-gradient-card border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              {/* Project Preview */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary font-medium">
                    {project.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
