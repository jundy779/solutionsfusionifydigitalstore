import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, 
  Code2, 
  Bot, 
  Settings2, 
  Cloud, 
  Briefcase,
  Calendar,
  ExternalLink,
  Check,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description: string | null;
  thumbnail_url: string | null;
  images: string[];
  client_name: string | null;
  client_logo_url: string | null;
  service_category: string;
  technologies: string[];
  results: string[];
  live_url: string | null;
  completion_date: string | null;
}

const categoryIcons: Record<string, typeof Code2> = {
  "Web & App Development": Code2,
  "Automation Bots": Bot,
  "Digital Systems & API": Settings2,
  "Cloud & IT Support": Cloud,
  "Project-Based Services": Briefcase,
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <Skeleton className="h-10 w-40 mb-8" />
          <Skeleton className="h-8 w-32 rounded-full mb-6" />
          <Skeleton className="h-14 w-3/4 max-w-xl mb-4" />
          <Skeleton className="h-14 w-1/2 max-w-md mb-6" />
          <Skeleton className="h-5 w-full max-w-lg mb-2" />
          <Skeleton className="h-5 w-4/5 max-w-md" />
        </div>
        <div className="container mx-auto px-4 pb-16">
          <Skeleton className="aspect-video max-w-4xl mx-auto rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const Icon = categoryIcons[project.service_category] || Briefcase;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${project.title} | Portfolio Fusionify Digital Solutions`} 
        description={project.description}
        path={`/portfolio/${project.slug}`}
        ogImage={project.thumbnail_url || undefined}
      />
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
          <Link to="/portfolio">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Portfolio
            </Button>
          </Link>

          <div className="max-w-4xl">
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{project.service_category}</span>
              </div>
              {project.completion_date && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.completion_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </div>
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground"
            >
              {project.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              {project.description}
            </motion.p>

            {/* Client & Live URL */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              {project.client_name && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{project.client_name}</span>
                </div>
              )}
              {project.live_url && (
                <a 
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Lihat Live
                  </Button>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Thumbnail */}
      {project.thumbnail_url && (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="aspect-video rounded-2xl overflow-hidden border border-border/50">
                <img 
                  src={project.thumbnail_url} 
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Description */}
              {project.full_description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50"
                >
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                    Tentang Project
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {project.full_description}
                  </p>
                </motion.div>
              )}

              {/* Results */}
              {project.results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                >
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                    Hasil yang Dicapai
                  </h2>
                  <div className="space-y-3">
                    {project.results.map((result, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground">{result}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technologies */}
              {project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50"
                >
                  <h3 className="font-semibold text-foreground mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card/50 border border-border/50"
              >
                <h3 className="font-semibold text-foreground mb-3">Tertarik project serupa?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hubungi kami untuk diskusi kebutuhan Anda.
                </p>
                <Link to="/#contact" className="block">
                  <Button className="w-full">Hubungi Kami</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
