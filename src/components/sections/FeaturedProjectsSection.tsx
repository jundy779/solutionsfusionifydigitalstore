import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Enterprise Automation System",
    category: "Automation",
    description: "End-to-end workflow automation for a leading manufacturing company",
    image: "linear-gradient(135deg, hsl(217 91% 60% / 0.3), hsl(265 75% 55% / 0.2))",
    tags: ["Telegram Bot", "WhatsApp", "API Integration"],
    metrics: "80% efficiency increase",
  },
  {
    title: "Digital Marketplace Platform",
    category: "Web Development",
    description: "Full-stack e-commerce platform with integrated payment systems",
    image: "linear-gradient(135deg, hsl(265 75% 55% / 0.3), hsl(190 95% 45% / 0.2))",
    tags: ["React", "Node.js", "Payment Gateway"],
    metrics: "50K+ transactions",
  },
  {
    title: "Cloud Infrastructure Setup",
    category: "Cloud & IT",
    description: "Scalable cloud architecture for a growing fintech startup",
    image: "linear-gradient(135deg, hsl(190 95% 45% / 0.3), hsl(217 91% 60% / 0.2))",
    tags: ["AWS", "Docker", "CI/CD"],
    metrics: "99.9% uptime",
  },
  {
    title: "Smart Order Bot System",
    category: "Automation",
    description: "Automated order management across multiple channels",
    image: "linear-gradient(135deg, hsl(217 91% 60% / 0.25), hsl(190 95% 45% / 0.15))",
    tags: ["Multi-channel", "Real-time", "Analytics"],
    metrics: "10K+ orders/month",
  },
];

export const FeaturedProjectsSection = () => {
  return (
    <section className="section-padding bg-gradient-section-alt relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Featured Projects
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Transforming Ideas Into
            <span className="text-gradient"> Digital Reality</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our portfolio of successful digital transformation projects 
            that have helped businesses achieve measurable results
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 content-width-lg">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="group cinematic-card cursor-pointer"
            >
              {/* Project Image/Visual */}
              <div 
                className="h-48 md:h-56 relative overflow-hidden"
                style={{ background: project.image }}
              >
                {/* Animated mesh overlay */}
                <div className="absolute inset-0 mesh-gradient opacity-50" />
                
                {/* Floating elements */}
                <motion.div
                  className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-10 left-10 w-10 h-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 rotate-45"
                  animate={{ rotate: [45, 90, 45] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                    {project.category}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center glow-primary">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Metrics Badge */}
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1.5 rounded-full glass-premium text-xs font-medium text-primary">
                    {project.metrics}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 relative">
                <h3 className="font-display font-semibold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary/50 border border-border/30 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-premium text-foreground hover:text-primary transition-colors group"
          >
            <span className="text-sm font-medium">View All Projects</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
