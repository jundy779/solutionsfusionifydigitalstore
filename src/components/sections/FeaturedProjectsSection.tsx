import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const projects = [
  {
    title: "Enterprise Automation System",
    category: "Automation",
    description: "End-to-end workflow automation for a leading manufacturing company",
    tags: ["Telegram Bot", "WhatsApp", "API Integration"],
    metrics: "80% efficiency increase",
  },
  {
    title: "Digital Marketplace Platform",
    category: "Web Development",
    description: "Full-stack e-commerce platform with integrated payment systems",
    tags: ["React", "Node.js", "Payment Gateway"],
    metrics: "50K+ transactions",
  },
  {
    title: "Cloud Infrastructure Setup",
    category: "Cloud & IT",
    description: "Scalable cloud architecture for a growing fintech startup",
    tags: ["AWS", "Docker", "CI/CD"],
    metrics: "99.9% uptime",
  },
  {
    title: "Smart Order Bot System",
    category: "Automation",
    description: "Automated order management across multiple channels",
    tags: ["Multi-channel", "Real-time", "Analytics"],
    metrics: "10K+ orders/month",
  },
];

export const FeaturedProjectsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px]"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, hsl(212 89% 45% / 0.1) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Featured Projects</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
            Transforming Ideas Into
            <span className="text-gradient"> Digital Reality</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Explore our portfolio of successful digital transformation projects 
            that have helped businesses achieve measurable results
          </p>
        </motion.div>

        {/* Projects Grid with 3D Cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <CardContainer containerClassName="w-full">
                <CardBody className="rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors duration-300 overflow-hidden group cursor-pointer w-full">
                  {/* Project Visual Header */}
                  <CardItem
                    translateZ={30}
                    className="h-36 relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent w-full"
                  >
                    {/* Category Badge */}
                    <CardItem
                      translateZ={50}
                      className="absolute top-4 left-4"
                    >
                      <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-xs font-medium text-foreground">
                        {project.category}
                      </span>
                    </CardItem>

                    {/* Hover Arrow */}
                    <CardItem
                      translateZ={60}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </CardItem>

                    {/* Metrics Badge */}
                    <CardItem
                      translateZ={40}
                      className="absolute bottom-4 right-4"
                    >
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
                        {project.metrics}
                      </span>
                    </CardItem>

                    {/* Floating decoration */}
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 blur-sm" style={{ transform: "translateZ(20px) translateX(-10px)" }} />
                  </CardItem>

                  {/* Content */}
                  <div className="p-5">
                    <CardItem
                      translateZ={25}
                      className="w-full"
                    >
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </CardItem>
                    <CardItem
                      translateZ={15}
                      className="w-full"
                    >
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </CardItem>

                    {/* Tags */}
                    <CardItem
                      translateZ={20}
                      className="flex flex-wrap gap-1.5 w-full"
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-muted/50 border border-border/30 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 bg-card/30 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group text-sm font-medium"
          >
            <span>View All Projects</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
