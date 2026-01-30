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
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
            Mari Berkolaborasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Punya proyek atau ide? Hubungi kami dan mari wujudkan bersama.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-card border border-border p-8 shadow-card"
            >
              <h3 className="font-display font-semibold text-xl mb-6 text-foreground">
                Kirim Pesan
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
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
                    className="bg-background border-border focus:border-primary rounded-xl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
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
                    className="bg-background border-border focus:border-primary rounded-xl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
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

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Kirim Pesan
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display font-semibold text-2xl mb-6 text-foreground">
              Informasi Kontak
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Tim kami siap membantu Anda mencapai tujuan digital. 
              Jangan ragu untuk menghubungi kami melalui salah satu channel di bawah ini.
            </p>

            {/* Contact Info */}
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{info.label}</div>
                    <div className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
