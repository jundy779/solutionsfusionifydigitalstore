import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { 
  Code2, 
  ArrowLeft, 
  Check, 
  Smartphone, 
  Globe, 
  ShoppingCart, 
  Layers,
  Zap,
  Shield,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    icon: Globe,
    title: "Custom Websites",
    description: "Landing pages, company profiles, dan website custom sesuai kebutuhan bisnis Anda."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Desain responsif yang optimal di semua perangkat, dari mobile hingga desktop."
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Toko online lengkap dengan payment gateway, inventory, dan order management."
  },
  {
    icon: Layers,
    title: "Web Applications",
    description: "Aplikasi web kompleks seperti dashboard, SaaS, dan internal tools."
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", 
  "Node.js", "PostgreSQL", "Supabase", "Vercel"
];

const benefits = [
  "Kode bersih dan mudah di-maintain",
  "Performa optimal dengan loading cepat",
  "SEO-friendly untuk visibilitas maksimal",
  "Keamanan tingkat enterprise",
  "Dokumentasi lengkap dan training",
  "Support dan maintenance berkala"
];

const WebDevelopment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
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
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Web & App Development</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              Build Modern
              <span className="text-gradient"> Digital Products</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Kami membangun website dan aplikasi web modern dengan teknologi terkini 
              yang scalable, aman, dan memberikan pengalaman pengguna terbaik.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/#contact">
                <Button size="lg" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Mulai Project
                </Button>
              </Link>
              <Link to="/#contact">
                <Button size="lg" variant="outline">
                  Konsultasi Gratis
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
              Layanan <span className="text-gradient">Development</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Solusi lengkap untuk kebutuhan pengembangan digital Anda
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
                className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all"
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

      {/* Tech Stack & Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-xl text-foreground">Tech Stack</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Kami menggunakan teknologi modern dan proven untuk memastikan produk Anda berkualitas tinggi.
              </p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-xl text-foreground">Keunggulan Kami</h3>
              </div>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Siap Memulai Project?
            </h2>
            <p className="text-muted-foreground mb-8">
              Hubungi kami untuk konsultasi gratis dan dapatkan estimasi biaya untuk project Anda.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="gap-2">
                <Zap className="w-4 h-4" />
                Hubungi Kami
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebDevelopment;
