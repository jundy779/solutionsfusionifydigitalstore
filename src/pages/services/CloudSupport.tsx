import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Cloud, 
  ArrowLeft, 
  Check, 
  Server, 
  Shield, 
  Activity, 
  Lock,
  Zap,
  Cpu,
  HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    icon: Server,
    title: "Cloud Hosting",
    description: "Hosting berkualitas enterprise dengan infrastruktur cloud yang scalable dan reliable."
  },
  {
    icon: Cpu,
    title: "VPS Management",
    description: "Setup, konfigurasi, dan management VPS untuk aplikasi dan website Anda."
  },
  {
    icon: Activity,
    title: "Monitoring 24/7",
    description: "Pemantauan real-time dengan alert sistem untuk respons cepat terhadap masalah."
  },
  {
    icon: Lock,
    title: "Security Hardening",
    description: "Pengamanan server dengan firewall, SSL, dan security best practices."
  },
];

const services = [
  "Server setup dan konfigurasi",
  "Database management dan optimization",
  "Backup otomatis dan disaster recovery",
  "SSL certificate installation",
  "Domain dan DNS management",
  "Load balancing dan high availability",
  "Container orchestration (Docker/K8s)",
  "CI/CD pipeline setup"
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support" },
  { value: "<15min", label: "Response Time" },
  { value: "100+", label: "Servers Managed" },
];

const CloudSupport = () => {
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
              background: "radial-gradient(circle, hsl(200 90% 50% / 0.15) 0%, transparent 60%)",
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
              <Cloud className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Cloud & IT Support</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              Enterprise-Grade
              <span className="text-gradient"> Infrastructure</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Infrastruktur cloud yang handal dengan monitoring 24/7, 
              keamanan tingkat enterprise, dan support responsif.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/#contact">
                <Button size="lg" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Mulai Sekarang
                </Button>
              </Link>
              <Link to="/#contact">
                <Button size="lg" variant="outline">
                  Lihat Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-foreground">
              Layanan <span className="text-gradient">Cloud</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Solusi infrastruktur lengkap untuk bisnis Anda
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

      {/* Services List */}
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
                <HardDrive className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-2xl text-foreground">Layanan Lengkap</h3>
              </div>
              <p className="text-muted-foreground">
                Semua yang Anda butuhkan untuk infrastruktur IT yang handal
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/30"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{service}</span>
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
              Infrastruktur Handal
            </h2>
            <p className="text-muted-foreground mb-8">
              Serahkan urusan server dan infrastruktur kepada kami, fokus saja pada bisnis Anda.
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

export default CloudSupport;
