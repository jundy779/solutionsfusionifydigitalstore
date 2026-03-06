import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Code2, 
  Bot, 
  Settings2, 
  Cloud, 
  Briefcase,
  Calendar,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortfolioSkeletonLoader } from "@/components/portfolio/ProjectCardSkeleton";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description: string | null;
  thumbnail_url: string | null;
  client_name: string | null;
  service_category: string;
  technologies: string[];
  results: string[];
  live_url: string | null;
  completion_date: string | null;
  is_featured: boolean;
}

const categoryIcons: Record<string, typeof Code2> = {
  "Web & App Development": Code2,
  "Automation Bots": Bot,
  "Digital Systems & API": Settings2,
  "Cloud & IT Support": Cloud,
  "Project-Based Services": Briefcase,
};

const categoryColors: Record<string, string> = {
  "Web & App Development": "from-blue-500/20 to-blue-600/5",
  "Automation Bots": "from-purple-500/20 to-purple-600/5",
  "Digital Systems & API": "from-green-500/20 to-green-600/5",
  "Cloud & IT Support": "from-cyan-500/20 to-cyan-600/5",
  "Project-Based Services": "from-orange-500/20 to-orange-600/5",
};

const Portfolio = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Project[];
    },
  });

  const featuredProjects = projects?.filter((p) => p.is_featured) || [];
  const otherProjects = projects?.filter((p) => !p.is_featured) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, hsl(212 89% 45% / 0.15) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Home
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Portfolio</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              Project yang Telah
              <span className="text-gradient"> Kami Kerjakan</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
              Lihat hasil kerja kami untuk berbagai klien dari UMKM hingga perusahaan besar. 
              Setiap project dirancang untuk memberikan dampak nyata pada bisnis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                Featured Projects
              </h2>
              <p className="text-muted-foreground mt-2">Project unggulan dengan hasil luar biasa</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => {
                const Icon = categoryIcons[project.service_category] || Briefcase;
                const gradient = categoryColors[project.service_category] || "from-primary/20 to-primary/5";
                
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={`/portfolio/${project.slug}`}
                      className="group block h-full"
                    >
                      <div className={`h-full p-6 rounded-2xl bg-gradient-to-br ${gradient} border border-border/50 hover:border-primary/40 transition-all duration-300`}>
                        {/* Thumbnail placeholder */}
                        <div className="aspect-video rounded-xl bg-card/80 border border-border/30 mb-5 overflow-hidden flex items-center justify-center">
                          {project.thumbnail_url ? (
                            <img 
                              src={project.thumbnail_url} 
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <Icon className="w-12 h-12 text-muted-foreground/30" />
                          )}
                        </div>

                        {/* Category badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">{project.service_category}</span>
                        </div>

                        {/* Title & Description */}
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors pr-2">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary flex-shrink-0" />
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-full bg-background/50 border border-border/30 text-xs text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Results & Demo Button */}
                        <div className="pt-4 border-t border-border/30 flex items-center justify-between gap-3">
                          {project.results.length > 0 ? (
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground mb-1">Key Results:</p>
                              <div className="text-sm text-primary font-medium truncate">
                                {project.results[0]}
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1" />
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-xs font-medium text-primary transition-colors flex-shrink-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                More Projects
              </h2>
              <p className="text-muted-foreground mt-2">Project lainnya yang telah kami selesaikan</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {otherProjects.map((project, index) => {
                const Icon = categoryIcons[project.service_category] || Briefcase;
                
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={`/portfolio/${project.slug}`}
                      className="group flex gap-5 p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors pr-2">
                            {project.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-primary flex-shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded-full bg-muted/50 border border-border/30 text-xs text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-xs font-medium text-primary transition-colors flex-shrink-0"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Loading State with Skeleton */}
      {isLoading && <PortfolioSkeletonLoader />}

      {/* Empty State */}
      {!isLoading && projects?.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada project yang ditampilkan.</p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Tertarik Bekerja Sama?
            </h2>
            <p className="text-muted-foreground mb-8">
              Diskusikan project Anda dengan kami dan lihat bagaimana kami bisa membantu transformasi digital bisnis Anda.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="gap-2">
                Hubungi Kami
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
