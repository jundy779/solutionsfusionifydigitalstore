import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { 
  Settings2, 
  ArrowLeft, 
  Check, 
  Plug, 
  CreditCard, 
  Database, 
  GitBranch,
  Zap,
  Shield,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    icon: Plug,
    title: "API Integration",
    description: "Integrasi seamless dengan berbagai API third-party untuk menyatukan sistem Anda."
  },
  {
    icon: CreditCard,
    title: "Payment Gateway",
    description: "Integrasi dengan Midtrans, Xendit, DOKU, dan payment gateway lainnya."
  },
  {
    icon: Database,
    title: "CRM Systems",
    description: "Setup dan customization CRM untuk manajemen customer relationship yang lebih baik."
  },
  {
    icon: GitBranch,
    title: "ERP Integration",
    description: "Integrasi dengan sistem ERP untuk unified business operations."
  },
];

const integrations = [
  "Midtrans", "Xendit", "DOKU", "Stripe",
  "Salesforce", "HubSpot", "Zoho CRM", "Pipedrive",
  "Google Workspace", "Microsoft 365", "Slack", "Discord",
  "SAP", "Odoo", "ERPNext", "QuickBooks"
];

const benefits = [
  "Data tersinkronisasi real-time antar sistem",
  "Eliminasi entry data manual yang berulang",
  "Single source of truth untuk semua data bisnis",
  "Automasi workflow lintas platform",
  "Dashboard terpusat untuk monitoring",
  "Audit trail dan logging lengkap"
];

const DigitalSystems = () => {
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
              background: "radial-gradient(circle, hsl(142 70% 45% / 0.15) 0%, transparent 60%)",
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
              <Settings2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Digital Systems & API</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
              Connect Your
              <span className="text-gradient"> Ecosystem</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Integrasikan semua sistem bisnis Anda menjadi satu ekosistem terpadu 
              yang bekerja secara otomatis dan efisien.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/#contact">
                <Button size="lg" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Mulai Integrasi
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
              Layanan <span className="text-gradient">Integrasi</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Solusi lengkap untuk menghubungkan berbagai sistem bisnis Anda
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

      {/* Integrations & Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Integrations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-xl text-foreground">Platform yang Didukung</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Kami berpengalaman mengintegrasikan berbagai platform populer.
              </p>
              <div className="flex flex-wrap gap-2">
                {integrations.map((integration) => (
                  <span
                    key={integration}
                    className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground"
                  >
                    {integration}
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
                <h3 className="font-display font-semibold text-xl text-foreground">Keuntungan Integrasi</h3>
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
              Satukan Sistem Anda
            </h2>
            <p className="text-muted-foreground mb-8">
              Diskusikan kebutuhan integrasi Anda dan kami akan bantu merancang solusi terbaik.
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

export default DigitalSystems;
