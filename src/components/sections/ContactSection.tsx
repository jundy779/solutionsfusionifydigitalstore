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
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="font-bold text-3xl md:text-4xl mb-4 text-foreground">
            Mari Berkolaborasi
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Punya proyek atau ide? Hubungi kami dan mari wujudkan bersama.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 content-width">
          {/* Left Column - Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="rounded-xl bg-card border border-border p-6 lg:p-8"
            >
              <h3 className="font-semibold text-lg mb-6 text-foreground">
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
                    className="h-11"
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
                    className="h-11"
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
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="resize-none"
                  />
                </div>

                <Button type="submit" className="w-full h-11">
                  Kirim Pesan
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column - Info */}
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-xl mb-3 text-foreground">
              Informasi Kontak
            </h3>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Tim kami siap membantu Anda mencapai tujuan digital. 
              Jangan ragu untuk menghubungi kami melalui salah satu channel di bawah ini.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{info.label}</div>
                    <div className="text-foreground font-medium text-sm">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
