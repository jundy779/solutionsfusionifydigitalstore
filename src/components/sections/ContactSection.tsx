import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
            Let's Build
            <span className="text-gradient"> Something Great</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Ready to start your project? Get in touch with us today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 content-width">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-gradient-card border border-border/50"
          >
            <h3 className="font-display font-semibold text-xl mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Name</label>
                  <Input 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Subject</label>
                <Input 
                  placeholder="Project inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Message</label>
                <Textarea 
                  placeholder="Tell us about your project..." 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
                />
              </div>
              <Button type="submit" className="w-full h-12 glow-primary">
                Send Message
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-card border border-border/50">
              <h3 className="font-display font-semibold text-xl mb-6">Get in touch</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground">hello@fusionify.id</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-foreground">+62 812 3456 7890</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground">Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Quick Response</span>
              </div>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours. For urgent inquiries, 
                please reach out via WhatsApp.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
