import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Platform e-commerce modern dengan fitur lengkap untuk retail fashion.",
    gradient: "from-primary to-accent",
  },
  {
    title: "Healthcare App",
    category: "Mobile App",
    description: "Aplikasi kesehatan dengan fitur konsultasi dokter online.",
    gradient: "from-accent to-primary",
  },
  {
    title: "Fintech Dashboard",
    category: "UI/UX Design",
    description: "Dashboard analitik untuk perusahaan fintech dengan visualisasi data.",
    gradient: "from-primary/80 to-accent/80",
  },
  {
    title: "Corporate Website",
    category: "Web Development",
    description: "Website company profile untuk perusahaan properti terkemuka.",
    gradient: "from-accent/80 to-primary/80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-4 mb-6">
            Karya <span className="text-gradient">Terbaik</span> Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beberapa proyek yang telah kami kerjakan untuk klien dari berbagai industri.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${project.gradient} opacity-20`} />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent p-8 flex flex-col justify-end">
                <span className="text-primary text-sm font-medium mb-2">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
