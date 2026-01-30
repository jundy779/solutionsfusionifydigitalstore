import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@fusionify.id",
    href: "mailto:hello@fusionify.id",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+62 21 1234 5678",
    href: "tel:+622112345678",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Jakarta, Indonesia",
    href: "#",
  },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-background relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Contact Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground tracking-tight">
            Mari Berkolaborasi
          </h2>
          <p className="text-muted-foreground content-width-sm text-lg leading-relaxed">
            Punya proyek atau ide? Hubungi kami dan mari wujudkan bersama.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 content-width">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-card border border-border/80 p-8 lg:p-10 shadow-card"
            >
              <h3 className="font-display font-semibold text-xl mb-8 text-foreground">
                Kirim Pesan
              </h3>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2.5"
                  >
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama Anda"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-background border-border focus:border-primary h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2.5"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-background border-border focus:border-primary h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2.5"
                  >
                    Pesan
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Ceritakan tentang proyek Anda..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="bg-background border-border focus:border-primary resize-none rounded-xl"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full h-12">
                  Kirim Pesan
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center lg:pl-6"
          >
            <h3 className="font-display font-semibold text-2xl mb-4 text-foreground">
              Informasi Kontak
            </h3>
            <p className="text-muted-foreground mb-10 leading-relaxed text-[15px]">
              Tim kami siap membantu Anda mencapai tujuan digital. 
              Jangan ragu untuk menghubungi kami melalui salah satu channel di bawah ini.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 group p-5 rounded-xl bg-card border border-border/80 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                    <info.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-0.5">{info.label}</div>
                    <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
