import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { 
  Briefcase, 
  ArrowLeft, 
  Check, 
  Lightbulb, 
  Search, 
  GraduationCap, 
  Rocket,
  Zap,
  Target,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    icon: Rocket,
    title: "MVP Development",
    description: "Bangun Minimum Viable Product untuk validasi ide bisnis Anda dengan cepat dan efisien."
  },
  {
    icon: Search,
    title: "System Audit",
    description: "Analisis mendalam sistem IT existing untuk identifikasi masalah dan peluang improvement."
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "Konsultasi strategis untuk transformasi digital dan optimasi proses bisnis."
  },
  {
    icon: GraduationCap,
    title: "Training & Workshop",
    description: "Pelatihan teknis untuk tim Anda agar bisa mengoperasikan dan maintain sistem dengan baik."
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Memahami kebutuhan bisnis, goals, dan constraint project Anda."
  },
  {
    step: "02",
    title: "Planning",
    description: "Merancang solusi teknis, timeline, dan resource allocation."
  },
  {
    step: "03",
    title: "Execution",
    description: "Implementasi dengan metodologi agile dan regular progress updates."
  },
  {
    step: "04",
    title: "Delivery",
    description: "Deployment, testing, dokumentasi, dan training untuk tim Anda."
  },
];

const projectTypes = [
  "Startup MVP & Prototyping",
  "Legacy system modernization",
  "Digital transformation",
  "Process automation",
  "Custom software development",
  "System integration project",
  "IT infrastructure setup",
  "Security assessment & hardening"
];

const ProjectServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Project Services | Fusionify Digital Solutions" description="Layanan konsultasi IT, MVP development, system audit, dan pelatihan teknologi untuk membantu bisnis Anda berkembang secara digital." path="/services/project-services" />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, hsl(30 90% 50% / 0.15) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link to="/#services">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Services
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Project-Based Services</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              Custom IT
              <span className="text-gradient"> Solutions</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Project-based engagement untuk kebutuhan IT khusus dengan 
              timeline dan budget yang jelas dari awal hingga selesai.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/#contact">
                <Button size="lg" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Diskusi Project
                </Button>
              </Link>
              <Link to="/#contact">
                <Button size="lg" variant="outline">
                  Request Proposal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Layanan <span className="text-gradient">Project</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Berbagai jenis project yang bisa kami bantu
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-2xl text-foreground">Our Process</h3>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Metodologi yang teruji untuk delivery project yang sukses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h4 className="font-semibold text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/2 h-[2px] bg-gradient-to-r from-primary/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-2xl text-foreground">Jenis Project</h3>
              </div>
              <p className="text-muted-foreground">
                Berbagai jenis project yang telah kami kerjakan
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {projectTypes.map((project, index) => (
                <motion.div
                  key={project}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/30"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{project}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              Punya Project Khusus?
            </h2>
            <p className="text-muted-foreground mb-8">
              Ceritakan kebutuhan Anda dan kami akan bantu merancang solusi terbaik dengan proposal yang detail.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="gap-2">
                <Zap className="w-4 h-4" />
                Diskusi Sekarang
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectServices;
