import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
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
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(217 91% 60% / 0.08) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(265 75% 55% / 0.06) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium text-primary text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            Contact Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Let's Build
            <span className="text-gradient"> Something Great</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Ready to start your digital transformation? Get in touch today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 content-width">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="cinematic-card p-8 lg:p-10"
          >
            <h3 className="font-display font-semibold text-xl mb-8">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Name</label>
                <Input 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 bg-secondary/30 border-border/50 focus:border-primary/50 transition-colors"
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
                  className="h-12 bg-secondary/30 border-border/50 focus:border-primary/50 transition-colors"
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
                  className="bg-secondary/30 border-border/50 focus:border-primary/50 resize-none transition-colors"
                />
              </div>
              <Button type="submit" className="w-full h-12 glow-primary group">
                <span>Send Message</span>
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="cinematic-card p-8">
              <h3 className="font-display font-semibold text-xl mb-8">Get in touch</h3>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "hello@fusionify.id" },
                  { icon: Phone, label: "Phone", value: "+62 812 3456 7890" },
                  { icon: MapPin, label: "Location", value: "Indonesia" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="cinematic-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span 
                  className="w-2.5 h-2.5 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-sm font-medium text-foreground">Quick Response</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We typically respond within 24 hours. For urgent inquiries, 
                please reach out via WhatsApp.
              </p>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="cinematic-card p-6 bg-gradient-to-br from-primary/10 to-accent/5"
            >
              <div className="text-center">
                <motion.div 
                  className="text-4xl font-bold text-gradient-blue mb-2"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  50+
                </motion.div>
                <p className="text-sm text-muted-foreground">
                  Satisfied clients across Indonesia
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
